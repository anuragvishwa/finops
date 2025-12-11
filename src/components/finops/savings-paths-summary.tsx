import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck, Zap, AlertTriangle } from "lucide-react";
import { SavingsPath } from "@/lib/mock-data";

export function SavingsPathSummary({ paths }: { paths: SavingsPath[] }) {
  return (
    <GlassCard className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Savings Paths</h3>
        <Badge variant="outline">AI Generated</Badge>
      </div>

      <div className="space-y-4">
        {paths.map((path) => {
           let Icon = ShieldCheck;
           let color = "text-emerald-400";
           let bg = "bg-emerald-500/10";
           
           if (path.riskLevel === 'medium') { Icon = Zap; color = "text-amber-400"; bg = "bg-amber-500/10"; }
           if (path.riskLevel === 'high') { Icon = AlertTriangle; color = "text-rose-400"; bg = "bg-rose-500/10"; }

           return (
             <div key={path.id} className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3 hover:bg-white/10 hover:border-fuchsia-500/20 transition-all cursor-pointer">
                <div className="flex items-center space-x-3">
                   <div className={`p-2 rounded-lg ${bg} ${color}`}>
                      <Icon className="h-5 w-5" />
                   </div>
                   <div>
                      <h4 className="font-medium text-white">{path.name}</h4>
                      <p className="text-xs text-slate-400">{path.riskLevel} risk scenarios</p>
                   </div>
                </div>
                
                <div className="flex items-center space-x-3">
                   <div className="text-right">
                      <p className="font-bold text-white text-emerald-400 shadow-emerald-500/20 drop-shadow-sm">
                         ${path.estimatedTotalSavings.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-500">/mo</p>
                   </div>
                   <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
             </div>
           );
        })}
      </div>
      
      <button className="mt-6 w-full rounded-lg bg-fuchsia-600/20 border border-fuchsia-500/30 py-2 text-sm font-medium text-fuchsia-400 hover:bg-fuchsia-600/30 transition-colors">
        View All Savings Scenarios
      </button>
    </GlassCard>
  );
}
