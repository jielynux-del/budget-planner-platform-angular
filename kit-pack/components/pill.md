# UiPill

**Selector:** `ui-pill`

**Import**

```ts
import { UiPill } from 'ai-dls-kit';
```

## Description

Use-case pill — small dot + label chip used in trade tables and modals
(grey = default, green = acknowledged, yellow = sent for clarification,
red = the critical/adverse outcome).

  <ui-pill label="ED" color="green" />

`variant="plain"` drops the tinted chip background and renders just the
coloured dot beside body-sized text — the access-level treatment used by
the System Access lists (Special Requests detail + My Profile platforms).

  <ui-pill label="Read-Write" color="green" variant="plain" />

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` (required) | `string` | — |
| `color` | `UiPillColor` | `'grey'` |
| `variant` | `UiPillVariant` | `'filled'` |
| `dot` | `(inferred)` | `true` |

## Types

```ts
export type UiPillColor = 'grey' | 'green' | 'yellow' | 'red';
```

```ts
export type UiPillVariant = 'filled' | 'plain';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<ui-badge [label]="12" emphasis="high" />
        <ui-badge [label]="3" />
        <ui-badge label="99+" />
        <ui-pill label="ED" />
        <ui-tag-info />
      </div>
      <p class="hint">
        First three: low / medium / high at the same "12". Then a single digit and a truncated
        "99+", both default (low) emphasis, showing the pill hugging either extreme. Last two are a
        pill and a recency tag, for size and shape comparison — neither could carry a count without
        losing the distinction it exists to make (see badge.ts).
      </p>

      <h3><code>type="dot"</code> — the same three fills, no content</h3>
      <p class="hint">
        An 8×8 circle (<code>--size-base-5xs</code>) — the unread/status marker, same
        low/medium/high fills as the label, none of the content.
      </p>
      <div class="row badge-dot-row">
        <ui-badge type="dot" emphasis="low" />
        <ui-badge type="dot" emphasis="medium" />
        <ui-badge type="dot" emphasis="high" />
      </div>

      <h3><code>emphasis="high"</code> — the unread badge</h3>
      <p class="hint">
        The danger emphasis at DLS's own 12px (Figma <code>190:17151</code>): same 16px height, 4px
        padding and pill radius as Low/Medium, but <code>--color-bg-danger-strong</code> with
        <code>--color-text-on-dim</code>, and a 16px min-width (a kit extension, not on the DLS
        node) so a single digit stays a circle. It is an inline chip like any other — overlaying it
        on the Primary Nav's Inbox glyph is that consumer's positioning, not the component's.
      </p>
      <div class="row badge-on-dim">
        <ui-badge [label]="1" emphasis="high" />
        <ui-badge [label]="12" emphasis="high" />
        <ui-badge label="99+" emphasis="high" />
      </div>
      <p class="hint">Shown on the rail's own dark background, which is where it lives.</p>

      <h3><code>emphasis="subtle"</code> — kit extension, no DLS counterpart</h3>
```


## Provenance

_Not recorded._
