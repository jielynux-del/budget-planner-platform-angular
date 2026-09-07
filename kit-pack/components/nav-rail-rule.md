# UiNavRailRule

**Selector:** `div[ui-nav-rail-rule]`

**Import**

```ts
import { UiNavRailRule } from 'ai-dls-kit';
```

## Description

DLS `nav-side/item` "Rule" row (REGISTER.md §29) — a 32px-min
divider row holding a centred 1px hairline `--color-border-dim`. 56px wide
when collapsed/with-labels (mirrors the 56px indicator it sits under);
full width minus 8px side pads when the rail is expanded.

  <div ui-nav-rail-rule [expanded]="expanded()"></div>

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `expanded` | `(inferred)` | `false` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
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
            </div>
          </nav>
          <p class="hint">Collapsed — 72px, icon-only. The last row is a selected group with its flyout forced open for measurement.</p>
        </div>

        <!-- Expanded — 240px -->
        <div class="nav-rail-demo-frame">
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §29 (optional background — no Figma access required to use this component)
