# UiRankedList

**Selector:** `ui-ranked-list`

**Import**

```ts
import { UiRankedList } from 'ai-dls-kit';
```

## Description

Ranked list — the desk lead Risk & Controls kit gap 2 (Figma 1603:134968
"Breaches reported", 1603:135075 / 1603:135119 "Flagged individuals"): a
vertical list of ranked rows, each a two-line label, an optional danger
bar, one or two trailing metrics, and an optional chevron to drill in.

  <ui-ranked-list [items]="byUsecase" label="Breaches by usecase"
    [showChevron]="true" (rowActivated)="openUsecase($event)" />

── Why this is not `ui-bar-list` ────────────────────────────────────────
`ui-bar-list` is a flat name + one value; this row carries a SUBLABEL, up
to two metrics, and a drill-in affordance none of that component's
call sites need. Bending it to fit here would give every existing caller
dead inputs, so this is its own component — the same reasoning D4 used to
keep chart components apart rather than folding them into one
everything-prop shape.

── The sort-flip rule (`emphasis`) ──────────────────────────────────────
The Figma sheet's designer note: whichever metric the list is CURRENTLY
sorted by renders as prominent text (`text-strong`), the other drops to
subtle metadata. The rows for "Breach count" (1603:134968) show
`metrics.primary` strong and `.secondary` subtle; "Impacted volume"
(1603:135119) shows the single visible metric strong the same way. So
this is an INPUT (`emphasis`), never a hardcoded "primary is always
bold" — a dashboard that flips its own sort passes `'secondary'` and the
component repaints, rather than the two metrics silently disagreeing with
whatever the sort control now says.

── The bar's colour ──────────────────────────────────────────────────────
Figma's bar is a literal red (`primitive-color-red-60` #ff5c5c), close to
but distinct from `--color-chart-negative` (#ff4724, the signed-area
pair's red) — added to `tokens.css` as its own token,
`--color-chart-breach`, rather than bent onto the nearest existing one.
`ui-stacked-bar-list`'s "Breach reported" segment uses the same token.

── Presentational, and static ──────────────────────────────────────────
Every number arrives as an input; no hover, no tooltip, no animation —
D4's rule, held here too. Every value a reader would hover for is already
printed on the row.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `items` (required) | `readonly UiRankedListItem[]` | — |
| `max` | `number | null` | `null` |
| `showBar` | `(inferred)` | `true` |
| `showChevron` | `(inferred)` | `false` |
| `emphasis` | `'primary' | 'secondary'` | `'primary'` |
| `label` (required) | `string` | — |

**Outputs**

| Name | Type |
| --- | --- |
| `rowActivated` | `string` |

## Types

One row: a ranked category or person, with up to two trailing metrics.

```ts
export interface UiRankedListItem {
  key: string;
  label: string;
  /** The secondary line under `label` — "3 traders", "8 trade reviews not closed". */
  sublabel?: string;
  /**
   * Bar length. Omitted (or `showBar` false on the list) draws no bar — the
   * Flagged-individuals lists (Figma 1603:135075 / 1603:135119) carry no bar
   * at all, only the label pair and a metric.
   */
  value?: number;
  metrics: { primary: string; secondary?: string };
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
Last row activated: {{ rankedListLastActivated() ?? '—' }}
      </p>
      <div class="card-frame chart-demo w400">
        <ui-ranked-list [items]="lateReviewers" [showBar]="false" label="Late reviewers" />
      </div>
      <p class="hint">
        No <code>value</code>s, so <code>showBar</code> is off — a single strong
        metric and no bar, per the Flagged-individuals card.
      </p>
      <div class="card-frame chart-demo w400">
        <ui-ranked-list [items]="tradersWithBreaches" [showBar]="false" label="Traders with breaches" />
      </div>
      <p class="hint">
        Same shape, sorted by a different column — the metric string changes
        because the sort changed, not because this component decided to.
      </p>
    </div>
  </section>
```


## Provenance

Figma 1603:134968 (optional background — no Figma access required to use this component)
