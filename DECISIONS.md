# Decision log

Why this prototype is the way it is. Newest first. Each entry records the decision, the
reasoning, and anything deliberately left undone.

Commit messages cover *what* changed; this file covers *why*, so a decision can be revisited
later without reconstructing the argument.

---

## 2026-09-15 — The baseline table comes back, and the seed data is re-phased

**Decision.** A financial baseline is built from year-phased lines again, not typed as a lump
sum — the same Types of Financial / Drivers / Measure table the create wizard uses, with columns
following the benefit's own start and end dates and a row-level add and remove. The Proposed
Baseline field is derived from those lines and read-only: a baseline figure should always be
able to show its working, and a separate input could only ever disagree with the table above it.

**That surfaced a real data fault.** The seeded financial rows were phased across a fixed
2024-2026 window while each benefit carries its own dates, so money sat in years the benefit does
not span. Invisible until the table's columns started following the dates — at which point a row
totalling S$35,000,000 sat under a baseline of S$71,000,000. `realignFinancialYears()` re-phases
each row onto its benefit's own range at seed time, folding anything beyond the range into the
final year so row totals are preserved exactly. No baseline figure changed; they simply add up
now. Opening an edit no longer marks the form dirty before the user has touched it.

**Doubled strokes in the Baseline accordions.** A `table[ui-table]` inside a `ui-accordion` was
drawing its own outer border 1px inside the accordion's, in the same colour. The accordion owns
the container, so the table no longer draws an edge there — measured, not eyeballed: table border
0px, accordion 1px.

---

## 2026-09-15 — Three roles, one package, and no Baseline Management view

**Three personas, not five.** Benefit Owner (creates and updates), Sponsor (approves anything),
Finance (sees everything, does nothing). Every request now routes to the Sponsor, so `awaitingMe`
is simply "can I approve, and is anything outstanding" rather than a per-kind routing table.
Finance having neither `canRequest` nor `canApprove` is the point: it proves a read-only view
exists rather than leaving it implied.

**A pending benefit now shows the REQUESTED values, not the approved ones.** This reverses the
call made on 14 Sep, and the reversal is only safe because of what was built since: audit
snapshots mean the superseded values are recoverable. A reader looking at a benefit under review
wants to see what is being proposed; the banner says so and points at the audit log. `shown()` is
the single place that applies a pending request's fields for display — the stored record is
untouched until a decision is made.

**Baseline Management is no longer a view.** Updating a baseline is part of the package of
updating a benefit: the Baseline section is editable in place, and the change travels in the same
request as everything else. Consequences:

- The sub-tab, its table, its detail overlay and the `?view=baseline` deep link are all gone.
- Baseline History and Baseline Approval Trail moved into the benefit's own Baseline section, in
  collapsed accordions — they are reference, not the first thing to read.
- A moved baseline still opens a pending `BaselineRecord` so the history shows the proposal, but
  the queue deliberately suppresses it as a standalone item (`baselineInPackage`) so one change
  does not appear as two requests for one approver to decide twice.

**Request Baseline Change is gone with it.** Once the baseline moved into the update package the
standalone flow was unreachable, and leaving it would have meant two ways to raise the same change
with different governance. Its form state, submit handler and overlay card are removed, along with
the orphaned baseline-detail overlay state a Haiku sweep found (`baselineOf`, `openBaseline`,
`closeBaseline`, `closingBaseline`).

**Model tiering, on request.** `personas.ts` and the stale-reference sweep went to Haiku agents —
both are isolated and mechanical. The rest was done inline: items 2-4 all rewrite the same two
1,100-line files, so parallel agents would conflict and sequential ones would each re-read the
files cold, costing more than they save.

---

## 2026-09-14 — Session close: what this round changed

A single working session covering the Value/Benefits detail overlay end to end. Grouped here so
the individual entries below can be read as detail rather than a list of unrelated edits.

**The record.** Benefit owner became a multi-select of named people with BUs derived from them;
category became multi-select; Effective/Target Realisation Date became Start/End date throughout;
Validation Source was added. Seed data was re-themed onto the platform investment table and scaled
to its magnitude, de-identified — the source table names internal systems and this prototype is
on a public URL.

