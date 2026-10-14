# Handover — building on the Budget Planner prototype

For a designer or engineer joining this prototype to build alongside the
original author.

The deliverable here is **copy-paste prompts**. Paste one as the first message
of a fresh Claude Code session opened at the project root, then replace the
last line with the feature you want. The rules are inside the prompt on
purpose: handing someone documentation and hoping they read it does not work.

Pick the version that matches how you sent the code.

- **A — working from a zip** (no git). **This is the normal case.** The
  developers cannot reach GitHub from the company network, so a zip is the
  only channel; work comes back as a zip plus a written list of what changed.
- **B — working from a git clone.** Only usable by someone who can actually
  reach the repository — in practice, the author on a personal machine. Keep
  it for that case; do not send it to anyone inside the company network.

**If they are starting from a zip, send prompt 0 first.** It gets the project
installed, running and understood before any feature work begins.

---

## What this prototype is

An Angular 22 prototype of a budget planning / work management platform, built
on an internal design system called `ai-dls-kit`. It is a demo, not a product:
there is no backend and every figure is mock data.

Two record types, each with a listing and a detail page:

- **Workstreams** — `/workstreams`, `/workstreams/:id`
- **Approval to Spend (ATS)** — `/approval-to-spend`, `/approval-to-spend/:id`

Benefits Tracking is a tab on the ATS record, not a page of its own. An ATS
request is the unit that gets approved, and the benefits inside it are approved
with it.

Three personas, switchable from the avatar at the bottom of the left nav:
**Requestor** (populates and submits), **Approver** (approves or sends back
with comments), **Finance** (looks, does not act). Maker-checker behaviour
changes with the persona, so any change to a request flow needs checking as
more than one.

---

## 0 — First session: set up and get oriented (zip recipients)

Run this on its own, in a Claude Code session opened in the folder where the
zip was saved (e.g. `~/Downloads`). It deliberately ends without writing code.

```
I've been sent a zip of an existing Angular prototype — a budget planning and
work management demo. I did not write it. In this session I only want to get
it running and understand it — do NOT build features or change any application
code yet.

The zip is at ~/Downloads/budget-planner-source.zip (tell me if it isn't there
and I'll give you the real path). Unzip it into its own new empty folder
somewhere sensible, like ~/Projects, and work from there.

IMPORTANT — no version control here. This is a zip, not a git checkout. Do NOT
run any git commands: no pull, push, commit, branch, checkout or stash. If
something seems to need git, stop and tell me.

Step 1 — set it up. From the project root:
    npm install
    npm start
That starts a dev server on http://localhost:4200. It needs Node 20 or newer;
tell me your Node version (the author builds on Node 24).

The design system this project uses, `ai-dls-kit`, is NOT on npm. It is a local
tarball in `.kit-versions/`, referenced from package.json as a file: dependency.
If that folder is missing from the zip, stop and tell me — npm install cannot
succeed without it and no workaround is wanted.

If npm install fails for any other reason, STOP and show me the actual error.
Do not delete package-lock.json, do not change dependency versions and do not
switch package managers to get around it. Those "fixes" break the build in ways
that are hard to unpick later.

Step 2 — confirm it genuinely works, not just that it installed:
    node kit-pack/lint/lint-boundaries.mjs src
    npm run build
Both must pass. Be aware there is NO end-to-end test suite in this project —
one near-empty unit spec exists and proves nothing. Correctness is checked by
looking at the running app, so do that too: open localhost:4200 and click
through both record types.

Step 3 — read these, in this order, and take notes:
1. CLAUDE.md at the project root — hard rules that override your defaults.
2. DECISIONS.md — why the build looks the way it does, newest entry first.
   It records deliberate choices and known gaps. Do not "fix" things listed
   there as open on your own.
3. kit-pack/KIT.md and kit-pack/RULES.md — the design system and its rules.
4. Skim src/app/data — every record type and all the mock data.

Step 4 — look at the actual app. Visit a workstream, then an ATS request, and
open its Benefits Tracking tab. Use the persona switcher (the avatar at the
bottom of the left nav) to view it as Requestor, Approver and Finance — the
approval flow behaves differently for each.

Then report back to me, in your own words:
- What this application is for, and who the three personas are.
- What the approval flow is, and which persona can do what.
- Where benefits live and why they sit where they do.
- The design-system rule, and what feature code is NOT allowed to contain.
- Where the data comes from.
- The exact commands to verify a change, and what each one does and does not
  prove.
- Anything that broke, looked wrong, or that you could not figure out.

Finish with a list of questions for me. Do not start building anything — I'll
tell you what to work on once I know the setup is good.
```

---

## A — Working from a zip (no git)

