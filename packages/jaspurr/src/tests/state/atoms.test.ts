import {describe, it, expect} from 'vitest';
import {createStore} from 'jotai';
import {
    compositionAtom,
    outputSelectAtom,
    stepsSelectAtom,
} from '@/state/atoms';
import {Output} from '@/core/template';
import {defaultComposition} from '@/core/templates';

describe('atom state graph', () => {
    it('changing output gets to the output selector atom', () => {
        const store = createStore();
        expect(store.get(outputSelectAtom)).toBe(Output.PrioritizedList);
        store.set(compositionAtom, {
            type: 'setOutput',
            format: 'architecture-diagram',
        });
        expect(store.get(outputSelectAtom)).toBe(Output.ArchitectureDiagram);
    });

    it('removing steps gets to the steps selector atom', () => {
        const store = createStore();
        expect(store.get(stepsSelectAtom)).toHaveLength(
            defaultComposition.steps.length
        );

        store.set(compositionAtom, {
            type: 'deleteStep',
            index: 1,
        });
        expect(store.get(stepsSelectAtom)).toHaveLength(
            defaultComposition.steps.length - 1
        );
    });
});
