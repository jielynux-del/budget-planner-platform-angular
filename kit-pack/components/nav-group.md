# UiNavGroup

**Selector:** `ui-nav-group`

**Import**

```ts
import { UiNavGroup } from 'ai-dls-kit';
```

## Description

Expandable GROUP row inside a `ui-nav-panel` (Figma 155:3121,
`nav-side-secondary/item` in its expandable state). 40px tall: a filled
disclosure triangle at 12px (16x16, pointing right when collapsed and
down when expanded), then the label at 36px. Whatever the shell projects
renders below it as the design's `dropdown` block — in practice a run of
`[ui-nav-sub-item]` rows.

The projected content is ALWAYS in the DOM, open or shut; the disclosure is
a 120ms grid-track transition and `inert`, not a structural if. See the
template comment for why, and nav-group.scss for the timing rationale — a
spec that counts rows across the whole panel therefore counts every group's,
not just the open ones.

  <ui-nav-group label="Section" [(expanded)]="sectionOpen">
    <a ui-nav-sub-item label="All items" [active]="true" [routerLink]="…"></a>
  </ui-nav-group>

GROUPS ARE INDEPENDENT BY CONSTRUCTION. Each instance owns its own
`expanded` signal, so opening one cannot close another — there is no
shared open-set to get the accordion semantics wrong (contrast the
primary nav rail, which has one component rendering every group and so
had to model the same requirement explicitly as a Set). A shell that
wants to drive or observe the state binds `[(expanded)]`; one that
doesn't binds nothing and gets a self-contained disclosure.

`defaultExpanded` seeds the initial state for the common case — a shell
that wants the group holding the active route open on landing but does
not otherwise care to hold the signal itself.

The group row is a real `<button>`, not a link: it toggles, it never
navigates. A group that should ALSO navigate is not this component.

`status` (DLS "Type Form", §29) adds a trailing 16px status icon after the
label — a hand-authored `check` in `--color-success-strong` for
`'completed'`, a hand-authored `triangle-exclamation-filled` in
`--color-text-danger` for `'error'` (tokens.css has no separate
`--color-danger-strong`; this is the same #d62300 value under its
text/icon role — see tokens.css's own "same hex, different DLS role"
house rule). The wrapper renders whenever `status()` is set; project
`[uiNavStatus]` alongside it to swap in custom markup instead of the
built-in glyph.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` (required) | `string` | — |
| `defaultExpanded` | `(inferred)` | `false` |
| `status` | `UiNavStatus` | `undefined` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `expanded` | `(inferred)` | `false` |

## Types

DLS Form-type status per item/sub-item (REGISTER.md §29).

```ts
export type UiNavStatus = 'completed' | 'error' | undefined;
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<a> or a click-handling control for a live row, and a <span>
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
```


## Provenance

Figma 155:3121 (optional background — no Figma access required to use this component)
