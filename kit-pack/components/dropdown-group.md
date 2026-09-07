# UiDropdownGroup

**Selector:** `[ui-dropdown-group]`

**Import**

```ts
import { UiDropdownGroup } from 'ai-dls-kit';
```

## Description

DLS `dropdown-menu` "Grouped Items" variation marker (register §16) —
wrap sibling items in `<div ui-dropdown-group>…</div>`;
`dropdown-menu.scss` adds the 4px inset padding and, between
consecutive groups, the 1px `--color-border-decorative` top rule. No
behaviour lives here; it exists purely so the attribute is a typed,
documented part of the kit rather than a bare string callers have to
remember.

## API

_No inputs, models or outputs declared._

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
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

§16 (optional background — no Figma access required to use this component)
