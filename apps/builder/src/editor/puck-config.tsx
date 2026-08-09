import type { Config } from "@measured/puck";
import { BLOCK_LABELS } from "@orgsites/block-schema";

/**
 * Puck editor configuration (spec §8.3a).
 *
 * This is intentionally a thin layer: Puck owns the drag/reorder/edit-in-
 * place canvas UI; the actual shape of each block's props is defined once
 * in @orgsites/block-schema and mirrored here as Puck fields. The renderer
 * components below are ALSO reused (or near-identical twins of) the
 * components in apps/renderer — see the note at the bottom of this file.
 *
 * Puck's own output is a block-JSON tree matching this config, which is
 * exactly the `Page.blocks` JSON column shape in packages/db — no
 * translation layer needed between "what the editor produced" and "what
 * gets stored."
 *
 * Only 3 of 9 block types are wired up below as a working reference
 * implementation. Add the remaining six (programs_grid, team, testimonials,
 * event_list, contact_form) the same way — copy a block, adjust fields.
 */

type HeroProps = {
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type MissionProps = {
  heading: string;
  body: string;
};

type DonateCtaProps = {
  heading: string;
  body?: string;
  allowRecurring: boolean;
};

type PuckComponents = {
  hero: HeroProps;
  mission: MissionProps;
  donate_cta: DonateCtaProps;
};

export const puckConfig: Config<PuckComponents> = {
  components: {
    hero: {
      label: BLOCK_LABELS.hero,
      fields: {
        heading: { type: "text" },
        subheading: { type: "textarea" },
        ctaLabel: { type: "text" },
        ctaHref: { type: "text" },
      },
      defaultProps: {
        heading: "Building stronger communities, together",
        subheading: "Tell visitors what your organization does in one sentence.",
        ctaLabel: "Donate now",
        ctaHref: "/donate",
      },
      render: ({ heading, subheading, ctaLabel, ctaHref }) => (
        <section style={{ padding: "64px 32px", textAlign: "center", background: "var(--org-secondary, #1B2A4A)", color: "white" }}>
          <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>{heading}</h1>
          {subheading && <p style={{ fontSize: 18, maxWidth: 640, margin: "0 auto 24px", opacity: 0.9 }}>{subheading}</p>}
          {ctaLabel && (
            <a
              href={ctaHref || "#"}
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "var(--org-accent, #C7962E)",
                color: "#1B2A4A",
                fontWeight: 600,
                borderRadius: 6,
                textDecoration: "none",
              }}
            >
              {ctaLabel}
            </a>
          )}
        </section>
      ),
    },

    mission: {
      label: BLOCK_LABELS.mission,
      fields: {
        heading: { type: "text" },
        body: { type: "textarea" },
      },
      defaultProps: {
        heading: "Our mission",
        body: "Describe what your organization believes and why it does this work.",
      },
      render: ({ heading, body }) => (
        <section style={{ padding: "48px 32px", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: "var(--org-secondary, #1B2A4A)" }}>{heading}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#333" }}>{body}</p>
        </section>
      ),
    },

    donate_cta: {
      label: BLOCK_LABELS.donate_cta,
      fields: {
        heading: { type: "text" },
        body: { type: "textarea" },
        allowRecurring: {
          type: "radio",
          options: [
            { label: "Allow recurring donations", value: true },
            { label: "One-time only", value: false },
          ],
        },
      },
      defaultProps: {
        heading: "Support our work",
        body: "Your donation directly funds our programs.",
        allowRecurring: true,
      },
      render: ({ heading, body, allowRecurring }) => (
        <section style={{ padding: "48px 32px", textAlign: "center", background: "var(--org-primary, #0E6E5C)", color: "white" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{heading}</h2>
          {body && <p style={{ marginBottom: 20, opacity: 0.9 }}>{body}</p>}
          <button
            style={{ padding: "12px 28px", background: "white", color: "var(--org-primary, #0E6E5C)", fontWeight: 600, borderRadius: 6, border: "none" }}
          >
            Donate {allowRecurring ? "once or monthly" : "now"}
          </button>
          {/* Wired to the selected PaymentProviderConfig via the Platform API — see spec §8.6 */}
        </section>
      ),
    },
  },
};
