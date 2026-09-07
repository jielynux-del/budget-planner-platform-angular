# UiStepper

**Selector:** `ui-stepper`

**Import**

```ts
import { UiStepper } from 'ai-dls-kit';
```

## Description

`ui-stepper` — DLS 3.1 `Stepper` (Figma page 36356:268586,
REGISTER.md §38, owner round §35–§39 decision (38): built
for the archive in BOTH layouts — vertical + horizontal, sub-steps,
statuses, non-linear, the §32 bar — with a focus-overlay slot demo, no
page wiring yet).

  <ui-stepper
    [steps]="steps"
    current="review"
    orientation="vertical"
  />

  <ui-stepper [steps]="steps" current="review" orientation="horizontal" />

  <!-- interactive: a real click on a step-item moves `current` -->
  <ui-stepper [steps]="steps" [(current)]="current" [interactive]="true"
              (stepSelected)="onStepSelected($event)" />

**Vertical** (207411:1264): each parent step is a row — a 20px
`ui-stepper-marker` column carrying a 2px connector line (green
`--color-icon-selected` through a completed step, `--color-icon-
decorative` otherwise; the first row has no line above, the last none
below) — beside a step-item (`padding: var(--padding-field-v-md)
var(--padding-field-h-sm)` — 12 vertical / 8 horizontal, radius 4,
`type.label(md)` 14/500 `--color-text-strong`, `--color-text-disabled`
when inactive). `nonLinear` drops every connector and is the only mode
that may carry the `'null'` ("not started") marker status. Sub-steps
render indented under their parent with their own 20px marker column
(continuing the parent's connector) but lead the step-item itself with
a bare 16px glyph instead of the ring marker — `check_16` completed,
`arrow-right_16` active, nothing inactive/error — at `type.label(sm)`
13px.

**Horizontal** (207877:3254): a flex row of `step-group`s (`flex: 1`,
4px padding, radius 4; the group holding `current` — parent OR one of
its sub-steps — sits on `--color-bg-pressed`), each a parent step-item
(`type.label(md)` 14) and, when one of ITS sub-steps is `current`, a
second line for that sub-step (`type.label(sm)` 13) underneath. Both
lines share one glyph rule: **active + current** gets `arrow-right_16`
BEFORE the label, completed gets `check_16` AFTER, error gets
`circle-exclamation_16` AFTER, inactive is bare text-disabled — no
glyph. Under the row, an 8px gap, then a `ui-progress-bar` whose
`value` is `progress()` when set, else completed-parent-steps ÷
total-parent-steps × 100 (the §32 bar, reused rather than redrawn).

`interactive` gates click/hover/pressed/focus on step-items (default:
static rows, no `stepSelected` output, no interactive states) —
`stepSelected` only fires from a REAL click on a step-item, never
programmatically from `current` changing underneath the component.
`current` is an `input` the caller owns (not a two-way `model`) so the
consumer decides whether a click actually advances the flow — the sink
demo below binds it back with a plain signal `.set()` in its own
`(stepSelected)` handler, `[(current)]` banana-in-a-box works too via
that same signal since the setter shape matches `model()`'s only if the
caller wires it; kept as a one-way input + output pair.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `steps` (required) | `UiStepperStep[]` | — |
| `current` | `string` | — |
| `orientation` | `'vertical' | 'horizontal'` | `'vertical'` |
| `type` | `'default' | 'group'` | `'default'` |
| `nonLinear` | `(inferred)` | `false` |
| `interactive` | `(inferred)` | `false` |
| `progress` | `number` | — |

**Outputs**

| Name | Type |
| --- | --- |
| `stepSelected` | `string` |

## Types

Shared data model for `ui-stepper` / `ui-stepper-marker`
(REGISTER.md §38). `'null'` (DLS's "not started" marker)
is only meaningful when the owning `ui-stepper` has `nonLinear` set —
see stepper-marker.ts.

```ts
export type UiStepperStatus = 'completed' | 'active' | 'inactive' | 'error' | 'null';
```

```ts
export interface UiStepperSubStep {
  key: string;
  label: string;
  status: UiStepperStatus;
}
```

```ts
export interface UiStepperStep {
  key: string;
  label: string;
  status: UiStepperStatus;
  subSteps?: UiStepperSubStep[];
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<p class="hint">2 completed, 1 active with 3 sub-steps (completed / active / inactive), 2 inactive.</p>
      <div class="row">
        <div class="w320">
          <ui-stepper [steps]="stepperVerticalLinearSteps" current="v-verify-call" orientation="vertical" />
        </div>
      </div>

      <h3>Vertical — non-linear</h3>
      <p class="hint">Connectors dropped; the "not started" <code>null</code> marker appears (Verification).</p>
      <div class="row">
        <div class="w320">
          <ui-stepper [steps]="stepperVerticalNonLinearSteps" current="nl-review" orientation="vertical" [nonLinear]="true" />
        </div>
      </div>

      <h3>Horizontal — default</h3>
      <div class="row">
        <div class="w-full">
          <ui-stepper [steps]="stepperHorizontalSteps" current="h-verify-call" orientation="horizontal" />
        </div>
      </div>

      <h3>Horizontal — Group (current group pressed)</h3>
      <div class="row">
        <div class="w-full">
          <ui-stepper [steps]="stepperHorizontalGroupSteps" current="g-triage" orientation="horizontal" type="group" />
        </div>
      </div>

      <h3>Interactive — a real click on a step moves <code>current</code></h3>
      <div class="row">
        <div class="w-full">
          <ui-stepper
            [steps]="stepperInteractiveSteps"
            [current]="sinkStepperInteractiveCurrent()"
            orientation="horizontal"
            [interactive]="true"
            (stepSelected)="onSinkStepperSelected($event)"
          />
        </div>
```


## Provenance

REGISTER.md §38 (optional background — no Figma access required to use this component)
