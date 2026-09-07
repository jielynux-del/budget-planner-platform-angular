# UiCard

**Selector:** `ui-card`

**Import**

```ts
import { UiCard } from 'ai-dls-kit';
```

## Description

Canonical content card, grown ADDITIVELY onto the DLS 3.1 `card`
component (page 305:2702, set 166757:3384, REGISTER.md §9,
audited + built 2 Sep 2026 — the §8–§12 batch). White, radius-md 8,
elevation-2, all 36 existing callers keep rendering BYTE-IDENTICAL:

  <ui-card title="Deviation Details">…</ui-card>

The DLS set crosses Breakpoint × Content(Default|Empty) × Dividers —
this component answers Dividers only (Breakpoint is desktop-only here;
Content=Empty is composition with the existing `ui-empty-state`, not new
anatomy — see the Empty-content note below). Everything new is opt-in:

  <ui-card title="Trades" subtitle="12 flagged" [count]="12" dividers>
    <button ui-button variant="plain" size="small" ui-card-action>
      Label<ui-icon uiButtonIconRight name="…" />
    </button>
    …body…
    <div ui-card-footer>…arbitrary footer content…</div>
  </ui-card>

  <ui-card title="Desk Details" collapsible [(expanded)]="open">…</ui-card>

  <ui-card title="Trades" dividers footerAction="show-all"
    (footerActivated)="onShowAll()">…</ui-card>

