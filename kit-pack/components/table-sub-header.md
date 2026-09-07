# UiTableSubHeader

**Selector:** `tr[ui-table-sub-header]`

**Import**

```ts
import { UiTableSubHeader } from 'ai-dls-kit';
```

## Description

`ui-table-sub-header` — DLS `table-sub-header` (REGISTER.md
§40, Figma 120497:249555): the section-divider row a `table[ui-table]`
body drops between groups of rows ("Grouping" guideline — rows between
two dividers form one section).

  <table ui-table>
    <tbody>
      <tr ui-table-sub-header label="Singapore" [colspan]="7"></tr>
      <tr> … data-cells … </tr>
      <tr ui-table-sub-header label="Hong Kong" [colspan]="7"></tr>
      <tr> … data-cells … </tr>
    </tbody>
  </table>

Attribute component on a native `tr` (same pattern as `ui-button`/
`ui-icon-button`) so it stays valid table markup and free-floats inside
whatever `<tbody>` the seventeen `ui-table` callers already render — it
renders its own single `<td [attr.colspan]>` spanning the row.

24px h / 8px v padding, `type.label(sm)` 500 UPPERCASE in `--color-text-subtle`, 1px `--color-border-decorative`
bottom rule, `--color-bg-level2` background. DLS prints this row at a
fixed 33px (8 + 17 + 8); this kit's compact `label(sm)` line-height
computes its own row height off the 8/8 padding instead of a hardcoded
33 — see table-header.ts's title-size note for the same compactness
ruling applied to the panel title.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` (required) | `string` | — |
| `colspan` | `(inferred)` | `1` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</tr>
      </thead>
      <tbody>
        <tr ui-table-sub-header label="Singapore" [colspan]="4"></tr>
        @for (row of singaporeRows; track row.name) {
          <tr ui-table-row>
            <td class="ui-cell-avatar">
              <ui-avatar [name]="row.name" size="xs" />
              <span>{{ row.name }}</span>
            </td>
            <td>{{ row.contact }}</td>
            <td class="ui-cell-status"><ui-status-tag [status]="row.status" /></td>
            <td class="ui-cell-currency"><ui-currency-pair currency="SGD" [amount]="row.amount" size="xs" /></td>
          </tr>
        }
        <tr ui-table-sub-header label="Hong Kong" [colspan]="4"></tr>
        @for (row of hongKongRows; track row.name) {
          <tr ui-table-row>
            <td class="ui-cell-avatar">
              <ui-avatar [name]="row.name" size="xs" />
              <span>{{ row.name }}</span>
            </td>
            <td>{{ row.contact }}</td>
            <td class="ui-cell-status"><ui-status-tag [status]="row.status" /></td>
            <td class="ui-cell-currency"><ui-currency-pair currency="SGD" [amount]="row.amount" size="xs" /></td>
          </tr>
        }
      </tbody>
    </table>
  </div>

  <h3>Edit-by-row inside the chassis</h3>
  <p class="hint">
    The edit icon puts the Address and Amount cells into editors; <code>Save</code> commits,
    <code>Cancel</code> reverts. <code>Add item</code> appends a row.
  </p>
  <div class="comp-table-wrap">
    <table ui-table card id="sink-comp-edit">
      <thead>
        <tr>
```


## Provenance

REGISTER.md §40 (optional background — no Figma access required to use this component)
