# OrgSites — Brand & Design System

> Source of truth for color, typography, spacing, shadows, and component styling across the OrgSites monorepo. Apps (`builder`, `renderer`) and shared packages (`@orgsites/ui`, `@orgsites/config`) must read from here so the visual language stays consistent.

---

## 1. Positioning

**OrgSites** is a website creation & donation platform for NGOs, faith communities, schools, and civic institutions.

Our visual voice is **warm trust**: professional enough for institutional credibility, warm enough to feel human and mission-driven. We reject sterile corporate minimalism in favor of approachable, high-contrast, accessible design.

- **Who we serve:** non-technical staff at community organizations who need to look credible and move donations.
- **Emotional tone:** dignified, warm, optimistic, transparent.
- **Anti-pattern:** cold grey SaaS, pastel minimalism, "we are a bank" corporatism.

---

## 2. Color

### Brand Palette — "Warm Trust"

| Token | Role | Hex | HSL | Usage |
|-------|------|-----|-----|-------|
| `indigo` | Primary | `#4338CA` | `245 71% 51%` | Key actions, navigation, identity |
| `indigo-soft` | Primary light | `#6366F1` | `239 84% 67%` | Hover, active, dark-mode primary |
| `indigo-deep` | Primary dark | `#3730A3` | `245 64% 33%` | Pressed state |
| `amber` | Accent | `#F59E0B` | `38 92% 50%` | Donate CTAs, highlights, badges |
| `amber-soft` | Accent light | `#FBBF24` | `45 91% 58%` | Hover on accent |
| `emerald` | Semantic success | `#10B981` | `160 84% 39%` | Published state, success, positive |
| `rose` | Semantic danger | `#E11D48` | `349 79% 50%` | Destructive, errors |
| `charcoal` | Secondary/ink | `#1C1917` | `24 10% 10%` | Headings, dark surfaces, text |

### Neutrals

| Token | Light Hex | Dark Hex | Side |
|-------|-----------|----------|------|
| `--background` | `#FAFAF9` (warm white) | `#0C0A09` | Page bg |
| `--foreground` | `#1C1917` (charcoal) | `#FAFAF9` | Default text |
| `--card` | `#FFFFFF` | `#1C1917` | Card bg |
| `--muted` | `#F5F5F4` | `#292524` | Subtle surfaces |
| `--muted-foreground` | `#78716C` | `#A8A29E` | Secondary text |
| `--border` | `#E7E5E4` | `#44403C` | Dividers, inputs |
| `--input` | `#E7E5E4` | `#44403C` | Input borders |

### Rules
- **Amber is reserved for action** (donate CTA). Never use it for neutral text.
- **Emerald is semantic only** (`PUBLISHED`, success) — not decorative.
- **Warm neutrals**, never pure `#ffffff` for page backgrounds.
- Dark mode uses the same hue families with adjusted lightness.

### Contrast / Accessibility
- Primary text on background: ≥ 4.5:1 (WCAG AA), target 7:1 for body.
- Indigo `#4338CA` on white: AA-passing for normal text.
- Amber `#F59E0B` is used on dark charcoal (`#1C1917`) for CTAs, not on white.

---

## 3. Typography

**Primary font:** Plus Jakarta Sans (Google Fonts) — modern, humanist, warm-geometric.

Loaded via `next/font/google` in each app that needs it (no CDN link).

| Role | Weight | Size | Line-height | Usage |
|------|--------|------|-------------|-------|
| Display | 800 | 48–60px | 1.05 | Hero headlines |
| H1 | 800 | 36–40px | 1.1 | Page titles |
| H2 | 700 | 28–30px | 1.2 | Section headings |
| H3 | 700 | 20–22px | 1.3 | Card titles |
| H4 | 600 | 16–18px | 1.4 | Subsection titles |
| Body | 400 | 16–17px | 1.65 | Paragraphs, descriptions |
| Body small | 400 | 14px | 1.5 | Captions, helper text |
| Label | 600 | 12–13px | 1.4 | Form labels, badges |
| Overline | 700 | 11px | 1.4 | UPPERCASE section labels, `tracking-wider` |

**Rules**
- Max **2 font families** (Plus Jakarta Sans + optional system fallback).
- Body **16px minimum**; 17px preferred for long-form.
- Paragraph line-height **1.6–1.8**.
- Max line length **60–75 characters**.
- Donate/CTA buttons: semi-bold, lowercase sentence case on warm accent.

