import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
           "bg-slate-800 text-slate-100": variant === "default",
           "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20": variant === "success",
           "bg-amber-500/15 text-amber-400 border border-amber-500/20": variant === "warning",
           "bg-red-500/15 text-red-400 border border-red-500/20": variant === "destructive",
           "border border-slate-700 text-slate-400": variant === "outline"
        },
        className
      )}
    >
      {children}
    </span>
  );
}
