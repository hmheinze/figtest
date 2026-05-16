/**
 * Revolut Design System — React Token Exports
 * =============================================
 * Type-safe token constants for use in React components, styled-components,
 * Emotion, inline styles, or anywhere you need programmatic access to tokens.
 *
 * Usage:
 *   import { tokens, colorPrimitives, semanticColors } from '@/design-system/tokens';
 *   import type { SemanticColor, ComponentSize } from '@/design-system/tokens';
 *
 * Note: For Tailwind-based components, prefer CSS class names over these values.
 * Use these for: Canvas/WebGL, dynamic styles, animation libraries (Framer Motion),
 * charting (Recharts/Victory), and runtime theme calculations.
 */

// ─── Primitive Colours ───────────────────────────────────────────────────────

export const colorPrimitives = {
  navy: {
    50:  '#F0F1F2',
    100: '#D6D8DC',
    200: '#AEB3BA',
    300: '#858D97',
    400: '#5C6673',
    500: '#3B4450',
    600: '#2A3140',
    700: '#1E2530',
    800: '#191C1F', // Shark — primary brand dark
    900: '#0F1215',
    950: '#08090B',
  },
  blue: {
    50:  '#EEF0FE',
    100: '#D9DCFD',
    200: '#B3B9FB',
    300: '#8D96F9',
    400: '#7F84F6', // Cornflower Blue — brand signature
    500: '#6B70F3',
    600: '#545AEF',
    700: '#3D43E0',
    800: '#2B30C4',
    900: '#1E228F',
    950: '#111460',
  },
  indigo: {
    50:  '#EEECFD',
    100: '#D8D3FB',
    200: '#B1A7F7',
    300: '#8A7BF3',
    400: '#6E4CE5',
    500: '#5A3ACE',
    600: '#4529B4',
    700: '#321A96',
    800: '#261073', // Deep purple — Metal/Ultra
    900: '#1A0A52',
    950: '#0E0533',
  },
  lime: {
    50:  '#F5FBDB',
    100: '#E9F6B2',
    200: '#D3ED65',
    300: '#C2E530',
    400: '#AEDB00', // Brand lime — use sparingly
    500: '#93BB00',
    600: '#789900',
    700: '#5D7800',
    800: '#445800',
    900: '#2C3900',
  },
  green: {
    50:  '#EDFAF3',
    100: '#D0F2E2',
    200: '#A0E4C4',
    300: '#65D4A0',
    400: '#34C17E',
    500: '#1FA965',
    600: '#178C52',
    700: '#116E3F',
    800: '#0C512E',
    900: '#07341D',
  },
  red: {
    50:  '#FEF2F2',
    100: '#FDE3E3',
    200: '#FBBBBB',
    300: '#F88686',
    400: '#F55252',
    500: '#E83030',
    600: '#C82020',
    700: '#A01818',
    800: '#781010',
    900: '#500A0A',
  },
  amber: {
    50:  '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  neutral: {
    0:    '#FFFFFF',
    50:   '#F8F9FA',
    100:  '#F1F3F5',
    200:  '#E9ECEF',
    300:  '#DEE2E6',
    400:  '#CED4DA',
    500:  '#ADB5BD',
    600:  '#868E96',
    700:  '#495057',
    800:  '#343A40',
    900:  '#212529',
    950:  '#121416',
    1000: '#000000',
  },
} as const;

// ─── Brand Tokens ────────────────────────────────────────────────────────────

export const brand = {
  shark:       colorPrimitives.navy[800],   // #191C1F
  cornflower:  colorPrimitives.blue[400],   // #7F84F6
  lime:        colorPrimitives.lime[400],   // #AEDB00
  ultraPurple: colorPrimitives.indigo[800], // #261073
} as const;

// ─── Semantic Colours (theme-aware) ─────────────────────────────────────────
// These resolve to CSS variables — use them with `getComputedStyle` or in
// runtime contexts where CSS vars aren't available (e.g. react-native-web).

