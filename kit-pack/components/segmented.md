# UiSegmented

**Selector:** `ui-segmented`

**Import**

```ts
import { UiSegmented } from 'ai-dls-kit';
```

## Description

Segmented control — DLS `switch-tab` / `switch-tab-group`
(REGISTER.md §41, Figma 6765:41863): one grey track carrying
mutually exclusive slices, the chosen one raised as a white pill (also
used at 1002:236111, frame 994:233795: `All | Banking | Trading` on the
P&L Trend and Breakdown card headers, `By Product | By Instrument` on the
bottom Breakdown card).

Round 41 audit pinned the track to the DLS numbers: bg
`--color-bg-disabled` (#eef2f5), radius `--border-radius-panel-lg` (8),
4px inter-segment gap (`--gap-unit-inline-h`); each option 32 tall
(`--size-base-sm`, was the table-cell 24 before this round), 12px
h-padding, 4px (action-alt) radius — both already correct pre-audit; the
active pill's fill renamed `--color-bg-level2` → `--color-bg-level1` to
match the DLS node's own name (same #ffffff hex, no visual change). See
segmented.scss for the per-rule reasoning.

  <ui-segmented [segments]="scopes" [(value)]="scope" label="P&L scope" />

── Why this is NOT `ui-filter-tabs` ────────────────────────────────────
`ui-filter-tabs` is DLS's filter-tab-group: SEPARATE outlined pills, the
chosen one filled with the inverse surface, used to NARROW a list that is
already on the page — where "none of them" and "all of them" are coherent
states. This is one CONTINUOUS track with an inset selection, used to
switch a card between slices that partition the same data. Nothing about
the two looks alike — no track, no inset, no shadow, no inverse fill — and
they mean different things, so a `variant` input on filter-tabs would fork
its template and every one of its style rules while pretending to be one
component. Same argument filter-tabs itself makes against `ui-tabs`.

── Why radio-group semantics and not `tablist` ─────────────────────────
A tablist promises tab PANELS: `aria-controls` pointing at a `tabpanel`,
and a screen reader announcing "tab 2 of 3" as a navigation move. This
control has no panels — it re-slices the data inside ONE card that is
already there, which is a CHOICE among mutually exclusive values, i.e. a
radio group. That choice also buys the right keyboard contract for free:
arrows move AND select (a radio group is one tab stop with a roving
tabindex), which is exactly how a segmented control should behave, whereas
a tablist's arrows-move-focus-only model would be wrong here.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `segments` (required) | `UiSegment[]` | — |
| `label` | `string` | `''` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `string` | — |

## Types

```ts
export interface UiSegment {
  key: string;
  label: string;
  /** Inert: no pointer, no keyboard stop, no selection. */
  disabled?: boolean;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<section id="ui-segmented">
    <h2>ui-segmented</h2>
    <div class="demos">
      <ui-segmented [segments]="segments" [(value)]="activeSegment" label="Business scope" />
      <p class="hint">
        Value: {{ activeSegment() }} — a radio GROUP, not a tablist: one tab stop,
        arrows/Home/End move and select, and disabled options are stepped over.
      </p>
    </div>
  </section>
```


## Provenance

REGISTER.md §41 (optional background — no Figma access required to use this component)
