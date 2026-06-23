import type {Composition} from '@/core/template';
import {sanitize} from '@/core/sanitize';
import {OUTPUT_LABEL, PERSONA_LABEL, PERSONA_TONE} from '@/core/content';

export function serialize(c: Composition): string {
    const steps = c.steps
        .map((s, i) => `${String(i + 1)}. ${s.trim()}`)
        .join('\n');

    return sanitize(
        [
            `## ${PERSONA_LABEL[c.persona]}`,
            '',
            `Tone: ${PERSONA_TONE[c.persona]}`,
            '',
            '## steps',
            steps,
            '',
            '## output',
            OUTPUT_LABEL[c.output],
        ].join('\n')
    );
}
