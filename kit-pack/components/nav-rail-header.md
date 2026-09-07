# UiNavRailHeader

**Selector:** `[uiNavRailHeader]`

**Import**

```ts
import { UiNavRailHeader } from 'ai-dls-kit';
```

## Description

Marks the projected header block of `ui-nav-rail` — the 72px row holding
the logo mark (collapsed/with-labels) or mark + wordmark (expanded).
A pure content-projection marker, no behaviour of its own.

  <div uiNavRailHeader>…mark + wordmark…</div>

## API

_No inputs, models or outputs declared._

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<!-- Collapsed — 72px -->
        <div class="nav-rail-demo-frame">
          <nav ui-nav-rail class="nav-rail-demo">
            <div uiNavRailHeader>
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
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

_Not recorded._
