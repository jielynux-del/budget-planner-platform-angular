# UiDateInput

**Selector:** `ui-date-input`

**Import**

```ts
import { UiDateInput } from 'ai-dls-kit';
```

## Description

Neutral date input — same 32px shell as ui-select with a 16px calendar
icon (DLS column-header date filter, calendar_16).

TWO FACES, ONE COMPONENT

Outside a table this is exactly what it always was for TEXT/CVA purposes:
a native `<input type="date">` stays the field forms and modals bind to
— typing, `formControl`, keyboard entry are all untouched. What changed
(register §14, owner decision "both faces stop calling `showPicker()`"):
the 16px calendar glyph is now a REAL `button[ui-icon-button]` layered
over the native picker indicator (which is made inert with
`pointer-events: none` — see date-input.scss), and clicking it opens a
`ui-date-picker` popover instead of the UA's own calendar. Picking a day
there writes through the same `value` model the typed path uses.

OPEN ON THE CLICK, NOT ON THE FOCUS (kit-fixes walk item 5, 6 Sep 2026;
corrected by the D4 regression audit the same day). The owner: "clicking
the date itself should also open the calendar picker, not only the icon;
the user can keep typing, but the picker should already be open." So the
native input's `mousedown`/`click` open the SAME `ui-date-picker` popover
the icon opens, and `Alt+ArrowDown` is the keyboard opener; focus stays in
the input (the popover is a sibling, nothing steals it), so typing
continues, and the native `input` event commits live so a typed valid date
moves the picker's month (`viewMonth` is derived from `value`) and its
selected cell. Opening is idempotent — a keystroke never re-opens or
re-seeds it. Escape closes (host listener, see below), a click outside the
component closes (document listener), and a `blur` whose `relatedTarget`
is outside the component closes (Tab away); a blur with NO relatedTarget
is left to the document click so a pointer landing on the popover's own
padding does not shut it. The UA `showPicker()` stays retired
(register §14 ruling).

