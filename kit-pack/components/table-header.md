# UiTableHeader

**Selector:** `ui-table-header`

**Import**

```ts
import { UiTableHeader } from 'ai-dls-kit';
```

## Description

`ui-table-header` — DLS `table-header` (REGISTER.md §40,
Figma 47754:259751): the panel band that sits above the column-header
row of a `table[ui-table]`. bg level_2, 1px `--color-border-decorative`
bottom rule, 24px h / 16px v padding (`--padding-panel-h-lg` /
`--padding-panel-v-md`), 16px vertical gap between its two rows.

  <ui-table-header title="Trades" subtitle="12 pending review">
    <ui-search-input [(value)]="query" />
    <button uiTableActions ui-button variant="secondary" size="small">Export</button>
    <button uiTableSubActions ui-icon-button size="small" aria-label="More"><ui-icon name="…" /></button>
  </ui-table-header>

TITLE-SIZE RULING (owner, this round): DLS prints the title at
heading/xs 20 — this kit keeps every panel title at the SAME compact
step `ui-section-header` already stands on (`type.heading(sm)`, the
kit's harvested 20px role — see section-header.ts's own note on why the
kit's "sm" name carries DLS's "xs" size). Subtitle is `type.body(sm)`.

── Two rows ─────────────────────────────────────────────────────────
Row 1 `caption`: an optional 32px back icon-button (chevron-left, -8px
optical margin so the glyph — not the hit box — sits flush with the
padding) + title/subtitle. OMITTED ENTIRELY (no row, not just hidden)
when there is no title and no back button — DLS: "the table title is
optional".

Row 2 `control` (gap 16): the default slot (left, flex-1) is whatever
the consumer projects — a `ui-search-input`, a `ui-filter-tabs`, or a
filter group; the right `action` side is `[uiTableActions]` (main, gap
8) + gap 12 + `[uiTableSubActions]` (icon-buttons, gap 8).

── Layout auto-detection ───────────────────────────────────────────
DLS's Default/With-filter-group variants put the title and the actions
on ONE 64px row (no default-slot content); With-search/With-tabs stack
to two rows. This component tells the two apart with CSS alone — no
ContentChild polling, no `.observed` check on an output (this kit has no
precedent for the latter, and `output()` does not expose one reliably) —
a `.control-left:empty` selector on the wrapper that holds the bare
`<ng-content>` toggles a `:has()` rule on the host. `layout` overrides
the guess when a consumer's projected content is empty at first render
but arrives later (e.g. an `@if` inside the projected template).

KNOWN KIT TRAP avoided: only ONE `<ng-content>` per selector exists in
the template tree, ever — the batch-actions slot and the main-actions
slot are two DIFFERENT selectors (`[uiTableBatchActions]` /
`[uiTableActions]`), each written exactly once, swapped by `@if`/`@else`,
never the same selector duplicated across branches (which would project
only into the first match and silently drop the rest).

── Multiselect ──────────────────────────────────────────────────────
`selectedCount` > 0 replaces the main-actions slot with a "{n} selected"
label (`type.label(sm)`, `--color-text-body`) followed by the
`[uiTableBatchActions]` slot; sub-actions are unaffected. The component
emits nothing on its own — selection stays the consumer's model.

── Reset filters ────────────────────────────────────────────────────
`filtersActive` renders a secondary small "Reset filters" button at the
START of the action group (before main actions) and emits
`resetFilters` on a real click. Hidden whenever `selectedCount` > 0 —
DLS never shows both a batch-action bar and a filter-reset button at
once; multiselect wins.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` | `string` | — |
| `subtitle` | `string` | — |
| `showBack` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `selectedCount` | `(inferred)` | `0` |
| `filtersActive` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `layout` | `UiTableHeaderLayout` | `'auto'` |

**Outputs**

| Name | Type |
| --- | --- |
| `back` | `void` |
| `resetFilters` | `void` |

## Types

```ts
export type UiTableHeaderLayout = 'auto' | 'stacked' | 'inline';
```

## Slots

- Default (unnamed) content projection
- `select="[uiTableBatchActions]"`
- `select="[uiTableActions]"`
- `select="[uiTableSubActions]"`


## Example

From the kit's kitchen sink:

```html
<p class="hint">The same reference at DLS Small density (32px content row → 48px total).</p>
  <div class="comp-table-wrap">
    <ui-table-card>
    <ui-table-header id="sink-comp-sm-header" title="Trades">
      <button uiTableActions ui-button variant="secondary" size="small" type="button">Export</button>
    </ui-table-header>
    <table ui-table size="sm" id="sink-comp-sm">
      <thead>
        <tr>
          <th style="width: 52px">
            <ui-column-header variant="checkbox" size="sm" [first]="true">
              <ui-checkbox header-checkbox aria-label="Select all" />
            </ui-column-header>
          </th>
          <th style="width: 150px"><ui-column-header label="Name" size="sm" [sortable]="true" /></th>
          <th style="width: 140px"><ui-column-header label="Contact number" size="sm" [sortable]="true" /></th>
          <th style="width: 109px"><ui-column-header label="Address" size="sm" [sortable]="true" /></th>
          <th style="width: 85px"><ui-column-header label="Status" size="sm" [sortable]="true" /></th>
          <th style="width: 130px"><ui-column-header label="Amount" size="sm" align="end" [sortable]="true" /></th>
          <th style="width: 150px" class="ui-td-sticky"><ui-column-header variant="blank" size="sm" [last]="true" /></th>
        </tr>
      </thead>
      <tbody>
        @for (row of smRows(); track row.name) {
          <tr ui-table-row interactive>
            <td class="ui-cell-select"><ui-checkbox [attr.aria-label]="'Select ' + row.name" /></td>
            <td class="ui-cell-avatar">
              <ui-avatar [name]="row.name" size="xs" />
              <span>{{ row.name }}</span>
            </td>
            <td>{{ row.contact }}</td>
            <td>{{ row.address }}</td>
            <td class="ui-cell-status"><ui-status-tag [status]="row.status" /></td>
            <td class="ui-cell-currency"><ui-currency-pair currency="SGD" [amount]="row.amount" size="sm" /></td>
            <td class="ui-cell-actions ui-td-sticky">
              <button ui-button variant="secondary" size="small" type="button">Label</button>
              <button ui-icon-button size="small" type="button" aria-label="Download">
                <ui-icon name="…" [size]="24" />
              </button>
              <button ui-icon-button size="small" type="button" aria-label="More">
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §40 (optional background — no Figma access required to use this component)
