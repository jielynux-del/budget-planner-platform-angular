# UiIconButton

**Selector:** `button[ui-icon-button], a[ui-icon-button]`

**Import**

```ts
import { UiIconButton } from 'ai-dls-kit';
```

## Description

Icon button — the DLS 3.1 `icon-button` component (page 186153:6433, set
50671:241589, REGISTER.md §8, audited 2 Sep 2026). Applied as
an attribute so native `<button>`/`<a>` semantics (type, disabled, form
participation, href) stay intact, same pattern as `ui-button`:

  <button ui-icon-button aria-label="Close">
    <ui-icon name="…" [size]="24" />
  </button>
  <button ui-icon-button shape="circle" size="small" outline aria-label="Audit log">
    <ui-icon name="…" />
  </button>
  <button ui-icon-button size="tiny" tone="on-dim" aria-label="Previous step">
    <ui-icon name="…" />
  </button>

DLS's five axes, and where each landed:

**Type → `shape`.** `square` (default, node 50671:241580) | `circle`
(node 67700:328364) — radius `--radius-sm` (4, DLS's
`border_radius-action-alt`) or `--radius-pill`.

**Size** — `small` (default, 32px) | `tiny` (24px, node 50671:241832).
OWNER'S RULING (2 Sep 2026, carried from the Button pass, §7): a compact
application ships Tiny + Small only — DLS's Medium (40) and Large (48)
are recorded in REGISTER.md §8, not built. The glyph is
fixed at 24px at Small (DLS runs 24 through Small/Medium/Large — only
Tiny drops to 16) and 16px at Tiny — see icon-button.scss for the
`::ng-deep` that enforces it regardless of the projected SVG's own
viewBox, the same projected-content trap `ui-button` documents.

**Style → `tone`.** `normal` (default) | `on-dim` | `on-bright` — DLS's
five-tone Style axis minus `destructive`/`positive`, which have no
icon-button reading (there is no solid-fill icon-only control in the
set). Kept as `tone` rather than `style` for the same NAMING TRAP
`ui-button` calls out: this is an attribute component on a native
`<button>`/`<a>`, so `style="on-dim"` would try to write the element's
own inline-CSS attribute. `on-bright` reuses Normal's values in DLS (see
icon-button.scss — no override block needed, same shape as
`ui-button`'s on-bright resting/hover/pressed).

**Outline** — boolean `outline` input. `NO` (default, no chrome at rest)
| `YES` (node 50671:241590): adds a 1px `--color-border` ring
(`--color-border-on-dim` when `tone="on-dim"`).

**State** — Hover/Pressed are `:hover`/`:active` bg fills
(`--color-bg-hover` / `--color-bg-pressed`, on-dim's own darker pair).
**Focus** (node 50671:241630) is the same 2px solid inset border in
`--color-focus` `ui-button` draws — `box-shadow: inset 0 0 0 2px`, no
layout shift. **Disabled** is `--color-bg-disabled` +
`--color-icon-disabled`, no border (DLS's outline collapses too); on-dim
keeps its own darker pair (`--color-bg-on-dim-disabled` +
`--color-text-on-dim-disabled`), same exception `ui-button` documents
for the same reason — the ordinary disabled fill is invisible against a
dark rail.

**Glyph colour** — the projected SVG is expected to paint with
`currentColor`; this component sets `color` on the host
(`--color-icon` #69737b Normal, `--color-text-on-dim` white on-dim) so
a `currentColor` glyph picks it up automatically, rather than reaching
into the projected SVG's own fill/stroke attributes (which, per the
projected-content trap, this host cannot touch anyway).

Every colour/geometry token this component uses already existed after
the Button round (§7) — no new tokens were added for this component.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `shape` | `UiIconButtonShape` | `'square'` |
| `size` | `UiIconButtonSize` | `'small'` |
| `tone` | `UiIconButtonTone` | `'normal'` |
| `outline` | `(inferred)` | `false, { transform: booleanAttribute }` |

## Types

```ts
export type UiIconButtonShape = 'square' | 'circle';
```

```ts
export type UiIconButtonSize = 'small' | 'tiny';
```

```ts
export type UiIconButtonTone = 'normal' | 'on-dim' | 'on-bright';
```

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
<span class="acc-slot-name">the reference app</span>
            <ui-badge [label]="4" />
          </div>
          <button accordion-actions ui-icon-button size="tiny" type="button" aria-label="Edit the reference app">
            <ui-icon name="…" />
          </button>
          <button accordion-actions ui-icon-button size="tiny" type="button" aria-label="Revoke the reference app access">
            <ui-icon name="…" />
          </button>
          <div class="accordion-demo-body"><p class="hint">(a) System Access platform header — name + count badge, edit / revoke icon-buttons in <code>[accordion-actions]</code>. Both actions stop propagation via the slot, so neither toggles.</p></div>
        </ui-accordion>
        <ui-accordion title="Desk: FX Options" [defaultOpen]="false" id="accordion-header-slot-desk">
          <div accordion-header class="acc-slot-stack">
            <span class="acc-slot-name">Desk: FX Options</span>
            <span class="acc-slot-meta">
              <span>the desk lead: Haruto SATO</span>
              <span class="acc-slot-sep">|</span>
              <span>Location: Singapore</span>
              <span class="acc-slot-sep">|</span>
              <span>4 traders</span>
            </span>
          </div>
          <div class="accordion-demo-body"><p class="hint">(b) Profile desk-group header — name over a pipe-separated meta line (label/sm, text-subtle; pipes in text-disabled, as profile-mandates.scss draws them). Two lines grow the header past 48px, same as <code>subtitle</code> does.</p></div>
        </ui-accordion>
        <ui-accordion title="Clarification — Rates Desk" [defaultOpen]="false" id="accordion-header-slot-clarification">
          <div accordion-header class="acc-slot-row">
            <span class="acc-slot-name">Clarification — Rates Desk</span>
            <ui-status-tag label="Pending Response" variant="amber" />
          </div>
          <div class="accordion-demo-body"><p class="hint">(c) Inbox raised-clarification header — name + inline <code>ui-status-tag</code>. Tag and name share the 8px unit gap.</p></div>
        </ui-accordion>
        <ui-accordion title="Data rectification" barColor="purple" [defaultOpen]="false" id="accordion-header-slot-bar">
          <div accordion-header class="acc-slot-row">
            <span class="acc-slot-name">Data rectification</span>
            <ui-status-tag label="Issue Raised" variant="red" />
          </div>
          <div class="accordion-demo-body"><p class="hint">Slot + bar together — the projected header takes the bar's 16/16 offset exactly as the built-in title does.</p></div>
        </ui-accordion>
      </div>
      <div class="spacer"></div>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §8 (optional background — no Figma access required to use this component)
