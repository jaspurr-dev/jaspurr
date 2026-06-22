import {describe, expect, it} from 'vitest';
import {sanitize} from '@/core/sanitize';

// See https://en.wikipedia.org/wiki/ASCII for the ASCII character encoding standard.

// Skip the first 29 ASCII characters because they're
// reserved control codes for peripheral devices / signal / data streams.
// We allow /n and /t and /r.
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
            expect(sanitized.length).toBe(set.length);
        });

        it('disallows ascii control characters except tab and newline and carriage return', () => {
            // Build an array with all of the ASCII control characters
            // minus /t and /n and /r which we allow.
            const CONTROL = Array.from({length: START}, (_, i) =>
                String.fromCharCode(0 + i)
            )
                .filter((c) => c !== '\t' && c !== '\n' && c !== '\r')
                .join('');
            expect(CONTROL.length).toBe(29);

            // Escape sequences map to a single character
            // so this is a 10-character string.
            const s = '\n\tfoo \rbar';
            const len = s.length;
            expect(len).toBe(10);

            const input = CONTROL + s;
            expect(input.length).toBe(39);

            const expectedBytes = String.fromCharCode(
                10, // Newline
                9, // Tab
                102, // f
                111, // o
                111, // o
                10, // Newline
                98, // b
                97, // a
                114 // r
            );

            const sanitized = sanitize(input);

            expect(sanitized.length).toBe(len - 1);
            expect(sanitized).toBe(expectedBytes);
            expect(sanitized).toBe('\n\tfoo\nbar');
        });

        it('preserves newlines, spaces, and tabs', () => {
            const input = '#heading\n  foo\n\tbar';
            expect(input.length).toBe(19);

            const sanitized = sanitize(input);
            expect(sanitized.length).toBe(19);
            expect(sanitized).toBe(input);
        });

        it('preserves newline runs', () => {
            const input = 'foo        bar';
            expect(input.length).toBe(14);

            const sanitized = sanitize(input);
            expect(sanitized.length).toBe(14);
            expect(sanitized).toBe(input);
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

        it('sanitizes characters with multiple encodings (NFC vs. NFD) consistently', () => {
            // Stores the letter + accent as separate code points
            const nfd = 'cafe\u0301';
            expect(nfd.length).toBe(5);
            const sx = sanitize(nfd);

            // Stores the letter + accent as a SINGLE code point
            const nfc = 'caf\u00E9';
            expect(nfc.length).toBe(4);
            expect(nfc).toBe('café');
            const sy = sanitize(nfc);

            // Both encodings should yield 'caf' after NFC normalization
            expect(sx).toBe('caf');
            expect(sy).toBe('caf');

            // Both encodings should be len: 3 after NFC normalization
            expect(sx.length).toBe(3);
            expect(sy.length).toBe(3);
        });

        it('transform carriage return (CR) to newline', () => {
            expect(sanitize('foo\rbar')).toBe('foo\nbar');
        });

        it('transforms CRLF (Carriage Return and Line Feed) to newline', () => {
            expect(sanitize('foo\r\nbar')).toBe('foo\nbar');
        });

        it('removes trailing spaces/tabs at EOL', () => {
            const input =
                ' \
    hi      \
    ';
            const sanitized = sanitize(input);
            console.log(sanitized.length);
            expect(sanitized).toBe('     hi');
            expect(sanitized.length).toBe(7);
        });
    });
});
