# UiAccordion

**Selector:** `ui-accordion`

**Import**

```ts
import { UiAccordion } from 'ai-dls-kit';
```

## Description

Canonical accordion — DLS accordion-box replica (REGISTER.md
§1, "DLS 3.1 replica" round, 2 Sep 2026): 4px radius, elevation-1 shadow,
48px-minimum header with content-driven height, spring-rotating 24px
chevron, grid-rows open/close animation (animates to actual content
height, no max-height hacks). Optional actions slot sits left of the
chevron:

  <ui-accordion title="Desk Details">
    <button ui-button variant="secondary" accordion-actions>Edit</button>
    …body…
  </ui-accordion>

`barColor` and `count` are the monitoring app header variant (Figma
1159:185471 / 1159:185472) — a 4x32 rounded bar inset 8px on the left, and
a count badge after the title:

  <ui-accordion title="Not started" barColor="grey" [count]="12">…

ONE COMPONENT, TWO OPTIONAL INPUTS, not a sibling. Everything the variant
does NOT change is everything this component is: the 48px header, the
chevron's spring, the grid-rows animation, the actions slot, the open/close
state. A `ui-accordion-bar` sibling would have had to copy all of it to add
a 4px rectangle and a chip, and the two would then drift on the parts that
were never meant to differ. Both inputs default to "absent", so every call
site that predates the variant renders byte-identically.

`count` is `number | null`, not `number` — `0` is a real count worth
showing ("this bucket is empty" is information), so absence needs its own
value rather than borrowing a falsy one.

**Projected header** (`[accordion-header]`, 5 Sep 2026) — for the three
header anatomies the app hand-rolls today (System Access's platform row:
name + count + edit/revoke icon-buttons; Profile's desk-group row: name +
pipe-separated meta; Inbox's raised-clarification row: name + inline
status tag) the built-in `title`/`subtitle`/`count` are not enough. Mark
an element with the `UiAccordionHeader` directive and it renders in the
LEFT of the header in place of the built-in title/subtitle/count:

  <ui-accordion title="the reference app" [defaultOpen]="false">
    <div accordion-header class="pf-header-text">…</div>
    <button accordion-actions ui-icon-button size="tiny" …>…</button>
    …body…
  </ui-accordion>

Everything else stays the kit's: the bar (and its 16/16 offset), the
right-side `[accordion-actions]` slot, the chevron, open/close, hover,
focus ring, keyboard. The header keeps DLS geometry regardless of what is
projected — 12px vertical / 16px horizontal padding, 48px minimum — the
slot wrapper carries a 24px min-height (48 − 2 × 12) so a one-line
projection sits at exactly the built-in height, and taller content grows
it the same way `subtitle` does. `title` stays required even when the
slot is used: it is still the accessible name the toggle is announced
with (`aria-label` on the header), since projected markup cannot serve
as one. Consumers still pass `count`/`subtitle` at their own risk — they
are simply not drawn while the slot is present.

