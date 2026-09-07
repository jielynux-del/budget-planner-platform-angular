# UiTextarea

**Selector:** `ui-textarea`

**Import**

```ts
import { UiTextarea } from 'ai-dls-kit';
```

## Description

DLS `input-field` / Text area type chrome (REGISTER.md §21,
Figma 76086:347247) — same shell rules as ui-text-input (border/hover/
focus/disabled/invalid), 12/12 padding, kit `body(sm)`.

  <ui-textarea [(value)]="description" [minHeight]="140" placeholder="Summary" />

Not the rich-text composer (no toolbar); use ui-rich-text for that.
Usually wrapped in `ui-form-field` for the label/help/counter chrome.

`bordered` (default true) drops the shell for fields embedded inside an
already-bordered composite (e.g. the AI drawer global/composer input row).

`resizable` (default true) shows a 24px handler row bottom-right with an
8px diagonal resize knob (two hairline strokes, hand-authored — DLS's
"remove handler to disable manual resize") and sets `resize: vertical`;
the browser's own resizer handle is hidden (`::-webkit-resizer`) so the
DLS knob is the only visible affordance. `maxLength`/the character
counter belong to the wrapping `ui-form-field`, not this control.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `placeholder` | `(inferred)` | `''` |
| `minHeight` | `(inferred)` | `80` |
| `disabled` | `(inferred)` | `false` |
| `bordered` | `(inferred)` | `true` |
| `invalid` | `(inferred)` | `false` |
| `resizable` | `(inferred)` | `true, { transform: booleanAttribute }` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `(inferred)` | `''` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<h3>ui-textarea wrapped in ui-form-field — counter + resize knob</h3>
      <div class="row ff-textarea-row">
        <ui-form-field label="Remarks" help="Visible to the desk lead" [counter]="{ count: ffNotes().length, max: 400 }">
          <ui-textarea [(value)]="ffNotes" [minHeight]="80" placeholder="Add remarks" />
        </ui-form-field>
      </div>
      <h3>ui-text-input with a projected trailing icon-button ([uiTextInputIcon])</h3>
      <div class="row ff-icon-row">
        <div class="w200">
          <ui-form-field label="Password">
            <ui-text-input [(value)]="ffPassword" type="password" placeholder="Enter password">
              <button ui-icon-button uiTextInputIcon type="button" size="tiny" aria-label="Show password">
                <ui-icon name="…" />
              </button>
            </ui-text-input>
          </ui-form-field>
        </div>
      </div>
      <div class="row">
        <div class="w200">
          <ui-text-input [(value)]="productName" placeholder="Enter product name" />
        </div>
      </div>
      <div class="row">
        <ui-textarea [(value)]="productDescription" [minHeight]="80" placeholder="Summary of this product's goals" />
      </div>
      <p class="hint">
        Name: {{ productName() || '—' }} · Business case (see ui-radio section): {{ businessCase() }} · AI pre-fill (see ui-switch section): {{ aiToggle() }}
      </p>
      <h3>ui-text-input [grouped] — opt-in thousands-grouping mode</h3>
      <div class="row">
        <div class="w200">
          <ui-text-input [(value)]="groupedAmount" [grouped]="true" placeholder="0.00" />
        </div>
      </div>
      <p class="hint">Raw model value (no commas): {{ groupedAmount() || '—' }}</p>
      <h3>ui-text-input [type="password"] — masked entry</h3>
      <div class="row">
        <div class="w200">
          <ui-text-input [(value)]="secret" type="password" placeholder="please enter password" />
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §21 (optional background — no Figma access required to use this component)
