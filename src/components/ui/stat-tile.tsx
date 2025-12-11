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
    <GlassCard className="relative overflow-hidden group" noPadding>
      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="p-1.5 rounded-lg bg-zinc-800/50 border border-white/5 group-hover:bg-zinc-800 transition-colors">
            <Icon className="h-4 w-4 text-indigo-400" />
          </div>
          {trend && (
            <div className={`flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
              trend === "up" 
                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }`}>
              {trend === "up" ? <ArrowUpRight className="h-2.5 w-2.5 mr-1" /> : <ArrowDownRight className="h-2.5 w-2.5 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        
        <div>
           <p className="text-xs font-medium text-zinc-400 mb-0.5">{title}</p>
           <h3 className="text-xl font-bold text-white tracking-tight mb-0.5">{value}</h3>
           <p className="text-[10px] text-zinc-500">{subtext}</p>
        </div>
      </div>
    </GlassCard>
  );
}
