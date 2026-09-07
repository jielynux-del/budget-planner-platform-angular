# UiTagInfo

**Selector:** `ui-tag-info`

**Import**

```ts
import { UiTagInfo } from 'ai-dls-kit';
```

## Description

`tag-info` — DLS's two-type recency/categorisation marker (§42, Figma
5322:36053). 20px tall, 4px h-padding, radius `indicator` (4), label/2xs
(10px) — always, regardless of type.

  <ui-tag-info />                                     // "NEW", category/grey
  <ui-tag-info label="BETA" />
  <ui-tag-info type="category" colour="mint" label="TRIAL" />
  <ui-tag-info type="product" colour="blue" label="Live" />

**Category** — a SOLID primitive fill with `--color-text-on-bright-strong`:
grey/ginger/lemon/melon/mint/lavender/acai, 7 flats DLS reaches past its
own semantic layer for ("widely used, low visual hierarchy, for
categorisation" — DLS's own words). **Product/Services** — OUTLINED, 1px
border + matching text, no fill: red (this white-label's `--color-primary`
seam for DLS `product_alt` #ff3e3e), grey (`--color-icon` border /
`--color-text-subtle` text), purple (purple-40/purple-90), blue
(blue-20/sky-70). See tokens.css's "DLS Tag family" block for every hex.

`label` keeps its `'NEW'` default from before this axis existed — the
Special Requests call site (`<ui-tag-info />`, no type/colour bound)
still compiles and renders unchanged in TYPE/RADIUS/geometry; its FILL
changes from the old placeholder `--color-tag-new` (a value with no DLS
role behind it, per this file's prior doc comment) to the real harvested
Category/Grey (`--color-tag-info-grey` #dde3e7), now that `type`
defaults to `'category'` and `colour` to `'grey'` — the DLS-accurate
reading of a bare "NEW" chip.

NOT a `ui-status-tag` variant, deliberately — different question
(positional "which is newest / what kind is this?" vs "what state is
this thing in?"), different geometry (radius 4 not pill, label/2xs not
label/sm), different type ramp, DLS names it separately and so does
this kit. See the original doc comment history for the full argument.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` | `(inferred)` | `'NEW'` |
| `type` | `UiTagInfoType` | `'category'` |
| `colour` | `UiTagInfoColour` | `'grey'` |

## Types

DLS `tag-info`'s two types (§42) — see the class doc for the anatomy.

```ts
export type UiTagInfoType = 'category' | 'product';
```

Both DLS colour axes share one input: Category picks a solid fill,
Product picks an outline. `'grey'` is legal for BOTH (a different
treatment each time — see tag-info.scss) so the union is not split by
type; passing a colour DLS has no cell for on the current `type` (e.g.
`type="product" colour="ginger"`) renders no fill/border at all rather
than silently falling back, the same "loud gap, not silent drift" rule
`statusVariant` follows.

```ts
export type UiTagInfoColour =
  | 'grey' | 'ginger' | 'lemon' | 'melon' | 'mint' | 'lavender' | 'acai'
  | 'red' | 'purple' | 'blue';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<ui-badge [label]="3" />
        <ui-badge label="99+" />
        <ui-pill label="ED" />
        <ui-tag-info />
      </div>
      <p class="hint">
        First three: low / medium / high at the same "12". Then a single digit and a truncated
        "99+", both default (low) emphasis, showing the pill hugging either extreme. Last two are a
        pill and a recency tag, for size and shape comparison — neither could carry a count without
        losing the distinction it exists to make (see badge.ts).
      </p>

      <h3><code>type="dot"</code> — the same three fills, no content</h3>
      <p class="hint">
        An 8×8 circle (<code>--size-base-5xs</code>) — the unread/status marker, same
        low/medium/high fills as the label, none of the content.
      </p>
      <div class="row badge-dot-row">
        <ui-badge type="dot" emphasis="low" />
        <ui-badge type="dot" emphasis="medium" />
        <ui-badge type="dot" emphasis="high" />
      </div>

      <h3><code>emphasis="high"</code> — the unread badge</h3>
      <p class="hint">
        The danger emphasis at DLS's own 12px (Figma <code>190:17151</code>): same 16px height, 4px
        padding and pill radius as Low/Medium, but <code>--color-bg-danger-strong</code> with
        <code>--color-text-on-dim</code>, and a 16px min-width (a kit extension, not on the DLS
        node) so a single digit stays a circle. It is an inline chip like any other — overlaying it
        on the Primary Nav's Inbox glyph is that consumer's positioning, not the component's.
      </p>
      <div class="row badge-on-dim">
        <ui-badge [label]="1" emphasis="high" />
        <ui-badge [label]="12" emphasis="high" />
        <ui-badge label="99+" emphasis="high" />
      </div>
      <p class="hint">Shown on the rail's own dark background, which is where it lives.</p>

      <h3><code>emphasis="subtle"</code> — kit extension, no DLS counterpart</h3>
      <p class="hint">
```


## Provenance

Figma
5322:36053 (optional background — no Figma access required to use this component)
