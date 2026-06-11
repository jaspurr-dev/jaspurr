#!/usr/bin/env bash
set -e

echo "Running pre-build validation..."
pnpm run check

echo "Building..."
pnpm exec vite build