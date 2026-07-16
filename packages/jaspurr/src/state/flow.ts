import {atom} from 'jotai';
import {atomWithReducer} from 'jotai/utils';
import {assembleTemplate} from '@/core/scaffold/assemble';
import type {AssembledTemplate, Selection} from '@/core/scaffold/assemble';
import type {EnvironmentId, OutputId, RoleId} from '@/core/scaffold/types';

/* Role is picked first, then the three multiple-choice answers auto-advance,
then the free-text TASK line, then the assembled result. */
export type FlowStep =
    | 'role'
    | 'task'
    | 'environment'
    | 'output'
    | 'topic'
    | 'result';

/* The answer being built up across the flow. Ids are null until chosen; topic
starts empty. It becomes a full Selection only once every id is set. */
export interface Draft {
    readonly roleId: RoleId | null;
    readonly taskId: string | null;
    readonly environmentId: EnvironmentId | null;
    readonly outputId: OutputId | null;
    readonly topic: string;
}

export interface FlowState {
    readonly step: FlowStep;
    readonly draft: Draft;
}

export type FlowAction =
    | {type: 'pickRole'; roleId: RoleId}
    | {type: 'pickTask'; taskId: string}
    | {type: 'pickEnvironment'; environmentId: EnvironmentId}
    | {type: 'pickOutput'; outputId: OutputId}
    | {type: 'setTopic'; topic: string}
    | {type: 'finish'}
    | {type: 'changeAnswers'}
    | {type: 'reset'};

const EMPTY_DRAFT: Draft = {
    roleId: null,
    taskId: null,
    environmentId: null,
    outputId: null,
    topic: '',
};

export const INITIAL_FLOW: FlowState = {step: 'role', draft: EMPTY_DRAFT};

export function flowReducer(state: FlowState, action: FlowAction): FlowState {
    switch (action.type) {
        case 'pickRole':
            return {
                step: 'task',
                draft: {
                    ...state.draft,
                    roleId: action.roleId,
                    // Task options are role-specific, so a different role
                    // invalidates the previously chosen task.
                    taskId:
                        action.roleId === state.draft.roleId
                            ? state.draft.taskId
                            : null,
                },
            };
        case 'pickTask':
            return {
                step: 'environment',
                draft: {...state.draft, taskId: action.taskId},
            };
        case 'pickEnvironment':
            return {
                step: 'output',
                draft: {...state.draft, environmentId: action.environmentId},
            };
        case 'pickOutput':
            return {
                step: 'topic',
                draft: {...state.draft, outputId: action.outputId},
            };
        case 'setTopic':
            return {...state, draft: {...state.draft, topic: action.topic}};
        case 'finish':
            return {...state, step: 'result'};
        case 'changeAnswers':
            // Back into the flow with the draft intact, so answers can be
            // re-tapped without starting over.
            return {...state, step: 'role'};
        case 'reset':
            return INITIAL_FLOW;
    }
}

function toSelection(draft: Draft): Selection | null {
    const {roleId, taskId, environmentId, outputId, topic} = draft;
    if (
        roleId === null ||
        taskId === null ||
        environmentId === null ||
        outputId === null
    ) {
        return null;
    }
    // The flow only ever offers a role its own task ids, so (roleId, taskId) is
    // valid by construction; the discriminated union can't see that, so we
    // assert and let assemble() validate at runtime.
    return {roleId, taskId, environmentId, outputId, topic} as Selection;
}

export const flowAtom = atomWithReducer(INITIAL_FLOW, flowReducer);

export const stepAtom = atom((get) => get(flowAtom).step);
export const draftAtom = atom((get) => get(flowAtom).draft);
export const selectionAtom = atom((get) => toSelection(get(flowAtom).draft));

export const assembledAtom = atom<AssembledTemplate | null>((get) => {
    const selection = get(selectionAtom);
    return selection ? assembleTemplate(selection) : null;
});
