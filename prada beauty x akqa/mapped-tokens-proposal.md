# Mapped Tokens — Proposal for Review

> Purpose: replace the assumption-heavy `mapped.tokens.json` I generated earlier
> with a layer that is traceable, line-by-line, to evidence from the live site
> at <https://www.prada.com/gb/en.html>. **No JSON has been changed.** This
> document exists for your review before any further implementation.

---

## Method (and what it can and can't tell us)

I fetched three pages with a text-only web fetch:

1. `https://www.prada.com/gb/en.html` — Prada home
2. `https://www.prada.com/gb/en/perfumes-and-beauty/beauty/lipsticks/c/10567EU` — Lipsticks PLP
3. `https://www.prada.com/gb/en/p/prada-monochrome-hyper-matte-lipstick/1A2001_2IAE_FB003_P_OOO` — Lipstick PDP

What text-fetch **can** tell us reliably:

- The presence of UI elements (breadcrumb, CTAs, filter chips, section titles).
- The hex values that appear inline as filter-chip data attributes (the colour-facet swatches).
- Component naming (e.g. "Add to shopping bag", "Start personalization", "Notify me when available").

What text-fetch **cannot** tell us:

- The actual rendered hex of any background, text, border, button, hover, focus,
  disabled, banner, or scrim. Those values live in compiled CSS and the page is
  JS-hydrated.
- Whether status banners (error/success/info/warning) even exist on Beauty pages.
- Hover/active/focus state styling.
- Mobile vs desktop variations.

So this proposal is split into two parts: **(A) mappings I can defend** with
direct observations from the site, and **(B) mappings that need a visual
inspection round** before being committed.

---

## A. Confirmed UI elements observed on prada.com/gb/en

### A.1 Beauty PDP structure (lipstick page)

| UI element | Source observation |
|---|---|
| Breadcrumb: `Prada / Perfumes and beauty / Beauty / Lipsticks` | PDP text |
| Page title H1: product name (e.g. "Prada Monochrome Hyper Matte lipstick") | PDP text |
| Price: `£ 40` | PDP text |
| Primary CTA: `Add to shopping bag` | PDP text, repeated twice (top + sticky bottom) |
| Secondary CTA: `Start personalization` | PDP text |
| Out-of-stock CTA: `Notify me when available` (form with email input) | PDP text |
| Tertiary link CTA: `Find in store` | PDP text |
| Color picker: 17 lipstick shade chips, each labelled `Bxx - Name` / `Rxx - Name` / `Pxx - Name` / `Oxx - Name` | PDP text — list of variant URLs |
| Variant code prefixes (likely shade family): B = brown, R = red, P = pink/purple, O = orange | inferred from colour-name pairings (B03 Mahogany, R28 Fuoco, P55 Fuxia, O77 Arancio) |
| Section headings: `Product details`, `Formula and care benefits`, `How to apply`, `Ingredients`, `Contact us`, `Free shipping and returns` | PDP text |

### A.2 Filter-chip hexes on Lipsticks PLP

These are the only **explicit hex values** that appeared inline. They represent
the colour-attribute filter, *not* necessarily the design-system brand palette.

| Filter label | Hex extracted |
|---|---|
| Black | `#000000` |
| Brown | `#66411C` |
| Neutral | `#EDE8D0` |
| Orange | `#FF922E` |
| Pink | `#E4ABAF` |
| Red | `#D80707` |

**Important:** These are different from the brand swatches you supplied
(K01–W01, Fuoco, Soleil, Ciel, Verde, Salvia, Menta, Lilac). I am not
proposing to add or merge them — they're attribute-filter swatches owned by
the merchandising taxonomy. **Question for you:** are these chips part of
the design system or a separate concern? See "Open questions" below.

### A.3 Site-wide UI elements visible in text

