# UiCellEdit

**Selector:** `td[ui-cell-edit]`

**Import**

```ts
import { UiCellEdit } from 'ai-dls-kit';
```

## Description

`td[ui-cell-edit]` — the DLS `data-cell` "Edit mode" variant
(REGISTER.md §40, "data-cell … Edit mode: the content
becomes a full-width 32px Input/Text carrying the value in text-strong
(selects / date pickers for typed cells, per the Editing guideline)").
Applied as an attribute on a native `<td>` so table semantics
(colspan, scope, keyboard navigation) stay intact, same house pattern as
`ui-button` / `ui-link`:

  <td ui-cell-edit [editing]="row.editingAddress()" clickToEdit
      (editStart)="row.editingAddress.set(true)"
      (commit)="commitAddress(row)" (cancel)="row.editingAddress.set(false)">
    <span>{{ row.address() }}</span>
    <ui-text-input uiCellEditor [(value)]="row.addressDraft" />
  </td>

Two projected faces, toggled by `editing()`: the DEFAULT slot (display
content, shown at rest) and the `[uiCellEditor]` slot (a `ui-text-input` /
`ui-select` / `ui-date-input`, shown only while editing). Only one is
ever in the DOM's visible flow at a time — both stay projected so the
consumer's control keeps its state (draft value, focus) across the
toggle rather than being torn down and rebuilt.

**Size** — `xs` (default, 24px field height, the compact density every
other DLS-replica control in this kit defaults to) | `sm` (32px). Since
the projected editor is a full component with its OWN encapsulated
styles, this host cannot reach its internals through a plain descendant
selector — `:host ::ng-deep` is the documented, narrowly-scoped escape
hatch every other cross-encapsulation override in this kit uses (see
`styles/ui-tables.css`'s own column-header-filter-height
rule, which does the same job one layer up, as plain global CSS instead
of `::ng-deep` because it lives outside any component's template at
all). cell-edit.scss targets the same three class names that sheet
documents: `.ui-text-input` (text-input's own root), `.ui-select-trigger`
(select's trigger), `.ui-date-input` (date-input's shared shell).

**Error** — `error` input (a message string; empty = no error). When
set, a host class flips the projected editor's border to
`--color-danger` (mirrors `ui-text-input`'s own `.invalid` look) and a
`label(xs)` message renders in `--color-text-danger` directly under the
control — the guideline's "inline validation … error message under the
cell, red outline".

**click-to-edit** — `clickToEdit` (booleanAttribute, default false): a
click anywhere in the cell while `!editing()` emits `editStart`. Only wired when the input is set, so a
row/table-level edit toggle (driven by an external Edit button, not a
cell click) can use this component without a stray click handler.

**Commit / cancel** — Enter or blur (`focusout`) inside the editor slot
emits `commit`; Escape emits `cancel`. `focusout` is guarded against
focus moving to ANOTHER element still inside this cell (e.g. a
text-input's own clear button) via `relatedTarget` containment, so
tabbing within the cell's own controls does not fire a spurious commit.
Enter is caught on `keydown.enter` rather than relying on native form
submission — a `<td>` is not a form, and the projected editor may be a
button-based trigger (`ui-select`, `ui-date-input`) with no submit
behaviour at all.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `editing` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `size` | `'xs' | 'sm'` | `'xs'` |
| `error` | `(inferred)` | `''` |
| `clickToEdit` | `(inferred)` | `false, { transform: booleanAttribute }` |

**Outputs**

| Name | Type |
| --- | --- |
| `editStart` | `void` |
| `commit` | `void` |
| `cancel` | `void` |

## Slots

- Default (unnamed) content projection
- `select="[uiCellEditor]"`


## Example

From the kit's kitchen sink:

```html
<ui-avatar [name]="row.name" size="xs" />
              <span>{{ row.name }}</span>
            </td>
            <td ui-cell-edit [editing]="row.editing">
              <span>{{ row.address }}</span>
              <ui-text-input uiCellEditor [(value)]="row.addressDraft" />
            </td>
            <td ui-cell-edit [editing]="row.editing" class="ui-cell-currency">
              <span>{{ row.amount }}</span>
              <ui-text-input uiCellEditor [(value)]="row.amountDraft" />
            </td>
            <td class="ui-cell-actions ui-td-sticky">
              @if (!row.editing) {
                <button ui-icon-button size="tiny" type="button" aria-label="Edit" (click)="startRowEdit(row)">
                  <ui-icon name="…" [size]="24" />
                </button>
              } @else {
                <button ui-button size="tiny" variant="primary" type="button" (click)="saveRowEdit(row)">Save</button>
                <button ui-button size="tiny" variant="secondary" type="button" (click)="cancelRowEdit(row)">Cancel</button>
              }
            </td>
          </tr>
        }
        <tr ui-table-add-row label="Add item" [colspan]="4" (add)="addEditRow()"></tr>
      </tbody>
    </table>
  </div>

  <h3>Column customisation</h3>
  <p class="hint">The gear in the header's sub-actions opens the Table Columns popover — check/uncheck, or drag to reorder.</p>
  <div class="comp-table-wrap">
    <ui-table-header id="sink-comp-columns-header" title="Team">
      <button uiTableActions ui-button variant="secondary" size="small" type="button">Export</button>
      <ui-table-columns uiTableSubActions [(columns)]="columnsDemoColumns" />
    </ui-table-header>
    <table ui-table card id="sink-comp-columns">
      <thead>
        <tr>
          @for (col of columnsDemoColumns(); track col.key; let i = $index) {
            @if (col.visible) {
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §40 (optional background — no Figma access required to use this component)
