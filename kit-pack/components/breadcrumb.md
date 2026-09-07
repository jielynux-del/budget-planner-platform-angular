# UiBreadcrumb

**Selector:** `ui-breadcrumb`

**Import**

```ts
import { UiBreadcrumb } from 'ai-dls-kit';
```

## Description

DLS `Breadcrumb` (set 270365:28502, REGISTER.md §6, audited
2 Sep 2026) — one axis, Overflow menu False/True. Each non-current crumb
IS an instance of the DLS button at Variant=Plain, Size=Tiny (link node
270365:28531), so this component depends on `ui-button` shipping that
`variant="plain" size="tiny"` contract (register item 7, built
concurrently against the same brief). The ellipsis/overflow trigger IS an
instance of the DLS icon button at Size=Tiny (menu-button 1400:2542, no
label to give it) — `ui-icon-button size="tiny"` (register item 8; retired
`ui-button`'s stand-in `iconOnly` flag, which mis-coloured and mis-sized
the glyph — see REGISTER.md §8).

  <ui-breadcrumb [items]="crumbs" (navigate)="onCrumbClick($event)" />
  <ui-breadcrumb [items]="crumbs" [maxItems]="4" (navigate)="..." />

Overflow (`maxItems`, default 0 = never collapse; values below 2 also
never collapse — collapsing to fewer than 2 visible crumbs makes no
sense): once `items().length > maxItems()`, the row renders the FIRST
item, a separator, the ellipsis menu button, another separator, then the
LAST `maxItems - 1` items — DLS's own "Label / … / Label / Label" shape
(separator 1400:2554 ×2 either side of menu-button 1400:2542). Opening
the menu-button reveals every item strictly between the first crumb and
the visible tail, as `role="menuitem"` rows; choosing one emits
`navigate` and closes the popover, same as clicking a visible crumb.
Escape and an outside click also close it.

The CURRENT crumb (always the last item, whether or not it fell inside
the collapsed tail) renders as inert text — `--color-text-strong`, no
button chrome, `aria-current="page"` — never a `navigate`-emitting link.

Text sizes: the owner's ruling (2 Sep 2026, corrected mid-build from an
initial 14px brief) keeps the crumbs and the current crumb at the kit's
`type.label('sm')` — 13px/500 — rather than DLS's own "label/sm" 14px;
that 14px is a DLS-side naming quirk (its "sm" role is one step above
this kit's "sm" step), not something the platform inherits. The
separator keeps the kit's `type.label('md')` (14px/500) standing in for
DLS's own label/md 16px — this codebase's label scale
(tokens/_type.scss) has no 16px step, so 14 is the closest
existing one (see breadcrumb.scss).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `items` (required) | `UiBreadcrumbItem[]` | — |
| `maxItems` | `(inferred)` | `0` |

**Outputs**

| Name | Type |
| --- | --- |
| `navigate` | `UiBreadcrumbItem` |

## Types

```ts
export interface UiBreadcrumbItem {
  label: string;
  id?: string;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
renders.
      </p>
      <div class="row bc-flat-row">
        <ui-breadcrumb [items]="bcFlatCrumbs" (navigate)="onBcNavigate($event)" />
      </div>

      <h3>Overflow — <code>[maxItems]="4"</code></h3>
      <p class="hint">
        Seven crumbs collapsed to four: the first crumb, an ellipsis menu button holding the three
        hidden in between, then the last two crumbs plus the current one. The hidden crumbs are not
        in the DOM until the ellipsis is clicked; Escape or an outside click closes the popover
        again.
      </p>
      <div class="row bc-overflow-row">
        <ui-breadcrumb [items]="bcOverflowCrumbs" [maxItems]="4" (navigate)="onBcNavigate($event)" />
      </div>
      <p class="hint">Last navigated: <code>{{ bcNavigated() ?? '(none yet)' }}</code></p>

      <h3>Live call site</h3>
      <p class="hint">
        The one reference-app caller is the Profile &amp; Mandates side panel
        (<code>pages/mandates</code>) — "Team Management / Profile &amp; Mandates", two crumbs, no
        overflow. "Team Management" is a nav group rather than a route, so it carries no
        <code>(navigate)</code> handler there.
      </p>
    </div>
  </section>
```


## Provenance

REGISTER.md §6 (optional background — no Figma access required to use this component)
