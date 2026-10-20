---
name: handover
description: Build the handover zip of this Budget Planner prototype for the company laptop, which installs npm packages from an internal mirror that lacks many recent versions. Use whenever asked to zip, hand over, package, export or send this project — never zip it by hand.
---

Build the handover zip with the project's own script, from the project root:

```bash
npm run handover
```

It does four things and stops at the first failure:

1. **Known-good check.** Every registry package in `package-lock.json` must be
   listed in `scripts/mirror-known-good.txt` — the versions the company laptop
   has already installed. The laptop installs from an internal mirror that
   lags public npm and returns 404 for versions it has not picked up, so a
   lockfile resolved on a personal machine fails there (DECISIONS.md,
   2026-10-20). The mirror cannot be reached from outside, which is why this
   is a list and not a live check.
2. Kit boundary lint.
3. Zips the project (without `node_modules`, `dist`, `.angular`, `.git`) to
   `~/Desktop/budget-planner-source-YYYYMMDD.zip`.
4. Unzips it into a clean temp folder and runs `npm ci` and `npm run build`
   there. If either fails, the zip is deleted.

## When the known-good check fails

The script lists each unproven `name@version` with the known-good versions of
that package. Fix it at the source:

- A direct dependency: set the exact known-good version in `package.json`.
- An indirect one: add an `"overrides"` entry pinning it to a known-good
  version (the block already has many — follow the pattern).
- Then `npm install` and run `npm run handover` again.

Do NOT:
- add lines to `scripts/mirror-known-good.txt` by hand — only
  `npm run check:registry`, passing on the company laptop, may add to it;
- delete `package-lock.json` or re-resolve it from scratch — that drifts every
  package back to the newest version and undoes the pinning;
- use `--allow-unverified` without the user's explicit OK.

A package with no known-good version at all is new to the company laptop. Tell
the user, and only with their OK run `npm run handover -- --allow-unverified`.
The recipient must then run `npm run check:registry` before `npm install`; when
it passes there, it records the new versions in the list, and that updated
file should come back with the next zip.

## Report

Give the user the zip path and size, and say whether the check passed or the
zip is UNVERIFIED. If any step failed, show its output and say what it means —
never weaken a check to get a zip out.
