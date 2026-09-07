# UiSwitch

**Selector:** `ui-switch`

**Import**

```ts
import { UiSwitch } from 'ai-dls-kit';
```

## Description

DLS `Switch` (REGISTER.md §39, Figma 84975:347031 — the
16-symbol set On/Off × Default/Hover/Focus/Disabled × Small/Medium;
rebuilt to the harvested anatomy in the 6 Sep 2026 kit-fixes pass, item
30, after the first build painted the wrong layer).

── ANATOMY (Small symbol 84975:347066) ──────────────────────────────────
`container` → `focus-ring` → `track` → `knob`, and it is the CONTAINER
that carries the state colour: the `<button class="ui-switch">` IS the
28×18 filled pill (`--radius-pill`). Inside it, `.track` is a transparent
20×10 positioning box inset 4px on every side (the `focus-ring` frame's
padding), and `.knob` is a 10×10 disc sitting in that box — at its left
edge off, `translateX(10px)` on (travel = track 20 − knob 10). The knob is
`--color-bg-level1` white with `--shadow-elevation-1`; disabled tints it
`--color-bg-disabled` (both disabled symbols carry that fill).

Container colour per state (all `color/icon/…` roles, §39 "container
pill: On = icon-selected"):
  On   `--color-icon-selected` → hover `--color-icon-selected-hover`
       → disabled `--color-icon-selected-disabled`
  Off  `--color-icon-decorative` → hover `--color-icon-hover`
       → disabled `--color-icon-disabled`
Focus-visible = a 2px `--color-focus` ring on the `focus-ring` frame,
which is the same 28×18 box as the container — drawn as an INSET
box-shadow on the pill so the footprint never changes.

── SIZE ─────────────────────────────────────────────────────────────────
`size="small"` (default — the platform uses small only, owner's 6 Sep
ruling) is the 28×18 geometry above. `size="medium"` is DLS's own
"default" size: 40×24 pill, 32×16 track, 16px knob, travel 16, the same
4px inset. The host carries `ui-switch--medium` for it; small adds no
class so every existing consumer and spec sees the same DOM as before.

Renders as a single control; place a label next to it in the consumer's
template:

  <label class="switch-wrap"><ui-switch [(checked)]="aiSwitch" /> Use AI to pre-fill</label>

Replaces `ui-toggle` (deleted — see lib/toggle history
via `git log --follow` if you need the old 40x22 geometry).

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `disabled` | `(inferred)` | `false` |
| `name` | `(inferred)` | `''` |
| `ariaLabel` | `(inferred)` | `''` |
| `size` | `UiSwitchSize` | `'small'` |

**Two-way bindings (`model()`)**

| Name | Type | Default |
| --- | --- | --- |
| `checked` | `(inferred)` | `false` |

## Types

```ts
export type UiSwitchSize = 'small' | 'medium';
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
"just tell me" form (the monitoring app's ongoing-clarification card clears its badge on each
        expand this way) — and stays uncontrolled until its first toggle.
      </p>
      <label class="toggle-wrap" id="accordion-controlled-switch"><ui-switch [(checked)]="accControlled" /> Open</label>
      <p class="hint" id="accordion-controlled-readout">
        Parent state: <code>{{ accControlled() }}</code>. <code>expandedChange</code> fired
        <code>{{ accExpandedEvents().length }}</code> time(s)@if (accExpandedEvents().length) {: <code>{{ accExpandedEvents().join(', ') }}</code>}.
      </p>
      <div class="accordion-slot-demos" id="accordion-controlled-demos">
        <ui-accordion title="Controlled by the switch" [expanded]="accControlled()" (expandedChange)="onAccControlledChange($event)" id="accordion-controlled">
          <div class="accordion-demo-body"><p class="hint">Click the header or flip the switch — both move the same signal. Only a header click adds to the event count.</p></div>
        </ui-accordion>
        <ui-accordion title="Listening only" [defaultOpen]="false" (expandedChange)="accListenOnlyEvents.update(list => [...list, $event])" id="accordion-listen-only">
          <div class="accordion-demo-body"><p class="hint">No <code>[expanded]</code> binding — uncontrolled, seeded closed. Heard: <code>{{ accListenOnlyEvents().join(', ') || '—' }}</code>.</p></div>
        </ui-accordion>
      </div>
    </div>
  </section>
```


## Provenance

REGISTER.md §39 (optional background — no Figma access required to use this component)
