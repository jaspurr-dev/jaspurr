#!/usr/bin/env bash
set -e

# TODO: refactoring this with pnpm workspace / GH actions separate step
# until then, disabled.
# echo "Checking dependencies for vulnerabilities..."
# pnpm audit

pnpm exec prettier . --check

echo "Checking TS compilation..."
pnpm exec tsc -p tsconfig.app.json
echo "TS compilation ran successfully!"

echo "Running eslint..."
pnpm exec eslint . --max-warnings 0
echo "eslint ran successfully!"

echo "Running tests..."
pnpm exec vitest run