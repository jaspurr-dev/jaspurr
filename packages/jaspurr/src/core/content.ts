import {Persona, Output} from '@/core/template';

export const PERSONA_LABEL = {
    [Persona.TechPm]: 'tech-pm',
} satisfies Record<Persona, string>;

export const PERSONA_TONE = {
    [Persona.TechPm]: 'Compact, methodical, and pragmatic',
} satisfies Record<Persona, string>;

export const OUTPUT_LABEL = {
    [Output.PrioritizedList]: 'Prioritized task list',
    [Output.ArchitectureDiagram]: 'Architecture diagram',
} satisfies Record<Output, string>;
