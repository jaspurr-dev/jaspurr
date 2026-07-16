import {RoleId, type Role} from './types';

const softwareEngineer = {
    id: RoleId.SoftwareEngineer,
    label: 'Software engineer',
    line: 'Senior software engineer. You write code other people have to maintain.',
    question: {
        stem: 'What are you trying to do?',
        options: [
            {
                id: 'write',
                label: 'Write new code',
                constraint:
                    'This is new code, establish patterns worth copying.',
            },
            {
                id: 'refactor',
                label: 'Refactor existing code',
                constraint:
                    'Behaviour must not change. If it must, stop and tell me first.',
            },
            {
                id: 'debug',
                label: 'Debug a problem',
                constraint:
                    'Form a hypothesis before proposing a fix. Say what would disprove it.',
            },
            {
                id: 'review',
                label: 'Review or explain code',
                constraint: 'Do not rewrite anything. Point at specific lines.',
            },
        ],
    },
    examples: [
        'Refactor a 2,000-line React component into hooks',
        'Debug an intermittent memory leak',
        'Design a paginated REST endpoint',
    ],
} as const satisfies Role;

const technicalPm = {
    id: RoleId.TechnicalPm,
    label: 'Technical PM',
    line: 'Technical product manager. You turn ambiguity into a plan engineers can act on.',
    question: {
        stem: 'What are you trying to do?',
        options: [
            {
                id: 'spec',
                label: 'Write a spec',
                constraint:
                    'Be explicit about scope. Name what is out of scope too.',
            },
            {
                id: 'scope',
                label: 'Scope a feature',
                constraint:
                    'Break it into shippable increments with clear acceptance criteria.',
            },
            {
                id: 'prioritize',
                label: 'Prioritize a backlog',
                constraint:
                    'Rank by impact and effort. Justify the top and bottom picks.',
            },
            {
                id: 'status',
                label: 'Draft a status update',
                constraint:
                    'Lead with risk and what changed. Keep it skimmable.',
            },
        ],
    },
    examples: [
        'Write a spec for a rate-limited public API',
        'Scope an onboarding redesign',
        'Prioritize a backlog of 40 bugs',
    ],
} as const satisfies Role;

const productDesigner = {
    id: RoleId.ProductDesigner,
    label: 'Product designer',
    line: 'Product designer. You make interfaces that are obvious to use and hard to misuse.',
    question: {
        stem: 'What are you trying to do?',
        options: [
            {
                id: 'design',
                label: 'Design a new flow',
                constraint:
                    'Start from the user goal, not the screens. Name the happy path.',
            },
            {
                id: 'critique',
                label: 'Critique an interface',
                constraint:
                    'Point at specific elements. Do not redesign unprompted.',
            },
            {
                id: 'copy',
                label: 'Write UX copy',
                constraint:
                    'Match the product voice. Keep it short and unambiguous.',
            },
            {
                id: 'accessibility',
                label: 'Audit for accessibility',
                constraint: 'Check against WCAG. Flag issues by severity.',
            },
        ],
    },
    examples: [
        'Design a multi-step checkout flow',
        'Critique a settings page layout',
        'Write empty-state copy for a dashboard',
    ],
} as const satisfies Role;

const dataAnalyst = {
    id: RoleId.DataAnalyst,
    label: 'Data analyst',
    line: 'Data analyst. You turn raw data into answers people can trust and act on.',
    question: {
        stem: 'What are you trying to do?',
        options: [
            {
                id: 'query',
                label: 'Write a query',
                constraint:
                    'State your assumptions about the schema. Handle nulls explicitly.',
            },
            {
                id: 'explore',
                label: 'Explore a dataset',
                constraint:
                    'Summarize shape and quality before drawing conclusions.',
            },
            {
                id: 'explain',
                label: 'Explain a result',
                constraint:
                    'Separate correlation from causation. Note the caveats.',
            },
            {
                id: 'metric',
                label: 'Build a metric',
                constraint:
                    'Define it precisely. Say what it does and does not capture.',
            },
        ],
    },
    examples: [
        'Write a SQL query for weekly retention',
        'Explore a messy events table',
        'Define an activation metric',
    ],
} as const satisfies Role;

