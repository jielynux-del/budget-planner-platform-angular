# RULES.md — Ai DLS Kit rules for agents

Short, imperative, and binding for anything you build with this kit. Each
rule carries a one-line why.

1. **Use only `ui-*` components and kit tokens.** Never a raw
   `<button>`, `<select>`, `<input>`, or `<table>`; never a hand-drawn
   `<svg>` (rule 12). Why: the kit's whole value is a consistent,
   on-brand surface — a raw control silently opts out of every state,
   token, and accessibility behavior the kit component already has.

2. **Never a hardcoded hex color.** Use a `--color-*` token from
   `TOKENS.md` / `styles/tokens.css`. Why: hex values drift from the
   palette the moment the palette changes, and can't be told apart from a
   deliberate one-off by anyone reading the code later.

3. **Never a raw font-size, font-weight, line-height, or letter-spacing.**
   Type is a ROLE (heading/label/body), not four loose CSS properties —
   use the role mixins the kit ships (see `TOKENS.md`'s Typography
   section). Why: DLS has no independent font-size scale; sizes are a
   side-effect of picking the right role.

4. **The type scale is deliberately compact — keep it that way.** Labels
   13px, body 13/14px, headings 14px, page/modal titles 16–20px. This is a
   ruled house decision, not a bug. Why: matching it exactly is what makes
   the output look like it belongs to this kit, not an ad-hoc guess at DLS
   sizing.

5. **Page content padding: 24px top/bottom, 40px left/right** on the
   scrollable grey area of a page (bottom padding is skippable while the
   user is mid-scroll). **Under a `<ui-page-header>` the top 24px is the
   header's** — it owns the gap below its own bottom rule — so that
   page's content region sets `padding-top: 0` and keeps the 40px sides.
   A header followed by page chrome rather than a scrolling region turns
   the gap off with `contentGap="none"`; never re-add it from a page
   stylesheet. Why: this is the one spacing rule every kit screen shares
   — and a content region that keeps its own 24 under a header renders
   48.

6. **A focus overlay and a modal are not the same thing.** A "modal" is
   the ~600px centered dialog (`ui-modal`). A "focus overlay" is the
   full-viewport takeover (`ui-modal-shell`). Never build one where the
   spec calls for the other. Why: they have different chrome, different
   dismiss behavior, and confusing them produces a component that looks
   right but behaves wrong.

7. **A `<ui-select>` whose REST value is a default starts unfilled — no
   clear (×) button until the user picks something else.** Pass that
   default as `emptyValue`. This covers an "All …" filter sentinel AND
   any other pre-set rest value: a period select defaulting to `YTD`, a
   "Sort by" defaulting to its first column, a field with a single
   pre-filled option. A select that starts genuinely empty behind a
   placeholder passes nothing and is already correct. Why: the clear
   button belongs to the FILLED state — on a value the user never chose
   it is a dead click, and clearing must return to the default rather
   than to `null`.

8. **When the kit is missing something you need, say so and build the
   smallest neutral thing — don't fake a lookalike.** State it as: "X
   added because the kit is missing Y." Why: a silent workaround hides a
   real gap; a stated one can be turned into a real kit component later.

9. **A `<ui-select>` over a long list gets `searchable`.** Any people
   list (staff, trader, sales dealer, reviewer, approver) and any list
   over roughly ten options sets `[searchable]="true"`, which puts a
   search field in the dropdown's own header and filters as you type.
   Why: scrolling a hundred names to find one is not a control, it is a
   punishment — and the capability is already in the kit, so leaving it
   off is a choice nobody meant to make.

10. **Never hand-roll a title-over-subtitle pair.** Use
    `<ui-section-header [title] [subtitle]>`; if the pair sits inside a
    `<ui-card>`, use that card's own `title` / `subtitle` inputs instead.
    Pick the weight with `size` (`lg` / `md` / `sm`) rather than by
    writing CSS, and use its icon / actions / subtitle slots for anything
    that sits beside the title. Delete the local `.x-title` /
    `.x-subtitle` CSS with the swap. Why: hand-rolled pairs drift in
    size, weight and gap the moment two people write two of them, and
    they are invisible to a reskin.

