# UiTableColumns

**Selector:** `ui-table-columns`

**Import**

```ts
import { UiTableColumns } from 'ai-dls-kit';
```

## Description

`ui-table-columns` — the DLS Table "column customisation" control (REGISTER.md §40, guideline "column customisation (a 'Table
Columns' popover of checkbox rows with drag handles … at least one
column must stay visible)"). A `button[ui-icon-button]` gear trigger
opens a `ui-popover` (title "Table Columns", 280px) listing `columns`.

  <ui-table-columns [(columns)]="cols" />

where `cols` is a `UiTableColumn[]` — `{ key, label, visible, locked? }`.
Reordering the array reorders the columns; toggling `visible` shows/hides
one; a `locked` column's checkbox is disabled (DLS: some columns —
typically the first, an id/name anchor — cannot be hidden at all).

**Trigger** — a plain `[uiPopoverTrigger]` gear icon-button is built in
rather than also exposing a `[uiTableColumnsTrigger]` projection slot:
the brief allows either, and a second slot only pays for itself once a
caller actually needs a non-gear trigger — none does yet in this sink or
anywhere in the reference app. Report as a design decision, not a gap: add
the slot the day a consumer needs it.

**Reorder** — REAL pointer drag on the handle (`pointerdown` on
`.tc-handle`, document-level `pointermove`/`pointerup` while dragging):
the dragged row swaps with whichever row the pointer's Y crosses past the
midpoint of, committing to the `columns` model on every crossing (so the
list re-renders live, not just on drop). Keyboard equivalent: focus a row
(each `.tc-row` is a `tabindex="0"` div) and press `Alt+ArrowUp` /
`Alt+ArrowDown` to move it one slot, refocusing the row at its new
position so repeated key presses keep walking the same logical row.

**Guard rail** — unchecking a column when it is the ONLY visible one is
refused: the model is left untouched (the checkbox's `[checked]` binding
simply re-renders to its unchanged true value) and an inline
`label(xs)` "At least one column must be selected" message in
`--color-text-danger` appears below the list, persisting until any
column is (re)checked. A `locked` row's checkbox is `disabled` outright
— DLS's "locked" columns don't participate in the min-one-visible
bookkeeping at all, they simply can't be touched.

## API

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `columns` | `UiTableColumn[]` | `[]` |
| `open` | `(inferred)` | `false` |

## Types

```ts
export interface UiTableColumn {
  key: string;
  label: string;
  visible: boolean;
  locked?: boolean;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
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
              <th>
                <ui-column-header
                  [label]="col.label"
                  [first]="i === 0"
                  [last]="i === columnsDemoColumns().length - 1"
                />
              </th>
            }
          }
        </tr>
      </thead>
      <tbody>
        @for (row of columnsDemoRows; track row.name) {
          <tr ui-table-row>
            @for (col of columnsDemoColumns(); track col.key) {
              @if (col.visible) {
                <td>{{ cellValue(row, col.key) }}</td>
              }
            }
          </tr>
        }
      </tbody>
    </table>
  </div>

</div>
```


## Provenance

REGISTER.md §40 (optional background — no Figma access required to use this component)
