# UiSkeleton

**Selector:** `ui-skeleton`

**Import**

```ts
import { UiSkeleton } from 'ai-dls-kit';
```

## Description

Skeleton — the DLS 3.1 `loader-skeleton` component (Figma 14415:138020,
REGISTER.md §27, audited 3 Sep 2026). A `level_2` card
(radius 8, `--shadow-elevation-2`) with a fixed header and a body that
varies by `type`:

  <ui-skeleton type="text" />        <!-- three bars, default -->
  <ui-skeleton type="image-text" />  <!-- 112 square + two bars -->
  <ui-skeleton type="image" />       <!-- 207 full-bleed block -->

**Header** (every type): 24px h / 16px v padding, a bottom 1px
`--color-border-decorative` rule, one 16px-tall bar capped at 241px wide
(40% on anything narrower — DLS's own cap reading).

**Body — `text`** (default): 24/24 padding, 8px gap, three 24px bars on
DLS's 4-column / 32px-gap grid: full width, then 3-of-4 columns (~75%),
then full width again.

**Body — `image-text`**: a 112px square beside a column of two bars
(full width, then ~75%) — the same text pairing, run alongside a
thumbnail instead of alone.

**Body — `image`**: a single 207px block, full width, flush to the
card's own rounded bottom corners (no body padding for this type — the
card clips via `overflow: hidden` so the block's square corners still
read as rounded).

**Gradient** — every bar (`ui-skeleton-bar`, next to this file) sweeps
left→right: DLS prints `alt #f7f7f7 → pressed #dde3e7 → alt`; this kit's
`--color-bg-alt` (#f7f7f7) and `--color-bg-pressed` (#dde3e7) are exact
hex matches, not substitutions. Shimmer via `background-position`,
reduced-motion aware (frozen, not hidden).

`aria-busy="true"` on the host; every bar and the card chrome are
`aria-hidden` — a skeleton has nothing for a screen reader to read out
frame-by-frame, the surrounding loading state is what announces it.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `type` | `UiSkeletonType` | `'text'` |

## Types

```ts
export type UiSkeletonType = 'text' | 'image-text' | 'image';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</div>
    <div class="demos">
      <div class="row wrap ui-skeleton-row">
        <div class="card-frame ui-skeleton-frame"><ui-skeleton type="text" /></div>
        <div class="card-frame ui-skeleton-frame"><ui-skeleton type="image-text" /></div>
        <div class="card-frame ui-skeleton-frame"><ui-skeleton type="image" /></div>
      </div>
    </div>
  </section>
```


## Provenance

REGISTER.md §27 (optional background — no Figma access required to use this component)
