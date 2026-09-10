# UiMultiSelect

**Selector:** `ui-multi-select`

**Import**

```ts
import { UiMultiSelect } from 'ai-dls-kit';
```

## Description

Multi-select dropdown — 32px trigger + search / select-all / checkbox
options panel (ported from the shared modal use-case & CC pickers).

  <ui-multi-select [items]="useCases" [(selected)]="keys" placeholder="Select use case" />

THIS IS A TOOLBAR CONTROL, NOT A COLUMN FILTER. Put it in the table
toolbar (`ui-table-header`'s control row) alongside the search field, not
in a `ui-column-header`'s filter slot. Two measurements say so, and both
are properties of the component rather than of any one table:
  - The panel's MINIMUM WIDTH is 320px — this component opens
    `ui-dropdown-menu` with `[minAnchorWidth]="320"`, DLS's "the trigger's
    own width or 320, whichever is larger". Table columns are routinely
    narrower than that, so in a column the panel is wider than the cell
    that owns it and overhangs its neighbours; in the last column it
    overhangs the card edge. It is not CLIPPED there any more — the panel
    became `position: fixed` off the anchor's live rect on 7 Sep 2026
    (`ui-dropdown-menu`'s own "POSITIONING" note), so `ui-table-card`'s
    `overflow: clip` no longer cuts it off — but a control that has to
    overhang to open is still in the wrong place.
  - The 24px column-filter height does not reach it. The header's filter
    row sizes its projected control through
    `ui-column-header .filter .ui-select, ui-column-header .filter
    .ui-date-input` (styles/ui-tables.css, the "DELIBERATE 24px
    EXCEPTION" block) — two selectors, neither of them this component. A
    multi-select in that slot keeps its own 32px trigger and pushes the
    header band past the 64px anatomy every other column is drawn to.
Filter a column with `ui-select` or `ui-date-input`; filter the TABLE with
this, from the toolbar, where it opens at its full width.

── DLS REPLICA (REGISTER.md §16, audited 2 Sep 2026) ────────
The panel is now the DLS menu-account chrome: `ui-dropdown-menu` at
`max(320px, 100%)` wide ("320, or the trigger's width, whichever is
larger"), a `[uiDropdownMenuHeader]` slot holding the existing search
input and the Select all/Reset row (now `ui-button variant="plain"
size="tiny"`), then rows as `button[ui-dropdown-item]` (40px, `.option`
kept as the class name for the pickMulti()/fillActionBlock() e2e
helpers) with a leading readonly `ui-checkbox` mirroring selection.
Behaviour — search filtering, select-all, the `selected` model,
`disabled` — is unchanged; only the chrome moved onto the shared
primitives.

OPTION-MODEL GROWTH (§36, "Select — remainder audit", 3 Sep 2026):
`UiMultiSelectItem` grows `description`,
`icon`, `avatar` and `disabled`. The row's own leading slot
(`[uiDropdownAvatar]`) is already the checkbox, so an item's `avatar`
projects into `ui-dropdown-item`'s new `[uiDropdownAvatarSecondary]`
slot — AFTER the checkbox, per DLS 273655:2345 — and `description`
projects into its new `[uiDropdownDescription]` slot. A `disabled` item
is a genuinely inert `[disabled]` row: not selectable by click or
keyboard, and skipped by `selectAll()`.

TRIGGER (register §21, audited 3 Sep 2026, "Filled" 76086:347584):
aligned to the same shell `ui-select`'s new custom trigger uses — 32px,
0/12 padding, 8 gap, hover border, 2px solid `--color-focus` inset ring
on open/focus, invalid bg + border, disabled paint, chevron-down_16
flipping to chevron-up_16 when open. `display` picks the DLS "# selected"
text (`count`, default — the existing `triggerLabel`, unchanged) or an
inline `tag-filter` chip group (`tags`) with a per-chip × that deselects
without opening the panel.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `items` (required) | `UiMultiSelectItem[] | string[]` | — |
| `placeholder` | `(inferred)` | `'Select'` |
| `disabled` | `(inferred)` | `false` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |
| `display` | `UiMultiSelectDisplay` | `'count'` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `selected` | `string[]` | `[]` |

## Types

```ts
export interface UiMultiSelectItem {
  key: string;
  label: string;
  /** @deprecated use `description` — kept so existing callers still
   *  compile and render; `description` wins when both are set. */
  meta?: string;
  /** DLS "Metadata" second line (§36 `multi-select-option`, 273655:2294). */
  description?: string;
  /** 16px leading glyph: an SVG `<path d>` string, `[uiDropdownIcon]`.
   *  Mutually exclusive with `avatar`. */
  icon?: string;
  /** Initials source for a 24px `ui-avatar`, projected AFTER the row's own
   *  checkbox (DLS 273655:2345) — see `ui-dropdown-item`'s
   *  `[uiDropdownAvatarSecondary]` slot. */
  avatar?: string;
  /** Not selectable by click or keyboard. */
  disabled?: boolean;
}
```

```ts
export type UiMultiSelectDisplay = 'count' | 'tags';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<h3>ui-multi-select — trigger <code>display</code> (§21)</h3>
      <div class="row sel-multi-row">
        <div class="w240">
          <ui-multi-select [items]="msDesks" [(selected)]="msCountSelected" placeholder="Select desk" />
        </div>
        <div class="w320">
          <ui-multi-select [items]="msDesks" [(selected)]="msTagsSelected" placeholder="Select desk" display="tags" />
        </div>
      </div>
      <p class="hint">
        Count: {{ msCountSelected().join(', ') || '—' }} · Tags: {{ msTagsSelected().join(', ') || '—' }}
      </p>

      <h3>ui-select / ui-multi-select — option-model growth (§36, audited 3 Sep 2026)</h3>
      <p class="hint">
        The option model grows <code>description</code> (DLS "Metadata"), <code>icon</code>,
        <code>avatar</code>, <code>count</code> and <code>disabled</code> — rendered through
        <code>ui-dropdown-item</code>'s existing icon/avatar/trailing slots plus the new
        <code>[uiDropdownDescription]</code> and <code>[uiDropdownAvatarSecondary]</code> slots.
        A plain <code>{{ '{value,label}' }}</code> option still renders exactly as before.
      </p>
      <div class="row sel-rich-row">
        <div class="w280">
          <ui-select [options]="selRichOptions" [(value)]="selRichValue" placeholder="Select desk" />
        </div>
        <div class="w280">
          <ui-select [options]="selAvatarOptions" [(value)]="selAvatarValue" placeholder="Select owner" />
        </div>
        <div class="w280">
          <ui-multi-select [items]="msRichPeople" [(selected)]="msRichSelected" placeholder="Select people" />
        </div>
      </div>
      <p class="hint">
        Left: description + icon + a disabled desk + a count pill per desk. Middle: description +
        avatar (initials). Right: multi-select rows with description + avatar, one disabled.
        Picked: {{ selRichValue() ?? '—' }} · {{ selAvatarValue() ?? '—' }} ·
        {{ msRichSelected().join(', ') || '—' }}
      </p>
    </div>
  </section>
```


## Provenance

REGISTER.md §16 (optional background — no Figma access required to use this component)
