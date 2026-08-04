# jaspurr

[![CI](https://github.com/jaspurr-dev/jaspurr/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jaspurr-dev/jaspurr/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue)](https://github.com/jaspurr-dev/jaspurr/blob/main/LICENSE)

**Your AI isn't the problem. Your prompt is.**

Jaspurr turns a handful of quick questions into a structured, role-specific
prompt you can paste into any AI assistant. No prompt engineering, no sign-up,
no server — it all runs in your browser.

Early development. Star the repo to follow our progress!

## Why use it

A one-line request like _"Redesign our settings page to feel more modern and
premium"_ gives the model no role, no context, and no output format. It fills
the gaps by guessing, and it guesses toward the generic average of its training
data.

Jaspurr writes the parts you'd otherwise have to know to ask for:

- **Best practices you don't have to look up.** Each role's template encodes how
  a strong practitioner in that domain frames a task — the identity to adopt,
  the questions to ask before acting, the constraints to hold, and what to hand
  back.
- **Under a minute, start to finish.** Pick a role, answer three to six
  questions, get a finished prompt. Most answers are a single tap.
- **Works with any model.** The output is plain text with headed sections. Paste
  it into Claude, ChatGPT, Gemini, a local model, or anything else.
- **Yours, and only yours.** No account, no cookies, nothing sent to a server.
  Saved templates live in your browser's local storage.
- **Free and open source.** Apache 2.0.

## How it works

1. **Pick a role.** A designer and an engineer need completely different best
   practices held in context.
2. **Answer that role's questions.** Each role owns its own flow — a mix of
   multiple choice and short free text. You can step back and change an answer
   at any point.
3. **Get your prompt.** Jaspurr assembles a sectioned template (`ROLE`, `TASK`,
   `CONSTRAINTS`, `OUTPUT`, and more depending on the role) with your answers
   woven in, plus a chip summary of what you picked.
4. **Copy it, or save it.** Copy straight to the clipboard, or save it to your
   library to reuse later.

### Your library

Saved templates are kept in your browser only. From the library you can copy any
single template, copy the whole library as markdown, or delete an entry.

The library stores your **answers**, not the rendered text — so when a role's
underlying template is improved, everything you've already saved picks up the
improvement the next time you open it.

## Roles

| Role                  | What it's for                                                  |
| --------------------- | -------------------------------------------------------------- |
| **Visual designer**   | Eye-catching, intuitive design from an ex-big-tech eye         |
| **Frontend engineer** | Staff engineer who turns designs into clean, tested components |
| **Game designer**     | Expert designer of skill-based, systems-driven play            |
| **PM (business)**     | Type-A technical PM optimizing for speed and business impact   |

New roles are added regularly.

## Example

Three taps as a visual designer — an existing product, a UI refresh, a studio
whose work you admire — produce a prompt that starts like this (abridged):

```
ROLE
You are an exceptional visual designer (ex-Foobar, freelance for S-tier
clients).

You make eye-catching designs that are instantly intuitive for users. You
think in terms of comps and mockups to frame a tight design palette. You are
highly detail-oriented and balance speed with caring deeply about the nuances
of the user experience.

CONTEXT
This is an existing product with an established design language to work within.

TASK
Refresh and modernize an existing interface.

CONSTRAINTS
Approach this as a back-and-forth, stateful conversation.

If it helps design clarity, ask for screenshots or comps to refine the palette
and color theming...

OUTPUT
Plan first, then output the design mockup.
```

## Privacy

Jaspurr is local-first by design:

- No account, no login, no cookies.
- Your answers and saved templates never leave your browser — they live in
  `localStorage` under a single key.
- Analytics are anonymous and cookieless: page visits and a small number of
  anonymized events (for example, "a template was copied"), never the content of
  your prompts.
- The app ships a strict Content Security Policy and a locked-down
  `Permissions-Policy`.

## Local development

The app lives in [`packages/jaspurr`](packages/jaspurr). It's a React 19 +
TypeScript single-page app built with Vite, using Jotai for state and React
Router for routing.

**Requirements:** Node `24.15.0` (see [`.nvmrc`](packages/jaspurr/.nvmrc)) and
pnpm `11.0.9`.

```bash
cd packages/jaspurr
pnpm install
pnpm dev
```

`pnpm dev` formats, type-checks, and lints before starting the Vite dev server,
so problems surface immediately rather than at commit time.

### Scripts

Run from `packages/jaspurr`:

| Command       | What it does                                                  |
| ------------- | ------------------------------------------------------------- |
| `pnpm dev`    | Format, type-check, lint, then start the dev server           |
| `pnpm check`  | The full gate: prettier, `tsc`, eslint (zero warnings), tests |
| `pnpm test`   | Run the Vitest suite once                                     |
| `pnpm lint`   | ESLint with `--max-warnings 0`                                |
| `pnpm format` | Rewrite files with prettier                                   |
| `pnpm build`  | Run `check`, then build to `dist/`                            |
| `pnpm branch` | Create a conventionally-named branch and push it              |

### Routes

Alongside the app routes (`/`, `/build`, `/library`, `/privacy`) there are two
development routes:

- `/sandbox` — a component gallery. Every `*.story.tsx` file in `src` is picked
  up automatically, so a new component's states are browsable in isolation as
  soon as you write its story.
- `/designtokens` — the live design token reference.

### Project structure

```
packages/jaspurr/src
├── core/         Pure logic: roles, template assembly, sanitization
│   └── scaffold/ Role definitions (questions + templates) and the assembler
├── state/        Jotai atoms: the build flow reducer and the saved library
├── routes/       Top-level pages
├── components/   Feature components, each with co-located CSS and a story
├── primitives/   Box, Stack, Text — the base layer everything composes from
├── styles/       CSS reset, design tokens, semantic layers
└── tests/        Vitest suites mirroring the src tree
```

The core logic is deliberately free of React: roles, assembly, and the flow
reducer are pure TypeScript with their own unit tests, so prompt behavior can be
verified without rendering anything.

## Contributing

Contributions are welcome — the fastest way to help is a new role.

1. Branch with a conventional prefix (`feat`, `fix`, `docs`, `refactor`, `test`,
   `ci`, `chore`), e.g. `feat/add-data-scientist-role`. `pnpm branch` does this
   for you.
2. Make your change. A role is a single entry in
   [`src/core/scaffold/roles.ts`](packages/jaspurr/src/core/scaffold/roles.ts):
   its questions and its template sections.
3. Run `pnpm check` before you push — the pre-commit hook and CI both run it,
   and it must pass clean.

Working in the devcontainer wires up the git hooks path automatically; if you're
not, run `git config core.hooksPath .githooks` once.

## License

Apache 2.0. See [LICENSE](LICENSE).

Icons from [Tabler Icons](https://tabler.io/icons) (MIT) — see
[docs/licenses/tabler-icons](docs/licenses/tabler-icons/license.txt).
