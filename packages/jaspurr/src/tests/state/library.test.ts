import {describe, expect, it} from 'vitest';
import {addTemplate} from '@/state/library';
import type {Selection} from '@/core/scaffold/assemble';
import {RoleId} from '@/core/scaffold/types';

const refactor: Selection = {
    roleId: RoleId.SoftwareEngineer,
    taskId: 'refactor',
    environmentId: 'mature',
    outputId: 'output-only',
    topic: 'Refactor a 2,000-line React component into hooks',
};

/* Same answers, different free-text line -- a distinct saved template. */
const debug: Selection = {
    ...refactor,
    topic: 'Track down a memory leak in the worker pool',
};

describe('addTemplate', () => {
    it('appends a new selection to an empty library', () => {
        expect(addTemplate([], refactor)).toEqual([refactor]);
    });

    it('skips an exact duplicate, returning the same array', () => {
        const library = [refactor];
        expect(addTemplate(library, refactor)).toBe(library);
    });

    it('keeps selections that differ by any field', () => {
        expect(addTemplate([refactor], debug)).toEqual([refactor, debug]);
    });

    it('does not mutate the library it is given', () => {
        const library = [refactor];
        addTemplate(library, debug);
        expect(library).toEqual([refactor]);
    });
});
