import type { Config } from "@measured/puck";
import { BLOCK_LABELS } from "@orgsites/block-schema";

type PuckComponents = {
  hero: {
    heading: string;
    subheading?: string;
    ctaLabel?: string;
    ctaHref?: string;
    backgroundImageUrl?: string;
  };
  mission: { heading: string; body: string };
  programs_grid: {
    heading: string;
    programs: Array<{ title: string; description: string; imageUrl?: string }>;
  };
  impact_stats: { heading?: string; stats: Array<{ label: string; value: string }> };
  team: { heading?: string; members: Array<{ name: string; role?: string; photoUrl?: string }> };
  testimonials: { heading?: string; quotes: Array<{ quote: string; attribution?: string }> };
  donate_cta: {
    heading: string;
    body?: string;
    paymentProviderConfigId?: string;
    suggestedAmounts?: number[];
    allowCustomAmount: boolean;
    allowRecurring: boolean;
  };
  event_list: {
    heading?: string;
    maxItems: number;
    source: "auto" | "manual";
    eventIds?: string[];
  };
  contact_form: { heading?: string; submitLabel: string; fields: Array<"name" | "email" | "phone" | "message"> };
};

const sharedCard = {
  border: "1px solid rgba(15, 23, 42, 0.1)",
  borderRadius: 20,
  boxShadow: "0 20px 60px rgba(15, 23, 42, 0.1)",
  overflow: "hidden",
  background: "#fff",
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
        backgroundImageUrl: { type: "text" },
      },
      defaultProps: {
        heading: "Building stronger communities, together",
        subheading: "Tell visitors what your organization does in one sentence.",
        ctaLabel: "Donate now",
        ctaHref: "/donate",
      },
      render: ({ heading, subheading, ctaLabel, ctaHref }) => (
        <section style={{ padding: "72px 32px", textAlign: "center", background: "linear-gradient(135deg, #1B2A4A, #0E6E5C)", color: "white" }}>
          <div style={{ maxWidth: 920, margin: "0 auto", ...sharedCard, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", padding: 40 }}>
            <h1 style={{ fontSize: 48, lineHeight: 1.05, fontWeight: 800, marginBottom: 16 }}>{heading}</h1>
            {subheading && <p style={{ fontSize: 18, maxWidth: 680, margin: "0 auto 28px", opacity: 0.92 }}>{subheading}</p>}
            {ctaLabel && (
              <a href={ctaHref || "#"} style={{ display: "inline-block", padding: "13px 28px", background: "#F6D26B", color: "#1B2A4A", fontWeight: 700, borderRadius: 999, textDecoration: "none" }}>
                {ctaLabel}
              </a>
            )}
          </div>
        </section>
      ),
    },
    mission: {
      label: BLOCK_LABELS.mission,
      fields: { heading: { type: "text" }, body: { type: "textarea" } },
      defaultProps: { heading: "Our mission", body: "Describe what your organization believes and why it does this work." },
      render: ({ heading, body }) => (
        <section style={{ padding: "56px 32px", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12, color: "#1B2A4A" }}>{heading}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#334155" }}>{body}</p>
        </section>
      ),
    },
    programs_grid: {
      label: BLOCK_LABELS.programs_grid,
      fields: {
        heading: { type: "text" },
        programs: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            imageUrl: { type: "text" },
          },
        },
      },
      defaultProps: {
        heading: "Programs",
        programs: [{ title: "Community outreach", description: "Hands-on support for families and neighborhoods." }],
      },
      render: ({ heading, programs }) => (
        <section style={{ padding: "56px 32px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            {heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{heading}</h2>}
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {programs.map((program, index) => (
                <article key={index} style={{ ...sharedCard, padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{program.title}</h3>
                  <p style={{ color: "#475569", lineHeight: 1.6 }}>{program.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    impact_stats: {
      label: BLOCK_LABELS.impact_stats,
      fields: {
        heading: { type: "text" },
        stats: { type: "array", arrayFields: { label: { type: "text" }, value: { type: "text" } } },
      },
      defaultProps: { heading: "Impact", stats: [{ label: "Families served", value: "12,400" }] },
      render: ({ heading, stats }) => (
        <section style={{ padding: "56px 32px", textAlign: "center" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            {heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{heading}</h2>}
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ ...sharedCard, padding: 24 }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: "#0E6E5C" }}>{stat.value}</div>
                  <div style={{ marginTop: 4, color: "#64748b" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    team: {
      label: BLOCK_LABELS.team,
      fields: { heading: { type: "text" }, members: { type: "array", arrayFields: { name: { type: "text" }, role: { type: "text" }, photoUrl: { type: "text" } } } },
      defaultProps: { heading: "Our team", members: [{ name: "Amina Yusuf", role: "Programs Lead" }] },
      render: ({ heading, members }) => (
        <section style={{ padding: "56px 32px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            {heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{heading}</h2>}
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {members.map((member, i) => (
                <article key={i} style={{ ...sharedCard, padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>{member.name}</h3>
                  {member.role && <p style={{ color: "#0E6E5C", marginTop: 6 }}>{member.role}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    testimonials: {
      label: BLOCK_LABELS.testimonials,
      fields: { heading: { type: "text" }, quotes: { type: "array", arrayFields: { quote: { type: "textarea" }, attribution: { type: "text" } } } },
      defaultProps: { heading: "What people say", quotes: [{ quote: "This work changed our community.", attribution: "Local partner" }] },
      render: ({ heading, quotes }) => (
        <section style={{ padding: "56px 32px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            {heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{heading}</h2>}
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              {quotes.map((quote, i) => (
                <blockquote key={i} style={{ ...sharedCard, padding: 24, fontSize: 17, lineHeight: 1.7, color: "#334155" }}>
                  <p>{quote.quote}</p>
                  {quote.attribution && <footer style={{ marginTop: 12, fontWeight: 700, color: "#1B2A4A" }}>{quote.attribution}</footer>}
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    donate_cta: {
      label: BLOCK_LABELS.donate_cta,
      fields: {
        heading: { type: "text" },
        body: { type: "textarea" },
        paymentProviderConfigId: { type: "text" },
        suggestedAmounts: { type: "array", arrayFields: { value: { type: "number" } } },
        allowCustomAmount: { type: "radio", options: [{ label: "Allow custom amount", value: true }, { label: "Fixed amounts only", value: false }] },
        allowRecurring: { type: "radio", options: [{ label: "Allow recurring donations", value: true }, { label: "One-time only", value: false }] },
      },
      defaultProps: { heading: "Support our work", body: "Your donation directly funds our programs.", allowCustomAmount: true, allowRecurring: true },
      render: ({ heading, body, allowRecurring, allowCustomAmount }) => (
        <section style={{ padding: "56px 32px", textAlign: "center", background: "linear-gradient(135deg, #0E6E5C, #134E4A)", color: "white" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", ...sharedCard, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", padding: 36 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{heading}</h2>
            {body && <p style={{ marginBottom: 20, opacity: 0.92 }}>{body}</p>}
            <button style={{ padding: "12px 28px", background: "#F6D26B", color: "#1B2A4A", fontWeight: 700, borderRadius: 999, border: "none" }}>
              Donate {allowRecurring ? "once or monthly" : "now"} {allowCustomAmount ? "" : "(preset amounts)"}
            </button>
          </div>
        </section>
      ),
    },
    event_list: {
      label: BLOCK_LABELS.event_list,
      fields: {
        heading: { type: "text" },
        maxItems: { type: "number" },
        source: { type: "radio", options: [{ label: "Auto-pull from events", value: "auto" }, { label: "Manually curated", value: "manual" }] },
        eventIds: { type: "array", arrayFields: { value: { type: "text" } } },
      },
      defaultProps: { heading: "Upcoming events", maxItems: 5, source: "auto" },
      render: ({ heading }) => (
        <section style={{ padding: "56px 32px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{heading}</h2>}
            <div style={{ ...sharedCard, padding: 24, color: "#64748b" }}>Event list preview will render published events here.</div>
          </div>
        </section>
      ),
    },
    contact_form: {
      label: BLOCK_LABELS.contact_form,
      fields: {
        heading: { type: "text" },
        submitLabel: { type: "text" },
        fields: { type: "array", arrayFields: { value: { type: "text" } } },
      },
      defaultProps: { heading: "Contact us", submitLabel: "Send message", fields: ["name", "email", "message"] },
      render: ({ heading, submitLabel }) => (
        <section style={{ padding: "56px 32px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{heading}</h2>}
            <form style={{ display: "grid", gap: 12, ...sharedCard, padding: 24 }}>
              <input placeholder="Your name" style={{ padding: 12, borderRadius: 12, border: "1px solid #cbd5e1" }} />
              <input placeholder="Email address" style={{ padding: 12, borderRadius: 12, border: "1px solid #cbd5e1" }} />
              <textarea placeholder="Message" rows={5} style={{ padding: 12, borderRadius: 12, border: "1px solid #cbd5e1" }} />
              <button type="button" style={{ padding: "12px 20px", borderRadius: 999, border: "none", background: "#1B2A4A", color: "white", fontWeight: 700 }}>
                {submitLabel}
              </button>
            </form>
          </div>
        </section>
      ),
    },
  },
};
