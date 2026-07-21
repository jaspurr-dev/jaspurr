import {sanitize} from '@/core/sanitize';
import {getRole} from './roles';
import type {Question, Role, RoleId} from './types';

/* The user's answers to a role's questions, keyed by question id. For a select
question the value is the chosen option's id; for a text question it is the raw
text the user typed. */
export interface Selection {
    readonly roleId: RoleId;
    readonly answers: Readonly<Record<string, string>>;
}

export interface Section {
    readonly heading: string;
    readonly body: string;
}

export type Assembled = readonly Section[];

export interface AssembledTemplate {
    readonly sections: Assembled;
    readonly chips: readonly string[];
}

/* The template substitutes an answer by its display value: a select answer maps
to the chosen option's `value` sentence; a text answer is the raw text (it gets
sanitized with the rest of the body). An unanswered or unknown token is left in
place so a half-built selection never silently drops content. */
function substitute(
    question: Question | undefined,
    answer: string | undefined,
    token: string
): string {
    if (answer === undefined) return token;
    if (question?.kind === 'select') {
        const option = question.options.find((o) => o.id === answer);
        return option ? option.value : token;
    }
    return answer;
}

function fill(body: string, role: Role, answers: Selection['answers']): string {
    return body.replace(/\{([\w-]+)\}/g, (token, id: string) => {
        const question = role.questions.find((q) => q.id === id);
        return substitute(question, answers[id], token);
    });
}

export function assemble(selection: Selection): Assembled {
    const role = getRole(selection.roleId);
    if (!role) {
        throw new Error(`Unknown role: ${selection.roleId}`);
    }
    return role.template.map((section) => ({
        heading: section.heading,
        body: sanitize(fill(section.body, role, selection.answers)),
    }));
}

/* The chip summary: the role label plus, for each select answer, the chosen
option's label. Text answers appear in the body (e.g. the TASK section), so they
are not repeated as chips. */
export function assembleTemplate(selection: Selection): AssembledTemplate {
    const sections = assemble(selection);
    const role = getRole(selection.roleId);

    const answerChips = (role?.questions ?? [])
        .filter((q) => q.kind === 'select')
        .map((q) => q.options.find((o) => o.id === selection.answers[q.id]))
        .map((option) => option?.label)
        .filter((label): label is string => label !== undefined);

    const chips = role ? [role.label, ...answerChips] : answerChips;
    return {sections, chips};
}

export function toText(sections: Assembled): string {
    return sanitize(
        sections.map((s) => `${s.heading}\n${s.body}`).join('\n\n')
    );
}
