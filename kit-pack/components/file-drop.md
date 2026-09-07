# UiFileDrop

**Selector:** `ui-file-drop`

**Import**

```ts
import { UiFileDrop } from 'ai-dls-kit';
```

## Description

Drag-and-drop upload zone — DLS 3.1 `upload-area` (Figma 1183:2303,
REGISTER.md §45, grown 4 Sep 2026): dashed rounded
rectangle with a cloud-upload glyph, "Drag your file here or browse"
(browse styled as a link) and a supported-formats hint line underneath.

  <ui-file-drop (browse)="attach()" />
  <ui-file-drop hint="Supports PDF (up to 5MB)" (browse)="attach()" />
  <ui-file-drop alignment="left" (browse)="attach()" />
  <ui-file-drop [invalid]="true" errorMessage="File must be under 10MB." (browse)="attach()" />

THE UPLOAD IS MOCK — there is no real file picker or drag-payload
parsing. Clicking anywhere in the zone (including the "browse" word),
pressing Enter/Space while it has focus, or dropping a file onto it all
do the exact same thing: emit `browse` once. The host is responsible for
appending a mock attachment in response.

The whole zone is a single keyboard-operable control (role="button",
tabindex 0) — "browse" is styled text inside it, not a nested interactive
element, so focus/activation stays on one control.

**Anatomy** (DLS 1183:2303): 1px DASHED `--color-border` (`--color-danger`
when `invalid` — see below), radius `--border-radius-panel-lg` (8, via
the existing `--radius-md` alias), background `--color-bg-level1`, 12px
padding on every side. `alignment` (DLS's Alignment axis) switches the
inner layout: `center` (default) stacks the glyph above an 8px-gapped
copy block; `left` runs the glyph beside a 12px-gapped copy block. Either
way the copy block itself keeps its own internal 4px gap between the
"Drag your file here or browse" line and the hint line.

**Hover vs. drag-over** — two DISTINCT treatments, not the same rule
reused: Hover only darkens the border a step (`--color-border-hover`);
an active drag-over additionally tints the whole zone
(`--color-primary` border + `--color-info-bg` fill), so a file dragged
over the zone reads more insistently than a plain mouse hover. Declared
in that order in file-drop.scss so a drag (which is also a hover) wins.

**`invalid`** (DLS's Error state) swaps the border to `--color-danger`
— tokens.css carries no dedicated `--color-border-danger` role, but
`--color-danger` (#ff4724) is the EXACT hex DLS's own border-danger
uses, so this is a real match, not a nearest-fallback GAP — and, when
`errorMessage` is non-empty, renders it in `body(sm)` /
`--color-text-danger` beneath the zone (the same role/token
`ui-form-field`'s own error row uses, form-field.scss).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `hint` | `(inferred)` | `'Supports PDF, Word, Excel, JPG, PNG (up to 10MB)'` |
| `alignment` | `UiFileDropAlignment` | `'center'` |
| `invalid` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `errorMessage` | `(inferred)` | `''` |

**Outputs**

| Name | Type |
| --- | --- |
| `browse` | `void` |

## Types

```ts
export type UiFileDropAlignment = 'center' | 'left';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<h2>ui-file-drop</h2>
    <div class="demos">
      <div class="card-frame w400 file-drop-demo">
        <ui-file-drop (browse)="dropCount.set(dropCount() + 1)" />
      </div>
      <p class="hint">Browse/drop triggered {{ dropCount() }} time(s) — mock attach only, no real file picker.</p>
    </div>
  </section>
```


## Provenance

REGISTER.md §45 (optional background — no Figma access required to use this component)
