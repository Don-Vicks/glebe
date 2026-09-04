import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNavbar } from "@/components/landing/navbar";
import { HeroPreviewTabs } from "@/components/landing/hero-preview-tabs";
import { FeaturesSection } from "@/components/landing/features-section";
import { TemplateGallery } from "@/components/landing/template-gallery";
import { LandingFooter } from "@/components/landing/footer";

const proof = ["Free to start", "Paystack & Stripe ready", "Custom domains"];

const steps = [
  {
    number: "01",
    title: "Create your workspace",
    desc: "Sign up in seconds, pick your organization type (NGO, school, faith, foundation), and get a starter homepage seeded for you.",
  },
  {
    number: "02",
    title: "Customize in the visual editor",
    desc: "Add content with the block editor, upload your branding and logo, and set up donation amounts and payment gateways.",
  },
  {
    number: "03",
    title: "Publish & connect your domain",
    desc: "Hit publish to render high-speed ISR pages, connect your custom domain, and start receiving contributions immediately.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20 selection:text-foreground">
      <LandingNavbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-border/60">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(67,56,202,0.10),transparent_60%)] pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
              <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
                <div className="space-y-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-org-accent">
                    For nonprofits · Schools · Faith communities · Civic groups
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-foreground leading-[1.08]">
                    Build the online home your organization deserves.
                  </h1>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    OrgSites gives mission-driven teams a focused way to tell
                    their story, accept donations, and keep publishing — with
                    your own domain, your own brand, and no code.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <Button size="lg" asChild className="px-7">
                    <Link href="/signup">
                      Create your workspace
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="px-6">
                    <a href="#templates">Explore templates</a>
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  {proof.map((item, i) => (
                    <span key={item} className="flex items-center gap-2">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-border" />}
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 w-full">
                <HeroPreviewTabs />
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />

        {/* WORKFLOW */}
        <section id="workflow" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border/60">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-org-accent">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              From idea to live donation-ready site in minutes.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Three deliberate steps take you from signup to a published site
              with donations flowing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-border bg-card p-8 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold tracking-tight">
                    {step.number}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <TemplateGallery />

        {/* CTA */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-deep via-indigo to-ink px-8 py-14 sm:px-14 sm:py-16 text-white">
            <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="relative max-w-2xl space-y-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-amber-soft">
                Ready when you are
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Build your organization&rsquo;s site today.
              </h2>
              <p className="text-sm sm:text-base text-white/75 max-w-lg leading-relaxed">
                Join nonprofits and community teams using OrgSites to grow
                support and tell their story. Free to start, live in minutes.
              </p>
              <div className="pt-2">
                <Button variant="accent" size="lg" asChild className="px-8">
                  <Link href="/signup">
                    Get started free
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}