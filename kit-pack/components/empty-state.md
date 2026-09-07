# UiEmptyState

**Selector:** `ui-empty-state`

**Import**

```ts
import { UiEmptyState } from 'ai-dls-kit';
```

## Description

Empty state — the DLS 3.1 `empty-state` component (page 467:1104, set
274552:3254, REGISTER.md §17, audited + rebuilt 2 Sep 2026 —
the §13–§20 round). Type Default | Slot: 400 wide, centred column, 16px
gap between illustration / text block / action; text block is a 4px-gap
stack of title + description.

  <ui-empty-state title="Inbox is empty" text="Nothing needs your attention right now." />

**Illustration** — OWNER'S RULING (2 Sep 2026): the archived DLS
`object-dog-empty-bowl` SVG (the reference app's asset archive,
harvested before the DBS library access lapsed) is the DEFAULT now, at
DLS's own 151px (node 11690:95830) — the kit's own cactus illustration
is RETIRED as the default; all 33 existing
callers re-render with the dog at 151, unchanged markup. `size` still
overrides the pixel dimensions of whichever illustration is active.

  <ui-empty-state illustration="cactus" title="No matches" text="Try a different filter." />

**Slot** (274552:3559) — `illustration="slot"` swaps in a caller-projected
illustration via `[uiEmptyStateIllustration]` instead of either built-in
SVG — DLS's own Type=Slot reading, for the rare illustration neither
built-in covers:

  <ui-empty-state illustration="slot" title="No signal" text="Check back later.">
    <ui-icon uiEmptyStateIllustration name="…" />
  </ui-empty-state>

**Action** (below the text block, 16px gap) — an optional
`[ui-empty-state-action]` slot, DLS's own secondary SMALL button reading;
the caller supplies its own `ui-button`, this component only reserves
the slot and the gap:

  <ui-empty-state title="No drafts" text="Start a new one to see it here.">
    <button ui-empty-state-action ui-button variant="secondary" size="small" (click)="create()">New draft</button>
  </ui-empty-state>

Layout: title kit `heading(2xs)` 14/600 `--color-text-strong` — DLS
prints `heading/2xs` at 16px for this role; the platform's compactness
override (REGISTER.md, the accordion/badge/card titles)
keeps it at 14, carried here rather than chased back to 16. Description
`body(sm)` 13px `--color-text-subtle`.

Existing class names (`.title`, `.text`) are kept unchanged — f49-dls-card's
`card-body ui-empty-state .title` assertion, and every other caller that
greps for them, still passes.

Docblock node refs for the record: set 274552:3254; Default 11690:95830;
Slot 274552:3559.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` | `string` | — |
| `text` | `string` | — |
| `size` | `(inferred)` | `151` |
| `illustration` | `UiEmptyStateIllustration` | `'dog'` |

## Types

```ts
export type UiEmptyStateIllustration = 'dog' | 'cactus' | 'slot';
```

## Slots

- `select="[uiEmptyStateIllustration]"`
- `select="[ui-empty-state-action]"`


## Example

From the kit's kitchen sink:

```html
(click)="jumpTo(entry.id)"
      ></button>
    } @empty {
      <ui-empty-state class="sink-nav-empty" text="No matching component" [size]="108" />
    }
  </nav>
</ui-nav-panel>

<!-- Content region — scrolls beside the panel; the scroll-spy's observer
     root. The `.sink` block and every section id inside it are unchanged. -->
<div class="sink-content" [class.sink-content-collapsed]="!navExpanded()">
<div class="sink">
  <header class="sink-header">
    <h1>Kitchen Sink</h1>
    <p>
      The kit's living styleguide — every <code>ui-*</code> component is demoed here, one section
      per component, mapped 1:1 to an entry in <code>the reference app's internal notes</code>. It is a DLS 3.1
      replica in progress; open gaps are tracked in <code>REGISTER.md</code>. Data
      layer wired: the Ops Risk Lead currently has {{ opsRiskItemCount() }} inbox items.
    </p>
  </header>

  <section id="ui-accordion">
    <h2>ui-accordion</h2>
    <div class="specs">
      <p class="hint">
        DLS accordion-box replica round (REGISTER.md §1, 2 Sep 2026): 4px radius
        (<code>--radius-sm</code>), <code>--shadow-elevation-1</code>, a 48px-minimum header
        (12px vertical / 16px horizontal padding, content-driven so a subtitle can grow it), a
        24px chevron cell. Title stays 14px but takes the DLS label weight — 500, not the old
        heading(2xs) 600 — the owner's compactness override (kept the reference-app size, took the DLS
        weight). Tab to a header to see the <code>--focus-ring</code> box-shadow; a
        non-expandable header is not a tab stop. <code>barColor</code>, <code>count</code> and
        <code>expandable</code> are kit extensions, kept as opt-in inputs — not in DLS.
      </p>
    </div>
    <div class="demos">
      <ui-accordion title="Desk Details">
        <button ui-button variant="secondary" accordion-actions>Edit</button>
        <div class="accordion-demo-body">
```


## Provenance

REGISTER.md §17 (optional background — no Figma access required to use this component)