```
I'm picking up an existing Angular 22 prototype — a budget planning and work
management demo — and building a new feature on it. I did not write this
codebase. Treat the existing code as the source of truth and match its
conventions rather than introducing your own.

IMPORTANT — no version control in this setup. I have a zip, not a git checkout.
Do NOT run any git commands: no pull, push, commit, branch, checkout or stash.
If a git command seems necessary, stop and tell me instead of running it.

Because there is no version control, there is no undo. Before your first
change, duplicate the whole project folder as a backup and tell me you have
done it. Keep a running list of every file you create or modify, and give me
that list whenever you finish a chunk of work — without git history, that list
is the only record of what changed.

Before writing ANY code, do these in order and summarise what you found:
1. Read CLAUDE.md at the project root. It contains hard rules that override
   your default behaviour.
2. Read DECISIONS.md, newest entry first. It explains why things are the way
   they are and lists known gaps — do not "fix" those on your own.
3. Read kit-pack/KIT.md and kit-pack/RULES.md.
4. Skim src/app/data to learn the record types, and src/app/pages to see how
   an existing page is put together.

Setup, from the project root:
    npm install
    npm start          # dev server on http://localhost:4200
Node 20 or newer. The `ai-dls-kit` design system is NOT on npm — it is a local
tarball in .kit-versions/, referenced as a file: dependency. If that folder is
missing, stop and tell me.

THE DESIGN SYSTEM RULE — this is the one that gets enforced:
Use only `ui-*` components and kit design tokens. Never a raw <button>,
<select>, <input> or <table>. Never a hardcoded hex colour. That includes the
small ones — a checkbox is `ui-checkbox`, never <input type="checkbox">.
Icons are NAMED, never drawn: <ui-icon name="download" />, size 16 or 24,
colour inherited from surrounding text. Never paste an SVG, an icon font or a
copied path. kit-pack/components/icon.md lists all 569 names.
This exists because the prototype gets reskinned to the real design system
later. Anything hardcoded breaks that.

Before building any new component, check whether the kit already has one —
kit-pack/components/ lists them. If an existing component is close but not
identical, prefer extending how you use it over hand-rolling a replacement.

The app's structure:
  src/app/pages    the five pages (workstream + ATS listings and details,
                   and the benefits view used inside an ATS)
  src/app/data     every record type and all mock data, plus the signal
                   stores that make records live
  src/app/shared   small shared components

Use the persona switcher (avatar, bottom of the left nav) to see the app as
Requestor, Approver and Finance. The approval flow behaves differently for
each, so check your feature as every persona it touches.

HOW TO VERIFY — and be honest about what this proves:
    node kit-pack/lint/lint-boundaries.mjs src
    npm run build
Both must pass before you tell me something is done. There is NO end-to-end
test suite here — one near-empty unit spec exists and proves nothing. So a
clean build is NOT evidence that a UI change is correct. For anything visual,
open the page in a browser and look at what actually rendered; if you can,
measure the rendered result rather than trusting the markup you wrote. Most
bugs in this project's history were visual ones that a green build never
caught. If something fails, say so and show the output — never weaken or
delete a check to make it pass.

Where the data lives: everything is mock data under src/app/data. There is no
backend. If your feature needs a field or a value that isn't there, add it to
the mock data — but do NOT invent business rules, field specs, option lists or
approval thresholds that a real user would have to sign off. Ask me instead.

One more thing: the code for this prototype lives in a PUBLIC GitHub
repository, so keep the content de-identified. No real staff names, no internal
system names, no in-house acronyms — in the UI, in the mock data and in code
comments alike.

As your last action, add a short dated entry at the TOP of DECISIONS.md
describing what you changed, why, and anything you left unfinished. Newest
first. That file is how the original author will pick this up, so it is the
handover itself, not a formality.

The feature I want to build is: <describe it here>
```

### Sending the work back

From the folder *above* the project:

```bash
zip -r budget-planner-from-<name>.zip budget-planner-angular \
  -x "*/node_modules/*" "*/dist/*" "*/.angular/*" "*/.git/*" "*/.DS_Store"
```

Keep `.kit-versions/` in — the kit is a local dependency and `npm install`
fails without it.

Ask for the modified-file list alongside the zip. Without git history that list
is the only record of what changed, and merging is done by hand.

---

## B — Working from the GitHub repo

