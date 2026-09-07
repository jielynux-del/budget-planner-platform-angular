# UiFilterTabs

**Selector:** `ui-filter-tabs`

**Import**

```ts
import { UiFilterTabs } from 'ai-dls-kit';
```

## Description

Filter-tab group — DLS `filter-tab` / `filter-tab-group`
(REGISTER.md §41, Figma 6364:41027, 76086:352366, also
1157:292759): a row of pills, the selected one filled with the inverse
surface, the rest outlined, and a disabled state for a choice that exists
but has nothing behind it.

DLS runs a Size axis, Medium (40) | Small (32); the `size` input carries
it — `sm` (default) is the kit's original, pixel-stable geometry, `md`
is the 40-tall cell.

  <ui-filter-tabs [tabs]="tabs" [(active)]="activeTab" />
  <ui-filter-tabs [tabs]="tabs" [(active)]="activeTab" size="md" />

── Why this is NOT a variant of `ui-tabs` ──────────────────────────────
`ui-tabs` is DLS's *tab bar*: 40px tall, transparent, and identified by a
2px underline on the active tab — the control that switches a PAGE between
views. This is DLS's *filter tab group*: a bordered pill that fills when
chosen — the control that narrows the content already on the page. They
are two components in the library, not one component with a skin: the two
share no fill, no border, no radius and no selected treatment (the sizes
now coincide at `md`/40, which is DLS's own overlap, not a merge), so a
`variant` input on `ui-tabs` would fork its template and every one of its
style rules while pretending to be one thing. It would also drag a
disabled state into a component whose call sites never have one. Separate
here keeps the reskin a one-to-one mapping onto DLS.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `tabs` (required) | `UiFilterTab[]` | — |
| `size` | `UiFilterTabSize` | `'sm'` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `active` | `string` | — |

## Types

```ts
export type UiFilterTabSize = 'sm' | 'md';
```

```ts
export interface UiFilterTab {
  key: string;
  label: string;
  /**
   * Trailing count chip, rendered PARENTHESISED — `External Deal (6)`, per
   * the Figma node. The brackets belong to the chip rather than to the caller's
   * label, so no call site can spell them differently.
   *
   * OMITTED (or `null`) renders no chip at all, which is a distinct state from
   * `0` — the monitoring app tab strip shows a count only where that tab
   * has data, so "no data" must be expressible as an absent chip rather than
   * as a zero the reader has to interpret.
   */
  count?: number | null;
  /** Inert: no pointer, no keyboard path, no selection. */
  disabled?: boolean;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<section id="ui-filter-tabs">
    <h2>ui-filter-tabs</h2>
    <div class="demos">
      <ui-filter-tabs [tabs]="filterTabs" [(active)]="activeFilterTab" />
      <p class="hint">
        Active: {{ activeFilterTab() }} — a tab with no count is DISABLED, which is
        the monitoring app rule: no data, no count, no click.
      </p>
    </div>
  </section>
```


## Provenance

REGISTER.md §41 (optional background — no Figma access required to use this component)
