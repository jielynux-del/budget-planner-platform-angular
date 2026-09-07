# UiFab

**Selector:** `button[ui-fab], a[ui-fab]`

**Import**

```ts
import { UiFab } from 'ai-dls-kit';
```

## Description

Floating action button — the DLS 3.1 `floating-action-button` component
(page 305:2720, set 407:4, REGISTER.md §18, audited
2 Sep 2026). Type Light | Dark × State Default | Hover | Pressed | Focus:
a 48px circle, `elevation-4` shadow, a 24px glyph centred. Applied as an
attribute so native `<button>`/`<a>` semantics stay intact, the same
pattern as `ui-button` / `ui-icon-button`:

  <button ui-fab aria-label="Scroll to top">
    <ui-icon name="…" [size]="24" />
  </button>
  <button ui-fab tone="dark" aria-label="AI Assistant">
    <ui-icon name="…" [size]="24" />
  </button>

**Size.** Fixed 48×48 — DLS's Type axis has no size variant, so unlike
`ui-button`/`ui-icon-button` there is no `size` input at all. DLS calls
this out as `size-base-lg` — the token was 44 with no consumer when this
component arrived and the lead corrected it to DLS's 48 (3 Sep 2026), so
the box reads `var(--size-base-lg)` like every other sized control.

**Tone → DLS's Type axis.** `light` (default, node 407:4) — bg
`--color-bg-level1`, glyph `--color-icon`, hover `--color-bg-hover`,
pressed `--color-bg-pressed`. `dark` — bg `--color-bg-dim`, glyph
`--color-text-on-dim` (white), hover `--color-bg-on-dim-hover`, pressed
`--color-bg-on-dim-pressed`. Kept as `tone` rather than `type` for the
same reason `ui-icon-button` uses `shape`/`tone` instead of `type`/
`style` — Angular reserves neither word specially here, but it keeps the
vocabulary consistent across the three attribute-button components.

**Glyph** — a projected SVG, sized 24px via `:host ::ng-deep > svg` in
fab.scss. Expected to paint with
`currentColor` so it picks up the tone's glyph colour automatically.

**Shadow** — `--shadow-elevation-4` (0 0 1px .25 + 0 8px 8px .08), not
`--shadow-elevation-2` (buttons/cards use elevation-2; the FAB floats
higher above the page).

**Press** — NO transform on `:active`. DLS shows no press-scale on this
component's node, and the platform has no press-state movement anywhere
(owner's ruling, 5 Sep 2026); press feedback is colour only.

**Focus** — the same 2px solid inset `--color-focus` border every other
attribute-button component in this kit draws (`box-shadow: inset 0 0 0
2px`), no layout shift.

Host classes: `ui-fab ui-fab--{tone}`.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `tone` | `UiFabTone` | `'light'` |

## Types

```ts
export type UiFabTone = 'light' | 'dark';
```

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <h3>Tone — <code>light</code> / <code>dark</code></h3>
      <div class="row fab-row">
        <button ui-fab aria-label="Scroll to top">
          <ui-icon name="…" />
        </button>
      </div>
      <div class="row fab-row on-dim-row">
        <button ui-fab tone="dark" aria-label="Scroll to top">
          <ui-icon name="…" />
        </button>
      </div>
      <p class="hint">
        Dark tone shown on the same dark backdrop <code>ui-button</code>'s and
        <code>ui-icon-button</code>'s <code>on-dim</code> rows use. This is the same component the
        AI launcher now renders (<code>shell/ai-drawer/ai-launcher.ts</code>) — see F10 for the
        live click-to-open flow.
      </p>
    </div>
  </section>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §18 (optional background — no Figma access required to use this component)