| Element | Notes |
|---|---|
| Footer with social icons, "Subscribe to our newsletter" CTA, contact links, legal links | Both home and PDP |
| Cookie banner text exists (Cookie Policy, Cookie setting links) | implied; not directly captured |
| Region selector "United Kingdom / English" | Both pages |
| "Log in or create your personal account" CTA | Both pages |
| "Shopping bag" / "Wishlist" / "Contact us" header utilities | Both pages |
| Hamburger / "Menu" + "Search" + "Close" controls | Both pages |
| `Free shipping in 2-3 business days from order confirmation` informational copy | PDP |
| "Free shipping and returns" badge/section | PDP |

---

## B. Mappings I am NOT proposing yet (need visual inspection)

For each of these, the live Prada UI almost certainly has a colour rule, but I
can't read it from the text fetch. I'd flag any of these as an assumption if I
mapped them now:

- `background.page`, `background.surface`, `background.overlay`
- All `text.*` roles (primary / secondary / tertiary / placeholder / disabled / on-dark / link)
- All `border.*` roles
- `interactive.primary-bg` / `primary-text` / `primary-bg-hover`
- `interactive.secondary-*`
- `interactive.disabled-*`
- All `status.*` (error / success / info / warning / promo) — I don't even have
  evidence that Beauty PDPs *use* coloured status banners.
- All `swatch.*` (cosmetic lipstick shades) — Prada's PDP picker uses per-shade
  product imagery, not flat hex chips, so the swatch tokens may be design-only
  (Figma) rather than rendered on prada.com.

---

## C. Mappings I can propose with confidence (text-only evidence)

These are the only mapped-token claims I'd defend right now. Each has a direct
observation source. **None of these has been written to JSON yet.**

```
mapped.text.price                 — exists ("£ 40")             [needs colour confirmed visually]
mapped.interactive.primary-cta    — exists ("Add to shopping bag")
mapped.interactive.secondary-cta  — exists ("Start personalization")
mapped.interactive.tertiary-link  — exists ("Find in store")
mapped.interactive.notify-cta     — exists ("Notify me when available")
mapped.text.breadcrumb            — exists (slash-separated path)
mapped.text.section-heading       — exists ("Product details", etc.)
```

Even for these, only the *names and hierarchy* are confirmed. The colour each
should resolve to needs a visual pass.

---

## Open questions for you

Before I touch `mapped.tokens.json`:

1. **Filter-chip palette**: Are the colour-filter swatches (`#66411C`, `#FF922E`,
   `#E4ABAF`, `#D80707`, `#EDE8D0`) part of the design system, or owned by
   merchandising? If part of the system, where do they live — primitives, a
   new brand subgroup, or out of scope?
2. **Status colours**: Does Prada Beauty actually render coloured error/success/
   info/warning banners? The original `semantic.tokens.json` you gave me
   defined `status/*` tokens, but I don't see any of them used in the page text.
   Should the alias layer keep them (for future need), and should mapped expose
   any of them?
3. **Lipstick swatch mapping**: On the live PDP, shade chips are *product
   photos*, not flat hexes. Should `mapped.swatch.*` exist at all in the web
   token set, or is that purely a Figma concern?
4. **PDP-only tokens**: Should I scope mapped tokens to PDP first (the page I
   have most evidence on), then expand to home/PLP/cart in later passes?
5. **Visual inspection**: Are you happy to walk a few screens with me (you
   send screenshots, or paste computed CSS for elements you care about), so
   the next pass is grounded in actual rendered values rather than my guesses?

---

## Recommended next step

A short visual review session: pick 3–5 elements per page (CTA, secondary CTA,
body text, breadcrumb, divider, swatch picker, and one banner if any exist on
Beauty pages) and either:

- screenshot each + tell me the colour I should map it to, or
- paste the computed CSS values from DevTools.

After that I can write `mapped.tokens.json` with one source citation per token
instead of one assumption per token. I won't make further token changes without
your sign-off on the questions above.
