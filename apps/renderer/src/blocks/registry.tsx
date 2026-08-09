import type { Block } from "@orgsites/block-schema";

/**
 * Site Renderer's block-component registry (spec §8.5.4: "server-renders
 * using the shared block-component registry").
 *
 * These are read-only renders of the same block types Puck edits in
 * apps/builder/src/editor/puck-config.tsx. In a fuller build-out, extract
 * each block's visual markup into a shared @orgsites/ui component so the
 * editor's preview and the published site render pixel-identical output
 * from one source — this scaffold keeps them separate for clarity and
 * duplicates the 3 reference blocks.
 */
export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "hero":
      return (
        <section style={{ padding: "64px 32px", textAlign: "center", background: "var(--org-secondary)", color: "white" }}>
          <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>{block.props.heading}</h1>
          {block.props.subheading && (
            <p style={{ fontSize: 18, maxWidth: 640, margin: "0 auto 24px", opacity: 0.9 }}>{block.props.subheading}</p>
          )}
          {block.props.ctaLabel && (
            <a
              href={block.props.ctaHref || "#"}
              style={{ display: "inline-block", padding: "12px 28px", background: "var(--org-accent)", color: "#1B2A4A", fontWeight: 600, borderRadius: 6, textDecoration: "none" }}
            >
              {block.props.ctaLabel}
            </a>
          )}
        </section>
      );

    case "mission":
      return (
        <section style={{ padding: "48px 32px", maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: "var(--org-secondary)" }}>{block.props.heading}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#333" }}>{block.props.body}</p>
        </section>
      );

    case "impact_stats":
      return (
        <section style={{ padding: "48px 32px", textAlign: "center" }}>
          {block.props.heading && <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>{block.props.heading}</h2>}
          <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {block.props.stats.map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: 36, fontWeight: 800, color: "var(--org-primary)" }}>{stat.value}</div>
                <div style={{ fontSize: 14, color: "#666" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      );

    case "donate_cta":
      return (
        <section style={{ padding: "48px 32px", textAlign: "center", background: "var(--org-primary)", color: "white" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{block.props.heading}</h2>
          {block.props.body && <p style={{ marginBottom: 20, opacity: 0.9 }}>{block.props.body}</p>}
          <button style={{ padding: "12px 28px", background: "white", color: "var(--org-primary)", fontWeight: 600, borderRadius: 6, border: "none" }}>
            Donate {block.props.allowRecurring ? "once or monthly" : "now"}
          </button>
        </section>
      );

    // programs_grid / team / testimonials / event_list / contact_form:
    // same pattern — add a case here as each block type is built out.
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
