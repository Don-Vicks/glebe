"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";

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
    onSuccess: (result) =>
      router.push(`/sites/${result.site.id}/pages/${result.site.pages[0]?.id ?? "home"}`),
  });
  const [template, setTemplate] = useState<(typeof templates)[number]["id"]>("starter");
  const [orgType, setOrgType] = useState<(typeof orgTypes)[number]["id"]>("NGO");

  return (
    <main className="relative min-h-screen bg-background flex items-center justify-center px-4 py-12 selection:bg-primary/20 selection:text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(67,56,202,0.08),transparent_45%),radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_40%)] pointer-events-none" />

      <section className="relative w-full max-w-3xl rounded-2xl border border-border bg-card p-7 sm:p-10 shadow-lg shadow-ink/5">
        <div className="space-y-2 mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-org-accent">
            Onboarding
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Set up your first site
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
            Choose an organization type and a starting template. We&rsquo;ll
            create the initial site shell and homepage for you.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Organization type
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {orgTypes.map((choice) => {
                const active = choice.id === orgType;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => setOrgType(choice.id)}
                    className={`h-11 rounded-xl text-sm font-semibold border transition-colors duration-150 ${
                      active
                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                        : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {choice.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Template
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {templates.map((choice) => {
                const active = choice.id === template;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => setTemplate(choice.id)}
                    className={`text-left p-4 rounded-xl border transition-colors duration-150 ${
                      active
                        ? "bg-primary/[0.04] border-primary shadow-sm"
                        : "bg-card border-border hover:border-primary/40"
                    }`}
                  >
                    <div
                      className={`font-bold text-sm mb-1 ${active ? "text-primary" : "text-foreground"}`}
                    >
                      {choice.title}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {choice.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <Button
              size="lg"
              disabled={createSite.isPending}
              onClick={() =>
                createSite.mutate({
                  name: `${orgTypes.find((item) => item.id === orgType)?.title ?? "Organization"} Site`,
                  orgType,
                  template,
                })
              }
              className="w-full sm:w-auto px-8"
            >
              {createSite.isPending ? "Creating site…" : "Create site and continue"}
              {!createSite.isPending && <ArrowRight className="w-4 h-4 ml-1.5" />}
            </Button>
          </div>

          {createSite.error && (
            <p className="text-sm text-rose-600">{createSite.error.message}</p>
          )}
        </div>
      </section>
    </main>
  );
}