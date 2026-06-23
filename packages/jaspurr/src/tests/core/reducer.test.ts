import {describe, it, expect} from 'vitest';
import {compositionReducer} from '@/core/reducer';
import {defaultComposition, TEMPLATES} from '@/core/templates';
import {fromTemplate, Output} from '@/core/template';

describe('composition reducer', () => {
    it('default composition is tech pm', () => {
        const base = TEMPLATES['tech-pm-type-a'];
        expect(defaultComposition.templateId).toBe(base.id);

        const c = fromTemplate(base);
        expect(defaultComposition).toStrictEqual(c);
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
