"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

const templates = [
  { id: "starter", title: "Starter", desc: "Flexible default with hero, mission, donate, and contact sections." },
  { id: "ngo", title: "NGO", desc: "Impact-first layout for nonprofits and community organizations." },
  { id: "faith", title: "Faith", desc: "Warm service-oriented layout with giving and community updates." },
  { id: "school", title: "School", desc: "Admissions, events, and parent communication emphasis." },
  { id: "foundation", title: "Foundation", desc: "Grant, program, and annual report-forward structure." },
] as const;

const orgTypes = [
  { id: "NGO", title: "NGO" },
  { id: "FAITH_BASED", title: "Faith-based" },
  { id: "SCHOOL", title: "School" },
  { id: "FOUNDATION", title: "Foundation" },
  { id: "OTHER", title: "Other" },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const createSite = trpc.sites.create.useMutation({
    onSuccess: (result) => router.push(`/sites/${result.site.id}/pages/${result.site.pages[0]?.id ?? "home"}`),
  });
  const [template, setTemplate] = useState<(typeof templates)[number]["id"]>("starter");
  const [orgType, setOrgType] = useState<(typeof orgTypes)[number]["id"]>("NGO");

  return (
    <main style={shell}>
      <section style={panel}>
        <div style={eyebrow}>Onboarding</div>
        <h1 style={title}>Set up your first site</h1>
        <p style={subtitle}>
          Choose an organization type and a starting template. We’ll create the initial site shell and homepage for you.
        </p>

        <div style={sectionBlock}>
          <div style={sectionLabel}>Organization type</div>
          <div style={choiceGrid}>
            {orgTypes.map((choice) => (
              <button key={choice.id} type="button" onClick={() => setOrgType(choice.id)} style={choiceButton(choice.id === orgType)}>
                {choice.title}
              </button>
            ))}
          </div>
        </div>

        <div style={sectionBlock}>
          <div style={sectionLabel}>Template</div>
          <div style={templateGrid}>
            {templates.map((choice) => (
              <button key={choice.id} type="button" onClick={() => setTemplate(choice.id)} style={templateCard(choice.id === template)}>
                <div style={templateTitle}>{choice.title}</div>
                <p style={templateCopy}>{choice.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={createSite.isPending}
          onClick={() =>
            createSite.mutate({
              name: `${orgTypes.find((item) => item.id === orgType)?.title ?? "Organization"} Site`,
              orgType,
              template,
            })
          }
          style={primaryButton}
        >
          {createSite.isPending ? "Creating site…" : "Create site and continue"}
        </button>

        {createSite.error && <p style={{ color: "#b91c1c" }}>{createSite.error.message}</p>}
      </section>
    </main>
  );
}

const shell: React.CSSProperties = {
  minHeight: "100vh",
  padding: "40px 24px",
  background:
    "radial-gradient(circle at top left, rgba(14, 110, 92, 0.10), transparent 32%), radial-gradient(circle at top right, rgba(199, 150, 46, 0.12), transparent 28%), linear-gradient(180deg, #f8fafc, #eef2ff)",
};
const panel: React.CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
  padding: 28,
  borderRadius: 28,
  background: "rgba(255,255,255,0.92)",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  boxShadow: "0 20px 56px rgba(15,23,42,0.08)",
};
const eyebrow: React.CSSProperties = { color: "#0e6e5c", fontSize: 12, fontWeight: 900, letterSpacing: 1.2, textTransform: "uppercase" };
const title: React.CSSProperties = { margin: "10px 0 8px", fontSize: "clamp(32px, 4vw, 50px)", lineHeight: 1.05 };
const subtitle: React.CSSProperties = { margin: 0, color: "#475569", maxWidth: 720, lineHeight: 1.7 };
const sectionBlock: React.CSSProperties = { marginTop: 28 };
const sectionLabel: React.CSSProperties = { fontSize: 13, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase", color: "#64748b", marginBottom: 12 };
const choiceGrid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 };
const templateGrid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 };
const buttonBase: React.CSSProperties = { border: "none", borderRadius: 18, padding: 16, textAlign: "left" };
const choiceButton = (active: boolean): React.CSSProperties => ({
  ...buttonBase,
  background: active ? "linear-gradient(135deg, #0e6e5c, #1b2a4a)" : "#f8fafc",
  color: active ? "white" : "#0f172a",
  boxShadow: active ? "0 14px 30px rgba(14, 110, 92, 0.18)" : "none",
  border: "1px solid rgba(15, 23, 42, 0.08)",
  fontWeight: 800,
});
const templateCard = (active: boolean): React.CSSProperties => ({
  ...buttonBase,
  minHeight: 140,
  background: active ? "linear-gradient(135deg, rgba(14,110,92,0.12), rgba(27,42,74,0.06))" : "white",
  border: active ? "1px solid rgba(14,110,92,0.28)" : "1px solid rgba(15, 23, 42, 0.08)",
  boxShadow: "0 16px 34px rgba(15,23,42,0.06)",
});
const templateTitle: React.CSSProperties = { fontSize: 18, fontWeight: 900, marginBottom: 8 };
const templateCopy: React.CSSProperties = { margin: 0, color: "#475569", lineHeight: 1.6 };
const primaryButton: React.CSSProperties = {
  marginTop: 28,
  border: "none",
  borderRadius: 999,
  padding: "14px 22px",
  background: "linear-gradient(135deg, #0e6e5c, #1b2a4a)",
  color: "white",
  fontWeight: 900,
  boxShadow: "0 18px 42px rgba(14, 110, 92, 0.22)",
};
