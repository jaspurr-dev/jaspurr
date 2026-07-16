export const RoleId = {
    SoftwareEngineer: 'software-engineer',
    TechnicalPm: 'technical-pm',
    ProductDesigner: 'product-designer',
    DataAnalyst: 'data-analyst',
    DevopsSre: 'devops-sre',
    QaEngineer: 'qa-engineer',
    SecurityEngineer: 'security-engineer',
    EngManager: 'eng-manager',
} as const;
export type RoleId = (typeof RoleId)[keyof typeof RoleId];
export const ROLE_IDS = Object.values(RoleId);

/* Every question offers exactly four options; the tuple enforces it at compile
time so a miscounted list fails tsc rather than a test. */
export type Options<T> = readonly [T, T, T, T];

export interface Question<T> {
    readonly stem: string;
    readonly options: Options<T>;
}

/* Q1 is role-specific: each option maps to one CONSTRAINT line. */
export interface TaskOption {
    readonly label: string;
    readonly constraint: string;
}

/* Q2 is shared: each option maps to a CONTEXT line plus a CONSTRAINT line. */
export interface EnvironmentOption {
    readonly label: string;
    readonly context: string;
    readonly constraint: string;
}

/* Q3 is shared: each option maps to an OUTPUT FORMAT plus a TONE. */
export interface OutputOption {
    readonly label: string;
    readonly format: string;
    readonly tone: string;
}

export interface Role {
    readonly id: RoleId;
    readonly label: string;
    readonly line: string;
    readonly question: Question<TaskOption>;
    readonly examples: readonly [string, string, string];
}
