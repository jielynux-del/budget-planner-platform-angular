# UiInfoBanner

**Selector:** `ui-info-banner`

**Import**

```ts
import { UiInfoBanner } from 'ai-dls-kit';
```

## Description

Information banner — the DLS 3.1 `info-banner` component (page
305:2707, set 12044:100307, REGISTER.md §20, audited
2 Sep 2026). Grown additively from the Phase-1 single-tone banner: a
full-width elevated card with a 4px accent bar down its left edge, a
24px FILLED status icon, optional title, an optional actions row and an
optional dismiss — now four tones instead of one.

  <ui-info-banner message="Filling out the Special Request Details section
is enough to save this form for later.
To submit to the desk lead, all sections must be completed." />

  <ui-info-banner tone="warning" title="Review before submitting"
    message="3 fields could not be validated automatically.">
    <button ui-info-banner-actions ui-button variant="secondary" size="tiny">Review</button>
    <button ui-info-banner-actions ui-button variant="plain" size="tiny">Dismiss</button>
  </ui-info-banner>

`message` is a plain string; lines separated by `\n` render as separate
paragraphs.

Omit `message` to project arbitrary markup into the same slot instead:

  <ui-info-banner [dismissible]="false">
    <p class="title">Portfolio Opted Out</p>
    <ol>…</ol>
  </ui-info-banner>

Projected default-slot nodes are styled by the HOST's own stylesheet,
not this one (same precedent as before this round).

**`tone`** — `info` | `warning` | `success` | `error`. Drives the left bar, the
status icon and its fill: info `--color-info-bar` #8657ff
(circle-information-filled), warning `--color-warning-strong` #eb9600
(triangle-exclamation-filled), success `--color-success-strong`
#00ab61 (circle-check-filled), error `--color-danger` #ff4724
(triangle-exclamation-filled — the same glyph as warning, DLS reuses
it for both, only the fill differs). The warning/error triangle is the
exact path `ui-alert` already draws (alert.ts) — one hand-authored
evenodd path, not redrawn here.

**`title`** — optional. `type.heading(2xs)` — 14px/600/1.4,
`--color-text-strong` — the platform's compactness-override title size
(DLS's own node reads heading/2xs at 16px; every other kit title
already stands on the 14px override — see `ui-alert`, `ui-card`), 4px
above the description.

**`[ui-info-banner-actions]`** — a projected actions row below the
title/message block, 8px gap between items, 8px of space above the row
itself (register §20: "optional actions row 8px below"). Rendered as
an always-present
flex row rather than gated behind a content-query round trip — an
empty row costs nothing (`:empty { display: none }` collapses it to
zero height and no gap contribution in info-banner.scss, the same
"always render, let CSS no-op it" precedent `ui-alert`'s `.actions`
div documents).

Dismissal is component-owned: clicking the dismiss button hides the
banner (no `hidden`/`visible` input to manage from the host) and emits
`closed` so a host that wants to react (e.g. clear related form state)
still can. The dismiss control is now a real `ui-icon-button` (`size=
"tiny"`, a 24×24 box with a 16px glyph) instead of the old hand-rolled
close button — same close glyph, now sized and coloured by the kit
icon-button component rather than a local `.close` rule. The `.close`
CLASS name is kept as an additional static class on that button (not a
new API surface) so f6d's existing `.close` locator — asserting the
dismiss control is ABSENT when `dismissible=false` — keeps working
unchanged.

This closes §2 Alert's "tones deferred to item 20" note: `ui-alert`
stays danger-only by design, and the info/warning/success tone axis
DLS puts on the same Figma set as its danger cell lives here instead.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `message` | `(inferred)` | `''` |
| `dismissible` | `(inferred)` | `true` |
| `tone` | `UiInfoBannerTone` | `'info'` |
| `title` | `string` | — |

**Outputs**

| Name | Type |
| --- | --- |
| `closed` | `void` |

## Types

```ts
export type UiInfoBannerTone = 'info' | 'warning' | 'success' | 'error';
```

## Slots

- Default (unnamed) content projection
- `select="[ui-info-banner-actions]"`


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §20 (optional background — no Figma access required to use this component)
