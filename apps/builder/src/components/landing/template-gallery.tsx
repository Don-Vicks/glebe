"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Layers, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: "ngo",
    name: "NGO & Humanitarian Aid",
    category: "Non-Profit",
    description: "Built around mission storytelling, emergency campaigns, verifiable impact statistics, and recurring donor tier subscriptions.",
    tags: ["Donations", "Impact Stats", "Programs", "Volunteer Forms"],
    gradient: "from-emerald-700 to-teal-900",
  },
  {
    id: "faith",
    name: "Faith & Church Ministry",
    category: "Religious",
    description: "Designed for worship times, sermons, benevolence fund tithes, small group sign-ups, and live event announcements.",
    tags: ["Giving / Tithes", "Event Calendar", "Sermons", "Community"],
    gradient: "from-slate-900 to-amber-950",
  },
  {
    id: "school",
    name: "Academy & Civic Education",
    category: "Education",
    description: "Structured for admissions inquiry pipelines, academic calendars, staff directories, and scholarship application submissions.",
    tags: ["Admissions", "Course Tracks", "Faculty Directory", "News"],
    gradient: "from-blue-900 to-slate-900",
  },
  {
    id: "foundation",
    name: "Grant & Philanthropic Foundation",
    category: "Grantmaking",
    description: "Optimized for grant application timelines, public financial disclosure downloads, and funded initiative highlights.",
    tags: ["Grant Tracking", "Annual Reports", "Board Members", "Press"],
    gradient: "from-teal-900 to-slate-950",
  },
];

export function TemplateGallery() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const allTags = ["All", "Donations", "Impact Stats", "Admissions", "Event Calendar"];

  const filtered = selectedTag === "All"
    ? templates
    : templates.filter((t) => t.tags.includes(selectedTag));

  return (
    <section id="templates" className="py-24 bg-slate-50/80 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Starting Blueprints</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Launch with pre-configured archetypes.
            </h2>
            <p className="text-slate-600 text-base">
              Every template is pre-seeded with specialized block schemas, responsive typography, and configured payment pipelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedTag === tag
                    ? "bg-emerald-700 text-white shadow-md shadow-emerald-700/20"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-lg hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className={`h-48 bg-gradient-to-br ${t.gradient} p-8 text-white flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex items-center justify-between z-10">
                  <Badge variant="gold" className="text-[10px] shadow-sm">
                    {t.category}
                  </Badge>
                  <span className="text-xs font-bold text-white/80">Puck Block Ready</span>
                </div>
                <div className="z-10">
                  <h3 className="text-2xl font-black">{t.name}</h3>
                </div>
                <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              </div>

              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <p className="text-sm text-slate-600 leading-relaxed">{t.description}</p>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-700">Zero coding required</span>
                    <Button variant="outline" size="sm" asChild className="gap-1 rounded-full group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                      <Link href="/signup">
                        <span>Use template</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
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
