import {describe, expect, it} from 'vitest';
import {TEMPLATES} from '@/core/templates';
import {fromTemplate} from '@/core/template';

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
});
