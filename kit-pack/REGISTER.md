> **What this is:** the internal audit trail the kit's authors kept while
> building this kit against DBS's DLS 3.1 Figma library — Figma node ids,
> per-component numbering, and the owner's design-decision rulings. It is
> BACKGROUND, not required reading: everything you need to build a screen
> is in `KIT.md`, `RECIPES.md`, `components/*.md`, `TOKENS.md` and
> `RULES.md`. Skip this unless you're curious how a specific component's
> shape was decided. Where it says "the reference app" it means the
> internal product the kit was first built for — not something you need.

---

# DLS 3.1 → Kitchen Sink gap register

The archival replica drive (owner, 2 Sep 2026): DBS library access will
lapse soon, so the DLS 3.1 Components file is being walked **component by
component** and every gap — (a) missing component, (b) missing
variants/states/anatomy on an existing kit piece, (c) visual drift from
the DLS spec — is replicated into `the kit` + the kitchen sink.
Cadence per the owner: one component → gap review with him → agent build
→ test → next. The lead audits Figma and verifies; agents build.

Figma file: `DLS 3.1 - Components` (key `i4D5zUa2sow1B7CHQuj409`) — must
be OPEN in Figma desktop for the MCP to read it.

## Walking order (page id — component)

Component pages, in file order. Guideline sub-pages are pulled with their
parent component. Foundation pages (Colour 137:3354, Icons 56918:293743,
Interaction States 69799:347948, Grids 305:2694, Content 40025:278920,
Accessibility 2244:9293) are consulted per component as needed.

| # | Page id | Component | Status |
|---|---------|-----------|--------|
| 1 | 2272:0 | Accordion | BUILT ✓ (f40) |
| 2 | 11300:94526 | Alert | BUILT ✓ (f41) |
| 3 | 305:2694+ | Avatar (305:2695) | BUILT ✓ (f42) |
| 4 | 379:18 | Badge | BUILT ✓ (f43) |
| 5 | 24337:190243 | Bottom sheet | SKIPPED (owner, 2 Sep) — mobile pattern; spec archived in §5 |
| 6 | 1398:1260 | Breadcrumb | BUILT ✓ (f47) |
| 7 | 305:2699 | Button | BUILT ✓ (f46) |
| 8 | 186153:6433 | Icon button | BUILT ✓ (f48) |
| 9 | 305:2702 | Card | BUILT ✓ (f49) |
| 10 | 305:2701 | Checkbox | BUILT ✓ (f50) |
| 11 | 220898:2706 | Chips | BUILT ✓ (f51) |
| 12 | 21702:183823 | Coachmark | BUILT ✓ (f52) |
| 13 | 2062:0 | Currency pair | BUILT ✓ (f53) |
| 14 | 305:2703 | Date picker | BUILT ✓ (f56) |
| 15 | 1656:258 | Drawer | BUILT ✓ (f58) |
| 16 | 21773:183824 | Dropdown | BUILT ✓ (f57) |
| 17 | 467:1104 | Empty state | BUILT ✓ (f59) |
| 18 | 305:2720 | Floating action button | BUILT ✓ (f54) |
| 19 | 30431:265173 | Focus overlay | BUILT ✓ (f60) |
| 20 | 305:2707 | Information banner | BUILT ✓ (f55) |
| 21 | 305:2709 | Input field | BUILT ✓ (f61 form-field, f62 select, f63 types, f64 migration) |
| 22 | 48927:248025 | Input OTP | SKIPPED (owner, 3 Sep) — no OTP step; spec archived in §22 |
| 23 | 48927:248026 | Input search | BUILT ✓ (f63) |
| 24 | 50298:240310 | Input transfer | SKIPPED (owner, 3 Sep) — consumer remittance pattern; spec archived in §24 |
| 25 | 23938:188536 | Link | BUILT ✓ (f65) |
| 26 | 2475:122 | List | DEFERRED (owner, 3 Sep) — no consumer; spec archived in §26 |
| 27 | 10392:69046 | Loader | BUILT ✓ (f66) |
| 28 | 305:2697 | Modal | BUILT ✓ (f67) |
| 29 | 305:2696 | Navigation (+ guideline 244310:26508) | BUILT ✓ (f68 rail, f69 panel) |
| 30 | 467:1105 | Pagination | BUILT ✓ (f70) |
| 31 | 3260:1 | Popover | BUILT ✓ (f71) |
| 32 | 305:2706 | Progress bar | BUILT ✓ (f72) |
| 33 | 5401:31769 | Quicklink | BUILT ✓ (f73) |
| 34 | 305:2705 | Radio | BUILT ✓ (f74) |
| 35 | 23938:189403 | Slider [DRAFT in DLS] | SKIPPED (owner, 3 Sep) — DLS draft, no Angular package; spec archived in §35 |
| 36 | 305:2698 | Select | BUILT ✓ (f62 listbox, f76 option extras) |
| 37 | 305:2717 | Snackbar | BUILT ✓ (f77) |
| 38 | 36356:268586 | Stepper (+ guidelines 208503:2126, 186153:65870) | BUILT ✓ (f78) |
| 39 | 760:1788 | Switch | BUILT ✓ (f79) |
| 40 | 305:2721 | Table (+ guideline 165411:165187) | BUILT — f80 f81 f82 f83 f84 (Round 40) |
| 41 | 305:2714 | Tabs | BUILT ✓ (f85, f90) |
| 42 | 305:2715 | Tag | BUILT ✓ (f86) |
| 43 | 207412:99 | Tracker (+ guideline 237778:405) | BUILT ✓ (f87) — ui-timeline retired |
| 44 | 305:2708 | Tooltip | BUILT ✓ (f89) |
| 45 | 467:1106 | File upload | BUILT ✓ (f88) |
| 46 | 134269:902 | File download | BUILT ✓ (f88) |
| 47 | 42879:279080 | Scrollbar (design only) | SKIPPED (owner) — OS-native art; spec archived in §47 |
| 48 | 2504:12578 / 467:1108 | MISC: Overlay background, Thumbnail | BUILT ✓ (f91) — Thumbnail skipped, a DLS placeholder page |

Skipped knowingly: Cover, Get started, Index, Cursor guideline,
Graveyard, Compliance, "Stepper Old" (superseded inside the file).

## Gap entries

One section per audited component: the DLS spec's anatomy/variants, the
sink's current state, and the a/b/c gaps — reviewed with the owner
before the build agent is briefed.

---

### 1. Accordion (page 2272:0) — audited 2 Sep 2026

**DLS spec** — two component sets + one sub-component:
- `accordion-box` (2276:11511): bordered card (1px border-decorative,
  radius panel-md 4px, elevation-1 `0 1px 0 rgba(0,0,0,.05)`), header
  16px/12px padding, gap 12; title label/md (16/500) text-strong;
  OPTIONAL subtitle label/sm text-subtle, 4px under; OPTIONAL plain
  action button (32px, label/sm) left of a 24px chevron. Variants:
  Expanded x Type(Default body text | Slot projection) x
  State(Default/Hover/Focus — focus draws a blue ring around the whole
  header). Docs URL on node: webstudio-portal .../accordion/accordion-item.
