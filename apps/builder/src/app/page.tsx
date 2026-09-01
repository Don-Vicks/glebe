import Link from "next/link";

const featureCards = [
  {
    title: "Build sites fast",
    body: "Give every organization a polished website with editing tools, templates, and guided setup.",
  },
  {
    title: "Handle donations",
    body: "Connect payment providers and publish donation-ready pages with webhook-backed payment flows.",
  },
  {
    title: "Ship safely",
    body: "Multi-tenant auth, row-level access, audit logs, and queue-driven publishing keep the platform secure.",
  },
];

const templates = [
  { name: "NGO", desc: "Mission-first storytelling with impact, programs, and donation calls to action." },
  { name: "School", desc: "Admissions, events, news, and parent-friendly information architecture." },
  { name: "Faith", desc: "Services, ministries, giving, and community updates with a warm visual style." },
];

export default function LandingPage() {
  return (
    <main style={pageShell}>
      <section style={heroShell}>
        <div style={heroGlowOne} />
        <div style={heroGlowTwo} />
        <div style={heroContent}>
          <div style={eyebrow}>OrgSites</div>
          <h1 style={heroTitle}>Launch beautiful nonprofit and community websites without hiring a full dev team.</h1>
          <p style={heroCopy}>
            Build, publish, and manage multi-tenant websites for NGOs, faith groups, schools, and civic institutions with
            a guided editor, donation-ready pages, and a production-grade backend.
          </p>
          <div style={ctaRow}>
            <Link href="/signup" style={primaryButton}>
              Start building
            </Link>
            <a href="#templates" style={secondaryButton}>
              Explore templates
            </a>
          </div>
          <div style={socialProof}>
            <span>Fast setup</span>
            <span>Donation ready</span>
            <span>Multi-tenant</span>
            <span>Built for teams</span>
          </div>
        </div>
        <div style={heroPanel}>
          <div style={heroPanelHeader}>Live preview</div>
          <div style={heroMockSite}>
            <div style={heroMockKicker}>Hope Foundation</div>
            <div style={heroMockTitle}>Helping communities build stronger futures.</div>
            <div style={heroMockBody}>A polished, mobile-friendly nonprofit site with clear storytelling and a donate path.</div>
            <div style={heroMockStatRow}>
              <div>
                <strong>12k</strong>
                <span>families served</span>
              </div>
              <div>
                <strong>4.9</strong>
                <span>donor satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={sectionShell}>
        <div style={sectionHeader}>
          <div style={sectionKicker}>Why OrgSites</div>
          <h2 style={sectionTitle}>Everything needed to run the product as a real SaaS.</h2>
        </div>
        <div style={featureGrid}>
          {featureCards.map((feature) => (
            <article key={feature.title} style={card}>
              <h3 style={cardTitle}>{feature.title}</h3>
              <p style={cardBody}>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="templates" style={{ ...sectionShell, paddingTop: 20 }}>
        <div style={sectionHeader}>
          <div style={sectionKicker}>Templates</div>
          <h2 style={sectionTitle}>Start from a strong first draft for each organization type.</h2>
        </div>
        <div style={templateGrid}>
          {templates.map((template) => (
            <article key={template.name} style={templateCard}>
              <div style={templateName}>{template.name}</div>
              <p style={cardBody}>{template.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={sectionShell}>
        <div style={faqCard}>
          <div style={sectionKicker}>How it works</div>
          <ol style={steps}>
            <li>Sign up and create an organization.</li>
            <li>Choose a template and edit pages in the Builder.</li>
            <li>Publish to the public Renderer and connect donations, forms, and domain settings.</li>
          </ol>
        </div>
      </section>

      <section style={ctaBanner}>
        <div>
          <div style={sectionKicker}>Ready to ship</div>
          <h2 style={{ ...sectionTitle, color: "white", marginBottom: 10 }}>Turn the scaffold into a production SaaS.</h2>
          <p style={{ color: "rgba(255,255,255,0.82)", maxWidth: 620, margin: 0 }}>
            The landing page is the first impression. The dashboard and renderer are the product. This structure keeps
            both cleanly separated.
          </p>
        </div>
        <Link href="/signup" style={primaryButton}>
          Create your workspace
        </Link>
      </section>
    </main>
  );
}

const pageShell: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, rgba(14, 110, 92, 0.12), transparent 30%), radial-gradient(circle at top right, rgba(199, 150, 46, 0.14), transparent 26%), linear-gradient(180deg, #ffffff 0%, #f8fafc 45%, #eef2ff 100%)",
  color: "#0f172a",
};

const heroShell: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  padding: "88px 24px 64px",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.05fr) minmax(320px, 0.95fr)",
  gap: 28,
  alignItems: "center",
  maxWidth: 1240,
  margin: "0 auto",
};

const heroGlowOne: React.CSSProperties = {
  position: "absolute",
  inset: "8% auto auto -10%",
  width: 360,
  height: 360,
  borderRadius: "50%",
  background: "rgba(14, 110, 92, 0.12)",
  filter: "blur(48px)",
  pointerEvents: "none",
};

const heroGlowTwo: React.CSSProperties = {
  position: "absolute",
  right: -100,
  top: 0,
  width: 420,
  height: 420,
  borderRadius: "50%",
  background: "rgba(199, 150, 46, 0.14)",
  filter: "blur(56px)",
  pointerEvents: "none",
};

const heroContent: React.CSSProperties = { position: "relative", zIndex: 1, maxWidth: 700 };
const eyebrow: React.CSSProperties = {
  display: "inline-flex",
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(15, 23, 42, 0.06)",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 1,
  textTransform: "uppercase",
};
const heroTitle: React.CSSProperties = {
  fontSize: "clamp(44px, 6vw, 76px)",
  lineHeight: 0.98,
  margin: "20px 0 18px",
  letterSpacing: "-0.05em",
  maxWidth: 920,
};
const heroCopy: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.7,
  color: "#334155",
  maxWidth: 620,
};
const ctaRow: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 };
const primaryButton: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 22px",
  borderRadius: 999,
  background: "linear-gradient(135deg, #0e6e5c, #1b2a4a)",
  color: "white",
  fontWeight: 800,
  textDecoration: "none",
  boxShadow: "0 18px 42px rgba(14, 110, 92, 0.24)",
};
const secondaryButton: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 22px",
  borderRadius: 999,
  background: "rgba(15, 23, 42, 0.05)",
  color: "#0f172a",
  fontWeight: 800,
  textDecoration: "none",
};
const socialProof: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 26, color: "#475569" };

