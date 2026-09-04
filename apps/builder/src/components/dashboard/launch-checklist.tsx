"use client";

import { CheckCircle2, Circle, ArrowRight, Sparkles, Layout, CreditCard, Globe } from "lucide-react";
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
      label: "Organization Workspace Profile",
      desc: "Profile & team permissions configured",
      done: hasOrg,
      icon: Sparkles,
      href: "/dashboard",
    },
    {
      id: "site",
      label: "Create First Site Blueprint",
      desc: "Starter templates and block structure",
      done: hasSite,
      icon: Layout,
      href: "/onboarding",
    },
    {
      id: "payments",
      label: "Configure Donation Gateway",
      desc: "Connect Paystack or Stripe credentials",
      done: false,
      icon: CreditCard,
      href: "#",
    },
    {
      id: "publish",
      label: "Publish to Public Web",
      desc: "Deploy on-demand ISR edge pages",
      done: hasPublished,
      icon: Globe,
      href: "#sites",
    },
  ];

  const completedCount = steps.filter((s) => s.done).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <Card className="border border-slate-200/80 bg-white/90 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700">
              Getting Started
            </span>
            <CardTitle className="text-xl font-bold">Launch Readiness</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-slate-700">
              {progressPercent}% Complete
            </span>
          </div>
        </div>
        <Progress value={progressPercent} className="mt-3 h-2" />
      </CardHeader>

      <CardContent className="pt-2 space-y-2">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                step.done
                  ? "bg-slate-50/60 border-slate-200/60 text-slate-600"
                  : "bg-white border-slate-200 hover:border-indigo-500/40 text-slate-900 shadow-xs"
              }`}
            >
              <div className="flex items-center gap-3">
                {step.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <div>
                  <div className={`text-sm font-bold ${step.done ? "line-through text-slate-500" : "text-slate-900"}`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-slate-500">{step.desc}</div>
                </div>
              </div>

              {!step.done && (
                <Link
                  href={step.href}
                  className="text-xs font-extrabold text-indigo-700 hover:text-indigo-800 flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg hover:bg-indigo-50"
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
