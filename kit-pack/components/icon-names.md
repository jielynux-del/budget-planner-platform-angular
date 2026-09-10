# Icon names — the full catalogue

Every name `<ui-icon name="…">` accepts, alphabetically. 570 of them.
Generated from the catalogue itself, so it cannot drift from what the kit
draws. Component API, sizes, colour and accessibility: [icon.md](./icon.md).

An icon is NAMED, never drawn (RULES.md #12). `name` is typed `UiIconName`,
a closed union, so a name that is not on this list is a compile error at
every TypeScript call site — precise, but it can only tell you the name is
wrong, never which name you meant. That is what the alias table below is for.

## Aliases — names people reach for that the catalogue does not use

Left column is what you are likely to type; right is what to type instead.
Rows marked **no match** are recorded deliberately: knowing the catalogue
does not have a glyph ends the search, and a glyph the kit cannot draw stays
an asset rather than becoming a hand-drawn approximation.

| You wanted | Use | Notes |
| --- | --- | --- |
| `expand` | `maximize` | Also `diagonal-outward-arrows` for the four-corners "expand to fill" glyph. |
| `collapse` | `minimize` | Also `diagonal-inward-arrows`. For a disclosure caret use `chevron-up`/`chevron-down`. |
| `fullscreen` | `maximize` | Same glyph as `expand`. |
| `trash` | `delete` | Also matches `bin`, `trash-can`, `remove`. `delete-card` is the card-specific one. |
| `dashboard` | `grid-layout` | NO exact match. `grid-layout` is the closest — a page split into panels. `grid` is the plain nine-square. |
| `people` | `people-conversation` | That is the two-people-talking glyph. For a plain group of people the name is `users`; for one person, `user`. |
| `group` | `users` | `group-circle` is the grouping/overlap mark, not a group of people. |
| `org-chart` | `structure-organization` | The hierarchy tree. |
| `cog` | `gear` | `settings` and `admin-setting` are also in the catalogue and differ in drawing. |
| `wrench` | `spanner` | British spelling wins here. |
| `magnifier` | `search` | `magnifying-glass` also exists — same idea, different DLS drawing. |
| `find` | `search` | — |
| `cross` | `close` | `circle-x` is the same mark inside a ring; `circle-x-filled` is the solid disc. |
| `cancel` | `close` | For a blocked/forbidden mark use `block`. |
| `tick` | `check` | `checkbox-tick` is the checkbox glyph; `square-check` and `circle-checkmark` are the boxed and ringed marks. |
| `warning` | `warning-filled` | NO plain `warning`. `warning-filled` is the solid triangle, `warning-circle` the ringed one, `exclamation` the bare mark. |
| `alert` | `warning-filled` | For a notification bell use `bell-alert`; for an urgent banner `siren`. |
| `error` | `circle-x-filled` | Or `warning-filled`. There is no name containing "error". |
| `success` | `circle-checkmark-filled` | Or `check-circle`. There is no name containing "success". |
| `save` | `floppy-disk` | The only save-shaped glyph in the catalogue. |
| `attach` | `paperclip` | — |
| `notification` | `bell` | `bell-alert` for the dotted/badged state, `bell-off` for muted. |
| `logout` | `log-out` | Hyphenated. Likewise `log-in`. |
| `profile` | `user` | `user-filled` is the solid variant; `idcard` is the credential. |
| `avatar` | `user` | — |
| `ellipsis` | `more-horizontal` | `more-vertical` for the vertical (kebab) menu. |
| `kebab` | `more-vertical` | — |
| `hamburger` | `menu` | — |
| `reload` | `refresh` | `clockwise-arrows` / `counter-clockwise-arrows` are the two-arrow cycles; `rotate-clockwise` is the single arc. |
| `sync` | `refresh` | Or `clockwise-arrows`. |
| `undo` | `arrow-undo` | Likewise `arrow-redo`. |
| `back` | `arrow-left` | For pagination ends use `chevron-left-last` / `chevron-right-last`. |
| `open-in-new` | `external-link` | Also matches `new-tab`, `launch`. |
| `duplicate` | `copy` | — |
| `spinner` | `loading-circle` | `loader` is the spoke variant. |
| `magic` | `spark-stars` | `genai` and `sparkle` are the other two AI marks. |
| `visibility` | `eye` | `eye-off` for hidden. `card-view-hide` is the card-number mask. |
| `drag` | `cursor-move` | `resize-handle` for the corner grip. |
| `graph` | `chart-bar` | The catalogue carries both orders — `bar-chart`, `chart-bar`, `bar-chart-ascending` — plus `pie-chart`, `chart-circle`, `business-chart`. |
| `money` | `dollar-sign` | The catalogue is deep here: `cash-*`, `coins-*`, `bag-cash`, `hand-cash`, `currency-exchange`. Search the list. |
| `toggle` | **no match** | NO match — a switch is the `ui-toggle` COMPONENT, not an icon. `multi-select-toggle` is the multi-select affordance. |
| `zoom-in` | **no match** | NO match, in either direction. Nearest in spirit is `maximize`. |
| `wifi` | **no match** | NO match. `bluetooth`, `cast` and `airplay` are the connectivity glyphs that do exist. |

## All 570 names


### A

- `admin-setting`
- `admin-setting-filled`
- `airplane-shield`
- `airplay`
- `alarm-reminder-vibrate`
- `align-center`
- `align-justify`
- `align-left`
- `align-right`
- `ambulance`
- `anchor`
- `aperture`
- `archive`
- `arrow-corner-down-right`
- `arrow-down`
- `arrow-down-circle`
- `arrow-down-filled`
- `arrow-down-left`
- `arrow-down-right`
- `arrow-left`
- `arrow-left-circle`
- `arrow-redo`
- `arrow-right`
- `arrow-right-circle`
- `arrow-right-filled`
- `arrow-trending-down`
- `arrow-trending-up`
- `arrow-undo`
- `arrow-up`
- `arrow-up-circle`
- `arrow-up-filled`
- `arrow-up-left`
- `arrow-up-right`
- `arrows-up-down-filled`
- `at-sign`
- `atm`
- `award`

### B

- `backspace`
- `bag-cash`
- `bag-cash-up`
- `bank-account`
- `bank-delete`
- `bank-limit`
- `bank-mail`
- `bank-plus`
- `bank-repeat`
- `bank-to-bank`
- `bar-chart`
- `bar-chart-ascending`
- `basketball`
- `battery`
- `battery-charging`
- `beauty-lipstick`
- `bell`
- `bell-alert`
- `bell-filled`
- `bell-off`
- `block`
- `bluetooth`
- `bold`
- `book`
- `book-bank-account`
- `book-open`
- `book-search`
- `bookmark`
- `bookmark-filled`
- `box`
- `box-open`
- `branch`
- `branch-location`
- `briefcase-filled`
- `briefcase-stat`
- `bubble-bulb`
- `bubble-burst`
- `business-chart`

### C

- `cable-tv`
- `calculator-leaf`
- `calendar`
- `calendar-bank`
- `calendar-money`
- `call-document`
- `camera`
- `camera-off`
- `car-front`
- `card-bank-building`
- `card-dollar-sign`
- `card-limit`
- `card-lock`
- `card-plus-square`
- `card-stack-coins`
- `card-to-card`
- `card-to-card-triangle`
- `card-to-mobile`
- `card-verify`
- `card-view-hide`
- `caret-down`
- `caret-right`
- `cart-plant`
- `cash-chart`
- `cash-deactivation`
- `cash-deposit`
- `cash-hand-pickup`
- `cash-stacked-coins`
- `cash-withdrawn`
- `cast`
- `chart-bar`
- `chart-circle`
- `chart-search`
- `chart-up`
- `charts-copy`
- `chat`
- `chat-dollar`
- `chat-dollar-filled`
- `chatbot`
- `check`
- `check-circle`
- `check-square`
- `checkbox-dash`
- `checkbox-tick`
- `checklist-pen`
- `checklist-pen-filled`
- `chevron-double-left`
- `chevron-double-right`
- `chevron-down`
- `chevron-left`
- `chevron-left-last`
- `chevron-right`
- `chevron-right-last`
- `chevron-top-last`
- `chevron-up`
- `chevrons-down`
- `chevrons-left`
- `chevrons-right`
- `chevrons-up`
- `chrome`
- `circle`
- `circle-checkmark`
- `circle-checkmark-filled`
- `circle-clipboard-filled`
- `circle-clock-filled`
- `circle-exclamation`
- `circle-exclamation-filled`
- `circle-information`
- `circle-information-filled`
- `circle-phone`
- `circle-question`
- `circle-x`
- `circle-x-filled`
- `clear-filled`
- `clipboard`
- `clipboard-with-checkmark`
- `clock`
- `clock-pending`
- `clockwise-arrows`
- `close`
- `cloud`
- `cloud-download`
- `cloud-drizzle`
- `cloud-lightning`
- `cloud-off`
- `cloud-rain`
- `cloud-snow`
- `cloud-upload`
- `code`
- `codepen`
- `codesandbox`
- `coins-crypto`
- `coins-stack`
- `color-palette`
- `columns`
- `command`
- `comment-pencil`
- `comment-pencil-filled`
- `company-building`
- `compass`
- `contactless-card`
- `contrast`
- `copy`
- `corner-down-left`
- `corner-down-right`
- `corner-left-down`
- `corner-left-up`
- `corner-right-down`
- `corner-right-up`
- `corner-up-left`
- `corner-up-right`
- `counter-clockwise-arrows`
- `coupon-percent`
- `coupon-percent-filled`
- `cpu`
- `credit-card`
- `crop`
- `crosshair`
- `crypto`
- `cup`
- `currency-exchange`
- `currency-exchange-coins`
- `cursor-default`
- `cursor-move`

### D

- `database`
- `dbs-logo`
- `delete`
- `delete-card`
- `deposit`
- `diagonal-inward-arrows`
- `diagonal-outward-arrows`
- `digistore`
- `disc`
- `divide`
- `document`
- `document-chart`
- `document-checkmark`
- `document-compass`
- `document-compass-filled`
- `document-lines`
- `document-pdf`
- `document-pen`
- `document-pen-filled`
- `document-percent`
- `document-user`
- `dollar-sign`
- `dollar-sign-single`
- `dollar-square-filled`
- `dollar-stats`
- `double-lines-horizontal`
- `download`
- `dribbble`
- `droplet`
- `dual-currency`

### E

- `edit`
- `edit-box`
- `edit-line`
- `electricity`
- `electricity-off`
- `estatement`
- `exchange`
- `exclamation`
- `external-link`
- `eye`
- `eye-money`
- `eye-off`

### F

- `facebook`
- `fashion-shirt`
- `fast-forward`
- `feather`
- `figma`
- `file`
- `file-clock`
- `file-csv`
- `file-doc`
- `file-image`
- `file-link`
- `file-minus`
- `file-pdf`
- `file-plus`
- `file-ppt`
- `file-text`
- `file-xls`
- `film`
- `filter`
- `filter-funnel`
- `filter-off`
- `filter-simple`
- `filter-simple-off`
- `finger-print`
- `flag`
- `flag-filled`
- `flashlight`
- `flashlight-filled`
- `floppy-disk`
- `folder`
- `folder-minus`
- `folder-open`
- `folder-plus`
- `framer`
- `funnel-filter-document`

### G

- `gauge`
- `gauge-meter`
- `gear`
- `gear-shield`
- `genai`
- `giftbox`
- `git-commit`
- `github`
- `gitlab`
- `give-hand-cash`
- `give-hand-coins`
- `give-hand-heart`
- `glass-cheers`
- `globe`
- `globe-arrows-clockwise`
- `globe-arrows-counter-clockwise`
- `globe-bank`
- `globe-checked`
- `globe-dollar-sign`
- `globe-live`
- `globe-visa`
- `gold-bar`
- `grid`
- `grid-filled`
- `grid-layout`
- `group-circle`

### H

- `hammer-gavel-legal`
- `hand-cash`
- `hand-credit-card`
- `hand-document`
- `hand-stacked-coins`
- `handshake`
- `hard-drive`
- `hard-token`
- `hash`
- `headphones`
- `headphones-mic`
- `headphones-mic-smile`
- `headphones-mic-smile-filled`
- `health-hand`
- `health-shield`
- `heart`
- `heart-checkmark`
- `heart-filled`
- `heart-hand`
- `help`
- `hexagon`
- `history`
- `home`
- `home-tab`
- `home-tab-filled`
- `hospital`
- `hospital-building`
- `house`
- `house-chimney`

### I

- `idcard`
- `idcard-filled`
- `image`
- `in-out-arrow`
- `inbox`
- `info`
- `info-faqs`
- `instagram`
- `invest-tab`
- `invest-tab-filled`
- `italic`

### K

- `key`
- `keyboard`

### L

- `landline-phone`
- `language-translate`
- `layers`
- `layout`
- `left-right-arrows`
- `left-right-half-arrows`
- `letter-big`
- `letter-small`
- `life-buoy`
- `light-bulb`
- `lightbulb-filled`
- `link`
- `link-horizontal`
- `linkedin`
- `list`
- `list-academic`
- `list-bullet`
- `list-search`
- `list-search-filled`
- `list-stacked-coins`
- `loader`
- `loading-circle`
- `lock`
- `lock-round`
- `log-in`
- `log-out`
- `logo-social-line`
- `logo-social-telegram`
- `logo-social-tiktok`
- `logo-social-whatsapp`
- `logo-social-x`

### M

- `magnifying-glass`
- `mail`
- `mail-open`
- `manage-account`
- `map`
- `map-pin`
- `map-pin-cn`
- `map-pin-filled`
- `marker`
- `maximize`
- `maximize-circle`
- `meals-fnb`
- `medical-card`
- `megaphone`
- `menu`
- `mic`
- `mic-off`
- `minimize`
- `minus`
- `minus-circle`
- `minus-circle-filled`
- `minus-square`
- `minus-symbol`
- `misty`
- `mobile-message`
- `mobile-pay`
- `money-bank-calculator`
- `money-plant`
- `monitor`
- `moon`
- `more-horizontal`
- `more-vertical`
- `mortar-hat`
- `mortgage`
- `multi-select-toggle`
- `music`

### N

- `navigation`
- `navigation-circle`
- `note`

### O

- `octagon`
- `octagon-information`
- `octagon-x`

### P

- `paint-roller`
- `paperclip`
- `papyrus-scroll`
- `password`
- `pause`
- `pause-circle`
- `pay-and-transfer-tab`
- `pay-and-transfer-tab-filled`
- `pen-note`
- `pen-tool`
- `pencil`
- `pencil-line`
- `people-conversation`
- `percent`
- `phone`
- `phone-book`
- `phone-call`
- `phone-end`
- `phone-forwarded`
- `phone-incoming`
- `phone-missed`
- `phone-off`
- `phone-outgoing`
- `pie-chart`
- `pie-chart-segments`
- `pin`
- `pin-checked`
- `pin-filled`
- `pin-key`
- `plan-tab`
- `plan-tab-filled`
- `plant-sustainability`
- `play`
- `play-circle`
- `plus`
- `plus-circle`
- `plus-circle-filled`
- `plus-square`
- `plus-symbol`
- `pocket`
- `posb-logo`
- `power`
- `presentation`
- `print`
- `printer`
- `pulse`
- `pyramid`

### Q

- `qr-code`
- `question-mark`

### R

- `radar`
- `radio`
- `radio-disc`
- `rain-thunder`
- `raining`
- `receipt-bank-account`
- `receipt-bill`
- `red-envelope`
- `refresh`
- `repeat`
- `replace-card`
- `report`
- `report-issue`
- `resize-handle`
- `rewards-crown`
- `rewind`
- `rotate-clockwise`
- `rotate-counter-clockwise`
- `rotate-device`
- `rotate-leaf`
- `rss`

### S

- `safe-deposit-box`
- `scanner`
- `scanner-barcode`
- `scanner-face-id`
- `scissors`
- `search`
- `send`
- `server`
- `settings`
- `share`
- `share-connect`
- `shield`
- `shield-alert-filled`
- `shield-lock`
- `shield-off`
- `shop-basket`
- `shop-front`
- `shop-star`
- `shopping-bag`
- `shopping-basket`
- `shopping-cart`
- `shuffle`
- `sidebar`
- `siren`
- `skip-backward`
- `skip-forward`
- `slack`
- `slash`
- `sliders`
- `smartphone`
- `smiley-emotionless`
- `smiley-happy`
- `smiley-sad`
- `smiley-very-happy`
- `snow`
- `sort`
- `sort-ascending`
- `sort-descending`
- `spanner`
- `spark-stars`
- `sparkle`
- `speaker`
- `speech-bubble-round`
- `speech-bubble-smile`
- `speech-bubble-square`
- `speedometer`
- `speedometer-filled`
- `square`
- `square-chart`
- `square-check`
- `square-dot`
- `square-pencil`
- `square-to-square`
- `square-x`
- `star`
- `star-filled`
- `star-half`
- `stop-circle`
- `stop-circle-filled`
- `structure-organization`
- `sun`
- `sun-cloud`
- `sunny`
- `sunrise`
- `sunset`
- `swap`

### T

- `table`
- `table-column-artboard`
- `table-column-delete`
- `table-sort`
- `tablet`
- `tag`
- `target`
- `text-color`
- `text-style`
- `text-wrap`

### U

- `upload`
- `user`
- `user-filled`
- `user-x`
- `users`

### W

- `warning-circle`
- `warning-filled`
