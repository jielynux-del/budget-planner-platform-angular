# UiAvatar

**Selector:** `ui-avatar`

**Import**

```ts
import { UiAvatar } from 'ai-dls-kit';
```

## Description

DLS 3.1 avatar (register §3) — replaces the old free-px hex-background
circle wholesale. Four types share one 5-size box:

  <ui-avatar name="Aiko MORI" colour="goji" />                 initials
  <ui-avatar type="icon" />                                     white + glyph
  <ui-avatar type="placeholder" />                               neutral + glyph
  <ui-avatar type="image" img="/avatar.jpg" />                   clipped circle
  <ui-avatar type="image" img="/logo.png" [circle]="false" />    unclipped (DLS "Card")

Owner ruling: `bg` (hex) and the old free-px `size` are GONE — no more hex
moving forward. `colour` is one of the 16 named DLS swatches (`AVATAR_COLOURS`),
`size` is one of the 5 DLS steps, default `sm` (32px — the closest DLS step
to the old 28px default; sm/md tied on distance, the owner broke the tie
toward sm).

LETTER RULE (DLS 3.1): two initials at md/lg/xl, a single initial at sm/xs
— smaller boxes drop to one letter rather than crowding two.

## API

**Inputs**

| Name | Type | Default |
| --- | --- | --- |
| `name` | `string` | `''` |
| `type` | `UiAvatarType` | `'initials'` |
| `colour` | `UiAvatarColour` | `'goji'` |
| `size` | `UiAvatarSize` | `'sm'` |
| `img` | `string` | `''` |
| `circle` | `(inferred)` | `true` |

## Types

DLS 3.1 avatar `Type` axis.

```ts
export type UiAvatarType = 'initials' | 'icon' | 'placeholder' | 'image';
```

DLS 3.1 avatar `Size` axis — Figma's variant names say "64px" for `xl`,
 but the harvested frame measures 56px; trust the measurement.

```ts
export type UiAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

```ts
export type UiAvatarColour = (typeof AVATAR_COLOURS)[number];
```

## Slots

_No content projection slots._


## Example

From the kit's kitchen sink:

```html
<p class="hint">Sizes — the letter-rule flip happens between md and sm:</p>
      <div class="row avatar-sizes-row">
        @for (s of avatarSizes; track s.size) {
          <ui-avatar name="Aiko MORI" colour="goji" [size]="s.size" />
        }
      </div>

      <p class="hint">Palette — 16 named colours:</p>
      <div class="row wrap avatar-swatch-row">
        @for (c of avatarColours; track c) {
          <div class="avatar-swatch">
            <ui-avatar name="AA" type="initials" [colour]="c" size="md" />
            <span class="avatar-swatch-label">{{ c }}</span>
          </div>
        }
      </div>

      <p class="hint">Type axis — icon / placeholder at md:</p>
      <div class="row avatar-type-row">
        <ui-avatar type="icon" size="md" />
        <ui-avatar type="placeholder" size="md" />
      </div>

      <p class="hint">Image type — clipped (circle, default) vs unclipped (circle=false, DLS "Card"):</p>
      <div class="row avatar-image-row">
        <ui-avatar type="image" size="lg" [img]="avatarDemoImg" />
        <ui-avatar type="image" size="lg" [img]="avatarDemoImg" [circle]="false" />
      </div>

      <p class="hint">ui-kebab-menu:</p>
      <div class="row">
        <ui-kebab-menu [items]="menuItems" (selected)="lastMenuPick.set($event)" />
      </div>
      <p class="hint">Menu pick: {{ lastMenuPick() ?? '—' }}</p>
    </div>
  </section>
```


## Provenance

§3 (optional background — no Figma access required to use this component)
