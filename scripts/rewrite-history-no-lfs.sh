#!/usr/bin/env bash
# Rewrites this repo to a single commit with no Git LFS in history.
# Run from repo root: ./scripts/rewrite-history-no-lfs.sh
# Then: git push --force origin main

set -e
cd "$(git rev-parse --show-toplevel)"

echo "Creating new branch with no history (current files only)..."
git checkout --orphan new_main
git add -A
git commit -m "chore: single commit history (removes Git LFS for Netlify deploy)"

echo "Replacing main with new history..."
git branch -D main
git branch -m main

echo "Done. Push with: git push --force origin main"
echo "Then trigger a new deploy on Netlify."
