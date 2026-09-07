# UiSummaryCard

**Selector:** `ui-summary-card`

**Import**

```ts
import { UiSummaryCard } from 'ai-dls-kit';
```

## Description

Summary card — the white strip of headline figures that sits above a
table, with a hairline divider between items and an optional card
title. Its frame is the CARD FRAME verbatim — `--color-bg-level1`,
`--radius-md`, `--shadow-elevation-2`, no border — the same three tokens
`ui-card` paints, so the two read as one surface side by side (kit-fixes
item 17, 6 Sep 2026; it used to carry its own 1px border and a lighter
raw shadow).

  <ui-summary-card [items]="figures()" />
  <ui-summary-card title="Reviewer progress" [items]="[{ count: '4/8', label: 'Completed' }]" />

WHY THIS IS A KIT COMPONENT. Its chrome — surface, border, radius, shadow,
the 8/12 padding rhythm, the 24px hairline — existed as loose CSS classes
copied between call sites, and its layout was consequently fixed three
separate times, each fix landing in one copy. The classes had already
drifted: two of the copies carried `flex: 0 0 auto` +
`justify-content: space-between` overrides, which is why their items spread
across the card instead of sitting against their dividers like every other
copy's. Chrome shared by three call sites is exactly what the two-layer
rule puts in the kit.

EVERY ITEM IS AN EQUAL COLUMN (`flex: 1 1 0; min-width: 0`) WITH ITS
CONTENT ANCHORED LEFT. That single rule is what makes all three uses
agree, and it is the whole fix — a one-item card, a three-item card and a
five-item card all read the same way, with each figure hard against the
divider that precedes it, and when the card narrows every pillar shrinks
by the same amount (the caption ellipsises on one line, the count never
wraps — kit-fixes item 12, 6 Sep 2026). Do not add a hugging or
distributing mode: that is the bug coming back.

── The delta indicator (D-Head Risk & Controls kit gap 1) ──────────────
Figma's delta chip is red (#e53939 on #fff4f4) or green (#00926b on
#effbf9) — a tint pair that matches neither `--color-danger`/
`--color-chart-negative-fill` nor `--color-chart-positive`/-fill closely
enough to repoint, so `--color-delta-danger(-bg)`/`--color-delta-success
(-bg)` were added to `tokens.css` with these exact values (DLS's own
Data/Green/10-80 for the success side). The glyph is
drawn inline (`.summary-delta-glyph`, an 8x6 CSS triangle) rather than the
Figma export, matching how `ui-accordion`'s chevron is hand-drawn from the
DLS path instead of a downloaded asset — a solid triangle has no vector
detail an export would preserve that CSS cannot. The value text is 14px
medium, which is DLS `label/sm` in Figma's own scale but this kit's
`label(md)` — see the reference app's internal notes's note on the two libraries' size steps
not lining up 1:1.

The count, delta and caption stay FLAT siblings under `.summary-card` —
no wrapper groups count+delta into their own row. A wrapper would move
`.summary-count`'s DOM sibling from the caption to the wrapper, and F24's
"the red figure is the Breach one" spec walks
`.summary-count--danger` -> `xpath=following-sibling::span` to prove the
red paint and its caption never drift apart by position. `flex-wrap` on
the card plus `flex-basis: 100%` on the caption gets the same two-line
look without moving anyone in the DOM.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` | `(inferred)` | `''` |
| `items` (required) | `readonly UiSummaryItem[]` | — |

## Types

One item on a summary card: a headline figure with a caption under it.

`count` is a STRING OR NUMBER because both readings are figures — `16` and
`29/35` are the same kind of thing to this component, and forcing the
consumer to stringify a count would be noise.

```ts
export interface UiSummaryItem {
  count: string | number;
  label: string;
  /**
   * A status dot beside the label, in this colour. Present or absent per
   * ITEM, not per card — the trades-review card mixes a plain caption with
   * four dotted ones. Rendered through `ui-pill variant="plain"`, so the
   * dot-colour table stays in one place instead of being copied per card.
   */
  dot?: UiPillColor;
  /**
   * Paints the FIGURE in the danger hue. Separate from `dot` because the two
   * answer different questions — a red dot says "this bucket is the adverse
   * one", the red figure says "look at this number" — and a consumer that
   * wants them to agree derives both from one source rather than this
   * component inferring one from the other.
   */
  danger?: boolean;
  /**
   * A change indicator beside the count — the desk lead Risk & Controls
   * (Figma 1603:134848, "Portfolio Summary Statistics"): "40 ▲3" red,
   * "49,001.72K ▼9,001.23" green.
   *
   * `tone` is EXPLICIT, never derived from `direction`. A rising breach
   * count is bad news drawn with an up-glyph; a rising recovered-volume
   * figure is good news drawn the same way — the glyph says which way the
   * number moved, the tone says whether that is welcome, and only the
   * caller who knows what the figure means can say which is which.
   */
  delta?: { value: string; direction: 'up' | 'down'; tone: 'danger' | 'success' };
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</div>
    <div class="demos">
      <div class="card-frame w400">
        <ui-summary-card [items]="deskHeadSummary" />
      </div>

      <h3>Narrow — drag the frame's corner to squeeze it</h3>
      <p class="hint">
        A five-pillar card in a resizable frame (<code>resize: horizontal</code>). At any width the
        five pillar boxes stay equal within 1px and the counts stay on one line; the captions
        ellipsise together rather than one pillar wrapping first.
      </p>
      <div class="summary-resize-frame">
        <ui-summary-card [items]="summaryNarrowItems" />
      </div>

      <h3><code>ui-summary-card</code> beside <code>ui-card</code> — identical frames</h3>
      <p class="hint">
        The item 17 check the owner asked for, in one row: computed
        <code>border-width</code>, <code>border-radius</code>, <code>box-shadow</code> and
        <code>background-color</code> must be identical on the two hosts.
      </p>
      <div class="row wrap summary-vs-card-row">
        <ui-summary-card class="summary-vs-card-summary" [items]="deskHeadSummary" />
        <ui-card class="summary-vs-card-card" title="YTD Performance">
          <p class="hint">A plain kit card, same row, same ground.</p>
        </ui-card>
      </div>
    </div>
  </section>
```


## Provenance

_Not recorded._
