#!/usr/bin/env bash
set -euo pipefail

# Checkout main & pull origin
git checkout main
git pull origin

# Allowed commit prefixes
PREFIXES=(feat fix docs refactor test ci chore)

# Color for pretty output
GREEN=$'\033[0;32m'
RED=$'\033[0;31m'
RESET=$'\033[0m'

# Print branch naming rules
echo 
echo "${GREEN}Acceptable conventional commit prefixes:${RESET}"
printf '  - %s\n' "${PREFIXES[@]}"
echo
echo "Use a simple, atomic branch name, e.g.: ${GREEN}feat/add-box-component${RESET}"
echo 

read -rp "${GREEN}Enter branch name: ${RESET}" BRANCH

# Print error if name violates conventional commit format
joined=$(IFS='|'; echo "${PREFIXES[*]}")
if [[ ! "$BRANCH" =~ ^(${joined})/.+$ ]]; then
    echo "${RED}Error: '$BRANCH' must be <prefix>/<description>, e.g. feat/add-box-component${RESET}" >&2
    echo "${RED}Valid prefixes: ${PREFIXES[*]}${RESET}" >&2
    exit 1
fi

# Checkout the branch and push to remote origin
git checkout -b "$BRANCH"
git push -u origin "$BRANCH"

# Output success
echo
echo "${GREEN}Done. You're now on '$BRANCH' (tracking origin/$BRANCH).${RESET}"