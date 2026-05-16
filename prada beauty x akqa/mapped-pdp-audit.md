# Token System — PDP Scope (audit)

> The current state of `assets/tokens/` and the single-file Figma import bundle.
> Scope: PDP. Sources: Figma `514:2696` (canonical brand), Figma `535:6303` (PDP at 1440 & 375), live PDP at <https://www.prada.com/gb/en/p/prada-reveal-skin-optimizing-foundation/1A5001_2IAV_FBLC2_P_ML030>.

## Files

| File | Purpose | Tokens |
|---|---|---|
| `assets/tokens/primitives.tokens.json` | Tier 1 — pure-hex colours grouped by hue. Includes the live prada.com greys merged in as named neutrals. | 113 |
| `assets/tokens/semantic.tokens.json` | Tier 2 — brand (Italian-named identity) + alias (primary/secondary/disabled/error/success/information/warning/promo). Both subgroups reference primitives. | 60 (18 brand + 42 alias) |
| `assets/tokens/mapped.tokens.json` | Tier 3 — PDP component usage. References brand, alias, or primitives. | 17 |
| `assets/tokens/typography.tokens.json` | Three-tier typography. Primitives → semantic (display/heading/body/label/button/link/eyebrow/caption) → component (pdp.*). Values from live PDP. | — |
| `assets/tokens/spacing.tokens.json` | Spacing in two flavours. `space.scale.*` (clean 4px base ladder), `space.pdp.*` (live PDP item-spacings, references scale or primitives as appropriate). | — |
| `figma-tokens.json` (workspace root) | Single Tokens Studio import bundle wrapping all five files into one multi-set payload with `$metadata.tokenSetOrder` set. | — |

`live.tokens.json` has been retired — its contents are now under `color.neutral.*` in primitives.

## Colour changes vs your earlier review

- **Nothing was modified.** Every original hex (K01–W01, Fuoco, Soleil, Ciel, Verde, Salvia, Menta, Lilac, every brown, every nude, every cosmetic shade, every live-site grey) is preserved exactly.
- **One new colour added:** `color.neutral.dusty-gray-aa` = `#6F6F6F`. This is the AA counterpart to `color.neutral.dusty-gray` (`#949494`). It sits alongside the original — the live hex still exists for large-UI use (placeholders, captions ≥18pt or ≥14pt bold) where AA Large (3:1) applies.

## Colour scale accessibility — current state

All key PDP text-on-background pairings now hit WCAG AA:

| Pairing | Ratio | Verdict |
|---|---|---|
| Body on page (`#000000` on `#FFFFFF`) | 21.00 | AAA |
| Subhead on page (`#4E555A` on `#FFFFFF`) | 7.58 | AAA |
| Helper on page (`#6F6F6F` on `#FFFFFF`) | 5.02 | AA |
| Body on surface (`#000000` on `#F7F7F7`) | 19.60 | AAA |
| Placeholder on page (`#949494` on `#FFFFFF`) | 3.03 | AA Large |
| Placeholder on input (`#949494` on `#FFFFFF`) | 3.03 | AA Large |
| CTA label on CTA (`#FFFFFF` on `#000000`) | 21.00 | AAA |
| Link on page (`#4E555A` on `#FFFFFF`) | 7.58 | AAA |
| Secondary action on page (`#000000` on `#FFFFFF`) | 21.00 | AAA |

## Primitive scale — color.neutral (numeric-only, lightest → darkest)

| Step | Hex | Italian / live anchor |
|---|---|---|
| 50  | `#FFFFFF` | W01 Bianco |
| 75  | `#F7F7F7` | Wild Sand (live) |
| 100 | `#F4F5F7` | G06 Ghiaccio |
| 125 | `#F3F3F7` | Athens Gray (live) |
| 175 | `#EBEBED` | live grey-93 |
| 200 | `#E0E0E0` | G05 Perla |
| 250 | `#D9DCE0` | Iron (live) |
| 300 | `#D8D8D8` | G04 Fumo |
| 400 | `#CCCCCC` | G03 Pietra |
| 500 | `#BCBCBD` | G02 Cenere |
| 550 | `#949494` | Dusty Gray (live, AA Large only) |
| 580 | `#6F6F6F` | AA counterpart added during review |
| 600 | `#696969` | G01 Grafite |
| 650 | `#4E555A` | Abbey (live) |
| 700 | `#454437` | K04 Tabacco |
| 800 | `#333333` | K03 Carbone |
| 900 | `#202020` | K02 Ombra |
| 920 | `#191B1C` | Woodsmoke (live) |
| 940 | `#0B051D` | Violet (live) |
| 950 | `#000000` | K01 Nero |

Brand and live identity names live in each token's `$description`. Token names follow the numeric scale only.

## Mapped tokens (17, all PDP-scoped, all → primitives)

Every mapped token now resolves directly to a `color.neutral.NNN` primitive. No `{brand.*}` or `{alias.*}` references in the mapped layer.

