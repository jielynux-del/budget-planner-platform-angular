# UiSkeletonBar

**Selector:** `ui-skeleton-bar`

**Import**

```ts
import { UiSkeletonBar } from 'ai-dls-kit';
```

## Description

Bare skeleton bar — the shimmer primitive `ui-skeleton` composes into its
header/body anatomy below. Exposed standalone so a caller can build a
custom skeleton shape DLS's three fixed `ui-skeleton` types don't cover
(REGISTER.md §27):

  <ui-skeleton-bar width="60%" height="16px" />
  <ui-skeleton-bar width="120px" />   <!-- height defaults to 24 -->

Same gradient as every bar inside `ui-skeleton`: a left→right sweep,
`--color-bg-alt` → `--color-bg-pressed` → `--color-bg-alt`, animated via
`background-position` (reduced-motion aware — frozen, not hidden, under
`prefers-reduced-motion: reduce`).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `width` | `(inferred)` | `'100%'` |
| `height` | `(inferred)` | `'24px'` |

## Slots

_No content projection slots._


## Example

_No live demo found in the kitchen sink for this selector._


## Provenance

REGISTER.md §27 (optional background — no Figma access required to use this component)
