# UiProgressBar

**Selector:** `ui-progress-bar`

**Import**

```ts
import { UiProgressBar } from 'ai-dls-kit';
```

## Description

Progress bar — DLS 3.1 `Progress bar` (Figma set 1168:363,
REGISTER.md §32, built 3 Sep 2026). A 4px pill-radius
track, full width of its container, with a single fill segment:

  <ui-progress-bar [value]="70" />                       <!-- warning fill -->
  <ui-progress-bar [value]="100" />                       <!-- success fill -->
  <ui-progress-bar state="error" />                       <!-- danger, full width -->
  <ui-progress-bar state="indeterminate" ariaLabel="Loading" />

DLS's 10-column-grid fill reads as two colour rules, not a gradient:
**1–99% = warning** (`--color-warning-strong` #eb9600), **100% =
success** (`--color-success-strong` #00ab61); 0% paints no fill at all.
`state="error"` overrides `value` entirely — a full-width danger
(`--color-danger` #ff4724) fill, the DLS "Error" cell. `state=
"indeterminate"` ignores `value` too — a 30%-wide warning segment
sweeping left→right on a ~1.4s loop (DLS's fill is animated in code, no
static node to measure); frozen at a fixed 30–60% position under
`prefers-reduced-motion: reduce` rather than hidden, same house rule as
`ui-skeleton-bar`'s shimmer.

No label anatomy on the DLS node — the caption (title + "x/y sections
completed", etc.) is the consumer's own row, same split the reference-app migration keeps with `.progress-title`/`.progress-sub`.

Track: `--color-bg-neutral` #dde3e7 (added to tokens.css this round —
no bg-role token carried this hex before; #dde3e7 previously lived only
on `--color-tag-neutral` / `--color-border-decorative` / `--color-bg-
pressed` / `--color-chart-grid`, all a different DLS role). Track
height: DLS names `--size-base-6xs` for the 4px track — that token does
not exist in this kit's size scale (`5xs` 8 is the smallest step), so
the height is a 4px literal with this comment in place of the token.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `(inferred)` | `0` |
| `state` | `'auto' | 'error' | 'indeterminate'` | `'auto'` |
| `ariaLabel` | `string` | — |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<div class="row wrap align-start">
        <div class="w458 stack-4">
          <span class="hint">0%</span>
          <ui-progress-bar [value]="0" />
        </div>
        <div class="w458 stack-4">
          <span class="hint">30%</span>
          <ui-progress-bar [value]="30" />
        </div>
        <div class="w458 stack-4">
          <span class="hint">70%</span>
          <ui-progress-bar [value]="70" />
        </div>
        <div class="w458 stack-4">
          <span class="hint">100%</span>
          <ui-progress-bar [value]="100" />
        </div>
        <div class="w458 stack-4">
          <span class="hint">Error</span>
          <ui-progress-bar state="error" />
        </div>
        <div class="w458 stack-4">
          <span class="hint">Indeterminate</span>
          <ui-progress-bar state="indeterminate" ariaLabel="Loading" />
        </div>
      </div>
    </div>
  </section>
```


## Provenance

REGISTER.md §32 (optional background — no Figma access required to use this component)
