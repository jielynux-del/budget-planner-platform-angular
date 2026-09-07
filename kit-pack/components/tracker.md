# UiTracker

**Selector:** `ui-tracker`

**Import**

```ts
import { UiTracker } from 'ai-dls-kit';
```

## Description

`ui-tracker` — the DLS 3.1 `Tracker` component (page 207412:99 +
guideline 237778:405, REGISTER.md §43), replacing the
hand-rolled `ui-timeline` (`done | current | pending`, three marker
states, no sub-events, no inline actions, no OR divider, no horizontal
form) that stood in for it across the Special Requests audit-log and
workflow drawers and the monitoring signoff-audit drawer.

**The guideline's Stepper-vs-Tracker table is the reason this is not
`ui-stepper`** (237778:5822, alpha-draft): Stepper is linear AND
non-linear, lets a user move BETWEEN steps, forbids inline actions, is
chronological only, and exists to collect input across guided steps.
Tracker is **linear only**, **navigation not supported** (no roving
tabindex, no arrow-key step navigation, no "click a step to jump" —
`ui-stepper`'s `interactive`/`current`/`stepSelected` axis has no
equivalent here), **allows inline actions for follow-up tasks**, reads
**chronological or reverse**, and exists to show workflow progress or
status after the fact. The only interactive parts anywhere in this
family are `ui-tracker-event`'s expand chevron and a caller's own
`[uiTrackerActions]` buttons.

`ui-tracker` itself is a thin layout host — content is PROJECTED, not
driven by a data array, because an event's title/tag/actions/slots are
arbitrary caller markup an array shape can't express:

  <ui-tracker orientation="vertical">
    <ui-tracker-event status="completed" first title="Submitted">…</ui-tracker-event>
    <ui-tracker-event status="active" title="Under review">…</ui-tracker-event>
    <ui-tracker-event status="inactive" last title="Closed">…</ui-tracker-event>
  </ui-tracker>

  <ui-tracker orientation="horizontal">
    <ui-tracker-step status="completed" first label="Submitted" />
    <ui-tracker-step status="active" label="Under review" />
    <ui-tracker-step status="inactive" last label="Closed" />
  </ui-tracker>

**Anatomy in numbers** — vertical: `ui-tracker-event`'s 16px marker
rail (2px `--color-icon-disabled` line, split above/below the marker,
the split omitted at `first`/`last` so the rail runs continuous) + 8px
gap + content (12px vertical padding, 8px gap; the card itself 4px
padding pulled out −4px horizontal/top). Sub-events: 16px rail (line
only, no dot) + 8px gap + a 12h/8v-padded tinted card. Divider: a
hairline / "OR" / a hairline, 8px vertical padding. Horizontal:
`flex: 1` steps, a centred marker with connectors to the row edges,
label 4px below.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `orientation` | `'vertical' | 'horizontal'` | `'vertical'` |

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
</p>
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
