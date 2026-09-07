# UiSparkline

**Selector:** `ui-sparkline`

**Import**

```ts
import { UiSparkline } from 'ai-dls-kit';
```

## Description

Sparkline — the small signed-area chart beside the Dashboard's **YTD
Performance** figures (Figma 1002:236111, frame 994:233795, node
994:233841): one trace over a zero baseline, green where the period is up
and red where it is down, each run washed down to the line.

  <ui-sparkline [values]="ytd" label="Year-to-date P&L by week" />

── Why the sign, and not a series colour ───────────────────────────────
This is the one chart in the set whose colour is not identity — it is
POLARITY, a diverging encoding with zero as its neutral midpoint. So it
takes `--color-chart-positive` / `--color-chart-negative` and never a
categorical slot: the day someone plots two sparklines side by side, slot 1
must still mean "the first series", not "a good month".

── Zero is always in the domain ────────────────────────────────────────
Above and below only mean anything relative to a baseline that is on the
chart, so the domain is widened to include 0 even when every reading has
the same sign. An all-positive sparkline therefore sits entirely above its
line, which is the true picture, rather than being re-centred into a
half-red one.

── Presentational, static, and hand-built ──────────────────────────────
Same three reasons as `ui-line-chart`, and the same 100x100 stretched
viewBox with `vector-effect: non-scaling-stroke`, so the trace keeps its
weight at any card width. There is no axis and no legend here, so nothing
needs to stay out of the SVG.

── Accessibility ───────────────────────────────────────────────────────
`role="img"` with the caller's `label` as the accessible name, and the
readings as a clipped list — the same argument as `ui-line-chart`'s table.
A sparkline is the most picture-like chart in the set and so the one that
most needs a text alternative; it sits beside a figure that names the
period's total, and without the list that figure is all a screen reader
gets.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `values` (required) | `(number | null)[]` | — |
| `label` (required) | `string` | — |
| `description` | `string` | `''` |
| `categories` | `string[]` | `[]` |

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

Figma 1002:236111 (optional background — no Figma access required to use this component)
