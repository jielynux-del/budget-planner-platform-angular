# UiFileRow

**Selector:** `ui-file-row`

**Import**

```ts
import { UiFileRow } from 'ai-dls-kit';
```

## Description

Uploaded-file row — DLS 3.1 `File` (Figma 135552:1133, Simple type, 43
tall, REGISTER.md §46, grown 4 Sep 2026): 40x40 file-type
thumbnail, file name + optional size, and a right-aligned download /
remove action pair.

  <ui-file-row name="price-quotation.pdf" size="3.2 MB"
               (download)="save(f)" (remove)="drop(f)" />
  <ui-file-row thumbnail fileType="pdf" name="Passport.pdf" href="#"
               size="3.2 MB" (open)="preview(f)" (download)="save(f)" (remove)="drop(f)" />

The row fills the width of its container; the title wraps rather than
truncating, so long file names stay fully readable. Omit `size` (or pass
an empty string) and the subtitle line is not rendered at all.

Each action is independently switchable — `[downloadable]="false"` for a
file still uploading, `[removable]="false"` for a read-only attachment
list. Download always renders before remove.

**The default thumbnail** (no `thumbnail` input) is UNCHANGED from
before this round: a bare inline glyph chosen from the extension on
`name` (pdf / image / generic document) — deliberately not an input, so
a host can never label a `.pdf` with an image glyph. This is the exact
markup the three pre-existing callers (new-request-modal, request-detail,
large-order-sections) already render; none of them pass `thumbnail`, so
none of them see any visual change.

**`thumbnail` + `fileType`** (additive, DLS's optional §46 thumbnail
slot) swap that inline glyph for a real `ui-file-thumbnail` (§45) —
composed, not reimplemented, per the gap register's own proposal. Pass
`thumbnailSrc` alongside `fileType="preview"` to fill it with an image.

**`href` + `open`** (additive, DLS's Simple-type LINK first line) — when
`href` is non-empty, the name renders through `a[ui-link]` (1px
underline, `--color-text`) instead of plain text. `open` alone does NOT
flip this — `output()` exposes no reliable "has a listener" check in
this kit (see `ui-table-header`'s own note on the same limitation), so
`href` is the one observable signal a link is wanted. A click ALWAYS
prevents the browser's own navigation and emits `open` instead — see
`onOpenClick`'s doc for why (this app's mock data has no real file
server, and this repo's `<base href="/">` makes even `href="#"`
resolve to the site root, not the current route). The three
pre-existing callers never pass `href`, so they keep the plain-text
name unchanged.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `name` (required) | `string` | — |
| `size` | `(inferred)` | `''` |
| `downloadable` | `(inferred)` | `true` |
| `removable` | `(inferred)` | `true` |
| `thumbnail` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `fileType` | `UiFileThumbnailType` | `'document'` |
| `thumbnailSrc` | `(inferred)` | `''` |
| `href` | `(inferred)` | `''` |

**Outputs**

| Name | Type |
| --- | --- |
| `download` | `void` |
| `remove` | `void` |
| `open` | `void` |

See also: UiFileThumbnailType (components/file-thumbnail.md)

## Types

File-type families the thumbnail glyph switches on (derived from the name).

```ts
export type UiFileKind = 'pdf' | 'image' | 'doc';
```

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §46 (optional background — no Figma access required to use this component)