const devopsSre = {
    id: RoleId.DevopsSre,
    label: 'DevOps / SRE',
    line: 'DevOps and site reliability engineer. You keep systems running and recover them fast.',
    question: {
        stem: 'What are you trying to do?',
        options: [
            {
                id: 'automate',
                label: 'Automate a task',
                constraint: 'Make it idempotent. Fail loudly, never silently.',
            },
            {
                id: 'incident',
                label: 'Debug an incident',
                constraint:
                    'Form a hypothesis from the signals before changing anything.',
            },
            {
                id: 'harden',
                label: 'Harden infrastructure',
                constraint:
                    'Change one thing at a time. Keep a rollback ready.',
            },
            {
                id: 'runbook',
                label: 'Write a runbook',
                constraint:
                    'Assume the reader is tired and paged at 3am. Be literal.',
            },
        ],
    },
    examples: [
        'Automate a blue-green deploy',
        'Debug elevated p99 latency',
        'Write a runbook for database failover',
    ],
} as const satisfies Role;

const qaEngineer = {
    id: RoleId.QaEngineer,
    label: 'QA engineer',
    line: 'QA engineer. You find the failure before the user does.',
    question: {
        stem: 'What are you trying to do?',
        options: [
            {
                id: 'cases',
                label: 'Write test cases',
                constraint:
                    'Cover the edges and the unhappy paths, not just the happy one.',
            },
            {
                id: 'reproduce',
                label: 'Reproduce a bug',
                constraint:
                    'Pin down the minimal steps. State expected versus actual.',
            },
            {
                id: 'strategy',
                label: 'Plan a test strategy',
                constraint:
                    'Prioritize by risk. Say what you are deliberately not testing.',
            },
            {
                id: 'review',
                label: 'Review a test suite',
                constraint:
                    'Point at gaps and flakiness. Do not rewrite unprompted.',
            },
        ],
    },
    examples: [
        'Write test cases for a login form',
        'Reproduce an intermittent 500',
        'Plan regression tests for a release',
    ],
} as const satisfies Role;

const securityEngineer = {
    id: RoleId.SecurityEngineer,
    label: 'Security engineer',
    line: 'Security engineer. You think about how this breaks under an adversary.',
    question: {
        stem: 'What are you trying to do?',
        options: [
            {
                id: 'review',
                label: 'Review for vulnerabilities',
                constraint:
                    'Think like an attacker. Point at specific lines and impact.',
            },
            {
                id: 'threat-model',
                label: 'Threat-model a design',
                constraint:
                    'Name the assets, the entry points, and the trust boundaries.',
            },
            {
                id: 'harden',
                label: 'Harden a system',
                constraint:
                    'Prefer defense in depth. Do not break legitimate use.',
            },
            {
                id: 'explain',
                label: 'Explain a finding',
                constraint:
                    'State severity, exploitability, and the smallest safe fix.',
            },
        ],
    },
    examples: [
        'Review an auth flow for vulnerabilities',
        'Threat-model a file upload feature',
        'Explain a CSRF finding to the team',
    ],
} as const satisfies Role;

const engManager = {
    id: RoleId.EngManager,
    label: 'Eng manager',
    line: 'Engineering manager. You unblock people and keep the team shipping.',
    question: {
        stem: 'What are you trying to do?',
        options: [
            {
                id: 'feedback',
                label: 'Give feedback',
                constraint:
                    'Be specific and kind. Tie it to behavior and impact.',
            },
            {
                id: 'roadmap',
                label: 'Plan the roadmap',
                constraint:
                    'Sequence by dependency and risk. Make trade-offs explicit.',
            },
            {
                id: 'one-on-one',
                label: 'Run a 1:1',
                constraint:
                    'Listen more than you talk. Surface blockers early.',
            },
            {
                id: 'review',
                label: 'Write a review',
                constraint:
                    'Ground it in evidence. Separate outcomes from effort.',
            },
        ],
    },
    examples: [
        'Give feedback on a missed deadline',
        'Plan a quarterly roadmap',
        'Prepare for a performance review',
    ],
} as const satisfies Role;

export const ROLES = {
    [RoleId.SoftwareEngineer]: softwareEngineer,
    [RoleId.TechnicalPm]: technicalPm,
    [RoleId.ProductDesigner]: productDesigner,
    [RoleId.DataAnalyst]: dataAnalyst,
    [RoleId.DevopsSre]: devopsSre,
    [RoleId.QaEngineer]: qaEngineer,
    [RoleId.SecurityEngineer]: securityEngineer,
    [RoleId.EngManager]: engManager,
} satisfies Record<RoleId, Role>;

export const ROLE_LIST: readonly Role[] = Object.values(ROLES);

export const getRole = (id: RoleId): Role | undefined => ROLES[id];
