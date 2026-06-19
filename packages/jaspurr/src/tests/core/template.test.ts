import {describe, expect, it} from 'vitest';
import {TEMPLATES, type TemplateId} from '@/core/templates';
import {fromTemplate, Output, OUTPUTS} from '@/core/template';

describe('template core', () => {
    it('keys every template by own id', () => {
        for (const [key, template] of Object.entries(TEMPLATES))
            expect(template.id).toBe(key);
    });

    it('is run-time editable without affecting the template source', () => {
        const t = TEMPLATES['tech-pm-type-a'];
        const c = fromTemplate(t);
        const len = 1;

        expect(c.steps).toHaveLength(len);
        c.steps.pop();

        expect(c.steps).toHaveLength(t.steps.length - 1);
        expect(t.steps).toHaveLength(len);
    });

    it('expects exported const object to contain output property key', () => {
        expect(OUTPUTS).toContain(Output.PrioritizedList);
    });

    it('expects a template to contain output property when constructed via raw key id', () => {
        const id: TemplateId = 'tech-pm-type-a';
        const t = TEMPLATES[id];
        expect(OUTPUTS).toContain(t.output);
    });
});
