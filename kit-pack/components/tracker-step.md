# UiTrackerStep

**Selector:** `ui-tracker-step`

**Import**

```ts
import { UiTrackerStep } from 'ai-dls-kit';
```

## Description

`ui-tracker-step` — the DLS 3.1 `tracker-horizontal` event (Figma
207973:35789, REGISTER.md §43), the row `ui-tracker`
composes for `orientation="horizontal"` (each `flex: 1`, wired by
`tracker.scss`):

  <ui-tracker orientation="horizontal">
    <ui-tracker-step status="completed" first label="Submitted" />
    <ui-tracker-step status="active" label="Under review" />
    <ui-tracker-step status="inactive" last label="Closed" />
  </ui-tracker>

A centred `ui-tracker-marker` with 2px connectors running to the row
edges. Colouring is decided PER STEP from its own `status` alone (no
sibling lookup needed — every step independently produces a boundary
colour that always agrees with its neighbour's, because there is always
exactly one `active` step preceded by zero or more `completed` ones):
the connector BEFORE this step is `--color-icon-success` (mapped to
`--color-success-strong`, same substitution `ui-tracker-marker`
documents) when this step is `completed` OR `active` — "progress has
reached at least here" — and the connector AFTER it is that same green
only when this step is `completed` — the active step's trailing
connector is where the green fill stops. Both connectors stay in the
DOM at `first`/`last` (so the marker stays centred in its `flex: 1`
cell) but the one running off the row is `visibility: hidden`.

`label` sits 4px below, 8px horizontal padding, centred: `active` =
`type.body(sm, $bold: true)` `--color-text-strong`, `completed` =
`type.body(sm)` `--color-text-strong`, everything else (`inactive`,
`error`, `null` — DLS's horizontal anatomy defines only these three
label treatments) = `type.body(sm)` `--color-text-subtle`.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `status` | `UiTrackerStatus` | `'inactive'` |
| `first` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `last` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `label` | `string` | — |

## Types

Shared status vocabulary for the whole `ui-tracker` family (marker,
event, sub-event's active/inactive cases, and step) — one union so a
caller mapping data onto the tracker never has to reconcile two
spellings of "completed" (REGISTER.md §43).

```ts
export type UiTrackerStatus = 'completed' | 'active' | 'inactive' | 'error' | 'null';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<div class="demo-host">
  <ui-page-header id="sink-ph-stepper" type="stepper" title="Onboard New Mandate">
    <ui-tracker uiPageHeaderStepper orientation="horizontal">
      <ui-tracker-step status="completed" first label="Submitted" />
      <ui-tracker-step status="active" label="Under review" />
      <ui-tracker-step status="inactive" label="Compliance check" />
      <ui-tracker-step status="inactive" last label="Closed" />
    </ui-tracker>
    <button uiPageHeaderActions ui-button variant="secondary" size="tiny" type="button">Save draft</button>
  </ui-page-header>
</div>

<h3>Homepage — <code>type="homepage"</code></h3>
<p class="hint">
  The one type that does not compose <code>ui-page-title</code> — its hard-coded
  <code>text-strong</code> can't be repainted white from outside, and the register calls this out as its
  own anatomy (eyebrow, greeting, subtitle, one plain on-dim action), not the shared header-text block.
  DLS's own band is a licensed Unsplash photograph, which this white-label kit cannot ship — the soft
  wash below is the kit's own default, set through the overridable <code>--ui-page-header-homepage-bg</code>
  custom property so a product can supply its own art/photo instead.
</p>
<div class="demo-host">
  <ui-page-header
    id="sink-ph-homepage"
    type="homepage"
    eyebrow="Good morning"
    title="Welcome back, Sato Yuki!"
    subtitle="Here's what's happening across your desks today."
  >
    <button uiPageHeaderActions ui-button variant="plain" tone="on-dim" size="small" type="button">
      <ui-icon uiButtonIconLeft name="…" />
      Customise dashboard
    </button>
  </ui-page-header>
</div>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

REGISTER.md §43 (optional background — no Figma access required to use this component)
