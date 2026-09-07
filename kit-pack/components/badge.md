# UiBadge

**Selector:** `ui-badge`

**Import**

```ts
import { UiBadge } from 'ai-dls-kit';
```

## Description

Badge — the DLS 3.1 `badge` component (page 379:18, set 379:23), six
symbols on ONE component set, two axes:

  <ui-badge [label]="12" />
  <ui-badge label="99+" />
  <ui-badge [label]="12" emphasis="high" />
  <ui-badge type="dot" emphasis="high" />
  <ui-badge [label]="98" emphasis="subtle" tone="red" />

**Type** — `label` (default; hugs content, "12" measures 21×16) or `dot`
(a bare 8×8 circle, `--size-base-5xs`, no content — the unread/status
marker). Label nodes: 5182:2 / 379:22 / 379:24. Dot nodes: 403:2617 /
77321:354343 / 77321:354344. Code Connect maps the set to
`<dbs-badge [priority]="'low'|'medium'|'high'">12</dbs-badge>` (a `dot`
is the same element with no content).

**Emphasis** — `low` (default) | `medium` | `high`, DLS's three fills,
identical for both types:
- `low` — `--color-tag-neutral` bg, `--color-text-body` text.
- `medium` — `--color-bg-inverse` bg, `--color-text-inverse` text.
- `high` — `--color-bg-danger-strong` bg, `--color-text-on-dim` text.

COMPACTNESS OVERRIDE (owner ruling, 2 Sep 2026 — the second after the
accordion title): DLS types every Label at `label/xs` (12px). Low was
already shipping at `label/2xs` (10px) from an earlier reference-file harvest
and the owner kept it that way rather than growing it back to spec, and
ruled the new Medium in at 10px alongside it. High alone stays at DLS's
12px. So the label sizes are Low 10 / Medium 10 / High 12 — deliberate,
not a DLS voice, do not "fix" Low or Medium back to 12px.

`emphasis="subtle"` is a FOURTH value with no DLS counterpart — the reference-app extension carried over unchanged from the old `variant="subtle"` (Figma
227:2860, the org-card risk-score / report-count pill): auto height,
tight ~2px/6px padding, no border, and a `tone`
(red/amber/green/light/dark) input that picks the tint. It rides the same
`emphasis` axis because it is still "how emphatic is this pill", not a
separate component. `subtle` has no DLS `type="dot"` counterpart either
— passing `type="dot"` with `emphasis="subtle"` is not a combination DLS
or the reference app defines, so the dot silently falls back to the `low` fill rather
than throwing (see `hostClass` below).

The High emphasis keeps a 16px `min-width` so a single digit renders as a
true circle rather than a squashed pill — not on the DLS node (DLS's own
single digit hugs to ~15px, near-circular anyway), a kit extension
kept for the small visual difference it makes at the smallest count.

A `high`-emphasis badge is not positioned here. It is an inline-flex chip
like any other, and OVERLAYING it on an icon is the consumer's layout
problem (see nav-rail.scss) — a kit component that positioned itself
absolutely could only ever fit one call site.

NEITHER `ui-pill` NOR `ui-tag-info` could carry this, and both were
checked before adding a third small chip:

- `ui-pill [dot]="false"` is the right SHAPE but the wrong everything
  else — no fixed height (2px padding either side of `label/xs` 12px, so
  ~18px and free to grow), a paler fill (`--color-border-subtle`), and a
  `color`/`dot` API built around STATUS. Making it fit would mean a
  fourth colour, a size input and a height it currently refuses to have.
- `ui-tag-info` is 20px at radius 4 on `--color-tag-new`. Its squared
  corner is the whole point of that component — the thing that reads as a
  recency marker rather than a status pill — so re-pointing it here would
  delete the distinction it exists to make.

The question this answers is a third one again: "how many things are in
there?" (or, for `type="dot"`, "is there something here at all?"). No
state, no recency — a quantity (or a presence) beside a label. DLS names
it separately and so do we.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` | `string | number | undefined` | — |
| `type` | `'label' | 'dot'` | `'label'` |
| `emphasis` | `'low' | 'medium' | 'high' | 'subtle'` | `'low'` |
| `tone` | `'red' | 'amber' | 'green' | 'light' | 'dark'` | `'light'` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<ui-accordion title="the reference app" [defaultOpen]="false" id="accordion-header-slot-platform">
          <div accordion-header class="acc-slot-row">
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
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

Figma
227:2860 (optional background — no Figma access required to use this component)