export const semanticColors = {
  light: {
    text: {
      primary:        colorPrimitives.navy[800],
      secondary:      colorPrimitives.neutral[700],
      tertiary:       colorPrimitives.neutral[600],
      disabled:       colorPrimitives.neutral[400],
      inverse:        colorPrimitives.neutral[0],
      link:           colorPrimitives.blue[600],
      brand:          colorPrimitives.blue[400],
      success:        colorPrimitives.green[700],
      warning:        colorPrimitives.amber[700],
      danger:         colorPrimitives.red[700],
      positive:       colorPrimitives.green[600],
      negative:       colorPrimitives.red[600],
    },
    background: {
      canvas:         colorPrimitives.neutral[50],
      surface:        colorPrimitives.neutral[0],
      subtle:         colorPrimitives.neutral[100],
      inverse:        colorPrimitives.navy[800],
      brand:          colorPrimitives.blue[400],
      brandSubtle:    colorPrimitives.blue[50],
      premium:        colorPrimitives.indigo[800],
      success:        colorPrimitives.green[500],
      successSubtle:  colorPrimitives.green[50],
      warning:        colorPrimitives.amber[400],
      warningSubtle:  colorPrimitives.amber[50],
      danger:         colorPrimitives.red[500],
      dangerSubtle:   colorPrimitives.red[50],
    },
    border: {
      default:   colorPrimitives.neutral[200],
      subtle:    colorPrimitives.neutral[100],
      strong:    colorPrimitives.neutral[400],
      brand:     colorPrimitives.blue[400],
      focus:     colorPrimitives.blue[400],
      success:   colorPrimitives.green[400],
      warning:   colorPrimitives.amber[400],
      danger:    colorPrimitives.red[400],
    },
  },
  dark: {
    text: {
      primary:        colorPrimitives.neutral[0],
      secondary:      colorPrimitives.neutral[300],
      tertiary:       colorPrimitives.neutral[500],
      disabled:       colorPrimitives.neutral[600],
      inverse:        colorPrimitives.navy[800],
      link:           colorPrimitives.blue[300],
      brand:          colorPrimitives.blue[300],
      success:        colorPrimitives.green[300],
      warning:        colorPrimitives.amber[300],
      danger:         colorPrimitives.red[300],
      positive:       colorPrimitives.green[400],
      negative:       colorPrimitives.red[400],
    },
    background: {
      canvas:         colorPrimitives.navy[950],
      surface:        colorPrimitives.navy[800],
      subtle:         colorPrimitives.navy[900],
      inverse:        colorPrimitives.neutral[0],
      brand:          colorPrimitives.blue[600],
      brandSubtle:    colorPrimitives.blue[950],
      premium:        colorPrimitives.indigo[900],
      success:        colorPrimitives.green[700],
      successSubtle:  colorPrimitives.green[900],
      warning:        colorPrimitives.amber[700],
      warningSubtle:  colorPrimitives.amber[900],
      danger:         colorPrimitives.red[700],
      dangerSubtle:   colorPrimitives.red[900],
    },
    border: {
      default:   colorPrimitives.navy[600],
      subtle:    colorPrimitives.navy[700],
      strong:    colorPrimitives.neutral[600],
      brand:     colorPrimitives.blue[400],
      focus:     colorPrimitives.blue[300],
      success:   colorPrimitives.green[600],
      warning:   colorPrimitives.amber[500],
      danger:    colorPrimitives.red[500],
    },
  },
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
  0:    0,
  px:   1,
  0.5:  2,
  1:    4,
  1.5:  6,
  2:    8,
  2.5:  10,
  3:    12,
  3.5:  14,
  4:    16,
  5:    20,
  6:    24,
  7:    28,
  8:    32,
  9:    36,
  10:   40,
  11:   44,  // WCAG min touch target
  12:   48,  // Preferred touch target
  14:   56,
  16:   64,
  20:   80,
  24:   96,
  28:   112,
  32:   128,
  36:   144,
  40:   160,
  48:   192,
  56:   224,
  64:   256,
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    brand: "'Aeonik Pro', 'Aeonik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono:  "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
  },
  fontSize: {
    '2xs': 10,
    xs:    12,
    sm:    14,
    md:    16,
    lg:    18,
    xl:    20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
  },
  fontWeight: {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
  },
  lineHeight: {
    none:    1,
    tight:   1.2,
    snug:    1.35,
    normal:  1.5,
    relaxed: 1.65,
    loose:   2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight:   '-0.025em',
    normal:  '0em',
    wide:    '0.025em',
    wider:   '0.05em',
    widest:  '0.1em',
  },
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const borderRadius = {
  none:  0,
  xs:    2,
  sm:    4,
  md:    8,
  lg:    12,
  xl:    16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,
  full:  9999,
} as const;