| Token | Resolves to | Hex |
|---|---|---|
| `background.page` | `{color.neutral.50}` | `#FFFFFF` |
| `background.surface` | `{color.neutral.75}` | `#F7F7F7` |
| `text.primary` | `{color.neutral.950}` | `#000000` |
| `text.secondary` | `{color.neutral.650}` | `#4E555A` |
| `text.tertiary` | `{color.neutral.580}` | `#6F6F6F` |
| `text.on-dark` | `{color.neutral.50}` | `#FFFFFF` |
| `text.link` | `{color.neutral.650}` | `#4E555A` |
| `text.availability` | `{color.neutral.950}` | `#000000` |
| `border.subtle` | `{color.neutral.250}` | `#D9DCE0` |
| `border.input` | `{color.neutral.250}` | `#D9DCE0` |
| `interactive.primary-bg` | `{color.neutral.950}` | `#000000` |
| `interactive.primary-text` | `{color.neutral.50}` | `#FFFFFF` |
| `interactive.secondary-text` | `{color.neutral.950}` | `#000000` |
| `interactive.tertiary-link` | `{color.neutral.650}` | `#4E555A` |
| `input.background` | `{color.neutral.50}` | `#FFFFFF` |
| `input.placeholder` | `{color.neutral.550}` | `#949494` |
| `input.border` | `{color.neutral.250}` | `#D9DCE0` |

## Typography (three tiers)

- **Tier 1 — primitives:** `fontFamily` (primary = Inter, fallback = system stack), `fontWeight` (regular/medium/semibold/bold), `fontSize` (16 distinct sizes captured from the live PDP — 9.4 through 23.3px, given in rem with px in `$description`), `lineHeight` (14, 16, 16.5, 18, 20, 21, 22, 24, 28), `letterSpacing` (default, tracked = 0.2 Figma).
- **Tier 2 — semantic:** `display.lg`, `heading.h1/h2/h3/h4-upper`, `body.lg/md/sm`, `label.default/small`, `button.lg/sm`, `link.default/underline/upper`, `eyebrow.default`, `caption.default`. Each composes a primitive bundle (family + weight + size + line-height + tracking). Values mirror `prada/Semantic/*` and `www.prada.com/Semantic/*` styles.
- **Tier 3 — component (`pdp.*`):** `product-title` → heading.h1, `price` → body.lg, `section-heading` → heading.h2, `accordion-body` → body.md, `shade-label` → label.default, `primary-cta` → button.lg, `secondary-action` → link.default, `breadcrumb` → label.small, `input-label` → label.default, `input-text` → body.md.

Native flexibility: all sizes are in rem and every primitive carries the px equivalent in `$description`, so iOS sp / Android dp conversion is trivial (rem × 16 = px → sp/dp).

## Spacing

Two sets in the same file, both routing through primitives:

- **`space.scale.*`** (clean 4px base): `none, px (2px), xxs (4), xs (8), sm (12), md (16), lg (24), xl (32), 2xl (48), 3xl (64), 4xl (96), 5xl (128)`. Default for new components.
- **`space.pdp.*`** (live PDP item-spacings from Figma 535:6303): `xxs (4), xs (8), 10, 11, 12, 20, s+ (24), 27, m (32), 40`. References scale.* where values match, primitives.* where they don't (10, 11, 20, 27, 40).

## Figma import

`figma-tokens.json` at the workspace root is the one-shot import for Tokens Studio for Figma:

1. Plugins → Tokens Studio for Figma → Open settings.
2. Sync → Local file → point at `/Users/heikeheinze/Documents/fig/prada beauty x akqa/figma-tokens.json`.
3. The plugin will pick up `$metadata.tokenSetOrder` (primitives → semantic → mapped → typography → spacing) so references resolve correctly.
4. Apply to selection or document. Variables are created under the matching collection names.

The five modular `.tokens.json` files in `assets/tokens/` stay as source of truth — you can keep editing them and re-run the bundler whenever you want to refresh `figma-tokens.json`.

## What's still NOT in mapped tokens

Same as before — these need a visual round before mapping honestly:

- Hover / pressed / focus / disabled states on CTAs, links, inputs
- `border.strong`, `border.default` (only `subtle` and `input` are mapped)
- `background.overlay` (no modals captured)
- All `status.*` tokens (`error`, `success`, `info`, `warning`, `promo`) — none observed on PDP
- All `swatch.*` (shade chips render as product photos / per-SKU data)
- Footer-specific tokens

## Suggested next steps

1. Visual round for hover / pressed / focus / disabled on CTA + link + input.
2. Expand scope: PLP filter chips → cart drawer → checkout → header/footer.
3. Confirm the typography component-tier names for `pdp.*` (e.g., is `secondary-action` the right name for Start personalization + Find in store + Shop refill + Notify-me? Or split them?).
