# Trying a kit version

Both tarballs are kept in `.kit-versions/`, so switching never needs the original
zip again. The kit is versioned `0.1.0` in **both** releases, so npm will not swap
it on the version string — the install has to be forced by removing the installed
copy first.

## Back to v1 (the version everything on `main` was built against)

```bash
git checkout main
rm -rf node_modules/ai-dls-kit && npm install ./.kit-versions/ai-dls-kit-v1.tgz
npx ng build && node kit-pack/lint/lint-boundaries.mjs src
```

## Onto v2

```bash
git checkout kit-v2-trial
rm -rf node_modules/ai-dls-kit && npm install ./.kit-versions/ai-dls-kit-v2.tgz
npx ng build && node kit-pack/lint/lint-boundaries.mjs src
```

Restart `ng serve` after either — Vite pre-bundles dependencies and will not pick
up the swap on its own.

## Keeping v2

```bash
git checkout main && git merge kit-v2-trial
```

## Abandoning v2

```bash
git checkout main && git branch -D kit-v2-trial
rm -rf node_modules/ai-dls-kit && npm install ./.kit-versions/ai-dls-kit-v1.tgz
```
