import {describe, expect, it} from 'vitest';
import {
    assemble,
    assembleTemplate,
    toText,
    type Selection,
} from '@/core/scaffold/assemble';
import {RoleId, toOtherAnswer} from '@/core/scaffold/types';
import {
    EXAMPLE_COMPANY_ID,
    EXAMPLE_SELECTION,
    EXAMPLE_FRONTEND_SELECTION,
    EXAMPLE_GAME_SELECTION,
    EXAMPLE_PM_SELECTION,
    EXAMPLE_SALES_SELECTION,
    EXAMPLE_SOFTWARE_SELECTION,
} from '@/core/scaffold/roles';

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

describe('frontend engineer', () => {
    const frontend = EXAMPLE_FRONTEND_SELECTION;

    it('prefixes the task body with the labeled task type', () => {
        expect(bodyOf(frontend, 'TASK')).toBe(
            '[Feature] Add a settings screen with a dark-mode toggle'
        );
    });

    it('resolves the stack and output select answers into their sections', () => {
        expect(bodyOf(frontend, 'DEPENDENCIES')).toContain(
            'React, React Router, TypeScript, Vite, and Vitest'
        );
        expect(bodyOf(frontend, 'OUTPUT')).toContain('inline code diff');
    });

    it('chips the select answers but not the free-text task', () => {
        expect(assembleTemplate(frontend).chips).toEqual([
            'Frontend engineer',
            'Feature',
            'Standard SPA',
            'Inline diff',
        ]);
    });

    describe('game designer', () => {
        const game = EXAMPLE_GAME_SELECTION;

        it('fills the free-text company into the ex-{company} role line', () => {
            expect(bodyOf(game, 'ROLE')).toContain(
                'ex-Foobar expert game designer'
            );
        });

        it('composes targeting, team, and timeline into one target line', () => {
            expect(bodyOf(game, 'TARGET')).toBe(
                'The user wants to target Roguelike deckbuilder, PC, $20. ' +
                    'They are a small team of 2 to 5 working to a ship timeline of ' +
                    '6 to 12 months.'
            );
        });

        it('chips only the three select answers', () => {
            expect(assembleTemplate(game).chips).toEqual([
                'Game designer',
                '6-12 months',
                '2-5',
                '30s gameplay breakdown',
            ]);
        });
    });

    describe('pm business', () => {
        const pm = EXAMPLE_PM_SELECTION;

        it('frames the lens around the chosen KPI', () => {
            expect(bodyOf(pm, 'LENS')).toContain('its impact on revenue');
        });

        it('resolves the output selection', () => {
            expect(bodyOf(pm, 'OUTPUT')).toContain('competitive analysis');
        });

        it('chips the KPI and output but not the free-text task', () => {
            expect(assembleTemplate(pm).chips).toEqual([
                'PM (business)',
                'Revenue',
                '2026 analysis',
            ]);
        });
    });
});

describe('software engineer', () => {
    const engineer = EXAMPLE_SOFTWARE_SELECTION;

    /* Same role, but a language that is not one of the four listed. */
    const inGo: Selection = {
        roleId: RoleId.SoftwareEngineer,
        answers: {...engineer.answers, language: toOtherAnswer('Go')},
    };

    it('keeps a multi-line task answer intact in the TASK body', () => {
        expect(bodyOf(engineer, 'TASK')).toBe(engineer.answers.task);
    });

    it('substitutes a listed language with its own name', () => {
        expect(bodyOf(engineer, 'LANGUAGE')).toContain('You write Rust.');
    });

    it('substitutes an Other language with what the user typed', () => {
        expect(bodyOf(inGo, 'LANGUAGE')).toContain('You write Go.');
    });

    it('leaves the token in place when a select has no Other choice', () => {
        // The frontend stack question takes option ids only, so an encoded
        // answer there resolves to nothing rather than injecting raw text.
        const stack: Selection = {
            roleId: RoleId.FrontendEngineer,
            answers: {
                ...EXAMPLE_FRONTEND_SELECTION.answers,
                stack: toOtherAnswer('Svelte'),
            },
        };
        expect(bodyOf(stack, 'DEPENDENCIES')).toContain('{stack}');
    });

    it('chips the language -- the typed one by name -- but not the task', () => {
        expect(assembleTemplate(engineer).chips).toEqual([
            'Software engineer',
            'Rust',
        ]);
        expect(assembleTemplate(inGo).chips).toEqual([
            'Software engineer',
            'Go',
        ]);
    });

    it('spells out the context handoff and its verbose form', () => {
        const text = toText(assemble(engineer));
        expect(text).toContain('CONTEXT HANDOFF');
        expect(text).toContain('"context verbose"');
    });
});

describe('sales engineer', () => {
    const sales = EXAMPLE_SALES_SELECTION;

    /* Same customer, but a driver none of the four options name. */
    const withErp: Selection = {
        roleId: RoleId.SalesEngineer,
        answers: {...sales.answers, priority: toOtherAnswer('their ERP')},
    };

    it('fills the free-text customer into the CUSTOMER body', () => {
        expect(bodyOf(sales, 'CUSTOMER')).toBe(sales.answers.customer);
    });

    it('resolves the decision driver into its own section', () => {
        expect(bodyOf(sales, 'DECISION DRIVER')).toContain(
            'Security and compliance decide it'
        );
    });

    it('substitutes an Other driver with what the user typed', () => {
        expect(bodyOf(withErp, 'DECISION DRIVER')).toBe('their ERP');
    });

    it('asks about needs before recommending, and caps the questions', () => {
        const text = toText(assemble(sales));
        expect(bodyOf(sales, 'DISCOVERY')).toContain(
            'no more than three questions at a time'
        );
        // The wants-vs-needs split is the whole point of the role.
        expect(text).toContain(
            'Separate what they ask for from what they need'
        );
    });

    it('recommends inside the seller catalog rather than inventing one', () => {
        expect(bodyOf(sales, 'CONSTRAINTS')).toContain(
            'the product line to recommend from'
        );
        expect(bodyOf(sales, 'OUTPUT')).toContain('one clear recommendation');
    });

    it('chips the two selects -- the typed driver by name -- not the customer', () => {
        expect(assembleTemplate(sales).chips).toEqual([
            'Sales engineer',
            'Security/compliance',
            'Options compared',
        ]);
        expect(assembleTemplate(withErp).chips).toEqual([
            'Sales engineer',
            'their ERP',
            'Options compared',
        ]);
    });
});