11. **An icon button matches the size of the `ui-button` beside it.**
    Put a `size="small"` icon button next to small buttons and a
    `size="tiny"` one next to tiny buttons; never mix sizes in one
    action group. Why: a control row reads as one object — a 32px glyph
    beside a 24px button reads as a mistake, because it is one.

12. **An icon is NAMED, never drawn.** Every glyph on a screen is
    `<ui-icon name="…" />` — never a pasted `<svg>`, never an icon font,
    never a copied path, including inside a `ui-icon-button` or a
    component's icon slot. Three things follow from that:
    - **`name` is type-checked** against the kit's 569-name catalogue, so
      a name the kit does not have is a compile error rather than a blank
      square. `components/icon.md` lists every name in the catalogue —
      search it there instead of guessing.
    - **Two sizes, 16 (default) and 24**, set with `[size]`. DLS redraws
      a glyph for its box, so these are two drawings, not one scaled.
    - **Colour is never on the glyph.** An icon paints in `currentColor`,
      so it takes the colour of the text around it; style the parent, and
      never put a `fill`, `stroke` or colour token on the icon.
    Leave it hidden from screen readers (the default) when it sits beside
    a label or inside a control that already has an `aria-label`; pass
    `ariaLabel` only when the icon IS the content. Why: a pasted path is
    unversioned artwork — it cannot be re-themed, corrected or resized
    across a codebase, and every paste is one more slightly-wrong copy of
    a glyph the kit already ships.

13. **Every form control is the kit's, including the ones that look too
    small to bother with.** `ui-checkbox`, `ui-radio`, `ui-switch`,
    `ui-select`, `ui-text-input`, `ui-textarea`, `ui-date-input` — never
    a raw `<input type="checkbox">` / `<input type="radio">` /
    `<input type="date">`, and never a `<div>` styled to look like one.
    A control that needs a label, help text, an error or an optional
    marker goes inside `ui-form-field`; two or more selects (or a select
    and a date input) that read as one field go inside `ui-select-group`,
    which draws one border with a divider between members. Why: this is
    rule 1 in the place it is most often broken — a bare checkbox is
    three lines of HTML and looks harmless, but it ships the browser's
    box, the browser's focus ring, and none of the kit's states. (Found
    in the kit's own demos, 7 Sep 2026 — nobody is above this one.)

14. **A reply under a composer is `secondary`. A header action or a
    dialog's own submit is `primary`.** The button under a rich-text /
    comment box in a thread is secondary everywhere, including one
    labelled "Send"; the Reply in a detail header, and the Submit / Save
    / Confirm of a dialog whose body happens to contain a textarea, stay
    primary. Why: primary marks the ONE action a screen is asking for —
    a thread with four reply boxes has four primaries and therefore
    none.

15. **A frozen column's edge is painted ON the frozen cell.** Draw the
    divider as a positioned 1px pseudo-element inside the sticky cell,
    on both the header `th` and the body `td`, and never as a
    `border-left` on the first scrolling column. Why: under
    `border-collapse: collapse` a cell border belongs to the table's
    collapsed border grid and is painted at the column's UN-stuck
    position, so it scrolls away with the content — the one thing a
    frozen edge must not do.

16. **Record an override of the design source in the component, in
    writing.** When a ruling deliberately departs from the design file,
    put the node id, the date and the owner's words in that component's
    doc comment and in its styleguide prose. Two such overrides are
    live in this kit: a combo of selects is ONE outer border with
    borderless members and a divider between them (the design draws each
    member with its own border), and a CHECKED or indeterminate checkbox
    takes NO hover ring (the design ships a "Checked hover" frame).
    Why: an undocumented deviation is indistinguishable from a bug, and
    the next person to open the design file will "fix" it back.

## How to verify

```
node kit-pack/lint/lint-boundaries.mjs src
npx ng build
```

Both must pass clean before you consider a screen done. The lint catches
raw controls, hex colors, and raw type declarations; the build catches
everything else (missing imports, broken bindings, template errors).
