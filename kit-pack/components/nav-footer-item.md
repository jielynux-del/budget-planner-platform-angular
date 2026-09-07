# UiNavFooterItem

**Selector:** `[ui-nav-footer-item]`

**Import**

```ts
import { UiNavFooterItem } from 'ai-dls-kit';
```

## Description

Row inside a `ui-nav-panel`'s footer (Figma `nav-side-secondary/footer-item`,
192450:1064 footer region) — REGISTER.md §29. Applied as an
attribute, same convention as `[ui-nav-sub-item]`, so the consuming shell
keeps ownership of the click/nav behaviour:

  <div uiNavPanelFooter>
    <button ui-nav-footer-item label="Print" (click)="print()">
      <ui-icon uiNavFooterIcon name="…" />
    </button>
    <a ui-nav-footer-item label="Settings" [routerLink]="…" [selected]="onSettings()">
      <ui-icon uiNavFooterIcon name="…" />
    </a>
  </div>

Project into `ui-nav-panel`'s `[uiNavPanelFooter]` slot, ABOVE the panel's
own built-in "Collapse view" control — the sink demo's Print / Settings /
Collapse view triad (REGISTER.md §29) is exactly this: two
`ui-nav-footer-item` rows plus the panel's own toggle, which stays a
distinct persistent element for the reasons `nav-panel.ts`'s header
comment documents (one control that survives the expand/collapse toggle,
never two elements swapped in and out) — restyled to the identical
12px-padding / 8px-gap / 16px-icon geometry so the three rows read as
one list even though the last one is not literally this component.

12px padding all round, 8px gap, a 16px leading icon slot
(`[uiNavFooterIcon]`) and a label/sm 13/500 `--color-text-strong` — same
hover/selected wash as an item row (`--color-bg-hover` / selected
`--color-primary-subtle`).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` (required) | `string` | — |
| `selected` | `(inferred)` | `false` |

## Slots

- `select="[uiNavFooterIcon]"`


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §29 (optional background — no Figma access required to use this component)
