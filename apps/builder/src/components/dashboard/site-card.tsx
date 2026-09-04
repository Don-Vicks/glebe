"use client";

import Link from "next/link";
import { Globe, Edit3, ExternalLink, Calendar, Layers, ShieldCheck, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SiteCardProps {
  site: {
    id: string;
    subdomain: string;
    customDomain?: string | null;
    status: string;
    publishedAt?: Date | string | null;
    pages: Array<{ id: string; slug: string; title: string }>;
    organization: { name: string };
  };
  rootDomain: string;
}

export function SiteCard({ site, rootDomain }: SiteCardProps) {
  const isPublished = site.status === "PUBLISHED";
  const primaryPageId = site.pages[0]?.id ?? "home";
  const liveUrl = site.customDomain
    ? `https://${site.customDomain}`
    : `http://localhost:3001/?site=${encodeURIComponent(site.subdomain)}`;

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Banner / Mockup preview bar */}
      <div className="h-28 bg-gradient-to-br from-ink via-indigo-950 to-indigo-900 p-5 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between z-10">
          <Badge variant={isPublished ? "published" : "draft"} className="text-[10px] shadow-sm">
            {isPublished ? "● Live Published" : "○ Draft Mode"}
          </Badge>
          <div className="text-[11px] font-mono font-medium text-white/70 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            {site.subdomain}.{rootDomain}
          </div>
        </div>

        <div className="z-10 flex items-center justify-between">
          <h4 className="text-lg font-black tracking-tight text-white truncate max-w-[240px]">
            {site.organization.name}
          </h4>
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
      </div>

      {/* Card Details */}
      <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-700 shrink-0" />
              <span className="font-bold text-slate-700">{site.pages.length} Page{site.pages.length === 1 ? "" : "s"}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 truncate">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
              <span className="text-slate-600 truncate">
                {isPublished && site.publishedAt 
                  ? new Date(site.publishedAt).toLocaleDateString()
                  : "Not live yet"}
              </span>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <Button variant="emerald" size="sm" asChild className="w-full gap-1.5 font-bold shadow-sm">
            <Link href={`/sites/${site.id}/pages/${primaryPageId}`}>
              <Edit3 className="w-3.5 h-3.5" />
              <span>Launch Editor</span>
            </Link>
          </Button>

          {isPublished && (
            <Button variant="outline" size="sm" asChild className="gap-1 font-bold shrink-0">
              <a href={liveUrl} target="_blank" rel="noreferrer">
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
