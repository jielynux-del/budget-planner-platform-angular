# UiContentSeparator

**Selector:** `ui-content-separator`

**Import**

```ts
import { UiContentSeparator } from 'ai-dls-kit';
```

## Description

DLS `accordion-separator` ("ContentSeparator", Figma node 1959:7) —
REGISTER.md §1 gap (a). A disclosure with NO box chrome: a
background-alt header BAR (no border, 4px radius) sitting directly above
free content, versus `ui-accordion`'s bordered card. The two are siblings,
not one component with a variant — a box vs no-box axis on `ui-accordion`
would mean every consumer re-checking a `boxed` input to know whether a
border/shadow/background is about to appear around their content, and the
DLS file itself ships these as two separate component sets for the same
reason.

  <ui-content-separator title="Trade History">
    …free content, no wrapper chrome…
  </ui-content-separator>

  <ui-content-separator
    title="Amendments"
    subtitle="Last edited 2 Sep"
    actionLabel="Edit"
    (actionActivated)="onEdit()"
  >…</ui-content-separator>

`actionLabel` renders a plain 24px-tall text action (label/sm) left of the
chevron — clicking it emits `actionActivated` and does NOT toggle the
disclosure (its own click handler stops propagation before the bar's
click handler ever sees it).

The open/close mechanics (grid-rows track animation, `expandable`
dead-header rule, keyboard Enter/Space, focus-visible ring) are the SAME
recipe as `ui-accordion` (accordion.ts / accordion.scss) — copied rather
than shared by import, since the two components' DOM shapes differ (a
box with a bordered header vs a bare bar over free content) and importing
across them would couple two DLS component sets that are independent in
the source library.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` (required) | `string` | — |
| `subtitle` | `string | null` | `null` |
| `actionLabel` | `string | null` | `null` |
| `defaultOpen` | `(inferred)` | `true` |
| `expandable` | `(inferred)` | `true` |

**Outputs**

| Name | Type |
| --- | --- |
| `actionActivated` | `void` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
</p>
    </div>
    <div class="demos">
      <ui-content-separator title="Trade History">
        <div class="accordion-demo-body">
          <p class="hint">Default open, free body content — no card, no border, just the bar.</p>
        </div>
      </ui-content-separator>
      <div class="spacer"></div>
      <ui-content-separator title="Amendments" subtitle="Last edited 2 Sep 2026">
        <div class="accordion-demo-body">
          <p class="hint">Subtitle variant — label/sm, --color-text-subtle, 4px under the title.</p>
        </div>
      </ui-content-separator>
      <div class="spacer"></div>
      <ui-content-separator
        title="Compliance Notes"
        actionLabel="Edit"
        (actionActivated)="contentSeparatorActionClicks.set(contentSeparatorActionClicks() + 1)"
      >
        <div class="accordion-demo-body">
          <p class="hint">actionLabel click fired {{ contentSeparatorActionClicks() }} time(s) — the bar stayed open, it never toggled.</p>
        </div>
      </ui-content-separator>
      <div class="spacer"></div>
      <ui-content-separator title="Collapsed by default" [defaultOpen]="false">
        <div class="accordion-demo-body">
          <p class="hint">Starts shut — same grid-rows animation as ui-accordion.</p>
        </div>
      </ui-content-separator>
    </div>
  </section>
```


## Provenance

REGISTER.md §1 (optional background — no Figma access required to use this component)
