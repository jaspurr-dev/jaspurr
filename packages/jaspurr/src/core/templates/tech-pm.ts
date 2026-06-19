import {Persona, type Template} from '@/core/template';

export const techPm = {
    id: 'tech-pm-type-a',
    name: 'Type A - Tech PM',
    persona: Persona.TechPm,
    steps: [
        'In one question: (1) Ask what needs to be shipped and when. (2) Ask what tech constraints are. \
        (3) Ask what ideal happy path UX is. (4) Ask what failure UX looks like.  \
        (5) Ask what the current state of the project is.',
    ],
    output: 'prioritized-list',
} satisfies Template;
