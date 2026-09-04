"use client";

import { useState } from "react";
import { Heart, School, Church, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Archetype = "ngo" | "faith" | "school";

const archetypes: Record<
  Archetype,
  {
    name: string;
    icon: any;
    kicker: string;
    title: string;
    desc: string;
    cta: string;
    stats: Array<{ value: string; label: string }>;
    bannerGradient: string;
  }
> = {
  ngo: {
    name: "NGO & Non-profit",
    icon: Heart,
    kicker: "Hope Foundation · Global Health Initiative",
    title: "Empowering communities with clean water and education.",
    desc: "Join over 14,000 donors transforming rural livelihoods with transparent, direct-impact programs.",
    cta: "Support this project",
    stats: [
      { value: "48,000+", label: "Meals & aid distributed" },
      { value: "$2.4M", label: "Direct impact funded" },
    ],
    bannerGradient: "from-indigo-deep to-ink",
  },
  faith: {
    name: "Faith community",
    icon: Church,
    kicker: "Grace City Ministry · Sunday gathering",
    title: "A welcoming home for worship, fellowship, and outreach.",
    desc: "Discover upcoming service times, small group connections, and community benevolence support.",
    cta: "Plan your visit",
    stats: [
      { value: "3,200", label: "Weekly attendees" },
      { value: "24", label: "Active ministries" },
    ],
    bannerGradient: "from-ink to-ink",
  },
  school: {
    name: "School & academy",
    icon: School,
    kicker: "Horizon Civic Academy · Fall admissions open",
    title: "Nurturing creative minds and ethical leadership.",
    desc: "Explore STEM tracks, scholarship opportunities, and experiential learning for grades K–12.",
    cta: "Apply for the year",
    stats: [
      { value: "98%", label: "College placement rate" },
      { value: "1:8", label: "Faculty to student ratio" },
    ],
    bannerGradient: "from-indigo to-indigo-deep",
  },
};

export function HeroPreviewTabs() {
  const [active, setActive] = useState<Archetype>("ngo");
  const data = archetypes[active];
  const Icon = data.icon;

  return (
    <div className="w-full relative">
      {/* Archetype switcher tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-2 mb-4 overflow-x-auto pb-1">
        {(Object.keys(archetypes) as Archetype[]).map((key) => {
          const item = archetypes[key];
          const ItemIcon = item.icon;
          const isCurrent = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              type="button"
              className={`flex items-center gap-2 px-3.5 h-9 rounded-full text-xs font-semibold transition-colors duration-150 ${
                isCurrent
                  ? "bg-ink text-white shadow-md shadow-ink/15"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              <ItemIcon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Browser mockup container */}
      <div className="rounded-2xl border border-border bg-card shadow-xl shadow-ink/10 overflow-hidden transition-all duration-300">
        {/* Browser top chrome */}
        <div className="px-4 py-3 bg-muted/70 border-b border-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="px-4 py-1 rounded-full bg-card text-[11px] font-mono font-medium text-muted-foreground border border-border shadow-xs flex items-center gap-1.5 max-w-[280px] truncate">
            <span className="text-emerald-600 font-bold">https://</span>
            <span className="text-foreground font-semibold">{active}-community</span>
            <span>.orgsites.app</span>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="published" className="text-[10px] py-0 px-2 h-5">
              Live preview
            </Badge>
          </div>
        </div>

        {/* Mock site body */}
        <div className="p-6 sm:p-8 space-y-5">
          <div
            className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${data.bannerGradient} text-white relative overflow-hidden`}
          >
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] font-semibold text-amber-soft tracking-wide uppercase">
                {data.kicker}
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold leading-tight tracking-tight max-w-lg">
                {data.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-md leading-relaxed">
                {data.desc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-ink text-xs font-semibold shadow-glow-accent hover:brightness-[1.05] transition-[filter,transform] duration-150 active:translate-y-px"
                >
                  <span>{data.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-white/70 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  Paystack & Stripe checkout
                </span>
              </div>
            </div>
          </div>

          {/* Stat metrics mockup */}
          <div className="grid grid-cols-2 gap-3">
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-muted/60 border border-border flex flex-col justify-between"
              >
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-foreground mt-1 tracking-tight">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}