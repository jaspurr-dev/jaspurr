export const Output = {
    PrioritizedList: 'prioritized-list',
} as const;
export type Output = (typeof Output)[keyof typeof Output];
export const OUTPUTS = Object.values(Output);

export interface Template {
    readonly id: string;
    readonly name: string;
    readonly steps: readonly string[];
    readonly output: Output;
}

export interface Composition {
    templateId: string;
    steps: string[];
    output: Output;
}

export const fromTemplate = (t: Template): Composition => ({
    templateId: t.id,
    steps: [...t.steps],
    output: t.output,
});
