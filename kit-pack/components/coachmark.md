# UiCoachmark

**Selector:** `ui-coachmark`

**Import**

```ts
import { UiCoachmark } from 'ai-dls-kit';
```

## Description

Coachmark — the DLS 3.1 `coachmark` component (page 21702:183823, set
`188493:2143`, REGISTER.md §12, audited 2 Sep 2026). A 320px
dark onboarding-tour panel: title + close, projected body copy, an
optional image, and an optional "N of M" stepper footer with outlined
on-dim arrow controls.

  <ui-coachmark title="Filter your trades" placement="bottom" (closed)="dismiss()">
    Use the filter bar to narrow this list by desk, status or date.
  </ui-coachmark>

  <ui-coachmark
    title="Step 2: Review flags"
    [step]="2" [total]="5"
    placement="bottom-left"
    (previous)="back()" (next)="advance()" (closed)="dismiss()"
  >
    Detected mismatches are highlighted in amber.
    <img uiCoachmarkImage src="…" alt="" />
  </ui-coachmark>

── PANEL (188493:2144) ───────────────────────────────────────────────────
bg `--color-bg-dim` (#172733, DLS `background-level_4`), radius
`--radius-sm` (4, `border_radius-panel-md`), 16px horizontal / 12px
vertical padding, 16px internal gap between the content block / image /
footer, 320px wide. Neither the horizontal 16px padding nor
the 16px inter-block gap has a matching token — DLS's panel-padding scale
runs h-sm(12)/h-lg(24) and the gap scale tops out at block-h(12); no
h-md(16) or gap-lg(16) step exists (the same trap `ui-card`'s 16px gap
documents, card.scss). Hardcoded here rather than reaching for the
nearest wrong-value token; flagged to the lead as a token gap, same as
`ui-card`'s.

── HEADER + BODY (`.cm-content`) ─────────────────────────────────────────
`title` heading/2xs white — 14px here (compactness override, DLS's own
printed heading/2xs is 16; the owner's ruling already pulls this role to
14px everywhere else it appears, see `ui-tooltip`'s title and
REGISTER.md's decision log) — flex 1, a 24px
`ui-icon-button shape="square" size="tiny" tone="on-dim" [outline]="true"`
close control (DLS: outline · tiny · dim — the outline was missing until
the 6 Sep 2026 harvest, item 29; hand-authored 16px × glyph) at the
row's other end, 12px between them.
Body is the default-slot projection, body/sm white, 4px under the header
row (both wrapped in `.cm-content` so that 4px is one `gap`, not a
margin either side could duplicate).

── IMAGE (optional, `[uiCoachmarkImage]`) ────────────────────────────────
288×162 (16:9) box, 4px radius, `overflow: hidden`. The caller projects
an `<img>`; `.cm-image` is always rendered — an unprojected slot renders
nothing and `.cm-image:empty { display: none }` (coachmark.scss) collapses
its box and its share of the panel's gap, the same "always-render, let
:empty do the work" call `ui-alert`'s actions slot documents — cheaper
than a `ContentChild` round-trip to detect projected content. TRAP: the
projected `<img>` carries the CALLER's encapsulation attribute, not this
component's, so a plain scoped `.cm-image img { … }` rule can never reach
it (the reference app's internal notes "projected content cannot be styled from its host");
coachmark.scss sizes it to fill via `::ng-deep`, the same escape
`ui-button`'s icon slots and `ui-icon-button`'s glyph use.

── FOOTER (optional, `step`/`total`) ─────────────────────────────────────
Renders only when `total` is set (DLS's title+body+close-only variation
has no footer at all). Left: "{step} of {total}" body/sm white, flex 1 —
omitted (footer right-aligned via `.cm-footer--end`) when `step` isn't
also set, so a caller can show bare prev/next controls with no counter.
Right: two 32px `ui-icon-button size="small" tone="on-dim" [outline]="true"`
controls, 8px apart — hand-authored 24px arrow-left / arrow-right glyphs.
DLS's two step-edge variations are input-driven, not separate templates:
on step 1 the back button is omitted entirely (DLS "1 of 5" shows only
→, not a disabled ←); on the last step the forward button's glyph swaps
to a tick (DLS "5 of 5") and still emits `next` — the caller decides what
"done" means (close the tour, navigate away, …), this component only
reports the click. `.cm-next--last` marks that swapped state for anyone
scripting against it (tests included) without parsing the projected SVG.

── POINTER (`.cm-pointer`, DLS `.tooltip-pointer` 188493:2145) ──────────
Rebuilt 6 Sep 2026 (kit-fixes item 29). DLS's pointer is a 34×8 BOX
whose visible triangle is the path `M17 0 L22 8 H12 Z` — 10 wide × 8
tall, centred in the box — filled with the panel's `--color-bg-dim`. It
is NOT a 34-wide wedge: the first build drew the whole box as a
border-triangle, 3.4× too wide. Rendered here as an inline `<svg>` (34×8
on the top/bottom edges, 8×34 on the sides; `pointerKind` picks the
path that points the right way), `pointer-events: none`.
`placement` sets which EDGE it sits on — the edge FACING the anchor, i.e.
the side the panel was placed on relative to it: `top*` placements put
the panel above the anchor, so the pointer sits on the panel's BOTTOM
edge, pointing down; `bottom*` is the mirror (pointer on the TOP edge,
pointing up); `left` (panel to the anchor's left) puts it on the RIGHT
edge, pointing right; `right` on the LEFT edge, pointing left. Along
the edge (harvested off the nine `Placement=` symbols, panel 320 wide):
the bare `top`/`bottom` values centre the box (x=143, tip at 160);
`-left`/`-right` put the box FLUSH with the panel corner (x=0 / x=286,
so the tip lands 17px in from that corner — not 16px inset as before);
`left`/`right` centre the 8×34 box on the side edge (y=143). `none`
renders no pointer at all — the DLS "No arrow" axis value.

── POSITIONING IS THE CALLER'S JOB ────────────────────────────────────────
Unlike `ui-tooltip`, this component does NOT anchor, flip, or track
anything — `placement` only selects the pointer's edge/alignment, exactly
as documented above. The panel renders wherever it sits in the DOM; a
caller wanting it pinned beside a real anchor element positions the host
itself (`position: absolute`/`fixed` + coordinates, a CDK overlay, or
simple in-flow placement next to the target) and picks the matching
`placement` so the pointer's edge agrees with where the panel actually
ended up. That split is deliberate, not a shortcut: DLS's own "arrow can
move based on where the content is" framing (recorded on `ui-tooltip`)
describes a floating tooltip anchored to one small trigger; a coachmark
is placed by a TOUR — a sequence with its own step-to-target mapping,
possibly scroll-into-view logic, possibly a scrim — none of which exists
in the reference app yet. Building a bespoke positioner here would be guessing at
that future directive's shape.

Variations frame (188493:2270) covered: title+body+close only (no
`step`/`total`); + stepper; first step (no back button); last step (tick
glyph); with image.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` (required) | `string` | — |
| `placement` | `UiCoachmarkPlacement` | `'bottom'` |
| `width` | `(inferred)` | `320` |
| `step` | `number` | — |
| `total` | `number` | — |

**Outputs**

| Name | Type |
| --- | --- |
| `closed` | `void` |
| `previous` | `void` |
| `next` | `void` |

## Types

```ts
export type UiCoachmarkPlacement =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right'
  | 'none';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<h3>Title + body + close only</h3>
      <p class="hint">No <code>step</code>/<code>total</code> — the footer is omitted entirely.</p>
      <div class="row cm-basic-row">
        <ui-coachmark title="Filter your trades" (closed)="onCoachmarkEvent('basic: closed')">
          Use the filter bar to narrow this list by desk, status or date.
        </ui-coachmark>
      </div>

      <h3>Stepper — first/last step variations</h3>
      <p class="hint">
        A live 5-step demo (<code>cmStep</code> signal) — the back arrow is absent on step 1 (DLS
        "1 of 5" shows only →), and the forward control swaps to a tick on step 5 (DLS "5 of 5"),
        still emitting <code>next</code>.
      </p>
      <div class="row cm-stepper-row">
        <ui-coachmark
          title="Step {{ cmStep() }}: Review flags"
          [step]="cmStep()"
          [total]="5"
          placement="bottom"
          (previous)="onCoachmarkPrev()"
          (next)="onCoachmarkNext()"
          (closed)="onCoachmarkEvent('stepper: closed')"
        >
          Detected mismatches are highlighted in amber.
        </ui-coachmark>
      </div>

      <h3>With image</h3>
      <div class="row cm-image-row">
        <ui-coachmark
          title="See the full picture"
          placement="bottom"
          (closed)="onCoachmarkEvent('image: closed')"
        >
          Every flagged trade carries a before/after snapshot.
          <img uiCoachmarkImage [src]="coachmarkDemoImage" alt="" />
        </ui-coachmark>
      </div>
```


## Provenance

REGISTER.md §12 (optional background — no Figma access required to use this component)
