# UiKebabMenu

**Selector:** `ui-kebab-menu`

**Import**

```ts
import { UiKebabMenu } from 'ai-dls-kit';
```

## Description

Kebab (⋮) row-action menu — right-aligned dropdown. The trigger is a `ui-icon-button` (register item 8,
REGISTER.md §8) at `size="small"` — DLS has no 28px icon-
button cell, so the old hand-measured 28px trigger rounds up to the
nearest DLS size, 32.

  <ui-kebab-menu [items]="rowActions" (selected)="onAction($event)" />

── DLS REPLICA (REGISTER.md §16, audited 2 Sep 2026) ────────
The popover is now `ui-dropdown-menu` (bg level_1, radius-md, elevation-3,
4px inset) and each row a `button[ui-dropdown-item]` (min-h 40, 8/12
padding, label(sm) 13/500) — the hand-rolled menu chrome this file used
to paint itself is gone; only positioning (`.menu`'s absolute placement)
and the pop-in animation stay local. `class="item"`/`item-danger` are
kept on the new elements and the danger colour is boosted past
ui-dropdown-item's own internal specificity (kebab-menu.scss).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `items` (required) | `UiMenuItem[]` | — |

**Outputs**

| Name | Type |
| --- | --- |
| `selected` | `string` |

## Types

```ts
export interface UiMenuItem {
  key: string;
  label: string;
  danger?: boolean;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<p class="hint">ui-kebab-menu:</p>
      <div class="row">
        <ui-kebab-menu [items]="menuItems" (selected)="lastMenuPick.set($event)" />
      </div>
      <p class="hint">Menu pick: {{ lastMenuPick() ?? '—' }}</p>
    </div>
  </section>
```


## Provenance

REGISTER.md §8 (optional background — no Figma access required to use this component)
