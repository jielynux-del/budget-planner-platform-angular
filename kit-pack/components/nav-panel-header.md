# UiNavPanelHeader

**Selector:** `ui-nav-panel-header`

**Import**

```ts
import { UiNavPanelHeader } from 'ai-dls-kit';
```

## Description

Header of a `ui-nav-panel` (Figma `nav-side-secondary-header`, 192450:1064
region) — REGISTER.md §29. Project it as the FIRST child of
`ui-nav-panel`'s default slot, ahead of the item list:

  <ui-nav-panel [(expanded)]="navExpanded">
    <ui-nav-panel-header title="System Access" avatarName="Aiko Mori"
      previousPage="Team Management" (previous)="back()" />
    <div class="nav-panel-items">…</div>
  </ui-nav-panel>

DLS geometry: 12px h / 16px v padding, bottom decorative rule, 16px
column gap between the optional "Previous page" row and the title row.
`previousPage` renders a tiny PLAIN `ui-button` (not a real back-nav —
the shell owns navigation, same division of labour as `[ui-nav-sub-item]`)
with a leading 16px chevron-left, emitting `previous` on click.
`avatarName` renders a 32px initials `ui-avatar` beside the title; when
absent the title group is just the title (DLS's "Form type centres the
title group without an avatar" — with no avatar box widening the row,
the flex row's own `align-items: center` already reads as centred).
Title types at the kit's heading/2xs, which is 14px in tokens.css — the
DLS-replica-compactness override that keeps every reference-app title at 14
rather than the 16 DLS's own heading/2xs prints (the reference app's internal notes).

This is additive: existing nav-panel shells keep hand-rolling their own `.nav-panel-title` div and
are unaffected — nothing requires migrating them this round.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` (required) | `string` | — |
| `avatarName` | `string | undefined` | `undefined` |
| `previousPage` | `string | undefined` | `undefined` |

**Outputs**

| Name | Type |
| --- | --- |
| `previous` | `void` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
list of HUMAN names (SINK_NAV, kitchen-sink.ts); the section headings
     below keep their code names. -->
<ui-nav-panel class="sink-nav" [(expanded)]="navExpanded">
  <ui-nav-panel-header title="UI kit" />
  <div class="sink-nav-tools">
    <p class="sink-nav-count">{{ sinkNavCount }} components</p>
    <!-- size="regular" — the owner's ask (kit-fixes item 26): this is a real
         page's search bar, not a table filter, so it takes the DLS Medium
         40px face rather than the compact 32 the filter bars use. -->
    <ui-search-input
      class="sink-nav-search"
      size="regular"
      placeholder="Find a component"
      [(value)]="navQuery"
      (keydown.escape)="clearNavQuery()"
    />
  </div>
  <nav class="sink-nav-list" #sinkNavList aria-label="Kitchen sink contents">
    @for (entry of filteredNav(); track entry.id) {
      <button
        ui-nav-sub-item
        type="button"
        [label]="entry.label"
        [active]="activeSectionId() === entry.id"
        [attr.data-target]="entry.id"
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
```


## Provenance

REGISTER.md §29 (optional background — no Figma access required to use this component)
