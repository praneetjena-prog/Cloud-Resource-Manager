import * as React from "react";
import { cn } from "../lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variants: Record<string, string> = {
    default: "bg-violet-500/15 text-violet-300 border-violet-500/20",
    success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    danger: "bg-red-500/15 text-red-300 border-red-500/20",
    info: "bg-sky-500/15 text-sky-300 border-sky-500/20",
    outline: "bg-transparent text-white/60 border-white/10",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
