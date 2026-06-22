import {describe, expect, it} from 'vitest';
import {sanitize} from '@/core/sanitize';

// See https://en.wikipedia.org/wiki/ASCII for the ASCII character encoding standard.

// Skip the first 30 ASCII characters because they're
// reserved control codes for peripheral devices / signal / data streams.
// We allow /n and /t.
const START = 0x20; // 32 - space character

// We allow 95 visible, characters up to 0x7e in Hexadecimal (or 126 in decimal).
// Anything beyond that range is disallowed and not supported. As of this time,
// we only support ASCII and not Unicode for the ease of auditing (95 characters vs. 150k+ allowed).
// Unicode has 1M+ possible code points, future points could be adopted - therefore, it places
// additional burden to add numerous tests to harden against these additions.

// There's a security benefit with restricting to ASCII vs. Unicode - Unicode allows hidden characters
// and overrides which represent a potential vulnerability in text representing instructions. There are some
// natural limitations on how diffs may or may not render these in a PR, so it places the burden on correct
// test coverage + CI to actually detect these vulnerabilities (instead of a human reviewer) by examining
// and filtering/flagging the disallowed characters. This skews test coverage to be load-bearing and a simpler
// solution is to simply use the restrictive ASCII character set and disallow anything outside of that.
const END = 0x7e; // 126 - tilda character

const ALLOWED = Array.from({length: END - START + 1}, (_, i) =>
    String.fromCharCode(START + i)
).join('');

describe('sanitize test suite', () => {
    describe('ascii', () => {
        it('has a fixed character set range', () => {
            expect(START).toBe(32);
            expect(String.fromCharCode(START)).toBe(' ');

            expect(END).toBe(126);
            expect(String.fromCharCode(END)).toBe('~');

            expect(ALLOWED.length).toBe(95);
            expect(ALLOWED).toBe(
                ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
            );
        });

        it('works with all 95 ascii characters', () => {
            const set =
                ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
            const sanitized = sanitize(set);

            expect(set).toBe(sanitized);
        });

        it('disallows ascii control characters except tab and newline', () => {
            // Build an array with all of the ASCII control characters
            // minus /t and /n which we allow.
            const CONTROL = Array.from({length: START}, (_, i) =>
                String.fromCharCode(0 + i)
            )
                .filter((c) => c !== '\t' && c !== '\n')
                .join('');
            expect(CONTROL.length).toBe(30);

            // Escape sequences map to a single character
            // so this is a 9-character string, not 11.
            const s = '\n\tfoo bar';
            const len = s.length;
            expect(len).toBe(9);

            const input = CONTROL + s;
            expect(input.length).toBe(39);

            const sanitized = sanitize(input);
            expect(sanitized.length).toBe(len);
            expect(sanitized).toBe('\n\tfoo bar');
        });

        it('disallows characters outside of the ASCII range', () => {
            const input = 'café';
            const len = input.length;
            expect(len).toBe(4);

            const sanitized = sanitize(input);
            expect(sanitized.length).toBe(len - 1);
            expect(sanitized).toBe('caf');
        });

        it('disallows emoji', () => {
            const input = 'a😀b';
            const len = input.length;
            expect(len).toBe(4);
            expect(input).toBe('a\uD83D\uDE00b');

            const sanitized = sanitize(input);
            expect(sanitized.length).toBe(2);
            expect(sanitized).toBe('ab');
        });
    });
});