**Layout model — the ONE thing that keeps 36 callers unchanged.** A card
is "flat" (the legacy shape: host owns a single 24px padding + 16px gap,
`.card-header`/`.card-body`/`.card-footer` own NO padding of their own —
exactly what the pre-existing markup produced) unless it needs to be
"sectioned" — header/body/footer as independent boxes with DLS's split
paddings (header `--padding-panel-h-lg`/`--padding-panel-v-md` 24/16,
body `--padding-panel-v-lg`/`--padding-panel-h-lg` 24/24, footer
`--padding-panel-h-lg`/`--padding-panel-v-sm` 24/12, min-height 48 — no
DLS step for 48, stays raw). `sectioned` (card.scss) is true when
`dividers()` OR `collapsible()` OR a footer is showing — i.e. whenever a
section needs its own visual box (a divider RULE to sit against, a
hover fill that must reach the card's edges, or a footer strip). None of
the 36 existing callers trip any of those three, so they stay on the flat
path untouched. `dividers` itself controls ONLY the 1px
`--color-border-decorative` rule lines (header bottom / footer top) —
it is a car separate axis from "sectioned", not a synonym for it; a
`collapsible` or footer-bearing card sections its padding even with
`dividers` left `false` (no lines drawn, still edge-to-edge boxes) since
a collapsible header's hover fill and a footer strip need to reach the
card's edges however the two are combined.

`.card-header` and `.card-body`/`.card-footer`'s LAST piece both carry
the full `--radius-md` (not just the touching corners) in sectioned mode
— same trick `ui-accordion` uses (accordion.scss's `:host` comment):
every section shares the SAME background as the host, so a redundant
radius on an interior corner is invisible, and the outer corner (top on
the header, bottom on whichever section is last) never squares off past
the host's own rounded silhouette during a hover fill.

**Header** (166757:3513) — `title` (kept, `heading(xs)` 16px — the
owner's compactness ruling carried from the accordion/badge rounds; DLS
prints 20px/heading-md for this role and is deliberately not chased),
optional `count` (a `ui-badge`, Low emphasis, `--gap-unit-h` after the
title — 166757:3522's "Accordion=Yes" count reading, reused as a plain
header count here too), optional `subtitle` (`body(sm)` 13px,
`--color-text-subtle`, 4px under the title row). Right side is ONE of:
a caller's own `[ui-card-action]` button — HIDDEN when `collapsible`, since
the two are mutually exclusive DLS states on the same slot — or, when
`collapsible`, a purely decorative 32px chevron cell (`.card-toggle`,
DLS's Accordion=Yes 166757:3522/166757:3530 reading: down collapsed, up
expanded/"Active"). It is `aria-hidden` and carries no click handler of
its own — the header ITSELF is the toggle (`role="button"`,
`aria-expanded`, `tabindex="0"`, Enter/Space), same pattern
`ui-accordion`'s header already uses, so there is no nested-interactive
control to stopPropagation against. Header Hover (`--color-bg-hover`,
166757:3530) applies only when `collapsible` — a header that cannot
open has nothing to hint at, same rule `ui-accordion`'s
`header-not-expandable` follows.

**Body** (178051:26789) — `bodyPadding` toggles DLS's "Default" (24/24,
the default) vs "No padding" (a table living inside a card) slot types.
"Without dividers" is not a third body mode here — it is simply what the
flat layout already does when `dividers` is `false`.

**Footer** (166757:3546) — min-height 48, split padding when sectioned,
a top rule when `dividers`. `footerAction` renders DLS's Show all / Show
more (+ chevron-down) / Show less (+ chevron-up), centred, emitting
`footerActivated`; `footerValue` renders the "With right content"
reading (166757:3571) — a right-aligned "value ›" button emitting
`footerValueActivated`, sharing the row with `footerAction` via a
left/right split (space-between) rather than the single centred button
`footerAction` alone gets. `footerLoading` (166757:3574) renders DLS's
three 8px dots at 1/.6/.2 opacity in `--color-icon` — the same glyph
`ui-button`'s own loading state draws, standalone here since a footer
has no button of its own to swap a label out of. A bare
`[ui-card-footer]` slot carries arbitrary footer content the three
helpers don't cover. The footer only APPEARS when one of the three
helper inputs is set — an `[ui-card-footer]`-only caller with none of
them set gets no footer box. DLS's whole-footer Hover
(`--color-bg-hover`) applies whenever `footerAction` or `footerValue` is
set — the row has something clickable in it; `footerLoading` alone is
not interactive and draws no hover.

**Empty content** (166757:3389) is composition, not new anatomy: put a
`ui-empty-state` in the default slot (see kitchen-sink's `#ui-card`
card-empty-row demo) — the illustration/title/body/action shape DLS
draws there is exactly what `ui-empty-state` already is.

`collapsible` + `expanded` (a `model()`, default `true` — matches every
pre-existing card, which has no way to be anything but "shown") is the
`ui-accordion`/`ui-nav-panel` two-way pattern: `[(expanded)]="open"`.
The body+footer collapse together via the SAME grid-rows track
animation `ui-accordion` uses (`.card-collapse`/`.card-collapse-inner`),
wrapped in `display: contents` when NOT collapsible so the wrapper adds
no box and no gap/geometry change for the 36 legacy callers that never
touch this input.

Docblock node refs for the record: set 166757:3384; header 166757:3513
(Accordion=Yes 166757:3522, Hover 166757:3530); body 178051:26789;
footer 166757:3546 (With right content 166757:3571, Loading 166757:3574);
Empty content 166757:3389.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` | `string` | — |
| `subtitle` | `string` | — |
| `count` | `number | string` | — |
| `dividers` | `(inferred)` | `false` |
| `bodyPadding` | `'default' | 'none'` | `'default'` |
| `collapsible` | `(inferred)` | `false` |
| `footerAction` | `UiCardFooterAction` | — |
| `footerLoading` | `(inferred)` | `false` |
| `footerValue` | `string` | — |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `expanded` | `(inferred)` | `true` |

**Outputs**

| Name | Type |
| --- | --- |
| `footerActivated` | `void` |
| `footerValueActivated` | `void` |

## Types

```ts
export type UiCardFooterAction = 'show-all' | 'show-more' | 'show-less';
```

## Slots

- Default (unnamed) content projection
- `select="[ui-card-action]"`
- `select="[ui-card-footer]"`


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <h3>Unchanged — today's plain card</h3>
      <div class="row card-basic-row">
        <ui-card title="Deviation Details">
          <p class="hint">Card body content — 24px padding, 16px gap, soft shadow. No dividers, no header anatomy beyond the title — exactly what every pre-existing caller still gets.</p>
        </ui-card>
      </div>

      <div class="spacer"></div>
      <h3>Full anatomy — dividers, count, subtitle, header action, footer</h3>
      <div class="row card-full-row">
        <ui-card title="Trades Awaiting Review" subtitle="Filtered to APAC desks" [count]="12" [dividers]="true" footerAction="show-all" (footerActivated)="cardFooterActionClicks.set(cardFooterActionClicks() + 1)">
          <button ui-button variant="plain" size="small" ui-card-action type="button">
            Label
            <ui-icon uiButtonIconRight name="…" />
          </button>
          <p class="hint">Body content sits in the 24/24 split padding. The header's 1px bottom rule and the footer's top rule are both <code>--color-border-decorative</code>.</p>
        </ui-card>
      </div>
      <p class="hint">"Show all" clicked {{ cardFooterActionClicks() }} time(s).</p>

      <div class="spacer"></div>
      <h3>Collapsible — whole header is the toggle</h3>
      <div class="row card-collapsible-row">
        <ui-card title="Desk Details" subtitle="FX Options — APAC" [collapsible]="true" [(expanded)]="cardCollapsibleExpanded">
          <p class="hint">Body (and footer, if any) collapse together via the same grid-rows animation as ui-accordion. Hover the header — the whole row tints, not just the chevron cell.</p>
        </ui-card>
      </div>
      <p class="hint">expanded = {{ cardCollapsibleExpanded() }}</p>

      <div class="spacer"></div>
      <h3>Footer types</h3>
      <div class="row card-footers-row wrap">
        <ui-card title="Show more" footerAction="show-more" (footerActivated)="cardFooterActionClicks.set(cardFooterActionClicks() + 1)">
          <p class="hint">Centred, chevron-down.</p>
        </ui-card>
        <ui-card title="Loading" [footerLoading]="true">
          <p class="hint">Three 8px dots, --color-icon, 1/.6/.2 opacity.</p>
        </ui-card>
        <ui-card title="With right content" [footerValue]="'Right value'" (footerValueActivated)="cardFooterValueClicks.set(cardFooterValueClicks() + 1)">
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §9 (optional background — no Figma access required to use this component)
