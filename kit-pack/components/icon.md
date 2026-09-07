# UiIcon

**Selector:** `ui-icon`

**Import**

```ts
import { UiIcon } from 'ai-dls-kit';
```

## Description

DLS icon — the kit's ONE way to draw a glyph (KIT-FIXES B1, 6 Sep 2026).

  <ui-icon name="chevron-down" />
  <ui-icon name="download" [size]="24" />
  <ui-icon name="delete" ariaLabel="Delete request" />

Takes a NAME, never a path. `name` is typed `UiIconName` (= the registry's
`keyof`), so a glyph the kit does not have is a compile error at every
TypeScript call site, and an unknown name reaching the component at runtime
— the template-only typo the type cannot see — THROWS rather than painting
a blank 16px box. A missing icon should be loud.

── Colour: the glyph never carries one ─────────────────────────────────
Each registry shape declares `paint: 'fill' | 'stroke'` — a ROLE, not a
value — and this component supplies `currentColor` for whichever it is.
So an icon is always the colour of its context (`color` on any ancestor,
a button's own `--color-icon`, the nav rail's inverse text) and no call
site can hard-code a colour into a glyph. That is also why the two-tone
status badges (a filled disc with a knockout mark) are NOT in the
registry: they need two colours by definition, which makes them DLS's
separate `status-icon` / `circular-icon` components, not icons. See
The reference app's internal notes §2.

── Size is the BOX, the viewBox is the drawing ─────────────────────────
`size` is 16 (default) or 24 — the two boxes DLS ships — and it is set as
the `<svg>`'s own width/height, so the rendered square is exactly 16 or 24
whatever the glyph's `viewBox` happens to be. The registry keeps a
separate entry per size because DLS redraws a glyph for its box (a 24
chevron is not a scaled 16 chevron); where only one drawing exists today,
both slots hold it and the stand-in slot says so in its `note`.

── Accessibility ───────────────────────────────────────────────────────
Default is `aria-hidden="true"` — the overwhelmingly common case is a
glyph beside a label, or inside a `ui-icon-button` that already carries
its own `aria-label`, and announcing it twice is worse than not at all.
Passing `ariaLabel` flips the SVG to `role="img"` with that name and drops
the `aria-hidden`, for the rare icon that IS the content.

── Two tiers, and why a consumer never sees them ─────────────────
The catalogue is 569 names and heading for 598; a name lookup cannot be
tree-shaken, so binding them all in one object literal put every glyph in
every build (349 KB gzipped at 598, for the ~84 this platform draws). So
the catalogue is split, and the split line is the FIRST PAINT: 3 names are
STATICALLY bundled (`./eager.ts`) and every other name sits behind an
`import()` (`./manifest.ts`) — to its DLS category chunk, or to the one
`platform` chunk holding the 81 this app draws away from the landing route.
Until 7 Sep 2026 all 84 of those were eager, which cost `main` 81,390 bytes
of geometry for icons no first paint renders; `./eager.ts` has the numbers.

The difference is invisible at the call site — `name`, `size` and
`ariaLabel` behave identically — and nearly invisible on screen:
 - an EAGER name renders in the first frame, synchronously, as before;
 - a LAZY name renders its `<svg>` immediately at exactly `size` px, empty,
   and fills in when its chunk lands. The box is reserved from the first
   frame, so nothing reflows around it and the aria contract is already
   correct before the geometry exists.
A chunk that fails to load logs loudly and rethrows out of band rather
than leaving a silent empty square (see ./loader.ts).

SEEDED GEOMETRY. 57 of the 84 glyphs the platform draws were lifted
verbatim from inline SVGs already shipping in this repo; the real source of
truth is the owner's Figma file "DLS 3.1 — Icons"
(`fIR6ucxPfotL8VkIk6RoZg`, page `0:1`). When
that export lands it is a mechanical swap inside `./glyphs/` — this
component and every call site are unaffected, because they name an icon
rather than describe one.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `name` (required) | `UiIconName` | — |
| `size` | `UiIconSize` | `16` |
| `ariaLabel` | `string | null` | `null` |

## Types

The catalogue's NAMES — a type, and nothing but a type.

