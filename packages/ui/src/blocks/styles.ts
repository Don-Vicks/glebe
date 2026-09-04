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
  primary: `text-[color:${theme("site-primary", "#0E6E5C")}]`,
  secondary: `text-[color:${theme("site-secondary", "#1B2A4A")}]`,
  muted: "text-[#3D4B5C]",
};

/** Theme-aware background colors. */
export const bg = {
  primary: `bg-[color:${theme("site-primary", "#0E6E5C")}]`,
  accent: `bg-[color:${theme("site-accent", "#B98A2E")}]`,
  ink: `bg-[color:${theme("site-secondary", "#1B2A4A")}]`,
  surface: "bg-[#F1ECE0]",
  white: "bg-white",
};

/** Shared card surface used by grids (programs, team, testimonials, stats). */
export const card = [
  "bg-white",
  "rounded-[14px]",
  "border",
  "border-[#DCD4C2]",
  "shadow-[0_20px_60px_rgba(22,35,58,0.10)]",
  "overflow-hidden",
  "font-sans",
].join(" ");

/** Section container for consistent vertical rhythm + font. */
export const section = ["py-14", "px-8", "font-sans"].join(" ");

/** Section heading (H2) — Fraunces display face. */
export const heading = [
  "font-display",
  "text-[32px]",
  "font-medium",
  "mb-6",
  `text-[color:${theme("site-secondary", "#1B2A4A")}]`,
].join(" ");