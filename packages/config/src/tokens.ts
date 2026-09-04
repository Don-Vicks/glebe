/**
 * OrgSites shared design tokens.
 *
 * Source of truth: brand.md at the repo root.
 * These constants are consumed by non-Tailwind code (block renderers in
 * @orgsites/ui, inline styles). Tailwind-mapped tokens live in the CSS
 * variables (apps/builder/src/app/globals.css) + tailwind.config.ts.
 */

export const brand = {
  name: "OrgSites",

  colors: {
    primary: "#0E6E5C",
    "primary-deep": "#0A5548",
    accent: "#B98A2E",
    "accent-sand": "#2A2109",
    success: "#10B981",
    danger: "#E11D48",

    paper: "#FAF7F0",
    "paper-dim": "#F1ECE0",
    ink: "#16233A",
    "ink-soft": "#3D4B5C",
    navy: "#1B2A4A",
    line: "#DCD4C2",

    background: "#FAF7F0",
    card: "#FFFFFF",
    surface: "#F1ECE0",
    border: "#DCD4C2",
  },

  /** Block-rendering tokens. These read site-level theme overrides via CSS
   *  custom properties (--site-primary etc.), falling back to brand defaults.
   */
  block: {
    primary: "#0E6E5C",
    secondary: "#1B2A4A",
    accent: "#B98A2E",
    bg: "#FFFFFF",
    surface: "#F1ECE0",
    text: "#16233A",
    "text-muted": "#3D4B5C",
    border: "#DCD4C2",
    radius: 14,
    font: "'Inter', system-ui, sans-serif",
    "font-display": "'Fraunces', Georgia, serif",
  },

  /** CSS custom property names used by rendered sites. The renderer page
   *  layer sets these from Prisma `Site.themeColors`; fall back to brand.
   */
  siteVars: {
    primary: "--site-primary",
    secondary: "--site-secondary",
    accent: "--site-accent",
  },

  /** Default theme used when a site has not customized its colors
   *  (mirrors the Prisma `themeColors` Json default in packages/db).
   */
  defaultTheme: {
    primary: "#0E6E5C",
    secondary: "#1B2A4A",
    accent: "#B98A2E",
  },
} as const;

/** Font stacks shared by block renderers (brand.md §3). */
export const fontFamily = {
  sans: "'Inter', system-ui, sans-serif",
  display: "'Fraunces', Georgia, serif",
} as const;

/** Border-radius scale (brand.md §6), in px. */
export const radii = {
  sm: 5,
  md: 7,
  lg: 12,
  xl: 14,
  "2xl": 20,
  full: 9999,
} as const;

export type Brand = typeof brand;
export type BrandColor = keyof typeof brand.colors;