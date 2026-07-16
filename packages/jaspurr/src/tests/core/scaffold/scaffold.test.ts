import {describe, expect, it} from 'vitest';
import {ROLES, ROLE_LIST, getRole} from '@/core/scaffold/roles';
import {ENVIRONMENT_QUESTION, OUTPUT_QUESTION} from '@/core/scaffold/questions';
import {ROLE_IDS, type Role} from '@/core/scaffold/types';
import {NOT_ALLOWED} from '@/core/sanitize';

// A fresh, non-global copy so repeated .test()/.toMatch() calls stay stateless.
const disallowed = new RegExp(NOT_ALLOWED.source);

function roleStrings(role: Role): string[] {
    return [
        role.label,
        role.line,
        role.question.stem,
        ...role.question.options.flatMap((o) => [o.label, o.constraint]),
        ...role.examples,
    ];
}

const sharedStrings: string[] = [
    ENVIRONMENT_QUESTION.stem,
    ...ENVIRONMENT_QUESTION.options.flatMap((o) => [
        o.label,
        o.context,
        o.constraint,
    ]),
    OUTPUT_QUESTION.stem,
    ...OUTPUT_QUESTION.options.flatMap((o) => [o.label, o.format, o.tone]),
];

describe('scaffold roles', () => {
    it('exposes all eight roles', () => {
        expect(ROLE_IDS).toHaveLength(8);
        expect(ROLE_LIST).toHaveLength(8);
    });

    it('keys every role by its own id', () => {
        for (const id of ROLE_IDS) {
            expect(ROLES[id].id).toBe(id);
            expect(getRole(id)?.id).toBe(id);
        }
    });

    it('gives every role a Q1 with exactly four options', () => {
        for (const role of ROLE_LIST) {
            expect(role.question.options).toHaveLength(4);
        }
    });

    it('gives every role three example chips', () => {
        for (const role of ROLE_LIST) {
            expect(role.examples).toHaveLength(3);
        }
    });
});

describe('scaffold shared questions', () => {
    it('offers four environment options and four output options', () => {
        expect(ENVIRONMENT_QUESTION.options).toHaveLength(4);
        expect(OUTPUT_QUESTION.options).toHaveLength(4);
    });
});

describe('scaffold content', () => {
    it('stays inside the ASCII allowlist', () => {
        const all = [...ROLE_LIST.flatMap(roleStrings), ...sharedStrings];
        for (const value of all) {
            expect(value).not.toMatch(disallowed);
        }
    });
});
