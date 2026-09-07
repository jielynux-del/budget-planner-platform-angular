# UiAccordionHeader

**Selector:** `[accordion-header]`

**Import**

```ts
import { UiAccordionHeader } from 'ai-dls-kit';
```

## Description

Marker for `ui-accordion`'s projected header slot — put `accordion-header`
on the element that should REPLACE the built-in title/subtitle/count:

  <ui-accordion title="the reference app">
    <div accordion-header class="my-header">…icon, name, meta, tag…</div>
    …
  </ui-accordion>

A directive rather than a bare attribute so the accordion can SEE the
projection (`contentChild(UiAccordionHeader)`) and switch off its own
title rendering — a bare `<ng-content select>` cannot report whether
anything matched it. Same query-on-a-marker idiom `ui-radio-chiclet-group`
uses on its chiclets. Consumers import it alongside `UiAccordion`.

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
</p>
      <div class="accordion-slot-demos" id="accordion-header-slot-demos">
        <ui-accordion title="the reference app" [defaultOpen]="false" id="accordion-header-slot-platform">
          <div accordion-header class="acc-slot-row">
            <span class="acc-slot-name">the reference app</span>
            <ui-badge [label]="4" />
          </div>
          <button accordion-actions ui-icon-button size="tiny" type="button" aria-label="Edit the reference app">
            <ui-icon name="…" />
          </button>
          <button accordion-actions ui-icon-button size="tiny" type="button" aria-label="Revoke the reference app access">
            <ui-icon name="…" />
          </button>
          <div class="accordion-demo-body"><p class="hint">(a) System Access platform header — name + count badge, edit / revoke icon-buttons in <code>[accordion-actions]</code>. Both actions stop propagation via the slot, so neither toggles.</p></div>
        </ui-accordion>
        <ui-accordion title="Desk: FX Options" [defaultOpen]="false" id="accordion-header-slot-desk">
          <div accordion-header class="acc-slot-stack">
            <span class="acc-slot-name">Desk: FX Options</span>
            <span class="acc-slot-meta">
              <span>the desk lead: Haruto SATO</span>
              <span class="acc-slot-sep">|</span>
              <span>Location: Singapore</span>
              <span class="acc-slot-sep">|</span>
              <span>4 traders</span>
            </span>
          </div>
          <div class="accordion-demo-body"><p class="hint">(b) Profile desk-group header — name over a pipe-separated meta line (label/sm, text-subtle; pipes in text-disabled, as profile-mandates.scss draws them). Two lines grow the header past 48px, same as <code>subtitle</code> does.</p></div>
        </ui-accordion>
        <ui-accordion title="Clarification — Rates Desk" [defaultOpen]="false" id="accordion-header-slot-clarification">
          <div accordion-header class="acc-slot-row">
            <span class="acc-slot-name">Clarification — Rates Desk</span>
            <ui-status-tag label="Pending Response" variant="amber" />
          </div>
          <div class="accordion-demo-body"><p class="hint">(c) Inbox raised-clarification header — name + inline <code>ui-status-tag</code>. Tag and name share the 8px unit gap.</p></div>
        </ui-accordion>
        <ui-accordion title="Data rectification" barColor="purple" [defaultOpen]="false" id="accordion-header-slot-bar">
          <div accordion-header class="acc-slot-row">
            <span class="acc-slot-name">Data rectification</span>
            <ui-status-tag label="Issue Raised" variant="red" />
          </div>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

_Not recorded._
