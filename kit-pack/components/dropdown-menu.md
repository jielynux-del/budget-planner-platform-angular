# UiDropdownMenu

**Selector:** `ui-dropdown-menu`

**Import**

```ts
import { UiDropdownMenu } from 'ai-dls-kit';
```

## Description

DLS 3.1 `dropdown-menu` (set 53775:283622, REGISTER.md §16,
audited 2 Sep 2026) — the shared popover surface `ui-kebab-menu`, the
`ui-breadcrumb` overflow popover and `ui-multi-select`'s panel all
delegate to (register item 16, built 2 Sep 2026). 200px min-width, bg
`--color-bg-level1`, radius `--radius-md` (8, DLS panel-lg),
`--shadow-elevation-3`, 4px vertical inset padding around the item list.

  <ui-dropdown-menu>
    <button ui-dropdown-item>View details</button>
    <button ui-dropdown-item>Edit</button>
  </ui-dropdown-menu>

**`role`** — `menu` (default) | `listbox`, set on the item-list wrapper;
callers building a single/multi-select listbox pass `role="listbox"`.

**`width`** — overrides the 200px default (e.g. a wider account menu, or
`ui-multi-select`'s `max(320px, 100%)` "320 or the trigger's width,
whichever is larger" rule) via a direct `[style.width]` binding, so it
always wins over the class-level `min-width: 200px` regardless of
stylesheet load order.

**`[uiDropdownMenuHeader]`** — the DLS "With header" variation: an
optional slot above the item list (16px h / 12px v-top padding, no
bottom padding/border, 8px gap to the list below) a caller projects a
search box and/or a Select all/Reset row into — see `ui-multi-select`'s
migration.

CORRECTION (owner review, 3 Sep 2026): the header drew a border-bottom
DLS doesn't have (dropped, replaced by the list's 8px top gap); an
ungrouped item list now gets the same 4px inset a grouped one gets from
its own group padding.

