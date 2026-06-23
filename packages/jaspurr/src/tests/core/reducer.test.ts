import {describe, it, expect} from 'vitest';
import {compositionReducer} from '@/core/reducer';
import {defaultComposition, TEMPLATES} from '@/core/templates';
import {fromTemplate, Output} from '@/core/template';
import type {CompositionAction} from '@/core/actions';

describe('composition reducer', () => {
    it('default composition is tech pm', () => {
        const base = TEMPLATES['tech-pm-type-a'];
        expect(defaultComposition.templateId).toBe(base.id);

        const c = fromTemplate(base);
        expect(defaultComposition).toStrictEqual(c);
    });

    it('throws on an unsupported action in the reducer', () => {
        expect(() =>
            compositionReducer(defaultComposition, {
                type: 'foo',
            } as unknown as CompositionAction)
        ).toThrow();
    });

    it('deleteStep removes the step at index', () => {
        const updated = compositionReducer(defaultComposition, {
            type: 'deleteStep',
            index: 0,
        });
        expect(updated.steps).toHaveLength(defaultComposition.steps.length - 1);

        const updateMore = compositionReducer(updated, {
            type: 'deleteStep',
            index: 2,
        });
        expect(updateMore.steps).toHaveLength(
            defaultComposition.steps.length - 2
        );

        expect(updateMore.steps).not.toContain(defaultComposition.steps[0]);
        expect(updateMore.steps).not.toContain(defaultComposition.steps[3]);
        expect(updateMore.steps).not.toStrictEqual(defaultComposition.steps);
    });

    it('setOutput changes the output format of the composition', () => {
        const updated = compositionReducer(defaultComposition, {
            type: 'setOutput',
            format: 'architecture-diagram',
        });
        expect(updated.output).toBe(Output.ArchitectureDiagram);

        const back = compositionReducer(updated, {
            type: 'setOutput',
            format: 'prioritized-list',
        });
        expect(back.output).toBe(Output.PrioritizedList);
    });
});
