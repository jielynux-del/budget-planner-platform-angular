# UiCheckboxGroup

**Selector:** `ui-checkbox-group`

**Import**

```ts
import { UiCheckboxGroup } from 'ai-dls-kit';
```

## Description

DLS `checkbox-group` (REGISTER.md §10, Figma 132957:3943,
audited 2 Sep 2026) — the field wrapper around a vertical stack of
`ui-checkbox`es: a label row (optional "(optional)" suffix + an optional
16px info glyph), an optional error message, then the list.

  <ui-checkbox-group label="Notification channels" info="Choose at least one">
    <ui-checkbox [(checked)]="email">Email</ui-checkbox>
    <ui-checkbox [(checked)]="sms">SMS</ui-checkbox>
  </ui-checkbox-group>

  <ui-checkbox-group label="Approvers" [optional]="true" />

  <ui-checkbox-group label="Approvers" [invalid]="true" errorMessage="Pick at least one">
    <ui-checkbox [(checked)]="a" [invalid]="true">Haruto SATO</ui-checkbox>
    <ui-checkbox [(checked)]="b" [invalid]="true">Mei KOBAYASHI</ui-checkbox>
  </ui-checkbox-group>

`invalid` + `errorMessage` mirror the kit's shared error contract
(`ui-text-input`'s), scaled up to a GROUP: the message renders once,
under the label, rather than once per child (DLS's own "Error - for one
option" variant — a message under a single option instead — is a
per-`ui-checkbox` concern and isn't modelled here). Marking the group
`invalid` does NOT cascade an `invalid` state onto the projected
children — Angular content projection has no channel to reach into a
`<ng-content>` child's own `input()` from the parent's TypeScript, so a
caller who also wants each option to paint invalid passes `[invalid]`
to those `ui-checkbox`es directly (see the second example above). This
mirrors DLS's own decoupling: the frame shows the group error text and
individually-invalid options as separate, independently-set things.

`readonly` follows the same pattern for the same reason: DLS's
Read-only variant renders a checked option's LABEL as plain text with no
box: `ui-checkbox-group`'s `readonly` input exists for documentation and
host-level presentation — a caller wanting the DLS
read-only look passes `[readonly]="true"` to the projected `ui-checkbox`
children themselves, which already implements the "not interactive,
paler checked fill" half of it (checkbox.ts). Rendering the checked
label as bare text instead of a checkbox glyph is a further, opt-in step
left to the caller's own template today — no reference-app call site needs it
yet.

`info`, when set, renders a 16px info-circle glyph after the label,
carrying the text as a `[uiTooltip]` (hover/focus, matching the tooltip
directive's own contract) — built as `{ title: info(), lines: [] }`
since the group only ever has one short line to say, not the tooltip's
full title/lines/footer anatomy.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` | `(inferred)` | `''` |
| `optional` | `(inferred)` | `false` |
| `invalid` | `(inferred)` | `false` |
| `errorMessage` | `(inferred)` | `''` |
| `info` | `string` | — |
| `readonly` | `(inferred)` | `false` |

## Slots

- Default (unnamed) content projection


## Example

From the kit's kitchen sink:

```html
<div class="demos">
      <h3>Default, with an info tooltip</h3>
      <div class="row cbg-default-row">
        <ui-checkbox-group label="Notification channels" info="Choose at least one channel">
          <ui-checkbox [(checked)]="cbgEmail">Email</ui-checkbox>
          <ui-checkbox [(checked)]="cbgSms">SMS</ui-checkbox>
          <ui-checkbox [(checked)]="cbgPush">Push notification</ui-checkbox>
        </ui-checkbox-group>
      </div>

      <h3>Invalid, with an error message</h3>
      <div class="row cbg-error-row">
        <ui-checkbox-group label="Approvers" [invalid]="true" errorMessage="Pick at least one approver">
          <ui-checkbox [invalid]="true">Haruto SATO</ui-checkbox>
          <ui-checkbox [invalid]="true">Mei KOBAYASHI</ui-checkbox>
        </ui-checkbox-group>
      </div>

      <h3>Optional field</h3>
      <div class="row cbg-optional-row">
        <ui-checkbox-group label="Additional permissions" [optional]="true">
          <ui-checkbox>Export data</ui-checkbox>
          <ui-checkbox>Delete records</ui-checkbox>
        </ui-checkbox-group>
      </div>
    </div>
  </section>
```


## Provenance

REGISTER.md §10 (optional background — no Figma access required to use this component)
