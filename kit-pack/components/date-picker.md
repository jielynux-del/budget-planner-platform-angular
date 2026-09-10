# UiDatePicker

**Selector:** `ui-date-picker`

**Import**

```ts
import { UiDatePicker } from 'ai-dls-kit';
```

## Description

`ui-date-picker` — the DLS 3.1 `date-picker` component (page 305:2703,
set 160311:24981, range variant 160311:24968, REGISTER.md
§14, audited/round-built 2 Sep 2026). An element component: the panel
ONLY — the caller/host positions it.

Header cell set 6257:45570 (each state — default/inactive/today/selected/
hover/disabled/range-start/range-middle/range-end — is a documented node
in that set); header chrome 6260:37880 uses this kit's already-built
§7/§8 primitives: `«`/`‹`/`›`/`»` are `button[ui-icon-button] size="tiny"`
(24px, 16px chevron glyphs), the centre "Jul"/"2024" pair are
`button[ui-button] variant="secondary" size="tiny"` — DLS's header
buttons are OUTLINED tiny, which in this kit's vocabulary IS
`variant="secondary"` (register §7).

Selected/today/range fills sit on `--color-primary` — the white-label
seam standing in for DLS's `product_alt` red (owner ruling carried from
§7-§20: "`--color-primary` as the seam for every product_alt use (date-
picker selection, tabs)"). Range-middle is `--color-bg-selected`, held
on hover (owner, 8 Sep 2026: "Chiclet and date range both use
bg-selected too" — the kit's one selected wash; it was the
`--color-primary-subtle` / `-hover` pair before QC wave 4F, and no
`bg-selected-hover` token exists or is minted).

Text is kit `label(sm)` 13px throughout (the DLS "label/sm 14" DLS-side
quirk this kit does not inherit — same standing ruling as Breadcrumb §6
and Button §7).

TYPES — `type` is a model: the header's month/year buttons switch it (to
`month` / `year`) and picking a cell in either of those switches it back
to `day`, matching a normal calendar's drill-down/drill-up motion. Range
mode ignores `type` — a range is always two DAY grids side by side (DLS
160311:24968 has no Range=Yes × Type=Month/Year cell).

RANGE — two month grids (this month + next), 640 wide. First real click
on a day starts a new range (`start` = that day, `end` = null); the next
click closes it as `end` (earlier of the two becomes `start`). Apply
commits `rangeValue` and emits `applied`; Cancel discards the in-progress
pick and restores the last-applied range, emitting `cancelled`.

TODAY (non-range footer) jumps `viewMonth` to the current month and picks
today in one action — DLS's single "Today" shortcut.

KEYBOARD — roving tabindex over the visible grid: arrow keys move focus
(day grid: left/right ±1 day, up/down ±1 week; month/year grids: ±1 / ±3
across their 3-column layout), Home/End jump to the day grid's week
edges, Enter/Space picks the focused cell.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `monthOnly` | `(inferred)` | `false` |
| `range` | `(inferred)` | `false` |
| `min` | `string | null` | `null` |
| `max` | `string | null` | `null` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `type` | `UiDatePickerType` | `'day'` |
| `value` | `string | null` | `null` |
| `rangeValue` | `UiDateRange` | `{ start: null, end: null }` |
| `viewMonth` | `string` | `isoMonthOf(todayIso())` |

**Outputs**

| Name | Type |
| --- | --- |
| `applied` | `UiDateRange` |
| `cancelled` | `void` |
| `picked` | `string` |

## Types

```ts
export type UiDatePickerType = 'day' | 'month' | 'year';
```

```ts
export interface UiDateRange {
  start: string | null;
  end: string | null;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <h3>Day (single)</h3>
      <div class="row dp-day-row">
        <ui-date-picker [(value)]="dpDayValue" [viewMonth]="'2026-09'" />
      </div>
      <p class="hint">Picked: {{ dpDayValue() ?? '—' }}</p>

      <h3>Range — Cancel / Apply</h3>
      <div class="row dp-range-row">
        <ui-date-picker
          [range]="true"
          [(rangeValue)]="dpRangeValue"
          [viewMonth]="'2026-09'"
          (applied)="dpRangeApplied.set($event)"
        />
      </div>
      <p class="hint">
        Applied: {{ dpRangeApplied()?.start ?? '—' }} to {{ dpRangeApplied()?.end ?? '—' }}
      </p>

      <h3>Month &amp; Year types</h3>
      <div class="row dp-month-year-row">
        <ui-date-picker type="month" [(value)]="dpMonthValue" [viewMonth]="'2026-09'" />
        <ui-date-picker type="year" [(value)]="dpYearValue" [viewMonth]="'2026-09'" />
      </div>

      <h3>Wired through <code>ui-date-input</code> (standalone popover)</h3>
      <p class="hint">
        Kit-fixes item 5 (6 Sep 2026): CLICKING the field itself opens the picker, not only the
        calendar icon — and focus stays in the native input, so you can keep typing with the
        calendar already open. A bare <code>focus</code> deliberately does NOT open it: tabbing
        through a form would otherwise leave a 394px popover hanging over the fields below, and
        every later click under it is refused by the browser's hit test. The keyboard route is
        <code>Alt</code>+<code>ArrowDown</code>, or the tabbable calendar button. A typed valid date moves the calendar's month and its selected
        cell. Escape closes; a click outside closes; the icon button still toggles. The open is
        idempotent, so a keystroke never re-opens or re-seeds it. This does NOT reintroduce the UA
        <code>showPicker()</code> — the §14 ruling against the browser's own picker stands, and the
        popover here is the kit's <code>ui-date-picker</code>.
      </p>
      <p class="hint">
```


## Provenance

REGISTER.md §14 (optional background — no Figma access required to use this component)
