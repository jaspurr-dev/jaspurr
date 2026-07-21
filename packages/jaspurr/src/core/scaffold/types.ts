export const RoleId = {
    VisualDesigner: 'visual-designer',
    FrontendEngineer: 'frontend-engineer',
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

export interface SelectQuestion extends QuestionBase {
    readonly kind: 'select';
    readonly options: readonly SelectOption[];
}

export interface TextQuestion extends QuestionBase {
    readonly kind: 'text';
    readonly placeholder?: string;
    /* Optional starter chips so the step is completable without a keyboard. */
    readonly examples?: readonly string[];
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

export interface Role {
    readonly id: RoleId;
    readonly label: string;
    /* One-line description shown on the role card. */
    readonly line: string;
    readonly status: RoleStatus;
    readonly questions: readonly Question[];
    readonly template: readonly TemplateSection[];
}
