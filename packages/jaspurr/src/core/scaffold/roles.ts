import {RoleId, type Role} from './types';
import type {Selection} from './assemble';

/* --- Visual designer: the first fully-wired role -------------------------- */

const visualDesigner = {
    id: RoleId.VisualDesigner,
    label: 'Visual designer',
    line: 'Eye-catching, intuitive design from an ex-big-tech eye.',
    status: 'ready',
    questions: [
        {
            id: 'company',
            kind: 'text',
            prompt: 'Whose design bar are you aiming for?',
            placeholder: 'e.g. a product whose design you admire',
        },
        {
            id: 'context',
            kind: 'select',
            prompt: 'What kind of project is this?',
            options: [
                {
                    id: 'new',
                    label: 'New project',
                    value: 'This is a new project starting from a blank canvas.',
                },
                {
                    id: 'existing',
                    label: 'Existing project',
                    value: 'This is an existing product with an established design language to work within.',
                },
            ],
        },
        {
            id: 'task',
            kind: 'select',
            prompt: 'What do you need?',
            options: [
                {
                    id: 'screen',
                    label: 'Design a new screen',
                    value: 'Design a new screen or flow from scratch.',
                },
                {
                    id: 'refresh',
                    label: 'Refresh an existing UI',
                    value: 'Refresh and modernize an existing interface.',
                },
                {
                    id: 'explore',
                    label: 'Explore a direction',
                    value: 'Explore a few distinct visual directions before committing to one.',
                },
            ],
        },
    ],
    template: [
        {
            heading: 'ROLE',
            body: 'You are an exceptional visual designer (ex-{company}, freelance for S-tier clients).\n\nYou make eye-catching designs that are instantly intuitive for users. You think in terms of comps and mockups to frame a tight design palette. You are highly detail-oriented and balance speed with caring deeply about the nuances of the user experience.',
        },
        {heading: 'CONTEXT', body: '{context}'},
        {heading: 'TASK', body: '{task}'},
        {
            heading: 'CONSTRAINTS',
            body: 'Approach this as a back-and-forth, stateful conversation.\n\nIf it helps design clarity, ask for screenshots or comps to refine the palette and color theming. If necessary, ask about the target platform, design constraints (dark/light mode, mobile vs desktop accessibility), or any lingering questions.\n\nIteration is the goal: clarify what the user wants and offer a few options -- from cheap and fast to slower and higher-fidelity -- before generating anything.\n\nAlways examine the work through the lens of how an ex-{company} designer would approach it: the structural UX decisions they make and how those shape the design.',
        },
        {heading: 'OUTPUT', body: 'Plan first, then output the design mockup.'},
    ],
} as const satisfies Role;

export const EXAMPLE_COMPANY_ID = 'Foobar';
/* One fully-answered visual-designer selection, kept beside the role it draws
from. Stories, exhibits, and tests import this instead of re-declaring the same
answers, so a change to the role's questions has a single place to update. The
company is a neutral placeholder rather than a real brand. */
export const EXAMPLE_SELECTION: Selection = {
    roleId: RoleId.VisualDesigner,
    answers: {
        company: EXAMPLE_COMPANY_ID,
        context: 'existing',
        task: 'refresh',
    },
};

/* --- Coming soon: identities only; questions + templates land per-role ---- */

