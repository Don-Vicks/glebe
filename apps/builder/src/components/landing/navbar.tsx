"use client";

import Link from "next/link";
import { Globe, ArrowRight, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-950 flex items-center justify-center text-white shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-lg leading-tight text-slate-900 dark:text-white">
              OrgSites
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 dark:text-emerald-400">
              Platform
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-emerald-700 transition-colors">
            Features
          </a>
          <a href="#templates" className="hover:text-emerald-700 transition-colors">
            Templates
          </a>
          <a href="#workflow" className="hover:text-emerald-700 transition-colors">
            How It Works
          </a>
          <a href="#architecture" className="hover:text-emerald-700 transition-colors">
            Architecture
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="hidden sm:inline-flex text-xs font-bold text-slate-700">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button variant="emerald" size="sm" asChild className="gap-1.5 shadow-md">
            <Link href="/signup">
              <span>Start building</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
