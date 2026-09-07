# UiChip

**Selector:** `ui-chip, button[ui-chip]`

**Import**

```ts
import { UiChip } from 'ai-dls-kit';
```

## Description

Chip — the DLS 3.1 `chip` components (page 220898:2706, REGISTER.md
§11, audited 2 Sep 2026). Two DLS component sets, one component, switched
by `type`:

  <ui-chip label="John Doe" (removed)="remove(p)">
    <ui-icon uiChipIcon name="…" />
  </ui-chip>
  <ui-chip label="Read-only" [readonly]="true" />
  <button ui-chip kind="suggestion" label="Reset password" (click)="run()"></button>

**`chip-input`** (220898:11643) — "used in conjunction with inputs or
multi-selects to encapsulate a block of information": a non-interactive
`<ui-chip>` element (a span-like host, deliberately NOT a button) with an
optional trailing 24px CIRCLE `ui-icon-button` (close_16, pulled in by a
`-4px` optical margin — the §8 tiny icon-button IS the remove control,
hover/pressed/focus all live on it, not the chip body) that emits
`removed`. `readonly` hides the remove control — DLS's Read-only state.

**`.chip-suggestion`** (220898:11789) — "a few selected options the user
can press": the WHOLE chip is the control, so it is a real `<button>`,
reached via the `button[ui-chip]` attribute selector so native semantics
(type, disabled, click, keyboard activation) stay intact — the same
pattern `ui-button` and `ui-icon-button` use. Carries `--shadow-elevation-2`
at rest; hover/pressed/focus/disabled are native `:hover`/`:active`/
`:focus-visible`/`:disabled` rules (see chip.scss).

`type` DEFAULTS FROM THE HOST TAG the caller wrote, rather than one fixed
default for both selectors: `<ui-chip>` (the element selector) defaults to
`input`, `<button ui-chip>` (the attribute selector) defaults to
`suggestion` — each selector's natural default matches its own DLS
anatomy, so a suggestion-chip caller doesn't have to repeat
`kind="suggestion"` on every button. Either can still override explicitly
(an explicit `kind="input"` on a `<button ui-chip>` is legal but has no
DLS anatomy behind it, same "CSS renders it, nothing recommends it" shape
as `ui-button`'s undocumented Variant×Tone cells).

Shared chrome (both types): 32px tall (`--size-base-sm`), `--radius-pill`,
background `--color-bg-alt` (#f7f7f7), 0 8px padding (DLS
`padding-indicator-h-lg` — NO SUCH TOKEN EXISTS in tokens.css yet, so this
is hand-written 8px; report to the lead in case one should be added), 4px
inline gap (`--gap-unit-inline-h`), an optional 16px leading icon
projected via `[uiChipIcon]`, label at the kit's `label(sm)` — 13px/500
(OWNER'S RULING, the same compactness call `ui-button`/`ui-badge` make;
DLS's own printed spec says 14px for this role and this component
deliberately does not chase it).

NOT `ui-pill` (a status dot + label answering "what state is this thing
in?") and NOT `ui-tag-info` (a positional "which of these is newest?"
marker, present zero or one times over a list) — see those files'
docblocks. A chip answers neither question: it either ENCAPSULATES a
piece of information the user entered (removable, `chip-input`) or OFFERS
a suggested action to press (`chip-suggestion`). Different question,
different component — DLS names it separately and so does this kit.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `kind` | `UiChipKind | undefined` | `undefined` |
| `label` (required) | `string` | — |
| `readonly` | `(inferred)` | `false` |

**Outputs**

| Name | Type |
| --- | --- |
| `removed` | `void` |

## Types

```ts
export type UiChipKind = 'input' | 'suggestion';
```

## Slots

- `select="[uiChipIcon]"`


## Example

From the kit's kitchen sink:

```html
below. The third is <code>readonly</code>: no remove control at all.
      </p>
      <div class="row chip-input-row">
        <ui-chip kind="input" label="Aiko Tanaka" (removed)="lastChipEvent.set('removed Aiko Tanaka')">
          <ui-icon uiChipIcon name="…" />
        </ui-chip>
        <ui-chip kind="input" label="Singapore" (removed)="lastChipEvent.set('removed Singapore')" />
        <ui-chip kind="input" label="Read-only" [readonly]="true" />
      </div>

      <h3><code>kind="suggestion"</code> — pressable, and disabled</h3>
      <p class="hint">
        The whole chip is a <code>&lt;button ui-chip&gt;</code> — click the first to see the hint
        below update. The second is <code>disabled</code>: bg-disabled, text-disabled, no shadow.
      </p>
      <div class="row chip-suggestion-row">
        <button ui-chip kind="suggestion" label="Analyse for insights" (click)="lastChipEvent.set('chose Analyse for insights')"></button>
        <button ui-chip kind="suggestion" label="Disabled suggestion" disabled></button>
      </div>
      <p class="hint">Last chip event: {{ lastChipEvent() ?? '—' }}</p>
    </div>
  </section>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §11 (optional background — no Figma access required to use this component)
