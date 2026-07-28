import {describe, expect, it} from 'vitest';
import type {MouseEvent} from 'react';
import {opensNewContext} from '@/util/link';

interface ClickFlags {
    button: number;
    metaKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
}

/* opensNewContext reads nothing but the button and modifier flags, so a plain
object standing in for the synthetic event is enough. */
function click(overrides: Partial<ClickFlags> = {}): MouseEvent {
    const flags: ClickFlags = {
        button: 0,
        metaKey: false,
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        ...overrides,
    };
    return flags as unknown as MouseEvent;
}

describe('opensNewContext', () => {
    it('is false for a plain left click, which navigates this tab', () => {
        expect(opensNewContext(click())).toBe(false);
    });

    it('is true for every modifier that opens a new tab or window', () => {
        expect(opensNewContext(click({metaKey: true}))).toBe(true);
        expect(opensNewContext(click({ctrlKey: true}))).toBe(true);
        expect(opensNewContext(click({shiftKey: true}))).toBe(true);
        expect(opensNewContext(click({altKey: true}))).toBe(true);
    });

    it('is true for a non-primary button, e.g. a middle click', () => {
        expect(opensNewContext(click({button: 1}))).toBe(true);
    });
});
