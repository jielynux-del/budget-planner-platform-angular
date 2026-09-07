# UiPageHeader

**Selector:** `ui-page-header`

**Import**

```ts
import { UiPageHeader } from 'ai-dls-kit';
```

## Description

`ui-page-header` — the DLS 3.1 Enterprise page header (§49, page
`77398:124984`), the shared chassis every page-level title on the
platform should sit inside. `h1[ui-page-title]` is TYPOGRAPHY ONLY by
its own doc comment ("layout — truncation, header height, padding —
belongs to the host page, never here"); this component is now that
host, composing `ui-page-title` + `ui-status-tag` + `ui-avatar` +
`ui-icon-button` rather than re-drawing any of their anatomy.

  <ui-page-header title="the monitoring app">
    <button uiPageHeaderActions ui-button variant="secondary" size="tiny">Export</button>
    <button uiPageHeaderActions ui-icon-button size="small" outline aria-label="More options">…</button>
  </ui-page-header>

  <ui-page-header type="tabs" title="the reference app" avatarName="Tanaka Hiroshi" statusTag="Live">
    <ui-tabs uiPageHeaderTabs [tabs]="tabs" [(active)]="activeTab" />
  </ui-page-header>

── Chassis (Desktop only) ────────────────────────────────────────────
bg `--color-bg-level2`, 1px `--color-border-decorative` bottom rule,
40px horizontal / 16px vertical padding (`--padding-panel-h-xl` /
`--padding-panel-v-md` — both already existed, no new tokens), 16px
gap between rows. The 40px DELIBERATELY matches the owner's own
grey-area content rule (24 top/bottom, 40 left/right) — see
`tokens/layout`'s `content-padding` mixin — so a page header sits flush
with the content beneath it; that mixin itself is not used here because
its own vertical side is 24, not this component's 16.

── `header-text` (shared by every type except Homepage) ─────────────
Optional 48px `ui-avatar` (`size="lg"`) + 16px gap + a text column
(4px gap, min-height 32, same shape `ui-drawer`'s `.title-group` and
`ui-table-header`'s `.caption` already use) = a title row (8px gap)
holding `h1[ui-page-title]` + an optional `ui-status-tag`, then an
optional subtitle in `type.body(md)` `--color-text-body` — DLS names
this role plain, unqualified `color/text`; this token set has no bare
`--color-text` (see `ui-tabs`'s badge for the same substitution and the
same recorded TOKEN GAP), so `-body` stands in as the nearest
"default, unqualified" role.

`back` renders a 32px `ui-icon-button` (24px chevron-left) pulled
`margin-left: -8px` ahead of the header-text — the exact optical-align
value `ui-table-header`'s own `.back` already uses for this identical
32-box/24-glyph pairing (`ui-drawer`'s equivalent trick pulls -4px
instead; the two existing DLS harvests disagree by 4px on the same
geometry, and this component follows the more recent, more literally
specified `ui-table-header` number rather than re-deriving one from
inset math). Input `back` is a plain boolean; the output is ALIASED
back onto the same name (`(back)`, not `(backActivated)`) per the
brief's literal contract — Angular's `output({ alias })` makes this
safe despite the shared name, since the class field itself is
`backActivated` (no duplicate-identifier collision) while the template
binding surface reads `back` / `(back)`, matching `ui-drawer` and
`ui-table-header`'s shared vocabulary for the SAME concept.

── Actions cluster (`[uiPageHeaderActions]`, 8px gap, right-aligned) ──
OWNER'S RULING (5 Sep 2026): secondary buttons keep the KIT's existing
12px padding (`ui-button`'s own default), NOT DLS's own 24px, "because
The reference app uses the tiny button size" — so this component adds NO local
padding override; the caller's `button[ui-button]` already lands on
the right value with zero extra CSS. Trailing icon-only actions reuse
the kit's EXISTING `outline` boolean on `ui-icon-button` (already
harvested from DLS's Outline axis) — again nothing new here, the
caller just writes `outline`.

── The other five region slots ───────────────────────────────────────
`[uiPageHeaderBreadcrumb]` — a projected `ui-breadcrumb`, sharing its
row with `[uiPageHeaderActions]` (Types `breadcrumb` / `breadcrumb-tabs`).
`[uiPageHeaderDropdowns]` — one or more tiny PLAIN `button[ui-button]`s
with a trailing `uiButtonIconRight` chevron-down (DLS has no dedicated
dropdown-button component in this kit; `ui-button variant="plain"
size="tiny"` is the closest existing shape, per the register's own
call — report if a future round wants a real popover behind it). Same
row as actions.
`[uiPageHeaderTabs]` — a projected `ui-tabs` (its default `plain`
variant already carries zero horizontal padding, so it lands flush
with the chassis's own 40px inset with no extra CSS here — "do NOT
build a second tab bar" per the brief). `[uiPageHeaderStepper]` — a
projected `ui-tracker[orientation="horizontal"]` wrapping
`ui-tracker-step`s. Both sit in the SAME `.ph-strip` row, below
header-text, never padded locally.

── The bottom rule is the HOST's, on every type (walk item 2, 6 Sep) ──
The 1px `--color-border-decorative` bottom border is drawn by the host
element, edge to edge OUTSIDE the 40px padding, for all nine types
except Homepage. On the three tab types the strip is the last row with
zero padding beneath it, so the host rule sits directly under the
40px tab strip; the projected `ui-tabs`'s own bottom rule (which would
be inset 40px, stopping short of the edges) is suppressed via
`::ng-deep` in page-header.scss so exactly ONE line shows.

── The 24px content gap is the HEADER's too (lead ruling R2, 6 Sep) ──
The house rule is 24px between a page header and the content below it,
and it must not scroll away. Every page used to spend its scroller's own
`padding-top: 24px` (`layout.content-padding`'s top side) on it, and a
scroller's padding travels with its content — so the first row slid up
and touched the bottom rule on the first wheel tick. Walk item 15 patched
three named pairs; P3 found five more with the identical bug. So this
component carries it: a 24px `margin-bottom` (MARGIN, so it sits outside
the full-bleed bottom rule of item 2 and reads as grey rather than as
more header surface) on all eight non-Homepage types. Homepage — a
full-bleed band with no rule — keeps zero.

CONSUMING PAGES MUST NOW SET THEIR SCROLLER'S `padding-top: 0`
(`layout.content-padding($scroll: true)` still supplies the 40px sides
and the bottom); a page that keeps its own 24 will render 48. Two pages
already carry a hand-written 24px header override from walk item 15
(`orders.scss` `.page-header { margin-bottom: 24px }` and
`special-requests.scss`'s equivalent) — those come OUT, they are this
rule now. Watch for a parent that is a flex/grid COLUMN WITH ITS OWN
`gap`: the margin adds to the gap rather than replacing it.

── `contentGap="none"` — when the next sibling is not content (R5) ────
R2's 24px is the header→CONTENT gap. A header whose next sibling is
page CHROME rather than a scrolling content region wants zero, and
`contentGap="none"` is that seam: it sets `margin-bottom: 0` and adds
the host class `ph--gap-none`. The shape it exists for is
`the reference app/pre-submission document`, whose header is followed by a two-pane flex ROW
— a 320px white section navigator with its own `border-right` beside the
main scroller. R2's margin there would drop a full-width grey
`--color-bg-app` band between the header's rule and the SIDEBAR,
detaching a piece of chrome meant to sit flush; the only element that
wants the 24 is `.main-scroll`, two levels down, which already has it.
Same test for any future page: does the element directly under the
header scroll? If not, this input; if yes, leave it `default`.

THIS IS THE ONLY WAY TO OPT OUT. A page must NOT go back to overriding
the margin from its own stylesheet — a per-page `margin-bottom` on a kit
component is exactly what R2 abolished, and the reason the gap moved
here was that page-side copies of it kept drifting and kept coming back
wrong on new pages. An opt-out written as an input is one grep away and
carries its reason with it; an opt-out written in a page's scss is not.
`type="homepage"` needs neither: it forces zero on its own, whatever
`contentGap` says (`:host(.ph--homepage)`, below the base rule in
page-header.scss, is (0,2,0) against the bare `:host`'s (0,1,0)).

KNOWN KIT TRAP avoided (documented in `ui-table-header`'s own doc
comment and hit repeatedly across this kit): every `<ng-content
select="…">` above appears EXACTLY ONCE in the template, unconditionally,
in a fixed DOM position — never duplicated across `@if`/`@switch`
branches, which would project content into only the FIRST branch in
source order and silently drop the rest. The nine `type()` values
change ONLY which named CSS grid area each fixed region lands in (see
page-header.scss) and whether an empty region collapses via `:empty`
(the same always-render-let-:empty-collapse pattern `ui-drawer`'s
footer and `ui-alert`'s actions slot use) — never which elements exist.

── Homepage — the one type that differs ──────────────────────────────
A full-bleed band, 40/24 padding (not the chassis's 40/16) and no
bottom border. CORRECTED round 43 (node 79603:128074, live Figma
session): DLS's own band is a licensed Unsplash photograph
(milad-fakurian-E8Ufcyxz514-unsplash) with two blurred ellipse SVGs
over it, NOT a gradient — a prior pass invented three saturated hexes
and mislabelled them DLS stops. A white-label kit can't ship a
licensed photo, so this component's default is an honest, soft
token-based wash instead (tokens.css, "Page header — Homepage band"),
exposed as an OVERRIDABLE seam (`--ui-page-header-homepage-bg`,
page-header.scss) so a product can supply its own art without forking
this component. An `eyebrow` line (`label(sm)`), a greeting (bound to
`title`, `heading(sm)` semibold) and `subtitle` (`body(md)`), all in
`--color-text-on-dim` (white) — deliberately NOT `h1[ui-page-title]`,
whose color is hard-coded `--color-text-strong` inside its own
encapsulated stylesheet and so cannot be repainted white from outside.
That is the one place this component does NOT compose `ui-page-title`;
everywhere else it does — but it still types the greeting through the
kit's `heading()` role mixin, never a raw px size. `avatar`/`statusTag`/
`back` are not part of the Homepage anatomy per the register and are
simply not rendered in that branch. Homepage's single action still
reaches the SAME `[uiPageHeaderActions]` slot as every other type — the
caller supplies `button[ui-button] variant="plain" tone="on-dim"` with
a leading 16px icon slot — but this component pulls the WHOLE cluster
out of flow via `::ng-deep`, absolutely positioning it at the band's
bottom-right (16 / 32) and resizing the projected button to 40px /
`label(md)`, both per the harvest (page-header.scss has the full
specificity reasoning for reaching through a projected `ui-button`).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `type` | `UiPageHeaderType` | `'default'` |
| `contentGap` | `UiPageHeaderContentGap` | `'default'` |
| `title` | `string` | — |
| `subtitle` | `string` | — |
| `eyebrow` | `string` | — |
| `statusTag` | `string` | — |
| `statusVariant` | `UiTagVariant` | — |
| `avatarName` | `string` | — |
| `back` | `(inferred)` | `false, { transform: booleanAttribute }` |

**Outputs**

| Name | Type |
| --- | --- |
| `backActivated` | `void` |

See also: UiTagVariant (components/status-tag.md)

## Types

DLS 3.1 — Enterprise `page-header` Type axis (REGISTER.md
§49, Enterprise file `zTm6jM3QO8DCAMr51coADe`, set 78711:140286). All
nine Desktop symbols, per the owner's 5 Sep 2026 ruling — Tablet/Mobile
skipped per the standing desktop-only pattern of the walk.

```ts
export type UiPageHeaderType =
  | 'default'
  | 'homepage'
  | 'breadcrumb'
  | 'breadcrumb-tabs'
  | 'dropdowns'
  | 'dropdowns-tabs'
  | 'role-switcher'
  | 'tabs'
  | 'stepper';
```

Whether this header supplies the house 24px gap below its bottom rule
(lead ruling R2) — see `contentGap` on the component, and the
"content gap" block in its doc comment for when `none` is correct.

```ts
export type UiPageHeaderContentGap = 'default' | 'none';
```

## Slots

- `select="[uiPageHeaderBreadcrumb]"`
- `select="[uiPageHeaderDropdowns]"`
- `select="[uiPageHeaderActions]"`
- `select="[uiPageHeaderTabs]"`
- `select="[uiPageHeaderStepper]"`


## Example

From the kit's kitchen sink:

```html
reads grey rather than white because the margin sits outside the border.
      </p>
      <div class="sink-ph-gap-host">
        <ui-page-header id="sink-ph-gap" title="the monitoring app">
          <button uiPageHeaderActions ui-button variant="secondary" size="tiny" type="button">Export</button>
        </ui-page-header>
        <div class="sink-ph-gap-body" id="sink-ph-gap-body">
          <ui-card
            title="Open clarifications"
            subtitle="The first content block — its scroller supplies no top padding of its own"
          />
        </div>
      </div>

      <h3>Homepage is the counter-case — <code>margin-bottom: 0</code></h3>
      <p class="hint">
        Identical wrapper, <code>type="homepage"</code>. No bottom rule, no gap: the content
        starts flush under the band, which is how Home renders today and why this type is
        exempted rather than swept along.
      </p>
      <div class="sink-ph-gap-host">
        <ui-page-header
          id="sink-ph-gap-homepage"
          type="homepage"
          contentGap="default"
          eyebrow="Good morning"
          title="Welcome back, Kobayashi Rin!"
          subtitle="Homepage keeps zero — its own stack owns the spacing beneath it."
        />
        <div class="sink-ph-gap-body" id="sink-ph-gap-homepage-body">
          <ui-card title="Open clarifications" subtitle="Flush under the band — no 24px margin here" />
        </div>
      </div>

      <h3>Ruling R5 — <code>contentGap="none"</code>, for a header followed by chrome</h3>
      <p class="hint">
        The opt-out, and the only sanctioned one. <code>contentGap="none"</code> sets
        <code>margin-bottom: 0</code> and puts <code>ph--gap-none</code> on the host. R2's 24px is
        the header-to-CONTENT gap; this is for a header whose next sibling is page CHROME rather than
        a scrolling content region. The shape below is the one it was written for —
```


## Provenance

§49 (optional background — no Figma access required to use this component)
