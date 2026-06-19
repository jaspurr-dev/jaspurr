import {describe, expect, it} from 'vitest';
import {TEMPLATES} from '@/core/templates';

describe('template core', () => {
    it('keys every template by own id', () => {
        for (const [key, template] of Object.entries(TEMPLATES))
            expect(template.id).toBe(key);
    });
});
