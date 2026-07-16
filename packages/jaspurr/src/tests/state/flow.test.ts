import {describe, expect, it} from 'vitest';
import {createStore} from 'jotai';
import {
    flowAtom,
    stepAtom,
    draftAtom,
    selectionAtom,
    assembledAtom,
} from '@/state/flow';
import {RoleId} from '@/core/scaffold/types';

function walkToTopic(store: ReturnType<typeof createStore>) {
    store.set(flowAtom, {type: 'pickRole', roleId: RoleId.SoftwareEngineer});
    store.set(flowAtom, {type: 'pickTask', taskId: 'refactor'});
    store.set(flowAtom, {type: 'pickEnvironment', environmentId: 'mature'});
    store.set(flowAtom, {type: 'pickOutput', outputId: 'output-only'});
}

describe('flow machine', () => {
    it('auto-advances role -> task -> environment -> output -> topic', () => {
        const store = createStore();
        expect(store.get(stepAtom)).toBe('role');
        store.set(flowAtom, {
            type: 'pickRole',
            roleId: RoleId.SoftwareEngineer,
        });
        expect(store.get(stepAtom)).toBe('task');
        store.set(flowAtom, {type: 'pickTask', taskId: 'refactor'});
        expect(store.get(stepAtom)).toBe('environment');
        store.set(flowAtom, {type: 'pickEnvironment', environmentId: 'mature'});
        expect(store.get(stepAtom)).toBe('output');
        store.set(flowAtom, {type: 'pickOutput', outputId: 'output-only'});
        expect(store.get(stepAtom)).toBe('topic');
    });

    it('setTopic records the line without advancing; finish reaches result', () => {
        const store = createStore();
        walkToTopic(store);
        store.set(flowAtom, {type: 'setTopic', topic: 'Refactor a component'});
        expect(store.get(stepAtom)).toBe('topic');
        expect(store.get(draftAtom).topic).toBe('Refactor a component');
        store.set(flowAtom, {type: 'finish'});
        expect(store.get(stepAtom)).toBe('result');
    });

    it('exposes no selection until every answer is chosen', () => {
        const store = createStore();
        expect(store.get(selectionAtom)).toBeNull();
        expect(store.get(assembledAtom)).toBeNull();
        store.set(flowAtom, {
            type: 'pickRole',
            roleId: RoleId.SoftwareEngineer,
        });
        store.set(flowAtom, {type: 'pickTask', taskId: 'refactor'});
        store.set(flowAtom, {type: 'pickEnvironment', environmentId: 'mature'});
        expect(store.get(selectionAtom)).toBeNull();
        store.set(flowAtom, {type: 'pickOutput', outputId: 'output-only'});
        expect(store.get(selectionAtom)).not.toBeNull();
    });

    it('assembles the chosen answers once complete', () => {
        const store = createStore();
        walkToTopic(store);
        store.set(flowAtom, {
            type: 'setTopic',
            topic: 'Refactor a 2,000-line React component into hooks',
        });
        expect(store.get(assembledAtom)?.chips).toEqual([
            'Software engineer',
            'Refactor existing code',
            'Mature and well-tested',
            'Just the output',
        ]);
    });

    it('invalidates the task answer when the role changes', () => {
        const store = createStore();
        store.set(flowAtom, {
            type: 'pickRole',
            roleId: RoleId.SoftwareEngineer,
        });
        store.set(flowAtom, {type: 'pickTask', taskId: 'refactor'});
        expect(store.get(draftAtom).taskId).toBe('refactor');
        store.set(flowAtom, {type: 'pickRole', roleId: RoleId.TechnicalPm});
        expect(store.get(draftAtom).taskId).toBeNull();
        expect(store.get(stepAtom)).toBe('task');
    });

    it('keeps the task answer when the same role is re-picked', () => {
        const store = createStore();
        store.set(flowAtom, {
            type: 'pickRole',
            roleId: RoleId.SoftwareEngineer,
        });
        store.set(flowAtom, {type: 'pickTask', taskId: 'refactor'});
        store.set(flowAtom, {
            type: 'pickRole',
            roleId: RoleId.SoftwareEngineer,
        });
        expect(store.get(draftAtom).taskId).toBe('refactor');
    });

    it('changeAnswers returns to the start keeping the draft', () => {
        const store = createStore();
        walkToTopic(store);
        store.set(flowAtom, {type: 'finish'});
        expect(store.get(stepAtom)).toBe('result');
        store.set(flowAtom, {type: 'changeAnswers'});
        expect(store.get(stepAtom)).toBe('role');
        expect(store.get(draftAtom).roleId).toBe(RoleId.SoftwareEngineer);
    });

    it('reset clears the draft back to the start', () => {
        const store = createStore();
        walkToTopic(store);
        store.set(flowAtom, {type: 'reset'});
        expect(store.get(stepAtom)).toBe('role');
        expect(store.get(draftAtom)).toEqual({
            roleId: null,
            taskId: null,
            environmentId: null,
            outputId: null,
            topic: '',
        });
    });

    it('back steps to the previous question, keeping answers', () => {
        const store = createStore();
        store.set(flowAtom, {
            type: 'pickRole',
            roleId: RoleId.SoftwareEngineer,
        });
        store.set(flowAtom, {type: 'pickTask', taskId: 'refactor'});
        expect(store.get(stepAtom)).toBe('environment');
        store.set(flowAtom, {type: 'back'});
        expect(store.get(stepAtom)).toBe('task');
        expect(store.get(draftAtom).taskId).toBe('refactor');
        store.set(flowAtom, {type: 'back'});
        expect(store.get(stepAtom)).toBe('role');
        expect(store.get(draftAtom).roleId).toBe(RoleId.SoftwareEngineer);
    });

    it('back from the first step is a no-op', () => {
        const store = createStore();
        store.set(flowAtom, {type: 'back'});
        expect(store.get(stepAtom)).toBe('role');
    });
});
