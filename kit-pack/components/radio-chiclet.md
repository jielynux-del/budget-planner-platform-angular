# UiRadioChiclet

**Selector:** `ui-radio-chiclet`

**Import**

```ts
import { UiRadioChiclet } from 'ai-dls-kit';
```

## Description

Public — read by `UiRadioChiclet` (a sibling component's TypeScript,
 not a subclass) to resolve its own roving-tabindex stop.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `value` (required) | `string` | — |
| `label` (required) | `string` | — |
| `disabled` | `(inferred)` | `false` |

## Slots

- `select="[uiChicletIcon]"`
- `select="[uiChicletTag]"`


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

_Not recorded._
