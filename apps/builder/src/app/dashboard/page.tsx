"use client";

import Link from "next/link";
import { trpc } from "@/lib/trpc";
import { LogoutButton } from "../logout-button";

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
  const sites = sitesQuery.data ?? [];
  const publishedCount = sites.filter((item) => item.status === "PUBLISHED").length;
  const draftCount = sites.length - publishedCount;
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "orgsites.app";

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
          <LogoutButton />
          <Link href="/" style={ghostButton}>
            Marketing site
          </Link>
          <Link href="/onboarding" style={primaryButton}>
            Create new site
          </Link>
        </div>
      </section>

      <nav style={workspaceNav} aria-label="Workspace navigation">
        <Link href="/dashboard" style={activeNavLink}>Overview</Link>
        <a href="#sites" style={navLink}>Sites</a>
        <a href="#setup" style={navLink}>Launch checklist</a>
      </nav>

      <section style={statGrid} aria-label="Workspace summary">
        <Stat label="Total sites" value={String(sites.length)} />
        <Stat label="Published" value={String(publishedCount)} />
        <Stat label="Drafts" value={String(draftCount)} />
      </section>

      <section id="setup" style={layout}>
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

        <article id="sites" style={panel}>
          <div style={panelHeader}>
            <div>
              <div style={sectionKicker}>Sites</div>
              <h2 style={panelTitle}>Your sites</h2>
            </div>
          </div>

          {sitesQuery.isLoading && <p>Loading…</p>}
          {sitesQuery.error && <p style={{ color: "#b91c1c" }}>Error loading sites: {sitesQuery.error.message}</p>}

          <div style={siteList}>
          {sites.map((site) => (
            <article key={site.id} style={siteCard}>
              <div style={siteCardTop}>
                <div style={siteLabel}>{site.subdomain}.{rootDomain}</div>
                <span style={statusBadge(site.status)}>{site.status === "PUBLISHED" ? "Published" : "Draft"}</span>
              </div>
              <h3 style={siteName}>{site.organization.name}</h3>
              <p style={siteMeta}>
                {site.pages.length} page{site.pages.length === 1 ? "" : "s"} · {site.status === "PUBLISHED" && site.publishedAt ? `Live since ${new Date(site.publishedAt).toLocaleDateString()}` : "Not published yet"}
              </p>
              <div style={siteActions}>
                <Link href={`/sites/${site.id}/pages/${site.pages[0]?.id ?? "home"}`} style={siteLink}>
                  Edit site
                </Link>
                {site.status === "PUBLISHED" && (
                  <a href={`https://${site.customDomain ?? `${site.subdomain}.${rootDomain}`}`} target="_blank" rel="noreferrer" style={liveLink}>
                    View live site ↗
                  </a>
                )}
              </div>
            </article>
          ))}
          {!sitesQuery.isLoading && !sitesQuery.error && sites.length === 0 && (
            <div style={emptyState}>
              <strong>Your first site starts here.</strong>
              <span>Choose a template and create a publishable home for your organization.</span>
              <Link href="/onboarding" style={siteLink}>Create a site →</Link>
            </div>
          )}
          </div>
        </article>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div style={statCard}><span style={statLabel}>{label}</span><strong style={statValue}>{value}</strong></div>;
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
const workspaceNav: React.CSSProperties = { maxWidth: 1240, margin: "0 auto 18px", display: "flex", gap: 22, borderBottom: "1px solid rgba(15, 23, 42, 0.1)", paddingBottom: 12 };
const navLink: React.CSSProperties = { color: "#64748b", textDecoration: "none", fontSize: 14, fontWeight: 700 };
const activeNavLink: React.CSSProperties = { ...navLink, color: "#0e6e5c" };
const statGrid: React.CSSProperties = { maxWidth: 1240, margin: "0 auto 18px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 };
const statCard: React.CSSProperties = { padding: "16px 18px", borderRadius: 18, background: "rgba(255,255,255,0.76)", border: "1px solid rgba(15, 23, 42, 0.08)" };
const statLabel: React.CSSProperties = { display: "block", color: "#64748b", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 };
const statValue: React.CSSProperties = { display: "block", marginTop: 7, color: "#1b2a4a", fontSize: 28 };
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
const siteCardTop: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 };
const statusBadge = (status: string): React.CSSProperties => ({ padding: "5px 9px", borderRadius: 999, background: status === "PUBLISHED" ? "#e8f5ef" : "#fff6df", color: status === "PUBLISHED" ? "#145c4a" : "#8a6410", fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.7 });
const siteName: React.CSSProperties = { margin: "10px 0 6px", fontSize: 18 };
const siteMeta: React.CSSProperties = { margin: 0, color: "#64748b" };
const siteActions: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 16, marginTop: 14 };
const siteLink: React.CSSProperties = { display: "inline-flex", color: "#0e6e5c", fontWeight: 800, textDecoration: "none" };
const liveLink: React.CSSProperties = { display: "inline-flex", color: "#1b2a4a", fontWeight: 800, textDecoration: "none" };
const emptyState: React.CSSProperties = { display: "grid", gap: 8, padding: 22, borderRadius: 18, background: "#f8fafc", color: "#475569", lineHeight: 1.5 };
