# TOKENS.md — Ai DLS Kit design tokens

Every custom property in `node_modules/ai-dls-kit/styles/tokens.css`,
grouped by the section comments already in that file, so an agent can look
up a token's value without opening the CSS. Load `styles/tokens.css` in
`angular.json` and use these by name — never hardcode a hex, a font-size,
or a pixel value that a token already names.

Page padding and type roles are Sass mixins, not tokens: `@use
'ai-dls-kit/tokens/layout'` (`content-padding`) and `@use
'ai-dls-kit/tokens/type'` (`heading` / `label` / `body`) — see README.md
step 4 for the end-to-end example.

## Backgrounds

| Token | Value |
| --- | --- |
| `--color-bg-app` | `#f5f7f9` |
| `--color-bg-level1` | `#ffffff` |
| `--color-bg-dim` | `#172733` |
| `--color-bg-dim-pressed` | `#59656d` |
| `--color-bg-dim-hover` | `#303c44` |
| `--color-bg-level2` | `#ffffff` |
| `--color-bg-level3` | `#ffffff` |
| `--color-bg-selected` | `#e2f8ef` |
| `--color-bg-success-subtlest` | `#e2f8ef` |
| `--color-bg-alt` | `#f7f7f7` |
| `--color-bg-inverse` | `#59656d` |
| `--color-bg-overlay` | `rgba(23, 24, 26, 0.7)` |

## Borders

| Token | Value |
| --- | --- |
| `--color-border` | `#b0b9c0` |
| `--color-border-decorative` | `#dde3e7` |
| `--color-border-subtle` | `#eef2f5` |
| `--color-border-dim` | `#303c44` |
| `--color-border-level2` | `#17181a00` |

## Text

| Token | Value |
| --- | --- |
| `--color-text-strong` | `#172733` |
| `--color-text-body` | `#455057` |
| `--color-text-subtle` | `#69737b` |
| `--color-text-disabled` | `#9ba4ab` |
| `--color-text-on-dim` | `#ffffff` |
| `--color-text-inverse` | `#ffffff` |

## Semantic accents (formalized from values hardcoded in the React app)

| Token | Value |
| --- | --- |
| `--color-primary` | `#0077cc` |
| `--color-primary-hover` | `#0061a6` |
| `--color-primary-pressed` | `#004b80` |
| `--color-danger` | `#ff4724` |
| `--color-danger-dark` | `#e52500` |
| `--color-accent-green` | `#0c8363` |
| `--color-accent-yellow` | `#f5a623` |
| `--color-accent-purple` | `#cc47ae` |
| `--color-hover-wash` | `rgba(0, 0, 0, 0.06)` |
| `--color-text-danger` | `#d62300` |
| `--color-bg-danger-strong` | `#d62300` |
| `--color-bg-danger-strong-hover` | `#bd2b0f` |
| `--color-bg-danger-strong-pressed` | `#4c0000` |
| `--color-bg-success-strong` | `#007a45` |
| `--color-bg-success-strong-hover` | `#005c34` |
| `--color-bg-success-strong-pressed` | `#003d23` |
| `--color-bg-hover` | `#eef2f5` |
| `--color-bg-pressed` | `#dde3e7` |
| `--color-bg-disabled` | `#eef2f5` |
| `--color-border-hover` | `#9ba4ab` |
| `--color-border-pressed` | `#858f96` |
| `--color-border-disabled` | `#c7cfd5` |
| `--color-border-on-dim` | `#b0b9c0` |
| `--color-bg-on-dim-hover` | `#455057` |
| `--color-bg-on-dim-pressed` | `#59656d` |
| `--color-bg-on-dim-disabled` | `#303c44` |
| `--color-text-on-dim-disabled` | `#69737b` |
| `--color-text-on-bright-disabled` | `#858f96` |
| `--color-icon` | `#69737b` |
| `--color-icon-disabled` | `#c7cfd5` |
| `--color-icon-inverse` | `#ffffff` |
| `--color-icon-selected` | `#00ab61` |
| `--color-icon-selected-hover` | `#007a45` |
| `--color-icon-selected-disabled` | `#b0e8d0` |
| `--color-icon-decorative` | `#9ba4ab` |
| `--color-icon-hover` | `#59656d` |
| `--color-icon-product-alt` | `#0095ff` |
| `--color-text-on-dim-subtle` | `#9ba4ab` |
| `--color-text-on-dim-hover` | `#c7cfd5` |
| `--color-text-hover` | `#303c44` |
| `--color-focus` | `#458fff` |
| `--color-success` | `#13c998` |
| `--color-warning` | `#ffb024` |
| `--color-info` | `#8657ff` |
| `--color-field-error-bg` | `#fff0f0` |
| `--color-bg-danger-subtlest` | `#fff0f0` |
| `--color-tag-blocker` | `#fadcd9` |
| `--focus-ring` | `0 0 0 2px rgba(69, 143, 255, 0.25)` |
| `--color-primary-halo` | `rgba(0, 119, 204, 0.2)` |

