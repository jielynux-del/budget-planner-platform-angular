# UiQuicklink

**Selector:** `button[ui-quicklink], a[ui-quicklink]`

**Import**

```ts
import { UiQuicklink } from 'ai-dls-kit';
```

## Description

Quicklink — the DLS 3.1 `quicklink` component (page 5401:31769, set
6567:50541, REGISTER.md §33, audited/built round 30–34,
3 Sep 2026). A round icon-tile shortcut, two directions:

  <button ui-quicklink label="Local Transfer">
    <ui-icon uiQuicklinkIcon name="…" [size]="24" />
  </button>
  <button ui-quicklink size="large" badge="New" label="FX Swap">
    <ui-icon uiQuicklinkIcon name="…" [size]="24" />
  </button>
  <a ui-quicklink direction="horizontal" href="/transfers">
    <ui-icon uiQuicklinkIcon name="…" />
    Transfer
  </a>

Applied as an attribute on a native `<button>`/`<a>` so click/keyboard/
routerLink semantics stay with the caller — same house pattern as
`ui-card-button` / `ui-fab` / `ui-nav-rail-item`.

**Direction "Vertical"** (7970:59609 etc.) — an 80px-wide column, 4px
gap: a pill-circle **tile** (`--color-primary-subtle` bg, a projected
24px icon in `--color-primary`) sized by `size` (`small` 40 |
`medium` 48 (default) | `large` 56 — the Figma sticky note's S/M/L maps
straight onto this input, no renaming), then a centred, two-line-
wrapping `label(sm)` (13px/500, `--color-text-body`).

**Direction "Horizontal (new)"** (228273:337) — the DLS pill: host bg
`--color-bg-level2`, `--shadow-elevation-2`, pill radius, 4px left /
8px right / 4px vertical padding, 8px gap, a 32px tile holding a 16px
icon (same tile tint, scaled down via CSS — see quicklink.scss), then
the same `label(sm)`. `size` is ignored here — DLS gives the pill no
size axis, only the vertical direction has one. The DLS "Horizontal
(old)" pill (a 40px tile, 8 gap) is superseded per the Figma set and is
not built — owner ruling, see the gap register entry.

**Icon** — `<ng-content select="[uiQuicklinkIcon]">`, expected to paint
with `currentColor`. Sized via `::ng-deep` in quicklink.scss.

**Label** — `label` input, OR plain projected text (the horizontal pill
in particular reads naturally as `<a ui-quicklink>…icon…Transfer</a>`).
When `label` is set it wins; otherwise the default `<ng-content />`
carries whatever text the caller placed after the icon.

**Badge** — optional `badge` string (DLS's "New" marker), rendered via
`ui-badge` `emphasis="high"` (16px pill, `--color-bg-danger-strong`,
white `label(xs)` 12px — exactly the DLS geometry, no new CSS needed;
see badge.ts). Vertical only — the DLS set positions it at the tile's
top-right corner and gives two different anchor formulas depending on
size:

- **Large**: "left 32 / bottom 44" of the 80×80 tile FRAME (not the 56px
  tile alone) — implemented as an absolutely-positioned child of the
  80px column host itself (`position: relative` on `:host`), so
  `left: 32px; bottom: 44px` lands exactly where the Figma frame draws
  it regardless of how many label lines follow.
- **Medium/Small**: "centred at 50% + 18.5px, top −4" — implemented
  relative to the tile circle itself (`position: relative` on
  `.ql-tile`), so `left: calc(50% + 18.5px); top: -4px`, independent of
  the tile's own diameter (DLS gives ONE formula for both sizes).

Both read as "overlapping the tile's upper-right edge," which is the
qualitative spec; the exact node coordinates in the Figma set could not
be independently re-measured this round (no live Figma session), so
these are DLS_GAP_REGISTER §33's numbers applied literally.

**States** (both directions): hover tile `--color-primary-subtle-hover`
+ label `--color-text-strong` (pill: host bg `--color-bg-hover`);
pressed tile pressed tint (pill: host `--color-bg-pressed`); focus-
visible = 2px solid `--color-focus` ring on the tile (vertical) / on
the pill (horizontal), inset so there's no layout shift — same recipe
`ui-card-button`/`ui-fab` use; disabled = tile `--color-bg-disabled`,
icon + label `--color-text-disabled`, no hover. Hover rules are written
`:not(:focus-visible)` so a keyboard-focused, mouse-hovered link keeps
its focus ring instead of the hover tint fighting it for specificity.

Pressed uses `--color-primary-subtle-pressed` (#b3d5f0), added by the
lead in the round-38 second pass as the white-label analog of DLS's
product-subtle-pressed — the agent had reused the hover tint while the
tokens file was another agent's.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `direction` | `UiQuicklinkDirection` | `'vertical'` |
| `size` | `UiQuicklinkSize` | `'medium'` |
| `label` | `string` | — |
| `badge` | `string` | — |
| `disabled` | `(inferred)` | `false` |

## Types

```ts
export type UiQuicklinkDirection = 'vertical' | 'horizontal';
```

```ts
export type UiQuicklinkSize = 'small' | 'medium' | 'large';
```

## Slots

- Default (unnamed) content projection
- `select="[uiQuicklinkIcon]"`


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <h3>Vertical — sizes, with and without badge</h3>
      <div class="row quicklink-row">
        <button ui-quicklink size="small" label="Furikomi">
          <ui-icon uiQuicklinkIcon name="…" [size]="24" />
        </button>
        <button ui-quicklink size="medium" label="Furikomi">
          <ui-icon uiQuicklinkIcon name="…" [size]="24" />
        </button>
        <button ui-quicklink size="large" label="Furikomi">
          <ui-icon uiQuicklinkIcon name="…" [size]="24" />
        </button>
        <button ui-quicklink size="medium" badge="New" label="Kokan">
          <ui-icon uiQuicklinkIcon name="…" [size]="24" />
        </button>
        <button ui-quicklink size="large" badge="New" label="Kokan">
          <ui-icon uiQuicklinkIcon name="…" [size]="24" />
        </button>
        <button ui-quicklink size="medium" label="Muko" [disabled]="true">
          <ui-icon uiQuicklinkIcon name="…" [size]="24" />
        </button>
      </div>
      <p class="hint">
        Hover the first three — <code>--color-primary-subtle-hover</code> tile, label goes
        <code>--color-text-strong</code>. The last is disabled: <code>--color-bg-disabled</code> tile,
        <code>--color-text-disabled</code> label.
      </p>
      <div class="spacer"></div>
      <h3>Horizontal (new) — a row of pills</h3>
      <div class="row quicklink-h-row">
        <a ui-quicklink direction="horizontal" href="#" label="Furikomi">
          <ui-icon uiQuicklinkIcon name="…" [size]="24" />
        </a>
        <a ui-quicklink direction="horizontal" href="#" label="Kokan">
          <ui-icon uiQuicklinkIcon name="…" [size]="24" />
        </a>
        <button ui-quicklink direction="horizontal" type="button" label="Muko" [disabled]="true">
          <ui-icon uiQuicklinkIcon name="…" [size]="24" />
        </button>
      </div>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §33 (optional background — no Figma access required to use this component)
