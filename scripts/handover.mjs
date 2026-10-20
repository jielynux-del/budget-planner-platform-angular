/**
 * Builds the handover zip for the company laptop — and refuses to build one
 * that will not install there.
 *
 * The company laptop installs from an internal npm mirror that lags public
 * npm and 404s versions it has not picked up. A lockfile resolved on a
 * personal machine drifts onto exactly those versions (DECISIONS.md,
 * 2026-10-20). The mirror cannot be reached from outside, so the lockfile is
 * checked against scripts/mirror-known-good.txt instead: every package
 * version the company laptop has already installed.
 *
 * Usage (from the project root):
 *   npm run handover
 *   npm run handover -- --allow-unverified   # ship versions not yet proven
 *
 * Steps: known-good check → boundary lint → zip → unzip into a temp folder →
 * npm ci + build there. The zip is deleted if the unpacked copy fails.
 */
import { readFileSync, existsSync, rmSync, mkdtempSync, statSync } from 'fs';
import { spawnSync } from 'child_process';
import { tmpdir, homedir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const allowUnverified = process.argv.includes('--allow-unverified');
const isWindows = process.platform === 'win32';

function fail(message) {
  console.error(`\n✗ ${message}`);
  process.exit(1);
}

// Runs a command with its output captured; prints the tail only on failure.
function run(cmd, args, cwd, env = {}) {
  const r = spawnSync(cmd, args, {
    cwd,
    encoding: 'utf8',
    shell: isWindows,
    env: { ...process.env, NG_CLI_ANALYTICS: 'false', ...env },
    maxBuffer: 64 * 1024 * 1024,
  });
  if (r.error) return { ok: false, output: String(r.error.message) };
  const output = `${r.stdout || ''}${r.stderr || ''}`;
  return { ok: r.status === 0, output };
}

const tail = (text, lines = 30) => text.trimEnd().split('\n').slice(-lines).join('\n');

// --- 1. Every registry package must be one the company laptop has installed ---

console.log('1/4  Checking the lockfile against the company mirror’s known-good list…');

const lock = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'));
const knownGood = readFileSync(join(root, 'scripts/mirror-known-good.txt'), 'utf8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && !line.startsWith('#'));
const knownSet = new Set(knownGood);

const unproven = new Map(); // name@version → name
for (const [path, meta] of Object.entries(lock.packages || {})) {
  if (!path || !meta.version || meta.link) continue; // root + workspace links
  if (meta.resolved && !/^https?:/.test(meta.resolved)) continue; // file: deps (ai-dls-kit)
  const name = path.replace(/^.*node_modules\//, '');
  const id = `${name}@${meta.version}`;
  if (!knownSet.has(id)) unproven.set(id, name);
}

const semverDesc = (a, b) => {
  const pa = a.split(/[.-]/).map(Number);
  const pb = b.split(/[.-]/).map(Number);
  for (let i = 0; i < 3; i++) if ((pb[i] || 0) !== (pa[i] || 0)) return (pb[i] || 0) - (pa[i] || 0);
  return 0;
};
const knownVersionsOf = name =>
  knownGood
    .filter(id => id.slice(0, id.lastIndexOf('@')) === name)
    .map(id => id.slice(id.lastIndexOf('@') + 1))
    .sort(semverDesc);

if (unproven.size > 0) {
  console.log(`\n     ${unproven.size} package version(s) have never been installed on the company laptop:`);
  for (const [id, name] of [...unproven].sort()) {
    const known = knownVersionsOf(name);
    console.log(`       ${id}   known good: ${known.length ? known.join(', ') : 'none — new package'}`);
  }
  console.log(`
     The company mirror will most likely 404 these and npm install will fail
     there. Fix: pin each one to a known-good version — an exact version in
     package.json, or an "overrides" entry for an indirect dependency — then
     npm install and run this again.

     A brand-new package can only be proven on the company laptop itself: ship
     with  npm run handover -- --allow-unverified  and have the recipient run
     npm run check:registry  before npm install. When it passes there, it
     records the new versions in scripts/mirror-known-good.txt.`);
  if (!allowUnverified) fail('Handover stopped: lockfile has unproven versions.');
  console.log('\n     --allow-unverified given: continuing. This zip is UNVERIFIED for the company laptop.');
} else {
  console.log('     All registry packages are known to install on the company laptop.');
}

// --- 2. Boundary lint (fast; the build runs on the unpacked zip) ---

console.log('2/4  Running the kit boundary lint…');
const lint = run(process.execPath, ['kit-pack/lint/lint-boundaries.mjs', 'src'], root);
if (!lint.ok) {
  console.error(tail(lint.output));
  fail('Handover stopped: boundary lint failed.');
}
console.log(`     ${lint.output.trim().split('\n').at(-1)}`);

// --- 3. Zip ---

console.log('3/4  Zipping…');
for (const tool of ['zip', 'unzip']) {
  if (!run(tool, ['-h'], root).ok && !run(tool, ['-v'], root).ok) {
    fail(`'${tool}' is not available on this machine. It ships with macOS and most Linux installs.`);
  }
}

const desktop = join(homedir(), 'Desktop');
const outDir = existsSync(desktop) ? desktop : dirname(root);
const now = new Date();
const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
let zipPath = join(outDir, `budget-planner-source-${stamp}.zip`);
for (let n = 2; existsSync(zipPath); n++) {
  zipPath = join(outDir, `budget-planner-source-${stamp}-${n}.zip`);
}

const zip = run(
  'zip',
  ['-r', '-q', '-X', zipPath, '.', '-x',
    // Left out deliberately, all three useless to a recipient: local agent
    // config, a nested copy of the kit, and public/v/ (parked demo builds,
    // several MB that only the version-log button reads). See DECISIONS.md,
    // 2026-10-14.
    'node_modules/*', 'dist/*', '.angular/*', '.git/*', '*.DS_Store',
    '.claude/*', 'public/v/*', 'ai-dls-kit-pack_ver2.zip'],
  root,
);
if (!zip.ok) {
  rmSync(zipPath, { force: true });
  console.error(tail(zip.output));
  fail('Handover stopped: zip failed.');
}

// --- 4. Prove the artifact: unzip somewhere clean, npm ci, build ---

console.log('4/4  Unzipping into a clean folder and running npm ci + build there…');
const verifyDir = mkdtempSync(join(tmpdir(), 'handover-verify-'));
const discard = reason => {
  rmSync(zipPath, { force: true });
  rmSync(verifyDir, { recursive: true, force: true });
  fail(`${reason} The zip was deleted — an export that does not install and build is worse than none.`);
};

const unzip = run('unzip', ['-q', zipPath, '-d', verifyDir], root);
if (!unzip.ok) {
  console.error(tail(unzip.output));
  discard('Could not unzip the archive.');
}
if (!existsSync(join(verifyDir, '.kit-versions'))) discard('.kit-versions/ is missing from the zip.');

const ci = run('npm', ['ci', '--no-audit', '--no-fund'], verifyDir);
if (!ci.ok) {
  console.error(tail(ci.output));
  discard('npm ci failed on the unpacked zip (if this machine is offline, reconnect and run again).');
}
const build = run('npm', ['run', 'build'], verifyDir);
if (!build.ok) {
  console.error(tail(build.output));
  discard('npm run build failed on the unpacked zip.');
}

const files = run('unzip', ['-Z1', zipPath], root).output.trim().split('\n').length;
rmSync(verifyDir, { recursive: true, force: true });

const sizeMb = (statSync(zipPath).size / 1024 / 1024).toFixed(1);
console.log(`
✓ Handover zip ready${unproven.size ? ' — UNVERIFIED for the company laptop' : ''}
    ${zipPath}
    ${sizeMb} MB, ${files} entries; installs and builds from a clean unzip.

  On the company laptop, unzip into an empty folder, then:
    npm run check:registry
    npm install
    npm start`);
