# UiUploadFile

**Selector:** `ui-upload-file`

**Import**

```ts
import { UiUploadFile } from 'ai-dls-kit';
```

## Description

Upload-status row — DLS 3.1 `upload-file` (Figma 1161:1944, 320 wide,
REGISTER.md §45, built 4 Sep 2026). One file, one status,
nine statuses:

  <ui-upload-file name="Passport.pdf" status="uploading" meta="40%" [progress]="40" (cancel)="abort()" />
  <ui-upload-file name="Trade confirmation.pdf" status="failed" (retry)="retry()" (cancel)="abort()" />
  <ui-upload-file name="Statement Q2.pdf" status="download" meta="2.1 MB" (download)="save()" (remove)="drop()" />

**DLS's "User uploaded" `File` type (§46, Figma 135552:1133) IS this row
in `download` status — Figma notes it is "limited to the upload
component". `ui-file-row` does NOT reimplement it; a caller who needs
that shape reaches for `ui-upload-file` directly with `status="download"`.**

**Anatomy**: `:host` carries the row's 12px vertical padding
(`--padding-panel-v-sm`, the same token `ui-file-row`'s own row uses).
The row is `Left content` (a 40px `ui-file-thumbnail` + 8px gap
(`--gap-unit-h`) + a title block at 4px gap (`--gap-unit-v`): `name` in
`label(sm)` `--color-text-strong`, a second line in `body(sm)`
`--color-text-subtle` — EXCEPT `failed`, where the second line is
`errorMessage` in `--color-text-danger` regardless of `meta`) then
`Actions` at 4px gap (`--gap-unit-inline-h`) of 32px `ui-icon-button`s.
An optional 4px progress bar sits 8px (`--gap-unit-h`) below the row.

**Which actions per status** (REGISTER.md §45's table):
starting / uploading / indeterminate / completed → Close (`cancel`);
uploaded → Trash (`remove`); failed → Retry (`retry`) THEN Close
(`cancel`); readonly → none; download → Download (`download`) THEN
Trash (`remove`); non-cancelable → a spinner, no buttons. Implemented
as one flat sequence of `@if`s (retry, download, close, trash, spinner)
gated by small per-status computed booleans rather than a `@switch`
with duplicated close-button markup for four statuses — the ordering
falls out correctly because at most one of {retry+close} / {download+
trash} / {close} / {trash} / {spinner} is ever true for a given status.

**Progress bar** — reuses `ui-progress-bar` UNCHANGED rather than
hand-rolling a second 4px pill: that component's own value/state
contract (1–99% warning fill, 100% success fill, 0% no fill,
`state="indeterminate"` sweeps and ignores `value`) is EXACTLY DLS's
`upload-file` bar rule, not a coincidence worth re-deriving. Rendered
only for the five statuses that show a bar (`BAR_STATUSES` above) — not
`failed` (DLS shows the error line instead), not `uploaded` / `readonly`
/ `download` (the transfer is already resolved), matching the source
register's own status table.

**Spinner (`non-cancelable`)** — DLS shows a small spinner, no buttons.
`ui-loader` (§27) has no dedicated "tiny" size, but its bare `spinner`
kind with `[background]="false"` is a 32px mark with no tile — the
SAME footprint as this row's other 32px icon-button actions, so it
drops into the actions slot without a hand-rolled CSS spinner. Reported
as the nearest-fit reuse, not a true "tiny" variant, in the round's
report.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `name` (required) | `string` | — |
| `meta` | `(inferred)` | `''` |
| `status` | `UiUploadStatus` | `'uploading'` |
| `progress` | `(inferred)` | `0` |
| `fileType` | `UiFileThumbnailType` | `'document'` |
| `errorMessage` | `(inferred)` | `'Failed, try again.'` |

**Outputs**

| Name | Type |
| --- | --- |
| `cancel` | `void` |
| `retry` | `void` |
| `remove` | `void` |
| `download` | `void` |

See also: UiFileThumbnailType (components/file-thumbnail.md)

## Types

```ts
export type UiUploadStatus =
  | 'starting'
  | 'uploading'
  | 'completed'
  | 'indeterminate'
  | 'uploaded'
  | 'failed'
  | 'readonly'
  | 'download'
  | 'non-cancelable';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</div>
  <div class="status-demo">
    <span class="thumb-caption">readonly</span>
    <ui-upload-file id="upload-readonly" name="Trading mandate.pdf" status="readonly" meta="3.4 MB" fileType="pdf" />
  </div>
  <div class="status-demo">
    <span class="thumb-caption">download</span>
    <ui-upload-file
      id="upload-download"
      name="Statement Q2.pdf"
      status="download"
      meta="2.1 MB"
      fileType="pdf"
      (download)="staticDownloads.set(staticDownloads() + 1)"
      (remove)="staticRemoves.set(staticRemoves() + 1)"
    />
  </div>
  <div class="status-demo">
    <span class="thumb-caption">non-cancelable</span>
    <ui-upload-file
      id="upload-non-cancelable"
      name="Compliance check.pdf"
      status="non-cancelable"
      meta="100% — Scanning for viruses"
      [progress]="100"
      fileType="pdf"
    />
  </div>
</div>
<p class="hint" id="status-hint">
  Cancel: {{ staticCancels() }} · Retry: {{ staticRetries() }} · Remove:
  {{ staticRemoves() }} · Download: {{ staticDownloads() }} (time(s) each).
</p>

<h3>Live upload — real clicks drive it</h3>
<p class="hint">
  Start upload takes progress 0% → 100% over ~2s through starting →
  uploading → completed → uploaded. Cancel (mid-run) or Remove
  (post-completion) abandons the run and drops back to idle.
</p>
```


## Provenance

REGISTER.md §45 (optional background — no Figma access required to use this component)
