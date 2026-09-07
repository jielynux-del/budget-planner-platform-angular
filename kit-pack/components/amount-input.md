# UiAmountInput

**Selector:** `ui-amount-input`

**Import**

```ts
import { UiAmountInput } from 'ai-dls-kit';
```

## Description

DLS "Currency" input-field type (REGISTER.md §21/§24, Figma
76086:347728; leading segment 414:2914) — aligned onto the DLS chrome in
the archive round §21–§24 (owner decision, 3 Sep 2026). Same shared field
shell as `ui-phone-input`/`ui-number-input`/`ui-search-input`: 32px, bg
level_1, 1px border, radius 4. A leading `ui-code-segment` (currency code
+ chevron, opening a listbox of `currencies` — the same segment
`ui-phone-input`'s dial code uses) + a 1px full-height divider + the
amount field (flex 1, left-aligned per the DLS "0.00" placeholder,
tabular-nums).

  <ui-amount-input [(currency)]="ccy" [(amount)]="amt" />

Numeric handling unchanged from the Phase-1 control: `inputmode="decimal"`,
stripping any character that isn't a digit or a decimal point on input.
The field DISPLAYS the value grouped with thousands separators
(1,000,000) as the user types, while the `amount` model stays a raw
digit string so host validation/submission are unaffected. Caret snaps
to the end on reformat — acceptable for this control.

`invalid` + `errorMessage` — the canonical error-state contract (see
`ui-text-input`): paints the shell `--color-field-error-bg` /
`--color-danger` border and renders the message in a `.ui-field-error`
span beneath. NEW this round — the Phase-1 control had neither.

No hidden mirrored native `<select>`: no e2e spec drives this control's
currency via `selectOption` (grepped an e2e spec for `ui-amount-input` —
the only hit is a comment noting an OLD regression test was retired), so
the DLS listbox segment replaces the native `<select>` outright rather
than keeping a parallel hidden one.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `currencies` | `string[]` | `['SGD', 'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'HKD']` |
| `placeholder` | `(inferred)` | `'0.00'` |
| `disabled` | `(inferred)` | `false` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `currency` | `string | null` | `null` |
| `amount` | `(inferred)` | `''` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <div class="row amt-basic-row">
        <div class="w200">
          <ui-amount-input [(currency)]="filledCurrency" [(amount)]="filledAmount" />
        </div>
        <div class="w200">
          <ui-amount-input [(currency)]="emptyCurrency" [(amount)]="emptyAmount" />
        </div>
      </div>
      <p class="hint">
        Filled: {{ filledCurrency() }} {{ filledAmount() }} · Empty: {{ emptyCurrency() ?? '—' }} {{ emptyAmount() || '—' }}
      </p>
      <h3>Invalid / disabled</h3>
      <div class="row amt-invalid-row">
        <div class="w200">
          <ui-amount-input
            [(currency)]="invalidCurrency"
            [(amount)]="invalidAmount"
            [invalid]="true"
            errorMessage="Amount is required"
          />
        </div>
        <div class="w200">
          <ui-amount-input [(currency)]="emptyCurrency" [(amount)]="emptyAmount" [disabled]="true" />
        </div>
      </div>
    </div>
  </section>
```


## Provenance

REGISTER.md §21 (optional background — no Figma access required to use this component)
