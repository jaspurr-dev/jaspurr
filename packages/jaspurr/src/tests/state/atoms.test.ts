import {describe, it, expect, vi, afterEach} from 'vitest';
import {createStore} from 'jotai';
import {
    compositionAtom,
    previewAtom,
    copyAtom,
    outputSelectAtom,
    stepsSelectAtom,
} from '@/state/atoms';
import {Output} from '@/core/template';
import {defaultComposition} from '@/core/templates';
import {serialize} from '@/core/serialize';
import {compositionReducer} from '@/core/reducer';

afterEach(() => vi.unstubAllGlobals());

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

    it('previewAtom writes the exact preview text to user clipboard', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        vi.stubGlobal('navigator', {clipboard: {writeText}});

        const store = createStore();
        store.set(compositionAtom, {
            type: 'setOutput',
            format: 'architecture-diagram',
        });

        const expectedText = store.get(previewAtom);
        expect(expectedText).toStrictEqual(
            serialize(
                compositionReducer(defaultComposition, {
                    type: 'setOutput',
                    format: 'architecture-diagram',
                })
            )
        );

        const setText = await store.set(copyAtom);

        expect(writeText).toHaveBeenCalledTimes(1);
        expect(writeText).toHaveBeenCalledWith(expectedText);
        expect(setText).toStrictEqual(expectedText);
    });
});
