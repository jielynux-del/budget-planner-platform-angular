# UiCurrencyPair

**Selector:** `ui-currency-pair`

**Import**

```ts
import { UiCurrencyPair } from 'ai-dls-kit';
```

## Description

Currency pair — the DLS 3.1 `currency-pair` component (page 2062:0, set
`currency-pair` 2062:535, REGISTER.md §13, audited
2 Sep 2026; the `md` size also appears at 94684:309653, `xs` at
2099:8991). A right-aligned inline row — currency code + amount, an
optional sign glyph — for archive rows and summary tiles:

  <ui-currency-pair currency="SGD" amount="14,000.00" />
  <ui-currency-pair currency="SGD" amount="14,000.00" sign="positive" size="xl" />
  <ui-currency-pair currency="SGD" amount="14,000.00" sign="negative" size="sm" />
  <ui-currency-pair masked size="md" />

In tables, place it inside a `td.ui-cell-currency` — see components/table.md's example. It also works standalone in summary tiles and archive rows where currency and amount travel together.

`amount` is a plain string, pre-formatted by the caller ("14,000.00")
— this component does no number formatting, matching how `ui-badge`
takes its `label` pre-stringified for the truncated ("99+") case.

**Sign.** `none` (default) | `positive` | `negative` — renders a "+" or
"-" glyph as its OWN span, styled identically to the amount (DLS's own
choice; not a plain hyphen-minus swapped for a true minus sign U+2212 —
the Figma node ships the ASCII hyphen). `masked` (boolean) renders
"••••••" in the amount's style with NO currency code and no sign glyph
at all — DLS's own masked-value pattern, used wherever a portfolio
amount must be hideable.

**Size → kit type roles.** DLS pairs a currency-code role with an
amount role per size step. The CURRENCY code renders `body(md)` —
14px/400 — at every size: DLS's own register text calls for "body-md
16" at xl/lg and "body-sm 14" at md/sm/xs, but this kit's `body` role
only has two rungs (`sm` 13px, `md` 14px — `_type.scss`) and 14px is
the number every one of DLS's five cells resolves to once mapped onto
the nearer kit rung (16 has no kit equivalent and borrows down to 14;
14 already lands on `body(md)` exactly) — so one mixin, `body(md)`,
correctly serves the whole size axis rather than swapping roles
per-size for a distinction the kit's two-rung scale can't actually
draw.

The AMOUNT scales with `size`, and `xl`/`lg`/`md` need the avatar.scss
"borrow the size half" trick: the `heading` role's SIZE tokens, with
everything else — family, weight, line-height, letter-spacing — held
on `body`'s bold cell (`body-bold`, weight 600), since there is no
`heading` role at weight 600/leading 1.5 to reach for directly. `sm`/
`xs` need no borrowing — both land on a real `body(…, $bold: true)`
cell:

| size | currency (kit)         | amount (kit)                                    |
|------|-------------------------|--------------------------------------------------|
| xl   | `body(md)` — 14px/400   | size `--font-size-heading-lg` (28px), borrowed, 600 |
| lg   | `body(md)` — 14px/400   | size `--font-size-heading-md` (24px), borrowed, 600 |
| md   | `body(md)` — 14px/400   | size `--font-size-heading-sm` (20px), borrowed, 600 |
| sm   | `body(md)` — 14px/400   | `body(md, $bold: true)` — 14px/600, real          |
| xs   | `body(md)` — 14px/400   | `body(sm, $bold: true)` — 13px/600, real          |

DLS's own register text cites its source pixel values before the
compactness overrides landed (e.g. "heading-xs 20" where this kit's
`heading-xs` is actually 16px and `heading-sm` is the token that reads
20) — the table above is what actually renders, resolved against
`tokens/_type.scss`'s real `--font-size-*` values, not DLS's
raw node text.

Currency colour is always `--color-text-subtle`; amount and sign are
always `--color-text-strong`, weight 600 (`body-bold`) regardless of
size.

**Layout** — `align-items: baseline` (not `center`) so the amount's
larger cap-height sits on the same text baseline as the currency code,
`justify-content: flex-end` (DLS right-aligns this component wherever
it appears), 4px gap, `white-space: nowrap` (the row never wraps).

Host classes: `ui-currency-pair ui-currency-pair--{size}`, plus
`--positive` / `--negative` (sign() !== 'none') and `--masked`.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `currency` | `(inferred)` | `''` |
| `amount` | `(inferred)` | `''` |
| `sign` | `UiCurrencyPairSign` | `'none'` |
| `size` | `UiCurrencyPairSize` | `'md'` |
| `masked` | `(inferred)` | `false` |

## Types

```ts
export type UiCurrencyPairSign = 'none' | 'positive' | 'negative';
```

```ts
export type UiCurrencyPairSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <h3>Size — <code>xl</code> through <code>xs</code></h3>
      <div class="row cp-sizes-row">
        <ui-currency-pair currency="SGD" amount="14,000.00" size="xl" />
        <ui-currency-pair currency="SGD" amount="14,000.00" size="lg" />
        <ui-currency-pair currency="SGD" amount="14,000.00" size="md" />
        <ui-currency-pair currency="SGD" amount="14,000.00" size="sm" />
        <ui-currency-pair currency="SGD" amount="14,000.00" size="xs" />
      </div>

      <h3><code>md</code> — positive, negative and masked</h3>
      <div class="row cp-values-row">
        <ui-currency-pair currency="SGD" amount="14,000.00" sign="positive" size="md" />
        <ui-currency-pair currency="SGD" amount="14,000.00" sign="negative" size="md" />
        <ui-currency-pair [masked]="true" size="md" />
      </div>
      <p class="hint">
        The sign glyph shares the amount's exact style. <code>masked</code> drops the currency
        code entirely — "••••••" is the whole row.
      </p>
    </div>
  </section>
```


## Provenance

REGISTER.md §13 (optional background — no Figma access required to use this component)
