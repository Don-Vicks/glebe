import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        published:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 font-bold dark:text-emerald-300",
        draft:
          "border-amber-500/20 bg-amber-500/10 text-amber-800 font-bold dark:text-amber-300",
        emerald:
          "border-transparent bg-indigo-700 text-white font-bold",
        gold:
          "border-amber-500/30 bg-amber-100 text-amber-900 font-bold",
        primary:
          "border-indigo-500/20 bg-indigo-500/10 text-indigo-800 font-bold dark:text-indigo-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
