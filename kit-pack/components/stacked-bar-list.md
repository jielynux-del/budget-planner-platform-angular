# UiStackedBarList

**Selector:** `ui-stacked-bar-list`

**Import**

```ts
import { UiStackedBarList } from 'ai-dls-kit';
```

## Description

Horizontal stacked bar list — the desk lead Risk & Controls kit gap 3 (Figma
1603:135199, "Detection overview" / "All outcomes"): one row per
category, a two-segment bar (breach / non-breach), two trailing metric
columns with headers, a bottom value axis, and a legend.

  <ui-stacked-bar-list [rows]="byUsecase" [series]="outcomeSeries"
    [ticks]="pctTicks" [columns]="{ label: 'Usecase', total: 'Total count', pct: '% breaches' }"
    label="Breach outcomes by usecase" />

── Anatomy (kit-fixes walk item 27, 6 Sep 2026 — rebuilt to the node) ──
The owner: "the numbers and the bars should be cleanly spaced. Implement
the Figma design." Per 1603:135199 / 1603:135210:
  - column-heading row (`Usecase` … `Total count`, `% breaches`) in
    label(xs) / `--color-text-subtle`, a 1px `--color-border-decorative`
    rule under it;
  - a label column that is the node's 150px (`--sbl-label-width`) wherever
    there is room and ellipsises down to `--sbl-label-min` where there is
    not;
  - the bar track fills the REMAINING width, never below
    `--sbl-track-min` — the node's own bar is `flex-[1_0_0] min-w-px`
    (I1603:135248;1534:25636);
  - rows on a 36px pitch, 16px bars vertically centred, 1px
    `--color-border-decorative` rule between rows;
  - segments in `series` order — the consumer passes red (`breach`) then
    green (`non-breach`);
  - the axis under the last row: ticks 0 / 25 / 50 / 75 / 100 spread over
    the track's FULL width (0 at the track's left edge, 100 at its right)
    with every label centred under its tick — the end labels overhang
    the track by half their width, as in the node;
  - `Total count` / `% breaches`: right-aligned columns sized to their own
    CONTENT, as the node draws them (1603:135243 / 1603:135214 are
    auto-width right-aligned text, not a fixed box);
  - a legend row (dot + label) at the bottom.
Every geometry hook is a CSS variable on `:host` so a consumer that needs
a wider label column can set it without touching the component.

── Why it survives a narrow card (the second half of item 27) ──────────
The first rebuild gave the label and both number columns FIXED widths
(150 / 72 / 72 + three 16px gaps = 342px) and handed the track the
remainder. In a two-up dashboard card at 1440 that remainder was 126px
and the chart was still broken where the owner actually looks at it. The
columns are now one `subgrid` declaration on `.sbl-frame` (see the scss
header for the full measurement table): the number columns take their
own `max-content` — 62.6 / 65.5px for these headings, not a guessed 72 —
the label column is `minmax(96px, 150px)`, and the track is
`minmax(120px, 1fr)`. At the node's own 616px card the track lands on
241.9px, which is `Chart grid` 1603:135212's `w-[241px]`.

── Why this is not `ui-stacked-bar-chart` rotated ───────────────────────
That chart's chassis is COLUMNS: one shared 0..max scale running up the
page, a total above each bar, categories on the x-axis. This chart's
scale runs left-to-right, the "total" is a table column rather than a
bar-cap label, and every row carries a second metric (`pct`) that
chart has no slot for. Same stacking maths (`plotted()` mirrors that
component's `segments`/`gapped` logic almost line for line), different
shape — see that component's own doc note on keeping chart shapes apart
rather than bending one to fit two layouts.

── Simplified from Figma's own layout ───────────────────────────────────
Figma's frame (1603:135199) draws the grid, the tick labels and the
total/pct columns as three separately-positioned absolute layers stacked
behind the bars. This component uses ONE column declaration — label /
track / total / pct on `.sbl-frame`, taken by the header, every row and
the axis through `grid-template-columns: subgrid` — which keeps them
aligned by construction instead of by matching pixel offsets across
layers. Same visual result; `ui-stacked-bar-chart`'s own doc comment
makes the same call for its HTML-vs-SVG choice.

── One deviation from the node, recorded ────────────────────────────────
The node draws NO horizontal rule between rows and none under the heading
row (1603:135247 is a plain 16px-gap stack). The rules here are the
kit-fixes walk's own instruction for item 27 ("rows … with 1px rule
between rows"), so they stay; flagged for the lead rather than silently
reconciled either way.

── The series colours ────────────────────────────────────────────────────
Figma's two bands are a literal red (`primitive-color-red-60` #ff5c5c)
and green (`primitive-color-green-40` #5ed1b1) — neither in the four-hue
categorical palette (`chart-palette.ts`, which is for NOMINAL categories
with no "good/bad" reading, and a breach outcome is not one) nor close
enough to the signed-area `--color-chart-negative`/`-positive` pair to
reuse. Added to `tokens.css` as `--color-chart-breach`/
`--color-chart-non-breach`, the same red `ui-ranked-list`'s bar uses. The
component itself stays opinion-free — `series[].color` takes any
`var(--color-...)` reference, the sink demo just happens to pass these two.

── The kit does no number formatting ────────────────────────────────────
`total`, `pct` and `ticks` all carry the caller's own strings — D4's rule,
held by `ui-stacked-bar-chart` too. `ticks` defaults to 0/25/50/75/100
when omitted (the node's axis); pass your own to change the scale.

── Presentational, and static ──────────────────────────────────────────
Every number arrives as an input; no hover, no tooltip, no animation.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `rows` (required) | `readonly UiStackedBarListRow[]` | — |
| `series` (required) | `readonly UiStackedBarListSeries[]` | — |
| `ticks` | `readonly UiChartTick[]` | `[]` |
| `columns` (required) | `UiStackedBarListColumns` | — |
| `label` (required) | `string` | — |

See also: UiChartTick (components/line-chart.md)

## Types

One series in the stack — e.g. "Breach reported" / "Non-Breach".

```ts
export interface UiStackedBarListSeries {
  key: string;
  name: string;
  /** A `var(--color-...)` reference — never a literal hex, same rule as `UiChartSlot`. */
  color: string;
}
```

One row. `segments` are positional: index i is `series[i]`.

```ts
export interface UiStackedBarListRow {
  key: string;
  label: string;
  segments: number[];
  /** The caller's own formatted total — see the kit's number-formatting note below. */
  total: string;
  /** The caller's own formatted share, e.g. "38%". */
  pct: string;
}
```

Header labels over the label column (optional) and the two trailing
 metric columns.

```ts
export interface UiStackedBarListColumns {
  /** Heading over the label column — Figma 1603:135199 says "Usecase".
   *  Optional so the existing consumer's `{ total, pct }` keeps compiling. */
  label?: string;
  total: string;
  pct: string;
}
```

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

Figma
1603:135199 (optional background — no Figma access required to use this component)
