import {sanitize} from '@/core/sanitize';
import {ENVIRONMENT_QUESTION, OUTPUT_QUESTION} from './questions';
import {ROLES, getRole} from './roles';
import type {EnvironmentId, OutputId, RoleId} from './types';

/* The task options are role-specific, so the set of valid task ids depends on
the role. Resolve one role's task-id union straight from the role data. */
type TaskId<R extends RoleId> =
    (typeof ROLES)[R]['question']['options'][number]['id'];

export type Selection = {
    [R in RoleId]: {
        readonly roleId: R;
        readonly taskId: TaskId<R>;
        readonly environmentId: EnvironmentId;
        readonly outputId: OutputId;
        readonly topic: string;
    };
}[RoleId];

export interface Section {
    readonly heading: string;
    readonly body: string;
}

/* ROLE, CONTEXT, TASK, CONSTRAINTS, OUTPUT FORMAT, TONE. */
export type Assembled = readonly [
    Section,
    Section,
    Section,
    Section,
    Section,
    Section,
];

export function assemble(selection: Selection): Assembled {
    const role = getRole(selection.roleId);
    if (!role) {
        throw new Error(`Unknown role: ${selection.roleId}`);
    }

    const task = role.question.options.find((o) => o.id === selection.taskId);
    const environment = ENVIRONMENT_QUESTION.options.find(
        (o) => o.id === selection.environmentId
    );
    const output = OUTPUT_QUESTION.options.find(
        (o) => o.id === selection.outputId
    );
    if (!task || !environment || !output) {
        throw new Error('Selection references an option that does not exist.');
    }

    return [
        {heading: 'ROLE', body: role.line},
        {heading: 'CONTEXT', body: environment.context},
        {heading: 'TASK', body: sanitize(selection.topic)},
        {
            heading: 'CONSTRAINTS',
            body: `- ${task.constraint}\n- ${environment.constraint}`,
        },
        {heading: 'OUTPUT FORMAT', body: output.format},
        {heading: 'TONE', body: output.tone},
    ];
}

export function toText(sections: Assembled): string {
    return sanitize(
        sections.map((s) => `${s.heading}\n${s.body}`).join('\n\n')
    );
}
