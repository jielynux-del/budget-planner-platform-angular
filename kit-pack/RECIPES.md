# RECIPES.md — Ai DLS Kit recipes

Whole-screen compositions that pull several `components/*.md` docs into one
copy-paste starting point; non-obvious lines carry a short "why".

## Filterable table page

Page header, a card with a search box, a filterable table, a simple
pagination footer. Fourteen kit pieces, no raw controls and no hand-drawn
glyphs.

**Imports** (`page.ts`)

```ts
import { Component, computed, signal } from '@angular/core';
import {
  UiPageHeader, UiButton, UiSearchInput, UiSelect, UiTableCard, UiTableHeader,
  UiTable, UiColumnHeader, UiTableRow, UiStatusTag, UiCurrencyPair,
  UiIconButton, UiIcon, UiPagination,
} from 'ai-dls-kit';

interface Row { id: string; counterparty: string; currency: string; amount: string; status: string; }

const STATUS_ALL = 'All';                                   // the filter's "unfilled" sentinel
const ROWS: Row[] = [
  { id: 'TRD-10245', counterparty: 'Meridian Capital Partners', currency: 'SGD', amount: '128,400.00', status: 'Pending approval' },
  { id: 'TRD-10246', counterparty: 'Northgate Securities Ltd',  currency: 'USD', amount: '54,200.50',  status: 'Approved' },
  { id: 'TRD-10247', counterparty: 'Harbour View Trading Co',   currency: 'HKD', amount: '972,150.00', status: 'Rejected' },
];

@Component({
  selector: 'app-exceptions-page',
  imports: [UiPageHeader, UiButton, UiSearchInput, UiSelect, UiTableCard, UiTableHeader,
    UiTable, UiColumnHeader, UiTableRow, UiStatusTag, UiCurrencyPair, UiIconButton, UiIcon,
    UiPagination],
  templateUrl: './page.html',
  styleUrl: './page.scss',
})
export class ExceptionsPage {
  protected readonly statusAll = STATUS_ALL;
  protected readonly statusOptions = [STATUS_ALL, 'Pending approval', 'Approved', 'Rejected'];
  protected readonly search = signal('');
  protected readonly statusFilter = signal<string>(STATUS_ALL);
  protected readonly page = signal(1);

  protected readonly rows = computed(() => {
    const q = this.search().trim().toLowerCase();
    const status = this.statusFilter();
    return ROWS.filter(r =>
      (status === STATUS_ALL || r.status === status) &&
      (!q || r.id.toLowerCase().includes(q) || r.counterparty.toLowerCase().includes(q)));
  });
}
```

**Template** (`page.html`)

```html
<ui-page-header title="Trade exceptions">
  <!-- uiPageHeaderActions projects into the header's action slot -->
  <button uiPageHeaderActions ui-button variant="primary" size="small" type="button">New exception</button>
</ui-page-header>

<div class="page-content">
  <ui-table-card>                                          <!-- white card: header + table + footer -->
    <ui-table-header title="Exceptions">
      <ui-search-input [(value)]="search" placeholder="Search ID or counterparty" />
    </ui-table-header>

    <table ui-table>                                       <!-- attribute selector on a real table -->
      <thead>
        <tr>
          <th style="width: 16%"><ui-column-header label="Trade ID" [first]="true" /></th>
          <th style="width: 30%"><ui-column-header label="Counterparty" /></th>
          <th style="width: 18%"><ui-column-header label="Amount" align="end" /></th>
          <th style="width: 24%">
            <ui-column-header label="Status">             <!-- a select projected here becomes the column filter -->
              <ui-select [options]="statusOptions" [(value)]="statusFilter" [emptyValue]="statusAll" />
              <!-- emptyValue = the "All" sentinel: no clear (×) until another value is picked (RULES.md #7) -->
            </ui-column-header>
          </th>
          <th style="width: 92px"><ui-column-header variant="blank" [last]="true" /></th>
        </tr>
      </thead>
      <tbody>
        @for (row of rows(); track row.id) {
          <tr ui-table-row interactive>                    <!-- interactive = hover + pointer -->
            <td>{{ row.id }}</td>
            <td>{{ row.counterparty }}</td>
            <td class="ui-cell-currency">                  <!-- right-aligned currency cell -->
              <ui-currency-pair [currency]="row.currency" [amount]="row.amount" size="xs" />
            </td>
            <td class="ui-cell-status">
              <ui-status-tag [status]="row.status" />      <!-- colour inferred from the keyword table in status-tag.md -->
            </td>
            <td class="ui-cell-actions">
              <button ui-icon-button size="tiny" aria-label="Open trade">
                <ui-icon name="arrow-right" />   <!-- NAME the glyph; never paste an svg (RULES.md #12) -->
              </button>
            </td>
          </tr>
        }
      </tbody>
    </table>

    <ui-pagination type="basic" [total]="rows().length" [(page)]="page" />
    <!-- basic = count + Previous/Next; the default `complex` adds per-page select, four icon buttons and a page input -->
  </ui-table-card>
</div>
```

**Styles** (`page.scss`)

```scss
@use 'ai-dls-kit/tokens/layout' as layout;

:host { display: block; min-height: 100vh; background: var(--color-bg-app); }

.page-content {
  @include layout.content-padding;   // 24px top/bottom, 40px left/right (RULES.md #5)
  padding-top: 0;                    // …except the top: ui-page-header owns the 24px
                                     // gap below its own rule, so keeping it here renders 48
}
```

## Two filters that read as one field

A pair of selects — or a select and a date input — that belong together go
inside one frame rather than sitting as two separate controls:

```html
<ui-select-group>                                  <!-- one border, one divider, borderless members -->
  <ui-select [options]="desks" [(value)]="desk" [emptyValue]="'All Desks'" />
  <ui-select [options]="subDesks" [(value)]="subDesk" [emptyValue]="'All Sub-desks'" />
</ui-select-group>

<ui-select-group>                                  <!-- a date member works the same way -->
  <ui-select [options]="['Month', 'Date Range']" [(value)]="mode" />
  <ui-date-input type="month" [(value)]="month" [max]="maxMonth" />
</ui-select-group>
```

Each member keeps its own API (`emptyValue`, `searchable`, `disabled`,
`min`/`max`); the group is chrome only and holds no value of its own.
`layout="equal"` splits the frame evenly instead of sizing each member to its
own content.

## Icons anywhere in either recipe

`<ui-icon name="…" />`, always — in an icon button, in a component's icon
slot, beside a label. `name` is checked against the kit's 569-name catalogue
at compile time, `[size]` is 16 (default) or 24, and the glyph takes the
colour of the text around it. `components/icon.md` lists every name. Never
paste an `<svg>` into a template (RULES.md #12).

A status not in `status-tag.md`'s keyword table resolves to `neutral` — pass `variant` explicitly
for it. Verify with `node kit-pack/lint/lint-boundaries.mjs src` and `npx ng build`.