// ─── Shadow ───────────────────────────────────────────────────────────────────

export const shadow = {
  none:         'none',
  xs:           '0px 1px 2px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.10)',
  sm:           '0px 1px 3px rgba(0,0,0,0.08), 0px 4px 6px rgba(0,0,0,0.06)',
  md:           '0px 4px 6px rgba(0,0,0,0.07), 0px 10px 15px rgba(0,0,0,0.10)',
  lg:           '0px 10px 15px rgba(0,0,0,0.08), 0px 20px 25px rgba(0,0,0,0.10)',
  xl:           '0px 20px 25px rgba(0,0,0,0.10), 0px 40px 50px rgba(0,0,0,0.12)',
  '2xl':        '0px 25px 50px rgba(0,0,0,0.25)',
  blueGlow:     '0px 0px 0px 3px rgba(127,132,246,0.35)',
  cardPremium:  '0px 8px 24px rgba(110,76,229,0.20), 0px 2px 6px rgba(0,0,0,0.12)',
} as const;

// ─── Motion ───────────────────────────────────────────────────────────────────

export const motion = {
  duration: {
    instant:    0,
    fastest:    50,
    faster:     100,
    fast:       150,
    normal:     200,
    moderate:   250,
    slow:       300,
    slower:     400,
    slowest:    500,
    deliberate: 700,
  },
  easing: {
    linear:    'linear',
    easeIn:    'cubic-bezier(0.4, 0, 1, 1)',
    easeOut:   'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smoothOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

// ─── Component Size Variants ──────────────────────────────────────────────────

export const componentSize = {
  sm: {
    height:   spacing[11],  // 44px — WCAG min
    fontSize: typography.fontSize.sm,
    paddingX: spacing[3],   // 12px
  },
  md: {
    height:   spacing[12],  // 48px — preferred
    fontSize: typography.fontSize.md,
    paddingX: spacing[6],   // 24px
  },
  lg: {
    height:   56,
    fontSize: typography.fontSize.lg,
    paddingX: spacing[8],   // 32px
  },
} as const;

// ─── TypeScript Types ─────────────────────────────────────────────────────────

export type ColorScale = keyof typeof colorPrimitives;
export type NavyShade = keyof typeof colorPrimitives.navy;
export type BlueShade = keyof typeof colorPrimitives.blue;
export type NeutralShade = keyof typeof colorPrimitives.neutral;
export type SemanticColor = keyof typeof semanticColors.light.text;
export type BackgroundToken = keyof typeof semanticColors.light.background;
export type BorderToken = keyof typeof semanticColors.light.border;
export type ComponentSize = keyof typeof componentSize;
export type SpacingScale = keyof typeof spacing;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type BorderRadiusScale = keyof typeof borderRadius;
export type ShadowScale = keyof typeof shadow;
export type MotionDuration = keyof typeof motion.duration;
export type MotionEasing = keyof typeof motion.easing;

// ─── Master Token Export ──────────────────────────────────────────────────────

export const tokens = {
  color: colorPrimitives,
  brand,
  semantic: semanticColors,
  spacing,
  typography,
  borderRadius,
  shadow,
  motion,
  componentSize,
} as const;

export type Tokens = typeof tokens;

export default tokens;
