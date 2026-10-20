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

# Dependencies and handover

The company laptop installs npm packages from an internal mirror that lacks
many recent versions. `scripts/mirror-known-good.txt` lists the versions it is
known to have.

Do not add or upgrade an npm package unless asked. If you must, use a version
from that list — an exact version in `package.json`, or an `overrides` entry
for an indirect dependency. Never delete `package-lock.json` or re-resolve it
from scratch.

To zip, hand over or send this project, run `npm run handover` — never zip it
by hand. It refuses to zip a lockfile the company laptop cannot install, then
proves the zip installs and builds. The handover skill in the agent config
directory covers what to do when it stops.

Design and scope decisions, kit deviations and known gaps are recorded in
`DECISIONS.md`. Add an entry there when a choice is worth explaining later;
keep it newest-first.
