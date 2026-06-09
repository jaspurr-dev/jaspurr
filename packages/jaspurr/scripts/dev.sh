#!/usr/bin/env bash
set -e

pnpm exec tsc
pnpm exec eslint . --max-warnings 0
exec pnpm exec vite