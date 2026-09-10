# Decision log

Why this prototype is the way it is. Newest first. Each entry records the decision, the
reasoning, and anything deliberately left undone.

Commit messages cover *what* changed; this file covers *why*, so a decision can be revisited
later without reconstructing the argument.

---

## 2026-09-10 — Moved to kit v2, and kept the frozen-edge override

**Decision.** The prototype now builds against `ai-dls-kit` v2 (`.kit-versions/ai-dls-kit-v2.tgz`).
Trialled on `kit-v2-trial`, verified, then merged to `main`. v1's tarball is kept alongside it so
the swap is reversible with one `npm install` — see `KIT-VERSIONS.md`.

**Why.** v2 absorbs several things we had worked around, and carries no visual change to any screen
we had already corrected by hand. Diffing the tarballs: `tokens.css` is byte-identical, so the type
scale, spacing and colour did not move. `ui-tables.css` grew (15.8KB → 24.4KB), dropping the sticky
cell's `box-shadow` in favour of a painted `::after` divider, and adding `minAnchorWidth` with
fixed-positioned, flip-aware dropdown panels — which is what makes a multi-select usable inside a
column header rather than only in the toolbar. Several of our v1 findings landed as kit rules: new
RULES #17 (`min-width: 0` for horizontally scrolling tables), an `icon-names.md` with our exact
alias cases (`expand` → `maximize`, `trash` → `delete`), and a comment on the action cell warning
never to put `display: flex` on a `<td>` — the bug this app hit live.

**Kept anyway.** Our hand-drawn frozen-column edge stays. v2 ships the divider on
`.ui-td-sticky--first`; our cells carry `.ui-td-sticky`, so v2's `::after` computes to
`content: none` and our `::before` is still the only thing drawing that 1px. Removing it would
remove the edge. Verified in the browser, not assumed.

**Still ours.** v2 declares Public Sans but ships no `@font-face`, so the Google Fonts link in
`src/index.html` remains load-bearing.

---

## 2026-09-10 — A baseline value belongs to any benefit, and row menus flip

**Decision.** The proposed baseline is editable on every Request Baseline Change, whatever the
benefit's type, and a baseline value now displays wherever one exists rather than only on
financial benefits. A benefit with no baseline reads "Not set", not "Not applicable".

**Why.** A non-financial benefit can acquire a measurable baseline later — "faster onboarding"
becomes "median onboarding time under 4 days" once someone agrees the measure. Gating the field
on `type` made that unreachable. The model already stored `number | null`, so nothing changed
underneath; only the gate did.

**Also.** Row action menus flip upward when the row sits within 120px of the scroller's bottom.
`ui-table-card` clips its overflow, so a downward menu on one of the last rows was rendered but
invisible — which reads as a dead button, and was reported as one.

---

## 2026-09-09 — Column filters are multi-select; the filter popover follows its trigger

**Decision.** Every column filter is a `ui-multi-select` with `display="count"` at a fixed
132px, and the page filter popover re-anchors to its trigger while the page scrolls.

**Why.** A column filter that only takes one value cannot answer "show me Tracking Active *and*
Closure Pending Approval". `display="count"` also keeps the trigger one width whatever is
selected — a trigger that grows as you pick values shifts the whole header row.

`ui-popover` places its panel once, on open, as `position: fixed`, so scrolling left it behind
on screen. A scroll and resize listener re-anchors it 8px below the trigger, right-aligned, for
as long as it is open. **Kit gap:** the popover has no reposition-on-scroll behaviour.

**Also in this round.** The opening baseline is now set in step 3 of Add New Benefit — value and
change reason — rather than being derived silently from the financial lines. The closing sheet
animation is the exact reverse of the opening one (same curve, same duration, no scrim fade), so
it reads as a slide rather than a fade. The Approvals tab carries a count of everything still
awaiting a decision on that workstream, and the "nothing is waiting on you" banner is gone —
an empty state does not need announcing.

---

## 2026-09-08 — Public Sans is loaded by the app, not the kit

**Decision.** `src/index.html` loads Public Sans from Google Fonts.

**Why.** The kit's tokens set `--font-family-heading/label/body` to `"Public Sans", sans-serif`,
but the package ships no `@font-face` and nothing loaded it. `document.fonts` was empty, so every
screen since the first commit had been rendering in the system fallback. Sizes and weights were
correct throughout; the typeface was not. Nothing errors — this is a silent failure, and it can
only be spotted by checking `document.fonts`.

**Consequence.** Spacing judgements made before this landed were made against the wrong
typeface and may want revisiting.

---

## 2026-09-08 — Approvals belong to a workstream, not the nav

**Decision.** Benefit Approvals is a `ui-filter-tabs` page tab inside the Value/Benefits tab,
scoped to that workstream. The top-level nav entry and the `/approvals` route were removed.

**Why.** A benefit only exists on a workstream, so a portfolio-wide approvals page sat at the
wrong level — it implied benefits were a first-class object of their own.

**Also.** The attention banner is non-dismissible and carries a single **View** action that
switches to the Benefits tab and filters the table to the pending status, rather than explaining
in a second line of prose.

---

## 2026-09-08 — Two statuses could not express an approval queue

**Decision.** Three additions to the model:

| Added | Why |
| --- | --- |
| `'Changes Requested'` on `BaselineApprovalStatus` | rework — send back to amend and resubmit, which is not rejection |
| `'Closure Changes Requested'` on `BenefitLifecycleStatus` | the same, for closures |
| `Benefit.pendingWith`, `BaselineRecord.requestedOn` | which approver role owes the decision, and how old the request is |

