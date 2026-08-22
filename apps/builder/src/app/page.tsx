"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trpc } from "@/lib/trpc";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? "http://localhost:4000";

async function postJson(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${API_BASE_URL}/v1${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok) {
    throw new Error((payload.error as string) || `Request failed with ${response.status}`);
  }
  return payload;
}

export default function DashboardPage() {
  const router = useRouter();
  const sitesQuery = trpc.sites.mine.useQuery();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    try {
      if (mode === "login") {
        await postJson("/auth/login", { email, password });
      } else {
        await postJson("/auth/signup", {
          email,
          password,
          organizationName: String(formData.get("organizationName") ?? ""),
          name: String(formData.get("name") ?? ""),
        });
      }
      router.refresh();
      sitesQuery.refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: "48px 24px", background: "linear-gradient(180deg, #f8fafc, #eef2ff)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "380px 1fr", gap: 24, alignItems: "start" }}>
        <section style={{ borderRadius: 28, padding: 28, background: "#fff", boxShadow: "0 24px 60px rgba(15,23,42,0.12)" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0E6E5C", textTransform: "uppercase", letterSpacing: 1 }}>OrgSites</div>
            <h1 style={{ fontSize: 32, lineHeight: 1.05, marginTop: 8 }}>Sign in or create your org</h1>
            <p style={{ color: "#475569", marginTop: 10 }}>Use the real auth flow. The cookie set here unlocks the Builder, tRPC, and publish flow.</p>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <button onClick={() => setMode("login")} style={tabStyle(mode === "login")}>Login</button>
            <button onClick={() => setMode("signup")} style={tabStyle(mode === "signup")}>Sign up</button>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit(new FormData(event.currentTarget));
            }}
            style={{ display: "grid", gap: 12 }}
          >
            {mode === "signup" && (
              <>
                <input name="name" placeholder="Your name" style={inputStyle()} />
                <input name="organizationName" placeholder="Organization name" style={inputStyle()} />
              </>
            )}
            <input name="email" type="email" placeholder="Email address" style={inputStyle()} />
            <input name="password" type="password" placeholder="Password" style={inputStyle()} />
            {error && <div style={{ color: "#b91c1c", fontSize: 14 }}>{error}</div>}
            <button disabled={loading} type="submit" style={primaryButton}>
              {loading ? "Working…" : mode === "login" ? "Log in" : "Create account"}
            </button>
          </form>
        </section>

        <section style={{ borderRadius: 28, padding: 28, background: "rgba(255,255,255,0.7)", backdropFilter: "blur(14px)", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <div>
              <h2 style={{ fontSize: 26, marginBottom: 6 }}>Your sites</h2>
              <p style={{ color: "#64748b" }}>Seeded via <code>pnpm db:seed</code>.</p>
            </div>
            <Link href="/sites" style={{ color: "#0E6E5C", fontWeight: 700 }}>Open editor</Link>
          </div>

          {sitesQuery.isLoading && <p>Loading…</p>}
          {sitesQuery.error && <p style={{ color: "crimson" }}>Error loading sites: {sitesQuery.error.message}</p>}

          <div style={{ display: "grid", gap: 14 }}>
            {sitesQuery.data?.map((site) => (
              <article key={site.id} style={{ borderRadius: 20, padding: 20, background: "#fff", border: "1px solid rgba(15, 23, 42, 0.08)" }}>
                <div style={{ fontWeight: 700 }}>{site.subdomain}.orgsites.app</div>
                <div style={{ color: "#64748b", marginTop: 4, fontSize: 14 }}>Status: {site.status}</div>
                <Link href={`/sites/${site.id}/pages/home`} style={{ display: "inline-block", marginTop: 10, color: "#0E6E5C", fontWeight: 700 }}>
                  Open editor →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function inputStyle(): React.CSSProperties {
  return {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: 14,
    padding: "13px 14px",
    fontSize: 15,
    outline: "none",
  };
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    flex: 1,
    border: "none",
    borderRadius: 999,
    padding: "10px 14px",
    fontWeight: 700,
    background: active ? "#0E6E5C" : "#e2e8f0",
    color: active ? "white" : "#0f172a",
  };
}

const primaryButton: React.CSSProperties = {
  border: "none",
  borderRadius: 14,
  padding: "13px 16px",
  fontWeight: 800,
  background: "linear-gradient(135deg, #0E6E5C, #1B2A4A)",
  color: "white",
};
