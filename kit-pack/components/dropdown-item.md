# UiDropdownItem

**Selector:** `button[ui-dropdown-item]`

**Import**

```ts
import { UiDropdownItem } from 'ai-dls-kit';
```

## Description

DLS 3.1 `dropdown-item` (53775:283454, REGISTER.md §16,
audited 2 Sep 2026) — attribute component on a native `<button>` so
type/disabled/form semantics stay intact, same pattern as
`ui-icon-button`/`ui-chip`:

  <button ui-dropdown-item>Plain row</button>
  <button ui-dropdown-item><ui-icon uiDropdownIcon name="…" /> With icon</button>
  <button ui-dropdown-item><ui-avatar uiDropdownAvatar size="xs" .../> Name</button>
  <button ui-dropdown-item><ui-toggle uiDropdownTrailing .../> Autosave</button>
  <button ui-dropdown-item [loading]="true">Loading</button>
  <button ui-dropdown-item [selected]="true">Selected</button>
  <button ui-dropdown-item disabled>Disabled</button>
  <button ui-dropdown-item>
    Name
    <span uiDropdownDescription>Metadata line</span>
  </button>

min-h 40, 8px v / 12px h padding, radius 4, kit `label(sm)` 13/500
`--color-text-strong`, 8px gap. Named projection slots —
`[uiDropdownIcon]` (16px leading glyph, `--color-icon`),
`[uiDropdownAvatar]` (a 24px `ui-avatar size="xs"`), `[uiDropdownTrailing]`
(e.g. a `ui-toggle`, pinned right) — sized/positioned via `::ng-deep` in
dropdown-item.scss, the same projected-content escape `ui-button`'s icon
slots and `ui-icon-button`'s glyph sizing use.

GROWTH (REGISTER.md §36, "Select — remainder audit", 3 Sep
2026) added two more, both additive: `[uiDropdownAvatarSecondary]` — a
SECOND 24px leading slot, for the one row shape (`multi-select-option`,
DLS 273655:2345) where the FIRST leading slot is already spoken for by a
selection control (`ui-multi-select`'s checkbox projects into
`[uiDropdownAvatar]`), so an option's own avatar needs a slot after it
rather than instead of it. `[uiDropdownDescription]` — the DLS
"Metadata" second line: projected alongside the default-slot label
inside a new `.ui-dropdown-item-text` column wrapper (kit `label(sm)`
13px `--color-text-subtle`, 2px gap under the label), which is why plain
single-line callers are unaffected — the wrapper is just one more flex
layer around the same label span, `flex:1`/ellipsis unchanged.

States: Hover `--color-bg-hover`, `:active` `--color-bg-pressed`,
`:focus-visible` 2px inset `--color-focus`, `:disabled`
`--color-text-disabled` (+ `[uiDropdownIcon]` dropping to
`--color-icon-disabled`). `loading` swaps the label for three 8px dots
(`ui-button`'s own loading-dot family, button.scss). `selected`
(`aria-selected`) is the DLS single-select account-row treatment reused
here per the register ("belongs with any item"): `--color-bg-selected`
fill, a 4px `--color-success-strong` left bar (8px top/bottom inset,
spanning the row's content height), and a trailing 16px check glyph.

CORRECTION (owner review, 3 Sep 2026): the loading dots now centre in
the item (`flex:1; justify-content:center`) and paint `--color-icon`,
not currentColor; the selected bar insets 8px top/bottom instead of
spanning the full row.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `selected` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `loading` | `(inferred)` | `false, { transform: booleanAttribute }` |

## Slots

- Default (unnamed) content projection
- `select="[uiDropdownIcon]"`
- `select="[uiDropdownAvatar]"`
- `select="[uiDropdownAvatarSecondary]"`
- `select="[uiDropdownDescription]"`
- `select="[uiDropdownTrailing]"`


## Example

From the kit's kitchen sink:

```html
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
        <ui-dropdown-menu width="320px">
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §16 (optional background — no Figma access required to use this component)
