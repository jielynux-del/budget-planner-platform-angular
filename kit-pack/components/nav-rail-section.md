# UiNavRailSection

**Selector:** `div[ui-nav-rail-section]`

**Import**

```ts
import { UiNavRailSection } from 'ai-dls-kit';
```

## Description

DLS `nav-side/item` "Section" row (REGISTER.md §29) — a
32px-min group heading between items in the expanded rail: 8px h-pad +
a 16px left inset, 4px v-pad, uppercase `label(2xs)` 10px/500
`--color-text-on-dim-subtle`. The shell only mounts this row when the
rail is expanded (Section rows have no collapsed/with-labels
representation — DLS shows a bare `Rule` there instead, `ui-nav-rail-rule`).

  <div ui-nav-rail-section label="Workspace"></div>

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` | `(inferred)` | `''` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</button>
              <button ui-nav-rail-item type="button" class="item" kind="profile" label="Haruto Sato" [expanded]="true"></button>
              <div ui-nav-rail-rule [expanded]="true"></div>
              <div ui-nav-rail-section label="Workspace"></div>
              <div>
                <button
                  ui-nav-rail-item type="button" class="item" label="Team Management" [expanded]="true"
                  [group]="true" [active]="true"
                  (click)="navRailGroupOpen.set(!navRailGroupOpen())"
                >
                  <ui-icon uiNavRailIcon name="…" [size]="24" />
                  <span uiNavRailTrailing>
                    <ui-icon name="…" />
                  </span>
                </button>
                @if (navRailGroupOpen()) {
                  <button ui-nav-rail-sub-item type="button" class="sub-item" label="Profile & Mandates" [active]="true"></button>
                  <button ui-nav-rail-sub-item type="button" class="sub-item" label="System Access"></button>
                }
              </div>
            </div>
            <div uiNavRailFooter class="footer">
              <button ui-nav-rail-item type="button" class="item" label="Help & feedback" [expanded]="true">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
              <button ui-nav-rail-item type="button" class="item" label="Notifications" [expanded]="true" [badge]="2">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
              <button ui-nav-rail-item type="button" class="item" kind="profile" label="Haruto Sato" avatarColour="ginger" [expanded]="true"></button>
              <button ui-nav-rail-item type="button" class="item" label="Collapse view" [expanded]="true">
                <ui-icon uiNavRailIcon name="…" [size]="24" />
              </button>
            </div>
          </nav>
          <p class="hint">Expanded — 240px, with a Section row and an open Team Management group.</p>
        </div>

        <!-- With labels — 88px -->
        <div class="nav-rail-demo-frame">
          <nav ui-nav-rail class="nav-rail-demo" [withLabels]="true">
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §29 (optional background — no Figma access required to use this component)
