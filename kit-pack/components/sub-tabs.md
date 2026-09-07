# UiSubTabs

**Selector:** `ui-sub-tabs`

**Import**

```ts
import { UiSubTabs } from 'ai-dls-kit';
```

## Description

Second-level tab strip — DLS `sub-tab` / `sub-tab-group`
(REGISTER.md §41, `sub-tab` node 137463:4521, `sub-tab-group`
node 137463:4568, audited 4 Sep 2026): a 32px neutral-fill pill strip
that sits UNDER a page-level `ui-tabs` bar. No existing kit piece has
this anatomy — `ui-filter-tabs` is a bordered/outlined pill,
`ui-segmented` is one inset track — so this is a genuinely new
component, not a variant of either (see their own doc comments, which
make the equivalent argument against being folded into `ui-tabs`).

  <ui-sub-tabs [tabs]="subTabs" [(active)]="activeSubTab" />

Same `tabs`/`active` API SHAPE as `ui-tabs` (deliberately — one mental
model for "a row of switchable views" across the kit) but its own
`UiSubTab` interface: `disabled` exists here and not on `UiTab` because
DLS's sub-tab anatomy carries a disabled state and the page-level tab bar
never has one at any of its eight call sites.

**Group** (137463:4568): 24px horizontal / 8px vertical padding, 8px gap
(`--gap-unit-h`) between pills.
**Tab** (137463:4521): 32 tall, 12px h-padding (`--padding-action-h-md`),
4px internal gap (`--gap-unit-inline-h`), radius `action-alt` 4
(`--border-radius-action` — the two share the same 4px value in this
scale). Label `label(sm)`.
**Active** = bg `--color-bg-neutral` (#dde3e7), label
`--color-text-strong`, badge bg `--color-bg-inverse` (#59656d) / text
`--color-text-inverse` (white).
**Inactive** = transparent, label + badge text `--color-text-subtle`,
badge bg stays `--color-bg-neutral` (only the TEXT recolours between
active/inactive, not the badge fill).
**Badge**: 16 tall, min-width 16, `label(xs)` — same DLS badge geometry
as the page-level `ui-tabs` badge, just recoloured per state above.
**States**: DLS lists Default | Hover | Focus | pressed. Hover/pressed
values were not called out with their own hex in the harvest, so this
follows the kit's own established hover/pressed roles
(`--color-bg-hover` #eef2f5 / `--color-bg-pressed` #dde3e7 — the same
`ui-filter-tabs`/`ui-checkbox` convention), applied to INACTIVE tabs
only (an active pill already reads as "selected" via its neutral fill;
DLS doesn't define an Active+Hover treatment). Focus-visible = 2px
`--color-focus` ring, the kit's standard.

── Keyboard ──────────────────────────────────────────────────────────
Same roving-tabindex contract as `ui-tabs`/`ui-segmented`: one tab stop,
arrows MOVE and ACTIVATE, disabled entries are stepped over rather than
landable.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `tabs` (required) | `UiSubTab[]` | — |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `active` | `string` | — |

## Types

```ts
export interface UiSubTab {
  key: string;
  label: string;
  count?: number | string;
  /** Inert: no pointer, no keyboard stop, no selection. */
  disabled?: boolean;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
5 tabs, one carrying a count (<code>Pending</code>), one disabled (<code>Rejected</code>).
</p>
<div id="sink-sub-tabs" class="demo-host">
  <ui-sub-tabs [tabs]="subTabsData" [(active)]="subActive" />
</div>
```


## Provenance

REGISTER.md §41 (optional background — no Figma access required to use this component)
