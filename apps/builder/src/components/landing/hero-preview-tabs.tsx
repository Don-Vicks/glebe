"use client";

import { useState } from "react";
import { Heart, School, Church, Building2, Sparkles, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";
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
    accentColor: string;
    bannerGradient: string;
  }
> = {
  ngo: {
    name: "NGO & Non-Profit",
    icon: Heart,
    kicker: "Hope Foundation • Global Health Initiative",
    title: "Empowering communities with clean water and education.",
    desc: "Join over 14,000 donors transforming rural livelihoods with transparent, direct-impact programs.",
    cta: "Support this project",
    stats: [
      { value: "48,000+", label: "Meals & Aid Distributed" },
      { value: "$2.4M", label: "Direct Impact Funded" },
    ],
    accentColor: "text-indigo-700",
    bannerGradient: "from-indigo-800 to-indigo-950",
  },
  faith: {
    name: "Faith-Based Community",
    icon: Church,
    kicker: "Grace City Ministry • Sunday Gathering",
    title: "A welcoming home for worship, fellowship, and outreach.",
    desc: "Discover upcoming service times, small group connections, and community benevolence support.",
    cta: "Plan your visit",
    stats: [
      { value: "3,200", label: "Weekly Attendees" },
      { value: "24", label: "Active Community Ministries" },
    ],
    accentColor: "text-amber-600",
    bannerGradient: "from-slate-900 to-amber-950",
  },
  school: {
    name: "School & Academy",
    icon: School,
    kicker: "Horizon Civic Academy • Fall Admissions Open",
    title: "Nurturing creative minds and ethical leadership.",
    desc: "Explore STEM tracks, scholarship opportunities, and experiential learning for grades K-12.",
    cta: "Apply for 2026/2027",
    stats: [
      { value: "98%", label: "College Placement Rate" },
      { value: "1:8", label: "Faculty to Student Ratio" },
    ],
    accentColor: "text-blue-700",
    bannerGradient: "from-blue-900 to-slate-950",
  },
};

export function HeroPreviewTabs() {
  const [active, setActive] = useState<Archetype>("ngo");
  const data = archetypes[active];
  const Icon = data.icon;

  return (
    <div className="w-full relative">
      {/* Archetype switcher tabs */}
      <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 overflow-x-auto pb-1">
        {(Object.keys(archetypes) as Archetype[]).map((key) => {
          const item = archetypes[key];
          const ItemIcon = item.icon;
          const isCurrent = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                isCurrent
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]"
                  : "bg-white/80 hover:bg-white text-slate-600 border border-slate-200/60"
              }`}
            >
              <ItemIcon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Browser mockup container */}
      <div className="rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-900/10 overflow-hidden transition-all duration-300">
        {/* Browser top chrome */}
        <div className="px-4 py-3 bg-slate-100/80 border-b border-slate-200/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="px-4 py-1 rounded-full bg-white text-[11px] font-mono font-medium text-slate-500 border border-slate-200/60 shadow-xs flex items-center gap-1.5 max-w-[280px] truncate">
            <span className="text-emerald-600 font-bold">https://</span>
            <span className="text-slate-800 font-semibold">{active}-community</span>
            <span>.orgsites.app</span>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="published" className="text-[10px] py-0 px-2 h-5">
              Live Preview
            </Badge>
          </div>
        </div>

        {/* Mock site body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${data.bannerGradient} text-white shadow-lg relative overflow-hidden`}>
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold text-amber-300 tracking-wide uppercase">
                <Sparkles className="w-3 h-3" />
                <span>{data.kicker}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight max-w-lg">
                {data.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/85 max-w-md leading-relaxed">
                {data.desc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
                >
                  <span>{data.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-white/70 font-medium">⚡ Instant Paystack & Stripe Checkout</span>
              </div>
            </div>
          </div>

          {/* Stat metrics mockup */}
          <div className="grid grid-cols-2 gap-3">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
