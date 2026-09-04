"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Globe, 
  Plus, 
  Layers, 
  Sparkles, 
  Search, 
  Filter, 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  CreditCard,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LaunchChecklist } from "@/components/dashboard/launch-checklist";
import { SiteCard } from "@/components/dashboard/site-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");

  const sitesQuery = trpc.sites.mine.useQuery();
  const sites = sitesQuery.data ?? [];
  const primarySite = sites[0];
  const orgName = primarySite?.organization.name ?? "Your Organization";
  
  const publishedCount = sites.filter((item) => item.status === "PUBLISHED").length;
  const draftCount = sites.length - publishedCount;
  const totalPages = sites.reduce((acc, curr) => acc + (curr.pages?.length || 0), 0);
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "orgsites.app";

  const filteredSites = sites.filter((s) => {
    const matchesSearch = 
      s.organization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.subdomain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterStatus === "ALL" || s.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900">
      <DashboardHeader orgName={orgName} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Workspace Intro & Quick Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Multi-Tenant Workspace</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
              {orgName}
            </h1>
            <p className="text-slate-600 text-sm">
              Manage your published websites, pages, donations, and custom domains.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="emerald" asChild className="gap-2 shadow-md">
              <Link href="/onboarding">
                <Plus className="w-4 h-4" />
                <span>Create new site</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Executive Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-slate-200/80 bg-white/90 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Sites</span>
                <div className="text-3xl font-black text-slate-900 mt-1">{sites.length}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Globe className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white/90 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Sites</span>
                <div className="text-3xl font-black text-emerald-700 mt-1">{publishedCount}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white/90 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Draft Sites</span>
                <div className="text-3xl font-black text-amber-600 mt-1">{draftCount}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <Layers className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white/90 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Pages</span>
                <div className="text-3xl font-black text-slate-900 mt-1">{totalPages}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Grid: Sites on Left, Launch Checklist on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Sites Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Your Sites</h2>
                <p className="text-xs text-slate-500">Edit content or view live production sites.</p>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search sites…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-9 text-xs rounded-full bg-white"
                  />
                </div>

                <div className="flex items-center bg-slate-200/70 p-0.5 rounded-full text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setFilterStatus("ALL")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      filterStatus === "ALL" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus("PUBLISHED")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      filterStatus === "PUBLISHED" ? "bg-white text-emerald-800 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Live
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStatus("DRAFT")}
                    className={`px-3 py-1 rounded-full transition-all ${
                      filterStatus === "DRAFT" ? "bg-white text-amber-800 shadow-xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Drafts
                  </button>
                </div>
              </div>
            </div>

            {/* Query states */}
            {sitesQuery.isLoading && (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin mx-auto mb-3" />
                <span className="text-sm font-semibold">Loading your workspace sites…</span>
              </div>
            )}

            {sitesQuery.error && (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 flex items-center gap-3 text-rose-800 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Error loading sites: {sitesQuery.error.message}</span>
              </div>
            )}

            {/* Sites Grid */}
            {!sitesQuery.isLoading && !sitesQuery.error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredSites.map((site) => (
                  <SiteCard key={site.id} site={site} rootDomain={rootDomain} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!sitesQuery.isLoading && !sitesQuery.error && filteredSites.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-base font-bold text-slate-900">No sites found</h3>
                  <p className="text-xs text-slate-500">
                    {searchTerm || filterStatus !== "ALL"
                      ? "No sites matched your current search or filter criteria."
                      : "Create your first site and pick a starting template."}
                  </p>
                </div>
                <Button variant="emerald" size="sm" asChild>
                  <Link href="/onboarding">
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Create a new site</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Right Sidebar: Launch Checklist */}
          <div className="lg:col-span-4 space-y-6">
            <LaunchChecklist 
              hasOrg={Boolean(orgName)}
              hasSite={sites.length > 0}
              hasPublished={publishedCount > 0}
            />

            {/* Quick Links Card */}
            <Card className="border-slate-200/80 bg-white/90 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs font-semibold">
                <Link
                  href="/onboarding"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 hover:text-emerald-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-emerald-600" />
                    <span>Create another site</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <a
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-600" />
                    <span>View marketing site</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
