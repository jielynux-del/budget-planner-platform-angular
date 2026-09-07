# UiPagination

**Selector:** `ui-pagination`

**Import**

```ts
import { UiPagination } from 'ai-dls-kit';
```

## Description

Pagination — the DLS 3.1 `pagination` set (page 467:1105, set 1466:3602,
REGISTER.md §30, audited/built 3 Sep 2026). A level_2 footer
strip, 24px h / 12px v padding, bottom radius 4 — the top rule the
previous version drew is GONE.

  <ui-pagination [total]="rows.length" [(page)]="page" [(pageSize)]="pageSize" />
  <ui-pagination type="basic" [total]="rows.length" [(page)]="page" />
  <ui-pagination type="lazy" [loading]="isLoadingMore()" />

**`type`** — DLS's Type axis: `basic` | `complex` | `lazy`.

**`basic`**: left counter ("Showing 1-10 of 64 items", label/sm strong)
+ right two Small secondary `ui-button`s "Previous" / "Next" (32px, 8
gap), disabled at the ends.

**`complex`**: left counter + "Items per page" (label/sm subtle) + the
existing 72px `ui-select`; right a button group of four Small bordered
`ui-icon-button`s (32px, `outline`, 24px hand-authored chevron glyphs —
DLS names them chevron-left-last / chevron-left / chevron-right /
chevron-right-last, no glyph exists in this kit's icon set yet, reported
in the round notes) around a 64px page-jump INPUT (`ui-text-input`-
styled), then "Page 1 of 7" (label/sm subtle). The page input tracks the
caller's `page` while unfocused; typing a number and pressing Enter or
blurring jumps to that page, CLAMPED 1..pages — an out-of-range or
non-numeric value simply reverts to the current page rather than
committing (`commitPage()` below).

**`lazy`**: a 16px partial loader + "Loading more..." (label/sm subtle),
shown only while `loading` is true. DLS's `loader-partial` (see
`ui-loader`) draws its three dots at a fixed 8px — it has no `size`
input to shrink to DLS's 16px lazy-pagination reading here, so this
state hand-draws its own three 4px dots locally rather than reaching for
`ui-loader` (reported: `ui-loader` needs a `size` axis in a future
round). A `loadMore` output is NOT wired — an intersection-observer
"scroll into view" trigger is not a trivial addition to a presentational
component with no host viewport awareness, so it is omitted per the
brief rather than half-built; the caller drives `loading` itself.

Default `type` is `complex` (per-page select, four icon buttons, page-jump input). For a simple footer use `type="basic"` (Previous / Next + count).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `type` | `UiPaginationType` | `'complex'` |
| `total` | `(inferred)` | `0` |
| `sizes` | `number[]` | `[10, 25, 50]` |
| `loading` | `(inferred)` | `false` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `page` | `(inferred)` | `1` |
| `pageSize` | `(inferred)` | `10` |

## Types

```ts
export type UiPaginationType = 'basic' | 'complex' | 'lazy';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <p class="hint">Complex (default) — counter, per-page select, icon-button nav, page-jump input.</p>
      <div class="pagination-demo">
        <ui-pagination [total]="42" [(page)]="page" [(pageSize)]="pageSize" />
      </div>
      <p class="hint">Basic — counter + Previous/Next.</p>
      <div class="pagination-demo">
        <ui-pagination type="basic" [total]="42" [(page)]="basicPage" />
      </div>
      <p class="hint">Lazy loading — partial loader + label, gated on <code>loading</code>.</p>
      <div class="pagination-demo">
        <ui-pagination type="lazy" [loading]="lazyLoading()" />
      </div>
      <p class="row">
        <button ui-button variant="secondary" size="small" type="button" (click)="lazyLoading.set(!lazyLoading())">
          Toggle loading
        </button>
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
