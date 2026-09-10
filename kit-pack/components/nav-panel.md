# UiNavPanel

**Selector:** `ui-nav-panel`

**Import**

```ts
import { UiNavPanel } from 'ai-dls-kit';
```

## Required shell — read this first

This component does NOT occupy space of its own. Its host is
`display: contents` and the panel frame inside it is `position: absolute`,
so the shell you place it in MUST do two things: be the containing block, and
reserve the panel's width on the sibling that holds the page content.

```html
<div class="shell">
  <ui-nav-panel [(expanded)]="navExpanded"> … </ui-nav-panel>
  <div class="content" [class.content-collapsed]="!navExpanded()"> … </div>
</div>
```

```scss
.shell   { position: relative; }            /* or absolute — the containing block */
.content { position: absolute; inset: 0 0 0 var(--nav-secondary-w);
           transition: left var(--dur-med) var(--ease-move); }
.content-collapsed { left: var(--nav-secondary-w-collapsed); }
```

**Why this is called out rather than left to the layout.** Omit either half
and the build is clean, the console is silent, and the page is wrong: with no
positioned ancestor the panel positions against the viewport, and with no
width reserved the content column starts at x=0 and the panel paints on top of
it. Nothing in Angular or CSS reports either case.

`--nav-secondary-w` (240px) and `--nav-secondary-w-collapsed` (40px) are
the two widths; use the tokens rather than the numbers, and mirror
`expanded` onto the content column as above so collapsing the panel actually
reclaims the space. Keep the content column's `transition` duration and
curve IDENTICAL to the panel's own (`nav-panel.scss`) — the two edges read
as one edge, and any drift shows as a tearing gap mid-animation.

## Description

Collapsible secondary-nav CHROME (Figma 993:7046) — the absolutely
positioned panel frame, its expanded/collapsed widths
(`--nav-secondary-w` / `--nav-secondary-w-collapsed`, tokens.css), and the
footer collapse/expand control. This is the shared part of the three
nav-panel shells — see each shell's own header comment for why the item
lists themselves stay copies rather than a shared component.

  <ui-nav-panel [(expanded)]="navExpanded">
    <div class="nav-panel-title"><h2 ui-page-title>My profile</h2></div>
    <div class="nav-panel-items"> …the shell's own routerLink items… </div>
  </ui-nav-panel>

`expanded` is a `model()` so a shell CAN mirror it (e.g. to shift its
content region — see profile.scss `.content-collapsed`), but nothing
requires binding it: it defaults to `true`, and since every consuming
shell is destroyed on module exit, a fresh instance (fresh default) is
exactly the "always expanded on landing, no persistence" behaviour asked
for — with zero extra state management.

Collapsed state hides the projected title/items entirely (Figma: a bare
~40px rail with a single centred `»` control, no labels) — only the
expand control renders. Three spec files assert those projected nodes have
count 0 when collapsed (f13-profile, f14-system-access,
f15-monitoring-split), so the `@if` around the BODY is contractual: do not
"fix" the collapse by mounting-and-hiding it without changing those specs.

THE TOGGLE ITSELF IS NOT INSIDE THAT `@if`. It used to be — one button in
the `@if` branch and a second in the `@else` — which meant every click
DESTROYED the element that was clicked. Measured consequences: keyboard
focus dropped to `<body>` (so tabbing after a collapse restarted from the
top of the document), and the control jumped 421.5px vertically at frame 0
because the two branches sit in different places. One persistent button
that swaps its label, `aria-label`, classes and chevron rotation off
`expanded()` fixes both, and lets the chevron animate between states
instead of being two hardcoded path pairs.

The 421.5px jump ITSELF is deliberate and remains: expanded, the control is
a footer row (`« Collapse view`); collapsed, it is a centred rail control —
those are two different designed end-states (the reference app's internal notes), not a
bug. Animating the travel between them WAS tried (transition `flex-grow` on
`.nav-panel-footer` 1 -> 0, which — measured — lands the collapsed centred
glyph within 0.5px of the expanded control's frame-0 position at ANY panel
height, so it is structurally available). It was rejected for now because it
forces the item list's own height to animate 421px -> 842px as a side
effect: the body then overflows for the first ~55ms of every expand
(scrollHeight 520 vs height 421), which flickers a scrollbar in and out on
any platform with classic non-overlay scrollbars — i.e. the Windows
deployment target. Moving the collapsed control is the product owner's call,
not this component's; leave the end-states alone until asked.

ACCESSIBLE NAMES ARE A CONTRACT: 'Collapse view' / 'Expand view' are what
the specs match on with `getByRole('button', { name })`. The expanded state
carries `aria-label` as well as the visible label so the name is stated in
one place for both states rather than coming from text in one and a label
in the other.

A shell needing TWO LEVELS projects `ui-nav-group` (nav-group.ts) and
`[ui-nav-sub-item]` (nav-sub-item.ts) into the same slot instead of a
flat item list — Figma 155:3121. Those are additive: this component is
unchanged by them, and the flat shells stay flat.

A shell wanting the full DLS `nav-side-secondary` header/footer anatomy
(§29) projects `ui-nav-panel-header` (nav-panel-header.ts) as the first
child of the default slot, and `[ui-nav-footer-item]` rows
(nav-footer-item.ts) wrapped in a `[uiNavPanelFooter]` element:

  <ui-nav-panel [(expanded)]="navExpanded">
    <ui-nav-panel-header title="System Access" />
    <div class="nav-panel-items">…</div>
    <div uiNavPanelFooter>
      <button ui-nav-footer-item label="Print"><ui-icon uiNavFooterIcon name="…" /></button>
    </div>
  </ui-nav-panel>

The footer slot renders ABOVE this component's own "Collapse view"
toggle, restyled this round to the identical 12px-padding / 8px-gap
geometry so the two read as one list — see nav-footer-item.ts for why
the toggle itself stays a distinct persistent element rather than
becoming a fourth `[ui-nav-footer-item]` instance. Collapsed, the footer
slot is unmounted (same `@if` shape as the body) and only the toggle's
bare 24px chevron strip remains, per DLS's 40px-wide collapsed rail.

## API

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `expanded` | `(inferred)` | `true` |

## Slots

- Default (unnamed) content projection
- `select="[uiNavPanelFooter]"`


## Example

From the kit's kitchen sink:

```html
same shell shape as System Access / My Profile. One flat, alphabetical
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
```


## Provenance

Figma 993:7046 (optional background — no Figma access required to use this component)
