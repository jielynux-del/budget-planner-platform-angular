# UiSelectGroup

**Selector:** `ui-select-group`

**Import**

```ts
import { UiSelectGroup } from 'ai-dls-kit';
```

## Description

`ui-select-group` — N kit controls joined inside ONE field frame.

  <ui-select-group>
    <ui-select [options]="desks" [(value)]="desk" [emptyValue]="'All Desks'" />
    <ui-select [options]="subDesks" [(value)]="subDesk" [emptyValue]="'All Sub-desks'" />
  </ui-select-group>

  <ui-select-group>
    <ui-select [options]="['Month', 'Date Range']" [(value)]="mode" />
    <ui-date-input type="month" [(value)]="month" [max]="maxMonth" />
  </ui-select-group>

OWNER OVERRIDE OF THE DLS NODE (kit-fixes walk item 10, 6 Sep 2026):
Figma's Select node (305:2698) draws each inner select of a combo with
its OWN border. The owner ruled on the monitoring app Desk / Sub-desk
pair: "the inner individual input borders must be hidden. Figma DLS is
also wrong here. It should be a borderless dropdown, a divider, then a
borderless dropdown, inside one border." So this component paints
  - ONE outer 1px `--color-border` frame, `--radius-sm`, level_1 fill,
    32px tall (`--size-base-sm`, the single select's own height axis —
    the 1px frame is INSIDE the 32, so the group's outer box equals a
    standalone `ui-select`'s outer box, and its members are 30px tall
    inside it);
  - hover: `--color-border-hover` on the frame (not while focused);
  - focus: the DLS 2px inset `--color-focus` ring on the FRAME whenever
    any member has focus or an open menu (`:focus-within`, plus `:has()`
    for a member whose menu is open by pointer without `:focus-visible`);
  - members rendered BARE: no border, no radius, transparent background,
    no ring of their own (their own hover/focus paint is suppressed —
    the frame carries it);
  - a 1px `--color-border-decorative` vertical divider between members.

MEMBERS. Anything projected is a member; `ui-select` and `ui-date-input`
are the two the stylesheet knows how to strip (kit-fixes item 21 needs a
date member for the table date filter). Each member keeps its own API
— value, options, `emptyValue`, `searchable`, `placeholder`, `disabled`,
`type="month"`, `min`/`max` — untouched; the group is layout + chrome
only, it has no value of its own and no CVA. A disabled member keeps
its `--color-bg-disabled` fill and disabled text so it still reads as
disabled (and stays legible) inside the live frame.

HOW THE STRIPPING WORKS (documented hook, select-group.scss): the group
reaches its projected members with `:host ::ng-deep > ui-select …` /
`> ui-date-input …` — projected content carries the CALLER's
encapsulation attribute, not this component's, so `::ng-deep` is the
only way to reach a child component's internals from here (same escape
`ui-table` and `ui-dropdown-menu` use for projected content). The
selectors are ANCHORED to `:host >` direct children, so the piercing
cannot escape the group. `ui-select` needed no `bare` input as a result.

NO `overflow: hidden` on the frame — the members' menus (`ui-select`'s
listbox, `ui-date-input`'s `ui-date-picker`) are absolutely positioned
popovers hanging BELOW the field and would be clipped. The old
hand-rolled `.dual-sel-wrap` did clip, which is why its focus ring had
to be redrawn inside each half.

WIDTHS. `layout="auto"` (default): each member is content-sized — a
`ui-select` measures its longest label, a `ui-date-input` its native
editor — and a caller who wants a wider member sizes THAT member's host
(the same "width only" rule every kit control follows). `layout="equal"`
shares the group's width equally between members instead.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `layout` | `'auto' | 'equal'` | `'auto'` |

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <h3>Desk / Sub-desk — the monitoring app Signoff pair</h3>
      <div class="row sg-pair-row">
        <ui-select-group>
          <ui-select [options]="sgDesks" [(value)]="sgDesk" [emptyValue]="'All Desks'" />
          <ui-select [options]="sgSubDesks" [(value)]="sgSubDesk" [emptyValue]="'All Sub-desks'" />
        </ui-select-group>
      </div>
      <p class="hint">
        Desk: {{ sgDesk() }} · Sub-desk: {{ sgSubDesk() }} — one border, one divider, no clear (×)
        at rest because both members pass their "All …" sentinel as <code>emptyValue</code>.
      </p>

      <h3><code>layout="equal"</code> in a 400px frame</h3>
      <div class="row sg-equal-row">
        <div class="w400">
          <ui-select-group layout="equal">
            <ui-select [options]="sgDesks" [(value)]="sgEqualDesk" [emptyValue]="'All Desks'" />
            <ui-select [options]="sgSubDesks" [(value)]="sgEqualSubDesk" [emptyValue]="'All Sub-desks'" />
          </ui-select-group>
        </div>
      </div>
      <p class="hint">Each member takes half the frame instead of measuring its longest label.</p>

      <h3>A disabled second member</h3>
      <div class="row sg-disabled-row">
        <ui-select-group>
          <ui-select [options]="sgDesks" [(value)]="sgDisabledDesk" [emptyValue]="'All Desks'" />
          <ui-select [options]="sgSubDesks" [(value)]="sgDisabledSubDesk" [disabled]="true" />
        </ui-select-group>
      </div>
      <p class="hint">
        The disabled member keeps its <code>--color-bg-disabled</code> fill and disabled text, so it
        still reads as disabled inside a live frame — but draws no border of its own.
      </p>

      <h3>A <code>ui-date-input</code> member — the table date filter's Month mode (item 21)</h3>
      <div class="row sg-date-row">
        <ui-select-group>
          <ui-select [options]="sgModes" [(value)]="sgMode" />
```


## Provenance

_Not recorded._