- `accordion-separator` (1959:7, "ContentSeparator"): NO box — a
  background-alt (#f7f7f7) header bar, radius 4, title label/md,
  optional subtitle (#455057), optional PLAIN TINY action ("Edit", 24px,
  label/sm) left of the chevron; body is free content below the bar.
  Variants: Expanded x Type(Default/Slot) x State(Default/Hover).
- `accordion-body` (150700:76944): Content=Default (body/md text) /
  Form (label+info-icon / value grid) / Slot.

**Sink today** (`ui-accordion`): box chrome (border-decorative +
radius-md 8px + bg-level1), 48px header, hover tint, spring chevron
(16px), grid-rows body animation, actions slot left of the chevron,
body projection (~Type=Slot), `expandable` dead-accordion rule, plus
the kit extensions `barColor` + `count` (not DLS; keep as opt-ins).

**Gaps:**
- (a) MISSING: `ui-content-separator` (the accordion-separator) — no
  kit equivalent at all.
- (b) MISSING ON `ui-accordion`: subtitle line; focus-visible ring on
  the header (no keyboard focus treatment today).
- (c) DRIFT vs DLS: radius 8px vs panel-md 4px; no elevation-1 shadow;
  header padding 24L/16R fixed-48px vs DLS 16/16 + 12 vertical
  (content-driven, grows with subtitle); chevron 16px vs 24px; title
  heading/2xs (14/600) vs DLS label/md (16/500) — the 600 weight was a
  RECORDED deliberate ruling for cross-kit title consistency, flagged
  to the owner for a keep-or-replicate call.

**Owner decisions (2 Sep 2026):** (1) drift fixes on the base — yes;
(2) title stays 14px, weight from DLS at 500 (THE COMPACTNESS OVERRIDE
— standing rule for the whole drive); (3) kit extensions stay as the
reusable compact opt-ins.

**BUILT (agent, lead-verified):** ui-accordion → 4px radius,
elevation-1, 24px chevron, 12/16 content-driven header (48px min),
subtitle input, focus-visible ring, title label(md) 14/500 (label(sm)
is 13px — the brief's label(sm) call was wrong, agent caught it); NEW
`ui-content-separator` (bg-alt bar, subtitle, plain tiny action —
text-STRONG per the node, lead corrected the agent's primary-colour
guess — actionActivated without toggling, same grid-rows animation).
Sink sections + an e2e spec (7 specs). Fallout: the
accordion header's new role="button" made two unscoped
getByRole('button', {name:'Close'}) calls ambiguous against "Closed
with breach/no issues" headers — scoped + exact:true; a NEW HAZARD
CLASS for future specs. No new tokens needed.

---

### 2. Alert (page 11300:94526) — audited 2 Sep 2026

**DLS spec** — ONE component set `alert` (11895:97216), and it is
DANGER-ONLY: every variant renders the red validation alert (info/
success/warning tones are NOT here — they belong to Information banner,
walk item 20). Axes: Variation (No title / Default / With actions /
With anchor) x Size (Standard / "Small (for internal tools)") x
Platform (Desktop / Mobile).

Anatomy (shared chrome): bg level_2, 1px border-danger, radius panel-md
4px, elevation-2 drop-shadow (0 2px 2px .05 + 0 0 .5px .25), padding
16/12, gap 12; 24px `triangle-exclamation-filled` status icon top-left.
- No title: one body/sm line (text tone #455057), 48px tall.
- Default: title heading/2xs (semibold) + body/sm line under, 4px gap.
- With actions: text block, then a row of two actions — a secondary
  "Label" button + a plain tiny "Label" (label/sm) beside it.
- With anchor: title + a BULLETED list of underlined anchor links
  (body/sm, subtle tone) — the validation-summary pattern ("SG mobile
  numbers have 8 digits" etc.); each anchor is a jump target.
Standard vs Small showed no measurable difference in the harvest
(identical variant heights/typography at this fidelity); the Small
"(for internal tools)" naming makes it OUR size regardless — the
compactness override applies.

**Sink today:** nothing equivalent. `ui-info-banner` is a message-only
guidance band and `ui-snackbar` a toast; neither is the bordered
danger alert with icon/actions/anchors.

**Gaps:** (a) MISSING outright — `ui-alert`, all four Variations,
desktop, Small size. (b)/(c): none (no existing component to extend).

**Proposed build:** `ui-alert` with `title?`, message text (projection
or input), `actions` variation via projected buttons (slot), and
`anchors?: {label, id}[]` emitting `anchorActivated` for the
jump-to-field pattern; danger-only per the DLS, tone axis deliberately
NOT invented. Mobile variants skipped (desktop platform).

---

### 3. Avatar (page 305:2695) — audited 2 Sep 2026

**DLS spec** — one component set `avatar` (34600:266735), Type × Size:
- **Sizes** = semantic-size-base tokens: xl 56, lg 48, md 40, sm 32,
  xs 24. TRAP: variant names say "Extra Large - 64px" etc. but nodes
  and tokens are 56 — legacy naming in the file, trust the pixels.
- **Types:** Logo (full-bleed circular brand SVG; 26 reference logos),
  Icon (WHITE circle + user glyph), Initials (pastel circle),
  Placeholder (background-neutral #dde3e7 circle + same glyph), Card
  (rect card-face image, circle=false showBorder=false; 40 reference
  faces), Profile Image (circular photo crop).
- **User glyph:** outline person, fill `--semantic-color-icon`
  #69737b; measured 23.33px wide inside the 56px xl (≈42% of box) —
  scaled proportionally per size.
- **Initials:** colour text-on_bright #455057, weight 500 (label
  family); per-size font 24/20/16/14/10 (xl→xs), xs uppercase.
  LETTER RULE: "AA" at md and up, single letter at sm/xs.
- **Palette (16):** 8 flats — goji #ffb5b9, ginger #ffdeb5, lemon
  #fffeb4, lime #dbffb4, melon #b5ffdb, mint #b4f8ff, lavender
  #b4ccff, acai #ecb4ff — plus 8 gradients (goji→ginger, ginger→lemon,
  lemon→lime, lime→melon, melon→mint, mint→lavender, lavender→acai,
  acai→goji). Gradient recipe read from the exported SVG: linear,
  top-left → bottom-right (135deg), two stops 0%/100%.

**Sink before:** `ui-avatar` = initials-only, free px `size` (default
28), caller-supplied raw hex `bg` (persona swatches + the
`threadAvatarBg` name-hash palette), always 10px/500.

**Gaps:** (a) none. (b) type axis, DLS size scale, 16-colour palette
as tokens, per-size initials fonts, single-letter rule. (c) raw-hex
`bg` API vs palette; 28px non-DLS default; local 0.3px tracking.

**Owner decisions (2 Sep 2026):** (1) archive the logo + card-face
reference assets anyway →
The reference app's asset archive; (2) migrate persona/thread colours to
DLS palette NAMES — no more hex moving forward (drop the `bg` hex
input); (3) add the five DLS sizes and snap reference-app callers to the
closest DLS size (28 → sm 32, lead's tie-break: legible initials in
the nav-rail chip, xs stays for dense lists); (4) replicate per-size
fonts + the single-letter rule as-is.

**Harvest traps:** CodeConnect flattening hid ALL variant internals on
this page even with forceCode (logos frame, gradient variant) — the
way through was `download_assets` per symbol node, whose exported SVG
carries the real geometry (that is how the 135deg gradient recipe was
read). Asset URLs are short-lived; re-pull, never cache.

**BUILT (agents, lead-verified 2 Sep 2026):** ui-avatar rebuilt on the
DLS grid — 5 sizes / 4 types / 16 colours (8 flat tokens in
tokens/, gradients composed in avatar.scss so no duplicated
hex), letter rule, per-size fonts all via token refs (16/20/24 borrow
the SIZE half of heading-xs/sm/md, weight/leading stay on label — NO
boundary-allow needed), inline user glyph at 42% of box. `bg` hex and
free-px `size` DELETED; every caller migrated to palette names
. Lead surgical fixes during verification: the
pre-submission "JO" hardcoded hex circle replaced with a ui-avatar bound to
the actual reference-app lead via threadAvatarColour (+ f8 assertion), and the
archive's logo SVGs stripped of a baked-in grey canvas rect (20/25
affected; see the reference app's asset archive). Archive: 25 logo
SVGs + 40 card faces at 224×224 in the reference app's asset archive
DOM-verified vs harvest: sizes 24/32/40/48/56, fonts 10/14/16/20/24,
A/A/AM/AM/AM, all 16 swatch RGBs, 135deg gradients, placeholder
#dde3e7, glyph 16.8px at md (=40×0.42), circle 50% vs card 4px.
Specs: f42 (8) + hardened f8; full suite 426/426. Trap: a
pre-existing spec (f36) read the HOST element's font-size — per-size
type rules live on :host and inherit into .initials for that reason.

---

### 4. Badge (page 379:18) — audited 2 Sep 2026

**DLS spec** — ONE component set `badge` (379:23), six symbols, two axes:
**Type** (Label | Dot) × **Emphasis** (Low | Medium | High). Code Connect
maps it to `<dbs-badge [priority]="'low'|'medium'|'high'">12</dbs-badge>`
(Dot = the same element with no content). No size axis, no tone axis, no
outline/border, no states.
- **Label** (5182:2 / 379:22 / 379:24): height `size-base-3_xs` 16, padding
  0 / `padding-indicator-horizontal-md` 4, radius pill; hugs content — "12"
  measures 21×16, text box 13×14 at (4,1). Type `label/xs`: 12px, weight
  500, line-height 1.2, tracking 0. NO min-width on the node.
- **Dot** (403:2617 / 77321:354343 / 77321:354344): a bare 8×8 ellipse
  (`size-base-5_xs`), same three fills, nothing inside.
- **Emphasis fills (identical for Label and Dot):**
  Low = bg `background-neutral` #dde3e7, text `color-text` #455057;
  Medium = bg `background-inverse` #59656d, text `text-inverse` #fff;
  High = bg `background-danger_strong` #d62300, text `text-on_dim-strong` #fff.
  Every one already exists in tokens.css: `--color-tag-neutral`,
  `--color-bg-inverse` / `--color-text-inverse`, `--color-bg-danger-strong`
  / `--color-text-on-dim`, `--size-base-5xs`, `--size-base-3xs`,
  `--padding-indicator-h-md`, `--radius-pill`. No new tokens needed.

**Sink today**: `variant` = `count`
(default: 16px, 4px pad, tag-neutral, **label/2xs 10px**, text-body) |
`notification` (danger-strong, text-on-dim, label/xs, PLUS a 16px
min-width so a single digit is a circle) | `subtle`. `label` is required. `count` ≈ DLS Low, `notification` ≈ DLS High.

**Gaps:**
- (a) none — the component exists.
- (b) MISSING: **Emphasis=Medium** (inverse grey pill); **Type=Dot** in all
  three emphases (the 8px unread/status dot — `label` must become
  optional for it).
- (c) DRIFT: Low/`count` renders **10px** (`label/2xs`) where DLS is
  **12px** (`label/xs`) — the 10px was harvested from a reference-file nav
  sub-item INSTANCE (155:3893), not from the DLS master, so it is drift,
  not a DLS voice. API naming: the kit says `variant=count|notification`
  where DLS says `emphasis low|medium|high` (Code Connect: `priority`).
  `notification`'s 16px min-width is not on the DLS node.

**Owner decisions (2 Sep 2026):** (1) Low stays **10px** — a RECORDED
compactness override (the second after titles); (2) **rename the axis to
`emphasis="low|medium|high|subtle"`** — callers migrate
(`count`→default low, `notification`→`high`, `subtle`→`subtle`), DOM
class names stay so specs need no edits; (3) `subtle` + `tone` stays as
the reference-app compact extension, riding on the same axis; (4) the High 16px
min-width stays as an extension; (5) the new **Medium is 10px like Low**
— High alone keeps DLS's 12px, so the label sizes are Low 10 / Medium 10
/ High 12 (compactness, deliberate, not DLS).

**BUILT (agent, lead-verified 2 Sep 2026):** ui-badge API is now
`type="label|dot"` × `emphasis="low|medium|high|subtle"` (+ `tone` for
subtle), `label` optional. New `.badge-medium` (bg-inverse /
text-inverse) and `.badge-dot` (8×8, zero padding, min-width 0); every
pre-existing DOM class kept (`badge-notification` still carries High,
`badge-subtle-*` untouched) so no spec needed editing. Five caller
attribute renames (nav-rail, ongoing-clarification-card,
signoff-tracker-drawer, org-node-card ×2) + two comments; strict
templates would have failed the build on any leftover `variant`. Sink
`#ui-badge` rewritten around the DLS axes (`.badge-emphasis-row`,
`.badge-dot-row`, the High trio on `.badge-on-dim`, subtle retitled as
the extension). Lead surgical fix during verification: the agent's
`@if { {{ label() }} }` template left " 12 " with literal spaces in
textContent — replaced with one interpolation (`type() === 'label' ?
(label() ?? '') : ''`) so textContent is exact for spec locators.
DOM-verified live vs harvest: 16px / 4px pad / pill on all three label
emphases; fills rgb(221,227,231) / (89,101,109) / (214,35,0); fonts
10/10/12 at 500; dots 8×8 with the same fills and empty text; High
single digit 16px wide. Trap for the drive: a `<strong>` in sink prose
inherits UA 700 and fails f16-typography — use `<code>` to call out a
value. Spec: an e2e spec (6).

---

### 5. Bottom sheet (page 24337:190243) — audited 2 Sep 2026

**DLS spec** — a MOBILE pattern: a 360px-wide panel anchored to the
viewport bottom with a drag knob. Set `bottom-sheet` (15900:155099), one
axis **Variation** = Select (options only) | Grouped options |
Multi-select | Slot (Container Only). Chrome: bg level_2 white, top
corners radius panel-lg 8px, `elevation-sticky-bottom` (0 0 1px .25 +
0 -2px 4px .05), 24px bottom padding, 8px block gap. Sub-components:
- `bottom-sheet-header` (239577:1551): knob container 8px v-padding
  holding a 32×4 pill in icon-decorative #9ba4ab; then title block
  24px h / 12px v padding, heading/2xs title (16/600, text-strong),
  optional single-line subtitle 4px under (text-subtle); 1px
  border-decorative bottom rule. "Knob only" variant = knob alone, 20px.
- `bottom-sheet-body` (239530:10122): Slot=True (free projection) /
  Slot=False (listbox). Listbox = 4px inset padding, rows stacked at 0
  gap; groups separated by a 1px border-decorative top rule.
- `bottom-sheet-row-header` (219652:9022): 40px, 12px h-pad, label/md
  text-subtle — the group heading.
- `bottom-sheet-select-option` (219599:2657): 40px min (48 with
  avatar), 12px h / 8px v padding, radius panel-md 4px, label/md
  text-strong, 8px gap; axes State (Default / Hover / Focus / Selected /
  Pressed / Disabled) × Avatar × Show icon (24px user glyph). Hover =
  grey tint (bg-hover), Focus = 2px border-access-focus #458fff ring,
  **Selected = background-success_subtlest #e2f8ef + a 4px product
  green bar down the left edge**, Pressed = darker grey, Disabled =
  subtle text/icon.
- `bottom-sheet-multi-select-option` (219718:29371): same row with a
  checkbox in a left slot; axes State × Selected × Avatar × Meta data
  (a second line, 52px row) × Show icon. Multi-select variation also
  carries a `Select all` / `Reset` plain-tiny button row (24px h-pad,
  -4px optical align) above the list.
- `bottom-sheet-footer` (161817:13865): Type=Default (Cancel secondary
  + Next primary side by side, 24/16 padding, 8px gap, own sticky
  elevation) / Stacked (Next over Cancel, full-width).

**Sink today:** no bottom sheet and no need for one — the reference app is a desktop
platform; the kit's overlays are `ui-modal-shell` (focus overlay),
`ui-drawer` (right-hand drawer) and `ui-select` / `ui-multi-select`
(dropdown listboxes). The option-row anatomy above is the piece that
matters to us, and it belongs with **Dropdown (item 16)** and **Select
(item 36)** — the lead will check whether those pages share these rows
or carry their own before any option-row work is briefed.

**Gaps:** (a) `ui-bottom-sheet` missing outright — but it is a mobile
pattern with no reference-app call site. (b)/(c): n/a.

**Owner decision (2 Sep 2026): SKIP the build** — this entry is the
archive. The option-row spec carries forward to items 16/36.

---

### 6. Breadcrumb (page 1398:1260) — audited 2 Sep 2026

**DLS spec** — set `Breadcrumb` (270365:28502), one axis Overflow menu
False/True. A 24px row: `.breadcrumb/link` items separated by
`.breadcrumb/separator`, gap `gap-unit_inline-horizontal` 4px, the row
optically aligned with -4px end margins so the first label's text sits
flush.
- `.breadcrumb/link` (270365:28531) is literally an INSTANCE OF THE DLS
  BUTTON at Variant=Plain, Size=Tiny: 24px tall, 4px h-padding, radius
  action-alt 4, label/sm 14/500, text-subtle #69737b. States: Hover
  bg-hover #eef2f5; Pressed bg-pressed #dde3e7; Focus 2px
  border-access-focus #458fff; **Active** (the current page, last item)
  = text-strong #172733, no chrome, not a link.
- `.breadcrumb/separator` (1400:2554): a "/" glyph, label/md 16px in
  border-decorative #dde3e7, 6×24. Overflow menu=True is the collapsed
  unit: separator + `.breadcrumb/menu-button` + separator (44 wide).
- `.breadcrumb/menu-button` (1400:2542): the icon-only plain tiny
  button (24×24) carrying an ellipsis glyph, same
  Default/Hover/Pressed/Focus states; opens the hidden crumbs.
- Guideline/React/Angular links present on the page (webstudio-portal).

**Sink today:** no `ui-breadcrumb`. ONE hand-rolled breadcrumb in
`pages/mandates/mandates.html` (Team Management / Profile & Mandates):
label/xs 12px, 4px gap, subtle parent + strong current, a "/" at
label/2xs with 50% opacity — drift from the DLS voice on every value.

**Gaps:** (a) MISSING `ui-breadcrumb` (items + current + optional
overflow collapse). The link IS the plain tiny button, so this build
DEPENDS ON item 7 delivering `size="tiny"` + `variant="plain"`.
(c) The mandates breadcrumb migrates onto the kit component.

**Owner decisions (2 Sep 2026):** (1) NOT the mandates 12px; and NOT
DLS's 14px either — crumbs take the kit's `label(sm)` **13px**, the same
voice as the plain tiny button they are built from (see §7 ruling 5);
separator at kit `label(md)` 14px; (2) build the overflow collapse.
Built concurrently with item 7 against the `variant="plain"
size="tiny"` button contract.

**BUILT (agent, lead-verified 2 Sep 2026):** NEW `ui-breadcrumb`
(`lib/breadcrumb/`): `items` (label + optional id),
`maxItems` (0 = never collapse), `navigate` output. Every non-current
crumb IS a `button[ui-button] variant="plain" size="tiny"` recoloured
to text-subtle; the current crumb is an inert `aria-current="page"`
span at text-strong; separators "/" at kit label(md) in
border-decorative; 4px gap, -4px optical end margins. Overflow: first
crumb, an icon-only plain-tiny ellipsis button (`aria-haspopup="menu"`),
then the last `maxItems-1` crumbs; the popover (`role="menu"`, 32px
rows, elevation-3, anchored below-left 4px down) lists the hidden
crumbs, closes on pick / Escape / outside click. The mandates panel's
hand-rolled crumb is gone — `pages/mandates` renders the kit component.
Lead-verified live with REAL clicks: 24px/4px/13px/500 crumbs, subtle
vs strong, 6×24 separator, optical -4px (ol left = host left - 4),
overflow shows 4 crumbs + menu, popover 3 items → pick emits + closes,
Escape closes. Spec: an e2e spec (7). TRAP: the
zoneless render lands after a real click's JS turn — read the DOM on a
retrying expect (or after a tick), never synchronously in the same
turn as the click.

---

### 7. Button (page 305:2699) — audited 2 Sep 2026

**DLS spec** — ONE set `button` (50546:240728, 516 symbols), six axes:
**Variant** Plain | Primary | Secondary; **Size** Tiny 24 | Small 32 |
Medium 40 | Large 48; **State** Default | Hover | Pressed | Focus |
Disabled | Loading; **Left icon** / **Right icon** YES|NO; **Style**
Normal | destructive | positive | On-dim | On-bright. Primary has NO Tiny
(Tiny exists for Secondary and Plain only). Legacy/aux sets on the page
— `filter-button (To be enhanced)`, `text-link (LEGACY)`,
`singpass-button`, `mobile/sticky-buttons (LEGACY)`, `prototype-only` —
are skipped knowingly.
- **Geometry:** height = size token; h-padding `padding-action-h-md`
  12px at Small/Medium/Large, `padding-action-h-xs` 4px at Tiny; radius
  `border_radius-action` 4; gap 8; type label/sm 14 at Tiny+Small,
  label/md 16 at Medium+Large. Icons are 16px at EVERY size (icon
  variants are exactly +24 wide = 16 icon + 8 gap).
- **Fills (Normal):** Primary = `background-product_alt` **#ff3e3e**
  (DBS red), hover #cf2929, pressed #b32b2b, text on_dim-strong white.
  Secondary = transparent + 1px `--color-border` #b0b9c0, text-strong;
  hover bg-hover #eef2f5, pressed bg-pressed #dde3e7 (border steady).
  Plain = no chrome, text-strong; same hover/pressed fills as Secondary.
- **Styles:** destructive = Primary on `background-danger_strong`
  #d62300 / hover #bd2b0f / pressed #4c0000, text-inverse. positive =
  `background-success_strong` #007a45 / #005c34 / #003d23. On-dim =
  Secondary/Plain for dark surfaces: border-on_dim #b0b9c0, text
  on_dim-strong white, hover #455057, pressed #59656d, disabled bg
  #303c44 + text #69737b. On-bright = the same pair for tinted surfaces
  (hover #eef2f5, pressed #dde3e7, disabled text #858f96).
- **Disabled:** bg `background-disabled` #eef2f5, text `text-disabled`
  #9ba4ab, no border — every variant collapses to this.
- **Focus (RESOLVES the open question from the 1 Aug button pass):** a
  **2px SOLID border in border-access-focus #458fff, inside the box**
  (height stays 32) — not an offset ring, no gap, no alpha.
- **Loading:** background = the variant's PRESSED fill; content replaced
  by three 8px pill dots (icon-inverse) at gap 8 with opacity 1 / .6 /
  .2, inside a 16px-tall loader; the button keeps its width.

**Sink today (`ui-button`):** attribute component on `button`/`a`, ONE
size (Small 32, 0/12, gap 8, radius 4, label/sm), `variant` =
primary | secondary | ghost | danger. Primary on the white-label
`--color-primary` #0077cc with DLS-derived hover/pressed; secondary and
ghost hover/pressed already match DLS; danger EXTRAPOLATED
(`--color-danger` #ff4724 / `--color-danger-dark`); focus = 25%-alpha
box-shadow ring; no icon slots, no loading, no tiny/medium/large, no
positive, no on-dim/on-bright. 86 call sites (33 secondary, 8 ghost, 2
danger, 1 explicit primary, the rest default primary).

**Gaps:**
- (b) MISSING: Size=Tiny (needed by Breadcrumb §6, Alert actions §2,
  the bottom-sheet select-all pattern); Medium/Large; State=Loading;
  left/right 16px icon slots; Style=positive; Style=On-dim/On-bright.
- (c) DRIFT: focus ring geometry (alpha shadow vs 2px solid border);
  `danger` colours are extrapolated where DLS now gives destructive's
  real hover/pressed (#bd2b0f/#4c0000 on #d62300); naming — DLS says
  Plain where we say ghost, and destructive is a STYLE on Primary, not
  a variant. Primary colour: DLS product_alt red vs our white-label
  `--color-primary` blue — NOT drift; the token is the white-label seam
  and the reskin swaps it.

**Owner decisions (2 Sep 2026):** (1) sizes **Tiny + Small only** —
"a compact application"; Medium/Large recorded above, not built;
(2) **rename to the DLS axes**: `variant="primary|secondary|plain"`
and the Style axis as a second input
. NAMING TRAP:
the input cannot be called `style` — `ui-button` is an attribute
component on a native `<button>`, so `style="destructive"` would write
inline CSS. It is **`tone`** (`normal | destructive | positive | on-dim
| on-bright`), the kit's existing word for a colour axis (ui-badge);
(3) **all five tones**, so the platform can grow a dark mode later;
(4) lead's read stands: focus = 2px solid inside border (inset shadow,
no layout shift), Loading + 16px icon slots built, `--color-primary`
stays the white-label seam (DLS product_alt red recorded, not applied);
(5) **text stays kit `label(sm)` 13px** at both sizes — the owner reads
DLS's label/sm 14px as a DLS-side issue; the platform's button voice is
13px (a recorded override; f16 keeps its 13px guard).

**BUILT (agent, lead-verified 2 Sep 2026):** `ui-button` inputs are now
`variant="primary|secondary|plain"`, `size="small|tiny"`,
`tone="normal|destructive|positive|on-dim|on-bright"`, `loading`,
`iconOnly`; projection slots `[uiButtonIconLeft]` / `[uiButtonIconRight]`
fixed at 16px via `:host ::ng-deep` (the projected-content trap, commented).
Host classes `ui-button--<variant|size|tone-x|loading|icon-only>`.
Focus = `inset 0 0 0 2px var(--color-focus)` (existing #458fff token,
no duplicate added). Loading = pressed fill via a per-cell
`--ui-button-pressed-bg` custom property + three 8px dots at 1/.6/.2 in
currentColor, label hidden not removed (width holds), `aria-busy`.
New tokens: `--padding-action-h-xs`, danger-strong hover/pressed,
success-strong + hover/pressed, border-on-dim, bg-on-dim
hover/pressed/disabled, text-on-dim-disabled, text-on-bright-disabled
(on-bright hover/pressed reuse bg-hover/bg-pressed — identical values).
Callers: 8 `ghost`→`plain`, 2 `danger`→`primary tone="destructive"`, a
dead `size="sm"` on system-access fixed to `small`. Undefined
variant×tone cells fall back to the variant's Normal look (documented).
Secondary keeps its white `--color-bg-level1` fill (DLS node says
transparent; on a white surface identical, and on-dim overrides to
transparent) — recorded, not changed. Lead surgical fixes: the sink's
on-bright backdrop moved from `--color-bg-alt` (#f7f7f7, invisible on
the #f5f7f9 page) to the info tint; the Alert demo's plain action is
now `size="tiny"`, closing the gap §2 flagged. Lead-verified live:
32/24 heights, 0 12 / 0 4 padding, 13px/500, every tone fill, on-dim
disabled pair, icon-only 24×24, dots 8px at 1/.6/.2, loading width ==
resting width, REAL Tab focus → inset 2px rgb(69,143,255) at 32px
height. Spec: an e2e spec (7).

---

### 8. Icon button (page 186153:6433) — audited 2 Sep 2026

**DLS spec** — ONE set `icon-button` (50671:241589, 240 symbols), five
axes: **Type** Square | Circle; **Size** Tiny 24 | Small 32 | Medium 40 |
Large 48; **State** Default | Hover | Pressed | Focus | Disabled;
**Style** Normal | On-dim | On-bright; **Outline** NO | YES.
- Box = size token; radius `border_radius-action-alt` 4 (Square) or pill
  (Circle); NO fill at rest; Outline=YES adds 1px `--color-border`
  (`border-on_dim` on dim). Glyph 24px at Small/Medium/Large, **16px at
  Tiny**, colour `--color-icon` #69737b (on-dim: white #fff).
- States: Hover bg-hover #eef2f5; Pressed bg-pressed #dde3e7; Focus 2px
  solid `border-access-focus` #458fff; Disabled bg-disabled #eef2f5 +
  glyph icon-disabled #c7cfd5. On-dim: hover #455057, pressed #59656d,
  disabled bg #303c44 + glyph #69737b. On-bright = Normal's values.
- Every token already exists after the Button round (§7).

**Sink today:** no `ui-icon-button`. Round 33 gave `ui-button` an
`iconOnly` flag (plain, square, text-STRONG glyph, 16px icon at both
sizes) — a stand-in that mis-colours the glyph (DLS: icon grey) and
mis-sizes it at Small (DLS: 24). The reference app carries ~15 HAND-ROLLED icon
buttons under `boundary-allow` (close-btn ×3, icon-btn ×4, kebab-btn,
more-btn, header-btn ×2, expand-btn, back-btn, ai-banner-close,
snackbar-close) plus `ui-kebab-menu`'s 28px trigger.

**Gaps:** (a) MISSING `ui-icon-button`. (c) `iconOnly` on ui-button is
the wrong replica; the hand-rolled buttons are drift.

**Lead's proposal:** `button[ui-icon-button]` attribute component:
`shape="square|circle"`, `size="small|tiny"` (compact ruling), `tone`
(the 5-tone axis shared with ui-button — on-dim/on-bright/normal apply;
destructive/positive have no icon-button reading), `outline` boolean;
glyph via projection, sized 24 at small / 16 at tiny, coloured
`--color-icon`. Retire `iconOnly` from ui-button (breadcrumb's ellipsis
+ the sink migrate). Migrate the hand-rolled icon buttons.

---

### 9. Card (page 305:2702) — audited 2 Sep 2026

**DLS spec** — set `card` (166757:3384): Breakpoint Desktop|Mobile ×
Content Default|Empty state × Dividers True|False. Chrome: bg level_2
white, radius panel-lg 8, elevation-2 (0 0 1px .25 + 0 2px 4px .05), a
1px TRANSPARENT `border-level_2` (reskin seam), children stacked at 0
gap. Sub-components:
- `card-header` (166757:3513): 24px h / 16px v padding; title
  heading/xs 20/600 text-strong + optional count BADGE (the §4 Low badge,
  8px gap) + optional single-line subtitle body/md text-subtle 4px under;
  right slot = a plain small button with a right chevron ("Label ›") OR,
  when **Accordion=Yes**, a 32px icon-button chevron-down/up; header
  States Default / Hover (bg-hover #eef2f5) / Active (chevron up);
  Divider=True draws a 1px border-decorative bottom rule; State=Empty is
  a bare 32px strip.
- `card-body` (178051:26789): Slot type Default (24/24 padding) |
  Without dividers | No padding.
- `card-footer` (166757:3546): min-h 48, 24/12 padding, top rule when
  Divider=True; Types: Show all / Show more (chevron-down) / Show less
  (chevron-up) — centred plain small buttons, Hover = bg-hover on the
  whole footer; With right content (left action + right "value ›");
  Loading (three 8px grey dots at 1/.6/.2); Empty (24px strip).
- Content=Empty state: illustration 151px + title heading/2xs + body/md
  subtle + a secondary button, 16px gaps, 80/24 padding.
- `card-button` (239963:31383): a 280-wide tappable card — 12/12 padding,
  radius 8, elevation-3, 24px icon slot + label/md title + label/sm
  subtitle (text-subtle); Hover bg-hover, Pressed, Focus, Disabled.
- `action-card (LEGACY)` skipped knowingly.

**Sink today:** white, radius
8, 24px padding all round, elevation-2, 16px gap, optional title at kit
heading(xs) 16px. No header/body/footer anatomy, no dividers, no badge /
subtitle / action slot, no accordion header, no footer types, no
card-button. `ui-empty-state` exists separately.

**Gaps:** (b) header anatomy (badge, subtitle, action slot, accordion
toggle with hover/active, divider), body padding modes, footer types
(show all/more/less, right content, loading), empty-state content;
(a) `ui-card-button` missing. (c) body padding is 24/24 (matches
Default) — no drift on the base chrome.

**Lead's proposal:** grow `ui-card` additively so the 36 callers keep
working: `title` stays; new `subtitle`, `count` (badge), `dividers`,
`collapsible` (+ `expanded` model, header becomes the toggle with
hover/active), `bodyPadding="default|none"`, named slots
`[ui-card-action]` (header right) and `[ui-card-footer]`, plus footer
helpers `footerAction="show-all|show-more|show-less"` emitting
`footerActivated`, `footerLoading`. Title stays kit heading(xs) 16px
(compactness; DLS 20). New `ui-card-button`.

---

### 10. Checkbox (page 305:2701) — audited 2 Sep 2026

**DLS spec** — three sets. `checkbox-input` (405:15): 20px box, radius
4, 2px border. Input Unchecked | Checked | Indeterminate × State Default
| Hover | Focus | Focus hover | Disabled | Read-only | Read-only focus |
Error | Error hover | Error focus | Error focus hover.
- Unchecked: bg level_1 white, border `--color-icon` #69737b. Checked /
  Indeterminate: fill + border `icon-selected` #00ab61, 16px white
  tick / dash glyph.
- **Hover = a 4px INNER ring** of `background-success_subtlest` #e2f8ef
  inside the box (box stays 20). **Focus = a 2px inner ring** of
  border-access-focus #458fff. Disabled: bg-disabled + border
  icon-disabled #c7cfd5 (checked glyph icon-disabled). **Read-only**:
  checked fill `icon-selected_disabled` #b0e8d0 (a paler green, glyph
  white). **Error**: bg `danger_subtlest` #fff0f0 + border `icon-danger`
  #ff4724 (checked = danger fill).
- `checkbox` (406:2358): input + label label/md 16 text-strong, gap 8,
  label min-height 20; Description=True adds body/sm text-subtle 4px
  under. "Size (LEGACY)=compact (internal-only)" measures identically.
- `checkbox-group` (132957:3943): field label label/sm `--color-text`
  #455057 + optional "(optional)" + info_16 icon; error message body/sm
  text-danger under the label (State=Error) or under ONE option
  (State="Error - for one option"); items stacked with 8px v-padding;
  Read-only renders the chosen labels as plain text.

**Sink today:** 20px, radius 4, 2px
--color-icon border, checked = icon-selected fill with NO border and a
hand-drawn tick, indeterminate dash, disabled pair, label kit label(sm)
13px, projected label; focus = 25%-alpha outer `--focus-ring`; no hover
ring; no read-only; no error; no description; no group.

**Gaps:** (b) hover ring, read-only, error, description, checkbox-group;
(c) focus drift (outer alpha ring vs 2px inner ring); checked keeps
"no border" where DLS keeps a 2px border in the same green (identical
paint).

**Lead's proposal:** extend `ui-checkbox` with `readonly`, `invalid`
(the kit's shared error contract), `description`; replicate hover and
focus as inner rings (inset box-shadows, no layout shift); label stays
13px. New `ui-checkbox-group` (label, optional, info tooltip hook, error
message, vertical list) wrapping projected `ui-checkbox`es.

---

### 11. Chips (page 220898:2706) — audited 2 Sep 2026

**DLS spec** — two sets, both 32px pills on `background-alt` #f7f7f7,
8px h-padding (`padding-indicator-h-lg`), 4px inline gap, optional 16px
leading icon, label/sm text-strong.
- `chip-input` (220898:11643) — "used in conjunction with inputs or
  multi-selects to encapsulate a block of information": trailing 24px
  CIRCLE icon-button (close_16) pulled in by -4px optical margin; States
  Default / Hover (the close button takes bg-hover) / Pressed
  (bg-pressed) / Focused (2px focus ring ON THE CLOSE BUTTON) /
  Read-only (no close button).
- `.chip-suggestion` (220898:11789) — "a few selected options the user
  can press": the whole chip is the control, carries elevation-2;
  States Default / Hover bg-hover / Pressed bg-pressed / Focus 2px ring
  / Disabled bg-disabled + text-disabled, no shadow.

**Sink today:** no `ui-chip`. Hand-rolled chips in the app: ai-drawer
suggestion `.chip` buttons (×2 sites) + `.attach-chip`/`.field-chip`,
response-block `.form-chip`, the reference app generate-draft `.loc-chip` (with an ×
remove) and draft-proposal `.chip-row`. `ui-pill` (status, dot) and
`ui-tag-info` are different components (see §4 for why).

**Gaps:** (a) MISSING `ui-chip` (both types). (c) the hand-rolled chips
are drift.

**Lead's proposal:** `ui-chip` with `type="input|suggestion"`, `label`,
optional projected icon, `readonly`, `disabled`, `removed` output (input)
/ click through (suggestion; `button[ui-chip]` for suggestion semantics).
The close control is the §8 tiny CIRCLE icon-button. Text kit label(sm)
13px. Migrate the ai-drawer suggestion chips and the reference-app loc-chip.

---

### 12. Coachmark (page 21702:183823) — audited 2 Sep 2026

**DLS spec** — set `coachmark` (188493:2143), one axis **Placement**:
Top | Top left | Top right | Bottom | Bottom left | Bottom right | Left |
Right | No arrow. A 320px dark panel: bg `background-level_4` #172733
(= the kit's `--color-bg-dim`), radius panel-md 4, 16px h / 12px v
padding, 16px internal gap; header = title heading/2xs white + a 24px
on-dim icon-button (close_16); body body/sm white; optional IMAGE slot
(288×162, radius 4); optional footer: "1 of 5" stepper text (body/sm)
left, two 32px OUTLINED on-dim icon-buttons (arrow-left / arrow-right;
last step shows a tick) right, 8px apart. Pointer `.tooltip-pointer`
34×8 (the same pointer family the tooltip uses), placed per Placement.
Variations frame shows: title+body+close only; + stepper row; first /
last step; with image.

**Sink today:** nothing. `ui-tooltip` shares the dark surface (#172733,
radius 4, an 8-high pointer) but is hover-only and has no header /
close / stepper / image. The reference app has no onboarding flow today.

**Gaps:** (a) MISSING `ui-coachmark`. No reference-app call site — build is for
the archive and for a future onboarding tour.

**Lead's proposal:** `ui-coachmark` (`title`, body projection, `image?`,
`step`/`total` stepper, `placement` incl. `none`, outputs `closed`,
`previous`, `next`); positions relative to an anchor element like the
tooltip directive does; uses §8 icon-buttons on-dim (24 close, 32
outlined arrows).

---

**Owner decisions for the batch §8–§12 (2 Sep 2026):** all four scopes
at FULL: (8) `ui-icon-button` built AND the ~15 hand-rolled icon buttons
+ kebab trigger migrated, `iconOnly` retired from ui-button; (9)
`ui-card` grows the full anatomy additively and `ui-card-button` is
built; (10)+(11) checkbox states + `ui-checkbox-group`, `ui-chip` with
the AI-drawer and the reference app chip migrations; (12) `ui-coachmark` built for the
archive. Standing rulings carried: tiny+small sizes only, kit text sizes
(label(sm) 13px for labels/chips, heading(xs) 16px card title), all
tones. Cadence change: the owner now runs the walk in BATCHES OF FIVE —
audit five, one gap review, five agents in parallel, one seal.

**BUILT (five agents in parallel, lead-verified 2 Sep 2026):**
- **§8 `ui-icon-button`** (`button[ui-icon-button], a[ui-icon-button]`):
  `shape` square|circle, `size` small|tiny, `tone` normal|on-dim|on-bright,
  `outline` (booleanAttribute). Box = size token, glyph 24/16 via
  `:host ::ng-deep > svg`, colour `--color-icon`, inset 2px focus, on-dim
  pair. `iconOnly` REMOVED from ui-button; breadcrumb ellipsis migrated.
  Migrated call sites (class names kept): audit-log/workflow drawer
  `.close-btn`, special-requests `.icon-btn` ×3 + `.snackbar-close`,
  compact-dialog `.close-btn`, home `.more-btn`, the dashboard `.icon-btn`
  + `.kebab-btn`, team-requests `.expand-btn`, kebab-menu trigger 28→32,
  ai-drawer `.header-btn` ×2 / `.plus-btn` / `.send-btn` ×2,
  draft-proposal `.back-btn` / `.ai-banner-close` (the last two files by
  the Chips agent). `lint/lint-boundaries.mjs` now accepts
  ui-icon-button / ui-card-button / ui-chip on a `<button>`. Spec f48 (7).
- **§9 `ui-card`** grown additively: `subtitle`,
  `count` (ui-badge), `dividers`, `bodyPadding`, `collapsible` +
  `expanded` model (header = toggle, hover fill, chevron), slots
  `[ui-card-action]` / `[ui-card-footer]`, `footerAction`
  show-all|show-more|show-less (+ `footerActivated`), `footerLoading`,
  `footerValue` (+ `footerValueActivated`); title stays kit heading(xs)
  16px. NEW `button[ui-card-button]` (`label`, `description`, 24px icon
  slot, elevation-3, hover/pressed/focus/disabled). Lead fixes: header
  focus ring → inset 2px `--color-focus`; `.card-collapse-inner` needed
  `min-height: 0` or the 0fr track never closed (grid auto-min trap).
  Spec f49 (10).
- **§10 `ui-checkbox`**: `readonly`, `invalid`, `description`; hover =
  4px inset ring `--color-bg-success-subtlest`, focus = 2px inset
  `--color-focus` (outer alpha ring retired); readonly checked
  `--color-icon-selected-disabled`; invalid `--color-bg-danger-subtlest`
  + `--color-danger` border; box-shadow deliberately NOT transitioned.
  NEW `ui-checkbox-group` (`label`, `optional`, `info` tooltip,
  `invalid` + `errorMessage`, 8px item padding). Three tokens added.
  f37 amended (exact heading match; opaque ring serialises as rgb()).
  Spec f50 (8).
- **§11 `ui-chip`** (`ui-chip, button[ui-chip]`): `kind` input|suggestion
  (lead RENAMED from the agent's `type` — on a button host it wrote
  `type="suggestion"` into the DOM, an invalid value that means submit;
  same trap as ui-button's `tone`), defaults from the host tag; `label`,
  `readonly`, `removed`; remove control = tiny circle ui-icon-button at
  -4px; suggestion = elevation-2 + native states. Migrated: ai-drawer
  suggestion/scenario chips, attach/field chips (dark variant needed no
  on-dim look), the reference app generate-draft `.loc-chip`, draft-proposal `.chip-row`.
  No `--padding-indicator-h-lg` token exists — 8px literal, commented.
  Spec f51 (7).
- **§12 `ui-coachmark`**: 320px dark panel (`--color-bg-dim`), radius 4,
  12/16 padding, title kit heading(2xs) 14 + tiny on-dim close, body
  body(sm), `[uiCoachmarkImage]` slot, `step`/`total` stepper with 32px
  outlined on-dim arrows (back hidden at 1, tick at last), `placement`
  ×9 with a 34×8 CSS-triangle pointer; positioning is the caller's. No
  16px panel-padding / gap tokens exist — literals, commented. Spec f52 (7).
  **POINTER CORRECTED 6 Sep 2026 — see the §12 addendum below.**
- **Lead verification (live, real pointer):** icon-button 32/24 boxes,
  24/16 glyphs, `--color-icon`; card header 16/24 + 1px rule, footer 12/24
  min 48, basic card unchanged 24px/16 gap, collapsible header click →
  track 87→0→87; card-button 12px pad, 24 icon; all 8 checkbox fills +
  hover ring inset 4px #e2f8ef; chips 32px pill #f7f7f7, 13px, 24×24
  remove → `removed` emitted; coachmark 320 panel, 12/16, 34×8 pointer.
  Directive 8 fix: the group demo's "Alex Tan / Priya Shah" → Haruto
  SATO / Mei KOBAYASHI. TRAPS: a hidden Browser pane does not composite,
  so transitions never advance and 700ms-later reads look "inverted" —
  front the tab before timing-sensitive reads; agents spawned their own
  dev servers on :4300/:4301 and one killed the shared :4200 — the lead
  restarts the preview before live checks.

**§12 addendum — the pointer, corrected 6 Sep 2026 (kit-fixes walk item
29).** The owner: "All the coachmark arrows are wrong — recheck the
specs." He was right, and the error is in the audit line above: DLS's
`.tooltip-pointer` is a 34×8 **BOX**, not a 34-wide arrow. Harvested
21702:183823 → set `188493:2143` (nine `Placement=` symbols) and asset
`188493:2145`: inside the 34×8 box sits a **10 wide × 8 tall** triangle,
path `M17 0 L22 8 H12 Z`, centred, filled with the panel's own
`--color-bg-dim`. The kit drew the whole box as the triangle (17px
transparent CSS borders), so every arrow rendered as a flat wedge 3.4×
too wide.

Fixed by replacing the border hack with the DLS path as an inline `<svg>`
(34×8 / 8×34, `fill: var(--color-bg-dim)`, `pointer-events: none`) and a
`pointerKind` computed mapping placement → direction. Harvested geometry,
now asserted per placement in f52 (panel 320 wide; box origin inside the
symbol):

| placement | pointer box |
|---|---|
| `bottom` / `top` | x = 143 (centred; tip at 160) |
| `bottom-left` / `top-left` | x = **0** — FLUSH with the corner, tip 17px in |
| `bottom-right` / `top-right` | x = **286** — flush, tip 17px from the right corner |
| `left` | 8×34 on the panel's RIGHT edge, y = 143, pointing right |
| `right` | 8×34 on the LEFT edge, y = 143, pointing left |

The corner variants were on a 16px inset before, which is neither flush
nor centred. The edge mapping (`top*` = pointer on the bottom edge,
`bottom*` = top edge) was already correct and is unchanged. Also from
the harvest: the footer controls already matched (outline · small ·
on-dim · arrow-left / arrow-right), but the header close is `outline ·
tiny · dim` in DLS and the kit rendered it without the outline —
`[outline]="true"` added. Sink `#ui-coachmark` now demos **all nine**
placements (it showed only bottom / top / left / none), which is the
proof surface; f52 locates the `none` demo by `.ui-coachmark--none`
rather than by index, since an index moves every time a demo is
inserted. Hand-drawn arrow / close / tick glyphs are still hand-drawn —
they go to the library icons under backlog B1.

---

### 13. Currency pair (page 2062:0) — audited 2 Sep 2026

**DLS spec** — set `currency-pair` (2062:535): Size xl|lg|md|sm|xs × Mask
No|Yes × Value Default|Positive|Negative. A right-aligned inline row,
`items-baseline`, 4px inline gap: the currency code in BODY regular
`--color-text-subtle`, the amount in body-BOLD (600) `--color-text-strong`;
Positive/Negative put a "+" / "-" glyph as its own span in the amount
style. Pairings (currency / amount): xl body-md 16 / heading-md 28;
lg body-md 16 / heading-sm 24; md body-sm 14 / heading-xs 20; sm body-sm 14 / body-md 16 bold
("for review screen values"); xs body-sm 14 / body-sm 14 bold. Mask=Yes
renders "••••••" in the amount style with no currency.

**Sink today:** no component. `ui-tables.css` carries a deliberately
UNUSED `.ui-cell-currency` span. `ui-amount-input` is an input, not a
display.

**Gaps:** (a) MISSING `ui-currency-pair`. No reference-app call site (the column
rule); build is for the archive and for summary tiles.

**Lead's proposal:** `ui-currency-pair` (`currency`, `amount`, `sign`
none|positive|negative, `size` xl…xs, `masked`), sizes mapped onto kit
type roles (md = body(sm) / heading(sm) 20 etc.).

---

### 14. Date picker (page 305:2703) — audited 2 Sep 2026

**DLS spec** — set `date-picker` (160311:24981): Breakpoint Desktop|Mobile
(mobile = knob variants, skipped) × Type Day|Month|Year × Range No|Yes.
- Panel: 312 wide, bg level_3 white, radius panel-lg 8, elevation-3,
  transparent 1px border-level_3 (reskin seam), stacked at 0 gap.
- `header` (6260:37880): 16px h / 12px v padding, 1px border-decorative
  bottom; « ‹ as TINY icon-buttons (24, chevrons-left_16 / chevron-left_16)
  left, centred TINY OUTLINED buttons "Jul" "2024" (24px, 4px pad,
  label/sm) that switch Type, › » right. Month/Year types show only the
  « » pair and "2024" / "2020-2029".
- Body 16/12 padding; `table-day` 7-col grid, 8px row gap; `cell-heading`
  Sun…Sat label/sm text-subtle; `cell` (6257:45570) 40 min × 32, 4px
  h-pad, radius action-alt 4, label/sm 500: Default text-strong; Inactive
  (other month) text-subtle; **Today text `background-product_alt`**
  #ff3e3e; Selected bg product_alt + white text; Hover bg-hover (on a
  selected cell `text-product_alt-hover` #cf2929); Disabled text-disabled;
  Range-Start / Range-End product_alt with only the outer corners rounded;
  Range-Middle bg `product_alt-subtle` #fff2f2 (hover #ffe5e5, radius 4).
  `table-month` 3×4 (Jan…Dec), `table-year` 3×4 decade with the
  out-of-decade years text-subtle.
- Footer (Range=No): "Today" centred, min-h 48, 16/12, top rule.
  Range=Yes (160311:24968): TWO months side by side (640), footer with a
  hidden checkbox slot left and Cancel (secondary) + Apply (primary) small
  buttons right (12px v-pad).
- Archive section on the page: old date-cell / slot-booking / input
  format studies — skipped knowingly.

**Sink today:** a native `<input
type="date">` with a 32px shell; inside `ui-column-header` a trigger face
reads All / a date / a range and opens the UA picker via `showPicker()`.
**Range DISPLAY works, range SELECTION does not** (recorded open item).
No calendar of our own, no month/year views, no today shortcut.

**Gaps:** (a) MISSING `ui-date-picker` (the calendar panel, all three
types, single + range, today, cancel/apply). (c) the UA picker's chrome
is not DLS.

**Lead's proposal:** build `ui-date-picker` (panel; `type` day|month|year,
`range`, `value`/`rangeValue` models, `min`/`max`, `selected`/`applied`/
`cancelled` outputs, keyboard grid nav) using §8 tiny icon-buttons and §7
tiny outlined buttons; then wire `ui-date-input` to open IT (popover
under the field, both faces) instead of `showPicker()` — which finally
makes range selection real. Cells stay 32 tall / 40 wide (DLS), label
text kit label(sm) 13. Selected/today colours on `--color-primary`
(white-label seam; DLS product_alt red recorded).

---

### 15. Drawer (page 1656:258) — audited 2 Sep 2026

**DLS spec** — set `drawer` (2350:12317) Breakpoint Desktop 540 | Mobile
360. Desktop: bg level_2, `elevation-sticky-right` (-1 0 1 .10 + -8 0 10
.05), full height, header + body + optional footer at 0 gap.
- `drawer-header` (2277:12259; Medium and "Small (for internal tools)"
  measure identically): 24px h / 16px v padding, **elevation-2 drop
  shadow, no rule**; content row gap 12 with -4px optical margins:
  optional back icon-button (32, chevron-left), title-group (min-h 32):
  heading/xs 20 text-strong + optional COUNT BADGE (Medium emphasis —
  our §4 `emphasis="medium"`) 8px right, optional subtitle body/md
  text-subtle 4px under; actions: optional more-vertical icon-button +
  close icon-button (32, 8 gap).
- `drawer-body` (239346:102685): 24/24 padding, slot.
- `drawer-footer` (158851:9191): Type Default (Label secondary + Label
  primary, each flex 1, 48px LARGE buttons) | Stacked (primary over
  secondary, full-width) | Right-aligned (two hugging buttons right);
  24px h / 16px v padding, gap 8, `elevation-sticky-bottom`.

**Sink today:** 540 wide (override var), the
same right-edge shadow, header 0/24 padding with a 1px BORDER (DLS:
shadow), title kit heading(xs) 16, close icon-button, `[ui-drawer-actions]`
slot, body 24 padding, Escape closes, non-modal. No footer, no back
button, no badge, no subtitle.

**Gaps:** (b) `subtitle`, `count` badge, `back` button, footer with the
three types; (c) header divider → elevation-2 shadow, header v-padding
16, footer buttons Large 48 (DLS) vs the platform's Small 32 (compact).

**Lead's proposal:** grow additively: `subtitle`, `count`, `back` output
(+ button), `[ui-drawer-footer]` slot with `footerLayout` default|stacked|
right; header shadow per DLS; footer buttons at kit small 32.

---

### 16. Dropdown (page 21773:183824) — audited 2 Sep 2026

**DLS spec** — five sets:
- `dropdown-menu` (53775:283622): 200 wide, bg level_3, radius panel-lg
  8, elevation-3, 4px inset padding; Variation Default | With header |
  Grouped Items (groups separated by a 1px border-decorative top rule,
  each group 4px inset).
- `dropdown-item` (53775:283454): min-h 40, 12px h / 8px v padding, radius
  4, label/sm 500 text-strong, 8 gap; optional 16px leading icon, optional
  24px avatar, optional trailing SWITCH ("Show radio=true" is a toggle);
  States Default | Hover bg-hover | Focus 2px ring | Pressed bg-pressed |
  Disabled text-disabled + icon-disabled | Loading (three 8px dots) |
  "Deprecated - use select" (bg-selected #e2f8ef — deprecated, skip).
- `dropdown-heading` (53775:283784): 40px, 12 h-pad, label/sm text-subtle,
  optional back chevron_16 (sub-menu).
- `dropdown-item-account` (55071:286576): 280 wide, 12px v-pad, 40px
  logo avatar + label/md name + body/sm number; Single select: selected =
  `background-selected` #e2f8ef + 4px `border-success` left bar + check_16;
  Multiselect: leading §10 checkbox; Expandable: trailing chevron-down_16;
  Hover bg-hover.
- `dropdown-menu-account` (55071:286681): 320 wide, optional header with
  a 40px input-search (16/12 padding), Select all / Reset plain-tiny row
  for multiselect, then the account rows at 4px inset.

**Sink today:** `ui-select` = native `<select>`;
`ui-multi-select` = custom panel with search + select-all +
checkbox rows; `ui-kebab-menu` = its own popover (4px inset, radius-md,
hand-rolled shadow, items 8/12); `ui-breadcrumb`'s overflow popover
mirrors kebab. Four hand-rolled popover lists, none on the DLS menu.

**Gaps:** (a) MISSING the shared primitives `ui-dropdown-menu`,
`ui-dropdown-item`, `ui-dropdown-heading` (+ the account row). (c)
kebab-menu / breadcrumb / multi-select panels drift from DLS (shadow,
radius, row height 40, inset, grouped rules). `ui-select`'s native popup
cannot be DLS-styled at all — the Select round (item 36) decides whether
it becomes a custom listbox on these primitives.

**Lead's proposal:** build the primitives (menu with header/grouped
variations; item with icon/avatar/switch/disabled/loading; heading with
back), then migrate `ui-kebab-menu`, the breadcrumb popover and the
`ui-multi-select` panel (search header, select-all/reset, 40px checkbox
rows) onto them. Row text kit label(sm) 13.

---

### 17. Empty state (page 467:1104) — audited 2 Sep 2026

**DLS spec** — set `empty-state` (274552:3254) Type Default | Slot: 400
wide, centred column, 16px gap: a 151px illustration
(`object-dog-empty-bowl`, or a 151px slot), text block (4px gap): title
heading/2xs 16/600 text-strong, optional description body/md
text-subtle; optional secondary SMALL button.

**Sink today:** cactus illustration (kit's
own) + `title` + `text`, `size` 132; no action button, no illustration
slot; title/text sizes are the kit's.

**Gaps:** (b) action slot, illustration slot; (c) illustration asset
(cactus vs DLS dog), illustration size 132 vs 151, title heading(2xs) 14
kit vs DLS 16 (compact rule).

**Lead's proposal:** add `[ui-empty-state-action]` and
`[uiEmptyStateIllustration]` slots; archive the DLS dog SVG under
The reference app's asset archive and expose it as
`illustration="dog"` while the cactus stays the reference app's default (owner call
below); default size → 151.

---

### 18. Floating action button (page 305:2720) — audited 2 Sep 2026

**DLS spec** — set `floating-action-button` (407:4) Type Light | Dark ×
State Default | Hover | Pressed | Focus: a 48px circle (`size-base-lg`),
`elevation-4` (0 0 1 .25 + 0 8 8 .08), 24px glyph centred. Light: bg
level_3 white, glyph `--color-icon`, hover bg-hover, pressed bg-pressed.
Dark: bg `background-dim` #172733, glyph white, hover on_dim-hover
#455057, pressed on_dim-pressed #59656d. Focus: 2px access-focus ring.

**Sink today:** the AI launcher's hand-rolled `.fab` (56px, bg-dim,
custom 0 4px 12px shadow, scale(0.96) on press, a 22px hand-drawn
sparkle) under `boundary-allow`.

**Gaps:** (a) MISSING `ui-fab`; (c) launcher drift (56 vs 48, shadow, press
transform, hover colour).

**Lead's proposal:** `button[ui-fab]` with `tone` light|dark, projected
24px glyph; migrate the AI launcher onto it (dark).

---

### 19. Focus overlay (page 30431:265173) — audited 2 Sep 2026

**DLS spec** — set `focus-overlay` (166757:29322) Breakpoint Desktop
1440×900 | Tablet | Mobile: the full-page takeover. Backdrop
`background-overlay` #17181a at 70% (= the kit's rgba(23,24,26,.7)),
panel bg **level_0 #f5f7f9** with 8px top radius, header + body.
- `focus-overlay-header-new` (166757:29336): bg level_2 white, 24px h /
  16px v padding, elevation-2 shadow; inner container max-w 1200 centred,
  16 gap; title row gap 12: optional back icon-button (32), optional 32px
  CIRCULAR ICON (crimson-00 #fff2f2 disc + 16px key glyph), title-group
  (min-h 32): heading/xs 20 text-strong + optional subtitle body/md
  subtle (max-w 800); actions (-4 optical): optional more-vertical +
  close icon-buttons. Stepper=Yes: a horizontal stepper under the title
  (step titles label/md, arrow on the current, 4px neutral progress bar).
  Tabs=Yes: a tab-group (48px tabs with count badges, 2px product-border
  under the active tab, `elevation-sticky-top`) flush to the header's
  bottom (0 bottom padding).
- `focus-overlay-body` (166757:29415): 24/24 padding, container max-w
  1200 centred, slot; State=Loading = skeleton cards (level_2, 8 radius,
  header 16px bar + 24px bars in an alt→pressed gradient) + a loading
  primary button right-aligned.
- `hybrid-dialog-header` / `sticky-note` (custom-sub-component): mobile
  MFE chrome — skipped knowingly.

**Sink today:** overlay rgba(23,24,26,.7) ✓,
panel with 8px top radius ✓, elevation-2 header, title kit heading(sm)
**20px** (= DLS's 20, no compactness delta), close icon-button, body
with the owner's 24px / 40px content padding (directive 7) and a 1200
cap ✓. No subtitle, circular icon, back button, more-actions, stepper or
tabs slots, no loading skeleton.

**Gaps:** (b) subtitle, icon disc, back, `[ui-modal-actions]`, stepper /
tabs header slots, loading skeleton. (c) none of substance — header
padding 24/40 is the owner's gutter rule, equivalent to DLS's 24 + 1200
container at our widths.

**Lead's proposal:** grow `ui-modal-shell` additively with those inputs
and slots (stepper/tabs as projection slots — the Stepper (38) and Tabs
(41) rounds own the pieces); `loading` skeleton state.

---

### 20. Information banner (page 305:2707) — audited 2 Sep 2026

**DLS spec** — set `info-banner` (12044:100307) Type Information |
Warning | Success | Error × Platform Desktop | Mobile × Size Medium |
"Small (for internal tools)" (identical). 648 wide: bg level_2, radius
panel-md 4, elevation-2; inner container 1px border-decorative, 16px h /
12px v padding, 12 gap; a 24px FILLED status icon per type
(circle-information-filled `--icon-info` #8657ff / triangle-exclamation
`--icon-warning` #eb9600 / circle-check `--icon-success` #00ab61 /
triangle-exclamation `--icon-danger` #ff4724); text: optional title
heading/2xs 16/600 text-strong + description body/sm `--color-text`
#455057 4px under; optional actions row 8px below (secondary small +
plain small, 8 gap); optional dismiss = TINY icon-button (24, close_16)
top-right; and a **4px left bar** in the type's border colour (`border-
info` #8657ff, `border-warning` #eb9600, `border-success` #00ab61,
`border-danger` #ff4724) with 4px left corners.

**Sink today:** white card, purple left
bar (`--color-info-bar`), circular "i" icon, `message` string (multi-
line) or projection, `dismissible`; one tone only, no title input, no
actions slot; padding 12/12/12/16.

**Gaps:** (b) `tone` info|warning|success|error (icon + bar), `title`,
`[ui-info-banner-actions]` slot — this is where §2 Alert's deferred
tones land; (c) padding/gap 16/12/12, icon per tone, title kit
heading(2xs) 14 (compact).

**Lead's proposal:** grow additively; `tone` default `info` keeps the 3
callers byte-identical.

---

**Owner decisions for the round §13–§20 (2 Sep 2026):** (14) build
`ui-date-picker` AND wire `ui-date-input` to open it in both faces —
range selection becomes real; (16) build the dropdown primitives AND
migrate kebab-menu, the breadcrumb overflow and the multi-select panel;
(17) **switch the empty-state default to the DLS dog**; (15)+(19) additive growth,
drawer footer buttons at kit small 32 (not DLS Large 48), modal title
stays 20; (13)(18)(20) full builds as proposed. Standing rulings carried:
kit text sizes (label(sm) 13, heading(2xs) 14 titles), `--color-primary`
as the seam for every product_alt use (date-picker selection, tabs).

**BUILT (five agents in parallel, lead-verified 3 Sep 2026):**
- **§13 `ui-currency-pair`**: `currency`, `amount`, `sign` none|positive|
  negative, `size` xl…xs, `masked`; baseline row, 4px gap; kit pairings
  xl 14/28, lg 14/24, md 14/20, sm 14/14, xs 14/13 (currency at kit
  body 14 uniformly — the kit's body scale cannot split DLS's 16/14).
  Spec f53 (5).
- **§14 `ui-date-picker`** (+ `ui-date-input` wired): panel 312 / range
  640, header 12/16 + 1px rule with tiny icon-buttons and tiny secondary
  month/year buttons, 40×32 cells at label(sm) 13, today/selected on
  `--color-primary`, range start/end outer-corner radii + middle
  `--color-primary-subtle`, Today footer 48, Cancel/Apply footer with
  `--shadow-sticky-bottom`; type day|month|year, keyboard grid nav on the
  single picker. `ui-date-input` no longer calls `showPicker()`: the icon
  is a tiny icon-button toggling the popover; the column-header face opens
  it as a range when the value parses as one and Apply writes
  `start/end` — **range selection is real**. Agent's calls to review:
  month/year picks snap straight to the day grid; decade arrows step one
  year. Lead-verified with real mouse: day pick, range 8→12 (3 middles,
  start radius 4 0 0 4), Apply → both dates, popover pick → input value.
  Spec f56 (5).
- **§15 `ui-drawer`**: `subtitle`, `count` (medium badge), `back` +
  `backActivated`, `[ui-drawer-footer]` with `footerLayout` default|
  stacked|right (`--shadow-sticky-bottom`, 16/24), header 16/24 on
  `--shadow-elevation-2` (border gone), panel on `--shadow-sticky-right`;
  close/back are icon-buttons. f39 amended (header border 0). Lead-verified:
  540 wide, header 16/24 no border, footer 16/24, two 243/241 buttons,
  badge, subtitle, Escape. Spec f58 (7).
- **§16 dropdown primitives** `ui-dropdown-menu` (radius 8, elevation-3,
  4px list inset, header slot), `button[ui-dropdown-item]` (40 min, 8/12,
  13/500, icon/avatar/trailing slots, selected = `--color-bg-selected` +
  4px `--color-success-strong` bar as a REAL span — `:host::before` never
  painted under emulated encapsulation, a new trap), `ui-dropdown-heading`
  (40, subtle, `back`), `button[ui-dropdown-account-item]` (40px avatar,
  label(md)/body(sm), multiselect checkbox, expandable), `[ui-dropdown-
  group]` rules. MIGRATED: kebab-menu popover, breadcrumb overflow,
  multi-select panel (320+, search header, Select all/Reset tiny plain,
  checkbox rows). Lead fix: the heading's `back` variant lost its label —
  two bare `<ng-content>`s in an @if/@else project to only one; now a
  single `<ng-template>` rendered by both branches. Spec f57 (10).
- **§17 `ui-empty-state`**: DLS dog is the default (`illustration`
  dog|cactus|slot), 151 default size, `[uiEmptyStateIllustration]` and
  `[ui-empty-state-action]` slots, 400 max-width, 16/4 gaps, title
  heading(2xs) 14. Every empty tab in the app now shows the dog. Spec f59 (5).
- **§18 `button[ui-fab]`**: 48 circle on `--size-base-lg`, elevation-4, 24 glyph, light/dark tones;
  AI launcher migrated (dark). Spec f54 (5).
- **§19 `ui-modal-shell`**: `subtitle`, `[ui-modal-icon]` disc (`hasIcon`),
  `back` + `backActivated`, `[ui-modal-actions]`, `[ui-modal-stepper]` /
  `[ui-modal-tabs]` (`hasTabsSlot` → 0 bottom pad + `--shadow-sticky-top`),
  `loading` skeleton, panel on `--color-bg-level0`, Escape closes; close
  glyph now 24 (icon-button small) on all 17 callers. Spec f60 (5).
- **§20 `ui-info-banner`**: `tone` info|warning|success|error (filled 24
  icon + 4px bar), `title`, `[ui-info-banner-actions]`, 12/16 + 12 gap,
  tiny icon-button dismiss. The §2 Alert's deferred tones close here.
  Spec f55 (6).
- **Lead prep defect caught by the agents:** the round's new tokens had
  been appended INSIDE the trailing `@media (prefers-reduced-motion)`
  block (they resolved only with reduced motion on) — moved into `:root`.
  TRAP for token additions: insert before the `:root` closing brace, not
  the file's last one.

**Owner review fixes (3 Sep 2026):**
- **§16 dropdown** re-audited against the nodes: (1) an UNGROUPED list now
  insets its items 4px like DLS's implicit group (53775:283623); (2) the
  loading row centres its dots and paints them `--color-icon`
  (54754:277203); (3) the selected bar spans the CONTENT height only —
  40px inside the 64px account row (137336:178918), the item's own inner
  height on a plain item; (4) the menu-account header draws no rule and
  sits 8px above the list (55071:286681); (5) the heading has no hover
  colour. Deferred: the in-item compact switch (769:1400, 28×18) waits
  for the Switch round (item 39) — `ui-toggle` has no small size yet.
- **§14 / date-input standalone face** measured against DLS Input field
  Type=Date picker Small (76086:347425 / 347416): the browser's own
  calendar indicator was still painting behind the kit's icon-button and
  the text ran under it. Now: indicator hidden, `padding-right` 44 (12 +
  24 + 8), the tiny icon-button 12px inside the shell, empty placeholder
  in text-disabled with tabular numerals, invalid paint on the shared
  `--color-field-error-bg` + `--color-danger` contract, a faithful
  calendar_16 glyph. The Input field round (item 21) still owns the full
  field anatomy (label, help text, error message).

---

### 21. Input field (page 305:2709) — audited 3 Sep 2026

**DLS spec** — ONE set `input-field` (12110:99059): **Type** Text | Number
| Number with stepper | Text area | Date picker | Single select |
Multiselect | Phone | Currency × **State** Default | Default+Hover |
Focus | Filled | Filled+Disabled | Disabled | Read-only | Read-only+Focus
| Success | Success w/ tick | Error | Error+hover | Error+focus ×
**Size** Medium 40 | Small 32 ("for internal tools" — ours). The set IS
the whole field composite:
- **Label row** (4px inline gap): label/sm `--color-text` #455057 +
  optional "(optional)" + `info_16` icon; the stepper type adds a
  right-aligned counter caption ("Bid size: 0.01", body/sm).
- **Input/Basic** (Small): 32px, bg level_1, 1px `--color-border`, radius
  input 4, 12px h-pad, 8 gap; placeholder body/sm text-disabled, value
  text-strong; optional trailing 24px icon-button slot (eye_16).
  Hover: border `--color-border-hover` #9ba4ab. **Focus: 2px solid
  border-access-focus #458fff** + a trailing `clear-filled_16` icon-button.
  Disabled: bg-disabled + border-disabled #c7cfd5, text-disabled.
  Error: bg danger_subtlest + border danger; message body/sm text-danger
  replaces the help row. Success w/ tick: a 24px green `check` inside.
  **Read-only**: no box at all — label gap 4, value body/md text-strong
  on a 24px min line, optional subtext body/sm subtle.
- **Help row**: body/sm text-subtle, optional character count "0/400"
  right-aligned (8 gap).
- **Types:** Number = Text with numeric placeholder. **Number with
  stepper**: input + 1px vertical divider + a "Stepper Set" (12px h-pad,
  32px minus / plus icon-buttons with a 16px divider between). **Phone /
  Currency**: a leading `.input-field/currency` segment ("+65" / "SGD"
  body 14 + chevron-down_16, 12px pad) + vertical divider + the input.
  **Single select**: trigger with chevron-down_16; Expanded = 2px focus
  border, `clear-filled` + chevron-up, and a `single-select-menu` (320,
  elevation-3, optional search header, options 40px with the §16 selected
  treatment) hung 6px under the field. **Multiselect**: "# selected"
  text OR an inline tag group (`tag-filter`: neutral 4px tags with an ×)
  + chevron; optional `Chip-list` of §11 input chips under the field.
  **Text area**: 12/12 padding, a 24px handler row with an 8px resize
  knob bottom-right ("remove handler to disable manual resize"), help +
  counter. `combo-input` (189175:24031) = input with a select segment.
  `.input-field/stepper (LEGACY)` skipped knowingly.

**Sink today:** `ui-text-input`, `ui-textarea` (21), `ui-amount-input` (2 — the
Currency type, borderless select segment, no divider), `ui-select` (59,
NATIVE `<select>`), `ui-multi-select` (5), `ui-date-input` (12; the Date
picker type, chrome fixed 3 Sep). NO field wrapper: labels, help text and
"(optional)" are hand-rolled at ~120 sites (`.field-label` 45,
`.form-label` 34, `.form-field` 42, `.detail-field-label` 19). Three raw
`<input type="date|month">` remain in `table-filter-group.html`.

**Gaps:** (a) MISSING `ui-form-field` (the DLS composite: label /
optional / info / help / counter / error); Number-with-stepper; Phone;
success-with-tick; read-only rendering; focus clear button; right
icon-button slot; text-area resize knob + counter; multiselect inline
tags / chip-list; the Single-select Expanded MENU (a native `<select>`
cannot draw it — Select is walk item 36). (c) focus ring drift on every
field (alpha ring vs DLS 2px solid access-focus — buttons already moved);
error bg; select chevron 16 at 12 from the edge ✓.

**BUILT (four agents in parallel, lead-verified 3 Sep 2026):**
NEW `ui-form-field` (`lib/form-field/`) — label/sm
#455057 + `(optional)` (4px, 400, disabled tone) + `info_16` tooltip
icon + `[ui-form-field-caption]` slot on the label row, `.ff-control`
projection, help row = `help` OR `errorMessage` (when `invalid`) + a
right-aligned `counter` `{count,max}`; 8px stack gaps, 4px when
`readonly`; `for` wires the label. `ui-text-input` gained the DLS
chrome: 2px solid `--color-focus` border (alpha ring retired), hover
border, error bg, `clearable` (focus/filled ×), `success` (24px tick),
`readonly` (no box, 14px value), a right `[uiTextInputIcon]` slot;
`ui-textarea` `invalid` / `resizable` + the 8px `.ta-handle` knob;
`ui-select` is now a custom `role=combobox` trigger + `ui-dropdown-menu`
listbox (chevron flips, `clearable` ×, `searchable` header holding a
real `ui-search-input`, 40px options with the §16 selected treatment,
6px under the field; a hidden mirrored native `<select>` keeps every
existing `selectOption` path and the API unchanged); `ui-multi-select`
`display: 'count' | 'tags'` (`.tag-filter` neutral tags with ×); NEW
`ui-number-input` (`.ni-stepper` ± icon-buttons behind a 1px divider,
left-aligned value); NEW `ui-phone-input` (leading `ui-code-segment`
"+65" + chevron, divider, input); `ui-amount-input` takes the same
border-on-the-inner-shell + divider anatomy. MIGRATION: every hand-rolled
label site in the eight forms (new-request-modal 19, clarify-modal,
platform/vendor form modals, desk-profile, review-proposal, grant-detail,
profile-basic) now sits in `ui-form-field`; `.form-label`/`.field-label`
rules removed where dead; the reference app `.field-table` label-left grids and the
read-only detail grids stay as grids (their own layout, not a field).
The "(if relevant)" reference-no label lost its parenthetical — the
`[optional]` marker carries it now (double marker otherwise).
LEAD SECOND PASS (owner's ask — re-check the nodes after the agents
finish): hover-grey border was outranking the 2px focus border on
text-input, search-input and the select trigger (`:hover:not(:disabled)`
beats `:focus-within` — every hover rule now excludes focus/open); value
text 14→13; search glyph 14→16; number value right→left aligned; stepper
buttons overflowing the 32px shell (`overflow:hidden`); the selected
option's `bg-selected` fill was being overridden by the keyboard-active
highlight on reopen (active no longer paints over selected, and draws no
extra ring — the searchable header's seeded first row was showing fill
AND ring at once); the searchable header was a bare bordered `<input>`
(now the kit search field, 32px). REGRESSION CAUGHT LIVE: Round 34's
card rebuild had moved projection into `.card-body` with no gap, so
every form that stacks `.form-row`s straight into a `ui-card` had its
rows touching — `.card-body` is a 16px flex column again (the rhythm the
host used to provide). SPEC FALLOUT: F24's clarify assertions matched
labels with `/^Recipient$/`; the kit label now renders its text with no
surrounding whitespace so exact matches hold (the multi-line template
form emitted " Recipient "), and `useCaseField` accepts both the
migrated clarify modal and the unmigrated acknowledge modal.
Specs: f61 (10), f62 (11), f63 (16), f64 (6); f11–f14 locators moved to
`fieldContainer()` in the e2e helpers.

---

### 22. Input OTP (page 48927:248025) — audited 3 Sep 2026

**DLS spec** — `OTP Input item` (23216:189925): 40×48 (size-base-md ×
-lg), bg level_1, 1px `--color-border`, radius 4, centred digit in
**body-monospace (Roboto Mono) 24px** text-strong; States Default |
Hover | Focused (2px access-focus border + a 28px caret) | Active |
Error (danger_subtlest + border-danger) | Error+hover | Disabled
(bg-disabled, digit text-disabled); Masked=YES renders "•".
`OTP Input` (23265:189681): six items 8px apart + a status line 8px under
(label/sm `--color-text`): Default "Request again in 00:30"; Focused;
Completed; Validating = `loader_16` + "Validating…"; Error = all items in
error + "Incorrect OTP entered. Try again." in text-danger.

**Sink today:** nothing. The reference app has no OTP step (the demo gate is a plain
password field).

**Gaps:** (a) MISSING `ui-otp-input`. No call site — archive value only.

---

### 23. Input search (page 48927:248026) — audited 3 Sep 2026

**DLS spec** — set `input-search` (38951:273380): Size Small 32 | Medium
40 | Large 48 × State Default | Hover | Focus | Disabled | Focus filled |
Filled. Small ("internal products only"): bg level_1, 1px border, radius
4, 12px h-pad, 8 gap; leading `magnifying-glass_16` in `--color-icon`;
placeholder body/sm text-disabled; Hover border-hover; **Focus 2px
access-focus border** (+ a 1px/20px caret); Filled = value text-strong +
a trailing 24px icon-button `circle-x-filled` (clear); Disabled
bg-disabled, no border.

**Sink today:** min-h 32, border, 4/12
padding, focus = primary border + alpha ring, placeholder disabled tone;
no clear button, no disabled paint, no hover border.

**Gaps:** (b) clear icon-button when filled, disabled, hover; (c) focus
drift; padding 0/12 with 8 gap (kit 4/12).

**BUILT (agent, lead-verified 3 Sep 2026):** `ui-search-input` → 0/12
padding, 8 gap, 16px glyph in `--color-icon`, hover border, 2px solid
focus border, Filled = `.clear` 24px icon-button (real pointer clears and
refocuses), `disabled` = bg-disabled with no border. It now also serves
as the searchable `ui-select` header. Specs in f63.

---

### 24. Input transfer (page 50298:240310) — audited 3 Sep 2026

**DLS spec** — set `Input transfer` (50298:242864): a 640-wide block on
`background-dim` #172733, 24px h / 12px v padding, 8 gap: label row
(left "You send" label/sm on_dim-subtle #9ba4ab, right helper body/sm
right-aligned — on_dim-danger #ff4724 in Error 1), combo row (12 gap):
currency-select (heading/sm 24/600 white "SGD" + optional 24px
chevron-down) and the amount (heading/sm 24 right-aligned, placeholder
"0" on_dim-subtle, a 2px caret). States Initial | Disabled | Focus |
Active | Shimmer | Error 1 (helper + amount in danger) | Error 2 |
Read-only (no chevron; "for confirmation or static amount information").
`Input transfer – Fx pill` (240071:2733): a white capsule (radius 16,
16/2 padding, label/sm) — "Label · SGD 1 ⇄ VND 16883.44 · Time" — centred
between two 1px #303c44 dashes; Variant Default | Dim. An "error handling"
section shows no-currency / no-amount cases.

**Sink today:** nothing; `ui-amount-input` is the light field. The reference app has
no remittance / FX transfer flow.

**Gaps:** (a) MISSING `ui-input-transfer` + `ui-fx-pill`. No call site.

---

**Owner decisions for the round §21–§24 (3 Sep 2026):** (21) build
`ui-form-field` (label / optional / info / help / counter / error) AND
migrate every hand-rolled label site (~120) onto it; every kit field
takes DLS chrome — 2px solid access-focus border (the alpha ring
retires), hover border, error bg, clear-on-focus, right icon slot,
success tick, read-only rendering, text-area knob + counter; the
Single-select Expanded MENU is built NOW — `ui-select` becomes a custom
trigger + `ui-dropdown-menu` listbox with the same API (item 36 audits
the remainder); Number-with-stepper and Phone built for the archive;
(22) OTP SKIPPED; (24) Input transfer SKIPPED. Standing rulings: Small
size only, kit text sizes (label 13, body 13/14).

### 25. Link (page 23938:188536) — audited 3 Sep 2026

**DLS spec** — set `Link` (51914:259512): **Variant** Product | Subtle |
Text | On dim × **State** Default | Hover | Focus. Inline text link,
body/sm 14 (400, lh 1.5) with a **1px underline drawn as a separate
full-width rule** under the text (not `text-decoration`). Colours:
Product = text-product_alt #ff3e3e → hover product_alt-hover #cf2929;
Subtle = text-subtle #69737b → hover text-hover #303c44; Text =
text #455057 → hover #303c44; On dim = on_dim-strong white → hover
on_dim-hover #c7cfd5. **Focus** = 2px solid border-access-focus #458fff
ring, radius 4, wrapping text + underline (no colour change). A DLS
"Relevant Links" pattern shows label + `↗` for external links.

**Sink today:** NOTHING — no `ui-link`. The app has no inline text
links: the 65 raw `<a>` are all sink prose; feature "links" are two
hand-styled buttons and 11 `variant="plain"` buttons.

**Gaps:** (a) MISSING `ui-link` (attribute directive on `<a>` /
`<button>`: `variant` product | subtle | text | on-dim; underline rule;
hover; 2px focus ring; optional external `↗`). Product maps to
`--color-primary` per the white-label seam. Migrate `.manager-link` and
`.browse-link` onto it; kit text stays 13px per the standing ruling
(body/sm 14 → our body 13).

**BUILT (agent, lead-verified 3 Sep 2026):** NEW `ui-link`
(`lib/link/`) — attribute directive on `a[ui-link]` /
`button[ui-link]`, `variant` product | subtle | text | on-dim,
`external` (real `.ui-link-ext` ↗ span, aria-hidden). 13px/400 (kit
size), underline = a 1px `border-bottom` rule in `currentColor`, hover
tones, 2px solid `--color-focus` ring radius 4 on `:focus-visible`.
Product = `--color-primary` → `--color-primary-hover`; the two hover
tones DLS needs had no tokens — the lead added `--color-text-hover`
#303c44 and `--color-text-on-dim-hover` #c7cfd5 once the tokens file
was free. Migrated `.manager-link` and `.browse-link` (generate-draft; the
dropzone became a `div[role=button]` because a button cannot nest a
button). `lint/lint-boundaries.mjs` accepts `button[ui-link]`.
Spec f65 (9).

---

### 26. List (page 2475:122) — audited 3 Sep 2026

**DLS spec** — three sets. `list-item` (100665:3485): Size Desktop 640
| Mobile 360 × Secondary color No (bg level_2 white) | Yes (bg alt
#f7f7f7). Row = 24px h-pad / 12px v-pad, 12px gap: **left-slot**
(40px avatar with file icon, optional 20px checkbox in a 40px wrapper)
+ **text** (title heading/2xs 16/600 text-strong + description body/sm
subtle, 4px gap, flex 1) + **right-slot** (right-aligned §13 currency
pair md + "Second line" body/sm subtle) + **action** (two 32px
icon-buttons, 8 gap: trash, more-horizontal). Mobile stacks the right
slot under on a second row. `list-interactive-single` (100665:3255):
the same row with a **chevron-right 24** indicator instead of the
actions; States Default | Hover bg-hover #eef2f5 | Pressed bg-pressed
#dde3e7. `list-interactive-multi` (239937:428, "Size (LEGACY)"): a
multi-action variant with slots — skipped as legacy. `list-holdings`
/ `list-accordion` are marked IBNG-specific / DEPRECATE.

**Sink today:** no generic list row. `ui-ranked-list`, `ui-bar-list`,
`ui-stacked-bar-list` are chart lists; `ui-file-row` is the nearest
row-with-actions; `ui-dropdown-item` / `ui-account-item` are menu rows.
Feature pages render entity rows in tables or cards.

**Gaps:** (a) MISSING `ui-list-item` (slots: leading / title /
description / trailing / actions; `interactive` with chevron + hover
/ pressed; `secondary` bg) — but NO call site today. Candidate archive
piece, or skip until a list appears.

---

### 27. Loader (page 10392:69046) — audited 3 Sep 2026

**DLS spec** — four sets. `loader-clover` (14413:137934) / `loader-key`
(151423:3541): a 48px tile (radius 8, bg level_3 white, elevation-3)
holding a 32px animated DBS clover / key mark; Background No drops
the tile; Label Yes adds "Loading..." body/sm subtle 4px under.
`loader-partial` (96939:279615): **three 8px dots, 8 gap, `--color-icon`
at opacity 1 / .6 / .2** (Invert colour = icon-inverse white), optional
label body/sm subtle 4px under ("Loading transactions"). `loader-
skeleton` (14415:138020): Type Text | Image + Text | Image — a level_2
card (radius 8, elevation-2) with a header row (16px bar, 241 wide,
24/16 padding, decorative bottom rule) and a body of 24px bars
(24/24 padding, 8 gap; 3-of-4-column bar, 112px image square, or a
207px image block); bars are a **left→right gradient alt #f7f7f7 →
pressed #dde3e7 → alt** (shimmer). `_prototype-shimmer-block` is a
prototype helper.

**Sink today:** `ui-button [loading]` already draws the DLS three-dot
partial loader (opacity 1/.6/.2) inline; `ui-modal-shell [loading]`
draws a hand-rolled skeleton (title bar + three bars); `ui-card` and
`ui-dropdown-item` carry loading states (Round 34/35b); the reference app's
pre-submission document has a page-local `.skeleton`. No standalone loader,
no brand spinner (the clover/key marks are DBS brand assets — not
ours to replicate; a white-label spinner slot is the seam).

**Gaps:** (a) MISSING `ui-loader` (`kind`: partial dots | spinner
tile; `label`; `invert`) and `ui-skeleton` (`type` text | image-text |
image; shimmer gradient); (c) unify the modal-shell skeleton and the
The reference app `.skeleton` onto `ui-skeleton`; button/dropdown dots stay (already
on spec).

**BUILT (agent, lead-verified 3 Sep 2026):** NEW `ui-loader`
(`kind` partial | spinner, `label`, `invert`, `background`): three 8px
dots, 8 gap, `--color-icon` at 1/.6/.2 with a reduced-motion-aware
cross-fade; spinner = 48px tile radius 8 `--color-bg-level3`
elevation-3 holding a 32px `[uiLoaderMark]` slot (default: a neutral
`--color-primary` ring — the DBS clover/key are brand marks the kit
does not carry); label 13px subtle 4px under. NEW `ui-skeleton` (`type`
text | image-text | image) + bare `ui-skeleton-bar`: level2 card radius
8 elevation-2, 16/24 header with a 16px bar (241, capped 40%) and rule,
24/24 body, 24px bars on a 4-col/32-gap grid, 112 square, 207 block,
alt → pressed → alt shimmer. `ui-modal-shell [loading]` and the pre-submission
generating side-nav now consume it. Lead
second pass: `container-type: inline-size` on the host collapsed the
card to 0px inside flex rows (now a plain 40% cap); image-text gap
24→16; inverted label → `--color-text-on-dim` (DLS text-inverse); the
lead added `--color-bg-level3` and `--color-icon-inverse`. Spec f66 (14),
f60 updated for the shell skeleton.

---

### 28. Modal (page 305:2697) — audited 3 Sep 2026

**DLS spec** — `modal` (166757:32212): Breakpoint Desktop 600 wide |
Mobile 328; bg level_2, radius 8, **elevation-5** (0 12 24 rgba(0,0,0,.2)
+ 0 0 1 .25), overflow clip, no gap between parts. `modal-header`
(166757:32228): 24/16 padding, decorative bottom rule, 12 gap:
optional 24px status icon in a 32px-min wrapper, text (title
heading/xs 20/600 on a 32px min line + optional subtitle body/md 16
subtle, 4 gap), action = 32px close icon-button with −4px optical
right margin. `modal-body` (166757:32222): 24/24 padding, 16 gap;
Slot | Default (illustration + body/md text) | Description Only.
`modal-footer` (166757:32257): top decorative rule, 24/16 padding;
**Default** = optional checkbox (label/md) flex-1 left + right button
group (primary + up to two secondary, 8 gap, 40px Medium buttons);
**Default (overflow)** stacks checkbox row over a right-aligned button
row; **Stacked (mobile only)** full-width buttons.

**Sink today (`ui-modal-shell`):** built as the focus-OVERLAY chrome in
Round 35 (§19) — full-viewport panel, header with subtitle / icon /
back / actions / stepper / tabs / loading, 1200px content column,
40px+ gutters, no footer of its own (§6: action buttons sit OUTSIDE the
cards). The kit has NO dialog-sized modal: confirms and small forms
(clarify, vendor/platform forms, sign-off) all ride the overlay.

**Gaps:** (a) MISSING a dialog `ui-modal` (600px, elevation-5, header /
body / footer with the checkbox + button-group footer, small buttons
per the compact ruling) — OR a `size="dialog"` mode on `ui-modal-shell`
sharing its header. Call sites to migrate: the confirm dialogs (F16
revoke, F24 acknowledge, sign-off withhold…) if the owner wants
dialogs rather than overlays for short confirms. Decision needed.

**BUILT (agent, lead-verified 3 Sep 2026):** NEW `ui-modal`
(`lib/modal/`) — the DLS dialog, distinct from the focus
overlay: 600 wide (min 328), radius 8, `--shadow-elevation-5` (already
in tokens), level2; header 16/24 + rule, 12 gap, optional
`[uiModalIcon]`, title 20/600 on a 32px-min line (lead added the
min-height), subtitle 14 subtle, 32px small close icon-button at −4px;
body 24/24, 16 gap, `description` for the text-only body, scrolls
(80vh); footer 16/24 + rule with `footer` default | overflow | stacked,
`[uiModalFooterStart]` (checkbox) + `[uiModalActions]` (small buttons)
slots, auto-hidden when both are empty. `open` model, `closable`,
`dismissed`; Escape / backdrop close; focus trapped and returned. No
call site migrated — confirms stay on the overlay until the owner names
which move. Sink: seven demos. Spec f67 (14).

---

### 29. Navigation (page 305:2696 + guideline 244310:26508) — audited 3 Sep 2026

**DLS spec** — `nav-side-primary` (192450:1049): the dark rail, bg
`--color-bg-dim` #172733, 900 tall. **Type Default, Expand No = 72
wide**: 72px header holding the 24px logo mark; body = stacked
`nav-side/item`s, each a 56×56 indicator holding a 24px icon inside
8px side padding, **selected = bg on_dim-pressed #59656d full-width
band**, hover on_dim-hover #455057; a 32px-min `Rule` row (56px hairline
on_dim-decorative); sticky footer with a top rule #303c44, 8/16 padding:
help (circle-question), notifications (bell), profile (24px initials
avatar), collapse toggle (chevrons-right). **Expand Yes = 240 wide**:
header = mark + logo text; items = 56px indicator + label/md 16
on_dim-subtle #9ba4ab (white when selected), 12px right pad; a
`Section` row (label/2xs 10 uppercase, 16px left inset, 32 min);
footer labels "Help & feedback / Notifications / Stephanie Lee /
Collapse view". **Type With labels = 88 wide, 64-tall Compact items**:
icon + label/2xs 10 centred under, 12px v-pad. `nav-side/item` also
carries Abbreviation (initials tile), Profile, Header types and
sub-items (`nav-side/sub-item`: Action rows label/md, Popover rows on
a light menu, Section label). `nav-side-secondary` (192450:1064): the
light 240 panel, bg level_2, right decorative rule; header 12/16 with
optional "Previous page" tiny plain button + 32px initials + title
heading/2xs; **items 12/12 padding, label/sm 14/500 text-strong, 8 gap,
arrow-right/down-filled_16 for sub-items, selected = product_alt-subtle
#fff2f2, hover bg-hover**; sub-items 12/8 padding, 16px sizer inset,
text-subtle (strong when selected); **Type Form** adds a trailing
16px status icon (check / triangle-exclamation) per item and sub-item;
footer (top rule, 8 v-pad) rows 12px padding with 16px icons: Print,
Settings, Collapse view; **Collapse Yes = 40 wide** with a single
chevrons-right. Guideline: sidebar is the recommended global nav for
internal tools; secondary nav for 3+ levels; collapsed rail at Tablet,
expanded at Desktop HD.

**Sink today:** primary = app `nav-rail` (shell): 240 / 72 wide, bg-dim,
64px logo row, **44px items radius 6** (DLS: 56px square band, no
radius), 20px icons (DLS 24), group-wrap sub-items 36px, footer with
top rule, persona switcher popover; no With-labels type, no Section
row, no Rule row. Secondary = kit `ui-nav-panel` + `ui-nav-group` +
`ui-nav-sub-item` (Round 20-ish): 240 / collapsed widths, bg level1,
right rule, group headers 40px, sub-items 32px label/sm, selected
`--color-bg-selected`, hover bg-hover; no Form type / status icons,
no footer items, no "Previous page" header.

**Gaps:** (b) primary rail: item band 56px square + 24px icon +
on_dim-pressed selected band, Section + Rule rows, footer anatomy
(help / notifications / profile / collapse), optional With-labels
compact type; (b) secondary panel: item padding 12/12 + label/sm,
arrow-filled_16 carets, selected = `--color-primary-subtle` (our
product_alt-subtle analog), Form type with status icons, footer items,
Previous-page header, 40px collapsed strip. Primary rail lives in
The reference app's shell — playbook allows shell branding work
there, but the DLS anatomy should land as kit pieces (`ui-nav-rail`,
`ui-nav-rail-item`) the shell consumes. Decision needed on scope.

**§29 owner review (3 Sep 2026, after Round 37):** the kit rail read
right in the sink but the SHELL consumer drifted — top icons off-centre
and the rail "feeling narrower" (the shell's old `.body { padding: 0 8px
}` wrapped the kit items, which already pad themselves, so every row was
56 wide with its 56px indicator overflowing; icon centre 44 instead of
36), NO active band anywhere (the shell bound only its `.item-active`
class, never the kit's `[active]` input), no hover on an open group's
parent in expanded mode (the `.group-wrap` fill WAS the hover colour),
and no selected state on a group parent when collapsed. DLS re-pulled:
`nav-side/item` **Sub-items=Yes Selected** (192450:1227 expanded,
192450:1179 collapsed) sits on `background-dim_alt` #303c44 (our
`--color-bg-dim-hover`), NOT on_dim-pressed — the dropdown is padded
56 left / 12 bottom with sub-items 12/8 radius 4 and the selected
sub-item on on_dim-pressed; the collapsed selected group shows a
**flyout** (240 wide at left 80, dim_alt, radius 8, elevation-4, 12/8
padding, SECTION label + sub-items). Hover on the parent = on_dim-hover
#455057. Fix list handed to an agent: bind `[active]`, drop the shell
body padding, `group` input on the kit item (dim_alt band), group-wrap
on dim_alt with DLS sub-list geometry, `ui-nav-rail-flyout` for
collapsed groups.

**§21 owner ruling (3 Sep 2026) — filter selects:** the clear (×) belongs
to the FILLED state only. Table-header and page filter selects whose
default is an "All …" sentinel are UNFILLED while "All" shows — no clear
button; it appears once the user picks something else and clearing
returns to "All". Kit: `ui-select [emptyValue]` (the sentinel counts as
empty); applied at every "All" filter site. Form-field selects keep
their clear.

---

**Owner decisions for the round §25–§29 (3 Sep 2026):** (25) build
`ui-link` AND migrate the two hand-styled links; (26) List: no consumer
— archive later, not this round; (27) build `ui-loader` (dots + white-
label spinner tile) AND `ui-skeleton`, unifying the modal-shell and the reference app
skeletons; (28) **TERMINOLOGY RULING: "modal" = the DLS 600px dialog,
"focus overlay" = the full-viewport shell — never conflate them.** Build
`ui-modal` to the DLS spec as its own component with a sink demo;
existing overlays stay overlays; (29) BOTH navs, full DLS anatomy — kit
`ui-nav-rail` + `ui-nav-rail-item` consumed by the shell, `ui-nav-panel`
grows the Form type, footer items, Previous-page header and the 40px
collapsed strip. Standing rulings apply: Small/Tiny sizes, kit text
sizes, `--color-primary` for product_alt, placeholder names in demo data.

**BUILT (two agents, lead-verified 3 Sep 2026):** PRIMARY — NEW
`ui-nav-rail` family (`nav-rail/`: rail, item, sub-item, section, rule;
`expanded` model 72 → 240, `withLabels` 88): 72px header (mark 24, 4px
logo gap — lead-added on the projected slot), items = 56×56 indicator
with a 24px icon, 8px pads (+12 right expanded), label 13/500 on-dim-
subtle → white when active, **active = full-width `--color-bg-on-dim-
pressed` band, radius 0**, hover on-dim-hover, badge kept, `kind`
profile (24px avatar) / abbreviation / compact (88×64, 10px label);
Section row (10px uppercase, 16px inset) and Rule row (32 min, 56px
hairline); footer with top rule `--color-border-dim`, 8/16 padding. The
shell rail now composes it: home / inbox / profile, a rule, the module
items, footer = Help & feedback, Notifications, persona profile item
(switcher popover kept), collapse toggle; every e2e locator (`nav.nav`,
`.body .item`, `.user-wrap`, `.item-active`, `nav-collapsed`) survives.
Icons redrawn at 24. Spec f68 (10 incl. app checks). SECONDARY —
`ui-nav-panel` grew `ui-nav-panel-header` (12/16 + rule, tiny plain
"Previous page" with chevron-left_16, 32px avatar, title 14/600),
items 12/12 + label 13/500 with arrow-right/down-filled_16 carets,
selected `--color-primary-subtle` (was bg-selected), sub-items 12/8 +
16px sizer subtle → strong, Form `status` completed | error (16px check
/ triangle in success-strong / text-danger) + `[uiNavStatus]`,
`[ui-nav-footer-item]` rows (12 pad, 16 icon) in a `[uiNavPanelFooter]`
slot, 40px collapsed strip with a 24px chevrons glyph. Spec f69 (7).
Sink: rail (three widths), panel (form type + collapsed strip); the
sink's placeholder help circles became the real circle-question icon.

### 30. Pagination (page 467:1105) — audited 3 Sep 2026

**DLS spec** — set `pagination` (1466:3602): **Type** Basic | Complex |
Lazy Loading (× Mobile LEGACY). A level_2 footer strip, 24px h / 12px v
padding, bottom radius 4, 8/16 wrap gap. **Basic**: left "Showing 1-10
of 64 items" label/sm strong; right two Small secondary buttons
"Previous" / "Next" (32px, 8 gap). **Complex**: left counter + "Items
per page" label/sm subtle + a 72px 32px select ("10" + chevron-down_16);
right a button group of four 32px bordered icon-buttons
(chevron-left-last / chevron-left / chevron-right / chevron-right-last,
24px glyphs, 8 gap) around a 64px 32px page INPUT, then "Page 1 of 7"
label/sm subtle. **Lazy Loading**: a 16px partial loader + "Loading
more..." label 14 subtle. `dot-pagination` (91374:316329): 3–8 8px dots,
8 gap, Active / Inactive.

**Sink today:** the Complex anatomy in spirit — counter, per-page `ui-select`
72px, four 32px `.pag-btn`s with TEXT glyphs («‹›»), a static page
number span (not an input), "Page x of y"; 16px h-pad (DLS 24), top rule
instead of bottom radius. No Basic type, no Lazy type, no dot pagination.

**Gaps:** (b) `type` basic | complex | lazy; real 24px chevron icons in
`ui-icon-button`s; the page number becomes a 64px text input (typing
jumps pages); 24px h-pad; `ui-dot-pagination` for the archive (no call
site — carousels only). (c) chevrons as glyph text.

**BUILT (agent, lead-verified 3 Sep 2026):** `ui-pagination` grew
`type` basic | complex | lazy: level2 strip 12/24 padding, bottom radius
4; basic = counter 13/500 + Small "Previous"/"Next" buttons disabled at
the bounds; complex = counter + "Items per page" + 72px `ui-select`
(now `[clearable]=false` — the lead found the clear button squeezing
the value out of the 72px shell) + four small bordered `ui-icon-button`s
with 24px chevron-left-last / left / right / right-last + a **64×32
page input** (typed jump on Enter/blur, clamped) + "Page x of y" 13
subtle; lazy = a 16px three-dot cluster + "Loading more..." 13 subtle
behind `loading`. NEW `ui-dot-pagination` (`count` 3–8, `index` model,
8px dots / 8 gap, active `--color-primary`, inactive
`--color-bg-neutral`). The two reference-app callers are unchanged. Spec f70.

---

### 31. Popover (page 3260:1) — audited 3 Sep 2026

**DLS spec** — `popover` (185246:2611): a 360px level_3 panel, radius 8,
**elevation-3**; `popover-header` (89992:316128) 16px h / 12px v padding,
title heading/2xs 16/600 strong; `popover-body` 16px h-pad, 16px bottom
padding, projected slot; `popover-footer` (166757:32936) 1px decorative
top rule, 16/12 padding, 8 gap, **Type Default** = optional checkbox
row (40 min) + two Medium buttons in a 2-column grid (equal widths);
**Stacked** = full-width buttons; **Right-aligned** = right-packed
button row. A note on the page: "positions always in the centre based on
view height". No arrow/caret. Anchored to a trigger (DLS Angular popover).

**Sink today:** NOTHING named popover. Nearest: `ui-coachmark` (§12 —
the DLS coachmark, a different component with its own step chrome), the
dropdown family (menus, not content panels), `ui-tooltip` (text only).
Kebab/date/code-segment panels are menus.

**Gaps:** (a) MISSING `ui-popover` (anchored content panel with
header / body / footer slots and the three footer layouts, Small
buttons per the compact ruling; open/close on a trigger, outside-click
+ Escape, positioned by the same floating logic the dropdown menu uses).
No call site today; candidate consumers: the org-chart node preview,
column-header filters. Decision needed.

**BUILT (agent, lead-verified 3 Sep 2026):** NEW `ui-popover`
(`lib/popover/`): 360px `--color-bg-level3` panel,
radius 8, elevation-3, anchored to a projected `[uiPopoverTrigger]`
with a fresh fixed-position + flip algorithm (no shared floating
utility existed — every kit menu hand-places itself; noted for a later
consolidation), 8px offset, `placement` four corners; header 12/16
with a 14/600 title; body 16px h-pad; footer 12/16 + rule with `footer`
default (checkbox row + two equal-width small buttons) | stacked |
right, `[uiPopoverFooterStart]` / `[uiPopoverActions]` slots, hidden
when both are empty; `open` model, outside-click + Escape close, focus
into the panel and back to the trigger. Trap recorded: a `display:
contents` trigger wrapper measures as a zero rect — measure its child.
Sink demo only. Spec f71 (12).

---

### 32. Progress bar (page 305:2706) — audited 3 Sep 2026

**DLS spec** — set `Progress bar` (1168:363): a **4px** track (`--size-
base-6xs`), pill radius, bg `--color-bg-neutral` #dde3e7, 458 wide in
the set, with a 10-column grid fill: **0–90% = warning #eb9600, 100% =
success #00ab61, Error = danger #ff4724 full width, Indeterminate = a
3-of-10 warning segment** (animated sweep in code). No label anatomy —
the caption is the consumer's.

**Sink today:** no kit bar. The pre-submission document page draws a hand-rolled
44px RADIAL progress in inline SVG with hex colours (`#eef2f5`, `#f5a623`,
`#172733`) — a two-layer-rule breach hiding in a template attribute.
Stepper/tracker patterns are separate DLS items (38, 43).

**Gaps:** (a) MISSING `ui-progress-bar` (`value` 0–100, `state` auto |
error | indeterminate, `aria-valuenow`); (c) the reference-app radial is not DLS
— replace it with the DLS linear bar + its existing caption. Decision needed.

**BUILT (agent, lead-verified 3 Sep 2026):** NEW `ui-progress-bar`:
4px pill track `--color-bg-neutral` (token added, #dde3e7), `value`
0–100 → warning fill (`--color-bg-warning`), 100 → success, `state`
error → full danger fill, indeterminate → a 30% warning segment
sweeping (reduced-motion aware, no `aria-valuenow`); `role=progressbar`
+ aria range + `ariaLabel`. The pre-submission document's hand-rolled 44px
radial SVG (three hex colours) is gone — the caption row now sits over
a full-width `ui-progress-bar` wired to the real section ratio. Spec
f72. (The agent stalled on a background run; the lead verified.)

---

### 33. Quicklink (page 5401:31769) — audited 3 Sep 2026

**DLS spec** — set `quicklink` (6567:50541): **Direction** Vertical
(Size Large 56 | Medium 48 | Small 40 icon tile, 80px wide column, 4px
gap, label/sm 14 centred under) | Horizontal (new) (a pill: 32px tile
+ label, 4/8 padding, level_2, elevation-2, pill radius) | Horizontal
(old) (40px tile + label, 8 gap). Tile = pill circle bg
product-subtle #fff2f2 holding a 24px product-coloured icon (16px in
the new horizontal pill); optional "New" badge (16px danger_strong pill,
label/xs) at the tile's top-right. **States**: hover tile product-
subtle-hover #ffe5e5 + label strong; pressed product-subtle-pressed
#fcc; focus 2px access-focus ring on the tile (on the pill for the new
horizontal); disabled bg-disabled tile, disabled text. A sticky note
maps sizes: Figma small/medium/large = Angular small/medium/large.

**Sink today:** nothing. `ui-card-button` (§9) is the nearest — a
rectangular icon + title/subtitle card, not a round quick action. No
quick-action rail in the product.

**Gaps:** (a) MISSING `ui-quicklink` (vertical sizes S/M/L + the new
horizontal pill; tile in `--color-primary-subtle` family, icon in
`--color-primary`; badge via `ui-badge`). No consumer today — archive
candidate, or the dashboard's quick actions if the owner wants them.

**BUILT (agent, lead-verified 3 Sep 2026):** NEW `ui-quicklink` on
`button[ui-quicklink]` / `a[ui-quicklink]`: `direction` vertical
(`size` small 40 | medium 48 | large 56 tile, 80px column, 4 gap, label
13/500 body) | horizontal (the DLS "new" pill: level2 + elevation-2,
4/8/4 padding, 32px tile with a 16px icon); tile `--color-primary-
subtle` with the icon in `--color-primary`; `badge` "New" via
`ui-badge`; hover tile `--color-primary-subtle-hover` + label strong,
pressed `--color-primary-subtle-pressed` (token added by the lead —
#b3d5f0, the white-label analog of product-subtle-pressed), 2px focus
ring, disabled tones. Trap recorded: an `ng-content select` duplicated
across `@if` branches projects into the FIRST branch in source order —
keep one slot and toggle classes. Sink demo only, not wired into the
dashboard per the owner. Spec f73 (10).

---

### 34. Radio (page 305:2705) — audited 3 Sep 2026

**DLS spec** — `radio-input` (406:2427): 20px circle, 2px border
`--color-icon` #69737b on level_1; **hover = a 4px success_subtlest
#e2f8ef halo ring inside** (checkbox pattern); **focus = 2px solid
access-focus ring**; checked = border `--color-icon-selected` #00ab61 +
a 16px disc (10.67 dot) in the same green; disabled = bg-disabled +
border-disabled (disc disabled); read-only = border-disabled unchecked /
`icon-selected_disabled` #b0e8d0 checked, no box change; **error = bg
danger_subtlest #fff0f0 + border icon-danger #ff4724** (+ hover halo in
the same tint, focus ring). `radio-button` (52830:276162): input + 8 gap
+ text column — label/md 16/500 strong on a 20px min line, optional
description body/sm subtle 4px under; Size **compact (internal-only)**
is the same geometry (our size). `radio-button-group` (132855:17324):
field label row (label/sm text + "(optional)" + info_16, 4 gap),
optional help text label/sm subtle, error message body/sm danger; the
list = rows with **8px v-padding, 0 gap** (Vertical) or a row with gaps
(Horizontal); Read-only renders the chosen value as text. `radio-chiclet`
(52830:274830): a bordered 40px-min chip (12/8 padding, radius 4,
label/md) with optional 16px leading icon and trailing `tag-info`
(10px outlined tag); checked/hover/focus/error/read-only/disabled
states; "chiclet-slot" variant.

**Sink today:** a group of native radios,
label/sm text beside a 16px native input (`--size-base-3xs`), 24px
horizontal gap, alpha `--focus-ring` focus, error = accent colour on
the dots + message; options are `{value,label}` only. No per-option
description, no hover halo, no 2px focus ring, no error fill, no
read-only, no field-label/help/info row, no vertical layout token, no chiclet.

**Gaps:** (b) rebuild the input as a styled 20px control (hover halo,
2px focus ring, error fill, read-only, disabled) with the DLS row
geometry (8px v-pad vertical list / horizontal row), option
`description`, `layout` vertical | horizontal, `readonly` text
rendering; label size stays 13 (kit) — DLS 16; (a) `ui-radio-chiclet`
(bordered chip radios) for the archive unless the owner names a
consumer. The field-label/help row is `ui-form-field`'s job (§21).

---

**Owner decisions for the round §30–§34 (3 Sep 2026):** (30) full
`ui-pagination` — `type` basic | complex | lazy, icon-button chevrons,
page input, 24px padding, plus `ui-dot-pagination` for the archive;
(31) build `ui-popover` (header / body / footer, three footer layouts)
with a sink demo only — no consumer yet; (32) build `ui-progress-bar`
AND replace the pre-submission radial with it; (33) build `ui-quicklink`
(S/M/L vertical + the new horizontal pill) with a sink demo only — NOT
wired into the dashboard; (34) rebuild `ui-radio`'s control and rows to
the DLS states with option descriptions and layouts, plus
`ui-radio-chiclet` for the archive. Standing rulings apply: Small/Tiny
sizes, kit text sizes (labels 13), `--color-primary` for product,
placeholder names.

**BUILT (agent, lead-verified 3 Sep 2026):** `ui-radio` rebuilt in
place, API compatible: a styled **20px control** (2px `--color-icon`
border on level1; hover = 4px inner `--color-bg-success-subtlest` halo;
focus-visible = 2px `--color-focus` inset ring; checked = `--color-
icon-selected` border + a 10.67px disc; disabled / `readonly` tones;
`invalid` = `--color-bg-danger-subtlest` fill + danger border), rows =
input + 8 gap + label 13/500 strong on a 20px line + optional
`description` 13 subtle 4px under; `layout` horizontal | vertical (8px v-pad rows, 0 gap); group `readonly`
renders the chosen label as 14px text. NEW `ui-radio-chiclet` +
`ui-radio-chiclet-group`: 40px-min bordered chips (12/8 padding, radius
4), `[uiChicletIcon]` 16px + `[uiChicletTag]` (`ui-tag-info`), checked
= `--color-primary` border + `--color-primary-subtle` fill, roving-
tabindex arrow keys. Sink: a new `#ui-radio` section (the demos moved
out of the text-input area). LEAD SEAL CATCH: the agent's native input
was a 1px hidden element, so the styled control intercepted every
pointer and eight F10/F11/F12/F6d flows timed out on `check()` — the
native now sits invisibly over the 20px control as the hit target
(`pointer-events: none` on the paint-only span). Spec f74 (19) + the
five callers' specs.

### 35. Slider [DRAFT] (page 23938:189403) — audited 3 Sep 2026

**DLS spec (marked DRAFT, React-only links):** set `slider`
(118127:32352): **Size** Small (mobile) 328 | Medium 586 | Large 928 ×
**Type** Default | Min/max value | Markers | Single-handle active |
Double-handle active | Tooltip | Custom label | Custom input. Anatomy:
a 4px pill track `--color-bg-neutral` with the filled span in
`--color-icon-selected` #00ab61; a **24px handle** (white disc, 2px
border, Elevation-3 shadow; hover/active grow a halo; focus = 2px
access-focus ring; disabled greyed); optional 4px tick `_marker` row
under the track; `_value-min-max` row (label/sm strong, "SGD 100" /
"SGD 20,000", 12px above); a dark tooltip (`--color-bg-level4`, radius
4, body/sm white, pointer) over the handle while dragging; double
handles for ranges; a custom input variant pairing the slider with a
number field.

**Sink today:** nothing. No range/slider control anywhere in the reference app —
thresholds are typed into number inputs.

**Gaps:** (a) MISSING `ui-slider` (single + range, min/max labels,
markers, tooltip, disabled, read-only). DLS itself flags the set as a
draft with no Angular link — candidate SKIP until DLS ships it, or an
archive piece. Decision needed.

---

### 36. Select (page 305:2698) — remainder audit, 3 Sep 2026

**DLS spec — what §21 did not cover:** `single-select-option`
(419:1035): 40px-min row, 8px v-pad, radius 4, 12px content pad;
**Icon** (16px leading glyph) | **Avatar** (24px initials) variants;
optional **Metadata** second line (label/sm subtle); optional
**right-slot** (a 16px neutral count pill "12", label/xs); states
Default / Hover bg-hover / Pressed bg-pressed / Focus 2px ring /
Disabled text-disabled / Selected = `--color-bg-selected` + a 4px
`--color-border-selected` left bar (the §16 treatment). `multi-select-
option` (273655:2294): the same row with a 20px `ui-checkbox` leading,
Metadata line, Icon / Avatar variants, Focus / Disabled / Selected.
`multi-select-menu` (75871:340759): 320 wide, level_3, radius 8,
elevation-3, 4px inset; header = 12px top pad, 16px h-pad, the
`input-search` (40 → our 32) + a `select-menu-actions` row of two
**Tiny plain buttons "Select all" / "Reset"** at −4px optical margin.
`single-select-menu` Types Default | Phone | Currency (the §21
code-segment menus). `account-select` / `_account-select-menu` are
IBNG banking pickers (account rows with balances) — out of scope.

**Sink today:** `ui-select` options are `{value,label}` only — no
metadata, icon, avatar or right-slot per option; the listbox rows are
`ui-dropdown-item`s (which DO support `[uiDropdownIcon]`,
`[uiDropdownAvatar]`, trailing slot and the selected bar — the select
just never exposes them). `ui-multi-select` already has the search
header + tiny plain "Select all" / "Reset" (built Round 36) and
checkbox rows via `ui-checkbox`; no per-option metadata / icon / avatar.

**Gaps:** (b) option model grows `description` (Metadata), `icon`
(16px svg/name), `avatar` (initials), `count` (right-slot pill),
`disabled` — rendered through the dropdown-item slots the kit already
has, in both `ui-select` and `ui-multi-select`. No account-select.

**BUILT (agent, lead-verified 3 Sep 2026):** the option model grew
`description` (13px subtle, 2px under the label inside a new
`.ui-dropdown-item-text` column), `icon` (16px leading glyph in
`--color-icon`), `avatar` (24px initials `ui-avatar`), `count` (a 16px
`--color-bg-neutral` pill, 12px body text — `ui-badge`'s low emphasis is
compactness-overridden to 10px so a local pill carries the DLS 12) and
`disabled` (text-disabled, skipped by pointer and keyboard) — on
`ui-select` and `ui-multi-select` alike, through two additive
`ui-dropdown-item` slots (`[uiDropdownDescription]`,
`[uiDropdownAvatarSecondary]` for the checkbox-first multi row). Plain
`{value,label}` / `string[]` callers unchanged (f62, f11, f14, f24 green).
Spec f76 (9).

**§36 addendum — `ui-select-group`, an OWNER OVERRIDE of this node
(6 Sep 2026, kit-fixes walk item 10).** Pointing at the monitoring app
Signoff bar's Desk / Sub-desk pair, the owner ruled AGAINST the Select
node: "the inner individual input borders must be hidden. **Figma DLS is
also wrong here.** It should be a borderless dropdown, a divider, then a
borderless dropdown, inside one border." Recorded here as a deliberate
deviation, not a defect: `305:2698` draws each inner select of a combo
with its own border, and the kit no longer does.

NEW `ui-select-group` (`lib/select-group/`) — content
projection only, one input `layout: 'auto' | 'equal'`, `role="group"`,
no value and no CVA:
- ONE outer 1px `--color-border` frame at `--radius-sm` and
  `--size-base-sm` (32 outer, members 30 inside), level_1 fill;
- a 1px `--color-border-decorative` divider between members
  (`> * + *`, so N members give N−1 dividers and a lone member none);
- hover `--color-border-hover` on the FRAME (suppressed while focused);
  focus = the DLS 2px inset `--color-focus` ring on the frame via
  `:focus-within` + `:has(.ui-select-trigger--open)`;
- members rendered BARE (no border/radius/background, own rings
  suppressed) through a documented `:host ::ng-deep >` hook anchored on
  direct children — so `ui-select` needed no `bare` input;
- members keep their own `value` / `options` / `emptyValue` /
  `searchable` / `placeholder` / `disabled` / `type` / `min` / `max`;
- **NO `overflow: hidden`** on the frame — a member's listbox or
  date-picker popover hangs below it, and the hand-rolled
  `.dual-sel-wrap` this replaces clipped exactly that.

Members may be `ui-select` OR `ui-date-input`, which is what item 21's
table date filter needs (mode select + a `type="month"` field, or + two
day fields). Sink section `#ui-select-group` (+ nav entry) demos the
Desk / Sub-desk pair, `layout="equal"`, a disabled member, the month
member and a three-member range. Manifest entry added; f62 asserts one
border, one divider, bare members, the frame-level ring and the N−1
divider rule.

---

### 37. Snackbar (page 305:2717) — audited 3 Sep 2026

**DLS spec** — `snackbar` (486:2468): Breakpoint Desktop 640 wide |
Mobile 328. `--color-bg-level4` #172733 (our `--color-bg-dim`), radius
4, **elevation-5** (0 12 24 .2 + 0 0 1 .25), 16px h / 12px v padding,
12 gap, items top-aligned: optional 24px status icon in a 32px-min
wrap (triangle-exclamation-filled shown); message body/sm white on a
32px-min line, flex 1; optional **action button** (Small primary
product → our `--color-primary`, 32px) 12px after the text; optional
**close** = a 24px icon-button with `close_16`, in a 32px-min wrap.

**Sink today:** `message` + `dismissed`;
bg-dim, radius 4, 12/16 padding, body 13, custom shadow, a 24px close
with a hand-rolled hover; no status icon, no action button, max-width
720 (DLS 640), shadow not the elevation-5 token, no auto-dismiss
timing contract visible.

**Gaps:** (b) `icon` slot / `tone` (status icon), `action` (label +
output) rendering a Small primary `ui-button`, `dismissible`,
elevation-5 token, 640 max, 32px-min rows; (c) close as a tiny
`ui-icon-button` on-dim tone rather than a bespoke button.

**BUILT (agent, lead-verified 3 Sep 2026):** `ui-snackbar` → bg-dim,
radius 4, `--shadow-elevation-5`, 16/12 padding, 12 gap, max 640, 32px-min
rows; `tone` neutral | success | warning | danger | info renders a 24px
filled status icon in a 32px wrap (info-banner's tone tokens — the kit
has no on-dim status ladder, flagged); message 13px on-dim; `actionLabel`
+ `action` renders a Small primary `ui-button` (`--color-primary`);
`dismissible` renders a tiny on-dim `ui-icon-button` with `close_16`
(the bespoke close is gone). `message` + `dismissed` unchanged for the
four callers. Spec f77 (5).

---

### 38. Stepper (page 36356:268586 + guidelines) — audited 3 Sep 2026

**DLS spec** — three layouts. `stepper-vertical` (207411:1264), 320
wide, `Non-linear` False | True: rows of `parent-step` = a 20px marker
column (2px connector line in `--color-icon-decorative` #9ba4ab, green
`--color-icon-success` above the active step) + a step-item (8px h /
12px v pad, radius 4, label 16/500 → kit 13/14; Inactive = text-
disabled) ; `stepper-marker` (207411:1192) Status Active = 16px ring
`--color-icon-decorative` with a 10.67 disc | Inactive = hollow ring |
Completed = green `circle-checkmark-filled` | Error = red
`circle-exclamation-filled`; `sub-step` rows (label/sm, 16px leading
check_16 when completed / arrow-right_16 when active, indented under
the parent's connector, 12px v-pad); step-item states Default / Hover
bg-hover / Pressed / Focus ring. `stepper-horizontal` (207877:3254),
1104 wide: a row of `step-group`s (flex 1, 4px pad, radius 4; **Type
Group** = the current group on `--color-bg-pressed` #dde3e7 holding a
parent step + a sub-step line) with `step-item`s (parent label/md 16 →
kit 14, sub-step label/sm; **Active + Current = arrow-right_16 before
the label**, Completed = check_16 after, Error = circle-exclamation_16,
Inactive = text-disabled) over a **4px progress bar** (0–100% + Freeform
segment) — the §32 bar. `stepper-mobile-*` (dropdown, bottom sheet,
chart-progress) are mobile only. Guidelines 208503:2126 / 186153:65870
cover linear vs non-linear flows ("not started" = Null marker only in
non-linear).

**Sink today:** no kit stepper. `ui-modal-shell` exposes an
`[ui-modal-stepper]` header SLOT (Round 35) that the sink fills with a
static step row; **no app consumer** renders a stepper today; `ui-timeline` is a different
pattern (audit trail).

**Gaps:** (a) MISSING `ui-stepper` (vertical + horizontal, steps with
sub-steps, statuses, non-linear mode, progress bar) and
`ui-stepper-marker`. Consumer candidate: the focus overlay's stepper
slot — or archive.
Decision needed.

**BUILT (agent, lead-verified 3 Sep 2026):** NEW `ui-stepper` +
`ui-stepper-marker` (`lib/stepper/`): `steps` with
sub-steps and statuses completed | active | inactive | error | null,
`current` model, `orientation` vertical | horizontal, `nonLinear`,
`interactive` (+ `stepSelected`), and — added by the lead — `type`
default | group (the DLS Type axis: only the GROUP type paints the
current step-group on bg-pressed; the agent had inferred it from the
sub-step line and the Default demo wore the fill). Vertical: 20px marker
column (16px ring, 10.67 disc, green check / red exclamation, hollow
null), 2px connectors (green above completed), step-items 8/12 radius 4
label 14/500, sub-steps 13 with check_16 / arrow-right_16 glyphs and the
text indented past them. Horizontal: step-groups 4px pad radius 4,
arrow-right_16 before the current label, check_16 / exclamation after,
a `ui-progress-bar` under the row at completed/total. The focus
overlay's `[ui-modal-stepper]` sink demo now projects a real horizontal
stepper. Archive piece — no page consumer. Spec f78 (10). (The agent
stalled on a background run; the lead sealed it, fixing two rounding /
row-vs-text assertions.)

---

### 39. Switch (page 760:1788) — audited 3 Sep 2026

**DLS spec** — set `Switch` (84975:347031): **Size** Medium (default) =
40×24 (32×16 track inside a 4px inset ring) | **Small** = 28×18 (20×10
track); **Switch** On | Off × **State** Default | Hover | Focus |
Disabled. Container pill: On = `--color-icon-selected` #00ab61 → hover
`icon-selected_hover` #007a45 → disabled `icon-selected_disabled`
#b0e8d0; Off = `--color-icon-decorative` #9ba4ab → hover `icon-hover`
#59656d → disabled `icon-disabled` #c7cfd5; the knob is a white disc
(elevation-1) sliding within the track; **Focus = a 2px access-focus
ring drawn on the 4px inset "focus-ring" layer** (inside the pill's
edge, not outside). No label anatomy — the label is the consumer's.

**Sink today:** 40×22 pill,
18px knob, `--color-border` off / `--color-accent-green` on, alpha
`--focus-ring` focus, no hover tones, no Small size, no disabled
tones beyond opacity (check), `checked` model + `disabled`.

**Gaps:** (b) geometry 40×24 with the 4px inset track (knob 16 → ours
Small 28×18 per the compact ruling? — DLS Medium is "default"; decide),
hover tones on/off, disabled tints, 2px focus ring on the inset layer,
`size` small | medium; rename to `ui-switch`.

---

**Owner decisions for the round §35–§39 (3 Sep 2026):** (35) Slider
SKIPPED until DLS ships it out of draft; (36) select option extras —
`description`, `icon`, `avatar`, `count`, `disabled` — on `ui-select`
AND `ui-multi-select` through the dropdown-item slots; (37) snackbar
grows the status icon, the action button (Small primary), elevation-5,
640 max, a tiny on-dim icon-button close; (38) `ui-stepper` in BOTH
layouts for the archive (vertical + horizontal, sub-steps, statuses,
non-linear, the §32 bar) with the focus-overlay slot demo, no page
wiring; (39) `ui-toggle` becomes **`ui-switch`, Small (28×18) only**
per the compact ruling, with the four reference-app callers migrated to the new
name. Standing rulings apply.

**BUILT (agent, lead-verified 3 Sep 2026):** `ui-toggle` is gone;
NEW `ui-switch` (`lib/switch/`), **Small only** per the
owner: 28×18 host = 4px inset layer around a 20×10 track, 14px white
knob (elevation-1) travelling 10px; On `--color-icon-selected` → hover
`--color-bg-success-strong` (#007a45) → disabled
`--color-icon-selected-disabled`; Off `--color-icon-decorative` → hover
`--color-icon-hover` → disabled `--color-icon-disabled`; focus-visible =
a 2px `--color-focus` ring on the inset layer (outer size unchanged);
`role=switch`, `aria-checked`, Space / Enter, `checked` model,
`disabled`. The four reference-app callers migrated to `<ui-switch>`; `toggle/`
deleted; export swapped. Spec f79 (9) — the lead fixed two assertions
(knob travel measured across two demos; track colour read under the
still-hovering pointer, which correctly shows the on+hover tint).

**REBUILT — 6 Sep 2026 (kit-fixes walk item 30).** The owner: "Ui Switch
component is completely wrong in the kit — implement this design from
Figma." He was right, and the register's own wording above is what the
build misread: "Container pill: On = `icon-selected`" names the 28×18
CONTAINER, and the 3 Sep build painted the 20×10 inner TRACK instead,
left the host transparent, and hung a 14px knob 2px over the track's
edges — so it read as a thin bar with an oversized disc rather than a
filled pill.

Harvested set `84975:347031` (16 symbols: On/Off × Default/Hover/Focus/
Disabled × Small/Medium). **New anatomy, both sizes:** `container` (the
pill, FILLED with the state colour) → `focus-ring` (same box, 4px inset
padding) → `track` (TRANSPARENT positioning box) → `knob` (white ellipse,
`--shadow-elevation-1`). Small = 28×18 pill / 20×10 track / **10×10**
knob / travel 10 (knob at track x=0 off, x=10 on). Medium = 40×24 / 32×16
/ 16×16 / travel 16.

- Geometry now: the state colour is on `button.ui-switch`; `.track` is a
  transparent 20×10 box at the 4px inset and paints nothing; the knob is
  10×10, not 14×14.
- Colour ladder unchanged in VALUE but no longer borrowed: two tokens
  were added to `styles/tokens.css` —
  `--color-icon-selected-hover` #007a45 and `--color-icon-hover` #59656d
  — replacing the `--color-bg-success-strong` / `--color-bg-inverse`
  hacks, which coincide by value only. Disabled knob =
  `--color-bg-disabled` #eef2f5 (both disabled symbols carry it), not
  white.
- **Size axis, owner's ruling 6 Sep 2026:** the kit ships
  `size="small" | "medium"`, default `small`; **the platform uses small
  only** — `medium` is shipped for the archive with no consumer, the
  same posture as `ui-radio-chiclet`. This supersedes the 3 Sep "Small
  only" line above (which described what was BUILT, not a ban on the
  size existing).
- API unchanged (`checked` model, `disabled`, `name`, `ariaLabel`, the
  CVA), so no consumer moved. Sink `#ui-switch` gained
  `.switch-medium-row` / `.switch-medium-disabled-row` and its prose was
  rewritten ("the pill is the coloured layer", 10px knob). f79 rewritten
  to match: every `.track` colour assertion moved onto
  `button.ui-switch`, knob 14→10, plus new assertions for the
  transparent track, the 4px inset, the disabled knob tint and the three
  medium-size tests.

---

### 40. Table (page 305:2721 + guideline 165411:165187) — audited 4 Sep 2026

The owner pulled Table out of the 40–44 batch to walk alone: "table is the
fundamental of all enterprise application. Get the specs carefully." The
page holds one composition set, seven sub-component sets and a thirteen-frame
guideline; every node below was read from the tree, not the thumbnails.

**DLS spec — composition** `table (detach to use)` (238634:12422): Size
Medium | Small | Extra small × Style Default | Zebra (× legacy Build-by /
Edit-mode axes). Root is a white level_2 card, radius panel-lg 8,
elevation-1 (`0 2 4 .05` + `0 0 1 .25`), transparent 1px border-level_2
seam, `overflow: clip`, stacked at 0 gap: `table-header` → grid of
`column-header` + `data-cell` → footer. The Small reference (1280×688) is
header 112 + column row 40 + 10 rows × 48 + footer 56; Extra small
(1280×520) is 112 + 32 + 10 × 32 + 56. Footer = §30 complex pagination
("Showing 1-10 of 64 items · Items per page [10 ▾] · |‹ ‹ [1] › ›| · Page 1
of 7") on 12/24 padding. Grid columns in the reference: select 52 ·
name 1.25fr · contact .75fr · address 2fr · status .75fr · amount 1fr ·
actions fit-content.

**`table-header`** (47754:259751) Type Default | With search | With filter
tabs | With filter group | With Figma slot (Desktop; Mobile variants
skipped). bg level_2, 1px border-decorative bottom, 24px h / 16px v
padding, 16 vertical gap. Row 1 `content` (gap 8): optional back
icon-button (32, chevron-left, −8 optical margin) + `caption` (min-h 32,
gap 4): title heading/xs 20 semibold text-strong, optional subtitle body/md
`--color-text`. Row 2 `control` (gap 16): the flex-1 left slot is a 360-wide
`input-search` (32, magnifying-glass_16, placeholder text-disabled) OR a
`filter-tab-group` (gap 8; 32px tabs, label/sm; active = bg-inverse
#59656d + white text, rest level_1 + 1px border + text-subtle) OR the
`table-filter-group` ("Label:" label/sm `--color-text` + a `combo-input`:
joined 32px selects, first 320 wide, 1px border-right dividers, one outer
4px radius); right `action` = `main` (gap 8, secondary 32px buttons) + gap
12 + `sub` (gap 8, 32px icon-buttons more-vertical / gear /
circle-question, 24px glyphs). Default and With-filter-group put title and
controls on ONE 64px row (title flex-1); With search / tabs stack to 112.
**Multiselect** (guideline "Table controls"): once ≥1 row is selected the
`main` buttons are REPLACED by batch actions (Delete, Batch edit) and the
header shows the count; the select-all header checkbox goes indeterminate
/ checked ("Select all / unselect all" link under the title in the
select-all frame).

**`table-sub-header`** (120497:249555): the section divider — 24px h / 8px v
padding, label/sm 500 text-subtle uppercase text ("SINGAPORE"), 1px
border-decorative bottom, 33 tall. Guideline "Grouping": rows between two
dividers form a section.

**`column-header`** (47754:258918) Type Default | Select | Blank | Merged ×
Size × Column First | Middle | Last | None × Alignment Left | Right ×
Filter. bg level_2, border-decorative bottom. Padding: v 8 (Small) / 4
(Extra small) / 12 (Medium); h 24 at the two outer edges, 8 interior
(24/8 First, 8/8 Middle, 8/24 Last). `content` min-h 24, gap 4: label
label/sm 500 text-subtle (min-h 20, nowrap) + optional info_16 + `indicator`
(h 20) holding the 16px sort glyph. Alignment=Right: `justify-end`, glyph
BEFORE the label. Filter=True adds 8 gap + `input-field`: an Input/Basic
32 tall (Small) / **24 tall (Extra small)**, placeholder "All" in
text-disabled, chevron-down_16. Heights: Small 40 / 80 with filter; Extra
small 32 / 64; Medium 48 / 88. Select = 52 wide, one 20px checkbox. Blank
= 52 wide, empty. Merged (XS only, 197362:20905) = label + info only, no
sort, 8/8 padding — the group header spanning several columns. Optional
leftBorder / rightBorder 1px decorative (hidden by default).

**`data-cell`** (47754:259033, 348 variants) Type Text | Number | Currency |
Avatar | Status | Dot status | Expand | Select | Reorder | Actions | Blank |
Figma slot (+ legacy Slot) × Size × Style Default | Zebra | Minimal
(legacy) × Column × Figma slot × Edit mode (NEW / LEGACY) × Metadata
(legacy). bg level_2 — **Zebra alternates `background-alt` #f7f7f7** —
border-decorative bottom; padding 8/8 (Small), 8 h / 4 v (Extra small);
`content` row min-h 32 (Small) / 24 (Extra small), gap 8, items-center →
rows 48 / 32. Same 24/8/8/24 gutter rule as the header.
- Text: body/sm 400 text-strong, WRAPS (`word-break`) — the address column
  in the reference wraps to two lines (58px row); Extra small Text carries
  an optional trailing 24px icon-button (eye_16 / square-pencil_16) = the
  "cell with additional action" pattern.
- Metadata: a second line body/sm text-subtle under the content, stack gap
  0 → 69px (Small). Number: `text-right`, flex-1. Currency: §13
  currency-pair (currency text-subtle + amount text-strong, baseline, gap 4)
  `justify-end`. Avatar: 24px initials avatar + gap 8 + name. Status:
  20px status-tag pill (bg success_subtle, label/sm strong). Dot status:
  10px dot + gap 4 + label/sm. Expand: 52 wide First (24/8) — or 36 wide
  Middle (8/8) — with a 20px `indicator` holding `_table-icon-arrow`
  (arrow-right-filled_16 collapsed / arrow-down-filled_16 expanded). Select:
  52 wide, 20px checkbox. Reorder: 52 wide, 20px indicator with the
  double-lines-horizontal drag glyph. Actions (Last, 8/24): `justify-end`,
  gap 8 — optional secondary 32px button (or a TINY 24px one), then 24px
  icon-buttons square-pencil_16 / download_16 / more-vertical_16. Blank: 52
  wide, empty. Edit mode: the content becomes a full-width 32px Input/Text
  carrying the value in text-strong (selects / date pickers for typed
  cells, per the Editing guideline).

**Icons** `_table-icon-sort` (94688:308961): Default up-down-arrows_16 in
`--color-icon`; Ascending sort-ascending_16 / Descending sort-descending_16
in the theme colour ("the column being sorted is highlighted in theme
colour"). `_table-icon-arrow` (53275:271351): Collapsed / Expanded.

**Row states** (guideline "interactions", 157043:33643): Hover bg
`background-hover` #eef2f5; Active (selected) bg `background-product-subtle`
#fff2f2 (DLS product tint — white-label seam → `--color-primary-subtle`);
keyboard focus = 2px `#458fff` (`--color-focus`) outline around the row,
pressed = bg `background-pressed` #dde3e7 with the outline still on.
Expanded child rows sit on level_0 #f5f7f9 ("$gray-30") and "shall not be
used together with zebra".

**Guideline rulings** (all thirteen frames read): text left, numbers /
amounts right; multi-line labels and content TOP-aligned; three row styles
Default | Minimal | Zebra, three sizes by vertical padding; the title is
optional when the table is the only one on the page; inline actions live
in a dedicated trailing column, optionally sticky; footer = lazy loading
("Loading more…" three dots) for a lone task-list table, else traditional
pagination; three filter kinds — global filter panel ("Filter by" popover
with Reset / Apply), advanced filter (condition rows "Where / And ·
property · operator · value" + "Add filter", Reset / Apply), filter by
column (the header filter row; a **"Reset filters" button appears in the
header once any column filter is active**); five column-filter controls
(keyword search, single select, multi-select "2 selected", date / date
range, number range "200 to 500" with Min / Max + Cancel / Apply); global
search vs search by column, both across all pages; sorting toggles asc →
desc, with a logical default order; editing by cell (click → input, saved
on blur / Enter, focus ring), by row (edit icon → all editable fields +
Save / Cancel at the row end), entire table (toolbar Edit → all editable,
Save / Cancel), inline validation (error message under the cell, red
outline), or via form (edit icon opens a drawer / modal); other
behaviours — expanded rows, section dividers, column customisation (a
"Table Columns" popover of checkbox rows with drag handles; long lists use
a "Customise Table Columns" modal with Available / Selected panes and
Cancel / Save; at least one column must stay visible); new patterns — the
cell action icon, "View all (5)" / "View less" expanding content, an edited
cell showing "Previously: …" in the warning colour, and add / delete item
("⊕ Add item" row under the last row or an "Add item" header button; trash
in the actions cell).

**Sink today:** no `ui-table` component. The chassis is the GLOBAL sheet
`styles/ui-tables.css`: `.ui-table` (fixed layout, body/md
cells at 12/8 padding, 24px outer gutters, `tbody tr:hover` = `--color-bg-app`,
`.ui-td-sticky`, `.ui-cell-number` + `.ui-cell-currency/.ui-cell-amount`,
`.ui-cell-meta`, and the 24px header-filter rule) plus `ui-column-header`
(§ earlier: variants default | checkbox | blank, sort, `align`, `filtered`,
`first/last`, borders, `tone` band — built to the Extra-small anatomy
32 / 64 with the 24px filter, which the DLS XS node confirms EXACTLY) and
`ui-pagination` (§30). Seventeen app templates render a `<table>`: nine
use `ui-column-header`; the rest carry
ported chassis (`.table`, `.field-table`, `.proj-table`, mini tables). The
table packs 28px rows (the reference app's internal notes already records "should be 32" — that IS
the DLS Extra-small row).

**Gaps:** (a) MISSING a table chassis component, `ui-table-header`,
`ui-table-sub-header`, the typed data cells (avatar / status / dot / expand
/ select / reorder / actions / edit), row states (selected, keyboard focus,
pressed, expanded child), Zebra, sort glyphs per DLS (active in theme
colour), the multiselect header swap, "Reset filters", the column
customisation popover. (b) DRIFT: `.ui-table` body cells are body/md at
12/8 (DLS Small = body/sm at 8/8 with a 32 content row; XS = 4/8 with 24);
hover paints `--color-bg-app` instead of `--color-bg-hover`; the header
band has no Small size (40 / 80).

**Lead's proposal:** build the table as a kit SYSTEM, kept on native
`<table>` markup so the seventeen callers migrate by attribute, not by
rewrite: `table[ui-table]` (`size` xs | sm — xs default for the compact
application, `zebra`, `card` = the level_2 card + elevation-1 wrapper) that
owns the chassis; `tr[ui-table-row]` (`interactive`, `selected`,
`expanded`, child) for the four states; cell type classes / attribute
directives `ui-cell-number`, `-currency`, `-avatar`, `-status`, `-dot`,
`-expand`, `-select`, `-reorder`, `-actions`, `-meta`, `-edit`;
`ui-column-header` grows `size="sm"` (40 / 80) and the DLS sort glyphs;
`ui-table-header` (title / subtitle / back, search | filter-tabs |
filter-group slot, `main` + `sub` actions, `selectedCount` → batch-action
slot swaps in, `resetFilters` button) and `ui-table-sub-header`. Sink demo:
the full DLS Small and Extra-small compositions (select + avatar + text +
status + currency + actions + pagination), Zebra, expanded rows, section
dividers, multiselect, edit-by-row, column filters with Reset. Behaviours
that are page patterns rather than kit anatomy (global / advanced filter
panels, lazy loading, column customisation modal) are recorded above and
proposed as a later round.

**Owner decisions (4 Sep 2026):** build EVERYTHING including editing, but
Small and Extra small ONLY (no Medium); Extra small is the default density,
`size="sm"` opt-in; migration this round = the v2 table + the four
mandates tables; the ported `.table` /
`.field-table` chassis elsewhere wait for a later round.

**BUILT (Round 40, 4 Sep 2026) — six agents, lead second pass, seal
build clean; full suite 823/826 with the three misses (F16 h3 role in the header sub-component, F26/F28 hit by a live reload during the run) fixed and re-passed 24/24 → 826/826.**
- Kit: `table[ui-table]` (`size` xs|sm, `zebra`, `card`; host class
  `ui-table-chassis` — deliberately NOT `ui-table`, which is the legacy
  global sheet), `tr[ui-table-row]` (`interactive`, `selected`, `expanded`,
  `child`, `(activate)`), typed cell classes (`.ui-cell-select/-avatar/
  -status/-currency/-number/-dot/-expand[--middle]/-reorder/-actions/-blank/
  -meta/-action-icon`, `.ui-td-sticky`), `ui-table-card` (the DLS root
  card around header + grid + footer), `ui-table-header` (title/subtitle/
  back, default slot for search | filter tabs | filter group, `[uiTableActions]`
  / `[uiTableSubActions]`, `selectedCount` → `[uiTableBatchActions]` swap,
  `filtersActive` → Reset filters), `tr[ui-table-sub-header]`,
  `ui-column-header` `size="sm"` (40 / 80, filter 32) + `variant="merged"`,
  and the editing set: `td[ui-cell-edit]` (24 / 32 editors, `error`,
  `clickToEdit`, commit on Enter / blur, cancel on Escape),
  `ui-cell-changed` ("Previously: …" in the warning colour),
  `ui-cell-expandable` (View all (n) / View less), `tr[ui-table-add-row]`,
  `ui-table-columns` (popover, real-pointer drag reorder, Alt+Arrow
  keyboard move, min-one-visible guard). Sink `#ui-table` = chassis,
  header, editing and composition sub-sections (the full DLS reference at
  xs and sm inside `ui-table-card` with sort, column filters + Reset,
  multiselect batch actions, sticky actions, pagination footer; zebra;
  expanded rows; section dividers; edit-by-row + add row; column
  customisation).
- Migration: v2 table (`ui-table` under its own sticky machinery, rows
  28 → 32, its nowrap/ellipsis kept as a deliberate override) and the four
  mandates tables — caller chassis CSS
  deleted where the kit owns it; traders / team-requests keep their Figma
  56px rows.
- Lead second-pass catches (all fixed before the seal): the chassis host
  class collided with the legacy `.ui-table` sheet (every 32px row measured
  33); `min-height` is a no-op on table cells → the `<tr>` carries 32 / 48
  and the row rule is an inset shadow; th border duplicated the
  column-header's own rule (33px header); the card's transparent seam
  border split into the header row under border-collapse; typed cells as
  `display:flex` tds dropped out of table layout → inline layouts;
  inline-flex kit parts on the text baseline added a phantom descender →
  `td > * { vertical-align: top }`; the card shadow token (elevation-1 is
  the hairline, elevation-2 is the DLS pair); `ui-select`'s in-header
  trigger hardcoded 24px → reads `--ui-ch-filter-h`; a REFUSED
  `ui-checkbox` toggle left the native box out of sync with its model
  (fixed inside ui-checkbox with a DOM re-sync effect); header search
  stretched instead of DLS 360; placeholder UI copy in demos (names only,
  romanised). Agents' hover reads were taken with an offscreen
  `boundingBox` — scroll first.
- Known limits: the sink's `.sink` container is 880 wide, so the reference
  composition runs at 816 (column widths chosen to fit; DLS canvas is 1280);
  Medium size, global / advanced filter panels, lazy loading and the
  long-list customisation modal are recorded above and not built.

---

### 41. Tabs (page 305:2714) — audited 4 Sep 2026

The page carries FOUR separate component families, not one with variants.

**DLS spec — `tab` (421:23) / `tab-group` (76086:350921).** The page-level
tab bar. Size Medium 48 | Small 40 × State Default | Hover | Selected |
Focus | Selected focus; group axes Size × Icon × Badge.
- `tab`: NO horizontal padding of its own (`py 0`, no px) — the group's
  24px gap is the whole separation; height 40 (Small) / 48 (Medium); gap 4;
  optional leading 24px icon; label label/md; optional trailing `badge`
  (16 tall, min-width 16, 4px h-padding, radius pill, bg
  `background-neutral` #dde3e7, label/xs `--color-text`).
- States: Default label `text-subtle`; Hover adds a 1px
  `--color-border-decorative` rule under the tab; **Selected = a 2px
  `border-product` #ff3e3e bottom border + label `text-strong`**; Focus = a
  2px `border-access-focus` #458fff box at radius 4 (label stays subtle);
  Selected focus = the focus box AND the red underline.
- `tab-group`: bg level_2, 24px horizontal padding, 24px gap,
  `elevation-sticky-top` (0 1px 0 rgba(23,24,26,.05) + 0 2px 0
  rgba(23,24,26,.03)), `overflow: clip`, and — when the strip overflows —
  a 40×40 **scroll affordance** pinned at each end: a white-to-transparent
  gradient tile carrying a 24px chevron-left / chevron-right.

**DLS spec — `sub-tab` (137463:4521) / `sub-tab-group` (137463:4568).** The
second-level strip under a tab bar. 32 tall, 12px h-padding, gap 4, radius
`action-alt` 4, label label/sm, optional badge. Active = bg
`background-neutral` #dde3e7, label `text-strong`, badge bg
`background-inverse` #59656d with white text. Inactive = transparent, label
+ badge both `text-subtle` on a neutral badge. States Default | Hover |
Focus | pressed. Group: 24px h-padding, 8px v-padding, 8px gap.

**DLS spec — `switch-tab` / `switch-tab-group` (6765:41863).** Track bg
`background-disabled` #eef2f5, 4px inset padding, radius `panel-lg` 8, gap
4; each tab 32 tall, 12px h-padding, radius `action-alt` 4; the ACTIVE tab
is bg level_1 white + `elevation-2` + `text-strong`, the rest transparent +
`text-subtle`. This is exactly the kit's `ui-segmented`.

**DLS spec — `filter-tab` / `filter-tab-group` (6364:41027, 76086:352366).**
Size Medium 40 | Small 32 × Type Active | Inactive × State Default | Hover |
pressed | focus. This is exactly the kit's `ui-filter-tabs`.

**Sink today:** `ui-tabs` is 40 tall, gap 24,
label(md), a 20px badge on `--color-border-subtle`, a **1px decorative rule
under the whole bar** and a `--color-primary` 2px underline on the active
tab. `ui-filter-tabs` and `ui-segmented` exist with their own doc comments
arguing (correctly, and now confirmed by this page) that the three are
separate DLS components.

**Gaps:** (a) `ui-tabs` MISSING the icon slot, the focus ring, the hover
underline, the Medium size, the scroll affordance and the group elevation;
its badge is the wrong size (20 vs 16) and colour (`border-subtle` vs
`background-neutral`). (b) MISSING `ui-sub-tabs` entirely — no kit piece
has the 32px neutral-fill anatomy (`ui-filter-tabs` is a bordered pill,
`ui-segmented` is one inset track). (c) `ui-segmented` / `ui-filter-tabs`
not yet checked against these nodes.

**Lead's proposal:** grow `ui-tabs` to the full anatomy (`size` sm|md,
`[uiTabIcon]` slot per tab, DLS badge, hover rule, focus ring, optional
scroll chevrons that appear only on overflow, group elevation) keeping
`tabs`/`active` unchanged for the eight callers; build `ui-sub-tabs`
(same `tabs`/`active` API shape); true up `ui-segmented` and
`ui-filter-tabs` against their nodes and record any drift.

---

### 42. Tag (page 305:2715) — audited 4 Sep 2026

Four sub-components in one family; all are 20 tall (`size-base-2xs`).

**`tag-status` (407:19)** — Type Default | Success | Warning | Critical |
Information. Pill (radius pill), 8px h-padding, label/sm `text-strong`,
fills: Default `background-neutral` #dde3e7, Success
`background-success_subtle` #b0e8d0, Warning `background-warning_subtle`
#ffdea3, Critical `background-danger_subtle` #ffd6d6, **Information
`background-info_subtle` #e2d6ff**.

**`tag-status-dot` (88972:307295)** — the same five types drawn as a 10px
dot + 4px gap + label/sm `text-strong`, no fill, 20 tall.

**`tag-info` (5322:36053)** — 20 tall, 4px h-padding, radius `indicator` 4,
**label/2xs (10px)**. Two types: **Category** — a solid primitive fill with
`text-on_bright-strong`: Grey #dde3e7, Ginger #ffdeb5, Lemon #fffeb4, Melon
#b5ffdb, Mint #b4f8ff, Lavender #b4ccff, Acai #ecb4ff ("widely used, low
visual hierarchy, for categorisation"); **Product/Services** — OUTLINED,
1px border + matching text: Red border/text `product_alt` #ff3e3e, Grey
border `icon` #69737b / text-subtle, Purple border purple-40 #f392dd / text
purple-90 #a61986, Blue border blue-20 #c9eaff / text sky-70 #0095ff.

**`tag-filter` (89025:316489)** — a removable filter tag: 20 tall, radius
`indicator` 4, bg `background-neutral`, 4px left padding, label/sm
`text-strong`, then a 20px close button (16×10 close glyph) whose own
`focus-within` draws the 2px `--color-focus` ring on the BUTTON half only,
rounded on the right corners.

**Sink today:** `ui-status-tag` resolves a colour from a
status STRING through `statusVariant`, with variants `neutral | green |
red | amber` — **no Information/purple**. `ui-tag-info` is label-only, one
fixed colour, and its doc comment already argues it is not a status-tag
variant (confirmed: different radius, type ramp and question). `ui-chip`'s
`chip-input` is the closest thing to `tag-filter` but is a different DLS
component (a 24px circular remove button on a taller chip).

**Gaps:** (a) `ui-status-tag` MISSING the Information variant. (b)
`ui-tag-info` MISSING both axes — 7 Category colours and 4
Product/Services outlines. (c) MISSING a standalone dot-status tag (Round
40 put `.ui-cell-dot` in the table chassis only). (d) MISSING `tag-filter`.

**OWNER'S RULING (5 Sep 2026) — the smaller type is deliberate, not drift.**
DLS's `tag-status` is 20 tall with a label/sm label; the kit's pill is
**18.4 tall at label(xs) 12px**, and that is an INTENTIONAL change the owner
made to shrink the tag. It stands. `ui-pill` shares the geometry,
status-tag.scss documents the 2px vertical inset as off-grid and kept, and
`f16-typography` pins `.tag` to `label(xs)` as a typography contract — three
things that now all agree with the ruling rather than merely predating it.
The DLS numbers stay recorded above so the reskin knows what it is departing
from; nothing here is an open question. (An earlier lead note filed this as
drift for the owner to decide — corrected.)

**Lead's proposal:** add `variant="info"` (+ the `information` status
strings) to `ui-status-tag`; grow `ui-tag-info` with `type`
category|product and `colour`; build `ui-status-dot` (the standalone
dot-status, which the table's `.ui-cell-dot` then composes); build
`ui-tag-filter` only if a call site is wanted.

---

### 43. Tracker (page 207412:99 + guideline 237778:405) — audited 4 Sep 2026

**The guideline's Stepper-vs-Tracker table is the ruling** (237778:5822,
alpha-draft): Flow type — Stepper linear & non-linear, **Tracker linear
only**; Navigation — Stepper lets users move between steps, **Tracker
navigation not supported**; Interactivity — Stepper no inline actions,
**Tracker allows inline actions for follow-up tasks**; Order — Stepper
chronological only, **Tracker chronological or reverse**; Use case —
Stepper guided steps with user input, **Tracker track workflow progress or
status**; Visual structure — Stepper steps with indicators, **Tracker
workflow stages or statuses**.

**`tracker-marker` (207412:40778)** — 16×20: Active = white disc, 2px
`border-disabled` #c7cfd5 ring, `radio-disc` dot inside; Inactive = hollow
grey ring, no dot; Completed = 2px `icon-success` #00ab61 ring +
`circle-checkmark-filled`; Error = 2px `icon-danger` #ff4724 ring +
`circle-exclamation-filled`.

**`tracker-vertical` (207412:41377, 480 wide)** — a column of
`parent-event`s. Each event (207412:40546; Status Completed | Active |
Inactive | Error | Null × First step × Last step × State Default | Hover |
Pressed | Focused): a 16px marker rail (2px `icon-disabled` #c7cfd5 line at
`left: 7px`, split above/below the marker so the first/last step's half is
omitted) + 8px gap + content (12px vertical padding, 8px gap). Content =
a `card` (4px padding, radius `action-alt` 4, pulled out by −4px optical
margins so the text still aligns) holding a header row (title
**body/md-bold**, ellipsis, min-height 24; optional `tag-status`; optional
24px chevron-down icon-button for expand) then metadata lines body/sm
`text-subtle`; and, below the card, an optional inline-action row of 32px
secondary buttons. Hover/Pressed/Focused paint the card, not the rail.

**`tracker-vertical/sub-event` (207412:40793)** — the disclosed children:
marker column is the 2px line ONLY (no dot), content 8px vertical padding,
card 12/8 padding radius 4 tinted by status — Success
`background-success_subtlest` #e2f8ef, Error the danger subtlest, Active /
Inactive neutral, **Custom = a projected slot** (`Figma slot=Yes`). Card
header: title **body/sm-bold** + a `tag-status` right; description row:
metadata (flex-1) + timestamp (right-aligned), both body/sm `text-subtle`;
optional Error line and an optional 32px button beneath.

**`tracker-vertical/group-divider` (207705:18711)** — an **"OR"** rule
between alternative branches: a hairline, the word OR in label/sm
`text-strong`, another hairline, 8px vertical padding, the marker column
still drawing its line (except on the last step).

**`tracker-horizontal` (207973:35789, 600 wide)** — events share the width
(`flex: 1`), each a centred 16px marker with 2px connectors running to the
row edges (green `icon-success` up to and including the active step, grey
`icon-disabled` after it; the first step draws only its right half, the
last only its left) and a label below at 4px gap, 8px h-padding: Active =
body/sm-bold `text-strong`, Completed = body/sm `text-strong`, Inactive =
body/sm `text-subtle`.

Mobile bottom sheet (208011:1985) and `tracker-horizontal-mobile`
(207973:35874) — skipped knowingly, mobile.

**Sink today:** `ui-timeline` — a hand-rolled vertical rail with `done |
current | pending` dots and a from→to status-tag strip, driven by
`UiTimelineItem`. Four callers: the Special Requests **audit-log drawer**
and **workflow drawer**, and monitoring's **signoff-audit drawer**. It is
the stand-in for exactly this DLS component, but it has no sub-events, no
marker statuses beyond three, no inline actions, no OR divider and no
horizontal form.

**Gaps:** (a) MISSING `ui-tracker` in both orientations, the four marker
statuses, sub-events with their status tints and slot, the OR divider, the
expand affordance and the inline-action row. (b) `ui-timeline` is a
divergent local invention that the DLS now supersedes.

**Lead's proposal:** build `ui-tracker` + `ui-tracker-event` +
`ui-tracker-sub-event` + `ui-tracker-marker` + `ui-tracker-divider`
(`orientation` vertical|horizontal, `status`, `first`/`last`, `expandable`,
inline-action slot, sub-event content slot), then migrate the three
`ui-timeline` drawers onto it and retire `ui-timeline`.

---

### 44. Tooltip (page 305:2708) — audited 4 Sep 2026

**DLS spec** — `tooltip` (5604:31965): Body No | Yes × Position Top | Top
Left | Top Right | Bottom | Bottom Left | Bottom Right | Left | Right.
- `.tooltip-container` (413:2870): bg `background-level_4` #172733, 12px
  h-padding, 8px v-padding, radius `panel-md` 4, text
  `text-on_dim-strong` white, **max-width 280**.
- Body=No: one body/sm line. Body=Yes: a title **heading/2xs** semibold
  (kit compact ⇒ the kit's own 14px step) + 4px gap + a body/sm line.
- `.tooltip-pointer` (5604:31952): a 34×8 triangle, rotated per side; the
  eight positions are the four sides × the pointer's offset along the
  panel edge (centre / left / right).

**Sink today:** the `[uiTooltip]` directive already builds the dark panel, appends it to
`document.body`, positions it `fixed`, draws an 8px pointer and flips it
vertically. Its content contract is `{ title, lines, footer }` — a title, N
body lines and a separated footer, which is a superset of DLS's title+body.

**Gaps:** (a) only vertical flip — no Left/Right sides, and no horizontal
offset variants. (b) max-width not pinned to the DLS 280. (c) the DLS
arrow-position axis is recorded in the directive's comment as future work.

**Lead's proposal:** add `placement` (top|bottom|left|right, with the
existing auto-flip as the default) and the 280px cap; keep
`UiTooltipContent` as-is — the footer is a kit extension the table
uses and DLS has nothing that contradicts it.

---

### 45. File upload (page 467:1106) — audited 4 Sep 2026

**`upload-area` (1183:2303)** — State Default | Hover | On drag | Error ×
Size Medium (540) | Small mobile (320) × Alignment Center | Left. 1px
DASHED `--color-border` (Error: `border-danger` #ff4724), radius `panel-lg`
8, bg level_1, 12px padding. Center = column, 8px gap: a 24px
`cloud-upload` glyph, then the copy block (4px gap) — "Drag your file here
or **browse**" in label/md with `browse` in product red, and a body/sm
`text-subtle` hint "Supports PDF, Word, Excel, JPG, PNG (up to 10MB)".
Left = row, 12px gap, the glyph beside the copy.

**`upload-file` (1161:1944, 320 wide)** — one file row, 12px vertical
padding, 8px gap: `Left content` = a 40px `_file-thumbnail` + 8px + the
title block (file name label/sm `text-strong`; a second line body/sm
`text-subtle`), then `Actions` = 32px icon-buttons at 4px gap, then an
optional 4px progress bar (bg `background-neutral`, radius pill, fill
`background-warning` #eb9600 while running). Nine statuses: **Starting**
(0%), **Uploading** (40% + close), **Completed** (100%, green fill),
**Indeterminate** ("Uploading…"), **Uploaded** (size + trash),
**Failed** ("Failed, try again." in danger + retry + close),
**Read-only** (name + size, no actions), **download** (download + trash),
**Non-cancelable** ("100% — Scanning for viruses" + spinner, no close).

**`_file-thumbnail` (18095:160474)** — 40×40, bg `background-alt` #f7f7f7,
radius `indicator` 4: Type Image | PDF | Document draw the matching 24px
file glyph; Type **Preview** fills with the image itself and takes a 30%
indigo overlay on Hover / Pressed.

**Sink today:** `ui-file-drop` and `ui-file-row`.

**Gaps:** (a) `ui-file-drop` MISSING the error state, the Left alignment
and an explicit drag-over treatment tied to the DLS states. (b) MISSING
the whole upload STATUS machine — progress bar, the nine statuses, retry.
(c) MISSING `_file-thumbnail` (no file-type glyph anywhere in the kit).

**Lead's proposal:** grow `ui-file-drop` (`alignment` center|left,
`invalid`, `errorMessage`) and build `ui-file-thumbnail` (`type`
image|pdf|document|preview, `src`) + `ui-upload-file` (the status row:
`status`, `progress`, `name`, `meta`, outputs `cancel`/`retry`/`remove`/
`download`), then let `ui-file-row` compose the thumbnail.

---

### 46. File download (page 134269:902) — audited 4 Sep 2026

**DLS spec** — `File` (135552:1133), 320 wide, two types.
- **Simple** (43 tall): row, 12px gap, items-start — `Content` (8px gap) =
  optional 40px `_file-thumbnail` + a text block (4px gap) whose first line
  is a **LINK** (body/sm 500, `--color-text`, with its own 1px underline)
  and whose optional second line is a description ("3.2 MB") in body/sm
  `text-subtle`; then `Actions` (4px gap) = optional 32px download and
  32px trash icon-buttons.
- **User uploaded** (66 tall): the §45 `upload-file` row in its `download`
  status. Figma notes it is "limited to the upload component".

**Sink today:** `ui-file-row` renders a name, a size and download/remove
icon-buttons — the same anatomy MINUS the thumbnail and with the file name
as plain text rather than a link.

**Gaps:** (a) `ui-file-row` MISSING the thumbnail and the link treatment on
the name. (b) the two DLS types are not distinguished.

**Lead's proposal:** grow `ui-file-row` into the DLS `File`: add
`thumbnail` (composing §45's `ui-file-thumbnail`), make the name an
`a[ui-link]` when a `href`/`open` handler is given, keep `size` as the
description line and the existing outputs. `User uploaded` is §45's status
row, not a second implementation.

**Owner decisions (4 Sep 2026, items 41–46):** §41 grow `ui-tabs` to the
full anatomy AND build `ui-sub-tabs`, truing up `ui-segmented` /
`ui-filter-tabs` against their nodes. §42 build all four: the
`information` variant on `ui-status-tag`, both axes on `ui-tag-info`, a
standalone `ui-status-dot`, and `ui-tag-filter`. §43 build `ui-tracker` in
both orientations AND migrate the three `ui-timeline` drawers, retiring
`ui-timeline`. §44 fix the tooltip's placement axis and the 280px cap.
§45+§46 build the full set — `ui-file-thumbnail`, `ui-upload-file` (nine
statuses), `ui-file-drop` states, `ui-file-row` as the DLS `File` — and
migrate the four Special Requests call sites.

**BUILT (Round 41, 4 Sep 2026) — items 41–46, seven agents + the lead's
second pass. Seal build clean; full suite **915/915**. The first pass came back 885/915: 26 of those 30 were one real regression — `ui-tabs` gained `role="tab"` tablist semantics this round, so five older feature specs that located those tabs as `role="button"` stopped matching (fixed in the specs; the semantics are correct and stay) — and the other four were run contention, each proved clean on an isolated re-run.**

- **§41 Tabs.** `ui-tabs` grown: `size` sm(40)|md(48), a per-tab `iconPath`
  (a raw 24-viewBox SVG path — this kit has no icon registry), the DLS badge
  (16 tall, min-width 16, `--color-bg-neutral`), a 1px hover rule drawn as an
  inset shadow so it cannot reflow against the reserved 2px underline, a 2px
  `--color-focus` ring that coexists with the selected underline, `role=
  "tablist"` with a roving tabindex, and `variant` plain|panel — **plain is
  today's bare geometry so the eight app callers stay pixel-stable**, panel
  adds the DLS group chrome (level_2, 24px padding, `--shadow-sticky-top`).
  Overflow shows a 40×40 gradient chevron tile at whichever end still has
  more to reveal (ResizeObserver + a `tabs()`-keyed effect). NEW
  `ui-sub-tabs` (32 tall, 12px padding, radius 4; active = `--color-bg-neutral`
  + inverse badge; strip 24/8 padding, 8px gap). `ui-segmented` trued up to
  `switch-tab-group` (track `--color-bg-disabled`, radius `panel-lg`, 4px gap,
  options 32 not 24, active fill renamed to `--color-bg-level1`);
  `ui-filter-tabs` gained the DLS `size` sm|md axis plus a pressed state.
  NEW TOKEN `--size-base-md: 40px` (lead) — DLS's tab Small, its scroll tile
  and filter-tab Medium were all writing a raw 40px, one behind a
  `boundary-allow`.
- **§42 Tag.** `ui-status-tag` gained the Information variant (`purple`,
  `--color-tag-purple` #e2d6ff); `VARIANT_BY_STATUS` deliberately UNCHANGED —
  no existing status string means "information", and remapping one would have
  silently restyled a live page. `ui-tag-info` gained both DLS axes: `type`
  category|product and `colour` (7 solid Category fills, 4 outlined
  Product/Services). NEW `ui-status-dot` (10px dot + label, reusing
  status-tag's own `statusVariant` resolver) and NEW `ui-tag-filter`. 13 tokens added
  inside `:root`.
- **§43 Tracker.** NEW `ui-tracker` (`orientation`), `ui-tracker-marker`
  (completed | active | inactive | error | null), `ui-tracker-event`
  (status, first/last, expandable + `expanded` model, title, status tag,
  `[uiTrackerMeta]` and `[uiTrackerActions]` slots, sub-events in the default
  slot), `ui-tracker-sub-event` (5 statuses incl. `custom` with a
  `[uiTrackerSubContent]` slot), `ui-tracker-divider` (the OR rule) and
  `ui-tracker-step` (horizontal). Per the guideline's ruling the component
  is deliberately NOT navigable: no roving tabindex, no arrow-key step
  movement — only the expand affordance and the inline actions are
  interactive. **`ui-timeline` is RETIRED**: the audit-log, workflow and
  signoff-audit drawers now compose trackers, with the old `note` line, the
  `fromTag→toTag` strip (two `ui-status-tag`s inside one meta line) and the
  `link` line (now a button in `[uiTrackerActions]` — a deliberate change
  from a text link to an inline action, which is where DLS puts follow-up
  tasks) all rebuilt out of the slots rather than by adding kit inputs.
- **§44 Tooltip.** `placement` auto|top|bottom|left|right — `auto` is the
  previous vertical-flip behaviour byte-for-byte, so both callers are
  untouched; each forced side still flips when it has no room. Pointer
  rotates 4-way, panel capped at the DLS 280.
- **§45/§46 Files.** NEW `ui-file-thumbnail` (image | pdf | document |
  preview, 40×40) and `ui-upload-file` (all nine DLS statuses, reusing
  `ui-progress-bar` unchanged — its 1–99 warning / 100 success /
  indeterminate contract turned out to BE the DLS rule — and `ui-loader` for
  the non-cancelable spinner). `ui-file-drop` gained `alignment`
  center|left, `invalid` and `errorMessage`; `ui-file-row` became the DLS
  `File` (optional thumbnail, an optionally-linked name, description line)
  with every existing input and output unchanged. The four Special Requests
  call sites migrated: thumbnails everywhere, `alignment="left"` on all four
  drop zones (their column measures 684, past DLS's own 540 Medium
  reference), names left as plain text because no preview/open behaviour
  exists in this mock — honest over decorative.

**Lead second-pass catches (all fixed before the seal unless noted):**
(a) the tracker's marker was centred on the EVENT, so it drifted down the
taller the card grew — 39.8 against a title centre of 24, and 59.8 on an
expandable event; the rail is now two absolutely-positioned segments with
the marker pinned at 14px, putting its centre on the title row at 24 exactly
as DLS does, and leaving consecutive events joined by one unbroken line.
(b) `ui-file-drop` drew `browse` as an underlined link; DLS draws it as
medium-weight text in the product colour inside the sentence (the DLS File
NAME is the element that carries an underline, §46). (c) its
supported-formats line was a label step; DLS is body/sm. (d) the missing
`--size-base-md` token, above. (e) the sink labelled the Product/Services
red tag "RED" while it correctly renders this white-label's blue
`--color-primary` seam — relabelled to product-style text, as DLS itself
labels them. (f) RECORDED NOT FIXED: the `ui-status-tag` height/type drift
(see the §42 drift note above) — owner's call.

**Agent-side catches worth keeping:** the tooltip's `setPointerSide()` reset
wiped the pointer's cross-axis offset when called in the wrong order (caught
by the LEGACY f32 spec, not the new one — the new tests asserted which edge
the pointer sat on but not its alignment); `ui-tag-filter`'s defensive
`overflow: hidden` zeroed the flex automatic-minimum-size and collapsed the
whole tag to its 4px padding; and this repo's `<base href="/">` makes a bare
`<a href="#">` resolve to the site root, so `ui-file-row`'s linked name must
`preventDefault()` and emit `open` instead of navigating.

---

### 47. Scrollbar (page 42879:279080) — audited 5 Sep 2026 — SKIPPED

The page is named "Scrollbar (design only)" by DLS itself. Its one frame
(54909:281913) holds sixteen symbols on three axes — OS Windows | Mac ×
Horizontal true | false × Position Start | Middle | End | Free — i.e. the
native OS scrollbar thumb drawn at its four travel positions so a designer
can paste a realistic one into a mockup. There is no anatomy to replicate:
the browser draws the scrollbar, and where the reference app wants a custom one it
already has it — the 6px overlay thumb on `.ui-mini-table-wrap`
(`styles/ui-tables.css`) and the matching one on the v2
table's `.table-wrap`, both deliberately off-grid and documented as such.

**Decision:** SKIPPED. Nothing to build; spec archived here for the record.

---

### 48. Overlay background + Thumbnail (2504:12578 / 467:1108) — audited 5 Sep 2026

**DLS spec — Overlay background** (`Overlay Background` 2504:18371): a
single full-bleed fill, nothing else. Its one paint is the semantic token
`background-overlay` = **rgba(23, 24, 26, 0.7)**. The page also carries an
`Overlay/Scan & Pay` set (7293:55186, Size Web | Mobile) — the consumer
camera-scan overlay with a transparent cut-out window, plus a canvas note
telling designers to "manually recenter the square window when resizing as
this is a combined shape". No reference-app surface scans anything; skipped
knowingly.

**Sink today:** the value is already RIGHT and already in two places, but as
a **raw `rgba()` written twice**: `modal-shell.scss`'s `.overlay` and
`modal.scss`'s backdrop both hardcode `rgba(23, 24, 26, 0.7)`, the second
carrying a comment pointing at the first. There is no `--color-bg-overlay`
token, so the two copies can drift and the reskin has no single seam to
re-point.

**Gaps:** (a) MISSING the `background-overlay` token. (b) two raw colour
literals in kit SCSS, which is the two-layer rule's own violation.

**DLS spec — Thumbnail** (467:1108): the page is a NOTE, not a component —
"Thumbnails are placeholders that will show either images or illustrations.
These will be used inside of cards. **More thumbnail sizes coming soon**" —
above a single grey placeholder rectangle. DLS ships no thumbnail component
yet. NOTE this is a different thing from `_file-thumbnail` (§45), the 40px
file-type tile built in Round 41 as `ui-file-thumbnail`; that one is real
and done, this one is an unfinished DLS page.

**Decision (owner, 5 Sep 2026):** "the last one is just overlay background,
then it's complete" — build the overlay token, skip Thumbnail (DLS has
nothing to replicate yet) and skip Scan & Pay.

**Lead's proposal:** add `--color-bg-overlay: rgba(23, 24, 26, 0.7)` to
`:root` and point both scrims at it. No new component: an overlay
background is a fill, and the two surfaces that need it (`ui-modal-shell`,
`ui-modal`) already own their own positioning.

**BUILT (5 Sep 2026).** `--color-bg-overlay: rgba(23, 24, 26, 0.7)` added to
`:root`; `ui-modal-shell`'s `.overlay` and `ui-modal`'s `.ui-modal-overlay`
both read it, replacing the two raw literals. The computed colour is
unchanged — this is a refactor to a seam, not a restyle. Spec f91 (4) asserts
both scrims equal the token read off `document.documentElement`, which is
what proves they share it rather than merely agreeing today; f60 and f67
(19) still pass.

The build agent's grep turned up two further uses of the same ink base.
`shared/compact-dialog.ts` — the small centred dialog shell behind send-back
/ reject, cancel, revoke and the platform status change — scrimmed at
`rgba(23, 24, 26, **0.5**)`: the same ink at a different alpha, so the page
dimmed visibly less behind a compact dialog than behind a modal or the focus
overlay. **Owner's call, 5 Sep 2026: they match.** It now reads
`--color-bg-overlay` too, which also takes a raw colour literal out of
feature code (the two-layer rule's own case). f91 grew a fifth test that
drives the one flow raising it — System Access, a platform edited Active →
Inactive, the only transition that asks first — and asserts its scrim equals
the same token read. The other hit, `--shadow-sticky-top`, reuses the base
at 0.03/0.05 inside a box-shadow; not a background, left alone.

`app-compact-dialog` remains the one modal surface in the app NOT built on
the kit — its own doc comment records that it was hand-rolled because
`the kit` was off-limits for that task. Promoting it to a kit component
is the obvious follow-up, and is not done here.

---

## The walk is COMPLETE (5 Sep 2026)

All 48 numbered pages are closed: 41 BUILT, 7 skipped or deferred with their
specs archived here — Bottom sheet (§5, mobile), Input OTP (§22, no OTP
step), Input transfer, List,
Slider (§35, DLS draft with no Angular package), Scrollbar (§47, OS-native
art) and Thumbnail (§48, a DLS placeholder page that says "more thumbnail
sizes coming soon"). Every skip is a recorded owner decision, not an
omission, and each one carries enough spec to build from the day it earns a
call site.

What the walk leaves behind: a kit of ~75 components replicated against
their DLS nodes, a token file whose every value traces to a DLS semantic
name, e2e specs f40–f91 pinning the anatomy, and this register as the
audit trail — the node ids, the numbers, the owner's rulings and the traps,
so the reskin is a re-point rather than a re-read.

Deferred by decision, not left open: the Table's page-level patterns —
global and advanced filter panels, lazy loading and the long-list
column-customisation modal (§40). The owner's call on 5 Sep 2026 is that
these are not implemented now but will be eventually; §40 carries enough
harvested spec to build each one when a page needs it. The
`ui-status-tag` type step (§42) is settled: the smaller label is the
owner's own deliberate change, and the ruling is recorded there.

---

## Enterprise additions (a second Figma file)

The walk above covers DLS 3.1's core file (`i4D5zUa2sow1B7CHQuj409`).
**DLS 3.1 — Enterprise** is a separate file (`zTm6jM3QO8DCAMr51coADe`)
carrying components the enterprise products share but the core library does
not. Numbering continues from the walk for continuity; these are additions,
not a second pass.

### 49. Page header (Enterprise page 77398:124984) — audited 5 Sep 2026

**DLS spec** — set `page-header` (78711:140286), 36 symbols on three axes:
Breakpoint **Desktop 1360 | Tablet 600 | Mobile 360** × Type **Default |
Homepage | With breadcrumb | With breadcrumb + tabs | With dropdowns | With
dropdowns + tabs | With role switcher | With tabs | With horizontal
stepper** × Back **No | Yes**, plus four boolean knobs the variant props
expose: `avatar`, `statusTag`, `subtitle`, `actions`. Tablet and Mobile are
skipped per the standing desktop-only pattern of this walk.

**Chassis (Desktop):** bg `background-level_2`, 1px `border-decorative`
bottom, **40px horizontal / 16px vertical padding**, 16px gap. NOTE the 40px
matches the owner's own grey-area content rule (40 left/right), so a page
header sits flush with the content beneath it.

**`header-text`** (shared by every type): optional **48px avatar** (initials,
heading/xs on `text-on_bright`) + 16px gap + a text column (4px gap, min-height
32) = a `page title` row (8px gap) — the title in **heading/xs** semibold
`text-strong` with a `tracking` of −0.1, plus an optional `tag-status` pill —
then an optional subtitle in **body/md** `--color-text`.

**`actions`** (right, 8px gap): two 32px SECONDARY buttons at **24px
horizontal padding**, then 32px icon-buttons (download, more-vertical) that
are **OUTLINED** — a 1px `--color-border` box with a 24px glyph at 4px
padding. Both differ from this kit's defaults (its secondary button pads 12,
its icon-button is borderless), so the header either restyles them locally or
the caller composes them.

**Back=Yes** puts a chevron-left icon-button in a 24px-wide wrapper, pulled
**−8px left** (the optical-align trick the drawer header already uses), ahead
of the header-text.

**The types, by Desktop height:**
- **Default 79** — one row: header-text + actions.
- **With breadcrumb 127** — a breadcrumb row (label/sm, `text-subtle` with
  the current page `text-strong`) sharing its row with the actions, then
  header-text beneath.
- **With dropdowns 127** — a row of up to three TINY PLAIN dropdown buttons
  (24 tall, 4px padding, label/sm `text-strong`, chevron-down_16) beside the
  actions, then header-text.
- **With role switcher 138** — the same row with ONE plain dropdown ("User
  role").
- **With tabs 111** — header row, then a `tab-group`: 24px gap, 40px tabs,
  label/md, a 2px `border-product` underline on the active tab, `elevation-1`,
  and the overflow scroll chevron. It carries NO horizontal padding of its
  own — the header's 40px already sets the edge.
- **With breadcrumb + tabs 159**, **With dropdowns + tabs 159** — the two
  stacked.
- **With horizontal stepper 131** — header row, then a horizontal stepper
  strip (an arrow glyph, then step titles, the active one `text-strong`).
- **Homepage 133** — a different animal, and the lead's first reading of it
  from the thumbnail was WRONG, corrected here from the node itself
  (79603:128074): the band's background is **not a gradient**. It is a
  licensed Unsplash **photograph** (`milad-fakurian-E8Ufcyxz514-unsplash`)
  with two large blurred ellipse SVGs layered over it. Padding is **40
  horizontal / 24 vertical** (the other eight are 40/16) and there is **no
  bottom rule**. Content: an eyebrow in label/sm, a greeting in
  **heading/sm** semibold at −0.12 tracking, and a subtitle in body/md — all
  in the on-dim strong text colour. The action ("Customise dashboard") is a
  PLAIN **on-dim** button, 40 tall, leading `square-pencil_16`, label/md,
  **absolutely positioned at bottom 16 / right 32**.
  A white-label kit cannot ship a licensed stock photo, so the build
  substitutes a token-based wash and exposes the band's background as a CSS
  custom property a product can override. That substitution is the kit's own
  decision, NOT a harvested DLS value — an earlier build pass invented three
  hexes and labelled them DLS gradient stops, which they never were.

**Sink today:** no page-header component. `ui-page-title` exists but is
TYPOGRAPHY ONLY by deliberate design — its doc comment says "layout —
truncation, header height, padding — belongs to the host page, never here."
So all ten pages that show a title hand-roll their own header markup around
it: `inbox`, `mandates`, `special-requests`, `system-access`, `profile`,
`the dashboard`, `orders-v2`, `the reference app`, `trade-monitoring-v2-shell`,
`team-members`. Several already compose the exact DLS anatomy by hand — a
`ui-breadcrumb` above a title (mandates), a title beside an action button
(special-requests), a title over `ui-tabs`.

**Gaps:** (a) MISSING `ui-page-header` entirely — the chassis, the avatar,
the status tag, the subtitle, the back button, the actions cluster and the
five composition types the reference app can actually use. (b) ten hand-rolled headers
with no shared definition, each free to drift on padding and gap. (c) the
DLS action cluster's outlined icon-button and wide secondary button have no
kit equivalent.

**Owner decisions (5 Sep 2026):** build **all nine** Desktop types including
the Homepage gradient band; Tablet/Mobile skipped per the standing pattern.
Actions: **use the kit's existing `outline` on `ui-icon-button`** — the DLS
Outline axis was already harvested in an earlier round, so no new work — and
**keep the secondary button's 12px padding**, not DLS's 24, because the reference app
uses the tiny button size ("the padding is 12 today as we use tiny button
size"). Migration of the ten hand-rolled page headers is its OWN later round:
kit + sink only here.

**BUILT (Round 43, 5 Sep 2026). Seal build clean; full suite **937/938** — the one miss, `f56-dls-date-picker`'s "standalone face" test, walks `document.styleSheets` looking for the rule that hides the native calendar indicator, which is inherently timing-sensitive once a full run has many sheets loaded. Nothing this round touches the date picker, and it passed 3/3 on isolated re-runs.** `ui-page-header`
(`lib/page-header/`) — `type` across all nine Desktop
values, plus `title`, `subtitle`, `eyebrow`, `statusTag`/`statusVariant`,
`avatarName`, `back` (+ a `(back)` output) and five slots:
`[uiPageHeaderActions]`, `[uiPageHeaderBreadcrumb]`, `[uiPageHeaderTabs]`,
`[uiPageHeaderDropdowns]`, `[uiPageHeaderStepper]`. Every slot appears once
and unconditionally — `type` only moves grid placement — which sidesteps the
kit's recurring duplicate-`ng-content` trap.

It is a COMPOSITION, which is the point: the title is `h1[ui-page-title]`
(the kit's one definition of a page title, and ten pages already use it),
the tab strip is `ui-tabs` as grown in Round 41, the stepper strip is
Round 41's `ui-tracker-step`, and the breadcrumb, avatar (48 = `size="lg"`),
status tag, buttons and outlined icon-buttons are all existing kit pieces.
Nothing new was added to the kit's surface: the owner's "add outline as an
icon-button option" turned out to be already there, harvested from DLS's own
Outline axis in an earlier round. Secondary buttons keep the kit's 12px
padding per the owner's ruling, not DLS's 24.

**Lead second-pass catches on the Homepage band** — the one type where the
first build went wrong, in both directions:
(a) the register's own first description (mine, read off a thumbnail) called
the background a blue→pink gradient; the node is a licensed **photograph**
plus blurred ellipses, corrected above;
(b) the build then invented three hexes and labelled them DLS gradient
stops. They were not DLS values. Replaced by two honestly-commented tokens
that state the substitution, plus a `--ui-page-header-homepage-bg` override
so a product can supply its own art without forking;
(c) the corrected default was tuned "soft and desaturated" and landed on
pale tints carrying WHITE text at **1.15:1 and 1.37:1** — WCAG AA wants
4.5:1, so the greeting was very nearly invisible. Retuned to
`--color-primary-hover` → `--color-info-icon` → `--color-primary-hover`
(6.44:1 and 5.48:1), the darkest existing tokens that still trace the DLS
photograph's blue → violet → blue arc. **f92 now asserts the RATIO, not the
hex**, so the wash can be retuned freely but never back below AA;
(d) Homepage geometry corrected to 40/24 padding with no bottom rule, the
greeting on the kit's `heading(sm)` role, and the action absolutely
positioned at bottom 16 / right 32.

Migration of the ten hand-rolled app headers is deliberately NOT in this
round (owner's decision). When it happens it will need its own review:
those ten are not uniform — `inbox` and `special-requests` are PANEL
headers, `profile` and `system-access` are nav-panel titles, and only
`mandates`, `the dashboard`, `the reference app` and `special-requests` already carry
the DLS anatomy.

## Kit additions from the code review (5 Sep 2026)

Not new DLS components — capabilities the review found the app hand-rolling
on many pages because the kit lacked the shape. Owner's rule for the round:
a customised header becomes a kit VARIANT; no feature is dropped. The
matching page migrations are a separate round.

### 50. `ui-accordion` projected header slot — built 5 Sep 2026

Fourteen pages hand-rolled an accordion header for content the built-in
title/subtitle/count could not carry: an icon before the name, a
pipe-separated meta line, an inline status tag. Owner's ruling: a projected
slot, not typed inputs. `[accordion-header]` (marker directive
`UiAccordionHeader`) replaces the left side; the kit keeps the bar, the
right-side `[accordion-actions]` slot, the chevron, open/close, focus and
hover. `title` stays required and becomes the header's `aria-label` when
the slot is used. A one-line projection lands at exactly 48px. Sink
demos: `#accordion-header-slot-{platform,desk,clarification,bar}` — the
three real anatomies from System Access, Profile and the inbox.

### 51. `ui-form-field` `value` input — built 5 Sep 2026

Thirty-one files hand-rolled a label-over-value pair for read-only data.
Owner's ruling: `ui-form-field` gets a `value` input rather than a new
component. With `value` set the field renders the text itself in the DLS
read-only face (`body(md)`, 24px line, `--color-text-strong`, the 4px
read-only label gap) and does not render the control slot. `''` is a real
value and keeps the line height so grids stay row-aligned. Sink:
`#ff-value-grid`, `#ff-value-help`.

### 52. `ui-modal-shell` footer slot — built 5 Sep 2026

Six focus overlays hand-rolled the same bottom actions row.
`[ui-modal-footer]` + `hasFooterSlot` (the shell's existing
`hasTabsSlot` pattern): right-aligned, 8px gap, 16/40 padding,
`--color-border-decorative` top rule, a non-shrinking sibling of the
scrolling body so it stays put. Sink: the "Footer actions" shell.

### Selected-row hover — ruled 5 Sep 2026

Two hexes were in use for a hovered selected row. Owner's ruling: DLS
`color/background/default/selected` = `--color-bg-selected` for both; no
new token. Hover on a selected row no longer darkens.

### 53. Migration prep: `lazyBody`, split toggle, horizontal field, actions row — built 5 Sep 2026

The migration inventory (the reference app's internal notes)
found three behaviours the pages would lose by moving onto the kit as it
stood, and the owner ruled a kit answer for each (5 Sep 2026):

- **`ui-accordion` `lazyBody`** + `ng-template[accordion-body]` — a
  collapsed panel is not built until its first open, then stays built so the
  close animation has content. Nine app accordions `@if`-guard their bodies
  today, the monitoring app deliberately. Note: an `@if` around `<ng-content>`
  cannot do this — projected content is instantiated in the consumer's view
  regardless — hence the template outlet. Sink: `#accordion-lazy-body`.
- **`ui-accordion` split toggle** — when `[accordion-actions]`
  (`UiAccordionActions`) is projected, `role="button"`/tabindex/keyboard move
  to `.header-main` (bar + title/slot); controls in the actions slot are
  ordinary tab stops; the chevron still toggles; hover wash and focus ring
  still cover the full row; geometry unchanged. Two app headers carry a live
  control (a search box, a Take Action menu). Sink: `#accordion-actions-toggle`.
- **`ui-form-field` `layout="horizontal"`** + `labelWidth` (default 160,
  as `--ff-label-width` so a group aligns) — label left, value/control right,
  help/error under the value column. Five reference-app screens are label-left. Sink:
  `#ff-horizontal-group`.
- **`[ui-actions-row]`** (`align: end | between`) — the focus-overlay
  spec's row of actions below the last card. No margin of its own: the
  shell's 16px stack gap supplies the spacing. Sink: `#actions-row-end`,
  `#actions-row-between`.

Rulings recorded with them: the DLS accordion frame (4px, elevation-1, 16px
gutter) is adopted everywhere — no "card" frame variant; read-only labels
all go to the kit's 13px; only long forms (sign-off, New Request) pin their
actions in the modal-shell footer, the other overlays keep the scrolling
row.

### Press state — ruled 5 Sep 2026

"The press state animation where elements shift a bit when pressed upon —
removed platform wide." The theme's `button:not(:disabled):active {
transform: scale(0.97) }`, three local press transforms (rail avatar,
Mandates filter, compact-dialog close) and seventeen per-element
`transform: none` opt-outs are gone. DLS pressed states are background
fills and those stay.

### 54. `ui-accordion` controlled `expanded`, `ui-form-field` `multiline` — built 6 Sep 2026

The last seven hand-rolled accordion/field sites (M1–M3 reports) needed
two shapes: a parent that OWNS the open state (System Access vendor and
platform cards, whose tab bar destroys the list) or must be told on every
expand (Ongoing Clarifications' `markSeen`), and a read-only value that
keeps its newlines (review-proposal prose). `expanded = model<boolean |
null>(null)` — `null` is uncontrolled (today's `defaultOpen` path);
non-null is controlled; `toggle()` writes the model so every USER toggle
emits `expandedChange` in either mode and a parent push never does;
`lazyBody` latches from the effective state. `multiline` on the form field
renders `value` `pre-line`. Sink: `#accordion-controlled`,
`#accordion-listen-only`, `#ff-value-multiline`. With these, every
accordion header in the app is the kit's.

### 49 (addendum) — page header adopted by the app; two variants, one correction — 6 Sep 2026

Seven hand-rolled title bars moved onto `ui-page-header`. Not migrated, on purpose: the inbox's
detail bar and Team Members' floating canvas header are panel headings,
and the three `.nav-panel-title` blocks are the secondary nav's own
heading. Kit additions so nothing was dropped: `eyebrow` renders as an
inline label(xs) kicker on the non-homepage types (Mandates' "Desk:"),
and the title truncates with an ellipsis. Correction found on the tabbed
migration: the first build kept the chassis's 16px bottom padding and rule
UNDER the tab strip, drawing two hairlines 16px apart; the harvest's "With
tabs 111" has the strip as the last row, 24px below the title, its own
rule as the bottom edge — the three tab types now render that (113
measured). `f92` still holds (its padding assertions target the default
demo; the tabs demo is asserted by relationship).

### 49 (addendum 2) — THE BOTTOM RULE IS THE HOST'S, full bleed — 6 Sep 2026

Kit-fixes walk item 2, and a reversal of the correction directly above.
The owner, on every page with a header: "Page header with tabs or any
other should have the bottom border end to end, not just the tab section;
the left/right padding is hiding it."

The first build drew TWO hairlines (chassis rule + strip rule, 16px
apart). The 5 Sep fix dropped the HOST's rule and let the projected
`ui-tabs`'s own rule be the header's bottom edge — which removed the
doubling but introduced this defect, because that rule lives inside
`.ph-strip`, which is inset by the chassis's 40px horizontal padding. The
line therefore stopped 40px short at each end.

**The rule, now standing:** the bottom border belongs to the HOST, on
every type, and is painted outside the 40px padding so it spans the
header's full width. The tab types keep only `padding-bottom: 0` (so the
strip is still flush at the bottom edge, 24px under the title); the
projected `ui-tabs` in the strip has its own rule SUPPRESSED
(`.ph-strip ::ng-deep > [uiPageHeaderTabs] { border-bottom: none }` — the
same `::ng-deep` escape the homepage actions rule already uses,
specificity 0,3,0 against the tabs host's 0,1,0, no `!important`). One
hairline, edge to edge, on all nine types except `homepage`, which keeps
`border-bottom: none` because its band ends in the image.

`ui-tabs` itself was NOT changed — the suppression is scoped to the
header's strip, so a standalone `ui-tabs` (and f85) is untouched. f92
gained two assertions: the host's 1px `--color-border-decorative` rule
plus a 0px strip rule on all three tab types, and a measurement that the
strip is inset 40px on both sides while the host's rule is not.
