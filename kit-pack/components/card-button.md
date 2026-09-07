# UiCardButton

**Selector:** `button[ui-card-button]`

**Import**

```ts
import { UiCardButton } from 'ai-dls-kit';
```

## Description

Card button — the DLS 3.1 `card-button` component (page 305:2702, node
239963:31383, "Standard, desktop", REGISTER.md §9, built
2 Sep 2026). A tappable card: an icon + a label/description pair,
applied as an attribute so native `<button>` semantics (type, disabled,
form participation) stay intact — same pattern as `ui-button` /
`ui-icon-button`:

  <button ui-card-button label="Wire Transfer" description="Move funds between accounts">
    <ui-icon ui-card-button-icon name="…" [size]="24" />
  </button>

280px is the Figma FRAME width, not a component width — this component
does not fix its own width; the caller sizes it (a grid cell, a fixed
column, whatever the layout calls for), same reasoning `ui-card` itself
uses (`width: 100%`, `flex-shrink: 0`).

Padding 12/12 — `--padding-panel-h-sm` / `--padding-panel-v-sm`, both
already on-token, no raw value needed. Radius `--radius-md` (8),
`--shadow-elevation-3` (one step up from `ui-card`'s own elevation-2 —
DLS draws a tappable card slightly more "lifted" than a static one).
Row layout, 8px gap: a 24px icon slot, then a label/description column.

**Icon slot** — `[ui-card-button-icon]`, fixed to 24px via `::ng-deep`
in card-button.scss (the reference app's internal notes "projected content cannot be styled
from its host" — the same trap `ui-button`'s icon slots document),
coloured `--color-icon` so a `currentColor` glyph picks it up.

**Text column** — `label` (required; `label(md)` 14px/500,
`--color-text-strong`) and optional `description` (`label(sm)` 13px,
`--color-text-subtle`), 4px apart, left-aligned.

**States** — Hover `--color-bg-hover`, Active/Pressed `--color-bg-pressed`,
Focus a 2px INSET solid `--color-focus` ring (no layout shift, same
recipe `ui-button`/`ui-icon-button` use), Disabled collapses to
`--color-bg-disabled` + `--color-text-disabled` (label and description
both) + `--color-icon-disabled` (icon slot).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` (required) | `string` | — |
| `description` | `string` | — |

## Slots

- `select="[ui-card-button-icon]"`


## Example

From the kit's kitchen sink:

```html
</div>
    <div class="demos">
      <div class="row cardbtn-row">
        <button ui-card-button label="Wire Transfer" description="Move funds between accounts" class="w280" type="button">
          <ui-icon ui-card-button-icon name="…" [size]="24" />
        </button>
        <button ui-card-button label="Disabled" description="Not available for this desk" class="w280" type="button" disabled>
          <ui-icon ui-card-button-icon name="…" [size]="24" />
        </button>
      </div>
      <p class="hint">Hover the first — <code>--color-bg-hover</code>. The second is disabled: bg-disabled, text-disabled, icon-disabled.</p>
    </div>
  </section>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §9 (optional background — no Figma access required to use this component)