THIS FILE EMITS NO JAVASCRIPT AT ALL. It is 569 string literals in a union
and not one runtime binding, so importing it — however many barrels the
import travels through — cannot put a byte in anyone's bundle. That is the
whole reason it is separate from ./catalogue.ts, which holds the same 569
names as a real array: the TYPE is needed everywhere,
the ARRAY is needed by exactly one page.

WHY THE UNION IS WRITTEN OUT rather than derived from the array with
`(typeof UI_ICON_NAMES)[number]`, which is what it used to be. Deriving it
is tidier to read and it is what put an 8,110-byte string array into
`main`: the derivation forces the type's module to also hold the value, and
anything that imports `ui-icon` (the nav rail, on the first route) drags
that module into the initial bundle whether or not it ever reads the array.
Writing the union out is what lets the two live in different chunks.

DRIFT IS A COMPILE ERROR, both ways. ./catalogue.ts asserts that this union
and that array hold exactly the same names — a name here and not there, or
there and not here, fails `tsc` and names the offender. See the assertions
at the foot of that file; they are the reason two declarations of one list
is safe rather than a bug waiting to happen.

The union is EXACT: an unknown name is a compile error at every TypeScript
call site, which is the whole reason the registry is typed rather than
stringly. `ui-icon` also throws on an unknown name at runtime, which is
what catches a template-only typo the type cannot see.

GENERATED from the registry. Adding a name means adding it HERE, in
./catalogue.ts, and giving it a glyph in exactly one tier: ./eager.ts (with
its geometry in ./glyphs/eager.ts) or ./manifest.ts (with its geometry in
./glyphs/<category>.ts, or ./glyphs/platform.ts if the platform draws it
off the first paint). A name with no glyph in either tier fails the
exhaustiveness check in ./manifest.ts at BUILD time.

