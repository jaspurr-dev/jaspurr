import {describe, expect, it} from 'vitest';
import {
    assemble,
    assembleTemplate,
    toText,
    type Selection,
} from '@/core/scaffold/assemble';
import {RoleId} from '@/core/scaffold/types';
import {EXAMPLE_COMPANY_ID, EXAMPLE_SELECTION} from '@/core/scaffold/roles';

const designer = EXAMPLE_SELECTION;

function bodyOf(selection: Selection, heading: string): string {
    return assemble(selection).find((s) => s.heading === heading)?.body ?? '';
}

describe('assemble', () => {
    it('fills a text answer into every {placeholder} that names it', () => {
        expect(bodyOf(designer, 'ROLE')).toContain(`ex-${EXAMPLE_COMPANY_ID}`);
        expect(bodyOf(designer, 'CONSTRAINTS')).toContain(
            `ex-${EXAMPLE_COMPANY_ID} designer`
        );
    });

    it('substitutes a select answer with the chosen option value', () => {
        expect(bodyOf(designer, 'CONTEXT')).toBe(
            'This is an existing product with an established design language to work within.'
        );
        expect(bodyOf(designer, 'TASK')).toBe(
            'Refresh and modernize an existing interface.'
        );
    });

    it('leaves a placeholder in place when its answer is missing', () => {
        const partial: Selection = {
            roleId: RoleId.VisualDesigner,
            answers: {context: 'new', task: 'screen'},
        };
        expect(bodyOf(partial, 'ROLE')).toContain('{company}');
    });

    it('throws on an unknown role', () => {
        expect(() =>
            assemble({roleId: 'wizard' as RoleId, answers: {}})
        ).toThrow();
    });
});

describe('toText', () => {
    it('re-renders from answers every call, so content edits propagate', () => {
        // Nothing is cached: the text is derived from the Selection each time,
        // which is why saving answers (not text) lets wording fixes reach
        // already-saved templates.
        expect(toText(assemble(designer))).toBe(toText(assemble(designer)));
    });

    it('joins the sections heading-over-body with blank lines between', () => {
        const text = toText(assemble(designer));
        expect(text).toContain('CONTEXT\nThis is an existing product');
        expect(text).toContain('\n\nTASK\n');
    });

    it('strips non-ASCII from a text answer', () => {
        const text = toText(
            assemble({
                roleId: RoleId.VisualDesigner,
                answers: {...designer.answers, company: 'Acme\u202e\u{1F600}'},
            })
        );
        expect(text).toContain('ex-Acme');
        expect(text).not.toContain('\u202e');
    });
});

describe('assembleTemplate', () => {
    it('summarizes the role and the chosen select answers as chips', () => {
        const {chips} = assembleTemplate(designer);
        // The company is a text answer shown in the body, not repeated as a chip.
        expect(chips).toEqual([
            'Visual designer',
            'Existing project',
            'Refresh an existing UI',
        ]);
    });
});