The badge is `ui-badge`, the kit's existing answer to "how many things are
in there?". NOTE one deviation from the harvested Figma values
(the reference app's internal notes): the node draws the count at `label/xs` (12px)
and `ui-badge`'s count emphasis is `label/2xs` (10px). Fill, height, padding
and radius all match exactly. Forking the badge or giving it a size axis
over 2px would undo the reasoning in badge.ts — which argued from the two
DLS instances that existed at the time — so the kit component wins here and
the delta is Sid's call at QC.

**Title-area toggle when actions are present** (`UiAccordionActions`,
5 Sep 2026) — with nothing in `[accordion-actions]` the whole `.header`
row is the toggle (`role="button"`, `tabindex="0"`, Enter/Space), exactly
as before. The moment the slot holds a marked element the toggle moves
onto `.header-main` — the bar + title (or `[accordion-header]` slot)
column — which carries the role, tabindex, `aria-expanded`, the
`aria-label` and the keyboard handlers instead, and `.header` carries
none of them. Why: a search input or an icon-button inside a
`role="button"` is invalid nesting, its Enter/Space bubbled up and
toggled the panel, and it could not be a tab stop of its own. Now the
actions are ordinary tab stops in DOM order (title toggle -> actions ->
body), and clicking them never toggles. The chevron stays where it is
(right of the actions, geometry untouched) and still toggles on click —
it forwards to the same `toggle()` — but it is `aria-hidden`, so the
title area is the ONE accessible toggle. Nothing visible changes: the
hover wash stays on the full row (`.header:hover`), the focus ring still
wraps the full header (`.header:has(> .header-main:focus-visible)`), and
`.header-main` extends under the header's own left and vertical padding
so the clickable band is the same as it was. This is the kit answer to
the app's two "partial-toggle" headers.

**`lazyBody`** (5 Sep 2026) — `false` by default. For panels whose
content is expensive (a table): with `lazyBody` the `[accordion-body]`
template is not stamped until the FIRST open, so a group that starts and
stays collapsed never builds it. `hasOpened` latches on that first open
and never resets — re-collapsing keeps the panel built, so the close
animation has real content to animate over and re-opening is instant.
The grid-rows animation still plays on the first open: the template is
stamped in the same change-detection pass that flips `.body-open`, so
the `1fr` row measures the freshly-built content. Nine app sites guard
their bodies with `@if` today for exactly this reason (inventory §A
cross-cutting note 3); this is the kit form of that guard. Only the
template is deferred — the default `<ng-content>` slot still projects,
eagerly, as it always has (see `UiAccordionBody` for why it cannot be
anything else).

**Controlled open state** (`expanded`, 6 Sep 2026) — a
`model<boolean | null>`, `null` by default. `null` is the uncontrolled
accordion every existing call site is: `defaultOpen` seeds a private
signal and the header toggles it. Any non-null value is CONTROLLED: the
header reflects `expanded()` and every user toggle writes the model —
which is also what emits `expandedChange` — so a parent that OWNS the
state binds both directions and a parent that only wants to KNOW listens
to the output alone:

  <!-- the parent's Set<string> survives a tab switch that destroys the list -->
  <ui-accordion title="the reference app" [expanded]="isOpen(id)" (expandedChange)="toggle(id)">…

  <!-- fires on every expand, so a "seen" marker can clear a badge each time -->
  <ui-accordion title="Riku ⇄ Nao" [defaultOpen]="false" (expandedChange)="$event && markSeen()">…

One rule, not two modes, in `toggle()`: it always writes `!open()` to the
model. An uncontrolled accordion's first toggle therefore moves it onto
the model at exactly the value the private signal would have taken, and
from then on the model carries — indistinguishable from before to the
accordion itself, but the output now fires for every toggle whichever way
the parent bound it. The model never emits for a value the PARENT pushes
in (`[expanded]="true"` from outside is not a user toggle), which is the
`markSeen` contract above. `expandable` still gates everything: a
non-expandable accordion reports closed and ignores toggles whatever the
model says. `lazyBody`'s `hasOpened` latches from the EFFECTIVE open
state (an `effect`), so a parent that opens a controlled accordion
programmatically stamps the template the same as a click would. Note
`expandedChange`'s payload is typed `boolean | null` (a model emits its
own type) but only `toggle()` ever writes it, so it is a boolean every
time it fires — `$event === true` is the safe "did it just open" test.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` (required) | `string` | — |
| `subtitle` | `string | null` | `null` |
| `defaultOpen` | `(inferred)` | `true` |
| `barColor` | `UiAccordionBarColor | null` | `null` |
| `count` | `number | null` | `null` |
| `expandable` | `(inferred)` | `true` |
| `lazyBody` | `(inferred)` | `false, { transform: booleanAttribute }` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `expanded` | `boolean | null` | `null` |

## Types

The four `ui-pill` status colours, plus the one hue that is not a status.

Deliberately a SUPERSET of `UiPillColor` rather than a fresh union: a bar's
job is to say "everything under me is in this state", so it must be the same
colour as the status dots on the rows inside it, and the cheapest way to
guarantee that is to make the two share a vocabulary. A call site can hand
`DETECTION_REVIEW_STATUS_META[status].dot` straight to `barColor` and the
bar cannot drift from its rows — there is no second mapping table to keep
in step. `'purple'` is the exception the design has: Data Rectification is
not a `DetectionReviewStatus`, so it has no dot to borrow and names its own.

```ts
export type UiAccordionBarColor = UiPillColor | 'purple';
```

## Slots

- Default (unnamed) content projection
- `select="[accordion-header]"`
- `select="[accordion-actions]"`


## Example

From the kit's kitchen sink:

```html
</p>
    </div>
    <div class="demos">
      <ui-accordion title="Desk Details">
        <button ui-button variant="secondary" accordion-actions>Edit</button>
        <div class="accordion-demo-body">
          <p class="hint">Grid-rows animation — expands to actual content height.</p>
        </div>
      </ui-accordion>
      <div class="spacer"></div>
      <h3>Header variant — left bar + count</h3>
      <div class="accordion-variants">
        <ui-accordion title="Data rectification" barColor="purple" [count]="8" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">The one bar with no status behind it.</p></div>
        </ui-accordion>
        <ui-accordion title="Not started" barColor="grey" [count]="12" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Grey by owner override — Figma draws this one amber.</p></div>
        </ui-accordion>
        <ui-accordion title="Clarification" barColor="yellow" [count]="3" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Same yellow as the Clarification status dot.</p></div>
        </ui-accordion>
        <ui-accordion title="Closed with breach" barColor="red" [count]="0" [defaultOpen]="false" [expandable]="false">
          <div class="accordion-demo-body"><p class="hint">Never renders — a non-expandable accordion has no body.</p></div>
        </ui-accordion>
        <ui-accordion title="Closed with no issues" barColor="green" [count]="27" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Same green as the Non Breach / Acknowledged dots.</p></div>
        </ui-accordion>
        <ui-accordion title="No bar, no count" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Both inputs absent — what every pre-variant call site renders.</p></div>
        </ui-accordion>
      </div>
      <p class="hint">Bar colours come from the same tokens as the matching ui-pill status dot, so a bar and the rows inside it cannot drift.</p>
      <div class="spacer"></div>
      <h3>Subtitle (DLS gap b)</h3>
      <div class="accordion-variants">
        <ui-accordion title="Desk Details" subtitle="FX Options — APAC">
          <div class="accordion-demo-body"><p class="hint">Second line under the title, label/sm, --color-text-subtle, 4px gap — the header grows to fit it.</p></div>
        </ui-accordion>
        <ui-accordion title="Data rectification" subtitle="8 items awaiting review" barColor="purple" [count]="8">
          <div class="accordion-demo-body"><p class="hint">Subtitle + header action together — actions slot, bar and count are all unaffected by the extra line.</p></div>
```


## Provenance

REGISTER.md §1 (optional background — no Figma access required to use this component)
