# UiLink

**Selector:** `a[ui-link], button[ui-link]`

**Import**

```ts
import { UiLink } from 'ai-dls-kit';
```

## Description

DLS `Link` (set 51914:259512, REGISTER.md §25, audited
3 Sep 2026) — an inline text link, Variant Product | Subtle | Text | On
dim × State Default | Hover | Focus. Applied as an attribute so native
semantics stay intact, same house pattern as `ui-button`:

  <a ui-link href="/audit-log">View history</a>
  <button ui-link type="button" variant="subtle" (click)="cancel()">Cancel</button>
  <a ui-link variant="product" [external]="true" href="https://…">DBS.com</a>
  <a ui-link variant="on-dim" href="#">Help &amp; feedback</a>

**Anatomy**: inline text at the kit's `type.body('sm')` — 13px/400/1.5,
the standing "kit text sizes" ruling (DLS prints body/sm as 14; this kit's
body/sm step is 13 and link deliberately does not chase the DLS number,
same call as `ui-button`'s label(sm) doc). The underline is a SEPARATE
1px full-width rule under the text, not `text-decoration` — DLS draws it
as its own bottom stroke so it sits at a fixed offset regardless of the
font's own descenders. Implemented here as the host's `border-bottom`
(1px solid, same colour as the text) rather than a nested underline
element: a link's projected content can be arbitrary inline content
(a `<button ui-link>`'s single text node, or an `<a>`'s), and a
`border-bottom` gets the "full width of the text, redrawn instantly on
colour change" behaviour for free without adding a wrapper span around
caller content.

**Colours** (Variant → Default → Hover). DLS: Product text-product_alt
#ff3e3e → hover product_alt-hover #cf2929; Subtle text-subtle #69737b →
hover text-hover #303c44; Text text #455057 → hover #303c44; On dim
on_dim-strong white → hover on_dim-hover #c7cfd5. This kit's white-label
seam maps DLS's red product_alt onto `--color-primary` (the same seam
`ui-button`'s Primary variant uses), so:

  product → `--color-primary` → hover `--color-primary-hover` (token
    exists, on-spec — the same pair the Primary button variant uses).
  subtle  → `--color-text-subtle` → hover — **no `--color-text-hover`
    token exists in tokens.css**; falls back to `--color-text-strong`
    (a real, close, GAP — see the round's report for the exact line).
  text    → `--color-text-body` (this kit's nearest existing token to
    DLS's plain-text role #455057; there is no bare `--color-text`) →
    hover — same fallback as subtle, `--color-text-strong` (DLS itself
    gives both roles the same #303c44 hover, so one fallback token for
    both keeps that parity even though tokens.css has no exact match).
  on-dim  → `--color-text-on-dim` → hover — **no
    `--color-text-on-dim-hover` token exists** (the DLS value #c7cfd5
    is not present as any token in tokens.css, though it coincides with
    `--color-border-disabled` / `--color-icon-disabled` — a border/icon
    role, not text); falls back to `--color-text-on-dim-subtle`
    (#9ba4ab) as the nearest existing ON-DIM TEXT role token — GAP, see
    the round's report.

No token was invented and none of tokens.css was edited (owned by
another agent this round, per brief).

**Focus** (`:focus-visible`): 2px solid `--color-focus` ring, radius 4,
wrapping the text AND the underline — drawn as an outset box-shadow
(not inset, unlike `ui-button`) since a link has no fill to protect and
the ring needs to clear the underline sitting just under the text. No
colour change on focus, matching DLS. Hover and focus are independent:
hover's colour rule is written with `:not(:focus-visible)` so a
keyboard-focused, mouse-hovered link keeps its focus ring without the
hover rule fighting it for specificity.

**External**: `external` input appends the DLS "Relevant Links" pattern's
`↗` glyph after the label, as a real `aria-hidden` span
(`.ui-link-ext`) — not a pseudo-element, so it participates in normal
text flow/underline like the rest of the label.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `variant` | `UiLinkVariant` | `'product'` |
| `external` | `(inferred)` | `false` |

## Types

```ts
export type UiLinkVariant = 'product' | 'subtle' | 'text' | 'on-dim';
```

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
</div>
      <p class="hint">External links append the DLS "Relevant Links" ↗ glyph:</p>
      <div class="row link-row">
        <a ui-link variant="product" [external]="true" href="https://www.dbs.com" target="_blank" rel="noopener">田中会長の年次報告書</a>
      </div>
      <p class="hint"><code>on-dim</code> on a <code>--color-bg-dim</code> swatch, DLS's dark-rail pairing:</p>
      <div class="row link-row on-dim-row">
        <a ui-link variant="on-dim" href="#ui-link">佐藤様の承認履歴</a>
        <a ui-link variant="on-dim" [external]="true" href="https://www.dbs.com" target="_blank" rel="noopener">外部サイトへ</a>
      </div>
    </div>
  </section>
```


## Provenance

REGISTER.md §25 (optional background — no Figma access required to use this component)
