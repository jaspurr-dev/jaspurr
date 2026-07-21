import {describe, expect, it} from 'vitest';
import {ROLES, ROLE_LIST, getRole} from '@/core/scaffold/roles';
import {ROLE_IDS, RoleId, type Role} from '@/core/scaffold/types';
import {NOT_ALLOWED} from '@/core/sanitize';

// A fresh, non-global copy so repeated .test()/.toMatch() calls stay stateless.
const disallowed = new RegExp(NOT_ALLOWED.source);

function roleStrings(role: Role): string[] {
    const questionStrings = role.questions.flatMap((q) => [
        q.prompt,
        ...(q.kind === 'select'
            ? q.options.flatMap((o) => [o.label, o.value])
            : (q.examples ?? [])),
    ]);
    const templateStrings = role.template.flatMap((s) => [s.heading, s.body]);
    return [role.label, role.line, ...questionStrings, ...templateStrings];
}

describe('scaffold roles', () => {
    it('exposes all 4 roles', () => {
        expect(ROLE_IDS).toHaveLength(4);
        expect(ROLE_LIST).toHaveLength(4);
    });

    it('keys every role by its own id', () => {
        for (const id of ROLE_IDS) {
            expect(ROLES[id].id).toBe(id);
            expect(getRole(id)?.id).toBe(id);
        }
    });

    it('gives the ready role a question flow and a template', () => {
        const designer = ROLES[RoleId.VisualDesigner];
        expect(designer.status).toBe('ready');
        expect(designer.questions.length).toBeGreaterThan(0);
        expect(designer.template.length).toBeGreaterThan(0);
    });

    it('keeps each role consistent with its status', () => {
        // ready role => flow + template; coming-soon => neither. Holds either way.
        for (const role of ROLE_LIST) {
            if (role.status === 'ready') {
                expect(role.questions.length).toBeGreaterThan(0);
                expect(role.template.length).toBeGreaterThan(0);
            } else {
                expect(role.questions).toHaveLength(0);
                expect(role.template).toHaveLength(0);
            }
        }
    });

    it('gives every select question at least two options', () => {
        for (const role of ROLE_LIST) {
            for (const question of role.questions) {
                if (question.kind === 'select') {
                    expect(question.options.length).toBeGreaterThanOrEqual(2);
                }
            }
        }
    });
});

describe('scaffold content', () => {
    it('stays inside the ASCII allowlist', () => {
        for (const value of ROLE_LIST.flatMap(roleStrings)) {
            expect(value).not.toMatch(disallowed);
        }
    });
});
