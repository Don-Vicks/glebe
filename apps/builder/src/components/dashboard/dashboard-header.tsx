"use client";

import Link from "next/link";
import { Globe, Plus, LogOut, LayoutGrid, Building2, ChevronDown, User } from "lucide-react";
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
        {/* Left: Brand + workspace */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-teal-soft to-teal-deep flex items-center justify-center text-white shadow-md shadow-primary/25">
              <Globe className="w-4 h-4" />
            </div>
            <span className="hidden sm:block font-bold tracking-tight text-[17px] text-foreground">
              OrgSites
            </span>
          </Link>

          <div className="h-6 w-px bg-border hidden sm:block" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-muted text-left transition-colors duration-150"
              >
                <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-semibold text-foreground max-w-[140px] sm:max-w-[220px] truncate">
                  {orgName}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60">
              <DropdownMenuLabel>Workspace</DropdownMenuLabel>
              <DropdownMenuItem className="font-semibold text-primary">
                <Building2 className="w-4 h-4 mr-2" />
                <span>{orgName}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/onboarding">
                  <Plus className="w-4 h-4 mr-2" />
                  <span>Create new site</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <Button size="sm" asChild>
            <Link href="/onboarding">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create site</span>
              <span className="sm:hidden">New</span>
            </Link>
          </Button>

          <div className="h-6 w-px bg-border hidden sm:block" />

          {/* User / Sign out dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-muted hover:bg-muted-foreground/15 border border-border flex items-center justify-center text-muted-foreground transition-colors duration-150"
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
                  <span>Dashboard overview</span>
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