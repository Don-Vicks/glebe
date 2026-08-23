"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc";

const checklist = [
  { label: "Complete org profile", done: true },
  { label: "Choose a template", done: false },
  { label: "Connect payments", done: false },
  { label: "Publish first page", done: false },
];

export default function DashboardPage() {
  const sitesQuery = trpc.sites.mine.useQuery();
  const site = sitesQuery.data?.[0];
  const orgName = site?.organization.name ?? "Your organization";

  return (
    <main style={shell}>
      <section style={hero}>
        <div>
          <div style={eyebrow}>Workspace</div>
          <h1 style={title}>{orgName}</h1>
          <p style={subtitle}>
            Manage your sites, pages, payments, and publishing workflow from one production-ready SaaS workspace.
          </p>
        </div>
        <div style={actions}>
          <Link href="/" style={ghostButton}>
            Marketing site
          </Link>
          <Link href="/onboarding" style={primaryButton}>
            Create new site
          </Link>
        </div>
      </section>

      <section style={layout}>
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <div style={sectionKicker}>Setup</div>
              <h2 style={panelTitle}>Launch checklist</h2>
            </div>
          </div>
          <div style={checklistList}>
            {checklist.map((item) => (
              <div key={item.label} style={checkItem}>
                <div style={checkbox(item.done)}>{item.done ? "✓" : ""}</div>
                <span style={{ color: item.done ? "#0f172a" : "#475569" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <div style={sectionKicker}>Sites</div>
              <h2 style={panelTitle}>Your sites</h2>
            </div>
          </div>

          {sitesQuery.isLoading && <p>Loading…</p>}
          {sitesQuery.error && <p style={{ color: "#b91c1c" }}>Error loading sites: {sitesQuery.error.message}</p>}

          <div style={siteList}>
            {sitesQuery.data?.map((site) => (
              <article key={site.id} style={siteCard}>
                <div style={siteLabel}>{site.subdomain}.orgsites.app</div>
                <h3 style={siteName}>{site.organization.name}</h3>
                <p style={siteMeta}>
                  {site.pages.length} page{site.pages.length === 1 ? "" : "s"} · {site.status}
                </p>
                <Link href={`/sites/${site.id}/pages/${site.pages[0]?.id ?? "home"}`} style={siteLink}>
                  Open editor →
                </Link>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

const shell: React.CSSProperties = {
  minHeight: "100vh",
  padding: "40px 24px 64px",
  background: "linear-gradient(180deg, #f8fafc, #eef2ff)",
  color: "#0f172a",
};
const hero: React.CSSProperties = {
  maxWidth: 1240,
  margin: "0 auto 28px",
  display: "flex",
  justifyContent: "space-between",
  gap: 20,
  alignItems: "flex-end",
  flexWrap: "wrap",
};
const eyebrow: React.CSSProperties = { color: "#0e6e5c", fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" };
const title: React.CSSProperties = { margin: "10px 0 8px", fontSize: "clamp(32px, 4vw, 50px)", lineHeight: 1.05 };
const subtitle: React.CSSProperties = { margin: 0, color: "#475569", maxWidth: 700, lineHeight: 1.7 };
const actions: React.CSSProperties = { display: "flex", gap: 10, flexWrap: "wrap" };
const buttonBase: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 999,
  textDecoration: "none",
  fontWeight: 800,
};
const ghostButton: React.CSSProperties = {
  ...buttonBase,
  background: "white",
  color: "#0f172a",
  border: "1px solid rgba(15, 23, 42, 0.08)",
};
const primaryButton: React.CSSProperties = {
  ...buttonBase,
  background: "linear-gradient(135deg, #0e6e5c, #1b2a4a)",
  color: "white",
};
const layout: React.CSSProperties = { maxWidth: 1240, margin: "0 auto", display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" };
const panel: React.CSSProperties = {
  padding: 22,
  borderRadius: 28,
  background: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  boxShadow: "0 20px 56px rgba(15,23,42,0.08)",
};
const panelHeader: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 };
const sectionKicker: React.CSSProperties = { color: "#0e6e5c", fontSize: 12, fontWeight: 900, letterSpacing: 1.1, textTransform: "uppercase" };
const panelTitle: React.CSSProperties = { margin: "8px 0 0", fontSize: 24 };
const checklistList: React.CSSProperties = { display: "grid", gap: 12 };
const checkItem: React.CSSProperties = { display: "flex", alignItems: "center", gap: 12, padding: 14, borderRadius: 18, background: "#f8fafc" };
const checkbox = (done: boolean): React.CSSProperties => ({
  width: 24,
  height: 24,
  borderRadius: 999,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: done ? "#0e6e5c" : "#e2e8f0",
  color: "white",
  fontWeight: 900,
  flexShrink: 0,
});
const siteList: React.CSSProperties = { display: "grid", gap: 14 };
const siteCard: React.CSSProperties = {
  padding: 18,
  borderRadius: 22,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  background: "white",
};
const siteLabel: React.CSSProperties = { color: "#0e6e5c", fontSize: 12, fontWeight: 900, letterSpacing: 1.1, textTransform: "uppercase" };
const siteName: React.CSSProperties = { margin: "10px 0 6px", fontSize: 18 };
const siteMeta: React.CSSProperties = { margin: 0, color: "#64748b" };
const siteLink: React.CSSProperties = { display: "inline-flex", marginTop: 14, color: "#0e6e5c", fontWeight: 800, textDecoration: "none" };