A BARE `focus` MUST NOT OPEN IT, and that is the correction. Item 5 as
first built also bound `(focus)="openStandalone()"`. `focus` is not a
user's decision to open a calendar — it is reached by Tab-ing through a
form, by any script that calls `.focus()`, and by an app focusing the
first invalid field after a failed submit. Each of those then dropped a
~394px panel at `z-index: 1100` over whatever followed the field, and the
panel takes the pointer: in the FXGC Large Order form the "Tentative date
of trade" popover covers the whole Special Request Details card beneath
it, so the next real click lands on the calendar's header instead of on
the Sales Dealer select or the Pooling radios. Measured, 6 Sep: popover
140→534, "Pooling of limits required" radio 168→188, entirely inside it.
It broke six e2e flows outright (`f11` b/c/d/e, `f10:80`, `f6d:199` — all
of them a real-pointer `check()` that Chromium's hit test correctly
refused) and forced two more specs to work around a popover no user had
asked for (`f24`'s `pickMonth` and its sign-off helper). Every route the
owner actually named — clicking the field, clicking the icon — is a
pointer event and is unaffected; the keyboard keeps `Alt+ArrowDown` and
the icon button, which is in the tab order. Do not re-add `(focus)`.

ONE PICKER, NEVER TWO (owner bug, 6 Sep 2026 — D1 audit). The owner, on
the FXGC Large Order form in the Special Requests focus overlay: "the
date picker opens both the old browser date picker along with the new
one." Item 5 made the FIELD open the kit popover, but the field is still
a native `<input type="date">` and Chromium opens its OWN calendar from
that element's default mouse handling — so a single click summoned both.
Hiding `::-webkit-calendar-picker-indicator` (3 Sep) removes the glyph,
not the behaviour: the UA picker no longer has a visible trigger, yet the
input's own default action still opens it.

The suppression is therefore on the EVENTS, not the glyph. Blink runs an
element's default handler only when the event was not `preventDefault()`ed,
so cancelling the default on the input's `mousedown` AND its `click` kills
every mouse path into the UA picker, in whichever of the two a given
Chromium version hangs it (the two are cancelled together deliberately:
this component cannot feature-detect which one, and cancelling both is
free). `Alt+ArrowDown`, Chromium's keyboard shortcut for the same picker,
is cancelled the same way and re-pointed at the kit popover, so the
keyboard has an opener too. `showPicker()` is never called (§14).

The COST of cancelling `mousedown` is that the UA no longer focuses the
input for us, and no longer places the caret in the datetime segment the
pointer landed on: `onNativeMouseDown` focuses the input itself, and
Chromium then starts on the FIRST segment (day) wherever the click landed.
Typing is untouched — every segment is still reachable with arrow keys and
digits still overtype and advance (measured in a real Chromium, 6 Sep
2026) — and `value` stays the same `YYYY-MM-DD` contract.

ESCAPE STOPS AT THIS COMPONENT. `ui-modal-shell` (and `ui-modal`) listen
for Escape on `document`, so an Escape meant for this popover used to
close the whole focus overlay with it — with item 5 making the field an
opener, that turned "dismiss the calendar" into "throw the half-filled
form away". The host-level handler below closes the popover and
`stopPropagation()`s, so the shell never sees that keystroke; the
document-level listener stays as the fallback for an Escape pressed while
focus is outside the component, where nothing of ours is open to protect.

PLACEMENT. The popover is host-relative `absolute`, so an ancestor that
scrolls (`ui-modal-shell`'s `.panel-content`, a table's scroller) clips it
at that box's edge. `measurePlacement` runs on every open: it finds the
nearest clipping ancestor, and if the panel does not fit below the field
but has more room above, the popover flips onto the field's top edge
(`.ui-date-popover--above`). A field low in a long overlay form — Date
Executed in the FXGC Large Order form is the real one — then opens a
whole calendar instead of a clipped strip.

`type="month"` (kit-fixes item 21): the native field becomes
`<input type="month">`, `value` is `YYYY-MM`, and the popover opens as a
month-terminal `ui-date-picker type="month" monthOnly` — picking a month
commits it (see date-picker.ts). `min`/`max` (ISO date, or ISO month for
`type="month"`) pass through to both the native input and the picker;
a month bound is widened to its first/last day for the picker, which
compares ISO DATES.

`min`/`max` ARE A RULE, NOT A HINT (D3, 6 Sep 2026 — owner bug). The Desk
Head's the monitoring app filter is `type="month"` with `max` at the signoff
month, and the field ended up DISPLAYING `2026-08` while its own `max` said
`2026-07` and the page filtered on July. The bound is a permission there —
the desk lead must not be able to reach August at all — so the component
that owns `min`/`max` is the component that has to enforce them:

  1. Every value the FIELD produces goes through `commit`, which clamps it
     into `[min, max]`. CLAMP, not reject-to-the-last-valid-value: the
     bound is the furthest the user may legally go, so snapping to it
     answers "how far can I actually get?" and keeps whatever else about
     the edit was legal; a revert answers nothing, throws away the legal
     half of a two-segment edit, and has no defined answer at all on first
     entry, when there is no last valid value to revert to. `type="date"`
     and `type="month"` take the identical path — only the grammar the
     bounds are normalised into differs (`boundMin`/`boundMax`).
  2. A refused value is written back onto the ELEMENT (`syncNative`).
     This is the half that the bug turned on and the half a consumer-side
     clamp structurally cannot do: `value.set(clamped)` does nothing when
     the clamp lands on the value the model already held, so the signal
     does not change, `nativeValue()` does not change, and Angular's
     `[value]` binding — which only writes when its own expression changes
     — never touches the input. Two sources of truth, and the visible one
     was the wrong one. The imperative write closes that.

Because the refusal happens here and repairs the element itself, EVERY
consumer is covered, including the six that bind `[value]` + `(valueChange)`
one-way rather than `[(value)]` and so can never be written back into.

The bound constrains what the FIELD and the PICKER can produce. A value
pushed in by the parent (the `[value]` binding, or `writeValue` from a
form) is the parent asserting its own state and is displayed as given —
exactly as a native `min`/`max` constrains the UI and validity without
policing assignment. An empty value is "unset", never "out of range".

Inside a `ui-column-header` the control is a FILTER, and DLS specifies a
filter that a native date input provably cannot render:

  unset        "All"                   native renders `dd/mm/yyyy`, and no
                                       placeholder attribute applies to
                                       `type="date"`
  single       "22/05/26"              native renders the UA locale form
  range        "22/05/26 - 30/05/26"   native holds ONE date, full stop

So in that context a real trigger element paints the text, and clicking
it opens the SAME `ui-date-picker` popover — `range=true`, seeded from
the two ISO dates the trigger is already displaying, when the current
value parses as a range; `range=false` otherwise. This is what makes
range SELECTION real (previously the trigger could only DISPLAY a range;
`showPicker()` opened the UA's single-date picker). The native input
stays in the DOM, invisible, out of the tab order, purely so the two
faces keep one shared value/CVA path — it does no picking of its own in
this mode.

The switch is CSS-only (`:host-context(ui-column-header)` in the
stylesheet), so no consumer passes a mode in and the standalone path keeps
its exact previous markup and metrics.

Value is the native `YYYY-MM-DD` string (`YYYY-MM` for `type="month"`),
a `START/END` pair for a range, or null when unset. Anything else is
rendered verbatim, so a consumer can hand this a pre-formatted display
string without the component parsing it.

`invalid` + `errorMessage` — the canonical error-state contract shared by
every kit form control (see ui-text-input for the full docstring). The
two are independent on purpose: a field can be marked invalid without a
message of its own.

OWNER REVIEW, 3 Sep 2026 — standalone face double-glyph fix, diagnosed
against DLS "Input field / Type=Date picker / Size=Small"
(76086:347425 default, 76086:347416 error, anatomy 76086:347429):
  1. The UA's own `::-webkit-calendar-picker-indicator` is now hidden
     outright (`display: none` in date-input.scss) instead of masked —
     the mask approach still left a second, inert glyph in the box. The
     native datetime EDITOR (the typed DD/MM/YYYY fields) stays; only the
     indicator affordance goes.
  2. The standalone input reserves the icon-button's room —
     `padding-right: 44px` (12 text-gap + 24 button + 8 clearance) — and
     the button itself sits at `right: 12px`, matching the DLS shell's
     12px edge inset instead of the old 8px that let long values run
     under it.
  3. Empty vs filled text colour now keys off a real `.is-empty` class
     (bound below from `!value()`) rather than relying on the UA's own
     placeholder styling, which `type="date"` doesn't expose consistently
     — see date-input.scss for the `::-webkit-datetime-edit` rules.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `disabled` | `(inferred)` | `false` |
| `placeholder` | `(inferred)` | `'All'` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |
| `type` | `'date' | 'month'` | `'date'` |
| `min` | `string | null` | `null` |
| `max` | `string | null` | `null` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `string | null` | `null` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</p>
      <div class="row dp-input-row">
        <div class="w200">
          <ui-date-input [(value)]="dpInputValue" />
        </div>
      </div>
      <p class="hint">Value: {{ dpInputValue() ?? '—' }}</p>

      <h3><code>ui-date-input type="month"</code> — the month field behind the table date filter</h3>
      <p class="hint">
        Item 21's kit half: <code>type</code> is <code>date</code> (default) or
        <code>month</code>, with <code>min</code> / <code>max</code> bounds. A month field carries a
        <code>YYYY-MM</code> value, reads <code>Jul 2026</code> on its trigger face, and opens
        <code>ui-date-picker type="month" monthOnly</code> — picking a month commits and STAYS on
        the month grid instead of drilling into days. A month bound is widened to the first/last day
        for the picker, so <code>max="2026-09"</code> leaves September itself selectable.
      </p>
      <div class="row dp-month-input-row">
        <div class="w200">
          <ui-date-input type="month" [(value)]="dpMonthInputValue" max="2026-09" />
        </div>
      </div>
      <p class="hint">Month value: {{ dpMonthInputValue() ?? '—' }}</p>

      <h3><code>min</code> / <code>max</code> are a rule the field cannot escape</h3>
      <p class="hint">
        D3, 6 Sep 2026 — the owner's the monitoring app bug. The desk lead's month filter carries
        <code>max="2026-07"</code>, and the field ended up DISPLAYING <code>2026-08</code> while the
        page went on filtering July. The bound there is a permission, not a decoration: the Desk
        Head must not be able to reach August at all. So <code>ui-date-input</code>, the component
        that owns <code>min</code> / <code>max</code>, is the component that enforces them — every
        value the FIELD produces is clamped into range, for <code>type="date"</code> and
        <code>type="month"</code> alike. Try it below: type or paste a month after July, or a date
        outside the 10–20 Sep window, and the field snaps to the nearest bound.
      </p>
      <p class="hint">
        CLAMP, not revert-to-the-last-valid-value. The bound is the furthest you may legally go, so
        snapping to it answers "how far can I actually get?" and keeps whatever else about the edit
        was legal; a revert answers nothing and has no defined result at all on first entry, when
        there is no earlier value to revert to. An empty field is "unset", never "out of range".
```


## Provenance

§14 (optional background — no Figma access required to use this component)
