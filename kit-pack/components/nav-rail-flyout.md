# UiNavRailFlyout

**Selector:** `ui-nav-rail-flyout`

**Import**

```ts
import { UiNavRailFlyout } from 'ai-dls-kit';
```

## Description

DLS collapsed-rail flyout (REGISTER.md §29, 192450:1179 —
Expand=No, Selected, Sub-items=Yes): the panel a collapsed GROUP item's
sub-items appear in, since the 72px rail has no room to show them inline.

  <div class="item-wrap">
    <button ui-nav-rail-item [group]="true" …></button>
    <ui-nav-rail-flyout>
      <button ui-nav-rail-sub-item …></button>
    </ui-nav-rail-flyout>
  </div>

240px wide, `--color-bg-dim-hover` (dim_alt #303c44 — same tone as the
collapsed selected parent band, DLS 192450:1179), radius 8
(`--radius-md`), `--shadow-elevation-4`, 12px h / 8px v padding.

`position: fixed`, positioned in JS off `getBoundingClientRect()` of the
host's own DOM PARENT — NOT `position: absolute`
against a `position: relative` wrapper, which is what shipped first and
broke: the rail body scrolls (`overflow-y: auto`), and the CSS spec
forces `overflow-x: hidden` on an ancestor whenever `overflow-y` is
`auto` (register §29's "flex-shrink / overflow-hidden trap"), so an
absolutely-positioned panel measured correctly but was painted CLIPPED —
`document.elementFromPoint` at its centre hit the page behind it, and a
real click on a sub-item fell through and navigated the page instead
(lead's first live-app finding, 3 Sep 2026). `position: fixed` escapes
that clip entirely (its containing block is the viewport, not any
scrolling ancestor).

VISIBILITY is fully JS-owned — NOT a CSS `.item-wrap:hover
.ui-nav-rail-flyout { display: flex }` rule. That was the second thing
that shipped and broke: the wrapper's own `::after` hover-bridge (meant
to keep `:hover` alive across the 8px gap to this now-`fixed` panel) is
ALSO a descendant of the same `overflow-x: hidden` rail body, so it was
clipped exactly like the panel itself — `elementFromPoint` in the bridge
zone hit the page, not the bridge, `.item-wrap:hover` never went true
past the row's own edge, and the panel could never be reached (lead's
SECOND live-app finding, same session). Instead: `mouseenter`/`focusin`
on the anchor (native listeners — Angular's `(mouseenter)` binding only
reaches the HOST, not an arbitrary DOM ancestor) opens the panel and
repositions it; `mouseleave`/`focusout` on EITHER the anchor or the panel
itself schedules a close after `CLOSE_DELAY_MS`, cancelled if the pointer
(or focus) lands back on either before it fires — that delay is what
survives the gap-crossing instant when the pointer is over neither.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `open` | `(inferred)` | `false` |

## Slots

- Default (unnamed) content projection
- `select="[uiNavRailFlyoutSection]"`


## Example

From the kit's kitchen sink:

```html
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
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §29 (optional background — no Figma access required to use this component)
