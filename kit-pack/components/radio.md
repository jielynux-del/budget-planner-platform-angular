# UiRadio

**Selector:** `ui-radio`

**Import**

```ts
import { UiRadio } from 'ai-dls-kit';
```

## Description

DLS `radio-input` / `radio-button` / `radio-button-group` replica
(REGISTER.md §34, Figma 305:2705, audited 3 Sep 2026) — a
styled 20px control per option, in a row or a vertical list:

  <ui-radio [options]="['Yes', 'No', 'Not Applicable']" [(value)]="businessCase" name="businessCase" />

  <ui-radio
    [options]="[{ value: 'a', label: 'Option A', description: 'Applies desk-wide' }, { value: 'b', label: 'Option B' }]"
    layout="vertical"
    [(value)]="choice"
    name="choice"
  />

── DLS REPLICA — mirrors `ui-checkbox`'s state recipe (§10) exactly ────

Control: a 20px circle, 2px `--color-icon` border, `--color-bg-level1`
background. The native `<input type="radio">` stays visually hidden but
focusable (CVA + real form semantics unchanged) — same visually-hidden
trick `ui-checkbox` uses, not `display:none`, so Tab/Space/arrow-key
native radio-group behaviour keeps working.

- **Hover** — a 4px INNER ring of `--color-bg-success-subtlest`
  (box-shadow, checkbox's exact ring recipe), excluded for disabled /
  readonly.
- **Focus** — a 2px INNER ring of `--color-focus` on `:focus-visible`,
  winning over hover the same way checkbox orders the two rules.
- **Checked** — border `--color-icon-selected` (#00ab61) + a centred
  10.67px solid disc in the same green (DLS's 16px `radio-disc` box
  holding a 10.67px dot — drawn here as a single sized span rather than
  a second nested box, since only the dot itself paints).
- **Disabled** — `--color-bg-disabled` fill, `--color-border-disabled`
  border, disc (if checked) in `--color-icon-disabled`.
- **Error** (`invalid`) — `--color-bg-danger-subtlest` fill,
  `--color-danger` border, same hover halo and focus ring but in the
  danger tint (`hover` ring stays the success tint per DLS's own frames
  — see radio.scss).

Rows: input + 8px gap + a text column (`label` kit `label(sm)` 13px/500
`--color-text-strong` on a 20px-min line — the owner's compactness
ruling carried over from checkbox, not DLS's own `label/md` 16px —
optional `description` `body(sm)` 13px `--color-text-subtle` 4px
under).

`layout`: `'horizontal'` or `'vertical'` (DLS's list: 8px v-padding, 0 gap
between rows).

`readonly` (new) — DLS `radio-button-group`'s Read-only variant: the
whole interactive list is replaced by the selected option's label as
plain text (kit `body(md)` 14px `--color-text-strong` — the same
read-only face `ui-select`/`ui-text-input` use), no box. Not
interactive by definition, so there is nothing left to focus or click.

`invalid` + `errorMessage` — the kit's shared error contract (see
`ui-text-input`'s docstring). `.ui-field-error` renders under the
group; the field label/help row is `ui-form-field`'s job, not this
component's.

NOT `ui-radio-chiclet` — a bordered chip variant with its own file, for
callers that want a chip-style choice rather than a dot-and-label row.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `options` | `(UiRadioOption | string)[]` | `[]` |
| `name` | `string` | — |
| `disabled` | `(inferred)` | `false` |
| `layout` | `UiRadioLayout` | `'horizontal'` |
| `readonly` | `(inferred)` | `false` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `string | null` | `null` |

## Types

```ts
export interface UiRadioOption {
  value: string;
  label: string;
  /** Second line under the label, kit `body(sm)` / `--color-text-subtle`,
   *  4px below — mirrors `ui-checkbox`'s `description`. */
  description?: string;
  disabled?: boolean;
}
```

```ts
export type UiRadioLayout = 'vertical' | 'horizontal';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <h3>States — default / checked / hover (real pointer) / disabled / invalid</h3>
      <div class="row wrap radio-states-row">
        <ui-radio [options]="['Unchecked']" name="radioUnchecked" />
        <ui-radio [options]="['Checked']" name="radioChecked" [value]="'Checked'" />
        <ui-radio [options]="['Hover me']" name="radioHover" />
        <ui-radio [options]="[{ value: 'Disabled', label: 'Disabled' }]" name="radioDisabled" [disabled]="true" />
        <ui-radio [options]="[{ value: 'Disabled — checked', label: 'Disabled — checked' }]" name="radioDisabledChecked" [value]="'Disabled — checked'" [disabled]="true" />
        <ui-radio [options]="['Invalid']" name="radioInvalid" [invalid]="true" />
      </div>

      <h3>Options with descriptions — vertical layout (8px v-padding, 0 gap)</h3>
      <div class="row radio-vertical-row">
        <ui-radio layout="vertical" name="radioVertical" [(value)]="radioVerticalValue" [options]="radioVerticalOptions" />
      </div>
      <p class="hint">Selected: {{ radioVerticalValue() }}</p>

      <h3>Horizontal layout (default) — the business-case demo every reference-app form uses</h3>
      <div class="row radio-horizontal-row">
        <ui-radio [options]="['Yes', 'No', 'Not Applicable']" name="sinkBusinessCase" [(value)]="businessCase" />
      </div>
      <p class="hint">Business case: {{ businessCase() }}</p>

      <h3>Invalid, with an error message</h3>
      <div class="row radio-error-row">
        <ui-radio
          [options]="['Yes', 'No', 'Not Applicable']"
          name="sinkBusinessCaseError"
          [(value)]="errorBusinessCase"
          [invalid]="true"
          errorMessage="Business case must be selected"
        />
      </div>

      <h3>Read-only — selected option renders as plain text, no box</h3>
      <div class="row radio-readonly-row">
        <ui-radio [options]="['Yes', 'No']" name="radioReadonly" [value]="'Yes'" [readonly]="true" />
      </div>

      <h3>ui-radio-chiclet-group — leading icon + trailing tag, arrow-key navigation</h3>
```


## Provenance

REGISTER.md §34 (optional background — no Figma access required to use this component)
