# UiStatusDot

**Selector:** `ui-status-dot`

**Import**

```ts
import { UiStatusDot } from 'ai-dls-kit';
```

## Description

Status dot — DLS `tag-status-dot` (§42, Figma 88972:307295), the other
face of `tag-status`: a 10px round dot + 4px gap + label/sm `text-strong`,
20 tall, no pill fill of its own. Same five types as `ui-status-tag`
(neutral/green/red/amber/purple) and the SAME string → variant resolution
— `statusVariant` is imported from status-tag.ts rather than re-listing
the 21-call-site map here, so the two components can never drift apart on
what a given status string means.

  <ui-status-dot status="Approved" />
  <ui-status-dot variant="green" label="Active" />

The dot's own fill reuses the exact same `--color-tag-<variant>` token
the pill uses for its background (e2e f86 asserts this: "each variant's
dot colour matches its status-tag family") — DLS harvested no separate
"strong" dot palette for this node, so the kit does not invent one.

NOT a `ui-status-tag` variant: this is a different DLS component
(`tag-status-dot`, a distinct node from `tag-status`) with different
anatomy — no pill background, a dot instead — answering the same "what
state is this in?" question in the sparser form a dense list needs. The
table's `.ui-cell-dot` (Round 40, table.scss) is a THIRD, table-specific
rendering with its own tone set; this is the standalone piece the lead's
§42 proposal names as the one `.ui-cell-dot` should eventually compose
from — that composition is not this round's job.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `status` | `string` | — |
| `label` | `string` | — |
| `variant` | `UiTagVariant` | — |

See also: UiTagVariant (components/status-tag.md)

## Status keywords

Status keywords: see components/status-tag.md — `status` is resolved by the same function.

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</p>
  <div id="sink-tag-dot" class="sdt-row">
    @for (v of statusVariants; track v) {
      <ui-status-dot [variant]="v" [label]="statusLabels[v]" />
    }
  </div>

  <h3>ui-tag-info — Category axis</h3>
  <p class="hint">
    DLS <code>tag-info</code> Category: solid primitive fill, <code>--color-text-on-bright-strong</code>,
    label/2xs (10px). Seven flats — "widely used, low visual hierarchy, for categorisation."
  </p>
  <div id="sink-tag-info-category" class="sdt-row">
    @for (c of categoryColours; track c) {
      <ui-tag-info type="category" [colour]="c" [label]="c.toUpperCase()" />
    }
  </div>

  <h3>ui-tag-info — Product/Services axis</h3>
  <p class="hint">
    DLS <code>tag-info</code> Product/Services: OUTLINED, 1px border + matching text, no fill. Red carries
    this white-label's <code>--color-primary</code> seam for DLS <code>product_alt</code>.
  </p>
  <div id="sink-tag-info-product" class="sdt-row">
    @for (t of productTags; track t.colour) {
      <ui-tag-info type="product" [colour]="t.colour" [label]="t.label" />
    }
  </div>

  <h3>ui-tag-filter — removable</h3>
  <p class="hint">
    DLS <code>tag-filter</code>: 20 tall, <code>--border-radius-indicator</code>, a 20px close button whose
    own <code>:focus-visible</code> ring rounds only its right corners. Archive piece (§42 owner's ruling)
    — no reference-app call site renders removable filter tags today.
  </p>
  <div id="sink-tag-filter" class="sdt-row sdt-filter-row">
    @for (t of filterTags(); track t.id) {
      <ui-tag-filter [label]="t.label" (removed)="removeFilterTag(t.id)" />
    }
    <span class="sdt-filter-count">{{ filterTags().length }} remaining</span>
```


## Provenance

Figma 88972:307295 (optional background — no Figma access required to use this component)
