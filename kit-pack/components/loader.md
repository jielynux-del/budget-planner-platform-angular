# UiLoader

**Selector:** `ui-loader`

**Import**

```ts
import { UiLoader } from 'ai-dls-kit';
```

## Description

Loader — the DLS 3.1 `loader` component (page 10392:69046,
REGISTER.md §27, audited 3 Sep 2026). DLS ships FOUR sets
(`loader-clover`, `loader-key`, `loader-partial`, `loader-skeleton`); the
two brand-mark tiles are DBS assets and not ours to replicate (the
skeleton set is `ui-skeleton`, next door). This component covers the
other two:

  <ui-loader />                                    <!-- partial dots -->
  <ui-loader label="Loading transactions" />
  <ui-loader kind="spinner" />                      <!-- 48px tile -->
  <ui-loader kind="spinner" [background]="false" /> <!-- bare mark -->
  <ui-loader invert />                              <!-- on a dark/dim surface -->

**`partial`** (default, DLS `loader-partial` 96939:279615): three 8px
circles, 8px gap, `--color-icon` fill at opacity 1 / .6 / .2 — the SAME
three values `ui-button`'s `[loading]` state already draws (button.scss),
kept identical here so a standalone loader and an in-button one read as
the same object. Unlike the button's dots (which stay static — the
button's own Pressed fill already reads as "busy"), a free-standing
loader gets DLS's gentle opacity cycle: each dot cross-fades through the
same three steps on a staggered delay, off by default under
`prefers-reduced-motion: reduce` (wrapped in the `no-preference` query,
same pattern tokens.css's own tactile-press rule uses) — the STATIC
opacities are the base CSS regardless of motion setting, so a
reduced-motion viewer still sees the three-step read, just without the
cross-fade.

**`spinner`** (DLS `loader-clover`/`loader-key`, 14413:137934 /
151423:3541): a 48px tile (radius 8, DLS bg `level_3`; this kit's token
ladder stops at `--color-bg-level2` — both resolve to white today, so
`--color-bg-level2` is the nearest existing step, reported here rather
than adding a `level_3` token for a same-value alias) holding a 32px
animated mark, `--shadow-elevation-3`. `[background]="false"` drops the
tile (DLS's Background=No), leaving just the 32px mark. The DBS clover
/ key glyphs are brand assets this kit does not carry — `[uiLoaderMark]`
is the projection seam for a caller's own mark; the DEFAULT (unprojected)
mark is a neutral white-label spinner: a 32px ring, `--color-primary`
stroke, rotating — off under reduced motion (frozen at its rest frame,
same query pattern as the dots).

**Label** (both kinds) — optional, 4px under the dots/tile, kit
`body(sm)` (13px — DLS prints this role at 14; the platform's standing
compactness override, same call as `ui-button` and `ui-empty-state`,
keeps it at 13), `--color-text-subtle`.

**`invert`** — for a loader sitting on a dim/dark surface (the Primary
Nav, a dark card). DLS's own Invert reading uses `icon-inverse`; this
kit has no dedicated inverse ICON token (`--color-icon-inverse` does not
exist in tokens.css — grepped before writing this), so the dots fall
back to `--color-text-on-dim` (#ffffff, the kit's existing "text on a
dim/inverse surface" token) as the nearest on-hand substitute — reported
here rather than silently reaching for an unrelated token. The label DOES
have an exact match: `--color-text-on-dim-subtle` (#9ba4ab), DLS's real
"subtle text on dim" role.

`role="status"` / `aria-live="polite"` on the host; `aria-label` is the
`label` input when set, else "Loading" — both dot/tile markup is
`aria-hidden` so the label (visible or the fallback) is what a screen
reader announces once, not per-frame.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `kind` | `UiLoaderKind` | `'partial'` |
| `label` | `string` | — |
| `invert` | `(inferred)` | `false` |
| `background` | `(inferred)` | `true` |

## Types

```ts
export type UiLoaderKind = 'partial' | 'spinner';
```

## Slots

- `select="[uiLoaderMark]"`


## Example

From the kit's kitchen sink:

```html
</div>
    <div class="demos">
      <div class="row wrap">
        <div class="card-frame"><ui-loader /></div>
        <div class="card-frame"><ui-loader label="Loading transactions" /></div>
        <div class="card-frame ui-loader-spinner-tile"><ui-loader kind="spinner" /></div>
        <div class="card-frame"><ui-loader kind="spinner" label="Loading" /></div>
        <div class="card-frame ui-loader-spinner-no-bg"><ui-loader kind="spinner" [background]="false" /></div>
      </div>
      <div class="row wrap ui-loader-invert-row">
        <div class="card-frame ui-loader-invert-swatch">
          <ui-loader [invert]="true" label="Loading transactions" />
        </div>
        <div class="card-frame ui-loader-invert-swatch">
          <ui-loader kind="spinner" [invert]="true" label="Loading" />
        </div>
      </div>
    </div>
  </section>
```


## Provenance

REGISTER.md §27 (optional background — no Figma access required to use this component)
