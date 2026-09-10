# UiCellExpandable

**Selector:** `ui-cell-expandable`

**Import**

```ts
import { UiCellExpandable } from 'ai-dls-kit';
```

## Description

`ui-cell-expandable` — the DLS Table "new patterns" cell (REGISTER.md §40, "'View all (5)' / 'View less' expanding
content"): a numbered list of `items`, clipped to the first `limit`
(default 3) with a `button[ui-link]` "View all (N)" that swaps to the
full list + "View less".

  <td>
    <ui-cell-expandable [items]="row.tags()" [limit]="3" />
  </td>

`expanded` is a `model()` so a consumer that needs to know / drive the
open state from outside (e.g. "collapse all") can bind it; the demo
leaves it uncontrolled and lets the component own it.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `items` | `string[]` | `[]` |
| `limit` | `(inferred)` | `3` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `expanded` | `(inferred)` | `false` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<tbody>
      <tr ui-table-row>
        <td>Kobayashi Sota</td>
        <td><ui-cell-expandable [items]="expandableItems" [limit]="3" /></td>
      </tr>
    </tbody>
  </table>

  <h3 id="sink-add-row">Add / delete item</h3>
  <p class="hint"><code>Add item</code> appends a row; the trash icon in Actions removes one.</p>
  <table ui-table class="ste-table">
    <thead>
      <tr>
        <th><ui-column-header label="Name" [first]="true" /></th>
        <th><ui-column-header label="Role" /></th>
        <th><ui-column-header label="Actions" [last]="true" /></th>
      </tr>
    </thead>
    <tbody>
      @for (row of addRows(); track row.id) {
        <tr ui-table-row>
          <td>{{ row.name }}</td>
          <td>{{ row.role }}</td>
          <td class="ui-cell-actions">
            <button ui-icon-button size="tiny" aria-label="Delete row" class="ste-delete-row-btn" (click)="deleteRow(row.id)">
              <ui-icon name="…" />
            </button>
          </td>
        </tr>
      }
      <tr ui-table-add-row label="Add item" [colspan]="3" (add)="addRow()"></tr>
    </tbody>
  </table>

  <h3 id="sink-select-scroll-cell">Select inside a scrolling table cell</h3>
  <p class="hint">
    Kit-fixes defect A (7 Sep 2026): <code>ui-dropdown-menu</code> (the panel
    behind <code>ui-select</code>, <code>ui-multi-select</code>,
    <code>ui-kebab-menu</code> and <code>ui-breadcrumb</code>'s overflow menu)
    used to draw its panel with <code>position: absolute</code>, which measured
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §40 (optional background — no Figma access required to use this component)
