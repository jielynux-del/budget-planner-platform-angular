# UiPhoneInput

**Selector:** `ui-phone-input`

**Import**

```ts
import { UiPhoneInput } from 'ai-dls-kit';
```

## Description

DLS "Phone" input-field type (REGISTER.md §21, Figma
76086:347688; leading segment 414:2914) — built for the archive round
§21–§24 (owner decision, 3 Sep 2026). Same shared field shell as
`ui-number-input`/`ui-amount-input`/`ui-search-input`: 32px, bg level_1,
1px border, radius 4, 12px h-pad. A leading `ui-code-segment` (dial code
+ chevron, opening a listbox of `dialCodes`) + a 1px full-height divider
+ the number field (flex 1, `inputmode="tel"`, tabular-nums).

  <ui-phone-input [(dialCode)]="code" [(number)]="phone" />
  <ui-phone-input [(dialCode)]="code" [(number)]="phone" [dialCodes]="['+65','+60']" />

Twin `model()`s rather than one CVA value — same shape as
`ui-amount-input`'s `currency`/`amount` pair, which this control mirrors
(it reuses the same leading segment, `ui-code-segment`, that the
Currency type now also uses).

`invalid` + `errorMessage` — the canonical error-state contract (see
`ui-text-input`): paints the shell `--color-field-error-bg` /
`--color-danger` border and renders the message in a `.ui-field-error`
span beneath.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `dialCodes` | `string[]` | `['+65', '+60', '+62', '+81', '+852']` |
| `placeholder` | `(inferred)` | `'Phone number'` |
| `disabled` | `(inferred)` | `false` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `dialCode` | `string | null` | `null` |
| `number` | `(inferred)` | `''` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<h3>DLS "Phone" (§21, Figma 76086:347688)</h3>
      <div class="row phone-row">
        <div class="w240">
          <ui-phone-input [(dialCode)]="phoneDialCode" [(number)]="phoneNumber" />
        </div>
        <div class="w240">
          <ui-phone-input [(dialCode)]="disabledPhoneDialCode" [(number)]="disabledPhoneNumber" [disabled]="true" />
        </div>
      </div>
      <p class="hint">{{ phoneDialCode() }} {{ phoneNumber() }}</p>
    </div>
  </section>
```


## Provenance

REGISTER.md §21 (optional background — no Figma access required to use this component)
