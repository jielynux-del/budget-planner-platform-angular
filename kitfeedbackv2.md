# Ai DLS Kit v2 — findings from the same migration

---

## Context for the agent

You are looking at `ai-dls-kit` v2 and its `kit-pack/` docs. The consumer is an Angular 22
prototype that migrated from v1 to v2 in one step, with no visual regressions — most of these
issues had already been worked around by hand against v1, which is why they surfaced as
"my override is still doing the work" rather than as breakage.

For each item: verify the claim against the current source first, then propose the smallest fix.
Items 1 and 2 are the ones with a silent failure mode; prioritise those. Do not batch unrelated
changes into one commit.

---

## 1. The frozen/sticky column system is undocumented — and its failure is silent

**Problem.** v2 ships a complete right-pinned column implementation in
`styles/ui-tables.css`: `.ui-td-sticky` (line 106), the pinned-header fill (117), the row-hover
repaint (127), and the left divider on `.ui-td-sticky--first::after` (153). There is also a
left-pinned twin, `.ui-td-frozen` / `--last`, referenced in the same comment block as living in
`lib/table/table.scss`.

**None of it appears in `kit-pack/components/table.md`.** That file has no occurrence of "sticky"
or "frozen" anywhere — not in Description, API, Types, Slots or Example. The only description of
the system is the comments inside the CSS.

**Impact, and how it actually bit us.** The divider requires the `--first` modifier on the leading
pinned cell. Our cells carry `.ui-td-sticky` only, so v2's `::after` computes to `content: none`
and never draws. We didn't notice, because our own v1-era `::before` was still painting that 1px
line. We caught it only by checking computed styles in the browser *before* deleting the override
as redundant:

```
{ cls: "ui-td-sticky",
  before: { content: '""', width: "1px", background: "rgb(221, 227, 231)" },
  after:  { content: "none" } }
```

Anyone who reads the v2 changelog, concludes the kit now handles the frozen edge, and removes
their workaround will lose the edge entirely — clean build, no console warning, and a missing 1px
line that nobody spots in review.

**Suggested fix.** Document the sticky/frozen classes in `table.md` — both families, and
explicitly that `--first` (and `--last` for the left-pinned twin) is REQUIRED on the leading cell,
not optional decoration. The reasoning is already written and is excellent — the pseudo-element
rationale under `border-collapse: collapse`, the specificity notes, the struck shadow. It just
needs to surface where people look for it. A short "Frozen columns" section quoting those comments
would do it.

---

## 2. `table-layout: fixed` is hardcoded with no escape hatch and no warning

**Problem.** `styles/ui-tables.css` sets `table-layout: fixed` at line 32 (`.ui-table`) and line
402 (`.ui-mini-table`). Under fixed layout, `min-width` on a `<th>` is ignored by the browser, so
a column cannot be sized to its content.

**Impact.** Column headers truncate, and the usual fix does nothing. This cost a full debugging
cycle: `min-width` was applied, the build was clean, the header still truncated, and there was
nothing to indicate the constraint came from the table's layout algorithm rather than from our own
CSS.

**What we had to do.** Three overrides on a horizontally scrolling table, one of them reaching
into the component:

```scss
.vb-scroll table { table-layout: auto; }
.vb-scroll table th { white-space: nowrap; }
.vb-scroll ::ng-deep ui-column-header .label { overflow: visible; text-overflow: clip; }
```

The third is the awkward one — `.label`'s ellipsis is correct for a fixed-width column but wrong
where there is room to scroll, and there is no input to turn it off.

**Suggested fix.** Either an opt-in `layout="auto"` on `ui-table` for the horizontal-scroll case,
or — cheaper — a line in `table.md` stating that fixed layout is deliberate, that `min-width` on a
column will not work, and what to do instead. Related: RULES #17 (new in v2) already covers the
`min-width: 0` ancestor problem for scrolling tables; this is the natural companion note.

---

## 3. `ui-modal-shell` has no motion API, and reaching in has a trap

**Problem.** `kit-pack/components/modal-shell.md` has no occurrence of "animation", "transition",
"motion", "enter" or "exit". Any entry/exit motion means reaching through `::ng-deep` to the
component's internal `.panel` class, which is brittle across versions:

```scss
ui-modal-shell ::ng-deep .panel { animation: sheet-up 280ms …; }
ui-modal-shell.sheet-closing ::ng-deep .panel { animation: sheet-down 280ms …; }
```

**The trap, which is worth documenting even if the API isn't added.** Applying the transform to the
`ui-modal-shell` **host** instead of `.panel` silently breaks overlay positioning: a transformed
element becomes the containing block for `position: fixed` descendants, so the `.overlay` stops
resolving against the viewport. Nothing errors — the overlay just lands in the wrong place, and the
cause is three steps removed from the symptom.