```ts
export type UiIconName =
  | 'admin-setting'
  | 'admin-setting-filled'
  | 'airplane-shield'
  | 'airplay'
  | 'alarm-reminder-vibrate'
  | 'align-center'
  | 'align-justify'
  | 'align-left'
  | 'align-right'
  | 'ambulance'
  | 'anchor'
  | 'aperture'
  | 'archive'
  | 'arrow-corner-down-right'
  | 'arrow-down'
  | 'arrow-down-circle'
  | 'arrow-down-filled'
  | 'arrow-down-left'
  | 'arrow-down-right'
  | 'arrow-left'
  | 'arrow-left-circle'
  | 'arrow-redo'
  | 'arrow-right'
  | 'arrow-right-circle'
  | 'arrow-right-filled'
  | 'arrow-trending-down'
  | 'arrow-trending-up'
  | 'arrow-undo'
  | 'arrow-up'
  | 'arrow-up-circle'
  | 'arrow-up-filled'
  | 'arrow-up-left'
  | 'arrow-up-right'
  | 'arrows-up-down-filled'
  | 'at-sign'
  | 'atm'
  | 'award'
  | 'backspace'
  | 'bag-cash'
  | 'bag-cash-up'
  | 'bank-account'
  | 'bank-delete'
  | 'bank-limit'
  | 'bank-mail'
  | 'bank-plus'
  | 'bank-repeat'
  | 'bank-to-bank'
  | 'bar-chart'
  | 'bar-chart-ascending'
  | 'basketball'
  | 'battery'
  | 'battery-charging'
  | 'beauty-lipstick'
  | 'bell'
  | 'bell-alert'
  | 'bell-filled'
  | 'bell-off'
  | 'block'
  | 'bluetooth'
  | 'bold'
  | 'book'
  | 'book-bank-account'
  | 'book-open'
  | 'book-search'
  | 'bookmark'
  | 'bookmark-filled'
  | 'box'
  | 'box-open'
  | 'branch'
  | 'branch-location'
  | 'briefcase-filled'
  | 'briefcase-stat'
  | 'bubble-bulb'
  | 'bubble-burst'
  | 'business-chart'
  | 'cable-tv'
  | 'calculator-leaf'
  | 'calendar'
  | 'calendar-bank'
  | 'calendar-money'
  | 'call-document'
  | 'camera'
  | 'camera-off'
  | 'car-front'
  | 'card-bank-building'
  | 'card-dollar-sign'
  | 'card-limit'
  | 'card-lock'
  | 'card-plus-square'
  | 'card-stack-coins'
  | 'card-to-card'
  | 'card-to-card-triangle'
  | 'card-to-mobile'
  | 'card-verify'
  | 'card-view-hide'
  | 'caret-down'
  | 'caret-right'
  | 'cart-plant'
  | 'cash-chart'
  | 'cash-deactivation'
  | 'cash-deposit'
  | 'cash-hand-pickup'
  | 'cash-stacked-coins'
  | 'cash-withdrawn'
  | 'cast'
  | 'chart-bar'
  | 'chart-circle'
  | 'chart-search'
  | 'chart-up'
  | 'charts-copy'
  | 'chat'
  | 'chat-dollar'
  | 'chat-dollar-filled'
  | 'chatbot'
  | 'check'
  | 'check-circle'
  | 'check-square'
  | 'checkbox-dash'
  | 'checkbox-tick'
  | 'checklist-pen'
  | 'checklist-pen-filled'
  | 'chevron-double-left'
  | 'chevron-double-right'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-left-last'
  | 'chevron-right'
  | 'chevron-right-last'
  | 'chevron-top-last'
  | 'chevron-up'
  | 'chevrons-down'
  | 'chevrons-left'
  | 'chevrons-right'
  | 'chevrons-up'
  | 'chrome'
  | 'circle'
  | 'circle-checkmark'
  | 'circle-checkmark-filled'
  | 'circle-clipboard-filled'
  | 'circle-clock-filled'
  | 'circle-exclamation'
  | 'circle-exclamation-filled'
  | 'circle-information'
  | 'circle-information-filled'
  | 'circle-phone'
  | 'circle-question'
  | 'circle-x'
  | 'circle-x-filled'
  | 'clear-filled'
  | 'clipboard'
  | 'clipboard-with-checkmark'
  | 'clock'
  | 'clock-pending'
  | 'clockwise-arrows'
  | 'close'
  | 'cloud'
  | 'cloud-download'
  | 'cloud-drizzle'
  | 'cloud-lightning'
  | 'cloud-off'
  | 'cloud-rain'
  | 'cloud-snow'
  | 'cloud-upload'
  | 'code'
  | 'codepen'
  | 'codesandbox'
  | 'coins-crypto'
  | 'coins-stack'
  | 'color-palette'
  | 'columns'
  | 'command'
  | 'comment-pencil'
  | 'comment-pencil-filled'
  | 'company-building'
  | 'compass'
  | 'contactless-card'
  | 'contrast'
  | 'copy'
  | 'corner-down-left'
  | 'corner-down-right'
  | 'corner-left-down'
  | 'corner-left-up'
  | 'corner-right-down'
  | 'corner-right-up'
  | 'corner-up-left'
  | 'corner-up-right'
  | 'counter-clockwise-arrows'
  | 'coupon-percent'
  | 'coupon-percent-filled'
  | 'cpu'
  | 'credit-card'
  | 'crop'
  | 'crosshair'
  | 'crypto'
  | 'cup'
  | 'currency-exchange'
  | 'currency-exchange-coins'
  | 'cursor-default'
  | 'cursor-move'
  | 'database'
  | 'dbs-logo'
  | 'delete'
  | 'delete-card'
  | 'deposit'
  | 'diagonal-inward-arrows'
  | 'diagonal-outward-arrows'
  | 'digistore'
  | 'disc'
  | 'divide'
  | 'document'
  | 'document-chart'
  | 'document-checkmark'
  | 'document-compass'
  | 'document-compass-filled'
  | 'document-lines'
  | 'document-pdf'
  | 'document-pen'
  | 'document-pen-filled'
  | 'document-percent'
  | 'document-user'
  | 'dollar-sign'
  | 'dollar-sign-single'
  | 'dollar-square-filled'
  | 'dollar-stats'
  | 'double-lines-horizontal'
  | 'download'
  | 'dribbble'
  | 'droplet'
  | 'dual-currency'
  | 'edit'
  | 'edit-box'
  | 'edit-line'
  | 'electricity'
  | 'electricity-off'
  | 'estatement'
  | 'exchange'
  | 'exclamation'
  | 'external-link'
  | 'eye'
  | 'eye-money'
  | 'eye-off'
  | 'facebook'
  | 'fashion-shirt'
  | 'fast-forward'
  | 'feather'
  | 'figma'
  | 'file'
  | 'file-clock'
  | 'file-csv'
  | 'file-doc'
  | 'file-image'
  | 'file-link'
  | 'file-minus'
  | 'file-pdf'
  | 'file-plus'
  | 'file-ppt'
  | 'file-text'
  | 'file-xls'
  | 'film'
  | 'filter'
  | 'filter-funnel'
  | 'filter-off'
  | 'filter-simple'
  | 'filter-simple-off'
  | 'finger-print'
  | 'flag'
  | 'flag-filled'
  | 'flashlight'
  | 'flashlight-filled'
  | 'floppy-disk'
  | 'folder'
  | 'folder-minus'
  | 'folder-open'
  | 'folder-plus'
  | 'framer'
  | 'funnel-filter-document'
  | 'gauge'
  | 'gauge-meter'
  | 'gear'
  | 'gear-shield'
  | 'genai'
  | 'giftbox'
  | 'git-commit'
  | 'github'
  | 'gitlab'
  | 'give-hand-cash'
  | 'give-hand-coins'
  | 'give-hand-heart'
  | 'glass-cheers'
  | 'globe'
  | 'globe-arrows-clockwise'
  | 'globe-arrows-counter-clockwise'
  | 'globe-bank'
  | 'globe-checked'
  | 'globe-dollar-sign'
  | 'globe-live'
  | 'globe-visa'
  | 'gold-bar'
  | 'grid'
  | 'grid-filled'
  | 'grid-layout'
  | 'group-circle'
  | 'hammer-gavel-legal'
  | 'hand-cash'
  | 'hand-credit-card'
  | 'hand-document'
  | 'hand-stacked-coins'
  | 'handshake'
  | 'hard-drive'
  | 'hard-token'
  | 'hash'
  | 'headphones'
  | 'headphones-mic'
  | 'headphones-mic-smile'
  | 'headphones-mic-smile-filled'
  | 'health-hand'
  | 'health-shield'
  | 'heart'
  | 'heart-checkmark'
  | 'heart-filled'
  | 'heart-hand'
  | 'help'
  | 'hexagon'
  | 'history'
  | 'home'
  | 'home-tab'
  | 'home-tab-filled'
  | 'hospital'
  | 'hospital-building'
  | 'house'
  | 'house-chimney'
  | 'idcard'
  | 'idcard-filled'
  | 'image'
  | 'in-out-arrow'
  | 'inbox'
  | 'info'
  | 'info-faqs'
  | 'instagram'
  | 'invest-tab'
  | 'invest-tab-filled'
  | 'italic'
  | 'key'
  | 'keyboard'
  | 'landline-phone'
  | 'language-translate'
  | 'layers'
  | 'layout'
  | 'left-right-arrows'
  | 'left-right-half-arrows'
  | 'letter-big'
  | 'letter-small'
  | 'life-buoy'
  | 'light-bulb'
  | 'lightbulb-filled'
  | 'link'
  | 'link-horizontal'
  | 'linkedin'
  | 'list'
  | 'list-academic'
  | 'list-bullet'
  | 'list-search'
  | 'list-search-filled'
  | 'list-stacked-coins'
  | 'loader'
  | 'loading-circle'
  | 'lock'
  | 'lock-round'
  | 'log-in'
  | 'log-out'
  | 'logo-social-line'
  | 'logo-social-telegram'
  | 'logo-social-tiktok'
  | 'logo-social-whatsapp'
  | 'logo-social-x'
  | 'magnifying-glass'
  | 'mail'
  | 'mail-open'
  | 'manage-account'
  | 'map'
  | 'map-pin'
  | 'map-pin-cn'
  | 'map-pin-filled'
  | 'marker'
  | 'maximize'
  | 'maximize-circle'
  | 'meals-fnb'
  | 'medical-card'
  | 'megaphone'
  | 'menu'
  | 'mic'
  | 'mic-off'
  | 'minimize'
  | 'minus'
  | 'minus-circle'
  | 'minus-circle-filled'
  | 'minus-square'
  | 'minus-symbol'
  | 'misty'
  | 'mobile-message'
  | 'mobile-pay'
  | 'money-bank-calculator'
  | 'money-plant'
  | 'monitor'
  | 'moon'
  | 'more-horizontal'
  | 'more-vertical'
  | 'mortar-hat'
  | 'mortgage'
  | 'multi-select-toggle'
  | 'music'
  | 'navigation'
  | 'navigation-circle'
  | 'note'
  | 'octagon'
  | 'octagon-information'
  | 'octagon-x'
  | 'paint-roller'
  | 'paperclip'
  | 'papyrus-scroll'
  | 'password'
  | 'pause'
  | 'pause-circle'
  | 'pay-and-transfer-tab'
  | 'pay-and-transfer-tab-filled'
  | 'pen-note'
  | 'pen-tool'
  | 'pencil'
  | 'pencil-line'
  | 'people-conversation'
  | 'percent'
  | 'phone'
  | 'phone-book'
  | 'phone-call'
  | 'phone-end'
  | 'phone-forwarded'
  | 'phone-incoming'
  | 'phone-missed'
  | 'phone-off'
  | 'phone-outgoing'
  | 'pie-chart'
  | 'pie-chart-segments'
  | 'pin'
  | 'pin-checked'
  | 'pin-filled'
  | 'pin-key'
  | 'plan-tab'
  | 'plan-tab-filled'
  | 'plant-sustainability'
  | 'play'
  | 'play-circle'
  | 'plus'
  | 'plus-circle'
  | 'plus-circle-filled'
  | 'plus-square'
  | 'plus-symbol'
  | 'pocket'
  | 'posb-logo'
  | 'power'
  | 'presentation'
  | 'print'
  | 'printer'
  | 'pulse'
  | 'pyramid'
  | 'qr-code'
  | 'question-mark'
  | 'radar'
  | 'radio'
  | 'radio-disc'
  | 'rain-thunder'
  | 'raining'
  | 'receipt-bank-account'
  | 'receipt-bill'
  | 'red-envelope'
  | 'refresh'
  | 'repeat'
  | 'replace-card'
  | 'report'
  | 'report-issue'
  | 'resize-handle'
  | 'rewards-crown'
  | 'rewind'
  | 'rotate-clockwise'
  | 'rotate-counter-clockwise'
  | 'rotate-device'
  | 'rotate-leaf'
  | 'rss'
  | 'safe-deposit-box'
  | 'scanner'
  | 'scanner-barcode'
  | 'scanner-face-id'
  | 'scissors'
  | 'search'
  | 'send'
  | 'server'
  | 'settings'
  | 'share'
  | 'share-connect'
  | 'shield'
  | 'shield-alert-filled'
  | 'shield-lock'
  | 'shield-off'
  | 'shop-basket'
  | 'shop-front'
  | 'shop-star'
  | 'shopping-bag'
  | 'shopping-basket'
  | 'shopping-cart'
  | 'shuffle'
  | 'sidebar'
  | 'siren'
  | 'skip-backward'
  | 'skip-forward'
  | 'slack'
  | 'slash'
  | 'sliders'
  | 'smartphone'
  | 'smiley-emotionless'
  | 'smiley-happy'
  | 'smiley-sad'
  | 'smiley-very-happy'
  | 'snow'
  | 'sort'
  | 'sort-ascending'
  | 'sort-descending'
  | 'spanner'
  | 'spark-stars'
  | 'sparkle'
  | 'speaker'
  | 'speech-bubble-round'
  | 'speech-bubble-smile'
  | 'speech-bubble-square'
  | 'speedometer'
  | 'speedometer-filled'
  | 'square'
  | 'square-chart'
  | 'square-check'
  | 'square-dot'
  | 'square-pencil'
  | 'square-to-square'
  | 'square-x'
  | 'star'
  | 'star-filled'
  | 'star-half'
  | 'stop-circle'
  | 'stop-circle-filled'
  | 'structure-organization'
  | 'sun'
  | 'sun-cloud'
  | 'sunny'
  | 'sunrise'
  | 'sunset'
  | 'swap'
  | 'table'
  | 'table-column-artboard'
  | 'table-column-delete'
  | 'table-sort'
  | 'tablet'
  | 'tag'
  | 'target'
  | 'text-color'
  | 'text-style'
  | 'text-wrap'
  | 'upload'
  | 'user'
  | 'user-filled'
  | 'users'
  | 'warning-circle'
  | 'warning-filled';
```

