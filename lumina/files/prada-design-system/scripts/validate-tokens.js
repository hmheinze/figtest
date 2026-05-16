/**
 * scripts/validate-tokens.js
 * Prada Beauty Design System — Token Validation
 *
 * Runs before every build. Catches errors that would silently
 * produce bad output in Style Dictionary.
 *
 * Checks:
 *  1. All JSON files are valid
 *  2. No bare numbers in fontSizes or spacing (need px units)
 *  3. No DTCG $value/$type keys (must use legacy format for Tokens Studio)
 *  4. All token references {x.y.z} resolve to an existing token
 *  5. No duplicate token names within a file
 *  6. Typography composite tokens have all required properties
 *
 * Usage:  node scripts/validate-tokens.js
 *         npm run validate
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const REQUIRED_TYPOGRAPHY_PROPS = ['fontFamily', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing'];
const ERRORS = [];
const WARNINGS = [];

function error(msg) { ERRORS.push(`✗ ${msg}`); }
function warn(msg)  { WARNINGS.push(`⚠ ${msg}`); }

// ─── Load all token files ─────────────────────────────────────────────────

const allTokens = {};   // flat map: "colour.color.black" → token object
const allFiles = {};    // fname → parsed JSON

const files = fs.readdirSync(TOKENS_DIR)
  .filter(f => f.endsWith('.json') && !f.startsWith('$'));

files.forEach(fname => {
  const fpath = path.join(TOKENS_DIR, fname);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    allFiles[fname] = data;
  } catch(e) {
    error(`${fname}: invalid JSON — ${e.message}`);
    return;
  }

  function flatten(obj, prefix = fname.replace('.json', '')) {
    if (typeof obj !== 'object' || obj === null) return;
    if ('value' in obj && 'type' in obj) {
      const key = prefix;
      if (allTokens[key]) warn(`Duplicate token: ${key}`);
      allTokens[key] = obj;
      return;
    }
    for (const [k, v] of Object.entries(obj)) {
      if (!k.startsWith('_')) flatten(v, `${prefix}.${k}`);
    }
  }
  flatten(data);
});

// ─── Check 1: No DTCG $value/$type keys ──────────────────────────────────

Object.entries(allTokens).forEach(([key, token]) => {
  if ('$value' in token) error(`${key}: uses DTCG $value — must use legacy "value"`);
  if ('$type' in token)  error(`${key}: uses DTCG $type — must use legacy "type"`);
});

// ─── Check 2: No bare numbers in dimensional types ────────────────────────

const DIMENSIONAL_TYPES = ['fontSizes', 'spacing', 'dimension', 'borderRadius'];

Object.entries(allTokens).forEach(([key, token]) => {
  if (!DIMENSIONAL_TYPES.includes(token.type)) return;
  const v = token.value;
  if (typeof v === 'number') {
    error(`${key}: bare number "${v}" — ${token.type} requires unit (e.g. "${v}px")`);
  }
  if (typeof v === 'string' && /^\d+$/.test(v.trim())) {
    error(`${key}: bare number string "${v}" — ${token.type} requires unit (e.g. "${v}px")`);
  }
});

// ─── Check 3: All {references} resolve ───────────────────────────────────

function extractRefs(value) {
  if (typeof value === 'string') {
    return [...value.matchAll(/\{([^}]+)\}/g)].map(m => m[1]);
  }
  if (typeof value === 'object' && value !== null) {
    return Object.values(value).flatMap(extractRefs);
  }
  return [];
}

Object.entries(allTokens).forEach(([key, token]) => {
  const refs = extractRefs(token.value);
  refs.forEach(ref => {
    // Check if ref resolves in any file's namespace
    const resolves = files.some(fname => {
      const ns = fname.replace('.json', '');
      return (`${ns}.${ref}` in allTokens) || (ref in allTokens);
    });
    if (!resolves) {
      // Also check direct cross-file refs like {color.black}
      const directRef = Object.keys(allTokens).some(k => k.endsWith(`.${ref}`) || k === ref);
      if (!directRef) {
        warn(`${key}: unresolved reference {${ref}}`);
      }
    }
  });
});

// ─── Check 4: Typography composites have required properties ─────────────

Object.entries(allTokens).forEach(([key, token]) => {
  if (token.type !== 'typography') return;
  if (typeof token.value !== 'object') {
    error(`${key}: typography token value must be an object`);
    return;
  }
  REQUIRED_TYPOGRAPHY_PROPS.forEach(prop => {
    if (!(prop in token.value)) {
      error(`${key}: typography token missing required property "${prop}"`);
    }
  });
});

// ─── Check 5: fontWeights are strings not numbers ─────────────────────────

Object.entries(allTokens).forEach(([key, token]) => {
  if (token.type !== 'fontWeights') return;
  if (typeof token.value === 'number') {
    warn(`${key}: fontWeights value "${token.value}" is a number — Tokens Studio prefers strings like "Regular", "Bold". Numeric weights may not match all typefaces.`);
  }
});

// ─── Report ───────────────────────────────────────────────────────────────

const tokenCount = Object.keys(allTokens).length;
console.log(`\nPrada Beauty Design System — Token Validation`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`Files:  ${files.length}`);
console.log(`Tokens: ${tokenCount}`);
console.log('');

if (WARNINGS.length) {
  console.log('Warnings:');
  WARNINGS.forEach(w => console.log(`  ${w}`));
  console.log('');
}

if (ERRORS.length) {
  console.log('Errors:');
  ERRORS.forEach(e => console.log(`  ${e}`));
  console.log('');
  console.log(`Build blocked — ${ERRORS.length} error(s) must be resolved.`);
  process.exit(1);
} else {
  console.log(`✓ All tokens valid. Ready to build.\n`);
}
