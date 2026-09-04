# OrgSites — Brand & Design System

> Source of truth for color, typography, spacing, shadows, and component styling across the OrgSites monorepo. Apps (`builder`, `renderer`) and shared packages (`@orgsites/ui`, `@orgsites/config`) must read from here so the visual language stays consistent.

---

## 1. Positioning

**OrgSites** is a website creation & donation platform for NGOs, faith communities, schools, and foundations.

Our visual voice is **editorial trust**: the calibre of an annual report or a funder memo, not a generic SaaS template. The product demonstrates its own output — the landing page is structured like an org homepage — rather than describing it. We reject sterile gradient SaaS in favor of a grounded, high-contrast, typographic editorial look.

- **Who we serve:** non-technical staff at community organizations who need to look credible and move donations.
- **Emotional tone:** dignified, credible, understated, mission-first.
- **Anti-pattern:** cold grey SaaS, purple gradient hero blobs, "we are a bank" corporatism, pastel minimalism.

---

## 2. Color

### Brand Palette — "Editorial Trust"

The palette is grounded in the product's own **default org theme** (`Site.themeColors` in Prisma): teal / navy / gold are literally what a new org's site ships with.

| Token | Role | Hex | HSL | Usage |
|-------|------|-----|-----|-------|
| `teal` | Primary | `#0E6E5C` | `169 77% 24%` | Key actions, links, identity |
| `teal-deep` | Primary dark | `#0A5548` | `170 79% 19%` | Hover/pressed state |
| `gold` | Accent | `#B98A2E` | `40 60% 45%` | Sparing accent: donate, impact marks, kickers |
| `navy` | Secondary | `#1B2A4A` | `220 46% 20%` | Dark structure, footers, secondary buttons |
| `ink` | Ink | `#16233A` | `218 45% 16%` | Headings, dark bands, nav CTA |
| `emerald` | Semantic success | `#10B981` | `160 84% 39%` | Published state, success only |
| `rose` | Semantic danger | `#E11D48` | `349 79% 50%` | Destructive, errors |

### Neutrals

| Token | Hex | Side |
|-------|-----|------|
| `paper` | `#FAF7F0` (warm parchment) | Page bg, `--background` |
| `paper-dim` | `#F1ECE0` | Subtle surfaces, `--muted` |
| `ink-soft` | `#3D4B5C` | Body text, `--muted-foreground` |
| `line` | `#DCD4C2` | Hairs, dividers, input borders |
| `ink` | `#16233A` | `--foreground`, headings |
| `--card` | `#FFFFFF` | Card bg |

### Rules
- **Gold is sparing.** Reserved for the donate CTA, impact/quote marks, and uppercase kickers. Never fill large areas with it.
- **Navy is the dark surface** (footers, anatomy band, site mock hero); teal is the action color.
- **Emerald is semantic only** (`PUBLISHED`, success) — not decorative.
- **Warm parchment**, never pure `#ffffff` for page backgrounds.
- Flat, solid fills — no gradients on buttons or cards.

### Contrast / Accessibility
- Primary text on paper: ≥ 7:1 (body).
- Teal `#0E6E5C` on white: AA-passing for normal text.
- Gold `#B98A2E` carries dark sand `#2A2109` text — never white text on gold.

---

## 3. Typography

**Display face:** Fraunces (Google Fonts) — an old-style serif with character; used for headings, logos, stat numbers, quotes.
**Body face:** Inter (Google Fonts) — credible, neutral, high legibility.

Both loaded via `next/font/google` (`Inter` → `--font-sans`, `Fraunces` → `--font-display`) in `builder` and `renderer`. No CDN links.

Type scale (major-third-ish, tuned by eye — CSS vars in globals.css):

| Step | Value | Usage |
|------|-------|-------|
| `--step-5` | `clamp(2.75rem, 2.2rem + 2.2vw, 4.25rem)` | Hero H1 |
| `--step-4` | `clamp(2rem, 1.7rem + 1.2vw, 2.75rem)` | Section H2 |
| `--step-3` | `clamp(1.5rem, 1.35rem + 0.7vw, 1.875rem)` | Blockquote, payments H2 |
| `--step-2` | `clamp(1.1875rem, 1.1rem + 0.4vw, 1.375rem)` | Hero sub, lede paragraphs |
| `--step-1` | `clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)` | Body base |

| Role | Face | Weight | Usage |
|------|------|--------|-------|
| Display | Fraunces | 500 | H1–H3, logos, big numbers, quotes |
| Body | Inter | 400 / 500 | Paragraphs, descriptions |
| Lede | Inter | 400 | `--step-2`, `line-height 1.55–1.6` |
| Label / kicker | Inter | 600 | Uppercase tags, section labels (`--teal-deep`) |
| Emphasis | Inter | 600 | Problem-item titles, links |

