# UiTooltipDirective

**Selector:** `[uiTooltip]`

**Import**

```ts
import { UiTooltipDirective } from 'ai-dls-kit';
```

## Description

**Tooltip — the kit's first, DLS `tooltip`.**

Attribute directive rather than a wrapping component, because the thing it
decorates is never one fixed element — it has sat on a `ui-status-tag`
(Data rectification), and the next call site is whatever needs one next.
A wrapper (`<ui-tooltip>…</ui-tooltip>`) would force every anchor into an
extra DOM layer just to carry a positioning host; the directive attaches
to the element that is already there:

  <span [uiTooltip]="{ title, lines, footer }">
    <ui-status-tag status="Pending" />
  </span>

(the input shares the directive's own selector name, so one binding does
both jobs — the same idiom `ui-status-tag`'s `[status]` and every other
single-input kit piece already uses.)

`null`/`undefined` content means "no tooltip" — the caller's way of saying
a particular row has nothing to show.

── SHOWS ON HOVER *AND* FOCUS, HIDES ON ESCAPE ───────────────────────────

A hover-only tooltip is invisible to keyboard and screen-reader users who
can reach the anchor but never "hover" it — an accessibility hole the DLS
component does not have, so this doesn't either. `focusin`/`focusout`
mirror `mouseenter`/`mouseleave` exactly (same open/close paths), and
`keydown.escape` closes unconditionally, matching the platform convention
every native title-attribute tooltip and every DLS overlay already follows
here (`ui-modal-shell`, `ui-select`'s panel).

The host needs to be a KEYBOARD TARGET for `focusin` to ever fire, so the
directive gives it `tabindex="0"` unless the element already declares one
(a real button, link or form control does, and must not be second-guessed
here).

── POSITIONING: A FIXED PANEL, PLACED ON OPEN, NOT TRACKED ───────────────

The panel is a plain DOM node built and torn down on each open/close — no
Angular component, no change-detection question, because its content is a
handful of static strings decided by the caller before the tooltip ever
shows. It is appended to `document.body` and positioned `fixed` from the
anchor's `getBoundingClientRect()` at open time, on the side the
`placement` input names — `'auto'` (default) prefers above the anchor,
flipped below when there isn't 8px of headroom; `'top'` / `'bottom'` / `'left'` / `'right'` force that side but
still flip to the opposite one when the forced side has no room, because
a tooltip rendered off-screen is worse than one on the other side. The
panel is clamped to the viewport on its cross axis too — horizontally for
a vertical placement, vertically for a horizontal one. That is "sensible
viewport flipping", not a popper engine — it does not re-run on scroll or
resize, which is fine for a tooltip that closes the moment the pointer or
focus leaves the anchor.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `uiTooltip` | `UiTooltipContent | null | undefined` | `null` |
| `placement` | `'auto' | 'top' | 'bottom' | 'left' | 'right'` | `'auto'` |

## Types

Structured content for `[uiTooltip]` — a title line, zero or more body
lines, and an optional footer line separated from the body by a blank-line
gap (Figma `215:1705`). Deliberately three named slots rather than a bare
string or a single `lines: string[]`: the design draws the title bold and
the footer as a distinct, visually separated block ("Status: Pending" /
per-line detail / a gap / "Last updated: …"), and collapsing that into one
array would push every caller into re-inventing which line is which by
convention (a leading `''` for the gap, a magic last index for the
footer) instead of naming it.

```ts
export interface UiTooltipContent {
  /** Rendered bold, first line — e.g. "Status: Pending". */
  readonly title: string;
  /** Rendered one per line beneath the title, regular weight. */
  readonly lines: readonly string[];
  /** Rendered after a blank-line gap, in the subtle on-dim colour. Omitted
   *  entirely (no gap, no line) when there is nothing to say. */
  readonly footer?: string;
}
```

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

_Not recorded._
