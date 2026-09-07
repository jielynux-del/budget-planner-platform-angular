# UiFormField

**Selector:** `ui-form-field`

**Import**

```ts
import { UiFormField } from 'ai-dls-kit';
```

## Description

DLS `input-field` composite (REGISTER.md §21, Figma set
`input-field` 12110:99059; Small nodes 76086:347238 default, 347780
read-only, 347231 error) — the label / optional / info / help / counter /
error chrome that wraps ANY kit control, projected as the default slot:

  <ui-form-field label="Product name" [optional]="true" info="Shown on the client statement">
    <ui-text-input [(value)]="productName" placeholder="Enter product name" />
  </ui-form-field>

  <ui-form-field label="Notes" help="Visible to the desk lead" [counter]="{ count: notes().length, max: 400 }">
    <ui-textarea [(value)]="notes" />
  </ui-form-field>

  <ui-form-field label="Trade reference" [invalid]="true" errorMessage="Reference is required">
    <ui-text-input [(value)]="ref" [invalid]="true" />
  </ui-form-field>

`ui-form-field` never owns the control's value or validity — those stay on
the projected control (`ui-text-input`, `ui-textarea`, `ui-select`, …),
mirroring `ui-checkbox-group`'s decoupling for the same reason (Angular
content projection has no channel into a projected child's own inputs).
`invalid`/`errorMessage` here only swap the HELP ROW for the message; a
caller wanting the projected control itself to paint invalid passes its
own `[invalid]` alongside (see the third example).

Inputs, verbatim (the migration contract ~120 hand-rolled label sites —
`.field-label`, `.form-label`, `.form-field`, `.detail-field-label` — move
onto AFTER this lands):
- `label` (string, required in practice) — kit `type.label(sm)` 13/500 in
  `--color-text-body`.
- `optional` (`booleanAttribute`) — appends "(optional)" after the label,
  same de-emphasis idiom as `ui-checkbox-group`'s `.cbg-optional`.
