"use client";

import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface LaunchChecklistProps {
  hasOrg: boolean;
  hasSite: boolean;
  hasPublished: boolean;
}

export function LaunchChecklist({ hasOrg, hasSite, hasPublished }: LaunchChecklistProps) {
  const steps = [
    {
      id: "org",
      label: "Organization profile",
      desc: "Workspace created",
      done: hasOrg,
      href: "/dashboard",
    },
    {
      id: "site",
      label: "Create a site",
      desc: "Starter template and block structure added",
      done: hasSite,
      href: "/onboarding",
    },
    {
      id: "payments",
      label: "Configure donations",
      desc: "Connect Paystack or Stripe credentials",
      done: false,
      href: "#",
    },
    {
      id: "publish",
      label: "Publish to the web",
      desc: "Site live on the public edge",
      done: hasPublished,
      href: "#sites",
    },
  ];

  const completedCount = steps.filter((s) => s.done).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-org-accent">
            Getting started
          </p>
          <CardTitle className="text-lg font-bold tracking-tight">
            Launch readiness
          </CardTitle>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-semibold text-muted-foreground">
            {completedCount} of {steps.length} complete
          </span>
          <span className="text-xs font-bold text-foreground">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </CardHeader>

      <CardContent className="space-y-2">
        {steps.map((step) => {
          const Icon = step.done ? CheckCircle2 : Circle;
          return (
            <div
              key={step.id}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors duration-150 ${
                step.done
                  ? "bg-muted/40 border-border/80"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon
                  className={`w-5 h-5 shrink-0 ${step.done ? "text-emerald-600" : "text-border"}`}
                />
                <div className="min-w-0">
                  <div
                    className={`text-sm font-semibold truncate ${
                      step.done ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{step.desc}</div>
                </div>
              </div>

              {!step.done && (
                <Link
                  href={step.href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 px-2.5 py-1 rounded-lg hover:bg-primary/5 shrink-0 transition-colors duration-150"
                >
                  <span>Start</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}