**Rules**
- Headings: Fraunces 500, tight tracking, `line-height 1.04–1.3`.
- Kickers (eyebrow / section-label): uppercase, 600 weight, `--teal-deep`, `0.9rem`.
- Body `16px` minimum; paragraphs `line-height 1.6`; max measure `62ch`.
- `p` margin reset globally; list/table reset via components.

---

## 4. Spacing

Tailwind-aligned scale (rem = 4px base):

2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80, 96.

Content max-width `1160px` (`.wrap`), section padding `108px` (`.section`), tight `88px`, anatomy band `116px`. Card padding `p-6`–`p-8`.

---

## 5. Shadows

Warm, ink-tinted (`rgba(22,35,58,α)`) — long soft drop shadows, not glow blobs.

| Token | CSS | Usage |
|-------|-----|-------|
| `shadow-sm` | `0 2px 8px rgba(22,35,58,0.06)` | default cards |
| `shadow-md` | `0 4px 16px rgba(22,35,58,0.08)` | elevated, dropdowns |
| `shadow-card` | `0 30px 60px -30px rgba(22,35,58,0.25)` | hero site-mock |
| `shadow-glow-primary` | `0 0 24px rgba(14,110,92,0.18)` | teal CTA glow |
| `shadow-glow-accent` | `0 0 24px rgba(185,138,46,0.25)` | gold CTA glow |

---

## 6. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 5px | tags, mock donate pill |
| `md` | 7px | **buttons** (`.btn`, `Button`) |
| `lg` | 12px | anatomy rows, audience grid, receipt card |
| `xl` | 14px | site-mock, cards |
| `2xl` | 20px | large feature containers |
| `full` | 9999px | provider chips, avatars, progress |

---

## 7. Component Specs

### Button (`Button`, landing `.btn`)
| Variant | BG | Text | Usage |
|---------|----|------|-------|
| `default` | teal solid (`#0E6E5C`) | white | primary actions |
| `accent` | gold solid (`#B98A2E`) | `#2A2109` | donate CTAs |
| `secondary` | navy (`#1B2A4A`) | paper | secondary actions |
| `outline` | transparent, line border | ink | tertiary |
| `ghost` | transparent | ink | nav, subtle |
| `destructive` | rose | white | delete/danger |

Radius: `md` (7px). Sizes: `sm` 32px, `default` 40px, `lg` 48px.

### Card
- Border `1px var(--line)`, radius `xl` (14px), padding `p-6`–`p-8`, bg `#FFFFFF`.

### Badge
| Variant | BG | Text | Border |
|---------|----|------|--------|
| `published` | emerald-50 | emerald-700 | emerald-200 |
| `draft` | gold/10 | gold-deep `#9A7224` | gold/30 |
| `default` | slate-100 | slate-700 | slate-200 |
| `primary` | teal/10 | teal-deep `#0A5548` | teal/20 |
| `gold` | gold/10 | gold-deep `#9A7224` | gold/30 |

---

## 8. Block Rendering (Site Blocks)

The 9 block types rendered by the renderer and previewed by Puck share a common visual contract rooted in the site theme. Blocks read CSS custom properties (theme overrides from `Site.themeColors`) falling back to brand defaults:

```css
--block-primary:  var(--site-primary, #0E6E5C);
--block-secondary: var(--site-secondary, #1B2A4A);
--block-accent:    var(--site-accent, #B98A2E);
--block-bg:        #FFFFFF;
--block-surface:   #F1ECE0;
--block-text:      #16233A;
--block-text-muted:#3D4B5C;
--block-border:    #DCD4C2;
--block-radius:    14px;
--block-font:      'Inter', system-ui, sans-serif;
--block-display-font: 'Fraunces', Georgia, serif;
```

Headings and big stat numbers render in the display face (`font-display`, weight 500). Shared renderers live in `@orgsites/ui` (`packages/ui/src/blocks/*`) so the Puck live-preview in the builder and the published site in the renderer produce **pixel-identical output from one source**.

---

## 9. Implementation Mapping

| File | Purpose |
|------|---------|
| `brand.md` (this file) | Human-readable canonical spec |
| `packages/config` | JS/TS token constants consumed by non-Tailwind code (`@orgsites/config`) |
| `packages/ui` | Shared React block renderers (`@orgsites/ui`) |
| `apps/builder/tailwind.config.ts` | Tailwind theme mapping CSS vars → utility classes |
| `apps/builder/src/app/globals.css` | CSS custom properties (light/dark) + authored landing component CSS, loaded at runtime |
| `packages/db` Prisma `Site.themeColors` default | site-level theme overrides |

> The palette in `brand.md` is the source of truth. Keep `globals.css`, `tailwind.config.ts`, `packages/config`, and the Prisma `themeColors` default in sync with it.