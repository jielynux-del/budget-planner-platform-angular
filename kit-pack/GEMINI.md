# UI kit

The UI kit for this project is `ai-dls-kit`.

Before writing any UI, read `kit-pack/KIT.md` and `kit-pack/RULES.md`.

Use only `ui-*` components and kit design tokens — never a raw
`<button>`/`<select>`/`<input>`/`<table>`, never a hardcoded hex color.
That includes the small ones: a checkbox is `ui-checkbox`, never an
`<input type="checkbox">`.

Icons are NAMED, never drawn: `<ui-icon name="download" />`, size 16 or 24,
colour inherited from the surrounding text. Never paste an SVG, an icon font
or a copied path. `kit-pack/components/icon.md` lists all 569 names.

Before finishing, run `node kit-pack/lint/lint-boundaries.mjs src`.
