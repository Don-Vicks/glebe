import type { Block } from "@orgsites/block-schema";

const card = {
  border: "1px solid rgba(15, 23, 42, 0.1)",
  borderRadius: 20,
  boxShadow: "0 20px 60px rgba(15, 23, 42, 0.1)",
  overflow: "hidden",
  background: "#fff",
};

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return (
        <section style={{ padding: "72px 32px", textAlign: "center", background: "linear-gradient(135deg, #1B2A4A, #0E6E5C)", color: "white" }}>
          <div style={{ maxWidth: 920, margin: "0 auto", ...card, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", padding: 40 }}>
            <h1 style={{ fontSize: 48, lineHeight: 1.05, fontWeight: 800, marginBottom: 16 }}>{block.props.heading}</h1>
            {block.props.subheading && <p style={{ fontSize: 18, maxWidth: 680, margin: "0 auto 28px", opacity: 0.92 }}>{block.props.subheading}</p>}
            {block.props.ctaLabel && (
              <a href={block.props.ctaHref || "#"} style={{ display: "inline-block", padding: "13px 28px", background: "#F6D26B", color: "#1B2A4A", fontWeight: 700, borderRadius: 999, textDecoration: "none" }}>
                {block.props.ctaLabel}
              </a>
            )}
          </div>
        </section>
      );
    case "mission":
      return (
        <section style={{ padding: "56px 32px", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12, color: "#1B2A4A" }}>{block.props.heading}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#334155" }}>{block.props.body}</p>
        </section>
      );
    case "programs_grid":
      return (
        <section style={{ padding: "56px 32px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            {block.props.heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{block.props.heading}</h2>}
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {block.props.programs.map((program, index) => (
                <article key={index} style={{ ...card, padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{program.title}</h3>
                  <p style={{ color: "#475569", lineHeight: 1.6 }}>{program.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    case "impact_stats":
      return (
        <section style={{ padding: "56px 32px", textAlign: "center" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            {block.props.heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{block.props.heading}</h2>}
            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {block.props.stats.map((stat, i) => (
                <div key={i} style={{ ...card, padding: 24 }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: "#0E6E5C" }}>{stat.value}</div>
                  <div style={{ marginTop: 4, color: "#64748b" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "team":
      return (
        <section style={{ padding: "56px 32px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            {block.props.heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{block.props.heading}</h2>}
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {block.props.members.map((member, i) => (
                <article key={i} style={{ ...card, padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>{member.name}</h3>
                  {member.role && <p style={{ color: "#0E6E5C", marginTop: 6 }}>{member.role}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    case "testimonials":
      return (
        <section style={{ padding: "56px 32px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            {block.props.heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{block.props.heading}</h2>}
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              {block.props.quotes.map((quote, i) => (
                <blockquote key={i} style={{ ...card, padding: 24, fontSize: 17, lineHeight: 1.7, color: "#334155" }}>
                  <p>{quote.quote}</p>
                  {quote.attribution && <footer style={{ marginTop: 12, fontWeight: 700, color: "#1B2A4A" }}>{quote.attribution}</footer>}
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      );
    case "donate_cta":
      return (
        <section style={{ padding: "56px 32px", textAlign: "center", background: "linear-gradient(135deg, #0E6E5C, #134E4A)", color: "white" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", ...card, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", padding: 36 }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{block.props.heading}</h2>
            {block.props.body && <p style={{ marginBottom: 20, opacity: 0.92 }}>{block.props.body}</p>}
            <button style={{ padding: "12px 28px", background: "#F6D26B", color: "#1B2A4A", fontWeight: 700, borderRadius: 999, border: "none" }}>
              Donate {block.props.allowRecurring ? "once or monthly" : "now"} {block.props.allowCustomAmount ? "" : "(preset amounts)"}
            </button>
          </div>
        </section>
      );
    case "event_list":
      return (
        <section style={{ padding: "56px 32px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {block.props.heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{block.props.heading}</h2>}
            <div style={{ ...card, padding: 24, color: "#64748b" }}>Event list preview will render published events here.</div>
          </div>
        </section>
      );
    case "contact_form":
      return (
        <section style={{ padding: "56px 32px", background: "#F8FAFC" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            {block.props.heading && <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 24, color: "#1B2A4A" }}>{block.props.heading}</h2>}
            <form style={{ display: "grid", gap: 12, ...card, padding: 24 }}>
              <input placeholder="Your name" style={{ padding: 12, borderRadius: 12, border: "1px solid #cbd5e1" }} />
              <input placeholder="Email address" style={{ padding: 12, borderRadius: 12, border: "1px solid #cbd5e1" }} />
              <textarea placeholder="Message" rows={5} style={{ padding: 12, borderRadius: 12, border: "1px solid #cbd5e1" }} />
              <button type="button" style={{ padding: "12px 20px", borderRadius: 999, border: "none", background: "#1B2A4A", color: "white", fontWeight: 700 }}>
                {block.props.submitLabel}
              </button>
            </form>
          </div>
        </section>
      );
    default:
      if (process.env.NODE_ENV === "development") {
        return (
          <div style={{ padding: 24, border: "1px dashed #ccc", color: "#999" }}>
            No renderer implemented yet for block type: <code>{(block as Block).type}</code>
          </div>
        );
      }
      return null;
  }
}
