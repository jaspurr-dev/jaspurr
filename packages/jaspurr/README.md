# jaspurr (app)

The Jaspurr web app: a React 19 + TypeScript single-page app built with Vite,
using Jotai for state and React Router for routing.

See the [root README](../../README.md) for what Jaspurr is, how it works, and
the full development and contribution guide.

## Quick start

Requires Node `24.15.0` (see [`.nvmrc`](.nvmrc)) and pnpm `11.0.9`.

```bash
pnpm install
pnpm dev
```

## Scripts

| Command       | What it does                                                  |
| ------------- | ------------------------------------------------------------- |
| `pnpm dev`    | Format, type-check, lint, then start the dev server           |
| `pnpm check`  | The full gate: prettier, `tsc`, eslint (zero warnings), tests |
| `pnpm test`   | Run the Vitest suite once                                     |
| `pnpm lint`   | ESLint with `--max-warnings 0`                                |
| `pnpm format` | Rewrite files with prettier                                   |
| `pnpm build`  | Run `check`, then build to `dist/`                            |
| `pnpm branch` | Create a conventionally-named branch and push it              |

`pnpm check` is what the pre-commit hook and CI run; it must pass clean before a
change lands.

## Development routes

- `/sandbox` — component gallery. Every `*.story.tsx` file under `src` is
  registered automatically.
- `/designtokens` — live design token reference.
