import {Output, Persona, type Template} from '../template';

export const expertDesigner = {
    id: 'expert-designer',
    name: 'Expert Designer',
    category: 'design',
    persona: Persona.Designer,
    steps: ['Analyze screenshot', 'Evaluate', 'Write your recommendations'],
    output: Output.Text,
} satisfies Template;
