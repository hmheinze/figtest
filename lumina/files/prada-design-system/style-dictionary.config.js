/**
 * style-dictionary.config.js
 * Prada Beauty Design System — Multi-Platform Token Build
 *
 * Reads:   tokens/*.json  (Tokens Studio legacy format)
 * Outputs: build/web/, build/ios/, build/android/, build/react-native/, build/docs/
 *
 * The @tokens-studio/sd-transforms package bridges between Tokens Studio's
 * format (fontFamilies, fontWeights, lineHeights etc.) and Style Dictionary's
 * expected types. It also handles composite token expansion (typography → 
 * individual font-size, font-weight, line-height properties for code).
 *
 * Run:   npm run build
 * Watch: npm run build:watch
 */

const StyleDictionary = require('style-dictionary');
const { registerTransforms } = require('@tokens-studio/sd-transforms');

// Register all Tokens Studio transforms — this is the bridge layer
// that converts TS-specific type names to DTCG-compatible ones.
// Must be called before any platform config is defined.
registerTransforms(StyleDictionary);


// ─── Theme-aware build ────────────────────────────────────────────────────
// Each theme (scanner, editorial, kiosk) produces its own CSS output
// so that a product can import only what it needs.

const themes = ['scanner', 'editorial', 'kiosk'];


// ─── Web platform ─────────────────────────────────────────────────────────

const webConfig = (theme) => ({
  source: [
    'tokens/primitive.json',
    'tokens/colour.json',
    'tokens/typography.json',
    'tokens/spacing.json',
    'tokens/motion.json',
  ],
  platforms: {
    web: {
      transformGroup: 'tokens-studio',       // provided by sd-transforms
      buildPath: `build/web/${theme}/`,
      prefix: 'prada',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: `:root[data-theme="${theme}"]`,
            outputReferences: true,
          },
          filter: (token) => !token.path[0].startsWith('_'),
        },
      ],
    },
  },
});

// Base tokens (no theme override) — used as the default :root
const webBaseConfig = {
  source: ['tokens/primitive.json', 'tokens/colour.json', 'tokens/typography.json', 'tokens/spacing.json', 'tokens/motion.json'],
  platforms: {
    web: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/web/base/',
      prefix: 'prada',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root', outputReferences: true },
          filter: (token) => {
            // Only semantic layer — no primitives, no mode overrides
            const firstKey = token.path[0];
            return !['color', 'font', 'space', 'duration', 'easing', 'stagger'].includes(firstKey)
                   && !token.path.includes('mode')
                   && !token.path.includes('_layer');
          },
        },
        {
          destination: 'primitives.css',
          format: 'css/variables',
          options: { selector: ':root' },
          filter: (token) => ['color', 'font', 'space', 'duration', 'easing', 'stagger'].includes(token.path[0]),
        },
      ],
    },
  },
};


// ─── iOS / SwiftUI platform ───────────────────────────────────────────────

const iosConfig = {
  source: ['tokens/primitive.json', 'tokens/colour.json', 'tokens/typography.json', 'tokens/spacing.json', 'tokens/motion.json'],
  platforms: {
    ios: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/ios/',
      prefix: 'Prada',
      transforms: [
        'ts/resolveMath',
        'ts/size/px',
        'ts/color/css/hexrgba',
        'name/cti/pascal',
        'color/UIColorSwift',
        'content/swift/literal',
        'asset/swift/literal',
        'size/swift/remToCGFloat',
        'font/swift/literal',
      ],
      files: [
        {
          destination: 'PradaTokens.swift',
          format: 'ios-swift/class.swift',
          className: 'PradaTokens',
          filter: (token) => !token.path.includes('mode') && !token.path[0].startsWith('_'),
        },
      ],
    },
  },
};


// ─── Android / Compose platform ───────────────────────────────────────────

const androidConfig = {
  source: ['tokens/primitive.json', 'tokens/colour.json', 'tokens/typography.json', 'tokens/spacing.json', 'tokens/motion.json'],
  platforms: {
    android: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/android/',
      prefix: 'prada',
      transforms: [
        'ts/resolveMath',
        'ts/size/px',
        'name/cti/snake',
        'color/hex8android',
        'size/remToSp',
        'size/remToDp',
      ],
      files: [
        {
          destination: 'tokens.xml',
          format: 'android/resources',
          filter: (token) => !token.path.includes('mode'),
        },
        {
          destination: 'colors.xml',
          format: 'android/colors',
          filter: (token) => token.type === 'color' && !token.path.includes('mode'),
        },
        {
          destination: 'dimens.xml',
          format: 'android/dimens',
          filter: (token) => ['dimension', 'fontSizes', 'spacing'].includes(token.type) && !token.path.includes('mode'),
        },
      ],
    },
  },
};


// ─── React Native platform ────────────────────────────────────────────────

const reactNativeConfig = {
  source: ['tokens/primitive.json', 'tokens/colour.json', 'tokens/typography.json', 'tokens/spacing.json', 'tokens/motion.json'],
  platforms: {
    'react-native': {
      transformGroup: 'tokens-studio',
      buildPath: 'build/react-native/',
      prefix: 'prada',
      transforms: [
        'ts/resolveMath',
        'ts/size/px',
        'name/cti/camel',
        'color/css',
      ],
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          filter: (token) => !token.path.includes('mode'),
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
          filter: (token) => !token.path.includes('mode'),
        },
      ],
    },
  },
};


// ─── Documentation / Storybook platform ──────────────────────────────────

const docsConfig = {
  source: ['tokens/primitive.json', 'tokens/colour.json', 'tokens/typography.json', 'tokens/spacing.json', 'tokens/motion.json'],
  platforms: {
    docs: {
      transformGroup: 'js',
      buildPath: 'build/docs/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
};


// ─── Run all builds ───────────────────────────────────────────────────────

module.exports = [
  webBaseConfig,
  ...themes.map(webConfig),
  iosConfig,
  androidConfig,
  reactNativeConfig,
  docsConfig,
];
