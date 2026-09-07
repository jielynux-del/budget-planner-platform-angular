# UiCellChanged

**Selector:** `ui-cell-changed`

**Import**

```ts
import { UiCellChanged } from 'ai-dls-kit';
```

## Description

`ui-cell-changed` — the DLS Table "new patterns" cell for a value that
changed after editing (REGISTER.md §40, "new patterns …
an edited cell showing 'Previously: …' in the warning colour"). Two
stacked lines, no gap: the current `value` (body/sm, strong-weight, the
cell's ordinary text colour) directly over a `Previously: {previous}`
line in the DLS warning text colour.

  <td>
    <ui-cell-changed value="+65 9123 4567" previous="+65 9123 0000" />
  </td>

A plain child component (not an attribute directive like `ui-cell-edit`)
because it is pure display — no host interaction, no projected editor —
so it drops into a cell's existing content the same way `ui-badge` or
`ui-chip` would rather than taking over the `<td>` itself.

**Colour** — no `--color-text-warning` token exists in tokens.css (only
`--color-warning` / `--color-warning-strong`, both fill/icon roles, and
`--color-warning-strong` is documented for a left-bar accent, not body
text — tokens.css line ~497). `--color-warning-strong` (#eb9600) is used
here as the closest on-spec amber with enough contrast to read as body
text; report to the lead as a gap (a `--color-text-warning` role token
would be the correct long-term home for this).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `value` (required) | `string` | — |
| `previous` (required) | `string` | — |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<tbody>
      <tr ui-table-row>
        <td>Nakamura Ren</td>
        <td><ui-cell-changed value="+65 9123 4567" previous="+65 9123 0000" /></td>
      </tr>
    </tbody>
  </table>

  <h3 id="sink-cell-expandable">Expanding content</h3>
  <p class="hint">The first three items show by default; <code>View all (5)</code> expands the rest.</p>
  <table ui-table class="ste-table">
    <thead>
      <tr>
        <th><ui-column-header label="Name" [first]="true" /></th>
        <th><ui-column-header label="Documents" [last]="true" /></th>
      </tr>
    </thead>
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
```


## Provenance

REGISTER.md §40 (optional background — no Figma access required to use this component)
