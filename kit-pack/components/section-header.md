# UiSectionHeader

**Selector:** `ui-section-header`

**Import**

```ts
import { UiSectionHeader } from 'ai-dls-kit';
```

## Description

Section header — a title over an optional subtitle.
Kitchen-sink gap: `ui-page-title` is a bare heading directive with no
subtitle slot, and nothing in the kit renders this two-line pattern.

  <ui-section-header
    title="Trade Review"
    subtitle="Trades tagged under various use cases…" />

A column, 4px gap: title = `heading(sm)` (20px/600/1.4, -0.005em —
resolves to exactly -0.1px at 20px, so no override needed; owner review
3 Sep 2026 moved this from `heading(md)`/24px to the Figma-harvested
heading/xs spec, node 1790:58359 — the kit's 20px step is named `sm`) in
`--color-text-strong`; subtitle = `label(xs)` (12px/500/1.2) in
`--color-text-subtle`. The node has no background, rule or padding of its
own, and both lines sit `nowrap` in the design — the title stays a short
label there, but the subtitle here is a full sentence, so it is left free
to wrap in code rather than forced onto one line and clipped.

`level` picks the rendered heading tag (`h2` default, or `h3`) so the
title is a real heading for document-outline/screen-reader structure —
a `[attr.role]` override would fake the semantics without fixing them.

Zero outer margins by design: spacing between this and whatever sits
above/below it is the parent's job (the page stack's own gap), same rule
`ui-page-title` documents — a component that set its own margin would
fight the very first page that used two of them in a stack.

── WHY THIS COMPONENT HAS A VARIANT AXIS (lead ruling R1, 6 Sep 2026) ──
Kit-fixes walk item 13 made "no hand-rolled heading pair" a PLATFORM
RULE. P3 then met ten sites the fixed 20px title could not serve and
stopped on all ten rather than drop the anatomy (owner's standing rule:
a customisation becomes a kit variant, it is never dropped). Those ten:
`home.html:21,66` and `profile/sub-desk-card.html:59,130,199` and
`the reference app/draft-proposal.html:69,111,131` carry a 14px card/section heading;
sub-desk-card puts a leading 16px glyph before it; draft-proposal puts a
trailing `ui-icon-button` disclosure ON the title line;
`the reference app/reference-modal.html:4` has a subtitle CONTAINING an inline `<svg>`,
which a string input cannot hold; `the reference app/pre-submission document.html:8-9` and
`the reference app/review-proposal.html:8-9` put a `ui-status-tag` on the title line.
So the component grows exactly four things — a size axis, a leading icon
slot, a trailing actions slot and a projected subtitle — and all ten
sites become a swap. The variant exists because the platform rule met
those ten sites, not because a size axis is nice to have.

  <ui-section-header size="sm" title="Product ">
    <ui-icon uiSectionHeaderIcon name="…" />
    <button uiSectionHeaderActions ui-icon-button size="tiny" …>…</button>
  </ui-section-header>

  <ui-section-header size="md" title="References NPAs">
    <span uiSectionHeaderSubtitle><ui-icon name="…" /> Select past references…</span>
  </ui-section-header>

`size` moves ONLY the title, down the heading role: `lg` `heading(sm)`
20px (default, today), `md` `heading(xs)` 16px, `sm` `heading(2xs)` 14px.
Host class `ui-section-header--{size}`.

THE SUBTITLE DOES NOT MOVE WITH IT — it stays `label(xs)` 12px at every
size, and that is a deliberate reading of `tokens/_type.scss`, not an
oversight. Three facts force it. (1) The harvested pair is heading(sm)/20
over label(xs)/12; that is fixed by Figma. (2) The label role has exactly
ONE step below 12px — `label(2xs)`/10, which tokens.css:354-356 records as
DLS's own step for "control text, table headers, chips" and confirms the
ladder is 10 -> 12 -> 13 with nothing between; stepping the subtitle down
in parallel with the title would land `md` on that 10px chip step and
leave `sm` with no step at all, i.e. the DLS scale does not support a
parallel ladder. (3) Stepping the other way — to `label(sm)`/13, which two of the
ten sites happen to use today — would make a 16px header's subtitle
LARGER than a 20px header's, inverting the hierarchy. So the title
carries the whole size axis and the subtitle is the constant support
line. Consequence to expect on the swap: `pre-submission document` and
`review-proposal` normalise their subtitle from 13px `body(sm)` to 12px
`label(xs)`, and `reference-modal` from 13px `label(sm)` to the same.