The two boxes the kit draws icons in.

```ts
export type UiIconSize = 16 | 24;
```

One drawn primitive. `paint` is the only colour-adjacent field — and it
    names a ROLE, never a value.

```ts
export interface UiIconShape {
  readonly kind: 'path' | 'circle' | 'rect' | 'line';
  readonly paint: 'fill' | 'stroke';
  /** path */
  readonly d?: string;
  /** circle */
  readonly cx?: number;
  readonly cy?: number;
  readonly r?: number;
  /** rect */
  readonly x?: number;
  readonly y?: number;
  readonly w?: number;
  readonly h?: number;
  readonly rx?: number;
  /** line */
  readonly x1?: number;
  readonly y1?: number;
  readonly x2?: number;
  readonly y2?: number;
  /** stroke-width / linecap / linejoin, and fill-rule="evenodd". */
  readonly sw?: number;
  readonly cap?: string;
  readonly join?: string;
  readonly evenodd?: boolean;
}
```

One glyph at one size.

```ts
export interface UiIconGlyph {
  /** The geometry's own box — scaled into the rendered 16/24 square. */
  readonly viewBox: string;
  /** file:line this geometry was lifted from (delete on the DLS export). */
  readonly source: string;
  /** Why this slot is a stand-in, when it is one. */
  readonly note?: string;
  readonly shapes: readonly UiIconShape[];
}
```

