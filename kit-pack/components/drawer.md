# UiDrawer

**Selector:** `ui-drawer`

**Import**

```ts
import { UiDrawer } from 'ai-dls-kit';
```

## Description

Right-edge sliding panel — the DLS 3.1 `drawer` component (page 1656:258,
set 2350:12317, REGISTER.md §15, audited + grown ADDITIVELY
2 Sep 2026 — the §13–§20 round). Fixed to the viewport's right edge, no
gaps top/right/bottom:

  <ui-drawer heading="Profile" [open]="drawerOpen()" (closed)="drawerOpen.set(false)">
    …body…
  </ui-drawer>

NON-MODAL, unlike `ui-modal-shell`: no backdrop, and the page behind it
stays interactive — the Figma spec has no scrim layer, so this doesn't
invent one. Escape closes it while open (a document-level listener, since
there is no backdrop to own the keydown), matching the platform convention
`ui-modal-shell` and `[uiTooltip]` already follow.

Rendered via `@if (open())` rather than a `display: none` host style, so a
closed drawer leaves nothing in the DOM (no hidden animation state to
reset, no offscreen focusable content).

**Header** (2277:12259; Medium and "Small (for internal tools)" measure
identically) — 24px h / 16px v padding, `--shadow-elevation-2` INSTEAD of
a bottom rule (the sink used to draw a 1px border here; DLS draws a
shadow, so the border is gone, not merely hidden). Content row gap 12,
-4px optical end margins on the leading (back button) and trailing
(actions group) edges so a 32px icon-button's 24px glyph lands flush
with the 24px header padding rather than the button's own box:

  <ui-drawer heading="Case #4471" subtitle="Opened 2 Sep" [count]="3"
    back [open]="drawerOpen()" (backActivated)="onBack()" (closed)="drawerOpen.set(false)">
    <button ui-drawer-actions ui-button variant="secondary">Edit</button>
    …body…
  </ui-drawer>

`subtitle` — `body(sm)` 13px `--color-text-subtle`, 4px under the
heading. `count` — an optional `ui-badge` at DLS's Medium emphasis
(§4, the inverse-grey pill), 8px right of the heading. `back` renders a
leading 32px `ui-icon-button` (24px chevron-left) and emits
`backActivated` on click — OFF by default, since most drawers have no
back navigation. Title-group is `min-height: 32` so a bare heading
(no subtitle) still centres against the 32px back/close buttons.

Optional HEADER-ACTIONS slot — DLS iconButton/button slots beside the
close icon — via `[ui-drawer-actions]`. Projects left of the close
button, inside the same flex group (8px gap), so the header's
space-between layout still keeps heading left, actions+close right.
Empty when unused — no stray gap, since the wrapper `<div class="header-actions">`
is the flex container that already holds close. The close button (and
the back button, when shown) are now `button[ui-icon-button]` (§8) —
grey glyph, DLS's real icon-button anatomy — rather than a hand-rolled
`<button>`; class names (`close-btn`) are kept unchanged so existing
specs (f39-org-chart et al.) that target them by class still pass.

**Body** (239346:102685) — 24/24 padding, slot, unchanged. Optional
`flush` input drops that inset to zero (`panel-body--flush`) for a body
whose own content draws edge-to-edge rows and hairlines — list-style
drawers like the sign-off tracker — where the kit's 24px inset would just
double up against the content's own edge padding.

**Footer** (158851:9191) — an optional `[ui-drawer-footer]` slot, only
rendered when the caller projects into it (`.drawer-footer:empty` is
hidden by CSS — the same always-render-let-:empty-collapse pattern
`ui-alert`'s actions slot and `ui-coachmark`'s image slot use, no
`hasFooter` input needed). 24px h / 16px v padding, gap 8,
`--shadow-sticky-bottom`. `footerLayout`:

  <ui-drawer heading="Add Task" [open]="open()" (closed)="open.set(false)">
    …body…
    <button ui-drawer-footer ui-button variant="secondary" size="small" (click)="cancel()">Cancel</button>
    <button ui-drawer-footer ui-button variant="primary" size="small" (click)="save()">Save</button>
  </ui-drawer>

- `default` (the default) — DLS's "Default" type: each projected child
  gets `flex: 1`, so two buttons split the row evenly (Label secondary +
  Label primary).
- `stacked` — DLS's "Stacked" type: column, each child full-width.
  Primary-first is the CALLER's job (DOM order), not a CSS reorder — DLS
  shows primary over secondary and this component has no way to tell
  which projected child is which.
- `right` — DLS's "Right-aligned" type: `justify-content: flex-end`,
  children hug their own width rather than stretching.

OWNER'S RULING (2 Sep 2026, carried from the Button pass §7): footer
buttons are `ui-button size="small"` (32px) — the platform's compact
voice — not DLS's own 48px Large buttons for this slot. The caller
supplies its own `ui-button`s; this component only lays out whatever is
projected, same division of labour as `[ui-drawer-actions]`.

Docblock node refs for the record: set 2350:12317; header 2277:12259;
body 239346:102685; footer 158851:9191 (Default | Stacked |
Right-aligned types).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `heading` (required) | `string` | — |
| `open` | `(inferred)` | `false` |
| `subtitle` | `string` | — |
| `count` | `number | string` | — |
| `back` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `flush` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `footerLayout` | `UiDrawerFooterLayout` | `'default'` |

**Outputs**

| Name | Type |
| --- | --- |
| `closed` | `void` |
| `backActivated` | `void` |

## Types

```ts
export type UiDrawerFooterLayout = 'default' | 'stacked' | 'right';
```

## Slots

- Default (unnamed) content projection
- `select="[ui-drawer-actions]"`
- `select="[ui-drawer-footer]"`


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §15 (optional background — no Figma access required to use this component)
