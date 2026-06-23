import {describe, expect, it} from 'vitest';
import {TEMPLATES} from '@/core/templates';
import {fromTemplate, type Composition} from '@/core/template';
import {serialize} from '@/core/serialize';

const base: Composition = fromTemplate(TEMPLATES['tech-pm-type-a']);

describe('serialize', () => {
    it('matches the format for a basic composition', () => {
        const serialized = serialize(base);

        expect(serialized).toMatchInlineSnapshot(`
          "## tech-pm

          Tone: Compact, methodical, and pragmatic

          ## output
          Prioritized task list"
        `);
    });

    it('is idempotent for unchanged composition', () => {
        const serialized = serialize(base);
        let copy = serialize(base);
        expect(serialized).toBe(copy);

        for (let i = 0; i < 10; i++) {
            copy = serialize(base);
        }

        expect(serialized).toBe(copy);
    });
});
