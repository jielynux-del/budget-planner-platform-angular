# UiButton

**Selector:** `button[ui-button], a[ui-button]`

**Import**

```ts
import { UiButton } from 'ai-dls-kit';
```

## Description

Neutral button — the DLS 3.1 `button` component (page 305:2699, set
50546:240728), rebuilt onto its real axis grid. Applied as an attribute so
native semantics (type, disabled, form participation) stay intact:

  <button ui-button variant="secondary" size="tiny">Cancel</button>
  <button ui-button tone="destructive" [loading]="saving()">Revoke</button>
  <button ui-button variant="plain" type="button">
    Next
    <ui-icon uiButtonIconRight name="…" />
  </button>

DLS's six axes, and where each landed:

**Variant** — `primary` (default) | `secondary` | `plain`. DLS calls the
third one Plain; the kit's old `ghost` is the same thing renamed. `danger` is GONE as a variant — it was always Primary
with a red fill, and DLS confirms that: destructive is a *Style*, not a
variant.

**Size** — `small` (default, 32px, node 50546:240727) | `tiny` (24px,
Tiny Plain node 50647:239834). OWNER'S RULING (2 Sep 2026): "a compact
application" ships Tiny + Small only — DLS's Medium (40) and Large (48)
are recorded here and in REGISTER.md §7, not built. DLS's
own Primary has no Tiny at all; nothing stops a caller writing
`variant="primary" size="tiny"` here (CSS would render it), but there is
no DLS anatomy behind that combination and no call site should reach for
it — Tiny is Breadcrumb's (§6) and Alert's (§2) size, both Secondary/Plain
only. Both sizes type at the kit's `label(sm)` — 13px, the compactness
value the platform already stands on everywhere else `label(sm)` is used
(f16-typography). DLS's own printed spec says 14px for this role; the
owner ruled that a DLS-side inconsistency, not a platform gap, and this
component deliberately does NOT chase it.