```
I'm picking up an existing Angular 22 prototype — a budget planning and work
management demo — and building a new feature on it. I did not write this
codebase. Treat the existing code as the source of truth and match its
conventions rather than introducing your own.

Clone and set up (only if you can actually reach the repository — if you were
sent a zip instead, stop and use prompt A):
    git clone <repository URL>
    cd budget-planner-platform-angular
    npm install
    npm start          # dev server on http://localhost:4200
Node 20 or newer. The `ai-dls-kit` design system is NOT on npm — it is a local
tarball committed at .kit-versions/, referenced as a file: dependency. It comes
with the clone; if npm install cannot find it, stop and tell me.

Before writing ANY code, do these in order and summarise what you found:
1. Read CLAUDE.md at the project root. It contains hard rules that override
   your default behaviour.
2. Read DECISIONS.md, newest entry first. It explains why things are the way
   they are and lists known gaps — do not "fix" those on your own.
3. Run `git log --oneline -20` for recent context.
4. Read kit-pack/KIT.md and kit-pack/RULES.md.
5. Skim src/app/data to learn the record types, and src/app/pages to see how
   an existing page is put together.

THE DESIGN SYSTEM RULE — this is the one that gets enforced:
Use only `ui-*` components and kit design tokens. Never a raw <button>,
<select>, <input> or <table>. Never a hardcoded hex colour. That includes the
small ones — a checkbox is `ui-checkbox`, never <input type="checkbox">.
Icons are NAMED, never drawn: <ui-icon name="download" />, size 16 or 24,
colour inherited from surrounding text. Never paste an SVG, an icon font or a
copied path. kit-pack/components/icon.md lists all 569 names.
This exists because the prototype gets reskinned to the real design system
later. Anything hardcoded breaks that.

Before building any new component, check whether the kit already has one —
kit-pack/components/ lists them. If an existing component is close but not
identical, prefer extending how you use it over hand-rolling a replacement.

The app's structure:
  src/app/pages    the five pages (workstream + ATS listings and details,
                   and the benefits view used inside an ATS)
  src/app/data     every record type and all mock data, plus the signal
                   stores that make records live
  src/app/shared   small shared components

Use the persona switcher (avatar, bottom of the left nav) to see the app as
Requestor, Approver and Finance. The approval flow behaves differently for
each, so check your feature as every persona it touches.

HOW TO VERIFY — and be honest about what this proves:
    node kit-pack/lint/lint-boundaries.mjs src
    npm run build
Both must pass before you tell me something is done. There is NO end-to-end
test suite here — one near-empty unit spec exists and proves nothing. So a
clean build is NOT evidence that a UI change is correct. For anything visual,
open the page in a browser and look at what actually rendered; if you can,
measure the rendered result rather than trusting the markup you wrote. Most
bugs in this project's history were visual ones that a green build never
caught. If something fails, say so and show the output — never weaken or
delete a check to make it pass.

Where the data lives: everything is mock data under src/app/data. There is no
backend. If your feature needs a field or a value that isn't there, add it to
the mock data — but do NOT invent business rules, field specs, option lists or
approval thresholds that a real user would have to sign off. Ask me instead.

BRANCHING — read this twice. NEVER commit or push to `main`, and never merge
your own PR. `main` is the shared record this whole team clones from, and it is
what gets promoted to the hosted environment, so a push straight to it lands in
everyone's work at once. Create a branch off `main` before your first change,
commit there as you go, and open a pull request when the feature is ready. Pull
`main` before you start and again before you open the PR, so you are building on
the latest work rather than a stale copy.

HOSTING is handled by the team, not from this session. Do not deploy, do not add
a hosting provider's config and do not wire up a pipeline. If you think a change
needs something from the hosting environment, say so in the PR and leave it.
To show your work, run it locally with `npm start` and share your screen or a
screenshot.

Also: this repository is PUBLIC, so keep the content de-identified. No real
staff names, no internal system names, no in-house acronyms — in the UI, in the
mock data and in code comments alike.

As your last action, add a short dated entry at the TOP of DECISIONS.md
describing what you changed, why, and anything you left unfinished. Newest
first. Commit it alongside your work. That file is how everyone picks this up
on a cold start.

The feature I want to build is: <describe it here>
```

Review the work from the PR's diff, or by checking the branch out and running
`npm start` locally. There is no preview URL to click — the prototype is no
longer published to a public address.

---

## Notes for whoever sends this

- **A zip is the only channel to the company's developers** — GitHub is not
  reachable from their network. Accept what that costs: a zip is a one-way
  snapshot, so they cannot receive your updates and you cannot review theirs.
  Date every zip you send and keep a note of which commit it was built from,
  or within a fortnight nobody knows which copy is current.
- **Corporate mail often blocks `.zip` attachments** and caps attachment size.
  Check how the file will actually travel before writing the covering note.
- **Never zip `node_modules`.** Excluding it, along with `dist/`, `.angular/`
  and `.git/`, keeps the whole project small.
- **Always keep `.kit-versions/`.** The design system is not published to npm;
  it is a local tarball, and `npm install` fails outright without it. This is
  the single most likely reason a handover does not start.
- `public/v/` holds frozen snapshots of earlier builds, served behind the
  version-log button in the bottom-right of the app. They are several MB and
  nothing but that button uses them, so drop the folder when the recipient is
  reading the code rather than demoing it — it is most of the zip's size.
- The root `README.md` is the stock Angular CLI one and is not a guide to this
  project. It mentions commands, such as `ng e2e`, that do not apply here.
