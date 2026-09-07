# UiCheckbox

**Selector:** `ui-checkbox`

**Import**

```ts
import { UiCheckbox } from 'ai-dls-kit';
```

## Description

Canonical checkbox — 20px box, 4px radius, 2px --color-icon border when
unchecked, --color-icon-selected (#00ab61) fill when checked (Z3, Figma
1428:65766 unchecked / 1428:65757 checked — was 16px / 1.5px /
accent-green, a pre-spec approximation). Label projects in:

  <ui-checkbox [(checked)]="agreed">Remote Working</ui-checkbox>

THREE visual states, not two. `indeterminate` is the "some, but not all"
state a select-all header takes over a partly-selected list — a real DLS
checkbox state, and the reason it is here rather than in the one feature
that needed it first: a
two-state checkbox forces every such header to either lie (unchecked over
a partial selection) or drop out of the kit into a raw <input>, and the
second of those puts a control DLS owns outside the layer that reskins it.

It is a PRESENTATION state, not a third value: `checked` stays a boolean,
`indeterminate` only overrides how an UNCHECKED box draws, and clicking
still reports a plain boolean. The native input carries the DOM property
too, so assistive tech announces `mixed` rather than the dash being
decoration only.

── DLS REPLICA (REGISTER.md §10, audited 2 Sep 2026) ────────

Extended onto the full `checkbox-input` set (Figma 405:15, states
Default | Hover | Focus | Focus hover | Disabled | Read-only | Error ×
Unchecked/Checked/Indeterminate) and `checkbox` (406:2358, input + label +
optional description). Four new states beyond the Z3 baseline:

- **Hover** (12776:112018) — a 4px INNER ring of
  `--color-bg-success-subtlest` inside the 20px box (box-shadow, so it
  never shifts layout) — on an UNCHECKED box only. **OWNER OVERRIDE OF
  THE DLS NODE (kit-fixes walk item 14, 6 Sep 2026):** DLS's "Checked
  hover" frame layers the same ring over the checked fill; the owner
  ruled that an already-checked (or indeterminate) box shows NO hover
  ring — its computed `box-shadow` stays `none` under the pointer. The
  focus ring is unchanged for every state (checkbox.scss).
- **Focus** (405:22) — a 2px INNER ring of `--color-focus`, replacing the
  old outer 25%-alpha `--focus-ring`. When a box is both hovered and
  keyboard-focused, the focus ring wins (checkbox.scss orders the combo
  selector after the hover rule so the two-class tie resolves that way).
- **`readonly`** (70211:340550) — not interactive: the native input stays
  in the tab order (DLS lists a "Read-only focus" state) but `onToggle`
  intercepts `change` and snaps the DOM checkbox back to the model's
  value, since HTML's `readonly` attribute is a no-op on
  `type="checkbox"`. Checked fill is the paler
  `--color-icon-selected-disabled`; unchecked is a plain white box with
  an `--color-icon-disabled` border. `aria-readonly` is set either way.
- **`invalid`** (405:24 / 70211:340714) — the kit's shared error contract
  (see `ui-text-input`'s `invalid`/`errorMessage`, though this component
  only takes the boolean half; a wrapping `ui-checkbox-group` carries the
  message). Unchecked: `--color-bg-danger-subtlest` fill,
  `--color-danger` border (= DLS `icon-danger`, not duplicated as a
  second token — see tokens.css). Checked: `--color-danger` fill, white
  glyph. `aria-invalid` follows.
- **`description`** — a second line under the label, kit `body(sm)` in
  `--color-text-subtle`, 4px below. Its presence flips the wrap from
  `align-items: center` to `align-items: flex-start` (the label block no
  longer centres against a single line), and the label itself keeps a
  `min-height: 20px` with its own internal centring so the label TEXT
  still lines up with the box's vertical centre exactly as it does today
  with no description.

DLS keeps a 2px border in the same `icon-selected` green on a CHECKED
box; this kit's checked box has always painted checked as fill-with-no-
border, which is identical paint (the border and fill are the same
colour) — left as-is rather than added as a no-op border, but called out
here so it isn't mistaken for an unaudited gap.

Label stays kit `label(sm)` (13px) — the owner's compactness ruling
carried over from the Z3 build, not DLS's own `label/md` (16px).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `disabled` | `(inferred)` | `false` |
| `indeterminate` | `(inferred)` | `false` |
| `readonly` | `(inferred)` | `false` |
| `invalid` | `(inferred)` | `false` |
| `description` | `string` | — |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `checked` | `(inferred)` | `false` |

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
</div>
    <div class="demos">
      <div class="row cb-states-row">
        <ui-checkbox [(checked)]="agreed">Unchecked</ui-checkbox>
        <ui-checkbox [checked]="true">Checked</ui-checkbox>
        <ui-checkbox [indeterminate]="true">Indeterminate</ui-checkbox>
        <ui-checkbox [disabled]="true">Disabled — unchecked</ui-checkbox>
        <ui-checkbox [disabled]="true" [checked]="true">Disabled — checked</ui-checkbox>
        <ui-checkbox [readonly]="true" [checked]="true">Read-only — checked</ui-checkbox>
        <ui-checkbox [invalid]="true">Invalid</ui-checkbox>
        <ui-checkbox [invalid]="true" [checked]="true">Invalid — checked</ui-checkbox>
      </div>
      <p class="hint">Checked: {{ agreed() }}</p>

      <h3>With a description</h3>
      <div class="row cb-description-row">
        <ui-checkbox description="Applies to weekday shifts only, excluding public holidays.">
          Remote working
        </ui-checkbox>
      </div>
    </div>
  </section>
```


## Provenance

REGISTER.md §10 (optional background — no Figma access required to use this component)
