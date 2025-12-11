"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowRight } from "lucide-react";
import { CostIncident } from "@/lib/mock-data";

import { motion } from "framer-motion";

export function CostIncidentCard({ incident, onClick, layoutId }: { incident: CostIncident; onClick?: () => void; layoutId?: string }) {
  return (
    <motion.div layoutId={layoutId} onClick={onClick} className="group cursor-pointer relative h-full">
      <GlassCard variant="hover" className="h-full">
      <div className="flex items-start justify-between">
         <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${
                incident.severity === 'high' ? 'bg-rose-500/10 text-rose-500' : 
                incident.severity === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-fuchsia-500/10 text-fuchsia-500'
            }`}>
               <AlertCircle className="h-5 w-5" />
            </div>
            <div>
               <div className="flex items-center space-x-2 mb-1">
                 <h4 className="text-base font-semibold text-white group-hover:text-fuchsia-400 transition-colors">{incident.title}</h4>
                 <Badge variant={incident.severity === 'high' ? 'destructive' : incident.severity === 'medium' ? 'warning' : 'outline'}>
                    {incident.severity}
                 </Badge>
               </div>
               <p className="text-sm text-slate-400 mb-2">{incident.suspectedCause}</p>
               <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span>{incident.primaryServiceId}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span>{new Date(incident.startTime).toLocaleTimeString()}</span>
               </div>
            </div>
         </div>
         
         <div className="text-right">
            <p className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                +${incident.extraSpend}
            </p>
            <p className="text-xs text-slate-500">Extra spend</p>
         </div>
      </div>
      </GlassCard>
    </motion.div>
  );
}
