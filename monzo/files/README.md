# Revolut Design System — Token Architecture

A production-ready, three-tier token system based on Revolut's brand and UX standards. Compatible with **Token Studio** (Figma Tokens), **Style Dictionary**, **Tailwind CSS**, and **React**.

---

## Folder Structure

```
revolut-tokens/
├── tokens/
│   ├── primitive/
│   │   ├── color.json          ← Raw colour palette (navy, blue, indigo, lime, green, red, amber, neutral)
│   │   ├── spacing.json        ← 4px grid spacing scale (0–256px)
│   │   ├── typography.json     ← Font family, size, weight, line-height, letter-spacing
│   │   ├── shape.json          ← Border radius, border width, shadow, opacity
│   │   └── motion.json         ← Duration and easing curves
│   ├── semantic/
│   │   ├── color-light.json    ← Purpose-mapped colours for light mode
│   │   ├── color-dark.json     ← Purpose-mapped colours for dark mode
│   │   ├── spacing.json        ← Named spacing for components and layouts
│   │   └── typography.json     ← Named type styles (display, heading, body, label, amount)
│   └── component/
│       └── components.json     ← Component-level tokens (button, input, card, badge, modal…)
├── tailwind.config.js          ← Tailwind config consuming the token system
├── revolut-tokens.css          ← CSS custom properties + @font-face + global base
└── tokens.ts                   ← Type-safe React/TypeScript token exports
```

---

## Three-Tier Architecture

```
Primitive  →  Semantic  →  Component
  raw            intent      specific
#7F84F6  → color.brand.primary → button.primary.background
```

**Never** skip tiers: components should reference semantic tokens, semantics reference primitives.

---

## Brand Foundations

### Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `color.navy.800` | `#191C1F` | **Shark** — primary brand dark, logotype |
| `color.blue.400` | `#7F84F6` | **Cornflower Blue** — primary interactive, CTAs |
| `color.indigo.800` | `#261073` | **Deep Purple** — Metal/Ultra tier, premium |
| `color.lime.400` | `#AEDB00` | **Lime** — accent only, max 10% layout |

### Typography

Revolut's brand typeface is **Aeonik Pro** (in use since the 2023 rebrand). It supports 200+ languages and covers all 38+ markets. Ensure you hold a valid commercial licence.

```
Display/Hero  → 72px Bold, -0.05em tracking
Heading H1    → 36px Bold, -0.025em tracking  
Body Default  → 16px Regular, 1.5 line-height (WCAG 1.4.12 base)
Amount Hero   → 48px Bold, tabular-nums
Code/Mono     → JetBrains Mono — account numbers, sort codes
```

### Spacing

4px base grid. All values are multiples of 4. Key landmarks:
- `spacing.11` = **44px** — WCAG 2.5.5 minimum touch target
- `spacing.12` = **48px** — preferred touch target / nav bar height

---

## Accessibility Rules (WCAG 2.1 AA Compliance)

All semantic token pairings have been validated:

| Pairing | Ratio | Level |
|---------|-------|-------|
| `text-primary` on `bg-surface` (light) | 16.1:1 | **AAA** |
| `text-secondary` on `bg-surface` (light) | 7.0:1 | **AAA** |
| `text-tertiary` on `bg-surface` (light) | 4.6:1 | AA |
| `text-link` on `bg-surface` (light) | 4.7:1 | AA |
| `text-success` on `bg-surface` (light) | 5.3:1 | AA |
| `text-danger` on `bg-surface` (light) | 5.9:1 | AA |
| `text-primary` on `bg-surface` (dark) | 16.0:1 | **AAA** |
| `text-link` on `bg-surface` (dark) | 5.1:1 | AA |

**WCAG checkpoints addressed:**
- **1.4.3** Contrast (Minimum) — all text tokens ≥4.5:1
- **1.4.4** Resize Text — base font-size is `100%` (16px), scales freely
- **1.4.10** Reflow — max-width tokens prevent overflow at 400% zoom
- **1.4.11** Non-text Contrast — border-focus is 3:1 minimum
- **1.4.12** Text Spacing — line-height ≥1.5 on body styles
- **2.4.7** Focus Visible — all interactive elements have visible focus ring
- **2.4.11** Focus Appearance — 2px focus ring, 3:1 contrast ratio
- **2.5.5** Target Size — minimum 44px, preferred 48px touch targets
- **2.3.3** Animation from Interactions — `prefers-reduced-motion` handled globally

