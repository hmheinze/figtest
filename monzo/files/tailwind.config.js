/** @type {import('tailwindcss').Config} */

/**
 * Revolut Design System — Tailwind CSS Configuration
 * =====================================================
 * This config translates the Revolut token system into Tailwind utility classes.
 * Tokens are organised in three tiers:
 *   1. Primitive  → raw values (colors, spacing scale)
 *   2. Semantic   → purposeful aliases (text-primary, bg-surface)
 *   3. Component  → consumed via @apply in component CSS or cn() helpers
 *
 * Usage:
 *   - Install: npm install -D tailwindcss
 *   - Replace your tailwind.config.js with this file
 *   - Import CSS variables from `revolut-tokens.css` in your root layout
 *
 * Dark mode: class-based (`dark` on <html>).
 * The CSS variable file handles theme switching automatically.
 */

module.exports = {
  darkMode: 'class',

  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    // ─── Override defaults entirely — use Revolut's scale ───────────────
    fontFamily: {
      brand: ["'Aeonik Pro'", "'Aeonik'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'sans-serif'],
      sans:  ["'Aeonik Pro'", "'Aeonik'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'sans-serif'],
      mono:  ["'JetBrains Mono'", "'Fira Code'", "'SF Mono'", 'monospace'],
    },

    // ─── Spacing (4px base grid) ─────────────────────────────────────────
    spacing: {
      px:    '1px',
      0:     '0px',
      0.5:   '2px',
      1:     '4px',
      1.5:   '6px',
      2:     '8px',
      2.5:   '10px',
      3:     '12px',
      3.5:   '14px',
      4:     '16px',
      5:     '20px',
      6:     '24px',
      7:     '28px',
      8:     '32px',
      9:     '36px',
      10:    '40px',
      11:    '44px',  // WCAG min touch target
      12:    '48px',  // Preferred touch target
      14:    '56px',
      16:    '64px',
      20:    '80px',
      24:    '96px',
      28:    '112px',
      32:    '128px',
      36:    '144px',
      40:    '160px',
      48:    '192px',
      56:    '224px',
      64:    '256px',
    },

    // ─── Border Radius ────────────────────────────────────────────────────
    borderRadius: {
      none:  '0px',
      xs:    '2px',
      sm:    '4px',
      DEFAULT:'8px',
      md:    '8px',
      lg:    '12px',
      xl:    '16px',
      '2xl': '20px',
      '3xl': '24px',
      '4xl': '32px',
      full:  '9999px',
    },

    // ─── Font Size ────────────────────────────────────────────────────────
    fontSize: {
      '2xs': ['10px', { lineHeight: '1.5', letterSpacing: '0.1em' }],
      xs:    ['12px', { lineHeight: '1.5', letterSpacing: '0.025em' }],
      sm:    ['14px', { lineHeight: '1.5' }],
      base:  ['16px', { lineHeight: '1.5' }],
      md:    ['16px', { lineHeight: '1.5' }],
      lg:    ['18px', { lineHeight: '1.5' }],
      xl:    ['20px', { lineHeight: '1.35' }],
      '2xl': ['24px', { lineHeight: '1.35' }],
      '3xl': ['30px', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
      '4xl': ['36px', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
      '5xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.05em' }],
      '6xl': ['60px', { lineHeight: '1.2', letterSpacing: '-0.05em' }],
      '7xl': ['72px', { lineHeight: '1.2', letterSpacing: '-0.05em' }],
      '8xl': ['96px', { lineHeight: '1.2', letterSpacing: '-0.05em' }],
    },

    // ─── Font Weight ──────────────────────────────────────────────────────
    fontWeight: {
      regular:   '400',
      medium:    '500',
      semibold:  '600',
      bold:      '700',
      extrabold: '800',
    },

    // ─── Line Height ──────────────────────────────────────────────────────
    lineHeight: {
      none:    '1',
      tight:   '1.2',
      snug:    '1.35',
      normal:  '1.5',
      relaxed: '1.65',
      loose:   '2',
    },

    // ─── Letter Spacing ───────────────────────────────────────────────────
    letterSpacing: {
      tighter: '-0.05em',
      tight:   '-0.025em',
      normal:  '0em',
      wide:    '0.025em',
      wider:   '0.05em',
      widest:  '0.1em',
    },

    // ─── Box Shadow ───────────────────────────────────────────────────────
    boxShadow: {
      none:         'none',
      xs:           '0px 1px 2px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.10)',
      sm:           '0px 1px 3px rgba(0,0,0,0.08), 0px 4px 6px rgba(0,0,0,0.06)',
      DEFAULT:      '0px 4px 6px rgba(0,0,0,0.07), 0px 10px 15px rgba(0,0,0,0.10)',
      md:           '0px 4px 6px rgba(0,0,0,0.07), 0px 10px 15px rgba(0,0,0,0.10)',
      lg:           '0px 10px 15px rgba(0,0,0,0.08), 0px 20px 25px rgba(0,0,0,0.10)',
      xl:           '0px 20px 25px rgba(0,0,0,0.10), 0px 40px 50px rgba(0,0,0,0.12)',
      '2xl':        '0px 25px 50px rgba(0,0,0,0.25)',
      'blue-glow':  '0px 0px 0px 3px rgba(127,132,246,0.35)',
      'card-premium': '0px 8px 24px rgba(110,76,229,0.20), 0px 2px 6px rgba(0,0,0,0.12)',
    },

    // ─── Transition Duration ──────────────────────────────────────────────
    transitionDuration: {
      0:    '0ms',
      fastest: '50ms',
      faster: '100ms',
      fast: '150ms',
      DEFAULT: '200ms',
      200:  '200ms',
      moderate: '250ms',
      slow: '300ms',
      300:  '300ms',
      slower: '400ms',
      slowest: '500ms',
      deliberate: '700ms',
    },

    // ─── Transition Timing ────────────────────────────────────────────────
    transitionTimingFunction: {
      DEFAULT:    'cubic-bezier(0.4, 0, 0.2, 1)',
      linear:     'linear',
      in:         'cubic-bezier(0.4, 0, 1, 1)',
      out:        'cubic-bezier(0, 0, 0.2, 1)',
      'in-out':   'cubic-bezier(0.4, 0, 0.2, 1)',
      spring:     'cubic-bezier(0.34, 1.56, 0.64, 1)',
      'smooth-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
    },

    // ─── Max Width ────────────────────────────────────────────────────────
    maxWidth: {
      none:      'none',
      xs:        '320px',
      sm:        '384px',
      md:        '448px',
      lg:        '512px',
      xl:        '576px',
      '2xl':     '672px',
      '3xl':     '768px',
      '4xl':     '896px',
      '5xl':     '1024px',
      '6xl':     '1152px',
      '7xl':     '1280px',
      readable:  '720px',  // Max readable text block
      content:   '1280px', // Max Revolut content width
      full:      '100%',
      screen:    '100vw',
    },

    // ─── Colours — CSS variable-driven for theme switching ───────────────
    colors: {
      // ── Primitive Palette ──────────────────────────────────────
      navy: {
        50:  '#F0F1F2',
        100: '#D6D8DC',
        200: '#AEB3BA',
        300: '#858D97',
        400: '#5C6673',
        500: '#3B4450',
        600: '#2A3140',
        700: '#1E2530',
        800: '#191C1F', // Shark — brand dark
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
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      current: 'currentColor',

      // ── Semantic aliases (CSS variable-backed) ─────────────────
      // These map directly to CSS custom properties defined in revolut-tokens.css
      // Usage: bg-background-surface, text-text-primary, border-border-brand, etc.
      'text-primary':     'var(--color-text-primary)',
      'text-secondary':   'var(--color-text-secondary)',
      'text-tertiary':    'var(--color-text-tertiary)',
      'text-disabled':    'var(--color-text-disabled)',
      'text-inverse':     'var(--color-text-inverse)',
      'text-link':        'var(--color-text-link)',
      'text-brand':       'var(--color-text-brand)',
      'text-success':     'var(--color-text-success)',
      'text-warning':     'var(--color-text-warning)',
      'text-danger':      'var(--color-text-danger)',
      'text-positive':    'var(--color-text-positive)',
      'text-negative':    'var(--color-text-negative)',

      'bg-canvas':        'var(--color-bg-canvas)',
      'bg-surface':       'var(--color-bg-surface)',
      'bg-subtle':        'var(--color-bg-subtle)',
      'bg-inverse':       'var(--color-bg-inverse)',
      'bg-brand':         'var(--color-bg-brand)',
      'bg-brand-subtle':  'var(--color-bg-brand-subtle)',
      'bg-premium':       'var(--color-bg-premium)',
      'bg-success':       'var(--color-bg-success)',
      'bg-success-subtle':'var(--color-bg-success-subtle)',
      'bg-warning':       'var(--color-bg-warning)',
      'bg-warning-subtle':'var(--color-bg-warning-subtle)',
      'bg-danger':        'var(--color-bg-danger)',
      'bg-danger-subtle': 'var(--color-bg-danger-subtle)',

      'border-default':   'var(--color-border-default)',
      'border-subtle':    'var(--color-border-subtle)',
      'border-strong':    'var(--color-border-strong)',
      'border-brand':     'var(--color-border-brand)',
      'border-focus':     'var(--color-border-focus)',
      'border-success':   'var(--color-border-success)',
      'border-warning':   'var(--color-border-warning)',
      'border-danger':    'var(--color-border-danger)',
    },

    // ─── Opacity ──────────────────────────────────────────────────────────
    opacity: {
      0:   '0',
      5:   '0.05',
      10:  '0.10',
      20:  '0.20',
      25:  '0.25',
      40:  '0.40',
      50:  '0.50',
      60:  '0.60',
      75:  '0.75',
      80:  '0.80',
      90:  '0.90',
      100: '1',
    },

    extend: {
      // ── Custom screen breakpoints (Revolut-aligned) ──────────────
      screens: {
        xs:  '375px',   // iPhone SE
        sm:  '640px',   // Small tablet
        md:  '768px',   // Tablet
        lg:  '1024px',  // Desktop
        xl:  '1280px',  // Wide desktop
        '2xl': '1536px',
      },

      // ── z-index scale ────────────────────────────────────────────
      zIndex: {
        auto:    'auto',
        0:       '0',
        base:    '1',
        raised:  '10',
        dropdown: '100',
        sticky:  '200',
        overlay: '300',
        modal:   '400',
        toast:   '500',
        tooltip: '600',
        critical:'900',
      },

      // ── Animation keyframes ──────────────────────────────────────
      keyframes: {
        'fade-in':      { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-out':     { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        'slide-up':     { '0%': { transform: 'translateY(8px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'slide-down':   { '0%': { transform: 'translateY(-8px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'sheet-up':     { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
        'scale-in':     { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'spin-slow':    { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        'pulse-brand':  { '0%, 100%': { boxShadow: '0 0 0 0 rgba(127,132,246,0)' }, '50%': { boxShadow: '0 0 0 6px rgba(127,132,246,0.25)' } },
        'count-up':     { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
      },

      animation: {
        'fade-in':    'fade-in 200ms cubic-bezier(0,0,0.2,1) forwards',
        'fade-out':   'fade-out 150ms cubic-bezier(0.4,0,1,1) forwards',
        'slide-up':   'slide-up 200ms cubic-bezier(0,0,0.2,1) forwards',
        'slide-down': 'slide-down 200ms cubic-bezier(0,0,0.2,1) forwards',
        'sheet-up':   'sheet-up 300ms cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':   'scale-in 200ms cubic-bezier(0.34,1.56,0.64,1) forwards',
        'spin-slow':  'spin-slow 2s linear infinite',
        'pulse-brand':'pulse-brand 2s ease-in-out infinite',
      },

      // ── Aspect ratios ─────────────────────────────────────────────
      aspectRatio: {
        'card':    '1.586 / 1', // Standard payment card aspect ratio (ISO 7810 ID-1)
        'square':  '1 / 1',
        'video':   '16 / 9',
        'portrait':'3 / 4',
      },
    },
  },

  plugins: [
    // ── Custom utilities ─────────────────────────────────────────────────
    function ({ addUtilities, addComponents, theme }) {
      // Tab size for financial data
      addUtilities({
        '.tabular-nums': { fontVariantNumeric: 'tabular-nums' },
        '.oldstyle-nums': { fontVariantNumeric: 'oldstyle-nums' },

        // Revolut standard focus ring
        '.focus-ring': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${theme('colors.bg-surface', '#fff')}, 0 0 0 4px ${theme('colors.blue.400', '#7F84F6')}`,
        },
        '.focus-ring-brand': {
          outline: 'none',
          boxShadow: '0px 0px 0px 3px rgba(127,132,246,0.35)',
        },

        // Amount display utility
        '.amount-display': {
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.025em',
          fontWeight: '700',
        },

        // Reduce motion utilities
        '@media (prefers-reduced-motion: reduce)': {
          '.motion-safe\\:animate-none': { animation: 'none' },
          '.motion-reduce\\:transition-none': { transition: 'none' },
        },
      });

      // Component shortcuts
      addComponents({
        '.revolut-card': {
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.6'),
          border: `1px solid var(--color-border-default)`,
          boxShadow: theme('boxShadow.sm'),
        },
        '.revolut-btn-primary': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: theme('spacing.12'),
          paddingLeft: theme('spacing.6'),
          paddingRight: theme('spacing.6'),
          borderRadius: theme('borderRadius.full'),
          backgroundColor: '#7F84F6',
          color: '#ffffff',
          fontSize: theme('fontSize.md[0]'),
          fontWeight: theme('fontWeight.semibold'),
          transition: 'background-color 200ms cubic-bezier(0.4,0,0.2,1)',
          '&:hover': { backgroundColor: '#6B70F3' },
          '&:active': { backgroundColor: '#545AEF' },
          '&:focus-visible': { outline: 'none', boxShadow: '0px 0px 0px 3px rgba(127,132,246,0.35)' },
          '&:disabled': { opacity: '0.5', cursor: 'not-allowed' },
        },
      });
    },
  ],
};
