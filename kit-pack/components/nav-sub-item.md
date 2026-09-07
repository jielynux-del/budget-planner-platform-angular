# UiNavSubItem

**Selector:** `[ui-nav-sub-item]`

**Import**

```ts
import { UiNavSubItem } from 'ai-dls-kit';
```

## Description

Child row of a `ui-nav-group` (Figma 155:3121 / 192450:1064,
`nav-side-secondary/sub-item`). 12px h / 8px v padding (32px tall): a
16x16 sizer at 12px — an indent, deliberately NOT an icon slot — the
label at 36px, a trailing 16px slot at 212px holding an optional count
badge, and (Form type) a further trailing 16px status icon slot.

APPLIED AS AN ATTRIBUTE, so the consuming shell picks the element and
keeps ownership of navigation:

  <a ui-nav-sub-item label="All items" [routerLink]="…" [active]="…"></a>
  <button ui-nav-sub-item label="All items" (click)="…"></button>
  <span ui-nav-sub-item label="Later" [disabled]="true"></span>

That is the whole reason there is no `(selected)` output and no `route`
input: routing is the shell's business, and the three existing nav-panel
shells each drive it differently. This component owns geometry, type and
state styling only.

`active` is an INPUT rather than a `routerLinkActive` class, and that is
a real decision. A two-level nav has to know which group holds the active
route in order to open it, so the shell is already computing "which row
is active" in TypeScript; feeding that same answer in as an input keeps
one source of truth. Mixing the two would also pit a host class binding
against `routerLinkActive`'s imperative `addClass` for the same class.

`disabled` renders a non-clickable roadmap entry — greyed text, no hover
wash, `not-allowed` cursor, `aria-disabled`. It styles only: put it on a
`<span>` (or a real `[disabled]` button) so there is nothing to click in
the first place. Rendering a disabled `<a routerLink>` still navigates.

`status` (DLS "Type Form", §29) adds a trailing 16px status icon —
`completed` / `error` — see nav-group.ts's identical input for the full
rationale (same icons, same tokens). It is a separate slot from the
count `badge` above: a sub-item realistically carries a tally OR a
completion state, never both.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` (required) | `string` | — |
| `count` | `string | number | null` | `null` |
| `active` | `(inferred)` | `false` |
| `status` | `UiNavStatus` | `undefined` |
| `disabled` | `(inferred)` | `false` |

## Types

DLS Form-type status per item/sub-item (REGISTER.md §29).

```ts
export type UiNavStatus = 'completed' | 'error' | undefined;
```

## Slots

- `select="[uiNavStatus]"`


## Example

From the kit's kitchen sink:

```html
for a roadmap row, because `disabled` on the kit component is
                   STYLING only — the host is what has to be unclickable. -->
              <ui-nav-group label="Section A" [defaultExpanded]="true">
                <a ui-nav-sub-item label="Active row" [count]="81" [active]="true"></a>
                <a ui-nav-sub-item label="Normal row" [count]="20"></a>
                <!-- No count: a badge beside a row you cannot open is a promise
                     the page can't keep (the product rule the real nav follows). -->
                <span ui-nav-sub-item label="Disabled row" [disabled]="true"></span>
              </ui-nav-group>
              <ui-nav-group label="Section B">
                <a ui-nav-sub-item label="Another row" [count]="58"></a>
              </ui-nav-group>
              <a class="nav-panel-item">Flat row</a>
            </div>
          </ui-nav-panel>
        </div>
      </div>
      <p class="hint">
        The last entry is a shell-owned flat <code>.nav-panel-item</code>, not a sub-item — it sits on
        the group headers' own gutter rather than the children's indent, which is how a section with
        no children reads as a peer of the groups instead of a child of the one above it (EFX Order
        Watch in the real nav).
      </p>

      <h3>Full DLS anatomy (§29, audited 3 Sep 2026) — header, Form type, footer, 40px collapse</h3>
      <p class="hint">
        <code>ui-nav-panel-header</code> (12/16 padding, bottom rule, 16px column gap): a tiny plain
        "Previous page" button with a leading 16px <code>chevron-left</code>, a 32px initials
        <code>ui-avatar</code>, and a title at the kit's <code>heading/2xs</code> — 14px under the
        standing DLS-replica-compactness override, not DLS's own printed 16. Item and sub-item rows
        below now carry a Form-type trailing <code>status</code> icon — a hand-authored
        <code>check</code> in <code>--color-success-strong</code> or
        <code>triangle-exclamation-filled</code> in <code>--color-text-danger</code> (tokens.css has
        no separate <code>--color-danger-strong</code> role; this is the same hex under its
        text/icon name). Selected sub-item fill is <code>--color-primary-subtle</code> — our
        white-label analog of DLS's <code>product_alt-subtle</code>. The footer holds two projected
        <code>[ui-nav-footer-item]</code> rows (Print, Settings) above the panel's own Collapse view
        control, all three now sharing one 12px-padding / 8px-gap rhythm.
      </p>
      <div class="row wrap">
```


## Provenance

Figma 155:3121 (optional background — no Figma access required to use this component)
