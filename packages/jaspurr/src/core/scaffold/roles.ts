import {RoleId, type Role} from './types';

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
            placeholder: 'e.g. Airbnb, Linear, Stripe',
            examples: ['Airbnb', 'Linear', 'Stripe'],
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

/* --- Coming soon: identities only; questions + templates land per-role ---- */

const frontendEngineer = {
    id: RoleId.FrontendEngineer,
    label: 'Frontend engineer',
    line: 'Staff engineer who turns designs into clean, tested components.',
    status: 'coming-soon',
    questions: [],
    template: [],
} as const satisfies Role;

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
