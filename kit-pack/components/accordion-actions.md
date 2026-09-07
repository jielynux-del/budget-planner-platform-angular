# UiAccordionActions

**Selector:** `[accordion-actions]`

**Import**

```ts
import { UiAccordionActions } from 'ai-dls-kit';
```

## Description

Marker for `ui-accordion`'s right-hand actions slot (5 Sep 2026) — put
`accordion-actions` on any control that should sit left of the chevron:

  <ui-accordion title="Platforms">
    <ui-search-input accordion-actions [(value)]="query" />
    …
  </ui-accordion>

The attribute alone has always projected into the slot; what the
DIRECTIVE adds is that the accordion can SEE the projection
(`contentChild(UiAccordionActions)`, same idiom as `UiAccordionHeader`)
and, when it does, moves the toggle off the whole header row and onto
its title area — see the "Title-area toggle" note on `UiAccordion`. A
consumer that forgets to import it still gets the slot, but with the
pre-existing whole-row toggle (and its click-only `stopPropagation`
guard), so import it alongside `UiAccordion` whenever the slot holds
anything keyboard-operable.

## API

_No inputs, models or outputs declared._

## Types

The four `ui-pill` status colours, plus the one hue that is not a status.

Deliberately a SUPERSET of `UiPillColor` rather than a fresh union: a bar's
job is to say "everything under me is in this state", so it must be the same
colour as the status dots on the rows inside it, and the cheapest way to
guarantee that is to make the two share a vocabulary. A call site can hand
`DETECTION_REVIEW_STATUS_META[status].dot` straight to `barColor` and the
bar cannot drift from its rows — there is no second mapping table to keep
in step. `'purple'` is the exception the design has: Data Rectification is
not a `DetectionReviewStatus`, so it has no dot to borrow and names its own.

```ts
export type UiAccordionBarColor = UiPillColor | 'purple';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</div>
    <div class="demos">
      <ui-accordion title="Desk Details">
        <button ui-button variant="secondary" accordion-actions>Edit</button>
        <div class="accordion-demo-body">
          <p class="hint">Grid-rows animation — expands to actual content height.</p>
        </div>
      </ui-accordion>
      <div class="spacer"></div>
      <h3>Header variant — left bar + count</h3>
      <div class="accordion-variants">
        <ui-accordion title="Data rectification" barColor="purple" [count]="8" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">The one bar with no status behind it.</p></div>
        </ui-accordion>
        <ui-accordion title="Not started" barColor="grey" [count]="12" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Grey by owner override — Figma draws this one amber.</p></div>
        </ui-accordion>
        <ui-accordion title="Clarification" barColor="yellow" [count]="3" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Same yellow as the Clarification status dot.</p></div>
        </ui-accordion>
        <ui-accordion title="Closed with breach" barColor="red" [count]="0" [defaultOpen]="false" [expandable]="false">
          <div class="accordion-demo-body"><p class="hint">Never renders — a non-expandable accordion has no body.</p></div>
        </ui-accordion>
        <ui-accordion title="Closed with no issues" barColor="green" [count]="27" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Same green as the Non Breach / Acknowledged dots.</p></div>
        </ui-accordion>
        <ui-accordion title="No bar, no count" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Both inputs absent — what every pre-variant call site renders.</p></div>
        </ui-accordion>
      </div>
      <p class="hint">Bar colours come from the same tokens as the matching ui-pill status dot, so a bar and the rows inside it cannot drift.</p>
      <div class="spacer"></div>
      <h3>Subtitle (DLS gap b)</h3>
      <div class="accordion-variants">
        <ui-accordion title="Desk Details" subtitle="FX Options — APAC">
          <div class="accordion-demo-body"><p class="hint">Second line under the title, label/sm, --color-text-subtle, 4px gap — the header grows to fit it.</p></div>
        </ui-accordion>
        <ui-accordion title="Data rectification" subtitle="8 items awaiting review" barColor="purple" [count]="8">
          <div class="accordion-demo-body"><p class="hint">Subtitle + header action together — actions slot, bar and count are all unaffected by the extra line.</p></div>
        </ui-accordion>
```


## Provenance

_Not recorded._
