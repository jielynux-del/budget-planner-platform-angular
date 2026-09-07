# UiSelect

**Selector:** `ui-select`

**Import**

```ts
import { UiSelect } from 'ai-dls-kit';
```

## Description

DLS 3.1 Single select (REGISTER.md §21, audited 3 Sep 2026,
built per the owner's §21–§24 ruling "the Single-select Expanded MENU is
built NOW") — Small (76086:347480) / Expanded (76086:350551): a 32px
trigger (bg level_1, 1px border, radius 4, 0/12 padding, 8 gap, kit
body(sm) 13, chevron-down_16 in `--color-icon`) that opens a
`ui-dropdown-menu[role=listbox]` of `button[ui-dropdown-item]` rows 6px
below, min-width the trigger's own width or 200px, whichever is larger —
the same "max(200, 100%)" rule `ui-multi-select`'s panel already uses.
Open/focus draws the DLS 2px solid `--color-focus` inset ring and flips
the chevron to chevron-up; a value set adds a leading `clearable` (default
on) `clear-filled_16` glyph that resets to null without opening the menu.

  <ui-select [options]="months" [(value)]="month" placeholder="All" />
  <ui-select [options]="months" [formControl]="ctrl" searchable="true" />
  <ui-select [options]="months" [(value)]="month" readonly="true" />

NATIVE-SELECT MIRROR (why): 59 existing callers and their e2e specs drive
this control with Playwright's `locator.selectOption()` against a plain
`<select>` (the e2e helpers `selectFor()`), which a custom listbox cannot
satisfy — there is no native `<select>` for `selectOption()` to act on. So
a visually-hidden native `<select class="ui-select-native">` stays in the
DOM (collapsed to 1x1, `opacity: 0`, NOT `display:none` — the same trick
`ui-date-input`'s column-header face uses, select.scss), mirrored
bidirectionally to the `value` model: `selectOption()` still drives it and
its `change` event updates `value` the normal CVA way; picking a row in
the visible trigger/menu writes `value` too, which the native select's own
`[selected]` bindings pick straight back up. ONE model, two faces — same
pattern `ui-date-input` already established for its two faces.

Per-instance styling sets WIDTH ONLY (size the host element).

`invalid` + `errorMessage` — the canonical error-state contract shared by
every kit form control (see ui-text-input for the full docstring). The
two are independent on purpose: a field can be marked invalid without a
message of its own.

TABLE FILTER FACE: inside a `ui-column-header` the trigger keeps that
component's 24px sizing convention — same `:host-context(ui-column-header)`
override `ui-date-input` uses (select.scss).

TRAP (the reference app's internal notes, 23 Jul): a `placeholder` AND a real first option
whose text equals it produces two same-text options and can bind
`value=""` on select. If the default option is already in the list (e.g.
"All"), do not also pass a placeholder — unchanged by this rebuild.

FILLED vs default (owner's ruling, 3 Sep 2026, REGISTER.md
§21): the clear (×) belongs to the FILLED state only. Table-header and
page-level FILTER selects default to an "All …" sentinel — pass it as
`emptyValue` so the select reads as unfilled at rest, no clear button,
and clearing returns to that sentinel rather than to `null`. Every other
caller leaves `emptyValue` at its `null` default, so this is a no-op for
them.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `options` | `UiSelectOption[] | string[]` | `[]` |
| `placeholder` | `string` | — |
| `disabled` | `(inferred)` | `false` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |
| `readonly` | `(inferred)` | `false` |
| `clearable` | `(inferred)` | `true` |
| `emptyValue` | `string | null` | `null` |
| `searchable` | `(inferred)` | `false` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `string | null` | `null` |

## Types

```ts
export interface UiSelectOption {
  value: string;
  label: string;
  /** DLS "Metadata" — a second line under the label (§36). */
  description?: string;
  /** 16px leading glyph: an SVG `<path d>` string, rendered through
   *  `ui-dropdown-item`'s `[uiDropdownIcon]` slot. Mutually exclusive with
   *  `avatar` — DLS's Icon and Avatar are alternate row variants, not
   *  additive; an option with both renders the icon. */
  icon?: string;
  /** Initials source (a name, e.g. "Aiko MORI") for a 24px `ui-avatar` in
   *  the row's `[uiDropdownAvatar]` slot. */
  avatar?: string;
  /** DLS right-slot: a 16px neutral count pill. */
  count?: number;
  /** Not selectable by click or keyboard; skipped by arrow/typeahead nav. */
  disabled?: boolean;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <div class="row sel-basic-row">
        <div class="w200">
          <ui-select [options]="locations" [(value)]="location" placeholder="All locations" />
        </div>
        <div class="w200">
          <ui-select [options]="locations" [(value)]="selReadonlyValue" placeholder="All locations" />
        </div>
        <div class="w200">
          <ui-date-input [(value)]="tradeDate" />
        </div>
        <div class="w240">
          <ui-search-input [(value)]="query" placeholder="Search" />
        </div>
      </div>
      <p class="hint">Selected: {{ location() ?? '—' }} · Date: {{ tradeDate() ?? '—' }} · Query: {{ query() || '—' }}</p>
      <h3>Error state (invalid/errorMessage) — the two inputs are independent</h3>
      <div class="row">
        <div class="w200">
          <ui-select
            [options]="locations"
            [(value)]="errorLocation"
            placeholder="All locations"
            [invalid]="true"
            errorMessage="Location is required"
          />
        </div>
        <div class="w200">
          <ui-date-input [(value)]="errorDate" [invalid]="true" />
        </div>
      </div>
      <p class="hint">Left: invalid with a message. Right: invalid with no message of its own (either/or pair pattern).</p>

      <h3>ui-select — DLS Single select states (§21, audited 3 Sep 2026)</h3>
      <div class="row sel-states-row">
        <div class="w200">
          <ui-select [options]="locations" [(value)]="selDisabledValue" [disabled]="true" />
        </div>
        <div class="w200">
          <ui-select
```


## Provenance

REGISTER.md §21 (optional background — no Figma access required to use this component)
