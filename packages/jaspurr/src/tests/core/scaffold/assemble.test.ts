import {describe, expect, it} from 'vitest';
import {assemble, toText, type Selection} from '@/core/scaffold/assemble';
import {RoleId, type OutputId} from '@/core/scaffold/types';

const softwareExample: Selection = {
    roleId: RoleId.SoftwareEngineer,
    taskId: 'refactor',
    environmentId: 'mature',
    outputId: 'output-only',
    topic: 'Refactor a 2,000-line React component into hooks',
};

describe('assemble', () => {
    it('produces the six structured sections in order', () => {
        const sections = assemble(softwareExample);
        expect(sections.map((s) => s.heading)).toEqual([
            'ROLE',
            'CONTEXT',
            'TASK',
            'CONSTRAINTS',
            'OUTPUT FORMAT',
            'TONE',
        ]);
    });

    it('routes the free-text line into the TASK section', () => {
        const [, , task] = assemble(softwareExample);
        expect(task.body).toBe(softwareExample.topic);
    });

    it('resolves options by id, not position', () => {
        const constraints = assemble(softwareExample)[3];
        expect(constraints.body).toContain(
            'Behaviour must not change. If it must, stop and tell me first.'
        );
        expect(constraints.body).toContain(
            'Match the existing patterns and keep the test suite green.'
        );
    });

    it('rejects another role task id at compile time', () => {
        const bad: Selection = {
            ...softwareExample,
            // @ts-expect-error 'spec' is a Technical-PM task, not a Software one.
            taskId: 'spec',
        };
        expect(() => assemble(bad)).toThrow();
    });

    it('throws when stored answers reference an option that is gone', () => {
        // Simulates stale localStorage, e.g. an option id removed in a later
        // content edit; the cast stands in for corrupted persisted data.
        const stale: Selection = {
            ...softwareExample,
            outputId: 'gone' as OutputId,
        };
        expect(() => assemble(stale)).toThrow();
    });
});

describe('toText', () => {
    it('renders the stored answers into a sanitized prompt', () => {
        expect(toText(assemble(softwareExample))).toMatchInlineSnapshot(`
          "ROLE
          Senior software engineer. You write code other people have to maintain.

          CONTEXT
          The codebase is mature and covered by a solid test suite.

          TASK
          Refactor a 2,000-line React component into hooks

          CONSTRAINTS
          - Behaviour must not change. If it must, stop and tell me first.
          - Match the existing patterns and keep the test suite green.

          OUTPUT FORMAT
          Return only the output. No preamble, no explanation.

          TONE
          Terse. No filler."
        `);
    });

    it('re-renders from answers every call, so content edits propagate', () => {
        // Nothing is cached: the text is derived from the Selection each time,
        // which is why saving answers (not text) lets wording fixes reach
        // already-saved templates.
        const once = toText(assemble(softwareExample));
        const twice = toText(assemble(softwareExample));
        expect(once).toBe(twice);
    });

    it('strips non-ASCII from the free-text line', () => {
        const text = toText(
            assemble({...softwareExample, topic: 'drop this: \u202E\u{1F600}'})
        );
        expect(text).toContain('TASK\ndrop this:');
        expect(text).not.toContain('\u202E');
    });
});
