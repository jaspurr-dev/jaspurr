export const Output = {
    PrioritizedList: 'prioritized-list',
    ArchitectureDiagram: 'architecture-diagram',
} as const;
export type Output = (typeof Output)[keyof typeof Output];
export const OUTPUTS = Object.values(Output);

export const Persona = {
    TechPm: 'tech-pm',
} as const;
export type Persona = (typeof Persona)[keyof typeof Persona];
export const PERSONAS = Object.values(Persona);

export const Category = {
    Code: 'code',
    Design: 'design',
    Strategy: 'strategy',
} as const;
export type Category = (typeof Category)[keyof typeof Category];
export const CATEGORIES = Object.values(Category);

export interface Template {
    readonly id: string;
    readonly name: string;
    readonly category: Category;
    readonly persona: Persona;
    readonly steps: readonly string[];
    readonly output: Output;
}

export interface Composition {
    templateId: string;
    persona: Persona;
    steps: string[];
    output: Output;
}

export const fromTemplate = (t: Template): Composition => ({
    templateId: t.id,
    persona: t.persona,
    steps: [...t.steps],
    output: t.output,
});
