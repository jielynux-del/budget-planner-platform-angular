# UiNavRailFooter

**Selector:** `[uiNavRailFooter]`

**Import**

```ts
import { UiNavRailFooter } from 'ai-dls-kit';
```

## Description

Marks the projected footer block of `ui-nav-rail` — sticky, 1px top rule,
8px top / 16px bottom padding (nav-rail.scss). Everything else (help,
notifications, profile, collapse toggle) is the consumer's own
`ui-nav-rail-item` rows projected inside it.

  <div uiNavRailFooter>…footer items…</div>

## API

_No inputs, models or outputs declared._

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
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
              <div ui-nav-rail-section label="Workspace"></div>
              <div>
                <button
                  ui-nav-rail-item type="button" class="item" label="Team Management" [expanded]="true"
                  [group]="true" [active]="true"
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

_Not recorded._
