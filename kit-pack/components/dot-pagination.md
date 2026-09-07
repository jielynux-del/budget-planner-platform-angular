# UiDotPagination

**Selector:** `ui-dot-pagination`

**Import**

```ts
import { UiDotPagination } from 'ai-dls-kit';
```

## Description

Dot pagination — the DLS 3.1 `dot-pagination` component (Figma
91374:316329, REGISTER.md §30, audited/built 3 Sep 2026):
3–8 8px dots, 8px gap, Active / Inactive. Carousel indicator — no call
site in this app today (archive candidate per the owner's round ruling),
demoed in the kitchen sink only.

  <ui-dot-pagination [count]="5" [(index)]="slide" />

Active dot fills `--color-primary` (DLS uses the product colour, same
as every other product-tinted control in this kit). Inactive: DLS
specs `--color-bg-neutral` (#dde3e7) — this kit's token ladder has no
`--color-bg-neutral` name (grepped tokens.css before writing this); the
nearest EXISTING token at the same hex is `--color-bg-pressed`
(#dde3e7), used here rather than inventing a new alias — reported in
the round notes.

Each dot is a real `<button>` with its own `aria-label` ("Go to slide
N") — a REAL click selects it (`index.set(i)`), not a decorative div.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `count` | `(inferred)` | `3` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `index` | `(inferred)` | `0` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</p>
      <p class="hint">ui-dot-pagination — carousel indicator.</p>
      <div class="pagination-demo">
        <ui-dot-pagination [count]="5" [(index)]="dotIndex" />
      </div>
    </div>
  </section>
```


## Provenance

REGISTER.md §30 (optional background — no Figma access required to use this component)