---

## 4. Spacing

Tailwind-aligned scale (rem = 4px base):

2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80, 96.

Use 4px increments frequently, 8px rhythm for sections. Standard section padding: `py-16`/`py-24`; card padding: `p-6`.

---

## 5. Shadows

Warm-tinted (based on charcoal, not black-blue) for a human feel.

| Token | CSS | Usage |
|-------|-----|-------|
| `shadow-xs` | `0 1px 2px rgba(28,25,23,0.04)` | subtle cards |
| `shadow-sm` | `0 2px 8px rgba(28,25,23,0.06)` | default cards |
| `shadow-md` | `0 4px 16px rgba(28,25,23,0.08)` | elevated, dropdowns |
| `shadow-lg` | `0 8px 32px rgba(28,25,23,0.10)` | modals, popovers |
| `shadow-xl` | `0 16px 48px rgba(28,25,23,0.12)` | hero cards |
| `shadow-glow-primary` | `0 0 24px rgba(67,56,202,0.15)` | indigo CTA glow |
| `shadow-glow-accent` | `0 0 24px rgba(245,158,11,0.20)` | amber CTA glow |

---

## 6. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 6px | badges, tags |
| `md` | 10px | inputs |
| `lg` | 14px | cards, panels |
| `xl` | 20px | feature cards |
| `2xl` | 28px | hero sections, containers |
| `full` | 9999px | buttons, pills, avatars |

---

## 7. Component Specs

### Button
| Variant | BG | Text | Shadow | Usage |
|---------|----|------|--------|-------|
| `default` | indigo→indigo gradient | white | `glow-primary` | primary actions |
| `accent` | amber→amber gradient | charcoal | `glow-accent` | donate CTAs |
| `secondary` | charcoal | white | `sm` | secondary actions |
| `outline` | transparent, indigo/charcoal border | ink | none | tertiary |
| `ghost` | transparent | ink | none | nav, subtle |
| `destructive` | rose | white | `sm` | delete/danger |

Radius: `rounded-full`. Sizes: `sm` 32px, `default` 40px, `lg` 48px.

### Card
- Border `1px #E7E5E4`, radius `xl` (20px), padding `p-6`
- bg `#FFFFFF` (light) / `#1C1917` (dark)
- `shadow-sm` → `shadow-md` on hover; `hover:-translate-y-0.5`

### Badge
| Variant | BG | Text | Border |
|---------|----|------|--------|
| `published` | emerald-50 | emerald-700 | emerald-200 |
| `draft` | amber-50 | amber-700 | amber-200 |
| `default` | slate-100 | slate-700 | slate-200 |
| `primary` | indigo-50 | indigo-700 | indigo-200 |
| `gold` | amber-50 | amber-800 | amber-200 |

---

## 8. Block Rendering (Site Blocks)

The 9 block types rendered by the renderer and previewed by Puck share a common visual contract rooted in the site theme. Blocks read CSS custom properties (theme overrides from `Site.themeColors`) falling back to brand defaults:

```css
--block-primary:  var(--site-primary, #4338CA);
--block-secondary: var(--site-secondary, #1C1917);
--block-accent:    var(--site-accent, #F59E0B);
--block-bg:        #FFFFFF;
--block-surface:   #F5F5F4;
--block-text:      #1C1917;
--block-text-muted:#78716C;
--block-border:    #E7E5E4;
--block-radius:    20px;
--block-font:      'Plus Jakarta Sans', system-ui, sans-serif;
```

Shared renderers live in `@orgsites/ui` (`packages/ui/src/blocks/*`) so the Puck live-preview in the builder and the published site in the renderer produce **pixel-identical output from one source**.

---

## 9. Implementation Mapping

| File | Purpose |
|------|---------|
| `brand.md` (this file) | Human-readable canonical spec |
| `packages/config` | JS/TS token constants consumed by non-Tailwind code (`@orgsites/config`) |
| `packages/ui` | Shared React block renderers (`@orgsites/ui`) |
| `apps/builder/tailwind.config.ts` | Tailwind theme mapping CSS vars → utility classes |
| `apps/builder/src/app/globals.css` | CSS custom properties (light/dark) loaded at runtime |
| `packages/db` Prisma `Site.themeColors` default | site-level theme overrides |

> The palette in `brand.md` is the source of truth. Keep `globals.css`, `tailwind.config.ts`, `packages/config`, and the Prisma `themeColors` default in sync with it.
