#!/usr/bin/env bash
set -e

pnpm exec prettier . --write --cache
pnpm exec tsc -p tsconfig.app.json
pnpm exec eslint . --max-warnings 0
exec pnpm exec vite