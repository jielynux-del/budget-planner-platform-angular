# UiStepperMarker

**Selector:** `ui-stepper-marker`

**Import**

```ts
import { UiStepperMarker } from 'ai-dls-kit';
```

## Description

The 20px marker box a `ui-stepper` parent-step row leads with (DLS
`stepper-marker`, Figma 207411:1192, REGISTER.md §38) — a
16px ring centred in the box, radio's exact ring-and-disc recipe
(`radio.scss`):

  <ui-stepper-marker status="active" />

- `active` — 2px `--color-icon-decorative` ring (#9ba4ab) with a
  10.67px `--color-icon-selected` disc (#00ab61) centred inside, same
  two-layer shape as a checked radio.
- `inactive` — the same 2px ring, hollow (no disc).
- `completed` — no ring; a filled `circle-checkmark-filled` glyph,
  `--color-icon-selected`.
- `error` — no ring; a filled `circle-exclamation-filled` glyph.
  tokens.css has no dedicated `--color-icon-danger` role (reported to
  the lead) — `--color-danger` (#ff4724) is the nearest existing
  danger step and is used here, the same substitution `ui-progress-
  bar`'s error fill already makes.
- `null` — DLS's deprecated "not started" marker: a lighter hollow
  ring, `--color-icon-disabled` (#c7cfd5) rather than the inactive
  ring's `--color-icon-decorative` — non-linear steppers only.

Exported standalone because the register calls it out as its own DLS
node (207411:1192); `ui-stepper` composes it for every parent-step row
in the vertical layout. The horizontal layout and vertical sub-steps do
NOT use this marker — they lead with a plain 16px glyph instead (see
`stepper.ts`), per the DLS anatomy.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `status` (required) | `UiStepperStatus` | — |

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

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §38 (optional background — no Figma access required to use this component)