## Status-tag backgrounds (Figma 14421:204390)

| Token | Value |
| --- | --- |
| `--color-tag-neutral` | `#dde3e7` |
| `--color-tag-green` | `#b0e8d0` |
| `--color-tag-red` | `#ffd6d6` |
| `--color-tag-amber` | `#ffdea3` |
| `--color-tag-new` | `#b4ccff` |
| `--color-avatar-goji` | `#ffb5b9` |
| `--color-avatar-ginger` | `#ffdeb5` |
| `--color-avatar-lemon` | `#fffeb4` |
| `--color-avatar-lime` | `#dbffb4` |
| `--color-avatar-melon` | `#b5ffdb` |
| `--color-avatar-mint` | `#b4f8ff` |
| `--color-avatar-lavender` | `#b4ccff` |
| `--color-avatar-acai` | `#ecb4ff` |

## Chart palette (Figma 994:233795, the Trends cards)

| Token | Value |
| --- | --- |
| `--color-chart-series-1` | `#009dff` |
| `--color-chart-series-2` | `#12ca98` |
| `--color-chart-series-3` | `#723dfd` |
| `--color-chart-series-4` | `#cc3dab` |
| `--color-chart-positive` | `#00ab61` |
| `--color-chart-positive-fill` | `#e2f8ef` |
| `--color-chart-negative` | `#ff4724` |
| `--color-chart-negative-fill` | `#fff0f0` |

## Gridlines and the zero baseline — recessive by design.

| Token | Value |
| --- | --- |
| `--color-chart-grid` | `#dde3e7` |
| `--color-chart-breach` | `#ff5c5c` |
| `--color-chart-non-breach` | `#5ed1b1` |
| `--color-delta-danger` | `#e53939` |
| `--color-delta-danger-bg` | `#fff4f4` |
| `--color-delta-success` | `#00926b` |
| `--color-delta-success-bg` | `#effbf9` |

## Info banner (Figma 16980:44292 / 17211:39658)

| Token | Value |
| --- | --- |
| `--color-info-bg` | `#e2d6ff` |
| `--color-info-border` | `#ded4fa` |
| `--color-info-icon` | `#6b4de6` |
| `--color-info-bar` | `#8657ff` |

## Typography

| Token | Value |
| --- | --- |
| `--font` | `'Public Sans', sans-serif` |
| `--font-family-heading` | `var(--font)` |
| `--font-family-label` | `var(--font)` |
| `--font-family-body` | `var(--font)` |

## heading — semibold, roomy, slightly tightened tracking

| Token | Value |
| --- | --- |
| `--font-size-heading-2xs` | `14px` |
| `--font-size-heading-xs` | `16px` |
| `--font-size-heading-sm` | `20px` |
| `--font-size-heading-md` | `24px` |
| `--font-size-heading-lg` | `28px` |
| `--font-size-heading-xl` | `32px` |
| `--font-size-heading-2xl` | `40px` |
| `--font-size-label-2xs` | `10px` |
| `--font-size-label-xs` | `12px` |
| `--font-size-label-sm` | `13px` |
| `--font-size-label-md` | `14px` |

## body — regular, generous leading. Prose and read-only values.

| Token | Value |
| --- | --- |
| `--font-size-body-sm` | `13px` |
| `--font-size-body-md` | `14px` |
| `--font-weight-heading` | `600` |
| `--font-weight-label` | `500` |
| `--font-weight-body` | `400` |
| `--font-weight-body-bold` | `600` |
| `--line-height-label` | `1.2` |
| `--line-height-body` | `1.5` |
| `--line-height-heading` | `1.4` |
| `--letter-spacing-heading` | `-0.005em` |
| `--letter-spacing-label` | `0` |
| `--letter-spacing-body` | `0` |
| `--letter-spacing-tab-num` | `-0.05em` |

## Sizing / spacing / radius

| Token | Value |
| --- | --- |
| `--size-base-5xs` | `8px` |
| `--size-base-3xs` | `16px` |
| `--size-base-2xs` | `20px` |
| `--size-base-xs` | `24px` |
| `--size-base-sm` | `32px` |
| `--size-base-md` | `40px` |
| `--size-base-lg` | `48px` |
| `--padding-indicator-h-md` | `4px` |
| `--padding-field-v-xs` | `4px` |
| `--padding-field-h-sm` | `8px` |
| `--padding-field-v-sm` | `8px` |
| `--padding-action-h-xs` | `4px` |
| `--padding-action-h-md` | `12px` |
| `--padding-field-h-md` | `12px` |
| `--padding-field-v-md` | `12px` |
| `--padding-panel-v-xs` | `8px` |
| `--padding-panel-h-sm` | `12px` |
| `--padding-panel-v-sm` | `12px` |
| `--padding-panel-v-md` | `16px` |
| `--padding-panel-h-lg` | `24px` |
| `--padding-panel-v-lg` | `24px` |
| `--padding-panel-h-xl` | `40px` |
| `--padding-sized-v` | `0` |