**Suggested fix.** Preferably a supported enter/exit motion input on `ui-modal-shell` (a sheet-up
pattern is common enough to be worth owning). Failing that, one line in `modal-shell.md`: the
animation target is `.panel`, never the host, because a transform on the host captures the fixed
overlay.

---

## 4. A table inside a modal has no outer edge

**Problem.** `table[ui-table]` draws its own row rules but no outer border. Inside a card that is
fine — the card supplies the edge. Inside `ui-modal-shell` there is no card, so the table reads as
floating rows of text rather than as a table.

**What we do.** Add the outer border and the vertical dividers manually in every overlay, and only
those — a full border on every cell doubles the horizontal rules and reads far too heavy:

```scss
ui-modal-shell ::ng-deep table[ui-table] {
  border: 1px solid var(--color-border-decorative);
  border-radius: var(--radius-sm, 4px);
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
}
ui-modal-shell ::ng-deep table[ui-table] th:not(:last-child),
ui-modal-shell ::ng-deep table[ui-table] td:not(:last-child) {
  border-right: 1px solid var(--color-border-decorative);
}
```

Note this also forces `border-collapse: separate`, which interacts with the frozen-column rules in
item 1 (the CSS comments there explain why the divider is a pseudo-element under `collapse`).

**Suggested fix.** A `bordered` input on `ui-table`, or a documented pattern for the
table-outside-a-card case. Either would remove a repeated override.

---

## 5. Usage data point: the table-header title ruling

Not a bug — flagging it because it's an explicit owner decision that real usage pushed back on.

`components/table-header.md` lines 25–29 record: *"TITLE-SIZE RULING (owner, this round): DLS
prints the title at heading/xs 20 — this kit keeps every panel title at the SAME compact"* size.

In practice we stepped it back down a size on our densest page:

```scss
ui-table-header ::ng-deep .title { @include type.heading(xs); }
```

At the compact size the panel title didn't hold enough weight against the table beneath it. One
data point from one consumer, not an argument to reverse the ruling — but worth logging against
that decision if others report the same.

---

## 6. Carried over from round one — still open

Three of my eleven v1 findings are unaddressed. In severity order:

- **No `@font-face` for Public Sans.** The kit declares the family throughout but ships no font and
  no `@font-face`. This is the highest-severity silent failure in the kit: every screen renders,
  nothing errors, and the type is simply wrong in a way that reads as "the design is off" rather
  than "a font failed to load". We lost real time to it before finding that `document.fonts` was
  empty; the fix is a Google Fonts link in the consumer's `index.html`, which is still
  load-bearing for us. Either ship the faces or say plainly in README step 1 that the consumer
  must load the family.
- **An unmatched `status` still resolves to neutral with no dev warning.** `status-tag.md` line 51
  now documents the fallback, which helps, but the original ask was a `console.warn` naming the
  unmatched string. Documentation doesn't help the person who never suspected there was a problem —
  we shipped ~120 grey tags before noticing.
- **`ui-summary-card` is still display-only.** Clickable summary figures remain a `boundary-allow`
  exception in two files, each rebuilding the card's chrome around `<button>`.
- Minor: `UiTagVariant` is still five values against our seven-state vocabulary, so two pairs share
  a colour.

---

## What v2 got right

- **The `boundary-allow` fix is better than what I proposed.** I asked for the previous line to be
  accepted; v2 does that *and* requires that line to open with a comment, so an allow can't leak
  onto an unrelated following line. That edge case hadn't occurred to me.
- **Fixed-position, flip-aware dropdown panels.** This is the substantive functional win — a
  multi-select now works inside a column header, which was impossible in v1 (the panel was clipped
  by `ui-table-card`'s `overflow: clip`). It closed round-one item 9 properly rather than just
  documenting the limitation.
- **`tokens.css` is byte-identical to v1.** Nothing in the type scale, spacing or colour moved, so
  the upgrade carried zero visual risk. That restraint is what made this a one-step merge.
- **The CSS comments are the best documentation in the kit.** The frozen-column block records why a
  pseudo-element rather than a border, why specificity rather than source order, and that the edge
  shadow was struck by the owner on 8 Sep with the quote attached. Item 1 above is really just a
  request to surface that quality into `table.md` — don't lose it in a cleanup.
- **Our own bugs became kit rules.** The action-cell comment now warns never to put `display: flex`
  on a `<td>`; that is the exact bug this app hit live. Seeing a field report land as a permanent
  guardrail is the reason it's worth writing these up.
