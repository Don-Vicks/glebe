"use client";

import Link from "next/link";
import { Globe, Heart, Shield, Code2 } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white">OrgSites</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The modern website creation & donation platform engineered specifically for civic organizations, non-profits, faith communities, and schools.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Visual Block Editor</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Pre-built Archetypes</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Donation Processing</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Custom Domains</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Architecture</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-slate-300">Next.js 14 App Router</span></li>
              <li><span className="text-slate-300">NestJS Modular API</span></li>
              <li><span className="text-slate-300">Prisma Multi-Tenant Postgres</span></li>
              <li><span className="text-slate-300">BullMQ Background Workers</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Get Started</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-bold">Create Free Account →</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Sign in to Workspace</Link></li>
              <li><a href="https://github.com/Don-Vicks/glebe" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Documentation & Spec</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} OrgSites Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
