"use client";

import { trpc } from "@/lib/trpc";
import Link from "next/link";

export default function DashboardPage() {
  const sitesQuery = trpc.sites.mine.useQuery();

  return (
    <main style={{ maxWidth: 720, margin: "64px auto", padding: "0 24px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Your sites</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>
        Seeded via <code>pnpm db:seed</code>. Dev auth is stubbed — see{" "}
        <code>apps/builder/src/server/context.ts</code>.
      </p>

      {sitesQuery.isLoading && <p>Loading…</p>}
      {sitesQuery.error && (
        <p style={{ color: "crimson" }}>
          Error loading sites — is the database running and migrated? ({sitesQuery.error.message})
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {sitesQuery.data?.map((site) => (
          <li key={site.id} style={{ border: "1px solid #e2e2e2", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 600 }}>{site.subdomain}.orgsites.app</div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>Status: {site.status}</div>
            <Link href={`/sites/${site.id}/pages/home`} style={{ color: "var(--org-primary, #0E6E5C)", fontSize: 14 }}>
              Open editor →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
