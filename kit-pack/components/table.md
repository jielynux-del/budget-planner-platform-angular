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

**Header band** — every `<th>` paints the band (`--color-bg-app`) and
the 1px `--color-border-decorative` rule ITSELF (an inset box-shadow, no
height — table.scss `::ng-deep th`), stated exactly as `ui-column-header`
states its own `tone="band"`, so the two coincide and an EMPTY `<th>`
never leaves a gap in the line (QC wave 4F, owner 8 Sep 2026: "Bottom
border missing. Also a kit issue?"). Still put a `variant="blank"` column
header in an action/spacer cell for the gutter contract — the chassis is
the floor beneath it. The global `.ui-table th` says the same thing.

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

**`border`** — owner's QC ruling (kit-fixes, 7 Sep 2026): a table
standing on its OWN, not nested in a `ui-card`/`ui-table-card`, must
carry its own bordered container so a caller cannot forget the chrome
and ship a table with no visible edge at all — 1px `--color-border-
decorative` all round, `--border-radius-panel-lg` (8, the same panel
radius `card` uses), `overflow: clip` so the collapsed border-grid
corners stay rounded. The header rule and every row rule are already
drawn (`ui-column-header`'s own inset shadow for the header, the
chassis's `tbody td` inset shadow for each row, both above) — `border`
only ADDS the outer edge and removes the LAST row's own rule (`box-
shadow: none` on `tbody tr:last-child td`), since a rule immediately
against the container's own bottom border would double-line it.
Deliberately a SEPARATE, opt-in input rather than `card`'s default-on
behaviour or a `:host-context` ancestor sniff for "is this inside a
`ui-card`": an ancestor sniff cannot distinguish "correctly nested in a
card" from "nested in some other, unrelated bordered wrapper", and
flipping every existing bare table on by default would risk changing
chrome under tables the owner has NOT reviewed for it (see kitchen-sink
§40's "Standalone (bordered)" demo for the intended call site: a table
with no `ui-card`/`ui-table-card` ancestor of its own).

"Not nested in a card" is the PAGE-BODY case. Owner's ruling, 8 Sep 2026:
a table inside a FOCUS-OVERLAY card (the add-access overlay's platform
table, the mini-tables every trade overlay draws) is framed as well —
that framed-box-inside-the-card look is the DLS one, and it is what the
hand-rolled mini-tables have always drawn. So a `ui-card` ancestor alone
is not a reason to omit `border`; ask whether the design shows a frame.

`card` and `border` are mutually exclusive by convention (one supplies a
shadowed white panel, the other a plain-background bordered box) — a
caller passes at most one.

**`.ui-inline-tables` — the CONTAINER RULE (QC wave 4E, 8 Sep 2026).**
Owner, on a bare table in the Hiring Manager's inbox: "the kit should
have a rule for table saying any table sitting inside inbox as inline
cannot be without boundary." So the frame is a rule of the kit, not a
caller's memory: inside an ancestor carrying the kit-defined class
`.ui-inline-tables`, a chassis table is FRAMED (the identical `border`
declarations — one Sass mixin, table.scss) unless it is a `card`. The
container opts in ONCE (the inbox's `.detail-body`), and every table
that lands there — today's and next quarter's — gets the boundary
whether or not its author remembered `border`. The kit never sniffs app
selectors for this; the class is the contract and the app puts it on.

`border` is therefore THREE-VALUED:
  omitted            — inherit: framed inside `.ui-inline-tables`, bare
                       elsewhere;
  `border`           — framed, wherever it stands (unchanged);
  `[border]="false"` — EXPLICITLY unframed even inside the marker (host
                       class `ui-table-chassis--no-border`): the caller
                       frames this table by other means. The one caller
                       today is `ui-table`, whose frame sits on
                       its horizontal-scroll wrapper and whose
                       `border-collapse: collapse` is load-bearing — the
                       frame cannot move onto the `<table>` there.
Passing `false` is a claim ("I have a boundary"); a reviewer can grep it.

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
| `border` | `boolean | undefined, unknown` | `undefined, {
    transform: v => (v === undefined || v === null ? undefined : booleanAttribute(v)),
  }` |

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