**The flows.** Create became three freely navigable tab pages with no step counter, its financial
year columns derived from the benefit's own dates. A new benefit's baseline now goes to Finance
for approval instead of being self-approved. Update benefit became an overlay-level mode behind a
sticky bar, raising ONE request covering the whole benefit — fields and staged reporting lines
together, nothing written until a decision is made.

**What we got wrong first, and fixed.** Content nested in `@if` is not projected into named
slots, so header and footer buttons silently rendered in the overlay body. The green "current
baseline" row was the kit's `selected` wash, which read as approved next to a red delta pill — now
a grey `Current` tag. And the date field took three attempts because its computed styles matched
the other inputs exactly the whole time; the value is drawn by the browser, in fixed-width
segments the input's own font never reaches.

**Still true at close.** Both gates clean, deployed and verified on production, and the kit
feedback file carries five findings from this round.

---

## 2026-09-14 — Audit entries carry a snapshot

**Decision.** Each audit entry stores the benefit as it stood when the entry was written, shown
as a Version column in the Audit Log and opened as a read-only dialog with its own Download.

**Why materialised, not reconstructed.** The descriptive fields — name, owners, categories,
description, validation source — are not versioned anywhere, so on read there is no way to work
out what they used to say. The snapshot is therefore stamped at write time. Seeded entries get
theirs at SEED time (`withSeedSnapshots`), before any user edit can move the record, with the
baseline in force at each entry's date taken from `baselineHistory` — append-only, so genuinely
knowable. An entry with no snapshot reads "Not captured" rather than showing today's values
under yesterday's date.

**A pending benefit cannot be submitted again.** Update benefit is hidden entirely while a
request is outstanding, rather than shown and erroring on click.

**Submit is disabled until something changes.** `editDirty()` compares the edit fields against
the record and counts staged reporting lines, so the button cannot raise an empty request. Cancel
now sits beside Submit on the right; split ends read as two unrelated actions rather than a pair.

---

## 2026-09-14 — "Current" is a label, not a row colour

**Decision.** The current baseline is marked with a grey `Current` tag beneath its approval
status in the Status column. The green row wash is gone.

**Why.** The row used the kit's `selected` state, which paints `--color-bg-selected` (#e2f8ef).
That state means "the reader picked this row" — nothing in a baseline history is selectable —
and its green read as approved or good. In one real case the current baseline was a REDUCTION,
so a green row carried a red delta pill: two colour systems disagreeing inside one row. Saying
it in words removes the ambiguity and leaves the only colours in the row as the ones that carry
real meaning — the delta pill and the approval tag.

---

## 2026-09-14 — Overlay chrome, and three kit specificity fights

**Decision.** The pending-approval banner moved from inside Benefit Details up to overlay level
and is no longer dismissable: it describes the whole record, not one section, and it is the
reason the values below cannot be trusted as current. The overlay title now matches the
dashboard's own table headings (heading/xs, 16/600) rather than the shell's 20/600 default.

Submitting closes the overlay first, then raises the confirmation against the table, so the
snackbar is not sitting over the record it is about and "View benefit" has somewhere to return
to.

**Field pairing.** Benefit Name spans the row; Category sits beside Status, Owner beside BUs
Involved, and Description beside Validation Source — the last pair both textareas, since a
validation source is often a sentence rather than a code.

**Three kit overrides that each needed a specificity fix.** Recorded because the pattern repeats
and the failures are silent — the rule is simply ignored:

1. `ui-date-input` prints its value at body/md (14px) where `ui-text-input` and `ui-textarea`
   print at body/sm (13). Its own rule is `.ui-date-input[_ngcontent-…]`, so the override has to
   name the class too: `ui-date-input ::ng-deep input.ui-date-input`.
   *And that is only half of it.* Matching family, size and weight still leaves the value looking
   wrong, because the text is drawn by the BROWSER, not the input's own text layer: Chrome lays
   each segment in a fixed-width field with internal padding, so the digits read wider and airier
   than every other field. The `::-webkit-datetime-edit-*` pseudo-elements need `font: inherit`
   and zeroed padding as well. Computed styles on the input match perfectly throughout, which is
   why this one resists diagnosis — the difference is not in anything `getComputedStyle` reports.
