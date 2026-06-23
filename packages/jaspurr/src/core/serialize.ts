import type {Composition} from '@/core/template';
import {sanitize} from '@/core/sanitize';
import {OUTPUT_LABEL, PERSONA_LABEL, PERSONA_TONE} from '@/core/content';

export function serialize(c: Composition): string {
    return sanitize(
        [
            `## ${PERSONA_LABEL[c.persona]}`,
            '',
            `Tone: ${PERSONA_TONE[c.persona]}`,
            '',
            '## output',
            OUTPUT_LABEL[c.output],
        ].join('\n')
    );
}