const heroPanel: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  borderRadius: 28,
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  boxShadow: "0 28px 70px rgba(15,23,42,0.10)",
  padding: 18,
};
const heroPanelHeader: React.CSSProperties = { fontSize: 13, fontWeight: 800, textTransform: "uppercase", color: "#64748b", marginBottom: 12 };
const heroMockSite: React.CSSProperties = {
  borderRadius: 22,
  background: "linear-gradient(180deg, #f8fafc, #ffffff)",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  padding: 24,
  minHeight: 360,
};
const heroMockKicker: React.CSSProperties = { color: "#0e6e5c", fontWeight: 800, letterSpacing: 0.5, fontSize: 13 };
const heroMockTitle: React.CSSProperties = { fontSize: 30, lineHeight: 1.04, fontWeight: 800, marginTop: 12, maxWidth: 400 };
const heroMockBody: React.CSSProperties = { marginTop: 12, color: "#475569", lineHeight: 1.65, maxWidth: 400 };
const heroMockStatRow: React.CSSProperties = {
  marginTop: 32,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
};

const sectionShell: React.CSSProperties = { maxWidth: 1240, margin: "0 auto", padding: "28px 24px 0" };
const sectionHeader: React.CSSProperties = { maxWidth: 760, marginBottom: 24 };
const sectionKicker: React.CSSProperties = { color: "#0e6e5c", fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" };
const sectionTitle: React.CSSProperties = { fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.05, margin: "10px 0 0", letterSpacing: "-0.04em" };
const featureGrid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 };
const templateGrid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 };
const card: React.CSSProperties = {
  padding: 22,
  borderRadius: 24,
  background: "white",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  boxShadow: "0 18px 44px rgba(15, 23, 42, 0.06)",
};
const cardTitle: React.CSSProperties = { fontSize: 20, margin: "0 0 10px" };
const cardBody: React.CSSProperties = { margin: 0, color: "#475569", lineHeight: 1.7 };
const templateCard: React.CSSProperties = { ...card, minHeight: 160 };
const templateName: React.CSSProperties = { display: "inline-flex", marginBottom: 12, fontWeight: 900, color: "#1b2a4a" };
const faqCard: React.CSSProperties = {
  ...card,
  background: "linear-gradient(135deg, rgba(14,110,92,0.06), rgba(27,42,74,0.04))",
};
const steps: React.CSSProperties = { margin: "18px 0 0", paddingLeft: 20, lineHeight: 1.9, color: "#334155" };
const ctaBanner: React.CSSProperties = {
  maxWidth: 1240,
  margin: "48px auto 0",
  padding: "32px 24px 60px",
  borderRadius: 0,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  background: "linear-gradient(135deg, #0e6e5c, #1b2a4a)",
};
