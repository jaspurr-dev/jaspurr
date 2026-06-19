export interface Template {
    readonly id: string;
    readonly name: string;
    readonly steps: readonly string[];
}

export interface Composition {
    templateId: string;
    steps: string[];
}

export const fromTemplate = (t: Template): Composition => ({
    templateId: t.id,
    steps: [...t.steps],
});
