# UiDropdownMenu

**Selector:** `ui-dropdown-menu`

**Import**

```ts
import { UiDropdownMenu } from 'ai-dls-kit';
```

## Description

DLS 3.1 `dropdown-menu` (set 53775:283622, REGISTER.md §16,
audited 2 Sep 2026) — the shared popover surface `ui-kebab-menu`, the
`ui-breadcrumb` overflow popover and `ui-multi-select`'s panel all
delegate to (register item 16, built 2 Sep 2026). 200px min-width, bg
`--color-bg-level1`, radius `--radius-md` (8, DLS panel-lg),
`--shadow-elevation-3`, 4px vertical inset padding around the item list.

  <ui-dropdown-menu>
    <button ui-dropdown-item>View details</button>
    <button ui-dropdown-item>Edit</button>
  </ui-dropdown-menu>

**`role`** — `menu` (default) | `listbox`, set on the item-list wrapper;
callers building a single/multi-select listbox pass `role="listbox"`.

**`width`** — overrides the 200px default (e.g. a wider account menu, or
`ui-multi-select`'s `max(320px, 100%)` "320 or the trigger's width,
whichever is larger" rule) via a direct `[style.width]` binding, so it
always wins over the class-level `min-width: 200px` regardless of
stylesheet load order.

**`[uiDropdownMenuHeader]`** — the DLS "With header" variation: an
optional slot above the item list (16px h / 12px v-top padding, no
bottom padding/border, 8px gap to the list below) a caller projects a
search box and/or a Select all/Reset row into — see `ui-multi-select`'s
migration.

CORRECTION (owner review, 3 Sep 2026): the header drew a border-bottom
DLS doesn't have (dropped, replaced by the list's 8px top gap); an
ungrouped item list now gets the same 4px inset a grouped one gets from
its own group padding.

**Grouped Items variation** — wrap sibling items in
`<div ui-dropdown-group>`; dropdown-menu.scss adds each group's 4px
inset padding and, between consecutive groups, a 1px
`--color-border-decorative` top rule. Groups are content the CALLER's
own template projects in (their own Angular encapsulation, not this
component's), so reaching the sibling-group rule needs `::ng-deep` —
the same projected-content technique `ui-button`'s icon slots and
`ui-breadcrumb`'s popover already document.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `role` | `UiDropdownMenuRole` | `'menu'` |
| `width` | `string` | — |

## Types

```ts
export type UiDropdownMenuRole = 'menu' | 'listbox';
```

## Slots

- Default (unnamed) content projection
- `select="[uiDropdownMenuHeader]"`


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <p class="hint">Basic menu — icon, avatar, trailing toggle, disabled, loading:</p>
      <div class="row dd-basic-row">
        <ui-dropdown-menu>
          <button ui-dropdown-item (click)="lastDropdownPick.set('View details')">
            <ui-icon uiDropdownIcon name="…" />
            View details
          </button>
          <button ui-dropdown-item (click)="lastDropdownPick.set('Aiko MORI')">
            <ui-avatar uiDropdownAvatar name="Aiko MORI" colour="goji" size="xs" />
            Aiko MORI
          </button>
          <button ui-dropdown-item (click)="lastDropdownPick.set('Autosave')">
            <span>Autosave</span>
            <ui-switch uiDropdownTrailing [(checked)]="dropdownAutosave" />
          </button>
          <button ui-dropdown-item disabled>Archived (disabled)</button>
          <button ui-dropdown-item [loading]="true">Syncing</button>
        </ui-dropdown-menu>
      </div>

      <p class="hint">With header + Grouped Items — one heading with back:</p>
      <div class="row dd-header-row">
        <ui-dropdown-menu>
          <ui-dropdown-heading back (backActivated)="lastDropdownPick.set('Back')">Team Management</ui-dropdown-heading>
          <div ui-dropdown-group>
            <ui-dropdown-heading>Recent</ui-dropdown-heading>
            <button ui-dropdown-item [selected]="true" (click)="lastDropdownPick.set('Global Markets')">Global Markets</button>
            <button ui-dropdown-item (click)="lastDropdownPick.set('FX Trading')">FX Trading</button>
          </div>
          <div ui-dropdown-group>
            <ui-dropdown-heading>All desks</ui-dropdown-heading>
            <button ui-dropdown-item (click)="lastDropdownPick.set('Rates')">Rates</button>
            <button ui-dropdown-item (click)="lastDropdownPick.set('Credit')">Credit</button>
          </div>
        </ui-dropdown-menu>
      </div>

      <p class="hint">menu-account — search header, Select all / Reset, multiselect rows (two selected):</p>
      <div class="row dd-account-row">
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §16 (optional background — no Figma access required to use this component)
