# UiStackedBarChart

**Selector:** `ui-stacked-bar-chart`

**Import**

```ts
import { UiStackedBarChart } from 'ai-dls-kit';
```

## Description

Stacked column chart — the Dashboard's **Breakdown by product/instrument**
card (Figma 1002:236111, frame 994:233795, plot 994:233952): six columns,
each a stack of four categories, a labelled y-grid, a total above each
bar, and a legend beneath.

  <ui-stacked-bar-chart
    [categories]="products" [columns]="months" [ticks]="volumeTicks"
    label="Trade volume by product, months 3 to 8" />

── Presentational, and static ──────────────────────────────────────────
Every number arrives as an input. No hover, no tooltip, no animation —
the owner's call for this round, same as D4's two charts. The mitigation
is the same one: every value a reader would hover for is reachable as
text, from the gridline labels, the totals above the bars, and the data
table below.

── Why the marks are HTML boxes and not SVG ────────────────────────────
D4's chassis puts the marks in a 100x100 viewBox stretched with
`preserveAspectRatio="none"` and keeps every label as HTML outside it, so
nothing is ever scaled away from its real DLS type. That reasoning is
kept here; the implementation is not, because a stretched viewBox cannot
draw THESE marks. A rectangle in it has a horizontally squashed corner
radius and a bar whose thickness grows with the card, and the 2px surface
gap between segments would be 2px only at one width. A line has none of
those problems, which is why D4's chart is SVG and this one is not.
Everything the chassis actually guarantees still holds: one coordinate
system (percentages of the plot) shared by marks and labels so they
cannot drift, and marks and text both measured in final pixels.

── The palette, and what a fifth category wears ────────────────────────
Four hues, assigned in fixed order, never cycled — see `chart-palette.ts`.
A fifth category repeats the first hue with a 45-degree hatch and the
legend swatch carries the same hatch. Figma's own stacked bars use four
DIFFERENT hues from the P&L lines, two of them greens one step apart
(`green-40` #5ed1b1 beside `green-70` #00b383) sitting adjacent in the
stack — the exact adjacency the D4 palette was validated to avoid. The
validated four are used instead, deliberately.

── The kit does no number formatting ───────────────────────────────────
`ticks` and `total` carry the caller's own strings, for D4's reason: a
formatter in the kit would be the piece a reskin cannot see, and Figma's
own axis (`0 / 1.5K / 3.0K / 4.5K`) and totals (`1,113`) are in different
conventions.

── Accessibility ───────────────────────────────────────────────────────
The plot is `role="img"` with the caller's `label` as its accessible name,
plus a visually-hidden data table carrying every segment and every total.
The clip is on a WRAPPER, never on the table itself — a table sizes to its
content and ignores `width: 1px`.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `categories` (required) | `UiStackedBarCategory[]` | — |
| `columns` (required) | `UiStackedBarColumn[]` | — |
| `ticks` | `UiChartTick[]` | `[]` |
| `label` (required) | `string` | — |

See also: UiChartTick (components/line-chart.md)

## Types

One band of every stack — a product, an instrument class, a bucket.

```ts
export interface UiStackedBarCategory {
  key: string;
  label: string;
}
```

One column. `values` are positional: index i is `categories[i]`.

```ts
export interface UiStackedBarColumn {
  key: string;
  /** The x-axis label. */
  label: string;
  values: number[];
  /**
   * The label above the bar — the CALLER's string, so `1,113` and `4,167`
   * read exactly as the frame does. Omit it and the bar carries no label.
   */
  total?: string;
}
```

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

Figma 1002:236111 (optional background — no Figma access required to use this component)
