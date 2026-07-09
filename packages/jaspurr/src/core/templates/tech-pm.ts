import {Output, Persona, type Template} from '@/core/template';

export const techPm = {
    id: 'tech-pm-type-a',
    name: 'Type A - Tech PM',
    category: 'strategy',
    persona: Persona.TechPm,
    steps: [
        'Ask what needs to be shipped and when.',
        'Ask what tech constraints are.',
        'Ask what ideal happy path UX is.',
        'Ask what failure UX looks like.',
        'Ask what the current state of the project is.',
    ],
    output: Output.PrioritizedList,
} satisfies Template;