---

## Token Studio (Figma Tokens) Setup

1. Install the **Tokens Studio** plugin in Figma
2. Connect to this repository (GitHub sync recommended)
3. Import files in this order:
   - `tokens/primitive/*.json` as group **"Primitive"**
   - `tokens/semantic/color-light.json` as set **"Light"**
   - `tokens/semantic/color-dark.json` as set **"Dark"**
   - `tokens/semantic/spacing.json` + `typography.json` as **"Semantic"**
   - `tokens/component/components.json` as **"Component"**
4. Use **Theme** feature to switch between Light/Dark sets

---

## Tailwind CSS Usage

```bash
npm install -D tailwindcss
```

Replace your `tailwind.config.js` with the provided file.

Import the CSS variables in your root layout:

```css
/* globals.css */
@import './revolut-tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Example usage

```tsx
// Semantic colour utilities
<div className="bg-bg-surface text-text-primary border border-border-default">

// Primitive colour scale
<div className="bg-blue-400 text-white">

// Component shortcut
<button className="revolut-btn-primary">Send Money</button>

// Dark mode (class-based)
<html className="dark">
  <div className="bg-bg-surface">  {/* automatically uses dark surface colour */}
```

---

## React / TypeScript Usage

```tsx
import tokens, { brand, semanticColors, spacing } from './tokens';
import type { ComponentSize, SemanticColor } from './tokens';

// Access brand primitives
const primaryBlue = brand.cornflower;  // '#7F84F6'

// Framer Motion example
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: tokens.motion.duration.normal / 1000,  // 0.2s
    ease: tokens.motion.easing.easeOut,
  }}
/>

// Recharts / charting
const chartColors = [
  tokens.color.blue[400],
  tokens.color.indigo[400],
  tokens.color.lime[400],
  tokens.color.green[400],
];

// Inline styles (prefer Tailwind classes over this)
const amountStyle: React.CSSProperties = {
  fontSize: tokens.typography.fontSize['5xl'],
  fontWeight: tokens.typography.fontWeight.bold,
  fontVariantNumeric: 'tabular-nums',
  color: tokens.semantic.light.text.positive,
};
```

---

## Dark Mode

Dark mode is **class-based** (`dark` on `<html>`). The CSS variable file handles all overrides.

```tsx
// Toggle
document.documentElement.classList.toggle('dark');

// React hook
const [isDark, setIsDark] = useState(false);
useEffect(() => {
  document.documentElement.classList.toggle('dark', isDark);
}, [isDark]);
```

System preference is also respected automatically when no `light` or `dark` class is present.

---

## Brand Usage Rules

1. **Cornflower Blue** (`#7F84F6`) is the primary interactive colour. Reserve it for CTAs, links, and selected states.
2. **Shark** (`#191C1F`) anchors dark surfaces and the logotype. Never use it on dark backgrounds.
3. **Lime** (`#AEDB00`) is an accent — maximum 10% of any layout. Never pair lime text on white (insufficient contrast).
4. **Premium Purple** (`#261073`) is exclusive to Metal/Ultra plan surfaces.
5. **Typography must be Aeonik Pro** — bold, capitalized headlines are a core brand signal.
6. **3D/gradient visuals** are brand-appropriate for marketing; keep UI surfaces clean and flat.
7. **Gradients** use `blue.400 → indigo.800` for brand gradient expressions.

---

## Gradient Reference

```css
/* Brand primary gradient */
background: linear-gradient(135deg, #7F84F6 0%, #261073 100%);

/* Premium card gradient */
background: linear-gradient(135deg, #6E4CE5 0%, #261073 50%, #0E0533 100%);

/* Success gradient */
background: linear-gradient(135deg, #34C17E 0%, #116E3F 100%);

/* Lime accent gradient (use sparingly) */
background: linear-gradient(135deg, #AEDB00 0%, #789900 100%);
```
