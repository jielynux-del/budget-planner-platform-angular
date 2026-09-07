# UiDropdownHeading

**Selector:** `ui-dropdown-heading`

**Import**

```ts
import { UiDropdownHeading } from 'ai-dls-kit';
```

## Description

DLS 3.1 `dropdown-heading` (53775:283784, REGISTER.md §16,
audited 2 Sep 2026) — a 40px group label row, 12px h-padding, kit
`label(sm)` `--color-text-subtle`:

  <ui-dropdown-heading>Recent</ui-dropdown-heading>
  <ui-dropdown-heading back (backActivated)="onBack()">Team Management</ui-dropdown-heading>

**`back`** renders a leading 16px chevron-left glyph and turns the whole
row into a `<button>` emitting `backActivated` — the sub-menu return
affordance. Without it the heading is inert text.

CORRECTION (owner review, 3 Sep 2026): DLS's heading has no hover
state — the `back` variant's hover→text-strong rule was removed.

TRAP (lead, 3 Sep 2026): the label is projected through ONE `<ng-template>`
rendered by both branches — two bare `<ng-content>`s inside an @if/@else
silently send the content to only one of them, and the `back` variant
rendered an empty label.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `back` | `(inferred)` | `false, { transform: booleanAttribute }` |

**Outputs**

| Name | Type |
| --- | --- |
| `backActivated` | `void` |

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
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
        <ui-dropdown-menu width="320px">
          <div uiDropdownMenuHeader class="dd-account-header">
            <ui-search-input class="dd-account-search" placeholder="Search" />
            <div class="dd-account-actions">
              <button ui-button variant="plain" size="tiny" type="button">Select all</button>
              <button ui-button variant="plain" size="tiny" type="button">Reset</button>
            </div>
          </div>
          @for (a of dropdownAccounts; track a.name) {
            <button
              ui-dropdown-account-item
              [name]="a.name"
              [meta]="a.meta"
              [avatarColour]="a.colour"
              [multiselect]="true"
              [selected]="a.selected()"
              (click)="a.selected.set(!a.selected()); lastDropdownPick.set(a.name)"
            ></button>
          }
        </ui-dropdown-menu>
      </div>
```


## Provenance

REGISTER.md §16 (optional background — no Figma access required to use this component)
