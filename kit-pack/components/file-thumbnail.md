# UiFileThumbnail

**Selector:** `ui-file-thumbnail`

**Import**

```ts
import { UiFileThumbnail } from 'ai-dls-kit';
```

## Description

File thumbnail — DLS 3.1 `_file-thumbnail` (Figma 18095:160474,
REGISTER.md §45/§46, built 4 Sep 2026). A 40×40 tile,
radius `--border-radius-indicator` (4), background `--color-bg-alt`,
`overflow: hidden`, that draws one of three 24px file-type glyphs
(Image | PDF | Document) centred in `--color-icon` — OR, `type="preview"`,
fills the tile with the file's own image (`src`, `object-fit: cover`)
and washes it with a translucent brand overlay on hover/press.

  <ui-file-thumbnail type="pdf" />
  <ui-file-thumbnail type="preview" src="data:image/…" />

Composed by BOTH halves of this DLS pair, not implemented twice:
`ui-upload-file`'s Left content slot (§45's `upload-file` row) and
`ui-file-row`'s optional leading thumbnail (§46's `File`, Simple type,
`[thumbnail]="true"`).

**Glyphs** — hand-drawn 24-viewBox outlines (this kit carries no DLS/DBS
icon font), `currentColor` on `--color-icon`. The pdf/image/document
trio is drawn to match `ui-file-row`'s PRE-EXISTING inline thumb glyphs
exactly (file-row.ts's `kind` switch) — same shapes, same kit, one
visual language for "this is a PDF" wherever it appears. `document` is
also the default `type`, DLS's generic-file fallback.

**Preview overlay** — DLS specs a 30%-opacity INDIGO wash on Hover, a
stronger one on Pressed. This kit's white-label seam has no indigo step
at all (DLS's indigo here is a brand accent, not part of the
neutral/primary ladder), and tokens.css carries exactly ONE translucent
brand-tinted token: `--color-primary-halo`, rgba(0,119,204,0.2) — 20%,
not 30% (GAP, reported in the round's report). Hover uses it once, at
face value. Pressed does NOT invent a second, darker token — it stacks
a SECOND identical `--color-primary-halo` layer (the overlay's own
background plus an inset box-shadow of the same token) on top of the
first, so two 20% layers of the same hue compose to a visibly stronger
wash without a new token or a raw hex.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `type` | `UiFileThumbnailType` | `'document'` |
| `src` | `(inferred)` | `''` |

## Types

```ts
export type UiFileThumbnailType = 'image' | 'pdf' | 'document' | 'preview';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</p>
<div class="demo-row" id="sink-file-thumbs">
  <div class="thumb-demo">
    <ui-file-thumbnail id="thumb-image" type="image" />
    <span class="thumb-caption">image</span>
  </div>
  <div class="thumb-demo">
    <ui-file-thumbnail id="thumb-pdf" type="pdf" />
    <span class="thumb-caption">pdf</span>
  </div>
  <div class="thumb-demo">
    <ui-file-thumbnail id="thumb-document" type="document" />
    <span class="thumb-caption">document</span>
  </div>
  <div class="thumb-demo">
    <ui-file-thumbnail id="thumb-preview" type="preview" [src]="previewSrc" />
    <span class="thumb-caption">preview (hover/press it)</span>
  </div>
</div>

<h3>Upload area — ui-file-drop</h3>
<p class="hint">
  DLS <code>upload-area</code> (Figma 1183:2303) — default centre,
  <code>alignment="left"</code>, and <code>invalid</code> with an error
  message.
</p>
<div class="demo-col" id="sink-upload-area">
  <div class="upload-area-demo">
    <span class="thumb-caption">Default — centre</span>
    <ui-file-drop id="dropzone-center" (browse)="onBrowse()" />
  </div>
  <div class="upload-area-demo">
    <span class="thumb-caption">alignment="left"</span>
    <ui-file-drop id="dropzone-left" alignment="left" (browse)="onBrowse()" />
  </div>
  <div class="upload-area-demo">
    <span class="thumb-caption">invalid</span>
    <ui-file-drop
      id="dropzone-invalid"
      [invalid]="true"
```


## Provenance

REGISTER.md §45 (optional background — no Figma access required to use this component)
