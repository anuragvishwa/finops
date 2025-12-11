import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck, Zap, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { SavingsPath } from "@/lib/mock-data";

interface SavingsPathSummaryProps {
  paths: SavingsPath[];
  onPathSelect?: (pathId: string) => void;
}

import Link from "next/link";

export function SavingsPathSummary({ paths, onPathSelect }: SavingsPathSummaryProps) {
  return (
    <GlassCard className="h-full flex flex-col p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
           <h3 className="text-xl font-semibold text-white">Savings Paths</h3>
           <p className="text-xs text-zinc-500 mt-1">AI-recommended cost optimization strategies</p>
        </div>
        {/* <Badge variant="outline" className="rounded-full px-3 border-zinc-700 bg-zinc-800 text-zinc-300 font-normal hover:bg-zinc-800">
           AI Generated
        </Badge> */}
      </div>

      <div className="flex-1 space-y-4">
        {paths.map((path) => {
           let Icon = ShieldCheck;
           let color = "text-emerald-400";
           let bg = "bg-emerald-500/10";
           let iconBg = "bg-emerald-950/30";
           let description = "low risk scenarios";
           
           if (path.riskLevel === 'medium') { 
             Icon = Zap; 
             color = "text-amber-400"; 
             bg = "bg-amber-500/10";
             iconBg = "bg-amber-950/30";
             description = "medium risk scenarios";
           }
           if (path.riskLevel === 'high') { 
             Icon = AlertTriangle; 
             color = "text-rose-400"; 
             bg = "bg-rose-500/10";
             iconBg = "bg-rose-950/30";
             description = "high risk scenarios";
           }

           return (
            <motion.div
              key={path.id}
              layoutId={`path-card-${path.id}`}
              onClick={() => onPathSelect?.(path.id)}
              className="cursor-pointer group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                   <div className={`p-2.5 rounded-xl ${iconBg} ${color} shrink-0 border border-white/5`}>
                      <Icon className="h-5 w-5" />
                   </div>
                   <div className="flex flex-col">
                      <motion.h4 layoutId={`title-${path.id}`} className="text-white font-semibold text-sm">{path.name}</motion.h4>
                      <p className="text-[10px] text-zinc-500">{description}</p>
                   </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <div className="text-right">
                      <motion.div layoutId={`value-${path.id}`} className="flex flex-col items-end">
                         <span className="text-base font-bold text-white">
                           ${path.estimatedTotalSavings.toLocaleString()}
                         </span>
                         <span className="text-[10px] text-zinc-500">/mo</span>
                      </motion.div>
                   </div>
                   <ArrowRight className="h-5 w-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </div>
              </div>
            </motion.div>
           );
        })}
      </div>
      
      <Link href="/savings" className="mt-6 w-full block text-center rounded-lg bg-fuchsia-900/20 border border-fuchsia-500/20 py-3 text-base font-medium text-fuchsia-300 hover:bg-fuchsia-900/30 hover:text-fuchsia-200 transition-all">
        View All Savings Scenarios
      </Link>
    </GlassCard>
  );
}
