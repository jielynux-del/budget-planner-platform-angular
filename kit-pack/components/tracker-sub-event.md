# UiTrackerSubEvent

**Selector:** `ui-tracker-sub-event`

**Import**

```ts
import { UiTrackerSubEvent } from 'ai-dls-kit';
```

## Description

`ui-tracker-sub-event` — the DLS 3.1 `tracker-vertical/sub-event`
(Figma 207412:40793, REGISTER.md §43), the disclosed child
a `ui-tracker-event` reveals when `expandable`+`expanded`:

  <ui-tracker-sub-event status="success" title="Approved" meta="Sato Yuki" timestamp="09:14" />

  <ui-tracker-sub-event status="custom" title="ignored">
    <div uiTrackerSubContent>…arbitrary content…</div>
  </ui-tracker-sub-event>

Marker column is the rail LINE only (no dot, no ring — a sub-event never
carries its own `ui-tracker-marker`), `last` omits the trailing segment.
The card: 12px horizontal / 8px vertical padding, radius `--radius-sm`,
tinted per status — `success` → `--color-bg-success-subtlest` (DLS
background-success_subtlest, #e2f8ef), `error` →
`--color-bg-danger-subtlest` (the danger-subtlest equivalent, #fff0f0),
`active`/`inactive` → `--color-bg-app` (the neutral subtlest step this
kit has), `custom` → NO tint, the whole card body handed to the caller
through `[uiTrackerSubContent]` instead of this component's own header/
description anatomy. Header: `title` (`type.body(sm, $bold: true)`
`--color-text-strong`) + an optional `statusTag`/`statusVariant` pushed
right. Description row: `meta` (flex: 1) + `timestamp` (right-aligned),
both `type.body(sm)` `--color-text-subtle`.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `status` | `UiTrackerSubEventStatus` | `'active'` |
| `last` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `title` | `string` | — |
| `statusTag` | `string` | — |
| `statusVariant` | `UiTagVariant` | — |
| `meta` | `string` | — |
| `timestamp` | `string` | — |

See also: UiTagVariant (components/status-tag.md)

## Types

```ts
export type UiTrackerSubEventStatus = 'active' | 'inactive' | 'success' | 'error' | 'custom';
```

## Status keywords

Status keywords: see components/status-tag.md — `status` is resolved by the same function.

## Slots

- `select="[uiTrackerSubContent]"`


## Example

From the kit's kitchen sink:

```html
<div uiTrackerActions>
        <button type="button" ui-button variant="secondary" size="small" (click)="onEditClicked()">Edit</button>
      </div>
      <ui-tracker-sub-event status="success" title="Desk approval" meta="Suzuki Aiko" timestamp="09:14" />
      <ui-tracker-sub-event status="active" last title="Risk sign-off" meta="Takahashi Ren" timestamp="Pending" />
    </ui-tracker-event>

    <ui-tracker-event status="inactive" title="Compliance check">
      <span uiTrackerMeta>Not yet assigned</span>
    </ui-tracker-event>

    <ui-tracker-event status="error" title="Settlement failed" statusTag="Rejected" statusVariant="red">
      <span uiTrackerMeta>Retry required</span>
    </ui-tracker-event>

    <ui-tracker-event status="inactive" last title="Archived">
      <span uiTrackerMeta>Awaiting closure</span>
    </ui-tracker-event>
  </ui-tracker>
</div>

<h3>Marker statuses — <code>ui-tracker-marker</code></h3>
<p class="hint">
  The four visible marker statuses side by side (<code>null</code> renders nothing but keeps the 16×20
  box, so it is skipped here).
</p>
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
```


## Provenance

REGISTER.md §43 (optional background — no Figma access required to use this component)
