# UiTableCard

**Selector:** `ui-table-card`

**Import**

```ts
import { UiTableCard } from 'ai-dls-kit';
```

## Description

`ui-table-card` — the DLS Table ROOT (REGISTER.md §40, Figma
`238634:12422`): a white level_2 card, `--border-radius-panel-lg` (8px),
`--shadow-elevation-2`, `overflow: clip`, that wraps `ui-table-header` +
`table[ui-table]` + a footer (typically `ui-pagination`) as ONE seam —
the DLS composition draws header, grid and footer inside a single card,
not three independently-chromed pieces.

  <ui-table-card>
    <ui-table-header title="Trades">…</ui-table-header>
    <table ui-table>…</table>
    <div class="table-card-footer">
      <ui-pagination [total]="rows.length" [(page)]="page" />
    </div>
  </ui-table-card>

`table[ui-table]`'s own `card` input remains for a LONE table with no
header/footer of its own (table.ts's class doc) — the two are not
redundant: `card` chromes just the `<table>` element, `ui-table-card`
chromes the whole header+grid+footer composition. A consumer using
`ui-table-card` drops `card` from the `table[ui-table]` inside it (the
inner table stays chrome-less so the outer card's radius/shadow isn't
doubled).

A plain block wrapper — no inputs, no host state — `display: block` so
it lays out like any other container; the DLS chrome (background,
radius, shadow, clip) lives entirely in table-card.scss.

## API

_No inputs, models or outputs declared._

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
and a <code>ui-pagination</code> footer.
  </p>
  <div class="comp-table-wrap">
    <ui-table-card>
    <ui-table-header
      id="sink-comp-xs-header"
      title="Trades"
      [selectedCount]="selectedCount()"
      [filtersActive]="filtersActive()"
      (resetFilters)="resetXsFilters()"
    >
      <ui-search-input [(value)]="xsSearch" placeholder="Search trades" />
      <button uiTableActions ui-button variant="secondary" size="small" type="button">Export</button>
      <button uiTableActions ui-button variant="secondary" size="small" type="button">Import</button>
      <button uiTableBatchActions ui-button variant="secondary" size="small" type="button">Delete</button>
      <button uiTableBatchActions ui-button variant="secondary" size="small" type="button">Batch edit</button>
      <button uiTableSubActions ui-icon-button size="small" type="button" aria-label="More options">
        <ui-icon name="…" [size]="24" />
      </button>
      <button uiTableSubActions ui-icon-button size="small" type="button" aria-label="Settings">
        <ui-icon name="…" [size]="24" />
      </button>
      <button uiTableSubActions ui-icon-button size="small" type="button" aria-label="Help">
        <ui-icon name="…" [size]="24" />
      </button>
    </ui-table-header>
    <table ui-table id="sink-comp-xs">
      <thead>
        <tr>
          <th style="width: 52px">
            <ui-column-header variant="checkbox" [first]="true">
              <ui-checkbox
                header-checkbox
                [checked]="allSelected()"
                [indeterminate]="someSelected()"
                (checkedChange)="toggleSelectAll($event)"
                aria-label="Select all"
              />
            </ui-column-header>
          </th>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §40 (optional background — no Figma access required to use this component)
