You are building an Angular 22 prototype UI using the Ai DLS Kit, a
component library that replicates DBS's DLS 3.1 design system with a
deliberately compact type scale. The kit lives at `./kit-pack` in this
project (or `node_modules/ai-dls-kit` once installed) — it is the ONLY UI
library you should use; there is no separate "real" library it stands in
for.

Before writing any UI:

1. Read `kit-pack/KIT.md` — the full component index, grouped by family.
2. Read `kit-pack/components/<name>.md` for every component you plan to
   use — selector, import, API table, slots, and a real usage example
   pulled from the kit's own demos.
3. Read `kit-pack/RULES.md` — the kit's binding rules.
4. Consult `kit-pack/TOKENS.md` for any color, spacing, or type value you
   need — never invent one.
5. For a list/table screen, start from `kit-pack/RECIPES.md` — it is a
   complete, working composition. `kit-pack/TYPES.md` has every exported
   interface (row shapes, option shapes) you will bind to.
6. Read `kit-pack/components/icon.md` before you draw a single glyph. The
   kit ships the whole icon library — 569 named icons — and that file
   lists every name. You will need it on almost every screen.

While building:

- Use ONLY `ui-*` components and kit tokens. Never a raw `<button>`,
  `<select>`, `<input>`, or `<table>`. Never a hardcoded hex color. Never a
  raw `font-size`/`font-weight`/`line-height`/`letter-spacing` — use the
  type role mixins instead.
- **Icons are NAMED, never drawn.** Every glyph is
  `<ui-icon name="chevron-down" />` — never a pasted `<svg>`, never an icon
  font, never a copied path, including inside a `ui-icon-button` or a
  component's icon slot. `name` is type-checked against the catalogue, so an
  icon the kit does not have is a compile error, not a blank box; `[size]`
  is 16 (default) or 24; the glyph paints in `currentColor`, so never set a
  fill, stroke or colour on it. If you cannot find the icon you want in
  `components/icon.md`, say so rather than drawing one.
- **Every form control is the kit's** — `ui-checkbox`, `ui-radio`,
  `ui-switch`, `ui-select`, `ui-text-input`, `ui-textarea`,
  `ui-date-input`. A raw `<input type="checkbox">` is the most common way
  this rule gets broken. Label/help/error chrome comes from
  `ui-form-field`; selects (or a select and a date input) that read as one
  field go in a `ui-select-group`.
- Keep the compact type scale exactly as documented — it is a deliberate
  house decision, not a placeholder.
- Page content padding is 24px top/bottom, 40px left/right on the
  scrollable area — except directly under a `ui-page-header`, which owns
  the 24px gap below itself, so that content region sets `padding-top: 0`.
- A modal (`ui-modal`, ~600px) and a focus overlay (`ui-modal-shell`,
  full-viewport) are different — don't conflate them.
- When the kit is missing something, say so — "X needed because the kit is
  missing Y" — and build the smallest neutral thing, not a lookalike.

When you believe a screen is done, run `node kit-pack/lint/lint-boundaries.mjs src`
and `npx ng build` (or your project's build command), fix anything either
flags, and report both results plainly, including any "X needed because
the kit is missing Y" notes from along the way.