2. `.ui-cell-actions` sets horizontal padding with `!important`, which pulls a centred child 8px
   off the column's middle. Rather than escalating, the remove cell simply does not use that
   class.
3. The table component sets `tbody td:last-child { padding-right: … }`, which ties on
   specificity with a plain `td.my-class` and wins on source order. The override carries
   `.vb-scroll` as an extra ancestor to outrank it.

Both (1) and (2) are going back to the kit author — a control that is a size out from its
siblings, and a padding that cannot be overridden without `!important`, are worth fixing at
source.

---

## 2026-09-14 — One review covers the whole benefit

**Decision.** Any change made through Update benefit — a field, a reporting line, or both —
raises ONE request covering the whole benefit. A reporting line is no longer appended on save;
it travels inside `pendingUpdate.reportingLines` and joins the history only when the request is
approved.

**Why.** The earlier split (fields approved, reporting lines applied immediately) meant the same
button did two different things depending on what you touched, and a reader could not tell from
the record which parts had been reviewed. One request, one decision, one audit line.

**Pending status is DERIVED, not written.** `displayStatus()` returns 'Update Pending Approval'
while a request is live, leaving `status` holding the lifecycle value (tracking / closing /
closed). Writing 'pending' over `status` would lose what to restore once a decision is made.

**The summary is split in two.** Benefit Details carries what the benefit is and who owns it;
Baseline carries benefit type, baseline ID and both baseline figures. Everything in Baseline is
read-only in this flow — those values move through Request Baseline Change, which has its own
reason and its own approver. Benefit Status is never editable anywhere.

**Baseline Management is deep-linkable.** `?tab=value-benefits&view=baseline` opens the detail
page on that sub-tab, so the Baseline History note can link to a real destination rather than
back to the workstream. Both the tab and the sub-tab read their initial value from the query
string through `linkedSignal`.

---

## 2026-09-14 — Update benefit is an overlay mode, not a section affordance

**Decision.** The edit affordance moved out of the Benefit Summary section and up to the
overlay header, beside Download, as a secondary "Update benefit" button. Clicking it puts the
whole overlay into edit mode, with a sticky footer carrying Cancel and Submit for approval.

**Baseline History stays view-only even in edit mode.** A baseline moves through Request
Baseline Change, which is an approval flow with a reason and an approver. Letting it be typed
over in an edit form would route around that.

**Reporting History gains rows in edit mode.** "Add new" under the table opens a small dialog of
plain input fields — no table-shaped editing — and Add appends the line. A line staged in this
session can be removed; a line already reported cannot, because the history is append-only and
those lines are already someone's statement of record.

Staged lines append on Submit rather than waiting on the approval that governs the descriptive
fields. A reporting line is the reporter's own account of where the benefit has got to, and it
is additive — there is nothing for an approver to accept or reject in the way there is for a
changed owner or a moved baseline.

**Two layout rules.** Overlay titles print at heading/xs, a step down from the kit's modal
default, so they sit properly against the compact section titles beneath them. And a section of
text fields is held to two columns: four short inputs across reads as a form to fill in rather
than a record to check. Tables are exempt — they take their column count from their data.

**Angular content projection is static.** Both button groups were first written inside `@if`
blocks and silently landed in the overlay BODY rather than the header and footer slots:
`ng-content select=...` matches top-level nodes only, so anything nested in a control-flow block
falls through to the default slot. They are now projected unconditionally with their visibility
bound instead. Worth knowing before adding another slotted control.

---

## 2026-09-14 — Owners are people, and an edit is a request

**Decision.** Benefit owner is a multi-select of named individuals; the BUs involved are
DERIVED from the roster (`src/app/data/people.ts`) and never stored on the benefit. Benefit
category is multi-select too. Both print "first + N more" in the table with the full list in a
kit tooltip, so neither column has to widen.

**Why derived, not stored.** A stored "BUs involved" can drift: reassign an owner and the field
keeps yesterday's answer unless something remembers to update it. `businessUnitsFor()` is the
only way that value is ever produced, so it cannot disagree with who is actually assigned.

