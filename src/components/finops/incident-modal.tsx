"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Activity, Server, ShieldAlert, CheckCircle2 } from "lucide-react";
import { CostIncident, services, teams } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";

interface IncidentModalProps {
  incident: CostIncident | null;
  onClose: () => void;
  layoutId?: string;
}

export function IncidentModal({ incident, onClose, layoutId }: IncidentModalProps) {
  return (
    <AnimatePresence>
      {incident && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container - Centered */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            
            {/* The Magic Card */}
            <motion.div
              layoutId={layoutId}
              className="w-full max-w-2xl pointer-events-auto"
            >
              <GlassCard 
                 className="overflow-hidden shadow-2xl bg-zinc-900/90 border-white/10" 
                 noPadding
                 initial={{ opacity: 1, y: 0 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0 }}
              >
                
                {/* Header Content */}
                <div className="p-6 border-b border-white/5 relative">
                  <div className="flex items-start justify-between">
                     <div>
                        <Badge variant={incident.severity === 'high' ? 'destructive' : incident.severity === 'medium' ? 'warning' : 'outline'} className="mb-3">
                           {incident.severity.toUpperCase()} SEVERITY
                        </Badge>
                        <motion.h2 layoutId={`title-${incident.id}`} className="text-2xl font-bold text-white leading-tight mb-1">
                          {incident.title}
                        </motion.h2>
                        <p className="text-zinc-400 text-sm">Incident ID: {incident.id}</p>
                     </div>
                     <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <X className="h-5 w-5 text-zinc-400" />
                     </button>
                  </div>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-8">
                  
                  {/* Stats Row */}
                  {/* Service & Team Context */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     {/* Cost Stat */}
                     <div className="p-4 rounded-xl bg-zinc-800/50 border border-white/5 flex flex-col justify-center">
                        <p className="text-sm text-zinc-400 mb-1">Extra Spend</p>
                        <p className="text-3xl font-bold text-white tracking-tight text-rose-400">+${incident.extraSpend}</p>
                     </div>

                     {/* Service Info */}
                     {(() => {
                        const service = services.find(s => s.id === incident.primaryServiceId);
                        const team = service ? teams.find(t => t.id === service.teamId) : null;
                        
                        return (
                           <>
                             <div className="md:col-span-2 p-4 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-between">
                                <div>
                                   <div className="flex items-center space-x-2 mb-2">
                                      <Server className="h-4 w-4 text-indigo-400" />
                                      <span className="text-sm font-semibold text-white">{service?.name || incident.primaryServiceId}</span>
                                      {service && (
                                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                            service.tier === 'tier-1' ? 'bg-rose-500/20 text-rose-300' : 'bg-zinc-700 text-zinc-400'
                                         }`}>
                                            {service.tier.replace('-', ' ')}
                                         </span>
                                      )}
                                   </div>
                                   <div className="flex items-center space-x-4">
                                      {team && (
                                         <div className="flex items-center space-x-2">
                                            <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${team.avatarColor}`}>
                                               {team.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                               <p className="text-xs text-zinc-400">Owner</p>
                                               <p className="text-xs font-medium text-white">{team.name}</p>
                                            </div>
                                         </div>
                                      )}
                                      {team && (
                                         <div className="hidden sm:block">
                                            <p className="text-xs text-zinc-400">Tech Lead</p>
                                            <p className="text-xs font-medium text-white">{team.techLead}</p>
                                         </div>
                                      )}
                                   </div>
                                </div>
                                {team && (
                                   <button className="px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 text-xs font-medium transition-colors">
                                      {team.slackChannel}
                                   </button>
                                )}
                             </div>
                           </>
                        );
                     })()}
                  </div>

                  {/* Timeline & Analysis wrapper */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {/* Timeline */}
                     <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center">
                           <Calendar className="mr-2 h-4 w-4 text-indigo-400" /> Event Timeline
                        </h3>
                        <div className="border-l-2 border-zinc-800 pl-4 space-y-6 relative ml-1">
                           <div className="relative">
                              <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-rose-500 ring-4 ring-zinc-900" />
                              <p className="text-sm font-medium text-white mb-1">Detected</p>
                              <p className="text-xs text-zinc-500">{new Date(incident.startTime).toLocaleString()}</p>
                           </div>
                           <div className="relative">
                              <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-zinc-700 ring-4 ring-zinc-900" />
                              <p className="text-sm font-medium text-zinc-400 mb-1">Analysis</p>
                              <p className="text-xs text-zinc-500 leading-relaxed">{incident.suspectedCause}</p>
                           </div>
                        </div>
                     </div>

                     {/* Logic / Actions */}
                     <div className="space-y-6">
                        <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center">
                           <Activity className="mr-2 h-4 w-4 text-emerald-400" /> Recommended Actions
                        </h3>
                        
                        <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                           <p className="text-sm text-indigo-200 mb-3">AI Suggestion</p>
                           <p className="text-white text-sm font-medium">Revert deployment <code className="bg-black/30 px-1 rounded">v2.4.1</code> or increase memory request to 2Gi.</p>
                           <button className="mt-4 w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wide transition-all">
                              Apply Fix
                           </button>
                        </div>
                        
                        <div className="pt-2">
                            <h4 className="text-xs font-medium text-zinc-500 mb-2">Manual Actions</h4>
                            <div className="space-y-2">
                               <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-sm text-zinc-300 transition-colors flex items-center">
                                  <ShieldAlert className="h-4 w-4 mr-2" /> View Audit Logs
                               </button>
                               <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-sm text-zinc-300 transition-colors flex items-center">
                                  <CheckCircle2 className="h-4 w-4 mr-2" /> Mark as False Positive
                               </button>
                            </div>
                        </div>
                     </div>
                  </div>

                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
