"use client";

import Link from "next/link";
import { Edit3, ExternalLink, Calendar, Layers } from "lucide-react";
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
    <div className="rounded-2xl border border-border bg-card shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden group">
      {/* Top banner */}
      <div className="h-24 bg-gradient-to-br from-ink via-indigo-deep to-indigo p-5 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between z-10">
          <Badge variant={isPublished ? "published" : "draft"} className="text-[10px]">
            {isPublished ? "Live published" : "Draft mode"}
          </Badge>
          <div className="text-[11px] font-mono font-medium text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full truncate max-w-[180px]">
            {site.subdomain}.{rootDomain}
          </div>
        </div>

        <h4 className="z-10 text-lg font-bold tracking-tight text-white truncate max-w-[240px]">
          {site.organization.name}
        </h4>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/5 blur-xl pointer-events-none" />
      </div>

      {/* Details */}
      <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-muted/70 border border-border flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary shrink-0" />
            <span className="font-semibold text-muted-foreground">
              {site.pages.length} page{site.pages.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/70 border border-border flex items-center gap-2 truncate">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground truncate">
              {isPublished && site.publishedAt
                ? new Date(site.publishedAt).toLocaleDateString()
                : "Not live yet"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-border/70 flex items-center justify-between gap-2">
          <Button size="sm" asChild className="flex-1">
            <Link href={`/sites/${site.id}/pages/${primaryPageId}`}>
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </Link>
          </Button>

          {isPublished && (
            <Button variant="outline" size="sm" asChild className="shrink-0">
              <a href={liveUrl} target="_blank" rel="noreferrer">
                View
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}