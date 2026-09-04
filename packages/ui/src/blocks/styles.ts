/**
 * Shared Tailwind class strings for site blocks.
 *
 * These classes are used by BOTH the renderer app and the builder's Puck
 * preview. Themeable colors resolve via CSS custom properties
 * (`--site-primary`, `--site-secondary`, `--site-accent`) set by the host
 * page, so a site's custom colors apply at runtime while falling back to the
 * OrgSites brand defaults.
 *
 * NOTE: Because these live in `packages/ui`, every app that renders blocks
 * must include the packages/ui source tree in its tailwind `content` globs
 * so the utility classes are generated.
 */

/** Wrap a CSS var fallback for use inside an arbitrary-value class.
 *  NOTE: no brackets here — callers add the surrounding `[...]`. */
const theme = (prop: string, fallback: string) => `var(--${prop},${fallback})`;

/** Theme-aware text colors. */
export const text = {
  primary: `text-[color:${theme("site-primary", "#4338CA")}]`,
  secondary: `text-[color:${theme("site-secondary", "#1C1917")}]`,
  muted: "text-[#78716C]",
};

/** Theme-aware background colors. */
export const bg = {
  primary: `bg-[color:${theme("site-primary", "#4338CA")}]`,
  accent: `bg-[color:${theme("site-accent", "#F59E0B")}]`,
  ink: `bg-[color:${theme("site-secondary", "#1C1917")}]`,
  surface: "bg-[#F5F5F4]",
  white: "bg-white",
};

/** Shared card surface used by grids (programs, team, testimonials, stats). */
export const card = [
  "bg-white",
  "rounded-[20px]",
  "border",
  "border-[#E7E5E4]",
  "shadow-[0_20px_60px_rgba(28,25,23,0.10)]",
  "overflow-hidden",
  "font-sans",
].join(" ");

/** Section container for consistent vertical rhythm + font. */
export const section = ["py-14", "px-8", "font-sans"].join(" ");

/** Section heading (H2). */
export const heading = [
  "text-[30px]",
  "font-extrabold",
  "mb-6",
  `text-[color:${theme("site-secondary", "#1C1917")}]`,
].join(" ");
