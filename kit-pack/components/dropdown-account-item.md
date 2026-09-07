# UiDropdownAccountItem

**Selector:** `button[ui-dropdown-account-item]`

**Import**

```ts
import { UiDropdownAccountItem } from 'ai-dls-kit';
```

## Description

DLS 3.1 `dropdown-item-account` (55071:286576, REGISTER.md
§16, audited 2 Sep 2026) — the account/name row `ui-dropdown-menu-account`
(below) is built from: 12px v-pad, a 40px `ui-avatar` (initials or
`avatarColour`) + kit `label(md)` (14) `--color-text-strong` `name` +
optional kit `body(sm)` `--color-text-subtle` `meta`, 8px gap.

  <button ui-dropdown-account-item name="Aiko MORI" meta="****4821" />
  <button ui-dropdown-account-item name="Haruto SATO" [selected]="true" />
  <button ui-dropdown-account-item name="Mei KOBAYASHI" multiselect [selected]="checked" />
  <button ui-dropdown-account-item name="Riku TANAKA" expandable [expanded]="open" />

**Single select** (`selected`, no `multiselect`) — DLS's own selected
treatment: `--color-bg-selected` fill, a 4px `--color-success-strong`
left bar (12px top/bottom inset, spanning the 40px avatar+text content
block rather than the full 64px row), a trailing 16px check glyph
(same paint `ui-dropdown-item`'s own `selected` input draws, register
§16's "belongs with any item" ruling).

CORRECTION (owner review, 3 Sep 2026): the selected bar now insets 12px
top/bottom to span the content block instead of the full row.

**Multiselect** (`multiselect`) — a leading, readonly `ui-checkbox`
mirrors `selected` instead: the ROW is the control (a real click
anywhere in the row toggles it, same contract `ui-multi-select`'s rows
use), so the checkbox never needs its own interaction path — hence
`readonly`, per `ui-checkbox`'s own §10 contract.

**Expandable** (`expandable`) — a trailing chevron-down_16 that rotates
180° when `expanded` (a sub-menu discloser, e.g. "show more accounts
under this entity").

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `name` (required) | `string` | — |
| `meta` | `string` | — |
| `avatarColour` | `UiAvatarColour` | `'goji'` |
| `selected` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `multiselect` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `expandable` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `expanded` | `(inferred)` | `false, { transform: booleanAttribute }` |

See also: UiAvatarColour (components/avatar.md)

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §16 (optional background — no Figma access required to use this component)
