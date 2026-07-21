import {describe, expect, it} from 'vitest';
import {
    addTemplate,
    removeTemplate,
    clearTemplates,
    libraryToMarkdown,
    templateTitle,
    isValidSelection,
    isSavedTemplate,
    type SavedTemplate,
} from '@/state/library';
import type {Selection} from '@/core/scaffold/assemble';
import {RoleId} from '@/core/scaffold/types';
import {EXAMPLE_COMPANY_ID, EXAMPLE_SELECTION} from '@/core/scaffold/roles';

const refresh = EXAMPLE_SELECTION;

/* A distinct saved template: same role, different answers. */
const screen: Selection = {
    ...EXAMPLE_SELECTION,
    answers: {...EXAMPLE_SELECTION.answers, context: 'new', task: 'screen'},
};

const a: SavedTemplate = {id: 'id-a', selection: refresh};
const b: SavedTemplate = {id: 'id-b', selection: screen};
/* Same answers as `a`, different id -- what a second Save would produce. */
const aAgain: SavedTemplate = {id: 'id-a2', selection: refresh};

describe('templateTitle', () => {
    it('combines the role label with the text answer', () => {
        expect(templateTitle(refresh)).toBe(
            `Visual designer: ${EXAMPLE_COMPANY_ID}`
        );
    });
});

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
        expect(md).toContain(`## Visual designer: ${EXAMPLE_COMPANY_ID}`);
        expect(md).toContain('```');
        expect(md).toContain('ROLE');
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
        expect(md).toContain('CONSTRAINTS');
        expect(md).toContain('OUTPUT');
    });

    it('opens a longer fence when the assembled body contains backticks', () => {
        const withBackticks: SavedTemplate = {
            id: 'id-bt',
            selection: {
                roleId: RoleId.VisualDesigner,
                answers: {...refresh.answers, company: 'the ``` studio'},
            },
        };
        const md = libraryToMarkdown([withBackticks]);
        // The body has a 3-backtick run, so the fence must be at least 4.
        expect(md).toContain('````');
    });
});

describe('isValidSelection', () => {
    it('accepts a selection that answers every question with a valid value', () => {
        expect(isValidSelection(refresh)).toBe(true);
    });

    it('rejects an unknown role', () => {
        expect(isValidSelection({roleId: 'wizard', answers: {}})).toBe(false);
    });

    it('rejects a coming-soon role with no questions', () => {
        expect(isValidSelection({roleId: RoleId.PmBusiness, answers: {}})).toBe(
            false
        );
    });

    it('rejects a select answer that is not one of the options', () => {
        expect(
            isValidSelection({
                roleId: RoleId.VisualDesigner,
                answers: {...refresh.answers, task: 'nope'},
            })
        ).toBe(false);
    });

    it('rejects a missing or blank text answer', () => {
        expect(
            isValidSelection({
                roleId: RoleId.VisualDesigner,
                answers: {context: 'new', task: 'screen'},
            })
        ).toBe(false);
        expect(
            isValidSelection({
                roleId: RoleId.VisualDesigner,
                answers: {...refresh.answers, company: '   '},
            })
        ).toBe(false);
    });

    it('rejects non-object values and a missing answers map', () => {
        expect(isValidSelection(null)).toBe(false);
        expect(isValidSelection('nope')).toBe(false);
        expect(isValidSelection({roleId: RoleId.VisualDesigner})).toBe(false);
    });
});

describe('isSavedTemplate', () => {
    it('accepts a stable id over a valid selection', () => {
        expect(isSavedTemplate(a)).toBe(true);
    });

    it('rejects a bare Selection with no id wrapper', () => {
        expect(isSavedTemplate(refresh)).toBe(false);
    });

    it('rejects an entry whose selection is invalid', () => {
        expect(isSavedTemplate({id: 'x', selection: {roleId: 'wizard'}})).toBe(
            false
        );
    });
});
