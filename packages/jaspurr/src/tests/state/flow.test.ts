import {describe, expect, it} from 'vitest';
import {createStore} from 'jotai';
import {
    flowAtom,
    stepAtom,
    roleIdAtom,
    answersAtom,
    positionAtom,
    currentQuestionAtom,
    selectionAtom,
    assembledAtom,
} from '@/state/flow';
import {RoleId} from '@/core/scaffold/types';

import {EXAMPLE_COMPANY_ID} from '@/core/scaffold/roles';

type Store = ReturnType<typeof createStore>;

/* Walk the visual-designer flow to completion: company (text) -> context
(select) -> task (select) -> result. */
function complete(store: Store) {
    store.set(flowAtom, {type: 'pickRole', roleId: RoleId.VisualDesigner});
    store.set(flowAtom, {type: 'setText', value: EXAMPLE_COMPANY_ID});
    store.set(flowAtom, {type: 'next'});
    store.set(flowAtom, {type: 'answer', value: 'existing'});
    store.set(flowAtom, {type: 'answer', value: 'refresh'});
}

describe('flow machine', () => {
    it('walks a role question by question, then to the result', () => {
        const store = createStore();
        expect(store.get(stepAtom)).toBe('role');
        store.set(flowAtom, {type: 'pickRole', roleId: RoleId.VisualDesigner});
        expect(store.get(stepAtom)).toBe('question');
        expect(store.get(positionAtom)).toEqual({number: 1, total: 3});
        expect(store.get(currentQuestionAtom)?.kind).toBe('text');
        // A text answer records without advancing.
        store.set(flowAtom, {type: 'setText', value: EXAMPLE_COMPANY_ID});
        expect(store.get(positionAtom).number).toBe(1);
        store.set(flowAtom, {type: 'next'});
        expect(store.get(positionAtom).number).toBe(2);
        // A select answer auto-advances.
        store.set(flowAtom, {type: 'answer', value: 'existing'});
        expect(store.get(positionAtom).number).toBe(3);
        store.set(flowAtom, {type: 'answer', value: 'refresh'});
        expect(store.get(stepAtom)).toBe('result');
    });

    it('ignores a tap on a coming-soon role', () => {
        const store = createStore();
        store.set(flowAtom, {
            type: 'pickRole',
            roleId: RoleId.FrontendEngineer,
        });
        expect(store.get(stepAtom)).toBe('role');
        expect(store.get(roleIdAtom)).toBeNull();
    });

    it('exposes no selection until every question is answered', () => {
        const store = createStore();
        expect(store.get(selectionAtom)).toBeNull();
        expect(store.get(assembledAtom)).toBeNull();

        store.set(flowAtom, {type: 'pickRole', roleId: RoleId.VisualDesigner});
        store.set(flowAtom, {type: 'setText', value: EXAMPLE_COMPANY_ID});
        store.set(flowAtom, {type: 'next'});
        store.set(flowAtom, {type: 'answer', value: 'existing'});
        expect(store.get(selectionAtom)).toBeNull();
        store.set(flowAtom, {type: 'answer', value: 'refresh'});
        expect(store.get(selectionAtom)).not.toBeNull();
    });

    it('records answers by question id and assembles their chips', () => {
        const store = createStore();
        complete(store);
        expect(store.get(answersAtom)).toEqual({
            company: EXAMPLE_COMPANY_ID,
            context: 'existing',
            task: 'refresh',
        });
        expect(store.get(assembledAtom)?.chips).toEqual([
            'Visual designer',
            'Existing project',
            'Refresh an existing UI',
        ]);
    });

    it('keeps answers when the same role is re-picked', () => {
        const store = createStore();
        store.set(flowAtom, {type: 'pickRole', roleId: RoleId.VisualDesigner});
        store.set(flowAtom, {type: 'setText', value: EXAMPLE_COMPANY_ID});
        store.set(flowAtom, {type: 'pickRole', roleId: RoleId.VisualDesigner});
        expect(store.get(answersAtom).company).toBe(EXAMPLE_COMPANY_ID);
    });

    it('back from the result returns to the last question', () => {
        const store = createStore();
        complete(store);

        expect(store.get(stepAtom)).toBe('result');

        store.set(flowAtom, {type: 'back'});
        expect(store.get(stepAtom)).toBe('question');
        expect(store.get(positionAtom).number).toBe(3);
    });

    it('changeAnswers returns to the start keeping the draft', () => {
        const store = createStore();
        complete(store);
        store.set(flowAtom, {type: 'changeAnswers'});
        expect(store.get(stepAtom)).toBe('question');
        expect(store.get(positionAtom).number).toBe(1);
        expect(store.get(answersAtom).company).toBe(EXAMPLE_COMPANY_ID);
    });

    it('reset clears the draft back to the start', () => {
        const store = createStore();
        complete(store);
        store.set(flowAtom, {type: 'reset'});
        expect(store.get(stepAtom)).toBe('role');
        expect(store.get(roleIdAtom)).toBeNull();
        expect(store.get(answersAtom)).toEqual({});
    });

    it('back from the first step is a no-op', () => {
        const store = createStore();
        store.set(flowAtom, {type: 'back'});
        expect(store.get(stepAtom)).toBe('role');
    });
});
