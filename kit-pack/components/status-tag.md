# UiStatusTag

**Selector:** `ui-status-tag`

**Import**

```ts
import { UiStatusTag } from 'ai-dls-kit';
```

## Description

Neutral status tag — the single pill for every status on the platform
(Figma 14421:204390). Pass `status` and the variant is inferred; pass
`variant` to override, `label` to display different text.

DLS `tag-status` (§42, Figma 407:19) has five types — Default, Success,
Warning, Critical, Information — pill radius, 8px h-padding, label/sm
`text-strong`. This kit's fourth-to-fifth mapping is neutral/green/red/
amber/purple: same geometry (2px off-grid vertical padding, see
status-tag.scss), the fifth (`variant="purple"`, `--color-tag-purple`
#e2d6ff) added Round 41 agent B with no status string routed to it yet
— see the doc comment above `statusVariant`.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `status` | `string` | — |
| `label` | `string` | — |
| `variant` | `UiTagVariant` | — |

## Types

```ts
export type UiTagVariant = 'neutral' | 'green' | 'red' | 'amber' | 'purple';
```

## Status keywords

| Variant | Keywords (`status` values) |
| --- | --- |
| `neutral` | `pending`, `ongoing`, `in progress`, `in clarification`, `escalated`, `pending approval`, `pending response` |
| `green` | `closed`, `approved`, `acknowledged`, `acknowledged with action`, `non-breach`, `non breach`, `completed`, `live`, `updated` |
| `red` | `rejected`, `incident raised`, `incident reported`, `issue raised`, `breach` |
| `amber` | `pending action`, `send back`, `rework`, `clarification`, `pending confirmation` |
| `purple` | none — pass `variant="purple"` explicitly |

Matching is case-insensitive and trimmed; anything not listed resolves to `neutral`. Pass `variant` explicitly to override.

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<ui-accordion title="Clarification — Rates Desk" [defaultOpen]="false" id="accordion-header-slot-clarification">
          <div accordion-header class="acc-slot-row">
            <span class="acc-slot-name">Clarification — Rates Desk</span>
            <ui-status-tag label="Pending Response" variant="amber" />
          </div>
          <div class="accordion-demo-body"><p class="hint">(c) Inbox raised-clarification header — name + inline <code>ui-status-tag</code>. Tag and name share the 8px unit gap.</p></div>
        </ui-accordion>
        <ui-accordion title="Data rectification" barColor="purple" [defaultOpen]="false" id="accordion-header-slot-bar">
          <div accordion-header class="acc-slot-row">
            <span class="acc-slot-name">Data rectification</span>
            <ui-status-tag label="Issue Raised" variant="red" />
          </div>
          <div class="accordion-demo-body"><p class="hint">Slot + bar together — the projected header takes the bar's 16/16 offset exactly as the built-in title does.</p></div>
        </ui-accordion>
      </div>
      <div class="spacer"></div>
      <h3>Title-area toggle — controls in <code>[accordion-actions]</code></h3>
      <p class="hint">
        Import <code>UiAccordionActions</code> and the toggle moves off the row onto the title
        column: <code>role="button"</code>, <code>tabindex</code>, <code>aria-expanded</code> and
        Enter/Space now sit on <code>.header-main</code>, and <code>.header</code> carries none of
        them. Tab order is title toggle → the search input (and its clear button) → body. Typing,
        clearing or pressing Enter in the input never toggles; clicking the title or the chevron
        still does. Hover still washes the full row and the focus ring still wraps the full header
        — nothing visible moves. This is the Platforms-card header (inventory A11).
      </p>
      <div class="accordion-slot-demos" id="accordion-actions-toggle-demos">
        <ui-accordion title="Platforms" [defaultOpen]="false" id="accordion-actions-toggle">
          <ui-search-input accordion-actions [(value)]="accActionsQuery" placeholder="Search platforms" />
          <div class="accordion-demo-body"><p class="hint">Search: <code>{{ accActionsQuery() || '—' }}</code>. The input is a tab stop of its own; the title column is the one accessible toggle.</p></div>
        </ui-accordion>
      </div>
      <div class="spacer"></div>
      <h3><code>lazyBody</code> — the body is not built until the first open</h3>
      <p class="hint">
        For panels whose content is expensive (a table): hand the body over as an
        <code>&lt;ng-template accordion-body&gt;</code> and pass <code>lazyBody</code>, and a
        collapsed group never builds it. The counter below is written by a probe component INSIDE
        the template, so it reads <code>0</code> until the panel is first opened, then <code>1</code>
        for good — re-collapsing keeps the panel built so the close animation has content to play
```


## Provenance

Figma 14421:204390 (optional background — no Figma access required to use this component)
