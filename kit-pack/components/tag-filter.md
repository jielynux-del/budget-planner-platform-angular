# UiTagFilter

**Selector:** `ui-tag-filter`

**Import**

```ts
import { UiTagFilter } from 'ai-dls-kit';
```

## Description

Removable filter tag — DLS `tag-filter` (§42, Figma 89025:316489): 20
tall, radius `--border-radius-indicator` (4), background
`--color-bg-neutral`, 4px LEFT padding, label `type.label(sm)`
`--color-text-strong`, then a 20px-square close button carrying a 16×10
glyph, emitting `removed`. The button's own `:focus-visible` draws the
2px `--color-focus` ring rounded ONLY on its right corners (`0 4px 4px
0`, matching the host's own radius on that edge) — DLS draws the ring on
the button half, not the whole tag; see tag-filter.scss.

  <ui-tag-filter label="Owner: Aiko Mori" (removed)="remove(t)" />
  <ui-tag-filter label="Region: APAC" [disabled]="true" />

NOT `ui-chip`'s `chip-input`: that is a different DLS component (32px
tall, pill radius, a 24px CIRCLE icon-button remove control pulled in by
an optical margin — §11). This is DLS's own separate `tag-filter` node:
20 tall, squared `indicator` radius, a 20px SQUARE remove control flush
against the tag's own trailing edge with no optical overlap, and a
focus ring confined to the button half rather than the whole chip. Two
DLS components with two different anatomies stay two kit components.

This is an ARCHIVE piece (owner's §42 ruling, 4 Sep 2026): no reference-app call
site renders removable filter tags today — the platform's "All …"
filter selects follow the §21 clear-rule instead (no × until a value is
picked). Built for completeness/future use; demoed at
`#sink-tag-filter`.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` (required) | `string` | — |
| `disabled` | `(inferred)` | `false` |

**Outputs**

| Name | Type |
| --- | --- |
| `removed` | `void` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</p>
  <div id="sink-tag-filter" class="sdt-row sdt-filter-row">
    @for (t of filterTags(); track t.id) {
      <ui-tag-filter [label]="t.label" (removed)="removeFilterTag(t.id)" />
    }
    <span class="sdt-filter-count">{{ filterTags().length }} remaining</span>
  </div>

</div>
```


## Provenance

Figma 89025:316489 (optional background — no Figma access required to use this component)