**Grouped Items variation** — wrap sibling items in
`<div ui-dropdown-group>`; dropdown-menu.scss adds each group's 4px
inset padding and, between consecutive groups, a 1px
`--color-border-decorative` top rule. Groups are content the CALLER's
own template projects in (their own Angular encapsulation, not this
component's), so reaching the sibling-group rule needs `::ng-deep` —
the same projected-content technique `ui-button`'s icon slots and
`ui-breadcrumb`'s popover already document.

POSITIONING (kit-fixes, defect A, 7 Sep 2026): every consumer used to
paint this panel with its OWN hand-placed `position: absolute; top: …`
. `absolute` resolves against the
nearest positioned ancestor, so any `overflow: hidden`/`auto` box between
the trigger and that ancestor — a scrolling table wrap, a clipped `td`, a
collapsed focus-overlay body — clipped the panel even though it MEASURED
correctly (`z-index` cannot fix this: it is a clip, not a stacking
problem, DLS_GAP_REGISTER's live App QC note on the System Access add-user
row). `ui-nav-rail-flyout` had already solved exactly this once
(nav-rail-flyout.ts's own docblock) — `position: fixed`, computed from the
ANCHOR's live `getBoundingClientRect()`, so the panel's containing block
is the viewport and no scrolling/clipping ancestor between them matters.
This component now owns that solution centrally instead of each of its
four consumers re-solving it.

ANCHOR: the element immediately BEFORE this component in the DOM — every
consumer's template already renders `<button class="trigger">…</button>`
(or, team-members' search box, a `<ui-search-input>`) directly followed by
`@if (open()) { <ui-dropdown-menu>… }`, so `host.previousElementSibling`
IS the trigger with no extra `anchor` input needed. If no previous
sibling exists the panel is left exactly as its own stylesheet paints it
.

Applied IMPERATIVELY via `nativeElement.style` (not Angular style
bindings) so a synchronous `getBoundingClientRect()` read — needed to flip
above the trigger when there's no room below, and to size an
`anchorWidth` panel to the trigger's own width — reflects the change
immediately; this app is zoneless, so a signal-driven style binding would
not repaint in time for that same-frame measurement (`ui-popover`'s own
`position()` uses the identical direct-DOM-write technique, popover.ts).

`width` — an exact CSS width (e.g. system-access's `width="239px"`,
unchanged). `anchorWidth` — DLS's "the trigger's own width, or
`minAnchorWidth`, whichever is larger" rule (`ui-select`/`ui-multi-select`
; replaces the old `width="max(200px, 100%)"` string, which relied on the
panel being `position: absolute` inside a same-width positioned ancestor
— a `%` width means something different once the containing block becomes
the viewport). `align` — `'start'` (default, panel's LEFT edge under the
trigger's left edge) or `'end'`. `gap` — the px offset below the trigger, MEASURED
ON SCREEN from the anchor's own bottom edge to this panel's own top edge
(the host itself carries no padding of its own — `.ui-dropdown-menu-list`'s
4px inset is inside the panel's box, so it does not add to this distance;
verified live via `getBoundingClientRect()` on both elements, not assumed
— DLS_GAP_REGISTER.md §16's kit-fixes note, 7 Sep 2026). Select and
multi-select both read 8 (select's own `gap="6"` binding under-measured
DLS's 8px baseline and was corrected the same round); kebab-menu/
breadcrumb read 4, their own smaller DLS spec — each kit consumer passes
its own value to hold its intended spacing exactly.

RESIZE/SCROLL: `window:resize` and a document-level CAPTURE-phase
`scroll` listener both call `reposition()` so the panel tracks its
anchor rather than visually detaching from it — `capture: true` is
required because `scroll` does not bubble, and the anchor's own
scrolling ancestor (the table wrap in the reported bug) is exactly the
kind of listener target a bubble-phase document listener would miss. A
scroll that originates INSIDE the panel itself (browsing a long option
list, or its search header) is ignored — `elementRef.nativeElement.
contains(event.target)` — so browsing the list never fights its own
reposition.

PORTAL (kit-fixes, defect D, 7 Sep 2026): `position: fixed`'s containing
block is the nearest ancestor that establishes one — and an ancestor with
a `transform` does exactly that (CSS spec), same as a `filter`/
`perspective`/`contain`/`will-change` ancestor would. `ui-drawer`
(drawer.scss, `.panel`) and `ui-modal-shell` (modal-shell.scss, `.panel`)
both animate their entrance with `transform: translateX(...)` /
`translateY(24px)` — and BOTH keyframes end on a non-`none` transform
(`translateX(0)` / `translateY(0)`) with `animation-fill-mode: both`, so
the containing-block capture OUTLIVES the entrance animation, it is not a
transient mid-animation glitch. A dropdown-menu opened from a trigger
inside either one had its containing block silently become that
transformed `.panel`, not the viewport — while `reposition()` below
computes `top`/`left` as VIEWPORT coordinates (`getBoundingClientRect()`
is always viewport-relative). The panel therefore landed in the wrong
place — observed as a `ui-multi-select` panel inside a drawer painting
directly ON TOP of its own trigger, intercepting the click meant to close
it (trade-monitoring sign-off rework, f24 spec).

Fix: on open, `hasTransformingAncestor()` walks up from the ANCHOR checking `transform`/
`perspective`/`filter`/`willChange`/`contain` on every ancestor up to
`document.body`. Only when one is found does the host get physically
reparented to `document.body` (`Renderer2.appendChild` — the same
Angular-aware API `ui-tooltip`'s panel-append already uses); Angular's
view/DOM bookkeeping is unaffected by a component's host moving in the
live DOM (bindings, `(click)` handlers into projected content and
`DestroyRef` cleanup all resolve through the VIEW tree, not DOM position
— the same guarantee the CDK overlay pattern relies on), so no extra
teardown is needed: when a consumer's `@if (open()) { <ui-dropdown-menu>…
}` flips false, Angular destroys the view and removes the host from
whatever DOM parent it currently sits in, same as it would from its
original spot.

THIS IS DELIBERATELY CONDITIONAL, not "always portal" — an earlier build
of this fix portalled unconditionally and broke a much wider surface: four
kit consumers (`ui-select`, `ui-multi-select`, `ui-kebab-menu`, `ui-
breadcrumb`) and several `app/pages/**` "action-menu" callers close their
panel on an outside click via `host.nativeElement.contains(event.target)`
or `event.target.closest('.action-wrap')` — checks that assume the panel
is still a DOM DESCENDANT of the trigger's own wrapper. Portalling EVERY
panel to `document.body` breaks that assumption for all of them at once
(every click inside the panel reads as "outside" and closes it before its
own handler runs) even though only drawer/modal-shell consumers actually
have the containing-block bug. Portalling only when a transforming
ancestor is actually present keeps every ordinary page-level menu
(nothing in its ancestry sets `transform`) on its ORIGINAL, un-portalled
path — `contains()`/`closest()` keep working exactly as before — and
limits the blast radius to the few consumers that render inside a
`ui-drawer`/`ui-modal-shell`, which is where PORTAL_ANCHOR below picks up.

PORTAL_ANCHOR: a plain JS property (not a DOM attribute — no need for it
to be inspectable outside this module) set on the host element WHEN, and
only when, it is portalled, holding the anchor it was positioned against.
`isInsideDropdownOwner()` (exported below) is how a consumer's own
outside-click check stays correct even for a portalled panel: it falls
back to walking from the click target up to the nearest `.ui-dropdown-
menu` ancestor and asking whether THAT panel's stored anchor sits inside
the container being tested, rather than asking whether the panel itself
is a DOM descendant of it. Every kit consumer whose own outside-click
check gates on `ui-dropdown-menu` containment (`ui-select`, `ui-multi-
select`, `ui-kebab-menu`, `ui-breadcrumb`) uses it instead of a bare
`.contains()` for exactly this reason.

Skipped entirely when there is no anchor (`host.previousElementSibling`
is null) — the panel is left exactly where it rendered, matching
`reposition()`'s own "unknown caller, don't guess" fallback.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `role` | `UiDropdownMenuRole` | `'menu'` |
| `width` | `string` | — |
| `anchorWidth` | `(inferred)` | `false` |
| `minAnchorWidth` | `(inferred)` | `200` |
| `align` | `UiDropdownMenuAlign` | `'start'` |
| `gap` | `(inferred)` | `6` |
| `zIndex` | `(inferred)` | `1100` |

## Types

```ts
export type UiDropdownMenuRole = 'menu' | 'listbox';
```

```ts
export type UiDropdownMenuAlign = 'start' | 'end';
```

## Slots

- Default (unnamed) content projection
- `select="[uiDropdownMenuHeader]"`


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <p class="hint">Basic menu — icon, avatar, trailing toggle, disabled, loading:</p>
      <div class="row dd-basic-row">
        <ui-dropdown-menu>
          <button ui-dropdown-item (click)="lastDropdownPick.set('View details')">
            <ui-icon uiDropdownIcon name="…" />
            View details
          </button>
          <button ui-dropdown-item (click)="lastDropdownPick.set('Aiko MORI')">
            <ui-avatar uiDropdownAvatar name="Aiko MORI" colour="goji" size="xs" />
            Aiko MORI
          </button>
          <button ui-dropdown-item (click)="lastDropdownPick.set('Autosave')">
            <span>Autosave</span>
            <ui-switch uiDropdownTrailing [(checked)]="dropdownAutosave" />
          </button>
          <button ui-dropdown-item disabled>Archived (disabled)</button>
          <button ui-dropdown-item [loading]="true">Syncing</button>
        </ui-dropdown-menu>
      </div>

      <p class="hint">With header + Grouped Items — one heading with back:</p>
      <div class="row dd-header-row">
        <ui-dropdown-menu>
          <ui-dropdown-heading back (backActivated)="lastDropdownPick.set('Back')">Team Management</ui-dropdown-heading>
          <div ui-dropdown-group>
            <ui-dropdown-heading>Recent</ui-dropdown-heading>
            <button ui-dropdown-item [selected]="true" (click)="lastDropdownPick.set('Global Markets')">Global Markets</button>
            <button ui-dropdown-item (click)="lastDropdownPick.set('FX Trading')">FX Trading</button>
          </div>
          <div ui-dropdown-group>
            <ui-dropdown-heading>All desks</ui-dropdown-heading>
            <button ui-dropdown-item (click)="lastDropdownPick.set('Rates')">Rates</button>
            <button ui-dropdown-item (click)="lastDropdownPick.set('Credit')">Credit</button>
          </div>
        </ui-dropdown-menu>
      </div>

      <p class="hint">menu-account — search header, Select all / Reset, multiselect rows (two selected):</p>
      <div class="row dd-account-row">
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §16 (optional background — no Figma access required to use this component)
