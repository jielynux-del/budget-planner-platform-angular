# UiNumberInput

**Selector:** `ui-number-input`

**Import**

```ts
import { UiNumberInput } from 'ai-dls-kit';
```

## Description

DLS "Number with stepper" input-field type (REGISTER.md §21,
Figma 76086:347895 / 347901 / 136462:184297) — built for the archive
round §21–§24 (owner decision, 3 Sep 2026). Same shared field shell as
`ui-phone-input`/`ui-amount-input`/`ui-search-input`: 32px, bg level_1,
1px border, radius 4. A numeric native input (right-aligned, tabular
nums) + a 1px full-height divider + a "Stepper Set" (12px h-pad, 8 gap):
a 32px `ui-icon-button` minus, a 16px-tall divider, a 32px `ui-icon-button`
plus (register §8).

  <ui-number-input [(value)]="qty" [step]="0.01" [min]="0" placeholder="0.00" />

CVA, same pattern as `ui-text-input`: works with plain two-way binding
or reactive forms. `value` is `number | null` — `null` shows the
placeholder, distinct from `0`.

Clicking a stepper button, or ArrowUp/ArrowDown in the field, steps the
value by `step` (default 1) and clamps to `min`/`max` when set;
`disabled` disables both the field and the stepper buttons.

`invalid` + `errorMessage` — the canonical error-state contract (see
`ui-text-input`).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `step` | `(inferred)` | `1` |
| `min` | `number` | — |
| `max` | `number` | — |
| `placeholder` | `(inferred)` | `'0.00'` |
| `disabled` | `(inferred)` | `false` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `number | null` | `null` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<h3>DLS "Number with stepper" (§21, Figma 76086:347895)</h3>
      <div class="row num-row">
        <div class="w200">
          <ui-number-input [(value)]="numberValue" [step]="0.01" placeholder="0.00" />
        </div>
        <div class="w200">
          <ui-number-input [(value)]="disabledNumberValue" [step]="0.01" [disabled]="true" />
        </div>
        <div class="w200">
          <ui-number-input
            [(value)]="invalidNumberValue"
            [step]="0.01"
            placeholder="0.00"
            [invalid]="true"
            errorMessage="Quantity is required"
          />
        </div>
        <div class="w200">
          <ui-number-input [(value)]="clampNumberValue" [step]="0.01" [min]="0" placeholder="0.00" />
        </div>
      </div>
      <p class="hint">
        Default value: {{ numberValue() ?? '—' }} · Disabled value: {{ disabledNumberValue() ?? '—' }} ·
        Clamped (min 0) value: {{ clampNumberValue() ?? '—' }}
      </p>
    </div>
  </section>
```


## Provenance

REGISTER.md §21 (optional background — no Figma access required to use this component)
