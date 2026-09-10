You are restyling an EXISTING Angular project to DBS's DLS 3.1 standard
using the Ai DLS Kit, a component library that replicates DLS 3.1 with a
deliberately compact type scale. The kit lives at `./kit-pack` in this
project (`node_modules/ai-dls-kit` once installed). It is the only UI
library the finished screens should use. Behaviour, data flow, routes,
services and tests stay as they are; only the UI layer changes.

Before touching any code:

1. Confirm the framework and the version BEFORE you install anything. The
   kit is an Angular 22 library and nothing else — confirm this project is
   Angular, and that it is on v22. If it is not Angular, or is on an older
   major, STOP and report what you found; do not install the kit and do
   not upgrade the project yourself. Check `package.json` for
   `@angular/core`, not the file layout — a `.tsx` file or a React
   `package.json` settles it immediately. This guard matters because
   neither failure is loud: `npm install` of the kit into a React project
   SUCCEEDS, resolving the peer dependencies by pulling in the entire
   Angular runtime, and the failure only surfaces at render time, silently
   — `<ui-icon>` in a `.tsx` file is an unknown HTML tag that renders
   empty, with a clean build and no console error.
2. Confirm the install. `kit-pack/README.md` has the four steps (tarball,
   two stylesheets in angular.json, imports, Sass mixins).
3. Read `kit-pack/KIT.md`, `kit-pack/RULES.md` and `kit-pack/TOKENS.md`.
   Skim `kit-pack/RECIPES.md` so you know what a finished DLS screen
   looks like, and `kit-pack/components/icon.md` for the icon component —
   the kit ships 570 named icons, listed alphabetically (with aliases
   for the synonyms that miss) in `kit-pack/components/icon-names.md`, and
   converting this project's glyphs onto them is a real part of the job
   (step 3 of the migration).
4. Inventory the project and write `MIGRATION.md` at the project root
   BEFORE changing anything:
   - every screen/route, in the order you propose to migrate it (shared
     shell and layout first, then the most-used screen, then the rest);
   - every raw `<button>`, `<select>`, `<input>`, `<table>`, and every
     third-party UI component (Material, Bootstrap, PrimeNG, in-house),
     each mapped to the `ui-*` component that replaces it, with the
     `kit-pack/components/<name>.md` you read to decide. Raw form
     controls count even when they are one line long: an
     `<input type="checkbox">` is `ui-checkbox`, an `<input type="date">`
     is `ui-date-input`;
   - **every glyph in the project and the icon NAME that replaces it** —
     inline `<svg>`s, icon fonts (Material Icons, Font Awesome, a
     `<i class="icon-…">`), SVG sprites/`<use>` references, `.svg` files
     referenced from `<img>` or CSS `background-image`, and any
     third-party icon component. Match each one by what it DEPICTS
     against the names in `components/icon-names.md` and record
     `old → ui-icon name="…"` plus the size (16 or 24). List separately,
     as "no catalogue match", any glyph you cannot map — a product logo,
     an illustration, a bespoke mark — those stay as assets and are the
     only glyphs that survive the migration as artwork;
   - every hardcoded hex colour and raw `font-size`/`font-weight`/
     `line-height`, each mapped to a token from `TOKENS.md` or a type
     role mixin. Colours set on a glyph (`fill`, `stroke`) are not
     mapped to a token — they are deleted: a `ui-icon` paints in
     `currentColor` and takes the colour of the text around it;
   - anything with no kit equivalent, written as "X needed because the
     kit is missing Y".
   Show me `MIGRATION.md` and wait for a go before migrating.

Migrate in this order, one step at a time, building after each:

1. **Foundation.** Load the kit's three global stylesheets — `tokens.css`,
   `ui-tables.css`, `ui-actions-row.css` — before the project's own global
   styles. Remove global resets, fonts and colour variables that fight
   them. Replace hex colours and raw type properties in shared/global
   styles with tokens and type role mixins. Page content padding becomes
   24px top/bottom, 40px left/right on the scrollable area
   (`layout.content-padding`).
2. **Shell.** Page headers become `ui-page-header` — and the page's
   content region drops its own `padding-top`, because the header now
   owns the 24px gap below itself. Navigation, tabs and breadcrumbs move
   to their `ui-*` counterparts.
3. **Icons.** Work the icon table from `MIGRATION.md`: every inline
   `<svg>`, icon-font `<i>`, sprite `<use>` and third-party icon
   component becomes `<ui-icon name="…" [size]="16|24" />`. Delete the
   glyph's `fill`/`stroke`/colour classes with it — an icon takes the
   colour of the text around it — and delete the icon font, sprite sheet
   or icon package from the project once nothing references it. Keep the
   accessibility contract: an icon beside a label or inside a control
   that already has an `aria-label` stays hidden (the default); one that
   IS the content gets `ariaLabel`. Do this before Controls: most glyphs
   live inside buttons and inputs, and converting them first means each
   control is swapped once, not twice.
4. **Controls.** Buttons, inputs, selects, checkboxes, radios, toggles,
   date pickers — screen by screen, never leaving one screen mixing the
   old library and the kit. Nothing is too small to swap: a bare
   `<input type="checkbox">` becomes `ui-checkbox`. Label / help / error
   / optional chrome comes from `ui-form-field`; two selects (or a select
   and a date input) that read as one field go inside `ui-select-group`.
5. **Tables.** Rebuild each data table on `table[ui-table]` and its cell
   classes; "All …" filter selects pass their sentinel as `emptyValue`.
6. **Overlays.** Dialogs become `ui-modal` (~600px) or `ui-modal-shell`
   (full-viewport focus overlay) — they are different things; pick per
   the existing dialog's role. In a focus overlay the content sits in
   `ui-card`s and the action buttons sit OUTSIDE them, in a
   `<div ui-actions-row>` below the last card.
7. **Retire the old library.** Only once no screen imports it, remove its
   theme, module and dependency.

Rules while migrating:

- Keep the compact type scale exactly as documented — a deliberate house
  decision, not something to "fix" back to the old sizes.
- Never invent a colour, spacing or type value; never leave a hex behind.
- Never redraw a glyph. If the catalogue has no match, leave the original
  asset in place, mark it in `MIGRATION.md` as "no catalogue match", and
  tell me — do not hand-draw a replacement and do not settle for an icon
  that means something else.
- Do not rewrite component logic, inputs/outputs, services or tests to
  make a swap easier. If a swap genuinely needs a behaviour change, note
  it in `MIGRATION.md` and ask.
- Where a raw element must stay for now, mark the line with a
  `boundary-allow: <reason>` comment so the lint can count it.
- Keep `MIGRATION.md` current: tick each screen off with what was
  replaced and what remains.

After every step run `node kit-pack/lint/lint-boundaries.mjs src` and
`npx ng build`, fix anything either flags, and report both results
plainly: screens migrated, raw elements remaining (with reasons), glyphs
converted vs. glyphs still drawn by hand (with reasons), and every "X
needed because the kit is missing Y".

Start with step 4 of the preparation: the inventory.
