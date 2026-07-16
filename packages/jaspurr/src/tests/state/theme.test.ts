import {describe, expect, it} from 'vitest';
import {resolveTheme, toggle} from '@/state/theme';

describe('resolveTheme', () => {
    it('returns an explicit preference unchanged', () => {
        expect(resolveTheme('light', true)).toBe('light');
        expect(resolveTheme('dark', false)).toBe('dark');
    });

    it('follows the OS while the preference is system', () => {
        expect(resolveTheme('system', true)).toBe('dark');
        expect(resolveTheme('system', false)).toBe('light');
    });
});

describe('toggle', () => {
    it('commits to the opposite of the on-screen theme', () => {
        expect(toggle('light')).toBe('dark');
        expect(toggle('dark')).toBe('light');
    });
});