## Gaps. `unit` separates parts of one thing, `block` separates things.

| Token | Value |
| --- | --- |
| `--gap-unit-stack-v` | `0` |
| `--gap-unit-v` | `4px` |
| `--gap-unit-inline-h` | `4px` |
| `--gap-unit-h` | `8px` |
| `--gap-block-v` | `8px` |
| `--gap-block-h` | `12px` |

## Radii

| Token | Value |
| --- | --- |
| `--border-radius-action` | `4px` |
| `--border-radius-input` | `4px` |
| `--border-radius-indicator` | `4px` |
| `--border-radius-panel-lg` | `8px` |
| `--radius-sm` | `var(--border-radius-action)` |
| `--radius-md` | `var(--border-radius-panel-lg)` |
| `--radius-pill` | `9999px` |

## Elevation

| Token | Value |
| --- | --- |
| `--shadow-elevation-1` | `0 1px 0 0 rgba(0, 0, 0, 0.05)` |
| `--shadow-elevation-2` | `0 0 1px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.05)` |
| `--shadow-elevation-3` | `0 0 1px rgba(0, 0, 0, 0.25), 0 4px 4px rgba(0, 0, 0, 0.05)` |
| `--shadow-elevation-5` | `0 0 1px rgba(0, 0, 0, 0.25), 0 12px 24px rgba(0, 0, 0, 0.2)` |

## Layout

| Token | Value |
| --- | --- |
| `--nav-top-h` | `0px` |
| `--nav-side-w` | `72px` |
| `--side-panel-w` | `360px` |
| `--nav-secondary-w` | `240px` |
| `--nav-secondary-w-collapsed` | `40px` |

## Motion

| Token | Value |
| --- | --- |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-spring` | `cubic-bezier(0.34, 1.4, 0.5, 1)` |
| `--ease-move` | `cubic-bezier(0.3, 0, 0, 1)` |
| `--dur-fast` | `120ms` |
| `--dur-med` | `220ms` |
| `--dur-slow` | `360ms` |
| `--color-primary-subtle` | `#e5f1fa` |
| `--color-primary-subtle-hover` | `#cce3f5` |
| `--color-primary-subtle-pressed` | `#b3d5f0` |
| `--color-warning-strong` | `#eb9600` |
| `--color-success-strong` | `#00ab61` |
| `--color-bg-selected` | `#e2f8ef` |
| `--color-bg-level0` | `#f5f7f9` |
| `--color-bg-neutral` | `#dde3e7` |

## elevation-4 — the floating action button (§18, Figma 407:4).

| Token | Value |
| --- | --- |
| `--shadow-elevation-4` | `0 0 1px rgba(0, 0, 0, 0.25), 0 8px 8px rgba(0, 0, 0, 0.08)` |
| `--shadow-sticky-bottom` | `0 0 1px rgba(0, 0, 0, 0.25), 0 -2px 4px rgba(0, 0, 0, 0.05)` |
| `--shadow-sticky-top` | `0 2px 0 rgba(23, 24, 26, 0.03), 0 1px 0 rgba(23, 24, 26, 0.05)` |
| `--shadow-sticky-right` | `-1px 0 1px rgba(0, 0, 0, 0.10), -8px 0 10px rgba(0, 0, 0, 0.05)` |
| `--color-tag-purple` | `#e2d6ff` |
| `--color-text-on-bright-strong` | `#172733` |
| `--color-tag-info-grey` | `#dde3e7` |
| `--color-tag-info-ginger` | `#ffdeb5` |
| `--color-tag-info-lemon` | `#fffeb4` |
| `--color-tag-info-melon` | `#b5ffdb` |
| `--color-tag-info-mint` | `#b4f8ff` |
| `--color-tag-info-lavender` | `#b4ccff` |
| `--color-tag-info-acai` | `#ecb4ff` |
| `--color-tag-info-purple-border` | `#f392dd` |
| `--color-tag-info-purple-text` | `#a61986` |
| `--color-tag-info-blue-border` | `#c9eaff` |
| `--color-tag-info-blue-text` | `#0095ff` |
| `--color-page-header-homepage-bg-a` | `var(--color-primary-hover)` |
| `--color-page-header-homepage-bg-b` | `var(--color-info-icon)` |