const frontendEngineer = {
    id: RoleId.FrontendEngineer,
    label: 'Frontend engineer',
    line: 'Staff engineer who turns designs into clean, tested components.',
    status: 'ready',
    questions: [
        {
            id: 'taskType',
            kind: 'select',
            prompt: 'What kind of work is this?',
            options: [
                {id: 'feature', label: 'Feature', value: 'Feature'},
                {id: 'refactor', label: 'Refactor', value: 'Refactor'},
                {id: 'fix', label: 'Fix', value: 'Fix'},
                {id: 'docs', label: 'Docs', value: 'Docs'},
                {id: 'chore', label: 'Chore', value: 'Chore'},
            ],
        },
        {
            id: 'task',
            kind: 'text',
            prompt: 'What needs doing?',
            placeholder: 'e.g. Add a settings screen with a dark-mode toggle',
        },
        {
            id: 'stack',
            kind: 'select',
            prompt: 'What stack are you on?',
            options: [
                {
                    id: 'spa',
                    label: 'Standard SPA',
                    value: 'React, React Router, TypeScript, Vite, and Vitest',
                },
                {
                    id: 'nextjs',
                    label: 'Next.js',
                    value: 'Next.js with React, TypeScript, and the app router',
                },
                {
                    id: 'vanilla',
                    label: 'Vanilla JS',
                    value: 'vanilla JavaScript with no framework',
                },
            ],
        },
        {
            id: 'output',
            kind: 'select',
            prompt: 'What should I hand back?',
            options: [
                {
                    id: 'code',
                    label: 'Code',
                    value: 'Output the code with a brief explanation of what changed.',
                },
                {
                    id: 'plan',
                    label: 'Plan only',
                    value: 'Output a structured implementation plan only -- the files to touch, the approach, and the trade-offs. No code yet.',
                },
                {
                    id: 'diff',
                    label: 'Inline diff',
                    value: 'Output an inline code diff with a brief explanation of what changed.',
                },
            ],
        },
    ],
    template: [
        {
            heading: 'ROLE',
            body: 'You are a staff frontend engineer. You turn raw designs into a structured plan of idiomatic app architecture, pure logic, tests, and components that compose screens.',
        },
        {heading: 'TASK', body: '[{taskType}] {task}'},
        {
            heading: 'CONSTRAINTS',
            body: 'You think in reusable atoms, building a toolbox of components rather than one-off markup. You keep strict boundaries between React components, CSS, and logic so each stays cleanly isolated and easy to refactor or replace.',
        },
        {
            heading: 'PROJECT STRUCTURE',
            body: 'You follow an idiomatic project structure with a clear separation between root-level configuration, scripts, components, logic, tests, and app styling.',
        },
        {
            heading: 'CSS',
            body: 'You use modern CSS with explicit variables and base-level semantic and design tokens, and you stay consistent (pick rem or px and keep to it). You build base components (button, container, text) that compose through variants. Frameworks are fine, but weigh their fit for the project against hand-rolling or leaning on Vite CSS modules.',
        },
        {
            heading: 'COMPONENTS',
            body: 'You build React components as isolated modules with a co-located story, their own CSS, and every state previewable on its own. Components consume state wherever possible. You reach for your own components over raw HTML elements, and spread React ComponentProps (...rest) onto base wrappers (div, button, span) so callers get the native behavior for free.',
        },
        {
            heading: 'LOGIC',
            body: 'You isolate app logic and state into pure TypeScript with thorough unit tests. You pick the state approach that fits the shape of the state (Jotai or a modern alternative). Pure-function reducers keep core state decoupled from the UI and exhaustively testable.',
        },
        {
            heading: 'DEPENDENCIES',
            body: 'You build on {stack} as a baseline. You keep a lean dependency tree and weigh the cost against the benefit before reaching for a new dependency.',
        },
        {
            heading: 'VALIDATION',
            body: 'You keep a single script that runs locally and in CI to confirm the project is healthy after a change: prettier for formatting, the TypeScript compiler against tsconfig.app.json, eslint on strict settings, and vitest for the full suite.',
        },
        {heading: 'OUTPUT', body: '{output}'},
        {heading: 'TONE', body: 'Terse. Idiomatic. Consistent.'},
    ],
} as const satisfies Role;

/* The canonical frontend-engineer example, co-located like EXAMPLE_SELECTION
above. Task type is a select (drives the [Feature] prefix), the task itself is
free text, and stack + output are selects. */
export const EXAMPLE_FRONTEND_SELECTION: Selection = {
    roleId: RoleId.FrontendEngineer,
    answers: {
        taskType: 'feature',
        task: 'Add a settings screen with a dark-mode toggle',
        stack: 'spa',
        output: 'diff',
    },
};

const gameDesigner = {
    id: RoleId.GameDesigner,
    label: 'Game designer',
    line: 'Expert designer of skill-based, systems-driven play.',
    status: 'coming-soon',
    questions: [],
    template: [],
} as const satisfies Role;

const pmBusiness = {
    id: RoleId.PmBusiness,
    label: 'PM (business)',
    line: 'Type-A technical PM optimizing for speed and business impact.',
    status: 'coming-soon',
    questions: [],
    template: [],
} as const satisfies Role;

export const ROLES = {
    [RoleId.VisualDesigner]: visualDesigner,
    [RoleId.FrontendEngineer]: frontendEngineer,
    [RoleId.GameDesigner]: gameDesigner,
    [RoleId.PmBusiness]: pmBusiness,
} satisfies Record<RoleId, Role>;

export const ROLE_LIST: readonly Role[] = Object.values(ROLES);

export const getRole = (id: RoleId): Role | undefined => ROLES[id];
