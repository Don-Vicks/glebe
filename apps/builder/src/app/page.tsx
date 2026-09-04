import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles, Shield, Zap, Globe, Heart, ArrowUpRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LandingNavbar } from "@/components/landing/navbar";
import { HeroPreviewTabs } from "@/components/landing/hero-preview-tabs";
import { FeaturesSection } from "@/components/landing/features-section";
import { TemplateGallery } from "@/components/landing/template-gallery";
import { LandingFooter } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      <LandingNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-border/40">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Hero copy */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Next-Gen Website Engine</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                  Launch high-impact websites for your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900">
                    mission & community
                  </span>
                  .
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Build, customize, and publish multi-tenant websites for NGOs, faith organizations, schools, and civic causes with drag-and-drop ease, built-in donations, and custom domains.
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                  <Button variant="emerald" size="lg" asChild className="gap-2 text-base px-8 shadow-xl">
                    <Link href="/signup">
                      <span>Create your workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="text-base px-6">
                    <a href="#templates">
                      <span>Explore templates</span>
                    </a>
                  </Button>
                </div>

                {/* Social proof highlights */}
                <div className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs font-bold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    No code required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Paystack & Stripe ready
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    Custom domain auto-SSL
                  </span>
                </div>
              </div>

              {/* Right Hero interactive preview */}
              <div className="lg:col-span-6 w-full">
                <HeroPreviewTabs />
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROPS / FEATURES SECTION */}
        <FeaturesSection />

        {/* WORKFLOW PIPELINE SECTION */}
        <section id="workflow" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-wider">
              <span>3 Simple Steps</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              From idea to live donation-ready site in minutes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-lg relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">Create & Choose Template</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sign up in seconds, pick your organization archetype (NGO, School, Faith, Foundation), and auto-seed a starter homepage.
              </p>
            </div>

            <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-lg relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-700 text-white font-black flex items-center justify-center text-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">Customize in Visual Editor</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add content with the Puck block editor, upload branding colors and logos, and set up donation amounts and payment gateways.
              </p>
            </div>

            <div className="rounded-3xl p-8 bg-white border border-slate-200 shadow-lg relative space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-white font-black flex items-center justify-center text-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">Publish & Connect Domain</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hit publish to render high-speed ISR pages, connect your custom apex domain, and start receiving contributions immediately.
              </p>
            </div>
          </div>
        </section>

        {/* TEMPLATES SHOWCASE */}
        <TemplateGallery />

        {/* CONVERSION CALL TO ACTION BANNER */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-950 p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left z-10">
              <span className="text-xs font-black uppercase tracking-widest text-amber-300">
                Ready to transform your online presence?
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Build your organization’s site today.
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Join hundreds of forward-thinking nonprofits and communities using OrgSites to grow support and tell their story.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full md:w-auto">
              <Button variant="gold" size="lg" asChild className="w-full sm:w-auto text-base px-8">
                <Link href="/signup">
                  <span>Get started free</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
            <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
