# UiLineChart

**Selector:** `ui-line-chart`

**Import**

```ts
import { UiLineChart } from 'ai-dls-kit';
```

## Description

Multi-series line chart — the Dashboard's **P&L Trend** card
(Figma 1002:236111, frame 994:233795, plot 994:233891): four series over
six months, four labelled gridlines, an x-axis, point callouts and a
legend beneath.

  <ui-line-chart
    [series]="pnl" [categories]="months" [ticks]="pnlTicks"
    [annotations]="pnlNotes" label="P&L trend by portfolio, Jan to Jun 2026" />

── Presentational, and static ──────────────────────────────────────────
Every number arrives as an input; the component derives geometry and
nothing else. It has no hover layer, no tooltip and no animation — the
owner's call for this round ("charts need not be interactive but must
match the Figma"), and a deliberate departure from the data-viz default of
shipping a crosshair. The mitigation is the one that default exists to
buy: every value a reader would hover for is reachable as text, from the
gridline labels, the callouts, and the data table below.

── Why hand-built SVG and no charting library ──────────────────────────
Plan §7. A library brings a second styling system into a kit that must be
reskinned onto DBS DLS, the two-layer rule bans hex and requires tokens,
and none of a library's interactivity is wanted here.

── Why the text is HTML and only the marks are SVG ─────────────────────
The plot is a 100x100 viewBox with `preserveAspectRatio="none"`, so one
SVG user unit IS one percent of the plot in each axis and the same numbers
drive the SVG paths and the absolutely-positioned HTML labels — they
cannot drift apart. Stretching that viewBox would also stretch any text
and stroke inside it, so the strokes carry `vector-effect:
non-scaling-stroke` and the text never enters the SVG at all. Every label
therefore keeps its real DLS type at every width, which a uniformly scaled
chart-in-an-SVG would lose the moment the card narrowed.

── The kit does no number formatting ───────────────────────────────────
`ticks` and `annotations` carry the caller's own strings. Figma's axis
reads `8K / 0 / -8K / -16K` and its callouts read `+7,477K` / `(25,892K)`
— three different conventions for a number in one card. A formatter in
here would have to guess which, and would be the piece a reskin cannot
see. Locale and accounting brackets belong to the caller.

── Accessibility ───────────────────────────────────────────────────────
The SVG is `role="img"` with the caller's `label` as its accessible name
and its `<title>`, plus `description` as `<desc>` when given. That alone
would still leave the values unreadable, so the component also renders the
series as a visually-hidden data table: a chart that is only a picture is
not honest, and the table is the text alternative that makes it one. It is
a real `<table>` because that is what a table IS to a screen reader — the
kit is the layer where real elements live.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `series` (required) | `UiLineSeries[]` | — |
| `categories` (required) | `string[]` | — |
| `ticks` | `UiChartTick[]` | `[]` |
| `annotations` | `UiLineAnnotation[]` | `[]` |
| `label` (required) | `string` | — |
| `description` | `string` | `''` |

## Types

One line. A `null` value is a GAP in the record, never a zero.

```ts
export interface UiLineSeries {
  key: string;
  label: string;
  values: (number | null)[];
}
```

A labelled gridline. The label is the CALLER's string — see UiLineChart.

```ts
export interface UiChartTick {
  value: number;
  label: string;
}
```

A callout pinned to one point of one series (Figma's `+7,477K` peak).

```ts
export interface UiLineAnnotation {
  seriesKey: string;
  /** Index into `categories`. */
  index: number;
  label: string;
  /** Which side of the point the callout sits on. Default 'above'. */
  place?: 'above' | 'below';
}
```

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

Figma 1002:236111 (optional background — no Figma access required to use this component)
