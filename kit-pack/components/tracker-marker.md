# UiTrackerMarker

**Selector:** `ui-tracker-marker`

**Import**

```ts
import { UiTrackerMarker } from 'ai-dls-kit';
```

## Description

`ui-tracker-marker` — the DLS 3.1 `tracker-marker` (Figma 207412:40778,
REGISTER.md §43), a 16×20 box:

  <ui-tracker-marker status="completed" />

Unlike `ui-stepper-marker` (§38, a DIFFERENT DLS node with its own
anatomy — completed/error there drop the ring entirely and show only a
filled glyph), the Tracker marker keeps a 2px RING in every visible
state and layers the status glyph inside it:

- `active` — white centre, 2px `--color-border-disabled` ring
  (#c7cfd5), a filled ~6px inner dot in that same disabled grey (DLS's
  `radio-disc` recipe, not a colour token of its own — radio.scss uses
  the identical ring-and-disc shape for the same reason).
- `inactive` — the same ring, no dot.
- `completed` — the ring recolours to `--color-icon-success`; tokens.css
  has no token by that exact name, so this uses `--color-success-strong`
  (#00ab61), which its own tokens.css comment already documents as
  "icon-success / border-success" — the harvested value matches
  exactly. A small filled checkmark glyph sits inside the ring.
- `error` — the ring recolours to `--color-icon-danger`; again no token
  by that name, so this uses `--color-danger` (#ff4724, "Status/Danger/
  Normal, and color/border-danger/default") — the same substitution
  `ui-stepper-marker` already reports for the identical gap. A filled
  exclamation glyph sits inside the ring.
- `null` — DLS's deprecated "not started" marker: renders nothing
  visible but keeps the 16×20 box, so a mixed list of statuses never
  loses its column alignment.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `status` | `UiTrackerStatus` | `'inactive'` |

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
<div id="sink-tracker-statuses" class="marker-row">
  @for (m of markerStatuses; track m.status) {
    <div class="marker-cell">
      <ui-tracker-marker [status]="m.status" />
      <span class="marker-label">{{ m.label }}</span>
    </div>
  }
</div>

<h3>Group divider — <code>ui-tracker-divider</code></h3>
<p class="hint">Two alternative branches joined by an "OR" rule.</p>
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
```


## Provenance

REGISTER.md §43 (optional background — no Figma access required to use this component)
