# UiBarList

**Selector:** `ui-bar-list`

**Import**

```ts
import { UiBarList } from 'ai-dls-kit';
```

## Description

Horizontal bar list — the Dashboard's **Top Contributors** card (Figma
1002:236111, frame 994:233795, lists 994:234015 and 994:234053): a row
per category, the name on the left, a bar, and the value right-aligned.
The card carries two of these, By Portfolio and By Trader.

  <ui-bar-list [items]="byPortfolio" label="Top contributors by portfolio" />

── One hue for every bar, and why there is no legend ───────────────────
These are nominal categories — portfolios, traders — with no natural
order, and the bar LENGTH already carries the value. Colouring each row a
different hue would spend the identity channel on information the chart
has already shown, and colouring them darker-where-bigger would re-encode
length as lightness. So every bar wears one hue, and the row's own name is
its direct label: a legend box with a single swatch would only restate the
card title. That is also why there is no hidden data table here — unlike a
line or a donut, this chart's every value is ALREADY real text on screen,
so a second copy would just make a screen reader read the card twice.

The hue is `--color-chart-series-3`, violet, which is what Figma's own
bars use and independently the best-contrasting slot in the palette
(5.5:1 on the white card, where two of the four sit below 3:1).

── One scale across the whole list ─────────────────────────────────────
Bar length is a share of the largest value in the list, so the lengths are
comparable down the column. `max` lets a caller impose a scale from
outside when two lists must be read against each other; without it each
list scales to its own top row. (Figma's own bars are ~91% of the track at
the top, and its last row is drawn LONGER than its value warrants — a mock
artefact, not a rule.)

── Presentational, and static ──────────────────────────────────────────
Every number arrives as an input; no hover, no tooltip, no animation, on
the owner's call for this round. The mitigation D4 established is free
here: the value a reader would hover for is printed on the row.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `items` (required) | `UiBarListItem[]` | — |
| `max` | `number | null` | `null` |
| `label` (required) | `string` | — |

## Types

One row. `display` is the CALLER's string — see UiBarList.

```ts
export interface UiBarListItem {
  key: string;
  label: string;
  value: number;
  display: string;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<h2>ui-bar-list</h2>
    <div class="demos">
      <div class="card-frame chart-demo">
        <ui-bar-list [items]="topByPortfolio" label="Top contributors by portfolio" />
      </div>
      <p class="hint">
        The Top Contributors card (Figma 994:234015). Nominal categories, so
        every bar wears ONE hue — bar length already carries the value, and
        colouring each row differently would spend the identity channel twice.
        The row name is its own direct label, which is why there is no legend
        and no hidden table: every value is already real text on screen.
      </p>
      <div class="card-frame chart-demo w400">
        <ui-bar-list [items]="topByTrader" label="Top contributors by trader" />
      </div>
      <p class="hint">
        The second list on the card, on its own scale. Two edges the design does
        not exercise: a value too small to round to a pixel still gets a
        hairline bar rather than being painted as nothing, and a NEGATIVE
        contribution keeps its printed value but loses its bar — a scale that
        starts at zero has no length to give it.
      </p>
    </div>
  </section>
```


## Provenance

Figma
1002:236111 (optional background — no Figma access required to use this component)
