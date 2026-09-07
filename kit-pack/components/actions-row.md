# UiActionsRow

**Selector:** `[ui-actions-row]`

**Import**

```ts
import { UiActionsRow } from 'ai-dls-kit';
```

## Description

The focus-overlay ACTION ROW (owner's directive 6, 5 Sep 2026) — "content
in `ui-card`s 16px apart, action buttons OUTSIDE the cards, below the last
one". A host-class directive on whatever wraps the buttons:

  <ui-modal-shell title="Clarification Request" (closed)="close()">
    <ui-card title="Selected Issues">…</ui-card>
    <ui-card title="Details">…</ui-card>
    <div ui-actions-row>
      <button ui-button variant="secondary" (click)="close()">Cancel</button>
      <button ui-button variant="primary" (click)="submit()">Submit</button>
    </div>
  </ui-modal-shell>

Flex row, buttons flush RIGHT at the 8px unit gap (`--gap-unit-h`), 16px
above. `align="between"` parks the first child on the LEFT — a `ui-switch`
with its label, or a note — and the buttons stay right:

  <div ui-actions-row align="between">
    <label class="…"><ui-switch [(checked)]="notify" /> Notify the desk</label>
    <button ui-button variant="secondary">Cancel</button>
    <button ui-button variant="primary">Submit</button>
  </div>

Styled by `styles/ui-actions-row.css` — a kit-level GLOBAL
class, the same shape as `ui-tables.css`, because a directive has no
stylesheet of its own and the row is a layout contract, not a component.
It is NOT the `[ui-modal-footer]` bar: that one is pinned to the panel's
bottom edge behind a rule and scrolls nothing; this row scrolls WITH the
cards and is the default for the app's overlays.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `align` | `'end' | 'between'` | `'end'` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
it live; these two are the same rows in the flow of the page.
      </p>
      <div class="actions-row-demo" id="actions-row-end">
        <div ui-actions-row>
          <button ui-button variant="secondary" type="button">Cancel</button>
          <button ui-button variant="primary" type="button">Submit</button>
        </div>
      </div>
      <div class="actions-row-demo" id="actions-row-between">
        <div ui-actions-row align="between">
          <label class="actions-row-switch"><ui-switch [(checked)]="actionsRowNotify" ariaLabel="Notify the desk" /> Notify the desk</label>
          <button ui-button variant="secondary" type="button">Cancel</button>
          <button ui-button variant="primary" type="button">Submit</button>
        </div>
      </div>
    </div>
  </section>
```


## Provenance

_Not recorded._
