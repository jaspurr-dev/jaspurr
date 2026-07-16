import type {EnvironmentOption, OutputOption, Question} from './types';

/* Q2, shared across every role: the environment maps to a CONTEXT line plus a
CONSTRAINT line in the assembled template. */
export const ENVIRONMENT_QUESTION: Question<EnvironmentOption> = {
    stem: 'What is the environment like?',
    options: [
        {
            label: 'Greenfield, nothing to break',
            context:
                'This is a greenfield project with nothing in production yet.',
            constraint:
                'Optimize for a clean start, but justify the conventions you pick.',
        },
        {
            label: 'Mature and well-tested',
            context:
                'The codebase is mature and covered by a solid test suite.',
            constraint:
                'Match the existing patterns and keep the test suite green.',
        },
        {
            label: 'Legacy and fragile',
            context: 'The codebase is legacy and fragile, with sparse tests.',
            constraint:
                'Change as little as possible. Call out anything risky before touching it.',
        },
        {
            label: 'Honestly, not sure',
            context: 'The state of the codebase is unknown.',
            constraint: 'Ask what you need to know before making assumptions.',
        },
    ],
};

/* Q3, shared across every role: the desired shape maps to an OUTPUT FORMAT plus
a TONE in the assembled template. */
export const OUTPUT_QUESTION: Question<OutputOption> = {
    stem: 'What should the answer look like?',
    options: [
        {
            label: 'Just the output',
            format: 'Return only the output. No preamble, no explanation.',
            tone: 'Terse. No filler.',
        },
        {
            label: 'Output plus brief reasoning',
            format: 'Return the output, then a few lines on the key decisions.',
            tone: 'Direct, with brief justification.',
        },
        {
            label: 'Plan first, then output',
            format: 'Lay out a short plan first, then produce the output.',
            tone: 'Methodical and structured.',
        },
        {
            label: 'Full walkthrough',
            format: 'Walk through the reasoning step by step alongside the output.',
            tone: 'Thorough and explanatory.',
        },
    ],
};
