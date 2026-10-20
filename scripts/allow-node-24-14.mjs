/**
 * TEMPORARY workaround for the company laptop (Node 24.14.0): Angular CLI 22
 * hard-exits below Node 24.15.0. This patches the CLI's version gate in
 * node_modules using Angular's own test-environment escape hatch (a constant
 * starting with '0' short-circuits the check to "supported").
 *
 * 24.14 → 24.15 is a patch-level Node difference; the runtime is compatible.
 * Remove this workaround (and the `postinstall` entry) once the laptop gets
 * Node ≥24.15.0 — that's the real fix. Copied from a sister prototype.
 *
 * Runs automatically as `postinstall`, and does nothing on Node ≥24.15. It
 * never fails the install: if it cannot patch, it says so and exits cleanly.
 */
import { readFileSync, writeFileSync } from 'fs';

const [major, minor] = process.versions.node.split('.').map(Number);
if (major !== 24 || minor >= 15) {
  process.exit(0);
}

const target = new URL(
  '../node_modules/@angular/cli/src/utilities/node-version.js',
  import.meta.url,
);

const ORIGINAL = /const SUPPORTED_NODE_VERSIONS = '[^']+';/;
const PATCHED =
  "const SUPPORTED_NODE_VERSIONS = '0'; /* patched by scripts/allow-node-24-14.mjs — remove when Node >=24.15 */";

let src;
try {
  src = readFileSync(target, 'utf8');
} catch {
  console.warn('allow-node-24-14: Angular CLI not installed — nothing patched.');
  process.exit(0);
}

if (src.includes('allow-node-24-14')) {
  console.log('allow-node-24-14: already patched — nothing to do.');
} else if (ORIGINAL.test(src)) {
  writeFileSync(target, src.replace(ORIGINAL, PATCHED));
  console.log(`allow-node-24-14: Node ${process.versions.node} — bypassed Angular CLI's Node 24.15 gate.`);
  console.log('Reminder: this is temporary — upgrade the laptop to Node >=24.15.0.');
} else {
  console.warn('allow-node-24-14: @angular/cli internals changed; patch not applied.');
}
