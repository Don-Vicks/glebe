import { Layout, CreditCard, ShieldCheck, Zap, Globe2, Users2 } from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "Visual block editor",
    desc: "Drag and drop modular blocks — heroes, missions, donate CTAs, events, testimonials — without ever breaking your layout.",
  },
  {
    icon: CreditCard,
    title: "Instant donation workflows",
    desc: "Pre-integrated with Paystack, Flutterwave, Stripe, and PayPal, with automated recurring support and receipts.",
  },
  {
    icon: ShieldCheck,
    title: "Multi-tenant isolation",
    desc: "Strict row-level security and tenant sandboxing ensure organizations never leak records or credentials.",
  },
  {
    icon: Zap,
    title: "High-speed on-demand ISR",
    desc: "Next.js ISR renders blazing-fast pages and revalidates on publish — no rebuilds, no waiting on CI.",
  },
  {
    icon: Globe2,
    title: "Custom domain with auto-SSL",
    desc: "Automated DNS verification and zero-touch edge SSL provisioning for your primary brand domain.",
  },
  {
    icon: Users2,
    title: "Team & role access",
    desc: "Assign Owner, Editor, and Viewer permissions with a full audit trail for every critical site update.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-org-accent">
          Purpose-built for mission teams
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
          Everything you need to run a professional community website.
        </h2>
        <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Purpose-crafted tools for NGOs, schools, faith communities, and civic causes — no generic builder, no dev retainer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:shadow-md hover:border-primary/25 hover:-translate-y-0.5"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}