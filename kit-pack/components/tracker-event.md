# UiTrackerEvent

**Selector:** `ui-tracker-event`

**Import**

```ts
import { UiTrackerEvent } from 'ai-dls-kit';
```

## Description

`ui-tracker-event` — the DLS 3.1 `tracker-vertical`/`parent-event`
(Figma 207412:41377 + 207412:40546, REGISTER.md §43), the
row `ui-tracker` composes for `orientation="vertical"`:

  <ui-tracker-event status="active" title="Under review" expandable [(expanded)]="open">
    <span uiTrackerMeta>Assigned to Sato Yuki</span>
    <div uiTrackerActions>
      <button type="button" ui-button variant="secondary" size="small" (click)="edit()">Edit</button>
    </div>
    <ui-tracker-sub-event status="success" title="Approved" />
  </ui-tracker-event>

**Rail** — a 16px marker column + 8px gap + content. The column draws a
2px `--color-icon-disabled` line in two flex segments straddling the
`ui-tracker-marker`, exactly `ui-stepper`'s vertical connector technique
(stepper.scss's `.marker-col`/`.connector`): the row stretches to the
height its own content needs, both segments are `flex: 1`, and the one
above is hidden at `first` / below at `last` — because every event in a
column shares this same rail width at the same x-offset and touches its
neighbour with zero gap (`tracker.scss`), the segments read as one
unbroken line down the whole tracker.

**Content** — 12px vertical padding, 8px gap between: the card, an
optional `[uiTrackerActions]` row, and the projected sub-events. The
card itself is 4px padding, radius `--radius-sm` (DLS `action-alt`, 4 —
tokens.css has no `-alt` variant so this reuses the plain action radius,
same 4px value), pulled −4px horizontal/top so its text still lines up
with the rail's neighbours despite the padding. Card header: `title`
(`type.body(md, $bold: true)`, `--color-text-strong`, ellipsis, 24px
min-height), an optional `statusTag`/`statusVariant` through
`ui-status-tag`, and — when `expandable` — a 24px chevron that rotates
180° on `expanded`. Metadata lines project through `[uiTrackerMeta]`,
each `type.body(sm)` `--color-text-subtle`.

**Interactivity** — the guideline's ruling (tracker.ts's class doc)
limits this whole family to the expand chevron and inline actions, no
step navigation. Rather than wire the 24px chevron as its own nested
`ui-icon-button` (a button inside a card that ALSO wants hover/pressed/
focus paint would be a nested-interactive control with nothing to
`stopPropagation` against), this follows `ui-card`'s already-proven
collapsible-header precedent: the CARD is the toggle
(`role="button"`/`tabindex`/`aria-expanded`/Enter+Space) when
`expandable`, the chevron is a decorative `aria-hidden` glyph inside it,
and Hover/Pressed/Focused paint the card exactly as the DLS anatomy
says. A caller's own `[uiTrackerActions]` buttons sit BELOW the card and
are independently focusable/clickable — they do not affect the card's
own hover paint (the DLS text pairs "expandable or an action exists" as
the reason a card gets ANY interactive chrome at all; since actions live
outside the card's own box, this reads that as "the card is interactive
when `expandable`", not as actions reaching up into the card's hover).

Children are
projected through the ONE default `<ng-content />`, below the card, and
hidden via a class toggle when `expandable && !expanded` — never a
second `<ng-content select>` branch (Angular projects into the first
matching branch in source order; this kit's own migration notes call
that trap out repeatedly).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `status` | `UiTrackerStatus` | `'inactive'` |
| `first` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `last` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `expandable` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `title` | `string` | — |
| `statusTag` | `string` | — |
| `statusVariant` | `UiTagVariant` | — |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `expanded` | `(inferred)` | `false` |

See also: UiTagVariant (components/status-tag.md)

## Types

Shared status vocabulary for the whole `ui-tracker` family (marker,
event, sub-event's active/inactive cases, and step) — one union so a
caller mapping data onto the tracker never has to reconcile two
spellings of "completed" (REGISTER.md §43).

```ts
export type UiTrackerStatus = 'completed' | 'active' | 'inactive' | 'error' | 'null';
```

## Status keywords

Status keywords: see components/status-tag.md — `status` is resolved by the same function.

## Slots

- Default (unnamed) content projection
- `select="[uiTrackerMeta]"`
- `select="[uiTrackerActions]"`


## Example

From the kit's kitchen sink:

```html
</p>
<div id="sink-tracker-vertical" class="demo-host">
  <ui-tracker orientation="vertical">
    <ui-tracker-event status="completed" first title="Request submitted" statusTag="Completed" statusVariant="green">
      <span uiTrackerMeta>Submitted by Tanaka Hiroshi</span>
    </ui-tracker-event>

    <ui-tracker-event
      status="active"
      title="Under review"
      statusTag="In progress"
      expandable
      [(expanded)]="reviewExpanded"
    >
      <span uiTrackerMeta>Assigned to Sato Yuki</span>
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
```


## Provenance

REGISTER.md §43 (optional background — no Figma access required to use this component)
