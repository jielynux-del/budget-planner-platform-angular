# UiTabs

**Selector:** `ui-tabs`

**Import**

```ts
import { UiTabs } from 'ai-dls-kit';
```

## Description

Canonical tab bar — DLS `tab` / `tab-group` (REGISTER.md
§41, Figma 305:2714 page, `tab` node 421:23, `tab-group` node
76086:350921, audited 4 Sep 2026). Grown from the original 40px/label(md)
bar to the full DLS anatomy while keeping the `tabs`/`active` API frozen
— eight app templates bind it today and none of them
changes shape from this round.

  <ui-tabs [tabs]="tabs" [(active)]="activeTab" />                          <!-- unchanged, "plain" -->
  <ui-tabs [tabs]="tabs" [(active)]="activeTab" size="md" variant="panel" />

── `size` — DLS Small (40, default) | Medium (48) ──────────────────────
Height only; label stays `label(md)` at both sizes (DLS doesn't resize
the type between them, only the row).

── `variant` — geometry opt-in, NOT a states opt-in ─────────────────────
`plain` (default) = today's look: no host padding, the pre-existing 1px
`--color-border-decorative` rule under the WHOLE bar, `--color-bg-level1`. Exists so the
eight callers — several of which apply their OWN `padding-left` directly
to the `ui-tabs` host — stay
pixel-stable with zero changes at the call site.
`panel` = the full DLS `tab-group` chrome: `--color-bg-level2`, 24px
horizontal padding (`--padding-panel-h-lg`), `--shadow-sticky-top`
(matches the harvested "elevation-sticky-top" — 0 1px 0 rgba(23,24,26,.05)
+ 0 2px 0 rgba(23,24,26,.03) — EXACTLY; the token already existed in
`styles/tokens.css`, no gap here), no bottom rule (the shadow
IS the DLS separator).
Per-TAB states (hover rule, selected underline, focus ring, badge) are
NOT gated by `variant` — the brief scopes the opt-in to "padding/
elevation" only, so a `plain` bar still gets the real DLS states; only
the outer bar's paint/padding stays legacy.
The 24px gap BETWEEN tabs is unconditional in both variants — the
pre-existing code already ran it at 24 (see the `.strip` rule for why it
is raw, unchanged reasoning carried forward from the pre-growth file).

── Badge ─────────────────────────────────────────────────────────────
16 tall, min-width 16, 4px h-padding (`--padding-indicator-h-md`), pill
radius, bg `--color-bg-neutral` (#dde3e7, matches DLS
`background-neutral` exactly). Text: DLS names this role plain
`color/text` (unqualified) — this token set has only
`-strong`/`-body`/`-subtle`/`-disabled`, no bare `--color-text`.
`--color-text-body` (#455057) is used as the nearest existing "default,
unqualified" role. TOKEN GAP — report to the lead; `--color-text` may be
worth harvesting as its own primitive if DLS uses the bare role again.

── Overflow scroll affordance ───────────────────────────────────────────
`.strip` is the real scroll container (`overflow-x: auto`, native
scrollbar hidden). Two signals — `canScrollLeft` / `canScrollRight` —
drive two 40×40 gradient chevron tiles, absolutely pinned to the host's
padding edges, present ONLY while their direction has more to reveal. A
`ResizeObserver` on the strip catches container-size changes (sidebar
collapse, window resize); a `tabs()`-keyed effect re-measures after the
tab list itself changes shape (adding/removing tabs changes
`scrollWidth`, which `ResizeObserver` does NOT report since the
container's own box is unchanged). Chevron clicks scroll by a plain
synchronous `scrollBy` (not `behavior: 'smooth'`) so `scrollLeft` is
already updated by the time a caller — or an e2e spec — reads it back.

── Keyboard ──────────────────────────────────────────────────────────
`role="tablist"` on the host, `role="tab"` + `aria-selected` per button
(neither existed before this round). One roving tab stop on the active
tab; ArrowLeft/ArrowRight/Home/End both MOVE focus and ACTIVATE the tab
(DLS's tab bar switches the page view, so — same contract as
`ui-segmented`'s radiogroup — there is no "browse without committing"
state to preserve).

**On `UiTab.iconPath`.** That input takes a raw SVG path string, and its comment in the Types section below — "this kit has no icon registry" — predates `ui-icon` and the 570-name catalogue, which the kit now ships. Do not read it as licence to hand-draw a glyph (RULES.md #12): prefer a tab with no icon, or ask for the input to be moved onto an icon name.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `tabs` (required) | `UiTab[]` | — |
| `size` | `'sm' | 'md'` | `'sm'` |
| `variant` | `'plain' | 'panel'` | `'plain'` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `active` | `string` | — |

## Types

```ts
export interface UiTab {
  key: string;
  label: string;
  count?: number | string;
  /**
   * Optional leading 24×24 icon, as an SVG `<path d>` string rendered
   * inside a fixed `viewBox="0 0 24 24"`.
   *
   * NOT an icon-registry name — this kit has no icon registry, so a name would resolve
   * nowhere. NOT a projected `TemplateRef<{$implicit: UiTab}>` either: that
   * would force every one of the eight existing callers to
   * either add a template they don't need or fight Angular's lack of a
   * clean per-array-item outlet, just so the ONE new icon demo can have
   * one. A raw path string keeps `ui-tabs` self-contained — one
   * `<svg><path/></svg>` per tab, nothing to register, nothing to wire at
   * call sites that never touch it (`iconPath` stays `undefined`).
   */
  iconPath?: string;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<section id="ui-tabs">
    <h2>ui-tabs</h2>
    <div class="demos">
      <ui-tabs [tabs]="tabs" [(active)]="activeTab" />
      <p class="hint">Active: {{ activeTab() }}</p>
    </div>
  </section>
```


## Provenance

REGISTER.md §41 (optional background — no Figma access required to use this component)
