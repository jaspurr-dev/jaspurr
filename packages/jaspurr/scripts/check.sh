#!/usr/bin/env bash
set -e

echo "Checking dependencies for vulnerabilities..."
pnpm audit

pnpm exec prettier . --check

echo "Checking TS compilation..."
pnpm exec tsc
echo "TS compilation ran successfully!"

echo "Running eslint..."
pnpm exec eslint . --max-warnings 0
echo "eslint ran successfully!"