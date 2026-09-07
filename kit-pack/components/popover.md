# UiPopover

**Selector:** `ui-popover`

**Import**

```ts
import { UiPopover } from 'ai-dls-kit';
```

## Description

`ui-popover` — the DLS 3.1 `popover` component (page 3260:1, set
185246:2611, REGISTER.md §31, audited 3 Sep 2026): a 360px
`--color-bg-level3` panel anchored to a trigger, with header / body /
footer slots. A DIFFERENT DLS component from `ui-coachmark` (§12, a dark
onboarding-tour panel with its own step chrome and NO trigger-anchoring
of its own) — do not conflate the two. Owner decision (round §30–§34,
3 Sep 2026): build with a sink demo only, no consumer wired yet.

  <ui-popover title="フィルター" [(open)]="filtersOpen">
    <button uiPopoverTrigger ui-button variant="secondary" size="small">開く</button>
    <p>Body content projects here.</p>
    <ui-checkbox uiPopoverFooterStart [(checked)]="ack">同意する</ui-checkbox>
    <button uiPopoverActions ui-button variant="secondary" size="small" (click)="filtersOpen.set(false)">キャンセル</button>
    <button uiPopoverActions ui-button variant="primary" size="small" (click)="apply()">適用</button>
  </ui-popover>

**Panel** (185246:2611) — `width()` (default 360), `--color-bg-level3`,
`--radius-md` (8), `--shadow-elevation-3`. Positioned `fixed` (not the
host-relative `absolute` `ui-date-input`'s popovers use) so it can never
be clipped by an `overflow: hidden` ancestor between the trigger and the
viewport edge, since this component has no fixed call site yet to prove
that ancestor doesn't exist. `ui-dropdown-menu` (§16) has no shared
positioning utility to import — every existing consumer (kebab-menu,
multi-select, date-input) places its own panel with a hand-placed
`position: absolute` and no flip logic — so the flip-aware placement
below is a fresh, minimal implementation, not a port.

**Header** (89992:316128) — 16px h / 12px v padding, `title` at the kit
heading(2xs) 14/600 `--color-text-strong` (DLS prints heading/2xs 16 —
the standing compactness ruling keeps this role 14px everywhere else it
appears, same as `ui-modal`'s title and `ui-coachmark`'s). Omitted
entirely (no empty band) when `title` is unset.

**Body** — 16px h-pad, 16px bottom padding, 0 top when a header
precedes it (the header's own 12px bottom padding supplies the visual
gap) or 16px top with no header, projected `<ng-content>`.

**Footer** (166757:32936) — 1px `--color-border-decorative` top rule,
16h/12v padding, 8 gap; `footer` picks the DLS Type: `default` (a
`[uiPopoverFooterStart]` checkbox row, 40px min, above a two-column
EQUAL-WIDTH grid of `[uiPopoverActions]` buttons), `stacked` (full-width
buttons, one per row) or `right` (a right-packed row, no grid). Buttons
project in at kit Small per the compact ruling — DLS shows Medium 40,
not built here, same call `ui-modal`'s footer already makes. The whole
footer collapses when NEITHER slot has projected content — the
`:has(> .pf-start:empty):has(> .pf-actions:empty)` rule in popover.scss,
the same always-render-let-CSS-collapse trick `ui-modal`'s footer uses.

**Trigger** — a projected `<ng-content select="[uiPopoverTrigger]">`;
clicking anywhere inside it toggles `open`. `role="dialog"` on the
panel, `aria-labelledby` the title when set, else the `ariaLabel` input.

**Dismissal** — Escape (document-level listener, same non-focus-owning
pattern `ui-modal`/`ui-modal-shell`/`ui-drawer` use) and an outside
mousedown both close when `closeOnOutsideClick()` (default true, the
mousedown listener itself always attaches — the flag gates only whether
it acts). `dismissed` fires on every close path. Opening moves focus
into the panel (its own `tabindex="-1"` root — the DLS anatomy has no
single obvious default control, same reasoning `ui-modal`'s docblock
gives); closing returns focus to whatever had it before, mirroring
`ui-modal` exactly.

**Placement** — `bottom-start` (default) | `bottom-end` | `top-start` |
`top-end`, 8px offset from the trigger. Flips to the opposite vertical
edge when the panel would overflow the viewport on its preferred side
AND the flipped side has room; the horizontal edge only nudges inward
to stay on-screen (DLS's own note reads "positions always in the centre
based on view height" — no horizontal-flip axis is specified, so this
kit doesn't invent one).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` | `string` | — |
| `ariaLabel` | `string` | — |
| `width` | `(inferred)` | `360` |
| `footer` | `UiPopoverFooterLayout` | `'default'` |
| `placement` | `UiPopoverPlacement` | `'bottom-start'` |
| `closeOnOutsideClick` | `(inferred)` | `true, { transform: booleanAttribute }` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `open` | `(inferred)` | `false` |

**Outputs**

| Name | Type |
| --- | --- |
| `dismissed` | `void` |

## Types

```ts
export type UiPopoverFooterLayout = 'default' | 'stacked' | 'right';
```

```ts
export type UiPopoverPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
```

## Slots

- Default (unnamed) content projection
- `select="[uiPopoverTrigger]"`
- `select="[uiPopoverFooterStart]"`
- `select="[uiPopoverActions]"`


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §31 (optional background — no Figma access required to use this component)