**Effective Date / Target Realisation Date are gone**, replaced by Start date and End date
throughout — data model, wizard, tables, overlays and CSV export. Each carries a tooltip saying
what it means, because "start" and "end" alone are ambiguous for a benefit that is tracked over
one window and realised at the end of another.

**The create flow is tabs, not a stepper.** Three freely navigable pages — Benefit Details,
Baseline Definition, Review — with no step counter. Consequences worth recording:

- Validation moved off page 1 onto the whole form (`createValid`), because a user can now reach
  Review without having visited Benefit Details.
- With-financial-impact moved to Baseline Definition as a radio, so page 1 can no longer branch
  its category options on it. The two category lists are therefore merged into one — and a
  benefit can legitimately carry categories from both sides now that the field is multi-select.
- The Financial and Stat Impact table's year columns are derived from Start/End date rather
  than a fixed 2024–2026 window. Until both dates are set it falls back to the current year
  alone, so the table still renders instead of collapsing to no columns.

**A new benefit is no longer self-approved.** Creation raises the opening baseline as Pending
Approval with Finance, and confirms with a snackbar. This is what the approver personas need in
order to have anything to decide on a freshly created benefit.

**An edit to the Benefit Summary is a REQUEST, not a write.** The table keeps showing approved
values until someone decides — the same rule the baseline workflow already followed. One edit
can raise two independent approvals: descriptive fields go to the Portfolio Approver as a
single request carrying a field-level diff, and a moved baseline raises its own BaselineRecord
for Finance. Either can be decided without the other.

**Deliberate exception.** Validation Source is also editable in the Update Benefit flow, where
it applies directly rather than through approval. Gating it there would block the actuals
report it belongs to. The same field is therefore governed differently depending on the door
you come through — recorded here because it is a real inconsistency, accepted on purpose.

---

## 2026-09-14 — Two more kit v2 findings, both worked around in-app

**`ui-dropdown-menu` is portalled to `document.body` and can be orphaned.** v2 renders the
dropdown panel as a fixed-position child of `<body>` — which is what makes a multi-select usable
inside a table column — but that puts it outside Angular's view tree. Destroying the modal that
owns the control does NOT remove the panel. Reproduce: open Add New Benefit, open the Benefit
Owner picker, press Escape. The modal closes and the panel is left floating over the page.
Closing with Cancel does not do it, because that click reaches the panel's own outside-click
handler first.

*Worked around* by `dismissOverlays()`, which dispatches a document-level pointerdown before an
overlay is torn down, letting each open panel close itself through its own handler. Deleting the
nodes directly would mean this app removing DOM the kit owns.

**`ui-snackbar`'s host has no `display`.** It lays out as an inline box with zero width, and the
flex row inside it collapses to roughly one word per line. Not visible in the kitchen sink,
where the surrounding layout happens to give it a box. *Worked around* by making our wrapper a
flex container: a flex item is blockified whatever its own `display` says, so the host gets a
real box without us restyling the component.

Both are going back to the kit author.

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
- **Snapshots start from this build.** Audit entries written before the snapshot field existed
  have none, and one cannot be reconstructed — the descriptive fields are not versioned. Those
  rows read "Not captured". Seeded entries are stamped at seed time, so the demo has content.
- **`Update Pending Approval` is a display state, not a stored one.** `displayStatus()` derives
  it from a live `pendingUpdate`; `status` continues to hold the lifecycle value. Anything
  reading `benefit.status` directly will not see it.
- **Validation Source is governed two ways.** Through Update benefit it needs approval; through
  the Update Benefit (reporting) flow it applies directly, because gating it there would block
  the actuals report it belongs to. A real inconsistency, accepted on purpose.
- **Benefit owners are a fixed roster of 14 invented people.** There is no directory lookup, and
  the BU mapping lives in `people.ts` rather than coming from anywhere authoritative.
- **`ui-status-tag` has five variants against seven workstream statuses**, so two pairs share a
  colour. `UiNavStatus` has two against the tree's five.
- **The kit's token set is the neutral theme**, not DLS colours — `tokens.css` says so itself.
