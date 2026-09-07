# UiTextInput

**Selector:** `ui-text-input`

**Import**

```ts
import { UiTextInput } from 'ai-dls-kit';
```

## Description

DLS `input-field` / Text type chrome (REGISTER.md §21, Figma
set 12110:99059; Small nodes: default 347238, hover 90723:305648, focus
347345, error 347231, disabled 347993, read-only 347780, success-with-tick
347409) — same 32px shell as ui-select (Figma 1304:132287): 1px border,
4px radius, DLS's 2px solid access-focus border.

  <ui-text-input [(value)]="productName" placeholder="Enter product name" />

Usually wrapped in `ui-form-field` for the label/help/error chrome (see
that component); this control owns only the field box itself.

`bordered` (default true) drops the shell — border, background, height,
padding — for fields embedded inside an already-bordered composite (e.g.
the AI drawer composer row sitting next to a send button); everything
else about the control is unchanged.

`grouped` (default false) — opt-in numeric-grouping mode: the field
strips non-digit/non-decimal characters as the user types and DISPLAYS
the value grouped with thousands separators (1,000,000), while the
`value` model stays a raw digit string so host validation/submission are
unaffected. Reuses the same grouping helper as ui-amount-input (one
implementation of the behaviour, not two) — use this for a plain amount
field that doesn't need ui-amount-input's bundled currency selector.

`invalid` + `errorMessage` — THE CANONICAL ERROR-STATE CONTRACT for every
kit form control (Figma 979:5085). `invalid` paints the control's border
--color-danger and its fill --color-field-error-bg; `errorMessage`, when
non-empty, renders beneath it in --color-text-danger. The two are
independent on purpose: a field can be marked invalid without a message of
its own, which is how an either/or PAIR of fields shows one message under
the first while both read as invalid. NOTE: when this control sits inside
a `ui-form-field`, pass `errorMessage` to the WRAPPER instead — the inline
`.ui-field-error` span below stays only for callers that use this control
standalone.

Every control that can hold a mandatory value implements these two inputs
with exactly these names and this markup, so feature code never has to ask
which control it is talking to.

`type` (default 'text') switches the native input type. Only 'password' is
offered alongside the default, because that is the one variant that changes
BEHAVIOUR rather than presentation — masked glyphs, and the browser's
password-manager affordances. It is deliberately not a free `string`: the
numeric cases belong to `grouped` / ui-amount-input, and `type="number"`
would fight the grouping filter in onInput().

`clearable` (default true) — while FOCUSED and non-empty, a trailing 16px
`clear-filled` icon-button replaces the field's usual trailing content and
empties the value on a real click; set false to suppress it (e.g. a field
that must never be blanked from the UI).

`success` (default false) — a trailing 24px green check glyph
(`--color-success-strong`), DLS's Success-with-tick state.

`readonly` (default false) — DLS's Read-only face: no box at all, kit
`body(md)` 14px text-strong on a 24px line, `aria-readonly`.

A `[uiTextInputIcon]` slot projects a trailing 24px icon-button (DLS's
`eye_16` password-reveal glyph) — the caller supplies
`<button ui-icon-button size="tiny" uiTextInputIcon>…</button>`.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `placeholder` | `(inferred)` | `''` |
| `disabled` | `(inferred)` | `false` |
| `bordered` | `(inferred)` | `true` |
| `grouped` | `(inferred)` | `false` |
| `type` | `'text' | 'password'` | `'text'` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |
| `clearable` | `(inferred)` | `true, { transform: booleanAttribute }` |
| `success` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `readonly` | `(inferred)` | `false, { transform: booleanAttribute }` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `(inferred)` | `''` |

## Slots

- `select="[uiTextInputIcon]"`


## Example

From the kit's kitchen sink:

```html
help="As it appears on the mandate"
            [counter]="{ count: ffName().length, max: 40 }"
          >
            <ui-text-input [(value)]="ffName" placeholder="Full name" />
          </ui-form-field>
        </div>
      </div>
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
```


## Provenance

REGISTER.md §21 (optional background — no Figma access required to use this component)
