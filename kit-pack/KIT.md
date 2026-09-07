# KIT.md — Ai DLS Kit component index

118 components/directives, grouped by family. Start with
[RECIPES.md](./RECIPES.md) for a typical list screen (page header, filterable
table, pagination), then come back here and open `components/<name>.md`
for anything you plan to use. Every
exported interface/type alias an API table references (e.g. `UiTab`,
`UiSelectOption`) is rendered in full in that component's own `## Types`
section or linked from it — see [TYPES.md](./TYPES.md) for the full,
alphabetical index.

**Foundations comes first for a reason.** `ui-icon` is the kit's only way
to draw a glyph — 569 named DLS icons, sizes 16 and 24, colour inherited
from the surrounding text — and it appears inside components from every
other family. Read [components/icon.md](./components/icon.md) before you
draw one: an icon is named, never hand-drawn (RULES.md #12).

## Foundations

| Component | Selector | Purpose | Docs |
| --- | --- | --- | --- |
| `UiIcon` | `ui-icon` | DLS icon — the kit's ONE way to draw a glyph (KIT-FIXES B1, 6 Sep 2026). | [components/icon.md](./components/icon.md) |

## Buttons

| Component | Selector | Purpose | Docs |
| --- | --- | --- | --- |
| `UiButton` | `button[ui-button], a[ui-button]` | Neutral button — the DLS 3.1 `button` component (page 305:2699, set 50546:240728), rebuilt onto its real axis grid. | [components/button.md](./components/button.md) |
| `UiFab` | `button[ui-fab], a[ui-fab]` | Floating action button — the DLS 3.1 `floating-action-button` component . | [components/fab.md](./components/fab.md) |
| `UiIconButton` | `button[ui-icon-button], a[ui-icon-button]` | Icon button — the DLS 3.1 `icon-button` component . | [components/icon-button.md](./components/icon-button.md) |

## Inputs

| Component | Selector | Purpose | Docs |
| --- | --- | --- | --- |
| `UiAmountInput` | `ui-amount-input` | DLS "Currency" input-field type — aligned onto the DLS chrome in the archive round §21–§24 (owner decision, 3 Sep 2026). | [components/amount-input.md](./components/amount-input.md) |
| `UiCheckbox` | `ui-checkbox` | Canonical checkbox — 20px box, 4px radius, 2px --color-icon border when unchecked, --color-icon-selected (#00ab61) fill when checked . | [components/checkbox.md](./components/checkbox.md) |
| `UiCheckboxGroup` | `ui-checkbox-group` | DLS `checkbox-group` — the field wrapper around a vertical stack of `ui-checkbox`es: a label row (optional "(optional)" suffix + an optional 16px info glyph), an optional error message, then the list. | [components/checkbox-group.md](./components/checkbox-group.md) |
| `UiCodeSegment` | `ui-code-segment` | Shared leading "code" segment — the compact code+chevron trigger DLS reuses verbatim between the Phone field (76086:347688) and the Currency field (76086:347728): 12px h-pad, 8 gap, kit `body(sm)` 13 `--color-text-strong` tabular-nums value + a 16px chevron-down_16. | [components/code-segment.md](./components/code-segment.md) |
| `UiDateInput` | `ui-date-input` | Neutral date input — same 32px shell as ui-select with a 16px calendar icon (DLS column-header date filter, calendar_16). | [components/date-input.md](./components/date-input.md) |
| `UiDatePicker` | `ui-date-picker` | `ui-date-picker` — the DLS 3.1 `date-picker` component . | [components/date-picker.md](./components/date-picker.md) |
| `UiFormField` | `ui-form-field` | DLS `input-field` composite — the label / optional / info / help / counter / error chrome that wraps ANY kit control, projected as the default slot: | [components/form-field.md](./components/form-field.md) |
| `UiMultiSelect` | `ui-multi-select` | Multi-select dropdown — 32px trigger + search / select-all / checkbox options panel (ported from the shared modal use-case & CC pickers). | [components/multi-select.md](./components/multi-select.md) |
| `UiNumberInput` | `ui-number-input` | DLS "Number with stepper" input-field type — built for the archive round §21–§24 (owner decision, 3 Sep 2026). | [components/number-input.md](./components/number-input.md) |
| `UiPhoneInput` | `ui-phone-input` | DLS "Phone" input-field type — built for the archive round §21–§24 (owner decision, 3 Sep 2026). | [components/phone-input.md](./components/phone-input.md) |
| `UiRadio` | `ui-radio` | DLS `radio-input` / `radio-button` / `radio-button-group` replica — a styled 20px control per option, in a row or a vertical list: | [components/radio.md](./components/radio.md) |
| `UiRadioChiclet` | `ui-radio-chiclet` | Public — read by `UiRadioChiclet` (a sibling component's TypeScript, not a subclass) to resolve its own roving-tabindex stop. | [components/radio-chiclet.md](./components/radio-chiclet.md) |
| `UiRadioChicletGroup` | `ui-radio-chiclet-group` | DLS `radio-chiclet` — a bordered chip radio, for the archive: no reference-app consumer names it yet (owner ruling, round 30–34, 3 Sep 2026), so this ships as a sink-only pair of components rather than wired into a page. | [components/radio-chiclet-group.md](./components/radio-chiclet-group.md) |
| `UiRichText` | `ui-rich-text` | Rich-text editor — bordered toolbar + textarea used by inbox replies, remarks fields and the Ops Risk action modals. | [components/rich-text.md](./components/rich-text.md) |
| `UiSearchInput` | `ui-search-input` | DLS 3.1 "Input search" , aligned onto the DLS chrome in the archive round §21–§24 (owner decision, 3 Sep 2026). | [components/search-input.md](./components/search-input.md) |
| `UiSelect` | `ui-select` | DLS 3.1 Single select — Small (76086:347480) / Expanded (76086:350551): a 32px trigger (bg level_1, 1px border, radius 4, 0/12 padding, 8 gap, kit body(sm) 13, chevron-down_16 in `--color-icon`) that opens a `ui-dropdown-menu[role=listbox]` of `button[ui-dropdown-item]` rows 6px below, min-width the trigger's own width or 200px, whichever is larger — the same "max(200, 100%)" rule `ui-multi-select`'s panel already uses. | [components/select.md](./components/select.md) |
| `UiSelectGroup` | `ui-select-group` | `ui-select-group` — N kit controls joined inside ONE field frame. | [components/select-group.md](./components/select-group.md) |
| `UiSwitch` | `ui-switch` | DLS `Switch` . | [components/switch.md](./components/switch.md) |
| `UiTextarea` | `ui-textarea` | DLS `input-field` / Text area type chrome — same shell rules as ui-text-input (border/hover/ focus/disabled/invalid), 12/12 padding, kit `body(sm)`. | [components/textarea.md](./components/textarea.md) |
| `UiTextInput` | `ui-text-input` | DLS `input-field` / Text type chrome — same 32px shell as ui-select : 1px border, 4px radius, DLS's 2px solid access-focus border. | [components/text-input.md](./components/text-input.md) |

## Navigation

| Component | Selector | Purpose | Docs |
| --- | --- | --- | --- |
| `UiBreadcrumb` | `ui-breadcrumb` | DLS `Breadcrumb` — one axis, Overflow menu False/True. | [components/breadcrumb.md](./components/breadcrumb.md) |
| `UiDotPagination` | `ui-dot-pagination` | Dot pagination — the DLS 3.1 `dot-pagination` component : 3–8 8px dots, 8px gap, Active / Inactive. | [components/dot-pagination.md](./components/dot-pagination.md) |
| `UiDropdownAccountItem` | `button[ui-dropdown-account-item]` | DLS 3.1 `dropdown-item-account` — the account/name row `ui-dropdown-menu-account` (below) is built from: 12px v-pad, a 40px `ui-avatar` (initials or `avatarColour`) + kit `label(md)` (14) `--color-text-strong` `name` + optional kit `body(sm)` `--color-text-subtle` `meta`, 8px gap. | [components/dropdown-account-item.md](./components/dropdown-account-item.md) |
| `UiDropdownGroup` | `[ui-dropdown-group]` | DLS `dropdown-menu` "Grouped Items" variation marker — wrap sibling items in `<div ui-dropdown-group>…</div>`; `dropdown-menu.scss` adds the 4px inset padding and, between consecutive groups, the 1px `--color-border-decorative` top rule. | [components/dropdown-group.md](./components/dropdown-group.md) |
| `UiDropdownHeading` | `ui-dropdown-heading` | DLS 3.1 `dropdown-heading` — a 40px group label row, 12px h-padding, kit `label(sm)` `--color-text-subtle`: | [components/dropdown-heading.md](./components/dropdown-heading.md) |
| `UiDropdownItem` | `button[ui-dropdown-item]` | DLS 3.1 `dropdown-item` — attribute component on a native `<button>` so type/disabled/form semantics stay intact, same pattern as `ui-icon-button`/`ui-chip`: | [components/dropdown-item.md](./components/dropdown-item.md) |
| `UiDropdownMenu` | `ui-dropdown-menu` | DLS 3.1 `dropdown-menu` — the shared popover surface `ui-kebab-menu`, the `ui-breadcrumb` overflow popover and `ui-multi-select`'s panel all delegate to (register item 16, built 2 Sep 2026). | [components/dropdown-menu.md](./components/dropdown-menu.md) |
| `UiFilterTabs` | `ui-filter-tabs` | Filter-tab group — DLS `filter-tab` / `filter-tab-group` : a row of pills, the selected one filled with the inverse surface, the rest outlined, and a disabled state for a choice that exists but has nothing behind it. | [components/filter-tabs.md](./components/filter-tabs.md) |
| `UiKebabMenu` | `ui-kebab-menu` | Kebab (⋮) row-action menu — right-aligned dropdown. | [components/kebab-menu.md](./components/kebab-menu.md) |
| `UiLink` | `a[ui-link], button[ui-link]` | DLS `Link` — an inline text link, Variant Product | Subtle | Text | On dim × State Default | Hover | Focus. | [components/link.md](./components/link.md) |
| `UiNavFooterItem` | `[ui-nav-footer-item]` | Row inside a `ui-nav-panel`'s footer — REGISTER.md §29. | [components/nav-footer-item.md](./components/nav-footer-item.md) |
| `UiNavGroup` | `ui-nav-group` | Expandable GROUP row inside a `ui-nav-panel` . | [components/nav-group.md](./components/nav-group.md) |
| `UiNavPanel` | `ui-nav-panel` | Collapsible secondary-nav CHROME — the absolutely positioned panel frame, its expanded/collapsed widths (`--nav-secondary-w` / `--nav-secondary-w-collapsed`, tokens.css), and the footer collapse/expand control. | [components/nav-panel.md](./components/nav-panel.md) |
| `UiNavPanelHeader` | `ui-nav-panel-header` | Header of a `ui-nav-panel` — REGISTER.md §29. | [components/nav-panel-header.md](./components/nav-panel-header.md) |
| `UiNavRail` | `ui-nav-rail, nav[ui-nav-rail]` | DLS `nav-side-primary` — the dark left rail's OUTER FRAME: the 900-tall column, its three width states, and the header/body/footer slots. | [components/nav-rail.md](./components/nav-rail.md) |
| `UiNavRailFlyout` | `ui-nav-rail-flyout` | DLS collapsed-rail flyout : the panel a collapsed GROUP item's sub-items appear in, since the 72px rail has no room to show them inline. | [components/nav-rail-flyout.md](./components/nav-rail-flyout.md) |
| `UiNavRailFlyoutSection` | `[uiNavRailFlyoutSection]` | Marks the optional section label projected into `ui-nav-rail-flyout` (DLS "SECTION row": 32px min, 12px h-pad / 4px v-pad, label/2xs 10px uppercase `--color-text-on-dim-subtle`). | [components/nav-rail-flyout-section.md](./components/nav-rail-flyout-section.md) |
| `UiNavRailFooter` | `[uiNavRailFooter]` | Marks the projected footer block of `ui-nav-rail` — sticky, 1px top rule, 8px top / 16px bottom padding (nav-rail.scss). | [components/nav-rail-footer.md](./components/nav-rail-footer.md) |
| `UiNavRailHeader` | `[uiNavRailHeader]` | Marks the projected header block of `ui-nav-rail` — the 72px row holding the logo mark (collapsed/with-labels) or mark + wordmark (expanded). | [components/nav-rail-header.md](./components/nav-rail-header.md) |
| `UiNavRailItem` | `button[ui-nav-rail-item], a[ui-nav-rail-item]` | DLS `nav-side/item` — the primary rail's row. | [components/nav-rail-item.md](./components/nav-rail-item.md) |
| `UiNavRailRule` | `div[ui-nav-rail-rule]` | DLS `nav-side/item` "Rule" row — a 32px-min divider row holding a centred 1px hairline `--color-border-dim`. | [components/nav-rail-rule.md](./components/nav-rail-rule.md) |
| `UiNavRailSection` | `div[ui-nav-rail-section]` | DLS `nav-side/item` "Section" row — a 32px-min group heading between items in the expanded rail: 8px h-pad + a 16px left inset, 4px v-pad, uppercase `label(2xs)` 10px/500 `--color-text-on-dim-subtle`. | [components/nav-rail-section.md](./components/nav-rail-section.md) |
| `UiNavRailSubItem` | `button[ui-nav-rail-sub-item], a[ui-nav-rail-sub-item]` | DLS `nav-side/sub-item` — Action row . | [components/nav-rail-sub-item.md](./components/nav-rail-sub-item.md) |
| `UiNavSubItem` | `[ui-nav-sub-item]` | Child row of a `ui-nav-group` . | [components/nav-sub-item.md](./components/nav-sub-item.md) |
| `UiPagination` | `ui-pagination` | Pagination — the DLS 3.1 `pagination` set . | [components/pagination.md](./components/pagination.md) |
| `UiQuicklink` | `button[ui-quicklink], a[ui-quicklink]` | Quicklink — the DLS 3.1 `quicklink` component . | [components/quicklink.md](./components/quicklink.md) |
| `UiSegmented` | `ui-segmented` | Segmented control — DLS `switch-tab` / `switch-tab-group` : one grey track carrying mutually exclusive slices, the chosen one raised as a white pill (also used at 1002:236111, frame 994:233795: `All | Banking | Trading` on the P&L Trend and Breakdown card headers, `By Product | By Instrument` on the bottom Breakdown card). | [components/segmented.md](./components/segmented.md) |
| `UiSubTabs` | `ui-sub-tabs` | Second-level tab strip — DLS `sub-tab` / `sub-tab-group` : a 32px neutral-fill pill strip that sits UNDER a page-level `ui-tabs` bar. | [components/sub-tabs.md](./components/sub-tabs.md) |
| `UiTabs` | `ui-tabs` | Canonical tab bar — DLS `tab` / `tab-group` . | [components/tabs.md](./components/tabs.md) |

## Data display

| Component | Selector | Purpose | Docs |
| --- | --- | --- | --- |
| `UiAvatar` | `ui-avatar` | DLS 3.1 avatar — replaces the old free-px hex-background circle wholesale. | [components/avatar.md](./components/avatar.md) |
| `UiBadge` | `ui-badge` | Badge — the DLS 3.1 `badge` component (page 379:18, set 379:23), six symbols on ONE component set, two axes: | [components/badge.md](./components/badge.md) |
| `UiBarList` | `ui-bar-list` | Horizontal bar list — the Dashboard's **Top Contributors** card : a row per category, the name on the left, a bar, and the value right-aligned. | [components/bar-list.md](./components/bar-list.md) |
| `UiCard` | `ui-card` | Canonical content card, grown ADDITIVELY onto the DLS 3.1 `card` component . | [components/card.md](./components/card.md) |
| `UiCardButton` | `button[ui-card-button]` | Card button — the DLS 3.1 `card-button` component . | [components/card-button.md](./components/card-button.md) |
| `UiCellChanged` | `ui-cell-changed` | `ui-cell-changed` — the DLS Table "new patterns" cell for a value that changed after editing . | [components/cell-changed.md](./components/cell-changed.md) |
| `UiCellEdit` | `td[ui-cell-edit]` | `td[ui-cell-edit]` — the DLS `data-cell` "Edit mode" variant "). | [components/cell-edit.md](./components/cell-edit.md) |
| `UiCellExpandable` | `ui-cell-expandable` | `ui-cell-expandable` — the DLS Table "new patterns" cell ' / 'View less' expanding content"): a numbered list of `items`, clipped to the first `limit` (default 3) with a `button[ui-link]` "View all (N)" that swaps to the full list + "View less". | [components/cell-expandable.md](./components/cell-expandable.md) |
| `UiChip` | `ui-chip, button[ui-chip]` | Chip — the DLS 3.1 `chip` components . | [components/chip.md](./components/chip.md) |
| `UiColumnHeader` | `ui-column-header` | Canonical table column header — DBS DLS "column-header" . | [components/column-header.md](./components/column-header.md) |
| `UiCurrencyPair` | `ui-currency-pair` | Currency pair — the DLS 3.1 `currency-pair` component . | [components/currency-pair.md](./components/currency-pair.md) |
| `UiDonutChart` | `ui-donut-chart` | Donut chart — the Dashboard's **Product Breakdown** : a ring of six slices with a figure and a caption in the hole. | [components/donut-chart.md](./components/donut-chart.md) |
| `UiLineChart` | `ui-line-chart` | Multi-series line chart — the Dashboard's **P&L Trend** card : four series over six months, four labelled gridlines, an x-axis, point callouts and a legend beneath. | [components/line-chart.md](./components/line-chart.md) |
| `UiPill` | `ui-pill` | Use-case pill — small dot + label chip used in trade tables and modals (grey = default, green = acknowledged, yellow = sent for clarification, red = the critical/adverse outcome). | [components/pill.md](./components/pill.md) |
| `UiRankedList` | `ui-ranked-list` | Ranked list — the desk lead Risk & Controls kit gap 2 : a vertical list of ranked rows, each a two-line label, an optional danger bar, one or two trailing metrics, and an optional chevron to drill in. | [components/ranked-list.md](./components/ranked-list.md) |
| `UiSparkline` | `ui-sparkline` | Sparkline — the small signed-area chart beside the Dashboard's **YTD Performance** figures : one trace over a zero baseline, green where the period is up and red where it is down, each run washed down to the line. | [components/sparkline.md](./components/sparkline.md) |
| `UiStackedBarChart` | `ui-stacked-bar-chart` | Stacked column chart — the Dashboard's **Breakdown by product/instrument** card : six columns, each a stack of four categories, a labelled y-grid, a total above each bar, and a legend beneath. | [components/stacked-bar-chart.md](./components/stacked-bar-chart.md) |
| `UiStackedBarList` | `ui-stacked-bar-list` | Horizontal stacked bar list — the desk lead Risk & Controls kit gap 3 : one row per category, a two-segment bar (breach / non-breach), two trailing metric columns with headers, a bottom value axis, and a legend. | [components/stacked-bar-list.md](./components/stacked-bar-list.md) |
| `UiStatusDot` | `ui-status-dot` | Status dot — DLS `tag-status-dot` , the other face of `tag-status`: a 10px round dot + 4px gap + label/sm `text-strong`, 20 tall, no pill fill of its own. | [components/status-dot.md](./components/status-dot.md) |
| `UiStatusTag` | `ui-status-tag` | Neutral status tag — the single pill for every status on the platform . | [components/status-tag.md](./components/status-tag.md) |
| `UiStepper` | `ui-stepper` | `ui-stepper` — DLS 3.1 `Stepper` : built for the archive in BOTH layouts — vertical + horizontal, sub-steps, statuses, non-linear, the §32 bar — with a focus-overlay slot demo, no page wiring yet). | [components/stepper.md](./components/stepper.md) |
| `UiStepperMarker` | `ui-stepper-marker` | The 20px marker box a `ui-stepper` parent-step row leads with — a 16px ring centred in the box, radio's exact ring-and-disc recipe (`radio.scss`): | [components/stepper-marker.md](./components/stepper-marker.md) |
| `UiSummaryCard` | `ui-summary-card` | Summary card — the white strip of headline figures that sits above a table, with a hairline divider between items and an optional card title. | [components/summary-card.md](./components/summary-card.md) |
| `UiTable` | `table[ui-table]` | DLS Table chassis . | [components/table.md](./components/table.md) |
| `UiTableAddRow` | `tr[ui-table-add-row]` | `tr[ui-table-add-row]` — the DLS Table "new patterns" add row . | [components/table-add-row.md](./components/table-add-row.md) |
| `UiTableCard` | `ui-table-card` | `ui-table-card` — the DLS Table ROOT : a white level_2 card, `--border-radius-panel-lg` (8px), `--shadow-elevation-2`, `overflow: clip`, that wraps `ui-table-header` + `table[ui-table]` + a footer (typically `ui-pagination`) as ONE seam — the DLS composition draws header, grid and footer inside a single card, not three independently-chromed pieces. | [components/table-card.md](./components/table-card.md) |
| `UiTableColumns` | `ui-table-columns` | `ui-table-columns` — the DLS Table "column customisation" control "). | [components/table-columns.md](./components/table-columns.md) |
| `UiTableHeader` | `ui-table-header` | `ui-table-header` — DLS `table-header` : the panel band that sits above the column-header row of a `table[ui-table]`. | [components/table-header.md](./components/table-header.md) |
| `UiTableRow` | `tr[ui-table-row]` | DLS Table row states — an ATTRIBUTE component on a native `<tr>`, sibling to `table[ui-table]`: | [components/table-row.md](./components/table-row.md) |
| `UiTableSubHeader` | `tr[ui-table-sub-header]` | `ui-table-sub-header` — DLS `table-sub-header` : the section-divider row a `table[ui-table]` body drops between groups of rows ("Grouping" guideline — rows between two dividers form one section). | [components/table-sub-header.md](./components/table-sub-header.md) |
| `UiTagFilter` | `ui-tag-filter` | Removable filter tag — DLS `tag-filter` : 20 tall, radius `--border-radius-indicator` (4), background `--color-bg-neutral`, 4px LEFT padding, label `type.label(sm)` `--color-text-strong`, then a 20px-square close button carrying a 16×10 glyph, emitting `removed`. | [components/tag-filter.md](./components/tag-filter.md) |
| `UiTagInfo` | `ui-tag-info` | `tag-info` — DLS's two-type recency/categorisation marker . | [components/tag-info.md](./components/tag-info.md) |
| `UiTracker` | `ui-tracker` | `ui-tracker` — the DLS 3.1 `Tracker` component , replacing the hand-rolled `ui-timeline` (`done | current | pending`, three marker states, no sub-events, no inline actions, no OR divider, no horizontal form) that stood in for it across the Special Requests audit-log and workflow drawers and the monitoring signoff-audit drawer. | [components/tracker.md](./components/tracker.md) |
| `UiTrackerDivider` | `ui-tracker-divider` | `ui-tracker-divider` — the DLS 3.1 `tracker-vertical/group-divider` : an **"OR"** rule between two alternative branches of a vertical tracker: | [components/tracker-divider.md](./components/tracker-divider.md) |
| `UiTrackerEvent` | `ui-tracker-event` | `ui-tracker-event` — the DLS 3.1 `tracker-vertical`/`parent-event` , the row `ui-tracker` composes for `orientation="vertical"`: | [components/tracker-event.md](./components/tracker-event.md) |
| `UiTrackerMarker` | `ui-tracker-marker` | `ui-tracker-marker` — the DLS 3.1 `tracker-marker` , a 16×20 box: | [components/tracker-marker.md](./components/tracker-marker.md) |
| `UiTrackerStep` | `ui-tracker-step` | `ui-tracker-step` — the DLS 3.1 `tracker-horizontal` event , the row `ui-tracker` composes for `orientation="horizontal"` (each `flex: 1`, wired by `tracker.scss`): | [components/tracker-step.md](./components/tracker-step.md) |
| `UiTrackerSubEvent` | `ui-tracker-sub-event` | `ui-tracker-sub-event` — the DLS 3.1 `tracker-vertical/sub-event` , the disclosed child a `ui-tracker-event` reveals when `expandable`+`expanded`: | [components/tracker-sub-event.md](./components/tracker-sub-event.md) |

## Overlays

| Component | Selector | Purpose | Docs |
| --- | --- | --- | --- |
| `UiCoachmark` | `ui-coachmark` | Coachmark — the DLS 3.1 `coachmark` component . | [components/coachmark.md](./components/coachmark.md) |
| `UiDrawer` | `ui-drawer` | Right-edge sliding panel — the DLS 3.1 `drawer` component . | [components/drawer.md](./components/drawer.md) |
| `UiModal` | `ui-modal` | `ui-modal` — the DLS 3.1 `modal` component : a centred 600px DIALOG, distinct from `ui-modal-shell` . | [components/modal.md](./components/modal.md) |
| `UiModalShell` | `ui-modal-shell` | Full-screen modal shell — the shared overlay/panel/header chassis of the monitoring app modals (ported from the React ModalBase + ClarifyModal header), grown ADDITIVELY onto the DLS 3.1 `focus-overlay` component . | [components/modal-shell.md](./components/modal-shell.md) |
| `UiPopover` | `ui-popover` | `ui-popover` — the DLS 3.1 `popover` component : a 360px `--color-bg-level3` panel anchored to a trigger, with header / body / footer slots. | [components/popover.md](./components/popover.md) |
| `UiSnackbar` | `ui-snackbar` | Snackbar toast — the DLS 3.1 `snackbar` component . | [components/snackbar.md](./components/snackbar.md) |
| `UiTooltipDirective` | `[uiTooltip]` | **Tooltip — the kit's first, DLS `tooltip`.** | [components/tooltip-directive.md](./components/tooltip-directive.md) |

## Feedback

| Component | Selector | Purpose | Docs |
| --- | --- | --- | --- |
| `UiAlert` | `ui-alert` | Chrome is shared across every variant: bg level_2, 1px danger border, 4px radius, elevation-2 shadow, 16/12 padding, 12px icon-to-content gap. | [components/alert.md](./components/alert.md) |
| `UiEmptyState` | `ui-empty-state` | Empty state — the DLS 3.1 `empty-state` component . | [components/empty-state.md](./components/empty-state.md) |
| `UiInfoBanner` | `ui-info-banner` | Information banner — the DLS 3.1 `info-banner` component . | [components/info-banner.md](./components/info-banner.md) |
| `UiLoader` | `ui-loader` | Loader — the DLS 3.1 `loader` component . | [components/loader.md](./components/loader.md) |
| `UiProgressBar` | `ui-progress-bar` | Progress bar — DLS 3.1 `Progress bar` . | [components/progress-bar.md](./components/progress-bar.md) |
| `UiSkeleton` | `ui-skeleton` | Skeleton — the DLS 3.1 `loader-skeleton` component . | [components/skeleton.md](./components/skeleton.md) |
| `UiSkeletonBar` | `ui-skeleton-bar` | Bare skeleton bar — the shimmer primitive `ui-skeleton` composes into its header/body anatomy below. | [components/skeleton-bar.md](./components/skeleton-bar.md) |

## Layout

| Component | Selector | Purpose | Docs |
| --- | --- | --- | --- |
| `UiAccordion` | `ui-accordion` | Canonical accordion — DLS accordion-box replica : 4px radius, elevation-1 shadow, 48px-minimum header with content-driven height, spring-rotating 24px chevron, grid-rows open/close animation (animates to actual content height, no max-height hacks). | [components/accordion.md](./components/accordion.md) |
| `UiAccordionActions` | `[accordion-actions]` | Marker for `ui-accordion`'s right-hand actions slot (5 Sep 2026) — put `accordion-actions` on any control that should sit left of the chevron: | [components/accordion-actions.md](./components/accordion-actions.md) |
| `UiAccordionBody` | `ng-template[accordion-body]` | Marker for `ui-accordion`'s DEFERRABLE body (5 Sep 2026) — an `<ng-template accordion-body>` the accordion stamps into its body itself: | [components/accordion-body.md](./components/accordion-body.md) |
| `UiAccordionHeader` | `[accordion-header]` | Marker for `ui-accordion`'s projected header slot — put `accordion-header` on the element that should REPLACE the built-in title/subtitle/count: | [components/accordion-header.md](./components/accordion-header.md) |
| `UiActionsRow` | `[ui-actions-row]` | The focus-overlay ACTION ROW (owner's directive 6, 5 Sep 2026) — "content in `ui-card`s 16px apart, action buttons OUTSIDE the cards, below the last one". | [components/actions-row.md](./components/actions-row.md) |
| `UiContentSeparator` | `ui-content-separator` | DLS `accordion-separator` — REGISTER.md §1 gap (a). | [components/content-separator.md](./components/content-separator.md) |
| `UiPageHeader` | `ui-page-header` | `ui-page-header` — the DLS 3.1 Enterprise page header , the shared chassis every page-level title on the platform should sit inside. | [components/page-header.md](./components/page-header.md) |
| `UiPageTitle` | `h1[ui-page-title], h2[ui-page-title]` | Canonical page title — the single definition of "the title of a page". | [components/page-title.md](./components/page-title.md) |
| `UiSectionHeader` | `ui-section-header` | Section header — a title over an optional subtitle. | [components/section-header.md](./components/section-header.md) |

## Files

| Component | Selector | Purpose | Docs |
| --- | --- | --- | --- |
| `UiFileDrop` | `ui-file-drop` | Drag-and-drop upload zone — DLS 3.1 `upload-area` : dashed rounded rectangle with a cloud-upload glyph, "Drag your file here or browse" (browse styled as a link) and a supported-formats hint line underneath. | [components/file-drop.md](./components/file-drop.md) |
| `UiFileRow` | `ui-file-row` | Uploaded-file row — DLS 3.1 `File` : 40x40 file-type thumbnail, file name + optional size, and a right-aligned download / remove action pair. | [components/file-row.md](./components/file-row.md) |
| `UiFileThumbnail` | `ui-file-thumbnail` | File thumbnail — DLS 3.1 `_file-thumbnail` . | [components/file-thumbnail.md](./components/file-thumbnail.md) |
| `UiUploadFile` | `ui-upload-file` | Upload-status row — DLS 3.1 `upload-file` . | [components/upload-file.md](./components/upload-file.md) |

