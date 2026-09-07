# UiSearchInput

**Selector:** `ui-search-input`

**Import**

```ts
import { UiSearchInput } from 'ai-dls-kit';
```

## Description

DLS 3.1 "Input search" (REGISTER.md §23, Figma set
38951:273380 — default 196904, focus 196910, filled 196925, disabled
196915), aligned onto the DLS chrome in the archive round §21–§24 (owner
decision, 3 Sep 2026). Same shared field shell as `ui-phone-input`/
`ui-number-input`/`ui-amount-input`: bg level_1, 1px border, radius 4,
padding 0/12 (this control's own kit had 4/12) with an 8px gap.

  <ui-search-input [(value)]="query" placeholder="Search" />
  <ui-search-input [(value)]="query" [disabled]="true" />
  <ui-search-input [(value)]="query" size="regular" />

── `size` (kit-fixes walk item 26, 6 Sep 2026) ────────────────────────
`small` (DEFAULT) = the 32px face every filter bar and the searchable
`ui-select`'s in-menu row already use: `--size-base-sm`, 16px
`magnifying-glass_16` glyph, `body(sm)` text. Defaulting here keeps all
16 existing callers byte-identical. `regular` = DLS's own Medium
(register §23 "input-search 40 → our 32" — the 40 is now available):
`--size-base-md` 40px, a 24px `magnifying-glass_24` glyph, `body(md)`
text, host class `ui-search-input--regular`. Horizontal padding (12)
and the 8px gap are the same at both sizes; the clear affordance stays
the 24px tiny icon-button at both.

Leading glyph (hand-authored, `--color-icon`, dims to
`--color-icon-disabled` while `disabled`). **Filled** state (value
non-empty, not disabled): a trailing `ui-icon-button size="tiny"` with a
16px `circle-x-filled` glyph (register §8) clears the value on a real
click and re-emits — same clear affordance `ui-text-input`'s own
clear-on-focus button draws, but gated on the value being non-empty
rather than focus (DLS's Filled state, not a focus-only convenience).
Focus: 2px solid `--color-focus` inset border, no alpha ring. Disabled:
`--color-bg-disabled`, no border (`border-width: 0`, not just a
transparent colour — box-sizing: border-box keeps the box the same size).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `placeholder` | `(inferred)` | `'Search'` |
| `disabled` | `(inferred)` | `false, { transform: booleanAttribute }` |
| `size` | `UiSearchInputSize` | `'small'` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `value` | `(inferred)` | `''` |

## Types

DLS `input-search` Size axis — `small` (32, the platform's compact default) | `regular` (DLS Medium, 40).

```ts
export type UiSearchInputSize = 'regular' | 'small';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
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
        over. (Only the template is deferred: Angular instantiates a plain projected element
        eagerly whatever the accordion does with it, which is why this is a template.)
      </p>
      <p class="hint" id="accordion-lazy-readout">Body built <code>{{ lazyBodyBuilds() }}</code> time(s).</p>
      <div class="accordion-slot-demos" id="accordion-lazy-demos">
        <ui-accordion title="Trades (lazy)" [defaultOpen]="false" lazyBody id="accordion-lazy-body">
          <ng-template accordion-body>
            <div class="accordion-demo-body"><sink-build-probe (built)="lazyBodyBuilds.update(n => n + 1)" /></div>
          </ng-template>
        </ui-accordion>
      </div>
      <div class="spacer"></div>
      <h3>Controlled open state — <code>[(expanded)]</code> / <code>(expandedChange)</code></h3>
      <p class="hint">
        <code>expanded</code> is a <code>model&lt;boolean | null&gt;</code>: <code>null</code> (the
        default) is the uncontrolled accordion <code>defaultOpen</code> seeds; a boolean is state the
        parent owns. The switch and the accordion below share ONE parent signal —
        <code>[expanded]</code> reads it, <code>(expandedChange)</code> writes it back (a parent whose
        own state is typed <code>boolean | null</code> can use <code>[(expanded)]</code> directly) —
        so flip either and the other follows. Every user toggle writes the model, which is what
        emits <code>expandedChange</code>; a value the parent pushes in does not emit. The second accordion binds only <code>(expandedChange)</code> — the
        "just tell me" form (the monitoring app's ongoing-clarification card clears its badge on each
        expand this way) — and stays uncontrolled until its first toggle.
      </p>
      <label class="toggle-wrap" id="accordion-controlled-switch"><ui-switch [(checked)]="accControlled" /> Open</label>
```


## Provenance

REGISTER.md §23 (optional background — no Figma access required to use this component)
