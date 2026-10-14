---
name: handover
description: Package this prototype for a developer or designer to pick up — verify the gates, build a clean source zip at HEAD, and hand over the right onboarding prompt from HANDOVER.md. Use when the user says /handover, or asks to hand over, send, share or package the source for someone else to work on.
---

# Handover

Package the prototype so someone who did not write it can get it running and
build on it. `HANDOVER.md` at the project root holds the onboarding prompts;
this skill produces the artifact that goes with them.

## Before anything else

Check the working tree is clean and HEAD is pushed:

```bash
git status -sb && git log --oneline -1
```

If there are uncommitted changes, say what they are and ask whether to commit
them first. Handing over a zip that does not match the repo is how two copies
start diverging on day one.

## Step 1 — verify before packaging

Never package something unverified. Run both gates and capture the real exit
codes:

```bash
node kit-pack/lint/lint-boundaries.mjs src && npm run build
```

If either fails, STOP and report the output. Do not package a broken build and
do not describe it as working.

Be straight with the user about what this proves: the lint proves the design
system rules hold, and the build proves it compiles. Neither proves the UI is
correct — this project has no end-to-end suite, only one near-empty unit spec.

## Step 2 — build the zip

From the project root:

```bash
rm -f ~/Desktop/budget-planner-source.zip && \
zip -rq ~/Desktop/budget-planner-source.zip . \
  -x "node_modules/*" ".git/*" "dist/*" ".angular/*" ".DS_Store" "*/.DS_Store"
```

Add `"public/v/*"` to that exclude list when the recipient is reading the code
rather than demoing it: the parked build snapshots are most of the zip's size
and only the version-log button uses them. Say that you dropped them.

**`.kit-versions/` must stay in.** The `ai-dls-kit` design system is not on
npm — it is a local tarball referenced from package.json as a `file:`
dependency, and `npm install` fails outright without it. This is the single
most common reason a handover never starts. Confirm it is present:

```bash
unzip -l ~/Desktop/budget-planner-source.zip | grep -E "kit-versions|package.json"
```

Then deliver the file with SendUserFile.

## Step 3 — tell them which prompt to send

`HANDOVER.md` contains three prompts. Say plainly which applies:

- **Prompt 0** — send first to anyone receiving a zip. Sets up, reads, explores
  and reports back without writing code.
- **Prompt A** — zip recipients, for the feature work itself. No git at all.
- **Prompt B** — GitHub recipients. Use when the work is meant to be merged.

**Default to the zip.** The company's developers cannot reach GitHub from their
network, so prompt B is only usable by someone on a personal machine. Do not
suggest the repository as a handover route; say which commit the zip was built
from instead, so the user can tell later which copy is current.

When the recipient is reading the code rather than changing the prototype, a
covering note beats a prompt: what the app is, the record types and routes, the
personas, where the mock data lives, and that DECISIONS.md and
src/app/data/models.ts carry the decisions. Offer to draft it.

## Things to flag in the reply

- Size, and what is inflating it. `public/v/` holds frozen snapshots of earlier
  builds for the version-log button — several MB, and safe for the recipient to
  delete.
- Node 20+ is required; the author builds on Node 24.
- The root `README.md` is stock Angular CLI boilerplate, not a guide to this
  project, and mentions commands such as `ng e2e` that do not apply.
- If handing over the repo rather than a zip: the collaborator must branch and
  open a PR, never push to `main` or merge their own work. `main` is the shared
  record the team clones from and what gets promoted to the hosted environment.

## What not to do

- Do not deploy, and do not offer to. Hosting moved to the team's own
  environment in October 2026; there is no public URL to publish to, and
  previewing is `npm start` on port 4200.
- Do not rewrite `HANDOVER.md` on the fly. If its facts have drifted from the
  codebase — new pages, changed commands, a new dependency trap — say so and
  offer to update it as its own task.
