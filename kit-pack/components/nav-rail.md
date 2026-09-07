# UiNavRail

**Selector:** `ui-nav-rail, nav[ui-nav-rail]`

**Import**

```ts
import { UiNavRail } from 'ai-dls-kit';
```

## Description

DLS `nav-side-primary` (set 192450:1049, REGISTER.md §29,
audited 3 Sep 2026) — the dark left rail's OUTER FRAME: the 900-tall
column, its three width states, and the header/body/footer slots. The
anatomy INSIDE those slots — items, sections, rules — is
`ui-nav-rail-item` / `ui-nav-rail-section` / `ui-nav-rail-rule`
(siblings in this directory); this component owns only the shell.

  <ui-nav-rail [expanded]="expanded()">
    <div uiNavRailHeader>…mark [+ wordmark]…</div>
    <ui-nav-rail-item …></ui-nav-rail-item>
    …
    <div uiNavRailFooter>…footer items…</div>
  </ui-nav-rail>

Three width states, all driven off two boolean inputs (not an enum —
`withLabels` is an ADDITIVE compact type in the DLS set, not a third
point on the same axis as `expanded`, so the two are independent flags
exactly as the Figma component's own two axes are):
- default (`expanded=false`, `withLabels=false`): **72px**, icon-only.
- `expanded=true`: **240px**, icon + label rows, `Section` rows visible.
- `withLabels=true`: **88px**, the "With labels" compact type — 64-tall
  `ui-nav-rail-item[kind=compact]` rows, icon + label stacked. Takes
  priority over `expanded` in the stylesheet (nav-rail.scss) since the
  two are not meant to combine in the Figma set.

Body scrolls independently of the fixed header/footer (`flex: 1`,
`overflow-y: auto`) — same shape as `ui-nav-panel`'s body.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `expanded` | `(inferred)` | `false` |
| `withLabels` | `(inferred)` | `false` |

## Slots

- Default (unnamed) content projection
- `select="[uiNavRailHeader]"`
- `select="[uiNavRailFooter]"`


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §29 (optional background — no Figma access required to use this component)
