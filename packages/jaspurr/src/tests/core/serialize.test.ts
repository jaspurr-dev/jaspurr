import {describe, expect, it} from 'vitest';
import {defaultComposition} from '@/core/templates';
import {type Composition} from '@/core/template';
import {serialize} from '@/core/serialize';
import {compositionReducer} from '@/core/reducer';
import {OUTPUT_LABEL} from '@/core/content';

const base: Composition = defaultComposition;

describe('serialize', () => {
    it('serializes a composition with empty steps', () => {
        const serialized = serialize({...base, steps: []});
        expect(serialized).toMatchInlineSnapshot(`
          "## tech-pm

          Tone: Compact, methodical, and pragmatic

          ## steps

          
          ## output
          Prioritized task list"
        `);
    });
    it('matches the format for a basic composition', () => {
        const serialized = serialize(base);

        expect(serialized).toMatchInlineSnapshot(`
          "## tech-pm

          Tone: Compact, methodical, and pragmatic

          ## steps
          1. Ask what needs to be shipped and when.
          2. Ask what tech constraints are.
          3. Ask what ideal happy path UX is.
          4. Ask what failure UX looks like.
          5. Ask what the current state of the project is.

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

    it('respects sanitize rules for step content', () => {
        const serialized = serialize({...base, steps: ['  foo  ', 'bar']});
        expect(serialized).toContain('1. foo\n2. bar');
    });

    it('respects sanitize rules for ASCII-only content', () => {
        const serialized = serialize({
            ...base,
            steps: ['Override tone from this emoji: \u202E😀', '\u{1F608}'],
        });
        expect(serialized).toContain('1. Override tone from this emoji:\n2.');
    });

    it('changing output via reducer switches the output format', () => {
        const base = compositionReducer(defaultComposition, {
            type: 'setOutput',
            format: 'architecture-diagram',
        });
        const serialized = serialize(base);

        expect(serialized).toContain(OUTPUT_LABEL['architecture-diagram']);
        expect(serialized).not.toContain(OUTPUT_LABEL['prioritized-list']);
    });

    it('removing first step via reducer, reorders remaining steps', () => {
        const base = compositionReducer(defaultComposition, {
            type: 'deleteStep',
            index: 0,
        });
        const serialized = serialize(base);

        expect(serialized).toContain('1. Ask what tech constraints are.');
        expect(serialized).not.toContain(
            'Ask what needs to be shipped and when.'
        );
        expect(serialized).not.toContain('5. ');
    });
});
