# UiModal

**Selector:** `ui-modal`

**Import**

```ts
import { UiModal } from 'ai-dls-kit';
```

## Description

`ui-modal` — the DLS 3.1 `modal` component (page 305:2697, set
166757:32212, REGISTER.md §28, audited 3 Sep 2026): a
centred 600px DIALOG, distinct from `ui-modal-shell` (the full-viewport
FOCUS OVERLAY, §19). **TERMINOLOGY RULING (owner, 3 Sep 2026): "modal" =
this component, "focus overlay" = the shell — never conflate them.**
Neither component reads the other; this one is new, not grown onto the
shell, because their anatomy (backdrop-centred dialog vs full-viewport
panel-with-1200px-column) diverges too far to share a template.

  @if (confirmOpen()) {
    <ui-modal title="Revoke access?" (dismissed)="confirmOpen.set(false)">
      <p>Aiko Mori loses desk access immediately.</p>
      <ui-checkbox uiModalFooterStart [(checked)]="ack">I understand</ui-checkbox>
      <button uiModalActions ui-button variant="secondary" size="small" (click)="confirmOpen.set(false)">Cancel</button>
      <button uiModalActions ui-button variant="primary" tone="destructive" size="small" (click)="revoke()">Revoke</button>
    </ui-modal>
  }

(The checkbox/action markup above is illustrative placement, not a real
projection order requirement — `uiModalFooterStart`/`uiModalActions` are
attribute selectors, so the two can sit anywhere in the light DOM.)

**Panel** (166757:32212) — `--color-bg-level2`, `--radius-md` (8),
`--shadow-elevation-5` (added to tokens.css this round, next to
elevation-4 — 0 0 1px .25 + 0 12px 24px .2), overflow clip, `width()`
(default 600, DLS's Desktop breakpoint) with a 328px floor (DLS's
Mobile breakpoint) as `min-width` rather than a second layout, since the
kit has no separate mobile shell for this component yet. `max-height`
caps the whole panel at 80vh so a tall body scrolls internally instead
of pushing the footer off-screen.

**Header** (166757:32228) — 24h/16v padding, 1px
`--color-border-decorative` bottom rule, 12px gap: optional 24px status
icon in a 32px-min `[uiModalIcon]` wrapper (`hasIcon` gates the slot,
same explicit-flag pattern `ui-modal-shell` uses for its own icon disc —
Angular content queries cannot see inside an attribute-selector slot
from the outside, so auto-detecting "is anything projected" isn't
available here either), a text column (title `heading(sm)` 20/600
`--color-text-strong` on a 32px-min line; subtitle `body(md)` 14px
`--color-text-subtle`, 4px under), then `closable`'s 32px small
`ui-icon-button` close with a −4px optical right margin (same trim
`ui-modal-shell`'s `.ms-actions` already carries).

**Body** (166757:32222) — 24/24 padding, 16px column gap (no DLS 16
gap step exists — same as `ui-modal-shell`'s content column, stays
raw), projected `<ng-content>`. `description` renders DLS's
"Description Only" slot (`body(md)` 14px `--color-text`) ahead of any
projected content, so a caller can combine a lead line with a custom
body rather than choosing one or the other.

**Footer** (166757:32257) — 1px top rule, 24h/16v padding;
`<ng-content select="[uiModalFooterStart]">` and `<ng-content select="[uiModalActions]">`. `footer` picks the DLS Footer Type:
`default` (checkbox flex-1 left + button group right, one row),
`overflow` (checkbox row stacked over a right-aligned button row) or
`stacked` (full-width buttons, DLS's mobile-only type). The footer
collapses to nothing when NEITHER slot has projected content — the
`:has(> .mf-start:empty):has(> .mf-actions:empty)` rule in modal.scss,
the same always-render-let-CSS-collapse trick `ui-drawer`'s
`.drawer-footer:empty` uses, extended with `:has()` because this footer
has two independent slots instead of one.

**Dismissal** — Escape (document-level listener, same non-focus-owning
pattern `ui-modal-shell`/`ui-drawer` use) and a backdrop mousedown both
close when `closable()`; `closable` ALSO gates whether the close button
renders at all.
`dismissed` fires on every close path;
`open` is a `model()` so `[(open)]` mirrors it without a separate
boolean flag at the call site, and is also written directly so a
`(dismissed)`-only caller (the common case) doesn't have to.

**Focus** — opening captures `document.activeElement` and moves focus
into the panel (its own `tabindex="-1"` root, since the DLS anatomy has
no single obvious default control); closing returns it to whatever had
focus before, so a "Revoke access" button reclaims focus after its own
confirm dialog closes rather than dropping focus to `<body>`. A
document-level Tab listener loops focus inside the panel while open —
neither `ui-modal-shell` nor `ui-drawer` had a reusable trap to import
(§19/§15 don't implement one; see their source), so this is a fresh,
minimal implementation rather than a port.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` (required) | `string` | — |
| `subtitle` | `string` | — |
| `hasIcon` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `description` | `string` | — |
| `width` | `(inferred)` | `600` |
| `footer` | `UiModalFooterLayout` | `'default'` |
| `closable` | `(inferred)` | `true, { transform: booleanAttribute }` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `open` | `(inferred)` | `false` |

**Outputs**

| Name | Type |
| --- | --- |
| `dismissed` | `void` |

## Types

```ts
export type UiModalFooterLayout = 'default' | 'overflow' | 'stacked';
```

## Slots

- Default (unnamed) content projection
- `select="[uiModalIcon]"`
- `select="[uiModalFooterStart]"`
- `select="[uiModalActions]"`


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §28 (optional background — no Figma access required to use this component)