**Why.** The existing statuses said what state a request was in but not who owed the decision,
and had nowhere to put rework. `Rejected` ends a request; "fix this and resubmit" is a different
state and would otherwise have looked identical to a live one.

**The rule that follows.** Approving a baseline change is the only thing that promotes the
proposed value to the current approved baseline. Rework keeps the request alive; rejection ends
it and leaves the baseline untouched. Every decision writes its own audit entry.

**Routing.** Baseline changes go to the Finance Business Partner, closures to the Portfolio
Approver. Both the queue and the banner apply the same rule.

---

## 2026-09-08 — Personas are a session-wide signal

**Decision.** Five personas in `data/personas.ts`, each carrying `canRequest` / `canApprove`,
with `currentPersona` as a module-level signal and a switcher in the nav rail footer.

**Why.** The lifecycle has a requester side and an approver side, and the prototype could only
ever show one of them. A signal rather than an input keeps any screen able to read it without
threading it through the component tree.

**Known limit.** A full browser refresh resets the persona and all data to seed. Drive demos by
clicking, not by pasting URLs.

---

## 2026-09-08 — Benefit records live in a session store

**Decision.** `data/benefitsStore.ts` holds benefits in a signal keyed by workstream.

**Why.** The tab previously re-derived them from seed on every render, so an edit vanished on
navigation, and no screen could see more than one workstream's benefits at a time.

---

## 2026-09-08 — A baseline row opens a baseline, not a benefit

**Decision.** Baseline Management rows open a baseline-focused overlay: the current approved
baseline, the full version chain with **the change each version made to the one before it**, and
an approval trail filtered to baseline entries. Reporting history is deliberately absent.

**Why.** Actuals are benefit performance. Including them would have made the two overlays the
same thing twice; the delta column is what the baseline view can tell you that the benefit view
cannot.

---

## 2026-09-08 — Row menus are composed, not `ui-kebab-menu`

**Decision.** The row action menu is a `ui-icon-button` plus `ui-dropdown-menu` with the open row
held in one signal.

**Why.** `ui-kebab-menu` owns its own open state and exposes no `open` input, so two rows could be
open at once. Composing from the same primitives it uses keeps the look identical and the state
controllable. **Kit gap:** `ui-kebab-menu` has no `open` model.

---

## 2026-09-07 — Rebuilt in Angular 22 rather than restyling the React prototype

**Decision.** A parallel Angular 22 app on the Ai DLS Kit, built screen by screen while the React
prototype stayed live and deployed.

**Why.** The kit is an Angular 22 library with hard peer dependencies; its 109 compiled components
cannot render in React — `<ui-icon>` in a `.tsx` file is an unknown tag that renders empty and
throws nothing. Only `tokens.css` and the icon geometry are framework-agnostic. The handover
target runs Angular 17, so the upgrade is a precondition either way; building on 22 unlocks all
118 components and doubles as a working argument for the upgrade.

**Full reasoning** is in the playbook written at handover, alongside the ten process rules that
came out of this migration.

---

## Deviations from the kit, and why

Every override, so none of them look like accidents:

| Deviation | Reason |
| --- | --- |
| `table-layout: auto` on the Value/Benefits tables | the kit sets `fixed`, under which content cannot size a column at all, so every header sat at an equal share |
| `ui-column-header .label` ellipsis turned off | correct for a fixed-width column, but these tables scroll horizontally, so a truncated title is just lost |
| `min-height: 0` on the nav rail | the kit sets `min-height: 100vh`; inside a shell already exactly the viewport that pushes the footer below the fold |
| `::ng-deep` on `.panel` for the sheet animation | the kit exposes no animation hook. It must land on `.panel`, never the host: the host is static and its `.overlay` child is `position: fixed`, so any transform on the host makes it the containing block and the overlay stops being viewport-positioned |
| `z-index: 3` on a sticky cell holding an open menu | frozen cells stack in DOM order, so a later row painted over an earlier row's open menu |
| `min-height` on the page table's scroller | `overflow-x: auto` also clips vertically, so a short table cut off an open column filter |
| Vertical dividers + outer border on overlay tables | `table[ui-table]` already paints its own row rule; a full cell border doubled the horizontal ones |
| `ui-table-header` title dropped to `heading(xs)` | the kit rules panel titles at `heading(sm)`; at this density that reads too large against the compact table beneath it (owner's call) |
| Filter popover re-anchored on scroll | `ui-popover` positions once on open and does not follow its trigger |
| Clickable summary figures carrying `boundary-allow` | `ui-summary-card` is display-only, and figures that filter are a standard blotter pattern |

---

## Known gaps

Stated rather than hidden, per RULES.md #8:

- **Nothing persists across a browser refresh.** All state is in memory.
- **A returned request cannot be resubmitted.** The row actions offer no "amend and resubmit" for
  an item in Changes Requested, so the rework loop does not close.
- **No supporting-evidence upload.** Every form in the original spec had one; the kit ships
  `ui-file-drop` / `ui-upload-file` for it.
- **No reporting cadence.** Nothing tracks when an update is due, so no benefit can be overdue.
- **`ui-status-tag` has five variants against seven workstream statuses**, so two pairs share a
  colour. `UiNavStatus` has two against the tree's five.
- **The kit's token set is the neutral theme**, not DLS colours — `tokens.css` says so itself.
