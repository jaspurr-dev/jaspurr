import {atom} from 'jotai';
import {atomWithReducer} from 'jotai/utils';
import {assembleTemplate} from '@/core/scaffold/assemble';
import type {AssembledTemplate, Selection} from '@/core/scaffold/assemble';
import {getRole} from '@/core/scaffold/roles';
import type {Question, RoleId} from '@/core/scaffold/types';

/* Role is picked first, then the role's own questions are walked one at a time
(their count and kinds vary per role), then the assembled result. */
export type FlowStep = 'role' | 'question' | 'result';

export interface FlowState {
    readonly step: FlowStep;
    readonly roleId: RoleId | null;
    /* Index into the current role's questions while step === 'question'. */
    readonly index: number;
    /* Answer per question id: a chosen option id for a select, the raw text for
    a text question. */
    readonly answers: Readonly<Record<string, string>>;
}

export type FlowAction =
    | {type: 'pickRole'; roleId: RoleId}
    | {type: 'answer'; value: string}
    | {type: 'setText'; value: string}
    | {type: 'next'}
    | {type: 'back'}
    | {type: 'changeAnswers'}
    | {type: 'reset'};

export const INITIAL_FLOW: FlowState = {
    step: 'role',
    roleId: null,
    index: 0,
    answers: {},
};

function questionsFor(roleId: RoleId | null): readonly Question[] {
    return roleId ? (getRole(roleId)?.questions ?? []) : [];
}

function currentId(state: FlowState): string | null {
    return questionsFor(state.roleId)[state.index]?.id ?? null;
}

/* Move past the current question: to the next one, or to the result once the
last question is answered. */
function advance(state: FlowState): FlowState {
    const total = questionsFor(state.roleId).length;
    return state.index >= total - 1
        ? {...state, step: 'result'}
        : {...state, index: state.index + 1};
}

export function flowReducer(state: FlowState, action: FlowAction): FlowState {
    switch (action.type) {
        case 'pickRole': {
            const role = getRole(action.roleId);
            // Coming-soon roles have no questions; ignore taps on them.
            if (!role || role.questions.length === 0) return state;
            const sameRole = action.roleId === state.roleId;
            return {
                step: 'question',
                roleId: action.roleId,
                index: 0,
                // A different role invalidates the previous answers.
                answers: sameRole ? state.answers : {},
            };
        }
        case 'answer': {
            // Select answer: record and auto-advance.
            const id = currentId(state);
            if (id === null) return state;
            return advance({
                ...state,
                answers: {...state.answers, [id]: action.value},
            });
        }
        case 'setText': {
            // Text answer: record without advancing (advance is a separate step).
            const id = currentId(state);
            if (id === null) return state;
            return {...state, answers: {...state.answers, [id]: action.value}};
        }
        case 'next':
            return state.step === 'question' ? advance(state) : state;
        case 'back':
            if (state.step === 'result') {
                const last = Math.max(0, questionsFor(state.roleId).length - 1);
                return {...state, step: 'question', index: last};
            }
            if (state.step === 'question' && state.index > 0) {
                return {...state, index: state.index - 1};
            }
            if (state.step === 'question') {
                return {...state, step: 'role'};
            }
            return state;
        case 'changeAnswers':
            // Back into the flow at the first question, answers intact.
            return {...state, step: 'question', index: 0};
        case 'reset':
            return INITIAL_FLOW;
    }
}

function toSelection(state: FlowState): Selection | null {
    if (!state.roleId) return null;
    const questions = questionsFor(state.roleId);
    if (questions.length === 0) return null;
    const complete = questions.every((q) => {
        const answer = state.answers[q.id];
        if (typeof answer !== 'string') return false;
        return q.kind === 'text' ? answer.trim().length > 0 : true;
    });
    return complete ? {roleId: state.roleId, answers: state.answers} : null;
}

export const flowAtom = atomWithReducer(INITIAL_FLOW, flowReducer);

export const stepAtom = atom((get) => get(flowAtom).step);
export const roleIdAtom = atom((get) => get(flowAtom).roleId);
export const answersAtom = atom((get) => get(flowAtom).answers);

export const currentQuestionAtom = atom<Question | null>((get) => {
    const {roleId, index} = get(flowAtom);
    return roleId ? (getRole(roleId)?.questions[index] ?? null) : null;
});

/* The 1-based position of the current question and the role's total, for the
progress header. */
export const positionAtom = atom((get) => {
    const {roleId, index} = get(flowAtom);
    const total = questionsFor(roleId).length;
    return {number: index + 1, total};
});

export const selectionAtom = atom((get) => toSelection(get(flowAtom)));

export const assembledAtom = atom<AssembledTemplate | null>((get) => {
    const selection = get(selectionAtom);
    return selection ? assembleTemplate(selection) : null;
});
