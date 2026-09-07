# UiRadioChicletGroup

**Selector:** `ui-radio-chiclet-group`

**Import**

```ts
import { UiRadioChicletGroup } from 'ai-dls-kit';
```

## Description

DLS `radio-chiclet` (REGISTER.md §34, Figma 52830:274830) —
a bordered chip radio, for the archive: no reference-app consumer names it yet
(owner ruling, round 30–34, 3 Sep 2026), so this ships as a sink-only
pair of components rather than wired into a page.

  <ui-radio-chiclet-group [(value)]="scope" name="scope">
    <ui-radio-chiclet value="fx" label="FX">
      <ui-icon uiChicletIcon name="…" />
    </ui-radio-chiclet>
    <ui-radio-chiclet value="rates" label="Rates">
      <ui-tag-info uiChicletTag label="NEW" />
    </ui-radio-chiclet>
  </ui-radio-chiclet-group>

Two components, mirroring `ui-checkbox`/`ui-checkbox-group`'s split
(projected children own their own content; the group owns selection +
keyboard nav) rather than `ui-radio`'s flat `options` array — a chiclet
needs per-option content projection (`[uiChicletIcon]`, `[uiChicletTag]`)
that a data-only `options` shape cannot carry.

`ui-radio-chiclet`: 40px min-height, 12px h / 8px v padding, radius 4,
1px `--color-border`, label kit `label(sm)` 13px/500 `--color-text-strong`,
an optional 16px leading icon slot and an optional trailing tag slot
(a `ui-tag-info` fits the DLS trailing `tag-info` outline shape — see
the sink demo). States: hover `--color-bg-hover`; checked = border
`--color-primary` + bg `--color-primary-subtle` (DLS's `product_alt`
checked treatment mapped onto this kit's primary seam, same substitution
`ui-button`'s "Primary" variant makes); focus 2px inner `--color-focus`
ring; error border `--color-danger` + bg `--color-bg-danger-subtlest`;
read-only / disabled tones mirror `ui-checkbox`'s.

`ui-radio-chiclet-group`: `value` model + `name` (for documentation
parity with `ui-radio`; chiclets are `role="radio"` elements, not native
inputs, so `name` has no DOM effect but is kept as part of the shared
radio-group-shaped contract), `layout` (`'horizontal'` default | `
'vertical'`), `disabled` / `readonly` / `invalid` cascaded onto every
child that does not set its own. Arrow-key navigation is a roving
tabindex over the projected children (`ui-segmented`'s exact recipe,
§26) — Left/Up moves to the previous enabled chiclet, Right/Down to the
next, wrapping, and selects on arrival (radiogroup semantics, not
tablist).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `name` | `string` | — |
| `layout` | `'horizontal' | 'vertical'` | `'horizontal'` |
| `disabled` | `(inferred)` | `false` |
| `readonly` | `(inferred)` | `false` |
| `invalid` | `(inferred)` | `false` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `string | null` | `null` |

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
<h3>ui-radio-chiclet-group — leading icon + trailing tag, arrow-key navigation</h3>
      <div class="row wrap radio-chiclet-row">
        <ui-radio-chiclet-group name="radioChicletDemo" [(value)]="radioChicletValue">
          <ui-radio-chiclet value="fx" label="FX Spot">
            <ui-icon uiChicletIcon name="…" />
          </ui-radio-chiclet>
          <ui-radio-chiclet value="rates" label="Rates">
            <ui-tag-info uiChicletTag label="NEW" />
          </ui-radio-chiclet>
          <ui-radio-chiclet value="credit" label="Credit" [disabled]="true" />
        </ui-radio-chiclet-group>
      </div>
      <p class="hint">Selected: {{ radioChicletValue() ?? '—' }}. Arrow keys move and select; click also selects.</p>
    </div>
  </section>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §34 (optional background — no Figma access required to use this component)
