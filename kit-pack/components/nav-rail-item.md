# UiNavRailItem

**Selector:** `button[ui-nav-rail-item], a[ui-nav-rail-item]`

**Import**

```ts
import { UiNavRailItem } from 'ai-dls-kit';
```

## Description

DLS `nav-side/item` (REGISTER.md §29, audited 3 Sep 2026) —
the primary rail's row. Applied as an attribute on the host element the
consumer already owns for navigation (`<button>` for an action,
`<a>` for a routed link) — same convention as `[ui-nav-sub-item]` — so the
shell keeps full control of click/routerLink wiring and its own `class`
list (the `.item` class the e2e suite locates on, see nav-rail.ts in the
shell).

  <button ui-nav-rail-item kind="default" label="Home" [expanded]="expanded()">
    <ui-icon uiNavRailIcon name="…" />
  </button>
  <button ui-nav-rail-item kind="profile" label="Aiko Mori" [expanded]="expanded()" avatarColour="goji" />
  <button ui-nav-rail-item kind="compact" label="Home"><ui-icon uiNavRailIcon name="…" /></button>

Anatomy: a 56×56 **indicator** (72px rail width minus 2×8px side pad)
holding a 24×24 glyph box — `<ng-content select="[uiNavRailIcon]">` for
`kind="default"`, a 24px `ui-avatar` for `kind="profile"`, or a 24px
initials tile for `kind="abbreviation"` — then, when `expanded()` is true,
a `label` at kit `label(sm)` 13/500 `--color-text-on-dim-subtle` (white
when `active`). `kind="compact"` (the 88px "With labels" rail) stacks
icon over a centred `label(2xs)` 10px caption instead, 64px tall, 12px
v-pad — driven by one CSS class swap (`.ui-nav-rail-item-compact`,
nav-rail-item.scss), not a second template.

States: hover `--color-bg-on-dim-hover` #455057; **active = a full-width
band** `--color-bg-on-dim-pressed` #59656d with NO radius (DLS spec, not
the old 44px rounded row); `:focus-visible` a 2px inset `--color-focus`
ring; `disabled` dims text/icon and blocks pointer events.

`badge` overlays the existing rail's notification chip on the glyph —
same offsets/anchoring as the pre-kit `.item-icon`/`.item-badge` pair
(see nav-rail-item.scss for the geometry rationale, ported verbatim).

The glyph box and label span also carry the pre-kit `.item-icon` /
`.item-label` classes alongside their new `.rail-item-*` names — several
e2e specs (f20/f23/f24) locate on those class names directly rather than
through the shell's own `.item` wrapper, so this component keeps both
rather than requiring every spec to be rewritten for a purely internal
rename.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `kind` | `UiNavRailItemKind` | `'default'` |
| `label` | `(inferred)` | `''` |
| `expanded` | `(inferred)` | `false` |
| `active` | `(inferred)` | `false` |
| `disabled` | `(inferred)` | `false` |
| `group` | `(inferred)` | `false` |
| `badge` | `number | null` | `null` |
| `avatarColour` | `UiAvatarColour` | `'goji'` |
| `abbreviation` | `(inferred)` | `''` |

See also: UiAvatarColour (components/avatar.md)

## Types

```ts
export type UiNavRailItemKind = 'default' | 'profile' | 'abbreviation' | 'compact';
```

## Slots

- `select="[uiNavRailIcon]"`
- `select="[uiNavRailTrailing]"`


## Example

From the kit's kitchen sink:

```html
<ui-icon name="…" [size]="24" />
            </div>
            <div class="body">
              <button ui-nav-rail-item type="button" class="item" label="Home" [active]="true">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
              <button ui-nav-rail-item type="button" class="item" label="Inbox" [badge]="5">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
              <button ui-nav-rail-item type="button" class="item" kind="profile" label="Haruto Sato"></button>
              <div ui-nav-rail-rule></div>
              <button ui-nav-rail-item type="button" class="item" label="the monitoring app">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
              <button ui-nav-rail-item type="button" class="item" kind="abbreviation" label="Global Markets"></button>

              <!-- Collapsed + selected group: DLS 192450:1179 — the parent's
                   dim_alt band plus its flyout, forced open with the demo-
                   only `[open]` input so both can be measured. -->
              <div class="nav-rail-demo-flyout-wrap">
                <button ui-nav-rail-item type="button" class="item" label="Team Management" [group]="true" [active]="true">
                  <ui-icon uiNavRailIcon name="…" [size]="24" />
                </button>
                <ui-nav-rail-flyout [open]="true">
                  <button ui-nav-rail-sub-item type="button" class="sub-item" label="Profile & Mandates" [active]="true"></button>
                  <button ui-nav-rail-sub-item type="button" class="sub-item" label="System Access"></button>
                </ui-nav-rail-flyout>
              </div>
            </div>
            <div uiNavRailFooter class="footer">
              <button ui-nav-rail-item type="button" class="item" label="Help & feedback">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
              <button ui-nav-rail-item type="button" class="item" label="Notifications" [badge]="2">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
              <button ui-nav-rail-item type="button" class="item" kind="profile" label="Haruto Sato" avatarColour="ginger"></button>
              <button ui-nav-rail-item type="button" class="item" label="Expand view">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §29 (optional background — no Figma access required to use this component)
