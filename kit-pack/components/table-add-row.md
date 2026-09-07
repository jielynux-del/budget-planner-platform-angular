# UiTableAddRow

**Selector:** `tr[ui-table-add-row]`

**Import**

```ts
import { UiTableAddRow } from 'ai-dls-kit';
```

## Description

`tr[ui-table-add-row]` — the DLS Table "new patterns" add row (REGISTER.md §40, "add / delete item … '⊕ Add item' row under the
last row"). A full-width row holding a single tertiary/text button;
clicking it emits `add`. Applied as an attribute on a native `<tr>` so it
drops straight into an existing `<tbody>`:

  <tr ui-table-add-row [colspan]="6" (add)="addRow()"></tr>
  <tr ui-table-add-row label="Add trader" [colspan]="6" (add)="addTrader()"></tr>

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `label` | `(inferred)` | `'Add item'` |
| `colspan` | `(inferred)` | `1` |

**Outputs**

| Name | Type |
| --- | --- |
| `add` | `void` |

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<td>{{ row.desk }}</td>
            </tr>
          }
          <tr ui-table-add-row label="Add item" [colspan]="2" (add)="addRowSm()"></tr>
        </tbody>
      </table>
    </div>
  </section>
```


## Provenance

REGISTER.md §40 (optional background — no Figma access required to use this component)
