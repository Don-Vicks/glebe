"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Plus,
  FileText,
  Search,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { LaunchChecklist } from "@/components/dashboard/launch-checklist";
import { SiteCard } from "@/components/dashboard/site-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const metrics = [
    { label: "Total sites", value: sites.length, icon: Globe, valueClass: "" },
    { label: "Live sites", value: publishedCount, icon: Globe, valueClass: "text-emerald-600", tileClass: "bg-emerald-500/10 text-emerald-700" },
    { label: "Draft sites", value: draftCount, icon: Globe, valueClass: "", tileClass: "bg-amber-500/10 text-amber-700" },
    { label: "Total pages", value: totalPages, icon: FileText, valueClass: "" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20 selection:text-foreground">
      <DashboardHeader orgName={orgName} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Workspace intro */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-org-accent">
              Workspace overview
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {orgName}
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your sites, pages, donations, and custom domains.
            </p>
          </div>

          <Button asChild>
            <Link href="/onboarding">
              <Plus className="w-4 h-4" />
              Create new site
            </Link>
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-shadow duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {metric.label}
                    </div>
                    <div className={`text-3xl font-bold tracking-tight mt-1 ${metric.valueClass ?? "text-foreground"}`}>
                      {metric.value}
                    </div>
                  </div>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${metric.tileClass ?? "bg-muted text-muted-foreground"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sites */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">Your sites</h2>
                <p className="text-xs text-muted-foreground">Edit content or view live sites.</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search sites…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-9 rounded-full bg-card"
                  />
                </div>

                <div className="flex items-center bg-muted p-0.5 rounded-full text-xs font-semibold">
                  {(
                    [
                      { key: "ALL", label: "All" },
                      { key: "PUBLISHED", label: "Live" },
                      { key: "DRAFT", label: "Drafts" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setFilterStatus(option.key)}
                      className={`px-3 py-1 rounded-full transition-colors duration-150 ${
                        filterStatus === option.key
                          ? "bg-card text-foreground shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Query states */}
            {sitesQuery.isLoading && (
              <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
                <span className="text-sm font-medium">Loading your sites…</span>
              </div>
            )}

            {sitesQuery.error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 flex items-center gap-3 text-rose-800 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Error loading sites: {sitesQuery.error.message}</span>
              </div>
            )}

            {/* Site grid */}
            {!sitesQuery.isLoading && !sitesQuery.error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredSites.map((site) => (
                  <SiteCard key={site.id} site={site} rootDomain={rootDomain} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!sitesQuery.isLoading && !sitesQuery.error && filteredSites.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-base font-bold text-foreground">No sites found</h3>
                  <p className="text-xs text-muted-foreground">
                    {searchTerm || filterStatus !== "ALL"
                      ? "No sites matched your current search or filter criteria."
                      : "Create your first site and pick a starting template."}
                  </p>
                </div>
                <Button size="sm" asChild>
                  <Link href="/onboarding">
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Create a new site
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Checklist + quick actions */}
          <div className="lg:col-span-4 space-y-6">
            <LaunchChecklist
              hasOrg={Boolean(orgName)}
              hasSite={sites.length > 0}
              hasPublished={publishedCount > 0}
            />

            <Card className="shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold tracking-tight">
                  Quick actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs font-semibold">
                <Link
                  href="/onboarding"
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/70 hover:bg-muted transition-colors duration-150"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <Plus className="w-4 h-4 text-primary" />
                    <span>Create another site</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <a
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/70 hover:bg-muted transition-colors duration-150"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span>View marketing site</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}