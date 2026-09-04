"use client";

import { Layout, CreditCard, ShieldCheck, Zap, Globe2, Sparkles, Sliders, Users2, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Layout,
    title: "Visual Block Editor (Puck)",
    desc: "Drag and drop modular blocks (Heroes, Missions, Donate CTAs, Events, Testimonials) without breaking brand layouts.",
    badge: "Interactive",
  },
  {
    icon: CreditCard,
    title: "Instant Donation Workflows",
    desc: "Pre-integrated with Paystack, Flutterwave, Stripe, and PayPal with automated recurring support and receipts.",
    badge: "Payments",
  },
  {
    icon: ShieldCheck,
    title: "Multi-Tenant Isolation",
    desc: "Strict row-level security and tenant sandboxing ensure organizations never leak records or credentials.",
    badge: "Security",
  },
  {
    icon: Zap,
    title: "High-Speed On-Demand ISR",
    desc: "Instant page revalidation via Next.js ISR renders blazing fast pages without rebuilding your entire site.",
    badge: "Performance",
  },
  {
    icon: Globe2,
    title: "Custom Domain Auto-SSL",
    desc: "Automated DNS verification and zero-touch edge SSL provisioning for your primary brand domain.",
    badge: "Publishing",
  },
  {
    icon: Users2,
    title: "Team & Role Access",
    desc: "Assign Owner, Editor, and Viewer permissions with full audit trail history for critical site updates.",
    badge: "Collaboration",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Purpose-Built for Mission Teams</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Everything required to run professional community websites.
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Skip messy generic website builders and custom dev retainers. OrgSites delivers purpose-crafted tools engineered specifically for civic, religious, and nonprofit workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card
              key={idx}
              className="border border-slate-200/80 bg-white/70 backdrop-blur-md hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600/10 to-teal-600/20 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
