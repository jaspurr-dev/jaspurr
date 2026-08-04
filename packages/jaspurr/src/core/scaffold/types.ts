export const RoleId = {
    VisualDesigner: 'visual-designer',
    FrontendEngineer: 'frontend-engineer',
    SoftwareEngineer: 'software-engineer',
    GameDesigner: 'game-designer',
    PmBusiness: 'pm-business',
} as const;
export type RoleId = (typeof RoleId)[keyof typeof RoleId];
export const ROLE_IDS = Object.values(RoleId);

/* Each role owns its own ordered list of questions -- the count and the mix of
kinds differ per role -- so the schema below describes a single question rather
than a fixed set. A question's id keys both the collected answer and the {id}
placeholder it fills in the role's template. */
export type QuestionKind = 'select' | 'text';

/* One choice in a select question. `label` is shown to the user; `value` is the
sentence substituted into the template. */
export interface SelectOption {
    readonly id: string;
    readonly label: string;
    readonly value: string;
}

interface QuestionBase {
    readonly id: string;
    readonly kind: QuestionKind;
    /* The question shown to the user (the stem). */
    readonly prompt: string;
}

/* The trailing "Other" choice on a select: picking it opens a free-text field
instead of recording an option id. */
export interface OtherChoice {
    readonly label: string;
    readonly placeholder?: string;
}

export interface SelectQuestion extends QuestionBase {
    readonly kind: 'select';
    readonly options: readonly SelectOption[];
    /* When set, the options end with an escape hatch for anything not listed. */
    readonly other?: OtherChoice;
}

export interface TextQuestion extends QuestionBase {
    readonly kind: 'text';
    readonly placeholder?: string;
    /* Optional starter chips so the step is completable without a keyboard. */
    readonly examples?: readonly string[];
    /* Renders a taller, multi-line box for answers that run past one line. */
    readonly multiline?: boolean;
}

/* An "Other" answer is stored as `other:<text>` so it can never be mistaken for
one of the option ids, however the user words it. */
const OTHER_PREFIX = 'other:';

export const toOtherAnswer = (text: string): string => OTHER_PREFIX + text;

/* The text behind an "Other" answer, or null if the answer is an option id. */
export function fromOtherAnswer(answer: string): string | null {
    return answer.startsWith(OTHER_PREFIX)
        ? answer.slice(OTHER_PREFIX.length)
        : null;
}

export type Question = SelectQuestion | TextQuestion;

/* A section of the assembled prompt. `body` may contain {questionId} tokens
that are replaced with the corresponding answer when the template is assembled. */
export interface TemplateSection {
    readonly heading: string;
    readonly body: string;
}

/* 'ready' roles have a full question flow and template; 'coming-soon' roles
appear in the grid but are not yet wired -- their questions and template land in
a later PR. */
export type RoleStatus = 'ready' | 'coming-soon';

/* An optional flag on the role card, independent of readiness: 'new' marks a
role that has just landed so it stands out in the grid. */
export type RoleBadge = 'new';

export interface Role {
    readonly id: RoleId;
    readonly label: string;
    /* One-line description shown on the role card. */
    readonly line: string;
    readonly status: RoleStatus;
    readonly badge?: RoleBadge;
    readonly questions: readonly Question[];
    readonly template: readonly TemplateSection[];
}
