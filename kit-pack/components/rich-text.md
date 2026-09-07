# UiRichText

**Selector:** `ui-rich-text`

**Import**

```ts
import { UiRichText } from 'ai-dls-kit';
```

## Description

Rich-text editor — bordered toolbar + textarea used by inbox replies,
remarks fields and the Ops Risk action modals. Toolbar buttons are
decorative in the prototype (parity with the React reference).

  <ui-rich-text [(value)]="remarks" placeholder="Add your remarks here..." />

`invalid` + `errorMessage` — the canonical error-state contract shared by
every kit form control (see ui-text-input for the full docstring). This
is a bordered composite (toolbar + textarea), so the border/fill lands
on the outer `.shell` wrapper rather than on the toolbar buttons — the
toolbar keeps its normal chrome. The two inputs stay independent, same
as everywhere else.

── The toolbar (KIT-FIXES B2, 7 Sep 2026) ──────────────────────────────
Fourteen tools, each a `button[ui-icon-button size="tiny"]` (24px box)
holding a 16px glyph — the owner's ruling of 7 Sep settled the scale at
16 (the previous glyphs were hand-drawn at 14). Twelve of the fourteen
draw a real DLS mark through `ui-icon`: `arrow-undo`, `arrow-undo`
mirrored for Redo (ruling R9 — the DLS ships no redo symbol, and
mirroring the official mark is honest where drawing a second arrow is
not), `color-palette`, `align-left` / `-center` / `-right` / `-justify`,
`bold`, `italic`, `list`, `paperclip`, `image`.

TWO remain inline `<svg>` in the template: the FONT/type control and
UNDERLINE. Neither symbol is in the catalogue — both are likely among the
71 DLS symbols still unfetched — and the registry's `text-style` entry is
NOT the font mark: it is this component's own former drawing, harvested
out of this file, so naming it would launder a stand-in as DLS artwork.
Both stand-ins are redrawn on the 16 grid at stroke-width 1 to sit at the
same weight as the twelve real glyphs; each carries a template comment
naming what it waits for. Swapping them is a two-line template change.

The buttons stay DECORATIVE — the editing surface is a plain `<textarea>`,
which cannot carry formatting — so the eight toggle-shaped tools (the
four aligns, bold, italic, underline, list) declare a STATIC
`aria-pressed="false"`. That announces them correctly as toggle buttons
and is true of the document as it stands; it is deliberately not bound to
a signal, because a Bold button that lights up while the text does not go
bold is a worse lie than a toolbar that plainly does nothing. The six
action-shaped tools (undo, redo, font, colour, attach, image) carry no
`aria-pressed`. Hover / pressed / focus / disabled visuals all come from
`ui-icon-button`; this component hand-rolls none of them.

The old `title` attributes are gone in favour of real `aria-label`s. That
loses the native hover tooltip; `[uiTooltip]` was not substituted, since
the DLS tooltip is a titled multi-line panel, not a one-word hover label.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `placeholder` | `(inferred)` | `''` |
| `minHeight` | `(inferred)` | `108` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `(inferred)` | `''` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<section id="ui-rich-text">
    <h2>ui-rich-text</h2>
    <div class="demos">
      <ui-rich-text [(value)]="remarks" placeholder="Add your remarks here..." />
      <h3>Error state (invalid/errorMessage) — the two inputs are independent</h3>
      <div class="row wrap">
        <div class="w400">
          <ui-rich-text
            [(value)]="errorRemarks"
            placeholder="Add your remarks here..."
            [invalid]="true"
            errorMessage="Remarks are required"
          />
        </div>
        <div class="w400">
          <ui-rich-text placeholder="Add your remarks here..." [invalid]="true" />
        </div>
      </div>
      <p class="hint">Left: invalid with a message. Right: invalid with no message of its own.</p>
    </div>
  </section>
```


## Provenance

_Not recorded._
