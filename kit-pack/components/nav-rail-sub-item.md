# UiNavRailSubItem

**Selector:** `button[ui-nav-rail-sub-item], a[ui-nav-rail-sub-item]`

**Import**

```ts
import { UiNavRailSubItem } from 'ai-dls-kit';
```

## Description

DLS `nav-side/sub-item` — Action row (REGISTER.md §29). A
group's child row in the expanded (240px) rail only — collapsed/with-
labels rails never show sub-items, same as the pre-kit rail's
`[collapsed] .sub-item { display: none }` behaviour (now simply: the shell
never renders these rows when the rail isn't expanded).

  <a ui-nav-rail-sub-item label="Profile & Mandates" [active]="isChildActive(child)"></a>

12px h-pad, 8px v-pad, radius `panel-md` 4px, `label(sm)` 13/500
`--color-text-on-dim-subtle` — white + `--color-bg-on-dim-pressed` when
`active`, `--color-bg-on-dim-hover` on hover. 240px wide.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` | `(inferred)` | `''` |
| `active` | `(inferred)` | `false` |
| `disabled` | `(inferred)` | `false` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
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
          <nav ui-nav-rail class="nav-rail-demo" [expanded]="true">
            <div uiNavRailHeader>
              <ui-icon name="…" [size]="24" />
              <span class="nav-rail-demo-wordmark">OPS PLATFORM</span>
            </div>
            <div class="body">
              <button ui-nav-rail-item type="button" class="item" label="Home" [expanded]="true" [active]="true">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
              <button ui-nav-rail-item type="button" class="item" label="Inbox" [expanded]="true" [badge]="5">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
              <button ui-nav-rail-item type="button" class="item" kind="profile" label="Haruto Sato" [expanded]="true"></button>
              <div ui-nav-rail-rule [expanded]="true"></div>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §29 (optional background — no Figma access required to use this component)
