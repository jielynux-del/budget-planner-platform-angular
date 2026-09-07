# UiAccordionBody

**Selector:** `ng-template[accordion-body]`

**Import**

```ts
import { UiAccordionBody } from 'ai-dls-kit';
```

## Description

Marker for `ui-accordion`'s DEFERRABLE body (5 Sep 2026) — an
`<ng-template accordion-body>` the accordion stamps into its body itself:

  <ui-accordion title="Trades" lazyBody [defaultOpen]="false">
    <ng-template accordion-body>
      <app-trade-table [rows]="rows()" />
    </ng-template>
  </ui-accordion>

A template, not a plain projected element, because Angular INSTANTIATES
projected content eagerly — an `@if` around an `<ng-content>` only
decides where the already-built nodes land, it never stops them being
built. A `TemplateRef` is the one thing the
accordion can choose NOT to create. Without `lazyBody` the template is
stamped immediately, so a consumer can adopt the template shape first and
flip the flag later without a second change.

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
<p class="hint" id="accordion-lazy-readout">Body built <code>{{ lazyBodyBuilds() }}</code> time(s).</p>
      <div class="accordion-slot-demos" id="accordion-lazy-demos">
        <ui-accordion title="Trades (lazy)" [defaultOpen]="false" lazyBody id="accordion-lazy-body">
          <ng-template accordion-body>
            <div class="accordion-demo-body"><sink-build-probe (built)="lazyBodyBuilds.update(n => n + 1)" /></div>
          </ng-template>
        </ui-accordion>
      </div>
      <div class="spacer"></div>
      <h3>Controlled open state — <code>[(expanded)]</code> / <code>(expandedChange)</code></h3>
      <p class="hint">
        <code>expanded</code> is a <code>model&lt;boolean | null&gt;</code>: <code>null</code> (the
        default) is the uncontrolled accordion <code>defaultOpen</code> seeds; a boolean is state the
        parent owns. The switch and the accordion below share ONE parent signal —
        <code>[expanded]</code> reads it, <code>(expandedChange)</code> writes it back (a parent whose
        own state is typed <code>boolean | null</code> can use <code>[(expanded)]</code> directly) —
        so flip either and the other follows. Every user toggle writes the model, which is what
        emits <code>expandedChange</code>; a value the parent pushes in does not emit. The second accordion binds only <code>(expandedChange)</code> — the
        "just tell me" form (the monitoring app's ongoing-clarification card clears its badge on each
        expand this way) — and stays uncontrolled until its first toggle.
      </p>
      <label class="toggle-wrap" id="accordion-controlled-switch"><ui-switch [(checked)]="accControlled" /> Open</label>
      <p class="hint" id="accordion-controlled-readout">
        Parent state: <code>{{ accControlled() }}</code>. <code>expandedChange</code> fired
        <code>{{ accExpandedEvents().length }}</code> time(s)@if (accExpandedEvents().length) {: <code>{{ accExpandedEvents().join(', ') }}</code>}.
      </p>
      <div class="accordion-slot-demos" id="accordion-controlled-demos">
        <ui-accordion title="Controlled by the switch" [expanded]="accControlled()" (expandedChange)="onAccControlledChange($event)" id="accordion-controlled">
          <div class="accordion-demo-body"><p class="hint">Click the header or flip the switch — both move the same signal. Only a header click adds to the event count.</p></div>
        </ui-accordion>
        <ui-accordion title="Listening only" [defaultOpen]="false" (expandedChange)="accListenOnlyEvents.update(list => [...list, $event])" id="accordion-listen-only">
          <div class="accordion-demo-body"><p class="hint">No <code>[expanded]</code> binding — uncontrolled, seeded closed. Heard: <code>{{ accListenOnlyEvents().join(', ') || '—' }}</code>.</p></div>
        </ui-accordion>
      </div>
    </div>
  </section>
```


## Provenance

_Not recorded._