`[uiSectionHeaderIcon]` sits BEFORE the title, ON the title line, sized
20px at `lg` and 16px at `md`/`sm` and centred on the title's midline.
`[uiSectionHeaderActions]` sits AFTER the title, ON the same line,
pushed right by `margin-left: auto` — it holds a `ui-icon-button`
disclosure (draft-proposal) or a `ui-status-tag`. Both collapse to nothing via `:empty` when unprojected,
the same always-render-let-`:empty`-collapse pattern `ui-page-header`'s
regions and `ui-drawer`'s footer already use, so the DOM shape never
changes with the inputs (the kit trap `ui-table-header` documents).

`[uiSectionHeaderSubtitle]` is the subtitle CONTENT slot, for a subtitle
that is not a plain string — an inline glyph, a link, a value the page
formats itself. It is the fallback-content form of `<ng-content>`
(Angular 18+): the string `subtitle` input renders as this slot's
FALLBACK, so **if both are supplied the projected one wins** and the
string is not rendered at all. The kit types the projected node with the
same `label(xs)` / `--color-text-subtle` role as the string version, so a
caller supplies markup, not styling; a caller who does want different
paint can style their own element, because a projected node carries the
CALLER's encapsulation attribute and so is reachable from the caller's
own stylesheet (see section-header.scss for the `::ng-deep` this same
fact forces on the kit's side).

The `.sh-title` / `.sh-subtitle` class hooks are unchanged for the string
path (f75 reads both); the hook for a PROJECTED subtitle is the
`[uiSectionHeaderSubtitle]` attribute itself.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` (required) | `string` | — |
| `subtitle` | `string` | — |
| `level` | `'h2' | 'h3'` | `'h2'` |
| `size` | `UiSectionHeaderSize` | `'lg'` |

## Types

The size axis added by lead ruling R1 (6 Sep 2026). `lg` is today's
component to the pixel, so no existing caller moves.

```ts
export type UiSectionHeaderSize = 'lg' | 'md' | 'sm';
```

## Slots

- `select="[uiSectionHeaderIcon]"`
- `select="[uiSectionHeaderActions]"`
- `select="[uiSectionHeaderSubtitle]"`


## Example

From the kit's kitchen sink:

```html
<h3>Title only</h3>
      <div class="row">
        <ui-section-header title="Title Only" />
      </div>

      <h3>level="h3" — same anatomy, rendered as an h3</h3>
      <div class="row">
        <ui-section-header level="h3" title="Sub-Section Title" subtitle="Renders an h3, not an h2" />
      </div>

      <!-- R1 demos (6 Sep 2026). APPENDED after the four above on purpose:
           f75:24 and f75:37 read ".first()" inside this section, so anything
           inserted BEFORE "Trade Review" would silently retarget them. -->

      <h3>The size ladder — one title step per size, one constant subtitle</h3>
      <p class="hint">
        20 → 16 → 14 on the title; 12px on all three subtitles. Read the three together: the
        support line is the same size under a 20px heading and a 14px one, which is the point of
        the ruling above.
      </p>
      <div class="sink-sh-host sink-sh-ladder">
        <ui-section-header
          id="sink-sh-lg"
          size="lg"
          title="Trade Review Summary"
          subtitle="size=lg — heading(sm) 20px, the default, today's component to the pixel"
        />
        <ui-section-header
          id="sink-sh-md"
          size="md"
          title="Trade Review Summary"
          subtitle="size=md — heading(xs) 16px, the same 12px subtitle"
        />
        <ui-section-header
          id="sink-sh-sm"
          size="sm"
          title="Trade Review Summary"
          subtitle="size=sm — heading(2xs) 14px, still the same 12px subtitle"
        />
```


## Provenance

Figma the reference app Phase 2
node 1790:58360 (optional background — no Figma access required to use this component)
