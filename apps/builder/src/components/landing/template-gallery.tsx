"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "ngo",
    name: "NGO & Humanitarian aid",
    category: "Non-profit",
    description: "Built around mission storytelling, emergency campaigns, verifiable impact statistics, and recurring donor tiers.",
    tags: ["Donations", "Impact stats", "Programs", "Volunteer forms"],
    gradient: "from-indigo-deep to-ink",
  },
  {
    id: "faith",
    name: "Faith & church ministry",
    category: "Religious",
    description: "Designed for worship times, sermons, benevolence giving, small group sign-ups, and live event announcements.",
    tags: ["Giving", "Event calendar", "Sermons", "Community"],
    gradient: "from-ink to-ink",
  },
  {
    id: "school",
    name: "Academy & civic education",
    category: "Education",
    description: "Structured for admissions pipelines, academic calendars, staff directories, and scholarship applications.",
    tags: ["Admissions", "Course tracks", "Faculty", "News"],
    gradient: "from-indigo to-indigo-deep",
  },
  {
    id: "foundation",
    name: "Grant & philanthropic foundation",
    category: "Grantmaking",
    description: "Optimized for grant timelines, public financial disclosures, and funded-initiative highlights.",
    tags: ["Grant tracking", "Annual reports", "Board", "Press"],
    gradient: "from-ink to-indigo-deep",
  },
];

export function TemplateGallery() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const allTags = ["All", "Donations", "Admissions", "Giving", "Sermons"];

  const filtered =
    selectedTag === "All"
      ? templates
      : templates.filter((t) => t.tags.includes(selectedTag));

  return (
    <section id="templates" className="py-24 bg-muted/40 border-y border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="space-y-4 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-org-accent">
              Starting blueprints
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Launch with a pre-configured archetype.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Every template is pre-seeded with the right block schema,
              typography, and payment pipeline for your organization type.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`h-9 px-4 rounded-full text-xs font-semibold transition-colors duration-150 ${
                  selectedTag === tag
                    ? "bg-ink text-white shadow-md shadow-ink/15"
                    : "bg-card text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={`h-44 bg-gradient-to-br ${t.gradient} p-6 text-white flex flex-col justify-between relative overflow-hidden`}
              >
                <div className="flex items-center justify-between z-10">
                  <Badge variant="gold" className="text-[10px] font-semibold">
                    {t.category}
                  </Badge>
                </div>
                <div className="z-10">
                  <h3 className="text-xl font-bold tracking-tight leading-snug">
                    {t.name}
                  </h3>
                </div>
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              </div>

              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.description}
                </p>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/70 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      No code required
                    </span>
                    <Button size="sm" asChild>
                      <Link href="/signup">
                        Use template
                        <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}