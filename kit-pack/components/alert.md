# UiAlert

**Selector:** `ui-alert`

**Import**

```ts
import { UiAlert } from 'ai-dls-kit';
```

## Description

Chrome is shared across every variant: bg level_2, 1px danger border,
4px radius, elevation-2 shadow, 16/12 padding, 12px icon-to-content gap.
The four DLS variations fall out of which inputs are set, not separate
component modes:

  <ui-alert>Something needs your attention.</ui-alert>

  <ui-alert title="Invalid trade count">
    3 trades could not be matched to a portfolio.
  </ui-alert>

  <ui-alert title="Could not submit">
    Fix the errors below and try again.
    <button ui-alert-actions ui-button variant="secondary">Retry</button>
    <button ui-alert-actions ui-button variant="plain">Dismiss</button>
  </ui-alert>

  <ui-alert
    title="Some fields need correction"
    [anchors]="[{ label: 'SG mobile numbers have 8 digits', id: 'mobile' }]"
    (anchorActivated)="scrollToField($event)"
  >
    Review the highlighted fields and resubmit.
  </ui-alert>

`message` is the default-slot projected body (body/sm, --color-text-body)
— kept as plain content rather than a string input because callers already
reach for rich inline markup here (the DLS validation copy mixes plain
text and emphasis), matching ui-info-banner's own default-slot precedent.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `title` | `string | undefined` | `undefined` |
| `anchors` | `readonly UiAlertAnchor[]` | `[]` |

**Outputs**

| Name | Type |
| --- | --- |
| `anchorActivated` | `string` |

## Types

One entry in the `anchors` list — a jump target rendered as an underlined link.

```ts
export interface UiAlertAnchor {
  label: string;
  id: string;
}
```

## Slots

- Default (unnamed) content projection
- `select="[ui-alert-actions]"`


## Example

From the kit's kitchen sink:

```html
</div>
    <div class="demos">
      <h3>No title — single line</h3>
      <ui-alert>3 trades could not be matched to a portfolio.</ui-alert>
      <div class="spacer"></div>
      <h3>Title + body</h3>
      <ui-alert title="Invalid trade count">
        3 trades could not be matched to a portfolio. Review the table and try again.
      </ui-alert>
      <div class="spacer"></div>
      <h3>With actions</h3>
      <ui-alert title="Could not submit request">
        Fix the errors below and try again.
        <button ui-alert-actions ui-button variant="secondary" (click)="alertActionClicks.set(alertActionClicks() + 1)">Label</button>
        <!-- DLS pairs the secondary button with a plain TINY label/sm text action — the kit
             gained exactly that in the Button round (register §7), closing the gap this demo
             used to flag. -->
        <button ui-alert-actions ui-button variant="plain" size="tiny" (click)="alertActionClicks.set(alertActionClicks() + 1)">Label</button>
      </ui-alert>
      <p class="hint">Action clicked {{ alertActionClicks() }} time(s)</p>
      <div class="spacer"></div>
      <h3>With anchors</h3>
      <ui-alert
        title="Some fields need correction"
        [anchors]="[
          { label: 'SG mobile numbers have 8 digits', id: 'mobile' },
          { label: 'Trade date cannot be in the future', id: 'trade-date' },
          { label: 'Portfolio is required', id: 'portfolio' }
        ]"
        (anchorActivated)="alertLastAnchorId.set($event)"
      >
        Review the highlighted fields and resubmit.
      </ui-alert>
      <p class="hint">Last anchor activated: {{ alertLastAnchorId() ?? '—' }}</p>
    </div>
  </section>
```


## Provenance

REGISTER.md §2 (optional background — no Figma access required to use this component)
