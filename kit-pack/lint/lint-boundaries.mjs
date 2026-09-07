/**
 * Boundary lint — enforces the two-layer white-label architecture:
 *
 *   1. App code (src/) must not use raw HTML controls.
 *      Buttons need the `ui-button` attribute; selects, date/text inputs
 *      and tables must come from the `ui` kit as it grows.
 *   2. App styles must not declare raw colors — tokens only.
 *
 * Runs as `npm run lint:boundaries` and via `prebuild`. To grant a
 * deliberate exception add `boundary-allow` in a comment on the same line.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const APP_ROOT = process.argv[2] || 'src';
const violations = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else checkFile(p);
  }
}

const RAW_CONTROLS = [
  { re: /<select[\s>]/, msg: 'raw <select> — use <ui-select>' },
  { re: /<input(?![^>]*type="(checkbox|radio)")[\s>]/, msg: 'raw <input> — use ui-date-input / upcoming ui kit inputs' },
  { re: /<table(?![^>]*\sui-table(?=[\s>]))[\s>]/, msg: 'raw <table> — use table[ui-table]' },
  { re: /<button(?![^>]*ui-(icon-|card-)?button)(?![^>]*ui-chip)(?![^>]*ui-fab)(?![^>]*ui-dropdown-(item|account-item))(?![^>]*ui-link)(?![^>]*ui-nav-rail-(item|sub-item))(?![^>]*ui-quicklink)[\s>]/, msg: 'raw <button> — add the ui-button, ui-icon-button, ui-card-button, ui-chip, ui-fab, ui-dropdown-item, ui-dropdown-account-item, ui-link, ui-nav-rail-item, ui-nav-rail-sub-item or ui-quicklink attribute' },
];
const HEX_COLOR = /#[0-9a-fA-F]{3,8}\b/;

/**
 * Typography is a ROLE, not four loose properties. DLS has no font-size
 * scale — it has heading/label/body, each owning its own weight, leading and
 * tracking — so feature code declares a role and nothing else:
 *
 *     @use 'tokens/type' as type;
 *     .thing { @include type.label(sm); }
 *
 * Setting these by hand is how the app drifted the first time: 44 hand-rolled
 * letter-spacings, and eleven bare `th` rules silently inheriting the UA's
 * weight 700 — heavier than any weight DLS contains. The mixin also rejects a
 * size the role does not have (there is no label(lg), no body(xs)) at BUILD
 * time, which a raw declaration cannot do.
 *
 * Deliberate exceptions are real but rare — uppercase tracking, optical
 * centring, the 600-weight active nav item — and each carries a
 * `boundary-allow: <reason>` on the line.
 */
const RAW_TYPE = /(^|[;{\s])(font-size|font-weight|line-height|letter-spacing)\s*:/;

/**
 * Blank out comment bodies while preserving line count, so a rule never fires
 * on prose. Handles /* *​/ blocks that SPAN lines — a per-line regex does not,
 * which showed up immediately: four of these rules explain the very defects
 * they guard against, and mention `line-height: normal` mid-paragraph.
 */
function stripComments(src) {
  let out = '';
  for (let i = 0, block = false; i < src.length; i++) {
    if (block) {
      if (src[i] === '*' && src[i + 1] === '/') { block = false; i++; out += '  '; }
      else out += src[i] === '\n' ? '\n' : ' ';
    } else if (src[i] === '/' && src[i + 1] === '*') { block = true; i++; out += '  '; }
    else if (src[i] === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') { out += ' '; i++; }
      out += '\n';
    } else out += src[i];
  }
  return out;
}

function checkFile(path) {
  const isTemplate = path.endsWith('.html');
  const isStyle = path.endsWith('.scss') || path.endsWith('.css');
  const isTs = path.endsWith('.ts');
  if (!isTemplate && !isStyle && !isTs) return;

  const raw = readFileSync(path, 'utf8');
  const lines = raw.split('\n');
  const codeLines = stripComments(raw).split('\n');
  lines.forEach((line, i) => {
    if (line.includes('boundary-allow')) return;
    if (isTemplate || isTs) {
      for (const { re, msg } of RAW_CONTROLS) {
        if (re.test(line)) violations.push(`${path}:${i + 1}  ${msg}`);
      }
    }
    const styleLine = codeLines[i] ?? '';
    if (isStyle && HEX_COLOR.test(styleLine)) {
      violations.push(`${path}:${i + 1}  raw color — use a token from node_modules/ai-dls-kit/styles/tokens.css`);
    }
    // Type is checked in .ts too: component `styles:` blocks are real CSS, and
    // globbing only *.scss is exactly how 24 declarations across six modal
    // files survived the first sweep unnoticed.
    if ((isStyle || isTs) && RAW_TYPE.test(styleLine)) {
      violations.push(
        `${path}:${i + 1}  raw typography — use @include type.heading()/label()/body() ` +
        `from 'ai-dls-kit/tokens/type'`,
      );
    }
  });
}

walk(APP_ROOT);

if (violations.length) {
  console.error(`Boundary violations (${violations.length}):\n`);
  violations.forEach(v => console.error('  ' + v));
  console.error(
    '\nFeature code composes ui-* components and tokens only — no raw',
    '\n<button>/<select>/<input>/<table>, no hex colors, no raw font sizes.',
  );
  process.exit(1);
}
console.log('Boundary lint: clean.');
