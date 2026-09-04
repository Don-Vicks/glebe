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
    primary: "#4338CA",
    "primary-soft": "#6366F1",
    "primary-deep": "#3730A3",
    accent: "#F59E0B",
    "accent-soft": "#FBBF24",
    success: "#10B981",
    danger: "#E11D48",

    ink: "#1C1917",
    "ink-muted": "#78716C",

    background: "#FAFAF9",
    card: "#FFFFFF",
    surface: "#F5F5F4",
    border: "#E7E5E4",
  },

  /** Block-rendering tokens. These read site-level theme overrides via CSS
   *  custom properties (--site-primary etc.), falling back to brand defaults.
   */
  block: {
    primary: "#4338CA",
    secondary: "#1C1917",
    accent: "#F59E0B",
    bg: "#FFFFFF",
    surface: "#F5F5F4",
    text: "#1C1917",
    "text-muted": "#78716C",
    border: "#E7E5E4",
    radius: 20,
    font: "'Plus Jakarta Sans', system-ui, sans-serif",
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
    primary: "#4338CA",
    secondary: "#1C1917",
    accent: "#F59E0B",
  },
} as const;

export const fontFamily = {
  sans: "'Plus Jakarta Sans', system-ui, sans-serif",
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  "2xl": 28,
  full: 9999,
} as const;

export type Brand = typeof brand;
export type BrandColor = keyof typeof brand.colors;
