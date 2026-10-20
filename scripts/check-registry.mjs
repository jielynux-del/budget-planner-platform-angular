/**
 * Registry gap audit — verifies every package pinned in package-lock.json is
 * actually downloadable from the configured npm registry BEFORE running
 * npm install. Built for the company laptop, whose internal npm mirror can
 * lag npmjs and 404 exact tarballs (see DECISIONS.md, 2026-10-20). Copied
 * from a sister prototype.
 *
 * Usage (from the repo root):
 *   node scripts/check-registry.mjs             # uses `npm config get registry`
 *   node scripts/check-registry.mjs <registry>  # explicit registry URL
 *
 * Output: one line per MISSING package (name@version), then a summary.
 * Send the missing list back to the outside-the-company session to re-pin
 * everything in a single pass.
 *
 * When every package passes against a registry other than public npm (i.e.
 * the company mirror), the versions are added to scripts/mirror-known-good.txt,
 * the list `npm run handover` checks lockfiles against.
 */
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));

const registry = (
  process.argv[2] || execSync('npm config get registry', { encoding: 'utf8' }).trim()
).replace(/\/$/, '');

// Collect unique name@version pairs from lockfile v3 "packages"
const pkgs = new Map();
for (const [path, meta] of Object.entries(lock.packages || {})) {
  if (!path || !meta.version || meta.link) continue; // skip root + workspace links
  if (meta.resolved && !/^https?:/.test(meta.resolved)) continue; // skip file: deps (ai-dls-kit)
  const name = path.replace(/^.*node_modules\//, '');
  if (!name || name.startsWith('.')) continue;
  pkgs.set(`${name}@${meta.version}`, { name, version: meta.version });
}

const tarballUrl = ({ name, version }) => {
  const base = name.includes('/') ? name.split('/')[1] : name; // strip @scope/
  return `${registry}/${name}/-/${base}-${version}.tgz`;
};

async function probe(entry) {
  const url = tarballUrl(entry);
  try {
    // HEAD first; some registries reject it, so fall back to a 1-byte GET
    let res = await fetch(url, { method: 'HEAD' });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { headers: { Range: 'bytes=0-0' } });
    }
    return { entry, ok: res.ok || res.status === 206, status: res.status };
  } catch (err) {
    return { entry, ok: false, status: `ERR ${err.cause?.code || err.message}` };
  }
}

const all = [...pkgs.values()];
console.log(`Checking ${all.length} packages against ${registry}\n`);

const missing = [];
const CONCURRENCY = 8;
for (let i = 0; i < all.length; i += CONCURRENCY) {
  const results = await Promise.all(all.slice(i, i + CONCURRENCY).map(probe));
  for (const r of results) {
    if (!r.ok) {
      missing.push(r);
      console.log(`MISSING  ${r.entry.name}@${r.entry.version}  (${r.status})`);
    }
  }
  process.stdout.write(`\r  …${Math.min(i + CONCURRENCY, all.length)}/${all.length} checked`);
}
console.log('\n');

if (missing.length === 0) {
  console.log('✅ Registry carries every pinned package — npm install should succeed.');
  if (new URL(registry).hostname !== 'registry.npmjs.org') {
    const listUrl = new URL('./mirror-known-good.txt', import.meta.url);
    const lines = readFileSync(listUrl, 'utf8').split('\n');
    const header = lines.filter(l => l.startsWith('#') || l === '').join('\n').trimEnd();
    const known = new Set(lines.filter(l => l && !l.startsWith('#')));
    const added = [...pkgs.keys()].filter(id => !known.has(id));
    if (added.length > 0) {
      const merged = [...known, ...added].sort();
      writeFileSync(listUrl, `${header}\n\n${merged.join('\n')}\n`);
      console.log(`Recorded ${added.length} newly proven version(s) in scripts/mirror-known-good.txt.`);
      console.log('Keep that file in any zip sent back, so future handovers know about them.');
    }
  }
  process.exit(0);
}

console.log(`❌ ${missing.length} package(s) not resolvable. Discovering what the mirror DOES have…\n`);

// For each gapped package, walk its version history newest→oldest and probe
// tarballs until one resolves — that's the newest mirror-available version.
// (Packument version lists can't be trusted on virtual repos: they may echo
// the upstream index even when tarballs are quarantined.)
const semverDesc = (a, b) =>
  b.split('.').map(Number).reduce((acc, x, i) => acc || x - (a.split('.')[i] ?? 0), 0);

async function newestAvailable(name) {
  try {
    // Abbreviated packument first; Artifactory 406s it for scoped packages,
    // so fall back to the full document (application/json).
    let res = await fetch(`${registry}/${name}`, {
      headers: { accept: 'application/vnd.npm.install-v1+json' },
    });
    if (res.status === 406) {
      res = await fetch(`${registry}/${name}`, { headers: { accept: 'application/json' } });
    }
    if (!res.ok) return `packument ${res.status}`;
    const doc = await res.json();
    const versions = Object.keys(doc.versions || {})
      .filter(v => !v.includes('-')) // skip prereleases
      .sort(semverDesc);
    if (versions.length === 0) return 'packument has no versions';
    for (const v of versions.slice(0, 40)) {
      const r = await probe({ name, version: v });
      if (r.ok) return v;
    }
    return `none in newest 40 (oldest probed: ${versions[39] || versions.at(-1)})`;
  } catch (err) {
    return `ERR ${err.cause?.code || err.message}`;
  }
}

const names = [...new Set(missing.map(r => r.entry.name))];
const plan = {};
console.log('RE-PIN PLAN (pinned → newest the mirror serves):');
for (const name of names) {
  const pinned = missing.find(r => r.entry.name === name).entry.version;
  const avail = await newestAvailable(name);
  plan[name] = { pinned, available: avail };
  console.log(`  ${name}: ${pinned} → ${avail}`);
}
console.log('\n--- machine-readable plan (copy this JSON block outside) ---');
console.log(JSON.stringify(plan, null, 1));
process.exit(1);
