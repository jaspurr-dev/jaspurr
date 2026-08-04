import {describe, expect, it} from 'vitest';
import {ROLES, ROLE_LIST, getRole} from '@/core/scaffold/roles';
import {
    ROLE_IDS,
    RoleId,
    type Question,
    type Role,
} from '@/core/scaffold/types';
import {NOT_ALLOWED} from '@/core/sanitize';

// A fresh, non-global copy so repeated .test()/.toMatch() calls stay stateless.
const disallowed = new RegExp(NOT_ALLOWED.source);

/* Every string a question puts in front of the user or into the template. */
function questionStrings(question: Question): string[] {
    if (question.kind === 'select') {
        return [
            ...question.options.flatMap((o) => [o.label, o.value]),
            ...(question.other
                ? [question.other.label, question.other.placeholder ?? '']
                : []),
        ];
    }
    return [question.placeholder ?? '', ...(question.examples ?? [])];
}

function roleStrings(role: Role): string[] {
    const questions = role.questions.flatMap((q) => [
        q.prompt,
        ...questionStrings(q),
    ]);
    const templateStrings = role.template.flatMap((s) => [s.heading, s.body]);
    return [role.label, role.line, ...questions, ...templateStrings];
}

describe('scaffold roles', () => {
    it('exposes all 5 roles', () => {
        expect(ROLE_IDS).toHaveLength(5);
        expect(ROLE_LIST).toHaveLength(5);
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

    it('asks the software engineer two questions: a long task, a language', () => {
        const role = ROLES[RoleId.SoftwareEngineer];
        const [task, language] = role.questions;
        expect(role.questions).toHaveLength(2);
        expect(role.badge).toBe('new');
        // The task box takes more than a line, and the language list has an
        // escape hatch, so the role is not limited to the four listed.
        expect(task.multiline).toBe(true);
        expect(language.other.label).toBe('Other');
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
