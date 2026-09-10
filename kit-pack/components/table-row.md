# UiTableRow

**Selector:** `tr[ui-table-row]`

**Import**

```ts
import { UiTableRow } from 'ai-dls-kit';
```

## Description

DLS Table row states (REGISTER.md §40, guideline
"interactions" 157043:33643) — an ATTRIBUTE component on a native `<tr>`,
sibling to `table[ui-table]`:

  <tr ui-table-row interactive (activate)="openRow(r)">…</tr>
  <tr ui-table-row [selected]="isChecked(r)">…</tr>
  <tr ui-table-row [expanded]="isOpen(r)" (activate)="toggle(r)">…</tr>
  <tr ui-table-row child>…</tr>   <!-- an expanded parent's child row -->

**`interactive`** — the row is clickable: hover paints `--color-bg-hover`
(#eef2f5), cursor pointer, `tabindex="0"`, pressed (`:active`) paints
`--color-bg-pressed` (#dde3e7, outline stays on top per the guideline),
and keyboard focus draws a 2px `--color-focus` ring INSET (`outline`
with a negative `outline-offset`, verified by screenshot in the sink —
Chromium paints this correctly on `<tr>` without a box-shadow fallback).
Emits `(activate)` on a real click, Enter or Space.

**`selected`** — `--color-bg-selected` background (#e2f8ef), on hover
too. Owner's ruling, 8 Sep 2026: "All selected color especially for table
rows must be the --color-bg-selected." DLS's own hex here is `#fff2f2`
(`background-product-subtle`); until QC wave 4F this kit mapped that onto
its white-label brand seam (`--color-primary-subtle`, #e5f1fa), which is
the wrong token for a selection — the seam is for brand FILLS, and
`bg-selected` is the one selected wash the kit uses everywhere else
(ui-select's chosen option, ui-dropdown's selected item, the nav panel's
active sub-item, the checked radio-chiclet, the date-picker's range).
Not mutually exclusive with `interactive`.

**`expanded`** — this row is a PARENT whose children are currently shown;
sets `aria-expanded="true"` (vs `"false"` when the input is bound but
false) so `.ui-cell-expand-btn`'s 90°-rotated arrow and the row's
semantics stay in sync from one input.

**`child`** — this row IS one of an expanded parent's children:
`--color-bg-app` (#f5f7f9, DLS `background-level_0`) background,
unconditionally — the guideline rules a child row "shall not be used
together with zebra", so table.scss's zebra selector explicitly excludes
`.ui-table-row--child` rather than relying on paint order.

**Sticky cells.** Row states are painted on every `td` of the row
(`tr.<state> td` in table.scss), not on the `<tr>` — a cell's own opaque
background would otherwise hide a row-level tint — so `.ui-td-sticky`
(the trailing sticky actions column) takes the state like any other cell.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `interactive` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `selected` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `expanded` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `child` | `(inferred)` | `false, { transform: booleanAttribute }` |

**Outputs**

| Name | Type |
| --- | --- |
| `activate` | `void` |

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
</thead>
        <tbody>
          @for (row of addRowSmRows(); track row.id) {
            <tr ui-table-row>
              <td>{{ row.name }}</td>
              <td>{{ row.desk }}</td>
            </tr>
          }
          <tr ui-table-add-row label="Add item" [colspan]="2" (add)="addRowSm()"></tr>
        </tbody>
      </table>
    </div>
  </section>
```


## Provenance

REGISTER.md §40 (optional background — no Figma access required to use this component)
