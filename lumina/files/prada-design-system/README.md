# Prada Beauty Design System — Tokens

One source of truth. Two audiences. Zero duplication.

---

## What this is

A single set of JSON token files that serves both design (via Tokens Studio in Figma) and engineering (via Style Dictionary build pipeline). The same file that a designer edits in the Figma plugin is the same file a developer's CSS is built from.

```
tokens/          ← edit here. Never edit build/.
    colour.json
    typography.json
    spacing.json
    motion.json
    primitive.json
    $metadata.json

build/           ← auto-generated. gitignored. never edit.
    web/
    ios/
    android/
    react-native/
    docs/
```

---

## For designers — Tokens Studio setup

**Requirements:** Tokens Studio Pro (required for Git sync)

**First time:**
1. Open Figma → Tokens Studio plugin
2. Settings → Token Format → **Legacy** (default — do not change)
3. Settings → Sync → GitHub
4. Connect to this repo, branch `main`, token path `tokens/`
5. Pull tokens — you will see five sets: `primitive`, `colour`, `typography`, `spacing`, `motion`

**Themes:** The plugin shows four themes in the bottom panel:
- `Scanner` — S0/S2/S3 screens, compact density, dark
- `Editorial (PDP)` — product pages, airy, light  
- `Kiosk` — retail touchscreen, accessible, large
- `Reduced Motion` — accessibility override

Switch themes to see how components behave in each context. Build components against semantic tokens (`surface.page`, `type.body`, `spacing.screen-margin`) not primitive values.

**Making changes:**
1. Edit tokens in the plugin
2. Push to Git from the plugin's sync panel
3. CI validates and rebuilds all platform outputs automatically
4. Engineers pull the updated `build/` outputs

**Token naming convention:**
```
category/role/variant
colour/surface/page
typography/type/body
spacing/density/scanner/component-padding
motion/motion/hero/duration
```

---

## For developers — build pipeline

**Requirements:** Node 18+

**Setup:**
```bash
npm install
npm run build      # outputs to build/
npm run validate   # checks tokens before building
npm run build:watch  # rebuilds on token file changes
```

**Using web tokens:**
```css
/* Import base (semantic tokens, no theme) */
@import '@prada-beauty/design-system/build/web/base/tokens.css';

/* Import theme override (scanner, editorial, or kiosk) */
@import '@prada-beauty/design-system/build/web/scanner/tokens.css';
```

```html
<!-- Apply theme via data attribute on root element -->
<html data-theme="scanner">
<html data-theme="editorial">
<html data-theme="kiosk">
```

```css
/* Use semantic tokens in component CSS — never primitives */
.nav {
  height: var(--prada-layout-nav-height);           /* 48px */
  background: var(--prada-surface-scanner);          /* adapts to theme */
  color: var(--prada-foreground-primary);            /* adapts to theme */
  padding-inline: var(--prada-inset-xl);             /* 20px mobile */
}

.zone-score {
  font-size: var(--prada-type-zone-score-font-size); /* 18px */
  font-variant-numeric: tabular-nums;                /* always */
  color: var(--prada-feedback-score-high);           /* #2D6A4F */
}
```

**Using iOS tokens:**
```swift
import PradaTokens

Text("Skin").pradaType(.displayXl)
Rectangle().fill(Color.pradaSurfaceScanner)
.animation(.pradaHeroAnimation, value: score)
```

**Using Android tokens:**
```kotlin
Text("Skin", style = PradaType.displayXl)
Box(modifier = Modifier.background(PradaColor.surfaceScanner))
```

**Reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  :root {
    /* Import the reduced-motion theme overrides */
  }
}
```

---

## Token architecture

Three layers. Components only reference the middle layer.

```
PRIMITIVE          SEMANTIC              MODE OVERRIDE
────────────       ──────────────        ─────────────────
color.black    →   surface.page      ←   mode/colour/scanner
                                         mode/colour/light
                                         mode/colour/kiosk

font.size.16   →   type.body         ←   mode/type/scanner
                                         mode/type/kiosk

space.5        →   spacing.screen-   ←   mode/spacing/scanner
                   margin               mode/spacing/pdp
                                        mode/spacing/kiosk

duration.700   →   motion.hero       ←   mode/motion/scanner
                                         mode/motion/editorial
                                         mode/motion/kiosk
                                         mode/motion/reduced-motion
```

**Rule:** components reference semantic tokens only. Never `color.black`, always `surface.page`. When a theme switches, all component values update automatically.

---

## What's confirmed vs inferred

Every token value in this system is one of:

- **Confirmed** — extracted directly from Figma CSS output (`text-[22px]`, `tracking-[3.6px]`, `bg-[#696969]`). Marked with `_note` in the JSON.
- **Anchored** — cross-referenced against prada.com computed styles (body: 16px/Regular/24px, footer: 10px/Medium, secondary: 14px/Regular/20px).
- **Derived** — logically extended from confirmed values (desktop display-xl: 76px, kiosk body: 20px).

No values are invented. If a value isn't in the JSON it means it wasn't found in the Figma source.

---

## Adding a new token

1. Identify which file it belongs to (colour/typography/spacing/motion)
2. Identify which layer (primitive for raw values, semantic for roles)
3. Add with `value`, `type`, and `_note` (source confirmation)
4. Run `npm run validate`
5. Push — CI rebuilds all platforms

Never add a semantic token without a primitive to back it. Never add a primitive without a semantic role that uses it.

---

## File manifest

| File | Layer | Tokens | Purpose |
|---|---|---|---|
| `primitive.json` | Primitive | 68 | Raw font, weight, legacy spacing |
| `colour.json` | Primitive + Semantic + Mode | 81 | All colour decisions |
| `typography.json` | Primitive + Semantic + Mode | 75 | All type decisions |
| `spacing.json` | Primitive + Semantic + Mode | 63 | All space decisions |
| `motion.json` | Primitive + Semantic + Mode | 70 | All animation decisions |
| `$metadata.json` | Config | — | Tokens Studio theme config |

**Total: 357 tokens**

---

## GT-America font substitution

The current system uses Source Sans 3 as a GT-America substitute. When the font is licensed:

1. Open `primitive.json`
2. Change `"value": "Source Sans 3"` → `"value": "GT-America"`
3. Run `npm run build`

All platforms update. One line change.
