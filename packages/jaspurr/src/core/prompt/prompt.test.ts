import {describe, expect, test} from 'vitest';
import {promptCompose} from './prompt';

describe('Build Prompts', () => {
    const params = [
        ['', ' :)'],
        ['foo', 'foo :)'],
        ['hEll0 woRld! ', 'hEll0 woRld!  :)'],
    ];
    test.for(params)(
        'appends :) to the input prompt "%s"',
        ([input, expected]) => {
            const output = promptCompose(input ?? '');
            expect(output).toBe(expected);
        }
    );
});
