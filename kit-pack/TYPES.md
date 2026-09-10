# TYPES.md — Ai DLS Kit exported interfaces & type aliases

Every exported `interface`/`type` in the lib, alphabetically. Each row
links to the component doc whose `## Types` section renders that shape in
full — an API table cell like `tabs: UiTab[]` always has its `UiTab`
either inlined in that same doc or reachable from here.

| Type | Description | Docs |
| --- | --- | --- |
| `UiAccordionBarColor` | The four `ui-pill` status colours, plus the one hue that is not a status. | [components/accordion-header.md](./components/accordion-header.md) |
| `UiAlertAnchor` | One entry in the `anchors` list — a jump target rendered as an underlined link. | [components/alert.md](./components/alert.md) |
| `UiAvatarColour` | (no description) | [components/avatar.md](./components/avatar.md) |
| `UiAvatarSize` | DLS 3.1 avatar `Size` axis — Figma's variant names say "64px" for `xl`, but the harvested frame measures 56px; trust the measurement. | [components/avatar.md](./components/avatar.md) |
| `UiAvatarType` | DLS 3.1 avatar `Type` axis. | [components/avatar.md](./components/avatar.md) |
| `UiBarListItem` | One row. | [components/bar-list.md](./components/bar-list.md) |
| `UiBreadcrumbItem` | (no description) | [components/breadcrumb.md](./components/breadcrumb.md) |
| `UiButtonSize` | (no description) | [components/button.md](./components/button.md) |
| `UiButtonTone` | (no description) | [components/button.md](./components/button.md) |
| `UiButtonVariant` | (no description) | [components/button.md](./components/button.md) |
| `UiCardFooterAction` | (no description) | [components/card.md](./components/card.md) |
| `UiChartSlot` | (no description) | [components/donut-chart.md](./components/donut-chart.md) |
| `UiChartTick` | A labelled gridline. | [components/line-chart.md](./components/line-chart.md) |
| `UiChipKind` | (no description) | [components/chip.md](./components/chip.md) |
| `UiCoachmarkPlacement` | (no description) | [components/coachmark.md](./components/coachmark.md) |
| `UiCurrencyPairSign` | (no description) | [components/currency-pair.md](./components/currency-pair.md) |
| `UiCurrencyPairSize` | (no description) | [components/currency-pair.md](./components/currency-pair.md) |
| `UiDatePickerType` | (no description) | [components/date-picker.md](./components/date-picker.md) |
| `UiDateRange` | (no description) | [components/date-picker.md](./components/date-picker.md) |
| `UiDonutSegment` | One slice. | [components/donut-chart.md](./components/donut-chart.md) |
| `UiDrawerFooterLayout` | (no description) | [components/drawer.md](./components/drawer.md) |
| `UiDropdownMenuAlign` | (no description) | [components/dropdown-menu.md](./components/dropdown-menu.md) |
| `UiDropdownMenuRole` | (no description) | [components/dropdown-menu.md](./components/dropdown-menu.md) |
| `UiEmptyStateIllustration` | (no description) | [components/empty-state.md](./components/empty-state.md) |
| `UiFabTone` | (no description) | [components/fab.md](./components/fab.md) |
| `UiFileDropAlignment` | (no description) | [components/file-drop.md](./components/file-drop.md) |
| `UiFileKind` | File-type families the thumbnail glyph switches on (derived from the name). | [components/file-row.md](./components/file-row.md) |
| `UiFileThumbnailType` | (no description) | [components/file-thumbnail.md](./components/file-thumbnail.md) |
| `UiFilterTab` | (no description) | [components/filter-tabs.md](./components/filter-tabs.md) |
| `UiFilterTabSize` | (no description) | [components/filter-tabs.md](./components/filter-tabs.md) |
| `UiFormFieldCounter` | `[counter]` payload for `ui-form-field` — a raw count against a max, rendered "0/400" right-aligned on the help row (DLS's character-count affordance, set 12110:99059). | [components/form-field.md](./components/form-field.md) |
| `UiIconButtonShape` | (no description) | [components/icon-button.md](./components/icon-button.md) |
| `UiIconButtonSize` | (no description) | [components/icon-button.md](./components/icon-button.md) |
| `UiIconButtonTone` | (no description) | [components/icon-button.md](./components/icon-button.md) |
| `UiIconEagerName` | The eagerly-bundled names, for the kitchen sink's tier labelling. | _unresolved_ |
| `UiIconEntry` | A registry row: the same name at both sizes. | [components/icon.md](./components/icon.md) |
| `UiIconGlyph` | One glyph at one size. | [components/icon.md](./components/icon.md) |
| `UiIconName` | The catalogue's NAMES — a type, and nothing but a type. | [components/icon.md](./components/icon.md) |
| `UiIconShape` | One drawn primitive. | [components/icon.md](./components/icon.md) |
| `UiIconSize` | The two boxes the kit draws icons in. | [components/icon.md](./components/icon.md) |
| `UiInfoBannerTone` | (no description) | [components/info-banner.md](./components/info-banner.md) |
| `UiLineAnnotation` | A callout pinned to one point of one series . | [components/line-chart.md](./components/line-chart.md) |
| `UiLineSeries` | One line. | [components/line-chart.md](./components/line-chart.md) |
| `UiLinkVariant` | (no description) | [components/link.md](./components/link.md) |
| `UiLoaderKind` | (no description) | [components/loader.md](./components/loader.md) |
| `UiMenuItem` | (no description) | [components/kebab-menu.md](./components/kebab-menu.md) |
| `UiModalFooterLayout` | (no description) | [components/modal.md](./components/modal.md) |
| `UiMultiSelectDisplay` | (no description) | [components/multi-select.md](./components/multi-select.md) |
| `UiMultiSelectItem` | (no description) | [components/multi-select.md](./components/multi-select.md) |
| `UiNavRailItemKind` | (no description) | [components/nav-rail-item.md](./components/nav-rail-item.md) |
| `UiNavStatus` | DLS Form-type status per item/sub-item . | [components/nav-group.md](./components/nav-group.md) |
| `UiPageHeaderContentGap` | Whether this header supplies the house 24px gap below its bottom rule (lead ruling R2) — see `contentGap` on the component, and the "content gap" block in its doc comment for when `none` is correct. | [components/page-header.md](./components/page-header.md) |
| `UiPageHeaderType` | DLS 3.1 — Enterprise `page-header` Type axis . | [components/page-header.md](./components/page-header.md) |
| `UiPaginationType` | (no description) | [components/pagination.md](./components/pagination.md) |
| `UiPillColor` | (no description) | [components/pill.md](./components/pill.md) |
| `UiPillVariant` | (no description) | [components/pill.md](./components/pill.md) |
| `UiPopoverFooterLayout` | (no description) | [components/popover.md](./components/popover.md) |
| `UiPopoverPlacement` | (no description) | [components/popover.md](./components/popover.md) |
| `UiQuicklinkDirection` | (no description) | [components/quicklink.md](./components/quicklink.md) |
| `UiQuicklinkSize` | (no description) | [components/quicklink.md](./components/quicklink.md) |
| `UiRadioLayout` | (no description) | [components/radio.md](./components/radio.md) |
| `UiRadioOption` | (no description) | [components/radio.md](./components/radio.md) |
| `UiRankedListItem` | One row: a ranked category or person, with up to two trailing metrics. | [components/ranked-list.md](./components/ranked-list.md) |
| `UiSearchInputSize` | DLS `input-search` Size axis — `small` (32, the platform's compact default) | `regular` (DLS Medium, 40). | [components/search-input.md](./components/search-input.md) |
| `UiSectionHeaderSize` | The size axis added by lead ruling R1 (6 Sep 2026). | [components/section-header.md](./components/section-header.md) |
| `UiSegment` | (no description) | [components/segmented.md](./components/segmented.md) |
| `UiSelectOption` | (no description) | [components/select.md](./components/select.md) |
| `UiSkeletonType` | (no description) | [components/skeleton.md](./components/skeleton.md) |
| `UiSnackbarTone` | (no description) | [components/snackbar.md](./components/snackbar.md) |
| `UiStackedBarCategory` | One band of every stack — a product, an instrument class, a bucket. | [components/stacked-bar-chart.md](./components/stacked-bar-chart.md) |
| `UiStackedBarColumn` | One column. | [components/stacked-bar-chart.md](./components/stacked-bar-chart.md) |
| `UiStackedBarListColumns` | Header labels over the label column (optional) and the two trailing metric columns. | [components/stacked-bar-list.md](./components/stacked-bar-list.md) |
| `UiStackedBarListRow` | One row. | [components/stacked-bar-list.md](./components/stacked-bar-list.md) |
| `UiStackedBarListSeries` | One series in the stack — e.g. | [components/stacked-bar-list.md](./components/stacked-bar-list.md) |
| `UiStepperStatus` | Shared data model for `ui-stepper` / `ui-stepper-marker` . | [components/stepper.md](./components/stepper.md) |
| `UiStepperStep` | (no description) | [components/stepper.md](./components/stepper.md) |
| `UiStepperSubStep` | (no description) | [components/stepper.md](./components/stepper.md) |
| `UiSubTab` | (no description) | [components/sub-tabs.md](./components/sub-tabs.md) |
| `UiSummaryItem` | One item on a summary card: a headline figure with a caption under it. | [components/summary-card.md](./components/summary-card.md) |
| `UiSwitchSize` | (no description) | [components/switch.md](./components/switch.md) |
| `UiTab` | (no description) | [components/tabs.md](./components/tabs.md) |
| `UiTableColumn` | (no description) | [components/table-columns.md](./components/table-columns.md) |
| `UiTableHeaderLayout` | (no description) | [components/table-header.md](./components/table-header.md) |
| `UiTableSize` | (no description) | [components/table.md](./components/table.md) |
| `UiTagInfoColour` | Both DLS colour axes share one input: Category picks a solid fill, Product picks an outline. | [components/tag-info.md](./components/tag-info.md) |
| `UiTagInfoType` | DLS `tag-info`'s two types — see the class doc for the anatomy. | [components/tag-info.md](./components/tag-info.md) |
| `UiTagVariant` | (no description) | [components/status-tag.md](./components/status-tag.md) |
| `UiTooltipContent` | Structured content for `[uiTooltip]` — a title line, zero or more body lines, and an optional footer line separated from the body by a blank-line gap . | [components/tooltip-directive.md](./components/tooltip-directive.md) |
| `UiTrackerStatus` | Shared status vocabulary for the whole `ui-tracker` family (marker, event, sub-event's active/inactive cases, and step) — one union so a caller mapping data onto the tracker never has to reconcile two spellings of "completed" . | [components/tracker-marker.md](./components/tracker-marker.md) |
| `UiTrackerSubEventStatus` | (no description) | [components/tracker-sub-event.md](./components/tracker-sub-event.md) |
| `UiUploadStatus` | (no description) | [components/upload-file.md](./components/upload-file.md) |
