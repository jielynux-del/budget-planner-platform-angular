# UiModalShell

**Selector:** `ui-modal-shell`

**Import**

```ts
import { UiModalShell } from 'ai-dls-kit';
```

## Description

Full-screen modal shell — the shared overlay/panel/header chassis of the
the monitoring app modals (ported from the React ModalBase + ClarifyModal
header), grown ADDITIVELY onto the DLS 3.1 `focus-overlay` component
(page 30431:265173, set 166757:29322, REGISTER.md §19,
audited 2 Sep 2026). Render it conditionally; content projects into the
scroll body:

  @if (open()) {
    <ui-modal-shell title="Clarification Request" (closed)="open.set(false)">
      <ui-card>…</ui-card>
    </ui-modal-shell>
  }

All 17 existing callers pass only `title`/`closed`/projected content and
keep rendering BYTE-IDENTICAL — every input below is opt-in and defaults
off.

**Header** (166757:29336) — the title row gains three optional pieces,
all before/around the existing `panel-title`:
- `back` + `(backActivated)` — a leading `button[ui-icon-button]`
  (`size="small"`, 24px chevron-left), 12px before the title group.
- `[ui-modal-icon]` slot (`hasIcon` gates the disc) — a 32px circular
  disc rendered before the title group. DLS's crimson-00 fill (#fff2f2)
  has no token in this kit yet; `--color-bg-danger-subtlest` (#fff0f0)
  is the nearest existing step (1 value off, the kit's own danger-tint
  role) and is used here rather than adding a new token for a 1-unit
  delta. Glyph is projected at 16px, coloured `--color-danger`.
- `subtitle` — kit `body(sm)` 13px, `--color-text-subtle`, 4px under the
  title, max-width 800. `title-group` gets a 32px min-height so a
  subtitle-less title still centres against a 32px back/icon/actions row.

`[ui-modal-actions]` slot renders BEFORE the close button in the actions
group (8px gap, -4px optical right margin to match the close button's
own optical trim) — e.g. a projected more-vertical icon-button. The
close button itself is now a real `button[ui-icon-button]` size="small"
(same precedent `ui-drawer`'s close/back buttons set, §15) — class name
`.close-btn` and `aria-label="Close"` are kept for existing spec
locators, but the glyph now follows icon-button's own 24px-at-Small
sizing rather than its old hand-rolled 16px.

`[ui-modal-stepper]` / `[ui-modal-tabs]` header slots render under the
title row (16px gap) inside the header container. The tabs slot zeroes
the header's own bottom padding and takes `--shadow-sticky-top` (DLS's
tab-group-under-header reading, 166757:29354) — the Stepper (walk item
38) and Tabs (walk item 41) rounds own the real anatomy; for now the
sink projects a placeholder `ui-tabs` / static step row into them.

**Body** (166757:29415) — `loading` swaps the projected content for two
`ui-skeleton type="text"` cards (REGISTER.md §27, kit
`loader`/`skeleton` round, 3 Sep 2026 — unified off this component's own
former hand-rolled `.ms-skeleton-card`/`.ms-skeleton-bar` markup, which
duplicated the same DLS `loader-skeleton` anatomy `ui-skeleton` now
owns), 16px gap between the two cards via `.ms-skeleton`.
`aria-busy="true"` on the body while loading.

**Footer** (`[ui-modal-footer]`, 5 Sep 2026) — an optional action bar
pinned to the panel's bottom edge, gated by `hasFooterSlot` exactly the
way `hasTabsSlot` gates the tabs slot:

  <ui-modal-shell title="…" [hasFooterSlot]="true" (closed)="…">
    <ui-card>…</ui-card>
    <button ui-modal-footer ui-button variant="secondary" (click)="cancel()">Cancel</button>
    <button ui-modal-footer ui-button variant="primary" (click)="submit()">Submit</button>
  </ui-modal-shell>

Right-aligned, 8px gap, 16px vertical / 40px horizontal padding (the
same 40px gutter the header uses), `--color-border-decorative` top rule,
`--color-bg-level1` ground. It is a flex sibling of the scroll body, not
inside it, so it stays put while the body scrolls behind it — the
"sticky" reading with no `position: sticky` needed. Directive 6 still
applies to a footer-less shell (action buttons OUTSIDE the cards, below
the last one, inside the body); the footer is for the flows the owner
has ruled want the actions always on screen.

Kit-fixes walk item 3 (6 Sep 2026): the footer's content sits in the
SAME 1200px-capped centred inner column the header uses
(`.ms-footer-inner`), so at any viewport width the last right action's
right edge lines up with the close X (the column's right edge = the X
glyph's right edge). A second slot, `[ui-modal-footer-start]`, renders
a left-side group flush with the header's left edge — the same
start/end split `[ui-actions-row]`'s `align="between"` gives a body
row:

  <button ui-modal-footer-start ui-button variant="plain" (click)="back()">Back</button>
  <button ui-modal-footer ui-button variant="secondary" (click)="cancel()">Cancel</button>
  <button ui-modal-footer ui-button variant="primary" (click)="submit()">Submit</button>

Both slots share the one `hasFooterSlot` gate; the start group collapses
(`:empty`) when nothing projects into it, so a right-only footer is
unchanged apart from the column cap.

Items 6 and 20 of the same walk: the header and footer are lifted above
the scroll body in stacking order (`position: relative; z-index: 1`) so
the header's elevation-2 shadow stays visible over scrolled cards, and
the panel now fills the viewport edge to edge with SQUARE corners — no
24px top inset, no `--radius-md` on the panel/header (DLS's focus
overlay is full-viewport; the sheet-like inset and radii were this
shell's own).

The panel ground under the header was already `--color-bg-app`
(#f5f7f9), the same hex DLS's level_0 token resolves to — switched to
`--color-bg-level0` (added this round, tokens.css) so the name matches
the DLS role; no visual change.

Padding stays the OWNER'S gutter rule (directive 7: 24px top/bottom,
40px left/right on the grey body — NOT DLS's 24/16 header split), same
as before this round. Content in the body follows directive 6 (focus
overlays): `ui-card`s 16px apart via the panel's own stack gap, action
buttons live OUTSIDE the cards, below the last one — a caller concern,
unchanged by this round.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` (required) | `string` | — |
| `subtitle` | `string` | — |
| `hasIcon` | `(inferred)` | `false` |
| `back` | `(inferred)` | `false` |
| `loading` | `(inferred)` | `false` |
| `hasTabsSlot` | `(inferred)` | `false` |
| `hasFooterSlot` | `(inferred)` | `false` |

**Outputs**

| Name | Type |
| --- | --- |
| `closed` | `void` |
| `backActivated` | `void` |

## Slots

- Default (unnamed) content projection
- `select="[ui-modal-icon]"`
- `select="[modal-title]"`
- `select="[ui-modal-actions]"`
- `select="[ui-modal-stepper]"`
- `select="[ui-modal-tabs]"`
- `select="[ui-modal-footer-start]"`
- `select="[ui-modal-footer]"`


## Example

From the kit's kitchen sink:

```html
/>

@if (showModal()) {
  <ui-modal-shell title="Clarification Request" (closed)="showModal.set(false); modalLastEvent.set('closed')">
    <ui-card title="Selected Issues">
      <p class="hint">Modal body — cards project into the scrollable panel.</p>
    </ui-card>
    <ui-card title="Clarification Request Details">
      <ui-rich-text placeholder="Add your remarks here..." />
    </ui-card>
  </ui-modal-shell>
}

@if (showFullModal()) {
  <ui-modal-shell
    title="Yamamoto Haruto — clarification"
    subtitle="Raised 2 Sep 2026 · Rates Desk"
    [hasIcon]="true"
    [back]="true"
    (backActivated)="showFullModal.set(false); modalLastEvent.set('back')"
    (closed)="showFullModal.set(false); modalLastEvent.set('closed')"
  >
    <ui-icon ui-modal-icon name="…" />
    <button ui-modal-actions ui-icon-button size="small" type="button" aria-label="More actions">
      <ui-icon name="…" [size]="24" />
    </button>
    <ui-card title="Selected Issues">
      <p class="hint">Two cards, 16px apart via the panel's own stack gap — directive 6.</p>
    </ui-card>
    <ui-card title="Clarification Request Details">
      <ui-rich-text placeholder="Add your remarks here..." />
    </ui-card>
    <div ui-actions-row>
      <button ui-button variant="secondary" (click)="showFullModal.set(false); modalLastEvent.set('cancel')">Cancel</button>
      <button ui-button variant="primary" (click)="showFullModal.set(false); modalLastEvent.set('submit')">Submit</button>
    </div>
  </ui-modal-shell>
}

@if (showLoadingModal()) {
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §19 (optional background — no Figma access required to use this component)
