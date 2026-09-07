# UiSnackbar

**Selector:** `ui-snackbar`

**Import**

```ts
import { UiSnackbar } from 'ai-dls-kit';
```

## Description

Snackbar toast — the DLS 3.1 `snackbar` component (page 305:2717, set
486:2468, REGISTER.md §37, audited + grown 3 Sep 2026).
Anchored bottom-centre of its positioned ancestor, now with an optional status icon, an
optional action button and a kit close control:

  <ui-snackbar message="Document saved" (dismissed)="saved.set(false)" />

  <ui-snackbar tone="warning" message="3 fields could not be validated."
    actionLabel="Review" (action)="review()" (dismissed)="warn.set(false)" />

**`tone`** — `neutral` (default, no icon, byte-identical to the old
message-only face) | `success` | `warning` | `danger` | `info`. Each
non-neutral tone renders a 24px FILLED status glyph in a 32px-min wrap:
warning = triangle-exclamation-filled `--color-warning-strong`, success =
circle-checkmark-filled `--color-success-strong`, danger =
circle-exclamation-filled `--color-danger`, info = info-circle
`--color-info-bar`. TOKEN NOTE: DLS's spec calls for "on-dim" status
tones against the dark panel, but the kit has no dedicated on-dim status
ladder (checked tokens.css — only the plain `--color-*-strong` /
`--color-danger` / `--color-info-bar` tones exist, the same ones
`ui-info-banner` §20 already draws on a LIGHT panel). Reused as-is: all
four are saturated fills that read fine against `--color-bg-dim`, and
this round may not touch tokens.css to mint on-dim variants.

**`actionLabel`** — optional. Renders a Small `ui-button variant="primary"`
(DLS's product_alt action button; `--color-primary` is the kit's
standing white-label seam for that role) 12px after the message; a click
emits `action`. Omit it and no button renders.

**`dismissible`** — default `true`. Renders a close control: a tiny
`ui-icon-button` (`tone="on-dim"`) carrying a 16px `close_16` glyph, in
its own 32px-min wrap so it lines up with the icon/message row rhythm
even though the icon-button's own Tiny box is 24px. Set `false` to hide
it entirely (a snackbar with no `action` and no close is decorative —
the host is responsible for timing its own dismissal via `dismissed`
never firing from the UI in that case).

**Auto-dismiss** — none exists today (checked snackbar.ts before this
round: no timer, no `duration` input) and none is added here; every
caller dismisses explicitly (a revoke/save confirmation, a manual close
click). Not part of this round's brief beyond "keep what exists."

`role="status"` + implicit `aria-live="polite"` (a `status` role's
default) is kept from the pre-round component, unchanged.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `message` (required) | `string` | — |
| `tone` | `UiSnackbarTone` | `'neutral'` |
| `actionLabel` | `string` | — |
| `dismissible` | `(inferred)` | `true, { transform: booleanAttribute }` |

**Outputs**

| Name | Type |
| --- | --- |
| `action` | `void` |
| `dismissed` | `void` |

## Types

```ts
export type UiSnackbarTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
}

@if (showSnackbar()) {
  <ui-snackbar message="Document saved as draft" (dismissed)="showSnackbar.set(false)" />
}
@if (showSnackbarWarning()) {
  <ui-snackbar
    class="demo-snackbar-warning"
    tone="warning"
    message="3 fields in 田中さんの申請 could not be validated automatically."
    actionLabel="Review"
    (action)="snackbarLastEvent.set('warning action')"
    (dismissed)="showSnackbarWarning.set(false)"
  />
}
@if (showSnackbarSuccess()) {
  <ui-snackbar
    class="demo-snackbar-success"
    tone="success"
    message="佐藤さんの依頼を承認しました。"
    (dismissed)="showSnackbarSuccess.set(false)"
  />
}
@if (showSnackbarDanger()) {
  <ui-snackbar
    class="demo-snackbar-danger"
    tone="danger"
    message="鈴木さんの申請を送信できませんでした。"
    actionLabel="Retry"
    (action)="snackbarLastEvent.set('danger action')"
    (dismissed)="showSnackbarDanger.set(false)"
  />
}
@if (showSnackbarLong()) {
  <ui-snackbar
    class="demo-snackbar-long"
    tone="info"
    message="高橋さんが提出した特別申請には複数の承認者が必要です。デスクヘッドとリスク管理チームの両方が確認を完了するまで、このリクエストは保留のままとなります。"
    (dismissed)="showSnackbarLong.set(false)"
  />
```


## Provenance

REGISTER.md §37 (optional background — no Figma access required to use this component)
