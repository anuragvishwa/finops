import { GlassCard } from "@/components/ui/glass-card";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatTileProps {
  title: string;
  value: string;
  subtext: string;
  trend?: "up" | "down";
  trendValue?: string;
  icon: LucideIcon;
}

export function StatTile({ title, value, subtext, trend, trendValue, icon: Icon }: StatTileProps) {
  return (
    <GlassCard className="relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-zinc-800/50 border border-white/5 group-hover:bg-zinc-800 transition-colors">
            <Icon className="h-5 w-5 text-indigo-400" />
          </div>
          {trend && (
            <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
              trend === "up" 
                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }`}>
              {trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        
        <div>
           <p className="text-sm font-medium text-zinc-400 mb-1">{title}</p>
           <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{value}</h3>
           <p className="text-xs text-zinc-500">{subtext}</p>
        </div>
      </div>
    </GlassCard>
  );
}