A registry row: the same name at both sizes.

```ts
export interface UiIconEntry {
  readonly 16: UiIconGlyph;
  readonly 24: UiIconGlyph;
}
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<ui-badge [label]="4" />
          </div>
          <button accordion-actions ui-icon-button size="tiny" type="button" aria-label="Edit the reference app">
            <ui-icon name="…" />
          </button>
          <button accordion-actions ui-icon-button size="tiny" type="button" aria-label="Revoke the reference app access">
            <ui-icon name="…" />
          </button>
          <div class="accordion-demo-body"><p class="hint">(a) System Access platform header — name + count badge, edit / revoke icon-buttons in <code>[accordion-actions]</code>. Both actions stop propagation via the slot, so neither toggles.</p></div>
        </ui-accordion>
        <ui-accordion title="Desk: FX Options" [defaultOpen]="false" id="accordion-header-slot-desk">
          <div accordion-header class="acc-slot-stack">
            <span class="acc-slot-name">Desk: FX Options</span>
            <span class="acc-slot-meta">
              <span>the desk lead: Haruto SATO</span>
              <span class="acc-slot-sep">|</span>
              <span>Location: Singapore</span>
              <span class="acc-slot-sep">|</span>
              <span>4 traders</span>
            </span>
          </div>
          <div class="accordion-demo-body"><p class="hint">(b) Profile desk-group header — name over a pipe-separated meta line (label/sm, text-subtle; pipes in text-disabled, as profile-mandates.scss draws them). Two lines grow the header past 48px, same as <code>subtitle</code> does.</p></div>
        </ui-accordion>
        <ui-accordion title="Clarification — Rates Desk" [defaultOpen]="false" id="accordion-header-slot-clarification">
          <div accordion-header class="acc-slot-row">
            <span class="acc-slot-name">Clarification — Rates Desk</span>
            <ui-status-tag label="Pending Response" variant="amber" />
          </div>
          <div class="accordion-demo-body"><p class="hint">(c) Inbox raised-clarification header — name + inline <code>ui-status-tag</code>. Tag and name share the 8px unit gap.</p></div>
        </ui-accordion>
        <ui-accordion title="Data rectification" barColor="purple" [defaultOpen]="false" id="accordion-header-slot-bar">
          <div accordion-header class="acc-slot-row">
            <span class="acc-slot-name">Data rectification</span>
            <ui-status-tag label="Issue Raised" variant="red" />
          </div>
          <div class="accordion-demo-body"><p class="hint">Slot + bar together — the projected header takes the bar's 16/16 offset exactly as the built-in title does.</p></div>
        </ui-accordion>
      </div>
      <div class="spacer"></div>
      <h3>Title-area toggle — controls in <code>[accordion-actions]</code></h3>
```

_A glyph in this excerpt reached the sink as an inline `<svg>` and is shown
here as the `<ui-icon>` that replaces it — fill in `name` from the catalogue in
[icon.md](./icon.md). An icon is named, never drawn (RULES.md #12)._


## Provenance

§2 (optional background — no Figma access required to use this component)
