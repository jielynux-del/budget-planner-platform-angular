# UiTrackerDivider

**Selector:** `ui-tracker-divider`

**Import**

```ts
import { UiTrackerDivider } from 'ai-dls-kit';
```

## Description

`ui-tracker-divider` — the DLS 3.1 `tracker-vertical/group-divider`
(Figma 207705:18711, REGISTER.md §43): an **"OR"** rule
between two alternative branches of a vertical tracker:

  <ui-tracker-event status="completed" first title="Request raised" />
  <ui-tracker-divider />
  <ui-tracker-event status="inactive" last title="Escalated to the desk lead" />

A hairline, the word `OR` (`label`, default `'OR'`, `type.label(sm)`
`--color-text-strong`), another hairline, 8px vertical padding — the
marker column keeps drawing its 2px rail line so the branches above and
below still read as one continuous tracker, except when `last` (a
divider is never `first`: it only ever sits BETWEEN two events).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` | `(inferred)` | `'OR'` |
| `last` | `(inferred)` | `false, { transform: booleanAttribute }` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<div id="sink-tracker-divider" class="demo-host">
  <ui-tracker orientation="vertical">
    <ui-tracker-event status="completed" first title="Approved by the desk lead" statusTag="Completed" statusVariant="green" />
    <ui-tracker-divider />
    <ui-tracker-event status="inactive" last title="Escalated to risk" />
  </ui-tracker>
</div>

<h3>Sub-event statuses — <code>ui-tracker-sub-event</code></h3>
<p class="hint">
  All five: <code>active</code>, <code>inactive</code>, <code>success</code>, <code>error</code>, and
  <code>custom</code> — the last hands its whole card body to a projected
  <code>[uiTrackerSubContent]</code>, with no status tint.
</p>
<div id="sink-tracker-sub" class="demo-host">
  <ui-tracker orientation="vertical">
    <ui-tracker-sub-event status="active" title="In progress" meta="Watanabe Mei" timestamp="10:02" />
    <ui-tracker-sub-event status="inactive" title="Not started" meta="Unassigned" timestamp="—" />
    <ui-tracker-sub-event status="success" title="Approved" meta="Tanaka Hiroshi" timestamp="09:14" />
    <ui-tracker-sub-event status="error" title="Rejected" meta="Sato Yuki" timestamp="09:20" />
    <ui-tracker-sub-event status="custom" last title="ignored">
      <div uiTrackerSubContent class="custom-slot-demo">
        Custom projected content — no card tint, this row owns its whole body.
      </div>
    </ui-tracker-sub-event>
  </ui-tracker>
</div>

<h3>Horizontal — <code>ui-tracker-step</code></h3>
<p class="hint">Five steps sharing the row width, the second <code>active</code>.</p>
<div id="sink-tracker-horizontal" class="horizontal-wrap">
  <ui-tracker orientation="horizontal">
    <ui-tracker-step status="completed" first label="Submitted" />
    <ui-tracker-step status="active" label="Under review" />
    <ui-tracker-step status="inactive" label="Compliance check" />
    <ui-tracker-step status="inactive" label="Settlement" />
    <ui-tracker-step status="inactive" last label="Closed" />
  </ui-tracker>
</div>
```


## Provenance

REGISTER.md §43 (optional background — no Figma access required to use this component)
