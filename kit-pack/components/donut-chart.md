# UiDonutChart

**Selector:** `ui-donut-chart`

**Import**

```ts
import { UiDonutChart } from 'ai-dls-kit';
```

## Description

Donut chart — the Dashboard's **Product Breakdown** (Figma 1002:236111,
frame 994:233795, donut 1243:80948): a ring of six slices with a figure
and a caption in the hole.

  <ui-donut-chart [segments]="products" centerValue="100K"
    centerLabel="Total P&L" label="P&L by product" />

── The centre label is TWO strings, and it is HTML ─────────────────────
`centerValue` is the hero figure, `centerLabel` the caption under it.
They are absolutely-positioned HTML over the SVG rather than `<text>`
inside it, for D4's reason: text inside a scaled viewBox is scaled type,
and a card that narrows would silently shrink `100K` out of the DLS
scale. Both are the caller's own strings — the kit formats no numbers.

── The legend is IN this component, and can be turned off ──────────────
Two or more series always ship with a legend, so this one carries its own
and a donut is never handed out identifiable by hue alone. But Figma's
card puts a RICHER legend beside the ring — name, share, value, and a
checkbox that filters the table next to it (1243:80962) — and that is a
control, not a chart part. So `showLegend` exists: D6 sets it false and
supplies that one. Turning it off is a deliberate promise by the caller
to provide its own, which is why the default is on.

── Six slices against four hues ────────────────────────────────────────
The palette is four wide and is never cycled (see `chart-palette.ts`), so
slices five and six repeat the first two hues with a 45-degree hatch, and
the legend swatch carries the same hatch. The texture is the data-viz
backup channel, opt-in and used here for exactly what it is for.

── Why this one IS an SVG, when the bar charts are not ─────────────────
An arc has no HTML equivalent. Unlike D4's plots, the viewBox is NOT
stretched — a circle drawn into a squashed viewBox is an ellipse — so the
ring scales uniformly and `vector-effect` is deliberately absent: the ring
SHOULD get thicker as the donut gets bigger. Only the text stays out.

── Presentational, and static ──────────────────────────────────────────
No hover, no tooltip, no animation, on the owner's call for this round.
Every value a reader would hover for is reachable as text, from the
legend, the centre figure and the data table.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `segments` (required) | `UiDonutSegment[]` | — |
| `centerValue` | `string` | `''` |
| `centerLabel` | `string` | `''` |
| `label` (required) | `string` | — |
| `description` | `string` | `''` |
| `showLegend` | `(inferred)` | `true` |

## Types

One slice. `display` is the CALLER's string — see UiDonutChart.

```ts
export interface UiDonutSegment {
  key: string;
  label: string;
  value: number;
  display?: string;
}
```

```ts
export interface UiChartSlot {
  /** A `var(--color-chart-series-N)` reference — never a literal hex. */
  color: string;
  /** Index into HATCH_ANGLES. 0 is solid. */
  band: number;
}
```

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

Figma 1002:236111 (optional background — no Figma access required to use this component)