**Style → `tone`.** DLS names this axis Style: `normal` (default) |
`destructive` | `positive` | `on-dim` | `on-bright`. NAMING TRAP: it
cannot be called `style` here — `ui-button` is an attribute component on
a native `<button>`/`<a>`, and `style="destructive"` would try to write
literal inline CSS through the element's built-in `style` attribute
rather than reaching this component's input. `tone` is the kit's existing
word for exactly this shape of axis (see `ui-badge`'s `tone`), so it
carries over rather than inventing a third name for the same idea.

`destructive` (Figma 141989:55608) and `positive` (141989:51643) are
SOLID FILLS and apply to `variant="primary"` — `--color-bg-danger-strong`
/ `--color-bg-success-strong` with their own hover/pressed steps, text
`--color-text-inverse`. `on-dim` (secondary shown at 136059:193213) and
`on-bright` apply to `variant="secondary"` / `"plain"` — the pairing DLS
uses for a control sitting on a dark rail or a tinted card. The owner
ruled ALL FIVE tones ship now (2 Sep 2026), even though only on-dim has
a reference-app call site today (the Primary Nav is the one dark surface in the
app) — "so the platform can grow a dark mode later" without a second
button pass.

DLS does not define every Variant×Tone cell (e.g. `secondary` +
`destructive`, `primary` + `on-dim`). Rather than throw or silently
ignore the caller's intent, an undefined combination falls back to that
variant's `normal` look — the CSS for destructive/positive is scoped to
`.ui-button--primary` and on-dim/on-bright to `.ui-button--secondary` /
`.ui-button--plain`, so a tone class that doesn't apply to a given
variant simply never matches a rule and the variant's own Normal styling
stands. See button.scss for exactly which cells are wired.

**State** — Default/Hover/Pressed are the existing `:hover`/`:active`
rules per variant×tone. **Focus** (node 50647:240042) RESOLVES the open
question from the 1 Aug pass: DLS's focus is a 2px SOLID border in
`--color-focus` (Status/Access, `#458fff` — reused rather than adding a
second `--color-border-access-focus` token for the same DLS hue and the
same value), drawn INSET (`box-shadow: inset 0 0 0 2px`) so it adds no
layout shift and a Secondary's 1px border stays visible underneath it —
not the old 25%-alpha ring (`--focus-ring`, kept in tokens.css for
whatever still reads it, not read by this component any more).
**Disabled** collapses every variant/tone to `--color-bg-disabled` +
`--color-text-disabled`, no border — DLS's rule, except `on-dim`, which
keeps its own darker disabled pair (`--color-bg-on-dim-disabled` +
`--color-text-on-dim-disabled`) because the ordinary disabled fill is
invisible against a dark rail. **Loading** (node 50647:239659): the
button's own PRESSED fill as background, `aria-busy="true"`,
`pointer-events: none`, the projected label swapped for three 8px pill
dots at opacity 1/.6/.2 — see the `loading` input doc below for why the
label is hidden rather than removed.

**Icons** — two named projection slots, `uiButtonIconLeft` /
`uiButtonIconRight`, both fixed to DLS's 16px at every size via
`::ng-deep` in button.scss. Icon-ONLY buttons are `ui-icon-button`
now (REGISTER.md §8) — DLS treats an icon-only control as
its own component, not a state of this one, and `ui-icon-button` gets
the icon-only anatomy right (grey glyph, square/circle, 24px at Small)
where this component's retired `iconOnly` flag did not. This component
keeps only the two labelled-icon slots above.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `variant` | `UiButtonVariant` | `'primary'` |
| `size` | `UiButtonSize` | `'small'` |
| `tone` | `UiButtonTone` | `'normal'` |
| `loading` | `(inferred)` | `false` |

## Types

```ts
export type UiButtonVariant = 'primary' | 'secondary' | 'plain';
```

```ts
export type UiButtonSize = 'small' | 'tiny';
```

```ts
export type UiButtonTone = 'normal' | 'destructive' | 'positive' | 'on-dim' | 'on-bright';
```

## Slots

- Default (unnamed) content projection
- `select="[uiButtonIconLeft]"`
- `select="[uiButtonIconRight]"`


## Example

From the kit's kitchen sink:

```html
</div>
    <div class="demos">
      <ui-accordion title="Desk Details">
        <button ui-button variant="secondary" accordion-actions>Edit</button>
        <div class="accordion-demo-body">
          <p class="hint">Grid-rows animation — expands to actual content height.</p>
        </div>
      </ui-accordion>
      <div class="spacer"></div>
      <h3>Header variant — left bar + count</h3>
      <div class="accordion-variants">
        <ui-accordion title="Data rectification" barColor="purple" [count]="8" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">The one bar with no status behind it.</p></div>
        </ui-accordion>
        <ui-accordion title="Not started" barColor="grey" [count]="12" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Grey by owner override — Figma draws this one amber.</p></div>
        </ui-accordion>
        <ui-accordion title="Clarification" barColor="yellow" [count]="3" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Same yellow as the Clarification status dot.</p></div>
        </ui-accordion>
        <ui-accordion title="Closed with breach" barColor="red" [count]="0" [defaultOpen]="false" [expandable]="false">
          <div class="accordion-demo-body"><p class="hint">Never renders — a non-expandable accordion has no body.</p></div>
        </ui-accordion>
        <ui-accordion title="Closed with no issues" barColor="green" [count]="27" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Same green as the Non Breach / Acknowledged dots.</p></div>
        </ui-accordion>
        <ui-accordion title="No bar, no count" [defaultOpen]="false">
          <div class="accordion-demo-body"><p class="hint">Both inputs absent — what every pre-variant call site renders.</p></div>
        </ui-accordion>
      </div>
      <p class="hint">Bar colours come from the same tokens as the matching ui-pill status dot, so a bar and the rows inside it cannot drift.</p>
      <div class="spacer"></div>
      <h3>Subtitle (DLS gap b)</h3>
      <div class="accordion-variants">
        <ui-accordion title="Desk Details" subtitle="FX Options — APAC">
          <div class="accordion-demo-body"><p class="hint">Second line under the title, label/sm, --color-text-subtle, 4px gap — the header grows to fit it.</p></div>
        </ui-accordion>
        <ui-accordion title="Data rectification" subtitle="8 items awaiting review" barColor="purple" [count]="8">
          <div class="accordion-demo-body"><p class="hint">Subtitle + header action together — actions slot, bar and count are all unaffected by the extra line.</p></div>
        </ui-accordion>
```


## Provenance

REGISTER.md §7 (optional background — no Figma access required to use this component)
