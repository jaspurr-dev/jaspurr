import {describe, expect, it} from 'vitest';
import {
    addTemplate,
    removeTemplate,
    clearTemplates,
    libraryToMarkdown,
    isValidSelection,
    isSavedTemplate,
    type SavedTemplate,
} from '@/state/library';
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

const a: SavedTemplate = {id: 'id-a', selection: refactor};
const b: SavedTemplate = {id: 'id-b', selection: debug};
/* Same answers as `a`, different id -- what a second Save of the same flow
would produce. */
const aAgain: SavedTemplate = {id: 'id-a2', selection: refactor};

describe('addTemplate', () => {
    it('appends a new template to an empty library', () => {
        expect(addTemplate([], a)).toEqual([a]);
    });

    it('dedups on the selection, ignoring the id', () => {
        const library = [a];
        expect(addTemplate(library, aAgain)).toBe(library);
    });

    it('keeps templates whose answers differ', () => {
        expect(addTemplate([a], b)).toEqual([a, b]);
    });

    it('does not mutate the library it is given', () => {
        const library = [a];
        addTemplate(library, b);
        expect(library).toEqual([a]);
    });
});

describe('removeTemplate', () => {
    it('drops the entry with the matching id', () => {
        expect(removeTemplate([a, b], 'id-a')).toEqual([b]);
    });

    it('returns the same array when no id matches', () => {
        const library = [a, b];
        expect(removeTemplate(library, 'nope')).toBe(library);
    });

    it('does not mutate the library it is given', () => {
        const library = [a, b];
        removeTemplate(library, 'id-a');
        expect(library).toEqual([a, b]);
    });
});

describe('clearTemplates', () => {
    it('returns an empty library', () => {
        expect(clearTemplates()).toEqual([]);
    });
});

describe('libraryToMarkdown', () => {
    it('renders an empty library as an empty string', () => {
        expect(libraryToMarkdown([])).toBe('');
    });

    it('renders a heading, a fenced block, and the topic per entry', () => {
        const md = libraryToMarkdown([a]);
        expect(md).toContain('## Software engineer: ' + refactor.topic);
        expect(md).toContain('```');
        expect(md).toContain('ROLE');
        expect(md).toContain(refactor.topic);
    });

    it('separates multiple entries with a blank line', () => {
        const md = libraryToMarkdown([a, b]);
        const headings = md.match(/^## /gm) ?? [];
        expect(headings).toHaveLength(2);
        expect(md).toContain('\n\n');
    });

    it('assembles on read rather than storing rendered text', () => {
        // SavedTemplate holds only the selection; the rendered prompt is
        // produced here, so this must equal a fresh assembly of the same answers.
        const md = libraryToMarkdown([a]);
        expect(md).toContain('TONE');
        expect(md).toContain('OUTPUT FORMAT');
    });

    it('opens a longer fence when the assembled body contains backticks', () => {
        const withBackticks: SavedTemplate = {
            id: 'id-bt',
            selection: {...refactor, topic: 'Use ``` in a code block'},
        };
        const md = libraryToMarkdown([withBackticks]);
        // The body has a 3-backtick run, so the fence must be at least 4.
        expect(md).toContain('````');
    });
});

describe('isValidSelection', () => {
    it('accepts a selection whose every id resolves', () => {
        expect(isValidSelection(refactor)).toBe(true);
    });

    it('rejects an unknown role', () => {
        expect(isValidSelection({...refactor, roleId: 'wizard'})).toBe(false);
    });

    it('rejects a taskId that is not one of the role options', () => {
        // 'refactor' is a software-engineer task, not a data-analyst one.
        const wrongTask = {...refactor, roleId: RoleId.DataAnalyst};
        expect(isValidSelection(wrongTask)).toBe(false);
    });

    it('rejects unknown environment or output ids', () => {
        expect(isValidSelection({...refactor, environmentId: 'x'})).toBe(false);
        expect(isValidSelection({...refactor, outputId: 'x'})).toBe(false);
    });

    it('rejects a non-string topic and non-object values', () => {
        expect(isValidSelection({...refactor, topic: 42})).toBe(false);
        expect(isValidSelection(null)).toBe(false);
        expect(isValidSelection('nope')).toBe(false);
    });
});

describe('isSavedTemplate', () => {
    it('accepts a stable id over a valid selection', () => {
        expect(isSavedTemplate(a)).toBe(true);
    });

    it('rejects a bare Selection with no id wrapper (the old shape)', () => {
        // This is exactly what PR 11 persisted; it must be dropped on load.
        expect(isSavedTemplate(refactor)).toBe(false);
    });

    it('rejects an entry whose selection is invalid', () => {
        expect(isSavedTemplate({id: 'x', selection: {roleId: 'wizard'}})).toBe(
            false
        );
    });
});
