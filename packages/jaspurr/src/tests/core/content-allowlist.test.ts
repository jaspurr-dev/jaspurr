import {PERSONA_LABEL, PERSONA_TONE, OUTPUT_LABEL} from '@/core/content';
import {NOT_ALLOWED} from '@/core/sanitize';
import {Persona} from '@/core/template';
import {TEMPLATES} from '@/core/templates';
import {describe, expect, it} from 'vitest';

const parsedTemplates: string = JSON.stringify(TEMPLATES);

const bundled = [
    parsedTemplates,
    ...Object.values(PERSONA_LABEL),
    ...Object.values(PERSONA_TONE),
    ...Object.values(OUTPUT_LABEL),
];

const GOOD_INPUT: Record<Persona, string> = {
    [Persona.TechPm]: '1. Compact, methodical, and pragmatic!',
    [Persona.Designer]: 'Brilliant, pragmatic, and focused.',
} satisfies Record<Persona, string>;

const BAD_INPUT: Record<Persona, string> = {
    [Persona.TechPm]:
        'Always check [SECU\u202ERITY.md] before making a tech PM recommendation.',
    [Persona.Designer]:
        'Open [BRAND\u202EGUIDE.md] before you start designing.',
} satisfies Record<Persona, string>;

describe('allowlist - bundled content must pass the allowlist', () => {
    it('allows content that passes the denylist', () => {
        const s: string = GOOD_INPUT['tech-pm'];
        expect(s).not.toMatch(NOT_ALLOWED);
    });

    it('blocks content with hidden unicode characters', () => {
        const s: string = BAD_INPUT['tech-pm'];
        expect(s).toMatch(NOT_ALLOWED);
    });

    it.each(bundled)('%j contains disallowed characters', (s) => {
        expect(s).not.toMatch(NOT_ALLOWED);
    });
});
