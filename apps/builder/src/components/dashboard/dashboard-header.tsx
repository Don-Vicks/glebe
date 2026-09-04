"use client";

import Link from "next/link";
import { Globe, Plus, LogOut, LayoutGrid, Search, ExternalLink, ShieldCheck, ChevronDown, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/app/logout-button";

export function DashboardHeader({ orgName }: { orgName: string }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Workspace selector */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-700 to-slate-900 flex items-center justify-center text-white shadow-md">
              <Globe className="w-5 h-5 text-emerald-300" />
            </div>
          </Link>

          <div className="h-6 w-px bg-border/80 hidden sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-muted text-left transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Workspace
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 max-w-[160px] sm:max-w-[220px] truncate">
                    {orgName}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Current Workspace</DropdownMenuLabel>
              <DropdownMenuItem className="font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4 mr-2" />
                <span>{orgName}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/onboarding">
                  <Plus className="w-4 h-4 mr-2" />
                  <span>Create New Site</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex text-xs font-bold">
            <Link href="/" target="_blank">
              <span>View Marketing</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>

          <Button variant="emerald" size="sm" asChild className="gap-1.5 shadow-md">
            <Link href="/onboarding">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create site</span>
              <span className="sm:hidden">New</span>
            </Link>
          </Button>

          <div className="h-6 w-px bg-border/80 hidden sm:block" />

          {/* User / Sign out dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs transition-colors"
                aria-label="User menu"
              >
                <User className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  <span>Dashboard Overview</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="p-1">
                <LogoutButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
