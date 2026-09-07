# UiColumnHeader

**Selector:** `ui-column-header`

**Import**

```ts
import { UiColumnHeader } from 'ai-dls-kit';
```

## Description

Canonical table column header — DBS DLS "column-header" (Figma 116:669,
grown to the full Table spec at 197362:* — see REGISTER.md
§40 "column-header").

ANATOMY — two sizes, both 4px-stepped off the same content row:

  size="xs" (default, 232px reference cell, 4px vertical inset):
  ┌─ column-header ─────────────── 232 x 64 ─┐
  │ content     y=4  h=24   label + indicator │  <- the 32px variant stops here
  │ ↕ gap 8 (--gap-block-v)                   │
  │ input-field y=36 h=24   the filter slot   │
  └───────────────────────────────────────────┘

  size="sm" (8px vertical inset, 32px filter control):
  ┌─ column-header ─────────────── 232 x 80 ─┐
  │ content     y=8  h=24   label + indicator │  <- the 40px variant stops here
  │ ↕ gap 8 (--gap-block-v)                   │
  │ input-field y=40  h=32   the filter slot  │
  └───────────────────────────────────────────┘

xs: 64px tall with a filter, 32px without. sm: 80px with a filter, 40px
without (the filter row collapses itself either way). Horizontal padding
is 24/8 first, 8/8 interior, 8/24 last — the table gutter rule, NOT an
equal 24 everywhere. `variant="merged"` is the one exception: always 8/8,
no sort, no filter — see below.

USAGE

  <ui-column-header label="Name" />
  <ui-column-header label="Name" [sortable]="true" sortDirection="asc" (sort)="..." />
  <ui-column-header label="Name" [sortable]="true" [filtered]="true">
    <ui-select ... />                          <!-- default slot: the filter control -->
  </ui-column-header>
  <ui-column-header label="Notional" align="end" [sortable]="true" />
  <ui-column-header label="Name"><ui-icon header-info ... name="…" /></ui-column-header>
  <ui-column-header variant="checkbox">
    <ui-checkbox header-checkbox aria-label="Select all"
                 [checked]="..." [indeterminate]="..." (checkedChange)="..." />
  </ui-column-header>
  <ui-column-header variant="blank" />
  <ui-column-header variant="merged" label="Trade details" />  <!-- colspan via the consumer's <th> -->
  <ui-column-header size="sm" label="Name" [sortable]="true" />

API
  label          string                                       ''        optional — `blank` has none
  sortable       boolean                                       false     renders the sort indicator + key/click affordance
  sortDirection  'none' | 'asc' | 'desc'                      'none'    picks which of the three glyphs paints
  align          'start' | 'end'                               'start'   `end` right-aligns and puts the glyph BEFORE the label
  filtered       boolean                                       false     a filter is applied — glyph goes active blue
  variant        'default' | 'checkbox' | 'blank' | 'merged'  'default' structural variant
  size           'xs' | 'sm'                                   'xs'      DLS Extra small (default) | Small
  first          boolean                                       false     24px left gutter
  last           boolean                                       false     24px right gutter
  borderLeft     boolean                                       false     DLS left-border, hidden by default
  borderRight    boolean                                       false     DLS right-border, hidden by default
  tone           'plain' | 'band'                               'plain'   `band` = grey header band (card-wrapped tables)
  (sort)         void                                                     emitted on click / Enter when sortable

SLOTS
  (default)          the filter control — ui-select / ui-date-input. Collapses when empty.
                      Not rendered for variant="merged". Renders at 24 tall for size="xs",
                      32 tall for size="sm" (projected-content override lives in
                      styles/ui-tables.css, keyed off --ui-ch-filter-h).
  [header-info]      optional 16px info icon after the label. Consumer supplies the icon.
  [header-checkbox]  the select-all checkbox for variant="checkbox". THE SLOT TAKES THE KIT
                     CONTROL — `<ui-checkbox header-checkbox …>`, never a raw
                     `<input type="checkbox">`. This component is a frame that projects
                     whatever it is handed, so a caller passing a native input silently
                     ships an un-reskinnable browser checkbox into a DLS table header;
                     that is exactly how four sink demos drifted (owner finding,
                     7 Sep 2026 — see the reference app's internal notes). The consumer
                     still owns the STATE: `[checked]` / `[indeterminate]` in,
                     `(checkedChange)` out — this component owns only the frame.
                     `ui-checkbox` has no `ariaLabel` input, so a label-less select-all
                     carries a plain `aria-label` attribute on the host element.

ALIGNMENT is a DATA-TYPE decision in DLS: text columns `start`, numeric
columns `end`. No consumer uses `align` yet — rollout is a later phase.

variant="merged" (DLS 197362:20905) is the grouped-column header: label +
optional [header-info] ONLY — no sort indicator, no filter, regardless of
what `sortable`/`filtered` are set to. Horizontal padding is a flat 8/8
even when `first`/`last` are set — it spans several columns via the
consumer's `colspan`, so the surface-edge gutter doesn't apply. Content
row stays 24px so it lines up with the ordinary headers below it.

The host `<th>` sets width/sticky only, with `padding: 0`; this component IS
the cell.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` | `(inferred)` | `''` |
| `sortable` | `(inferred)` | `false` |
| `sortDirection` | `'none' | 'asc' | 'desc'` | `'none'` |
| `align` | `'start' | 'end'` | `'start'` |
| `filtered` | `(inferred)` | `false` |
| `variant` | `'default' | 'checkbox' | 'blank' | 'merged'` | `'default'` |
| `size` | `'xs' | 'sm'` | `'xs'` |
| `first` | `(inferred)` | `false` |
| `last` | `(inferred)` | `false` |
| `borderLeft` | `(inferred)` | `false` |
| `borderRight` | `(inferred)` | `false` |
| `tone` | `'plain' | 'band'` | `'plain'` |

**Outputs**

| Name | Type |
| --- | --- |
| `sort` | `void` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
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
