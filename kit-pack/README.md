# Ai DLS Kit

A prototyping kit for Angular 22 that replicates DBS's DLS 3.1 design
system as a self-contained component library, with a deliberately
**compact** type scale (labels 13px, body 13/14px, headings 14px, page and
modal titles 16–20px). This is a house decision, not a shortcut — keep it.

There is no separate "real" library this kit gets swapped for later. The
kit IS the product: build with it as-is.

**The icon library comes with it.** 569 named DLS icons ship inside the
package: you write `<ui-icon name="download" />` and never paste an `<svg>`,
an icon font or a copied path. Names are type-checked, so a glyph the kit
does not have is a compile error rather than a blank box, and every name is
listed in `components/icon.md`.

## What's in this zip

```
ai-dls-kit-pack/
├── README.md              you are here
├── AGENT-PROMPT.md         paste this into your AI tool (new project)
├── MIGRATE-PROMPT.md       paste this instead when restyling an existing project
├── RULES.md                the kit's rules, for you or your AI tool
├── RECIPES.md              start here: a filterable table page, end to end
├── CLAUDE.md               pointer file — drop into a Claude Code project
├── GEMINI.md                pointer file — drop into a Gemini project
├── AGENTS.md                 pointer file — drop into any agent-based tool
├── KIT.md                  index of every component
├── TOKENS.md               every design token, with its value
│                           (components/icon.md carries the 569 icon names)
├── REGISTER.md             background: how the kit was audited against Figma
├── components/*.md         one file per component — API, slots, example
├── lint/lint-boundaries.mjs   the two-layer-rule linter
└── package/ai-dls-kit-0.1.0.tgz   the installable npm package
```

## Install (four steps)

1. **Install the package** from the tarball in this zip:

   ```
   npm install ./package/ai-dls-kit-0.1.0.tgz
   ```

2. **Add the three stylesheets** to your `angular.json` under
   `projects.<your-app>.architect.build.options.styles`, in this order and
   before your own:

   ```json
   "styles": [
     "node_modules/ai-dls-kit/styles/tokens.css",
     "node_modules/ai-dls-kit/styles/ui-tables.css",
     "node_modules/ai-dls-kit/styles/ui-actions-row.css",
     "src/styles.css"
   ]
   ```

   `tokens.css` defines every `--color-*` / spacing / radius token the
   components read; `ui-tables.css` styles the table chassis' cell classes;
   `ui-actions-row.css` styles `[ui-actions-row]` (a directive carries no
   stylesheet of its own, so its one layout rule lives here). Note that a
   running `ng serve` does NOT pick up an `angular.json` change — restart it.

3. **Import components** from the package in your own code:

   ```ts
   import { UiButton, UiTable } from 'ai-dls-kit';
   ```

4. **Page padding and type roles (Sass).** The package also ships two Sass
   partials — `ai-dls-kit/tokens/layout` (the content-padding mixin) and
   `ai-dls-kit/tokens/type` (the `heading` / `label` / `body` role mixins).
   Use them from any component stylesheet (`styleUrl: './my-page.scss'`)
   with a plain package `@use` — no `angular.json` change is needed; Angular
   22's Sass resolver reads the package's `exports` map directly:

   ```scss
   @use 'ai-dls-kit/tokens/layout' as layout;
   @use 'ai-dls-kit/tokens/type' as type;

   :host { @include layout.content-padding; }          // 24px top/bottom, 40px left/right
   .scroll-region { @include layout.content-padding($scroll: true); }  // drops the bottom 24px
   h2 { @include type.heading(sm); }                    // 20px / 600 / 1.4 / -0.5%
   ```

   Verified in a stock `ng new` (Angular 22, `.scss` styles) app: `npx ng
   build` resolves both `@use` lines and emits
   `padding: var(--padding-panel-v-lg) var(--padding-panel-h-xl)` for the
   host. Sizes: `heading(2xs|xs|sm|md|lg|xl|2xl)`, `label(2xs|xs|sm|md)`,
   `body(sm|md, $bold: true|false)` — any other size is a build error by
   design. If your project uses `.css` component styles, switch that one
   file to `.scss` (Angular compiles both side by side).

## Verify the install

```
npx ng build
node kit-pack/lint/lint-boundaries.mjs src
```

The lint checks the two-layer rule: your feature code should use only
`ui-*` components and design tokens — no raw `<button>`/`<select>`/
`<input>`/`<table>`, no hardcoded hex colors, no raw font sizes.

## Building with an AI tool

Paste the contents of `AGENT-PROMPT.md` into Claude Code, Gemini, Codex, or
whatever you're using — it tells the agent how to use this kit correctly
before it writes any UI. Restyling a project that already exists? Paste
`MIGRATE-PROMPT.md` instead: it makes the agent inventory the current UI,
map every raw control and colour to the kit, and migrate screen by screen
without touching behaviour. The `CLAUDE.md` / `GEMINI.md` / `AGENTS.md` pointer
files do the same job passively: drop the one matching your tool into your
project root and a well-behaved agent will read it on its own.
