# UiTable

**Selector:** `table[ui-table]`

**Import**

```ts
import { UiTable } from 'ai-dls-kit';
```

## Description

DLS Table chassis (REGISTER.md §40, Figma `238634:12422` +
guideline `165411:165187`, audited/built 4 Sep 2026). An ATTRIBUTE
component on a native `<table>` so the seventeen existing callers migrate
by adding one attribute rather than a template rewrite — same shape as
`ui-button`/`ui-icon-button`:

  <table ui-table>                     xs (default), no card chrome
    <thead><tr>
      <th><ui-column-header label="Name" first /></th>
      <th class="ui-cell-expand"><ui-column-header variant="blank" /></th>
    </tr></thead>
    <tbody>
      <tr ui-table-row interactive (activate)="open(row)">
        <td>Tanaka Hiroshi</td>
      </tr>
    </tbody>
  </table>

  <table ui-table size="sm" zebra card>  small, zebra, level_2 card chrome

OWNER'S RULING (4 Sep 2026): Small and Extra-small ONLY — DLS's Medium is
not built. Extra-small is the default density (`size="xs"`), `size="sm"`
is the opt-in.

**`size`** — `xs` (default, DLS Extra small: 4/8 cell padding, 24 content
row → 32 total row height) | `sm` (DLS Small: 8/8 padding, 32 content row
→ 48 total).

**`zebra`** — even body rows paint `--color-bg-alt` (#f7f7f7) instead of
the table's own background. Guideline: "shall not be used together with"
an expanded child row — `tr[ui-table-row][child]` opts itself out of the
zebra rule regardless of row index (table.scss).

**`card`** — wraps the table in the DLS level_2 card chrome: white
`--color-bg-level2`, `--border-radius-panel-lg` (8px), `--shadow-elevation-1`,
a transparent 1px seam, `overflow: clip`. Off by default — plenty of
tables in the app sit inside a `ui-card` or a page section that already
supplies this chrome, and double-wrapping would double the radius/shadow.

This component owns the CHASSIS only — cell height, gutters, the body
text role, zebra fill, the bottom rule — via `:host` and
`:host ::ng-deep`. The TYPED CELLS (`.ui-cell-number`,
`.ui-cell-avatar`, …) are plain classes the consumer puts directly on a
`<td>` — see table.scss for the full list — so no per-cell-type directive
is needed.

This component SUPERSEDES the global `.ui-table` sheet
(`styles/ui-tables.css`) for all NEW anatomy — that sheet
stays only for the ported chassis (`.table`, `.field-table`) migrating in
a later round, and for `ui-column-header`'s own filter-height / cell rules
which this component does not duplicate.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `size` | `UiTableSize` | `'xs'` |
| `zebra` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `card` | `(inferred)` | `false, { transform: booleanAttribute }` |

## Types

```ts
export type UiTableSize = 'xs' | 'sm';
```

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
the row rule as an inset <code>--color-border-decorative</code> shadow on every
        <code>tbody td</code>, so that was a second, differently-coloured line eating 1px of the row.
      </p>
      <table ui-table size="sm" class="sink-add-row-sm-table">
        <thead>
          <tr>
            <th><ui-column-header label="Name" size="sm" [first]="true" /></th>
            <th><ui-column-header label="Desk" size="sm" [last]="true" /></th>
          </tr>
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