- `info` (string) — a 16px info-circle glyph after the label/optional,
  carrying the text as a `[uiTooltip]` (hover + focus, matching the
  directive's own contract). Omit to skip the glyph entirely.
- `help` (string) — body/sm `--color-text-subtle` under the control.
- `counter` (`UiFormFieldCounter | null`) — "count/max" right-aligned on
  the same help row, 8px gap from the help text.
- `invalid` (boolean) + `errorMessage` (string) — when both are set, the
  help row shows `errorMessage` in `--color-text-danger` INSTEAD of
  `help`/`counter` (same either/or the help row already does).
- `readonly` (boolean) — DLS's read-only label gap (4px, not 8px); the
  PROJECTED CONTROL is expected to render its own read-only face (see
  `ui-text-input`'s `readonly` input) — this component only tightens the
  label gap to match.
- `for` (string, optional) — placed on the `<label for>` when the
  projected control exposes a matching id.
- `value` (`string | null`, default `null`, 5 Sep 2026) — READ-ONLY TEXT
  the field renders ITSELF, no control needed:

    <ui-form-field label="Desk" value="FX Options" />

  The text draws in `ui-text-input`'s exact read-only face (kit
  `body(md)` 14px, `--color-text-strong`, 24px line, no box — see
  `.ti-readonly` in text-input.scss) and the label gap tightens to the
  read-only 4px automatically, as if `readonly` had been passed. This
  is the kit answer to the app's ~40 hand-rolled `.detail-field-label` +
  `.detail-field-value` pairs (Profile, Team Members, System Access
  drawers) — a label over static text — which until now had to wrap a
  `ui-text-input [readonly]` just to get the typography. `label`,
  `help`, `optional`, `info`, `for` all keep working. When `value` is
  set the default slot is NOT rendered — a field is either a control or
  a value, never both; pass `null` (the default) to get the projected
  control back. `''` is a real (empty) value and renders the empty
  read-only line at its 24px height, so a grid of fields keeps its rows
  aligned when one is blank.

- `multiline` (`booleanAttribute`, default `false`, 6 Sep 2026) — with
  `value`, renders the text `white-space: pre-line` so the newlines in
  it survive as line breaks (a paragraph of spec prose, a `\n\n`-joined
  description). Same face — `body(md)`, `--color-text-strong`, the 24px
  line — and the same 24px minimum; the field simply grows a line per
  break. Without `multiline` (or without `value`) nothing changes: the
  single-line face collapses whitespace exactly as before, so a grid of
  one-line fields is unaffected. This is the kit answer to the reference app's
  `.field-block` spec prose (inventory B20c) and the review page's
  Product Description, both of which the single-line face would have
  flattened:

    <ui-form-field label="Purpose or rationale" [value]="purpose()" multiline />

- `layout` (`'vertical' | 'horizontal'`, default `'vertical'`, 5 Sep
  2026) — `horizontal` puts the label in a fixed-width column on the
  LEFT and the control (or `value`) on the right, vertically aligned to
  the control's first line: the label row takes the control's 32px
  height (24px in the read-only / `value` face) and centres the label
  in it, so a one-line control reads as a pair and a textarea keeps
  the label on its first line. `help`/error/counter render under the
  VALUE column, not the label. This is the kit answer to the app's six
  label-left field tables:

    <ui-form-field layout="horizontal" label="Product name">
      <ui-text-input [(value)]="productName" />
    </ui-form-field>
    <ui-form-field layout="horizontal" label="Desk" value="FX Options" />

- `labelWidth` (`number | null`, px, default `null` = 160px) — the label
  column's width. It lands on the host as the `--ff-label-width` custom
  property, which is ALSO how a whole grid of fields aligns: set
  `--ff-label-width: 280px` once on the wrapper and every horizontal
  field under it takes it; pass the input only to override one field.
  (An input that always wrote its default would shadow the wrapper's
  value — hence `null`, not `160`, as the default.)

A `[ui-form-field-caption]` slot projects at the label row's right edge —
DLS's stepper "Bid size: 0.01" caption (body/sm, right-aligned).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` | `(inferred)` | `''` |
| `optional` | `(inferred)` | `false` |
| `info` | `string` | — |
| `help` | `(inferred)` | `''` |
| `counter` | `UiFormFieldCounter | null` | `null` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |
| `readonly` | `(inferred)` | `false` |
| `for` | `(inferred)` | `''` |
| `value` | `string | null` | `null` |
| `multiline` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `layout` | `'vertical' | 'horizontal'` | `'vertical'` |
| `labelWidth` | `number | null` | `null` |

## Types

`[counter]` payload for `ui-form-field` — a raw count against a max,
 rendered "0/400" right-aligned on the help row (DLS's character-count
 affordance, set 12110:99059). `null`/omitted hides the counter.

```ts
export interface UiFormFieldCounter {
  readonly count: number;
  readonly max: number;
}
```

## Slots

- Default (unnamed) content projection
- `select="[ui-form-field-caption]"`


## Example

From the kit's kitchen sink:

```html
<h3>ui-form-field states — optional / invalid / read-only / success / disabled</h3>
      <div class="row ff-states-row">
        <div class="w200">
          <ui-form-field label="Desk" [optional]="true">
            <ui-text-input [(value)]="ffOptional" placeholder="Optional desk" />
          </ui-form-field>
        </div>
        <div class="w200">
          <ui-form-field label="Trade reference" [invalid]="true" errorMessage="Reference is required">
            <ui-text-input [(value)]="ffInvalid" placeholder="Reference no." [invalid]="true" />
          </ui-form-field>
        </div>
        <div class="w200">
          <ui-form-field label="Approved by" [readonly]="true">
            <ui-text-input value="Haruto SATO" [readonly]="true" />
          </ui-form-field>
        </div>
        <div class="w200">
          <ui-form-field label="Email">
            <ui-text-input [(value)]="ffSuccess" [success]="true" />
          </ui-form-field>
        </div>
        <div class="w200">
          <ui-form-field label="Locked field">
            <ui-text-input [(value)]="ffDisabled" [disabled]="true" placeholder="Not editable" />
          </ui-form-field>
        </div>
      </div>
      <h3>ui-form-field <code>value</code> — read-only text, no control</h3>
      <p class="hint">
        Pass <code>value</code> and the field renders the text itself in <code>ui-text-input</code>'s
        read-only face (body/md, text-strong, 24px line) with the read-only 4px label gap — the kit
        answer to the app's hand-rolled label-over-static-text pairs. The default slot is not rendered
        while <code>value</code> is set; <code>help</code>, <code>optional</code>, <code>info</code>
        and <code>for</code> all still work.
      </p>
      <div class="ff-readonly-grid" id="ff-value-grid">
        <ui-form-field label="Desk" value="FX Options" />
        <ui-form-field label="Location" value="Singapore" />
        <ui-form-field label="Reports to" value="Haruto SATO" />
```


## Provenance

REGISTER.md §21 (optional background — no Figma access required to use this component)
