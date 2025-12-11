"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight } from "lucide-react";
import { CostIncident } from "@/lib/mock-data";

import { motion } from "framer-motion";

import Link from "next/link";

export function CostIncidentCard({ incident, onClick, layoutId, href, compact = false, minimal = false }: { incident: CostIncident; onClick?: () => void; layoutId?: string; href?: string; compact?: boolean, minimal?: boolean }) {
  const innerContent = (
      <div className={`flex items-start justify-between ${minimal ? 'p-4 border-b border-white/10 last:border-0 hover:bg-zinc-800/30 transition-colors' : ''}`}>
         <div className="flex items-center space-x-3 overflow-hidden">
            {!compact && !minimal && (
               <div className={`p-2 rounded-lg shrink-0 ${
                   incident.severity === 'high' ? 'bg-rose-500/10 text-rose-500' : 
                   incident.severity === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-fuchsia-500/10 text-fuchsia-500'
               }`}>
                  <AlertCircle className="h-5 w-5" />
               </div>
            )}
            <div className="min-w-0">
               <div className="flex items-center gap-2 mb-1 flex-wrap">
                 <h4 className={`font-semibold text-white group-hover/card:text-indigo-300 transition-colors truncate ${compact || minimal ? 'text-sm' : 'text-base'}`}>{incident.title}</h4>
                 <div className="flex items-center gap-1.5 shrink-0">
                     <Badge variant={incident.severity === 'high' ? 'destructive' : incident.severity === 'medium' ? 'warning' : 'outline'} className="text-[10px] px-1.5 py-0 h-5">
                        {incident.severity}
                     </Badge>
                     <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 border-zinc-700 text-zinc-400 ${compact || minimal ? 'bg-zinc-900/50' : ''}`}>
                        {incident.environment.charAt(0).toUpperCase() + incident.environment.slice(1)}
                     </Badge>
                 </div>
               </div>
               
               {!compact && !minimal && <p className="text-sm text-slate-400 mb-2 line-clamp-1">{incident.suspectedCause}</p>}
               
               <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span className="font-mono text-zinc-500 group-hover/card:text-indigo-400/80 transition-colors truncate max-w-[120px]">{incident.primaryServiceId}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-700 shrink-0" />
                  <span className="shrink-0">{new Date(incident.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
               </div>
            </div>
         </div>
         
         <div className={`text-right shrink-0 ml-2 ${compact || minimal ? 'flex flex-col justify-center' : ''}`}>
            <p className={`${compact || minimal ? 'text-base' : 'text-lg'} font-bold text-white group-hover/card:text-rose-400 transition-colors`}>
                +${incident.extraSpend}
            </p>
            {!compact && !minimal && <p className="text-xs text-slate-500">Extra spend</p>}
         </div>
      </div>
  );

  const CardContent = minimal ? innerContent : (
      <GlassCard variant="hover" className={`w-full ${compact ? 'py-2 px-3' : ''}`}>
         {innerContent}
      </GlassCard>
  );

  if (href) {
     return (
        <Link href={href} className="group/card cursor-pointer relative block w-full">
           {CardContent}
        </Link>
     );
  }

  return (
    <motion.div layoutId={layoutId} onClick={onClick} className="group/card cursor-pointer relative w-full">
      {CardContent}
    </motion.div>
  );
}
