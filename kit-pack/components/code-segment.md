# UiCodeSegment

**Selector:** `ui-code-segment`

**Import**

```ts
import { UiCodeSegment } from 'ai-dls-kit';
```

## Description

Shared leading "code" segment (Figma 414:2914) — the compact code+chevron
trigger DLS reuses verbatim between the Phone field (76086:347688) and the
Currency field (76086:347728): 12px h-pad, 8 gap, kit `body(sm)` 13
`--color-text-strong` tabular-nums value + a 16px chevron-down_16. A real
click opens a `ui-dropdown-menu` listbox of `button[ui-dropdown-item]`
rows (register §16) — the same open-signal + `document:click` pattern
`ui-kebab-menu` uses, not a native `<select>`, so it can draw the DLS
popover chrome.

  <ui-code-segment [options]="['+65','+60','+62']" [(value)]="dialCode" />
  <ui-code-segment [options]="currencies()" [(value)]="currency" [disabled]="disabled()" />

Extracted here (REGISTER.md §21/§23, audited 3 Sep 2026,
round §21–§24) rather than duplicated in `ui-phone-input` and
`ui-amount-input` — both fields draw the identical segment, so one
implementation is the single source of the popover behaviour.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `options` (required) | `string[]` | — |
| `disabled` | `(inferred)` | `false` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `string | null` | `null` |

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §21 (optional background — no Figma access required to use this component)
