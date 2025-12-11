"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Calendar, Activity, Server, ShieldAlert, CheckCircle2 } from "lucide-react";
import { CostIncident } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

interface IncidentDrawerProps {
  incident: CostIncident | null;
  onClose: () => void;
}

export function IncidentDrawer({ incident, onClose }: IncidentDrawerProps) {
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-zinc-900 border-l border-white/10 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              {/* Header */}
              <div className="flex items-start justify-between">
                 <div>
                    <Badge variant={incident.severity === 'high' ? 'destructive' : incident.severity === 'medium' ? 'warning' : 'outline'} className="mb-3">
                       {incident.severity.toUpperCase()} SEVERITY
                    </Badge>
                    <h2 className="text-2xl font-bold text-white leading-tight">{incident.title}</h2>
                 </div>
                 <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <X className="h-6 w-6 text-zinc-400" />
                 </button>
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-xl bg-zinc-800/50 border border-white/5">
                    <p className="text-sm text-zinc-400 mb-1">Extra Spend</p>
                    <p className="text-2xl font-bold text-white tracking-tight text-rose-400">+${incident.extraSpend}</p>
                 </div>
                 <div className="p-4 rounded-xl bg-zinc-800/50 border border-white/5">
                    <p className="text-sm text-zinc-400 mb-1">Duration</p>
                    <p className="text-xl font-semibold text-white">42m</p>
                    <p className="text-xs text-zinc-500">Active now</p>
                 </div>
              </div>

              {/* Timeline Section */}
              <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-white flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-indigo-400" /> Timeline
                 </h3>
                 <div className="border-l-2 border-zinc-800 pl-4 space-y-6 relative">
                    <div className="relative">
                       <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-rose-500 ring-4 ring-zinc-900" />
                       <p className="text-sm font-medium text-white mb-1">Incident Detected</p>
                       <p className="text-xs text-zinc-500">{new Date(incident.startTime).toLocaleString()}</p>
                    </div>
                    <div className="relative">
                       <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-zinc-700 ring-4 ring-zinc-900" />
                       <p className="text-sm font-medium text-zinc-400 mb-1">Automated Analysis</p>
                       <p className="text-xs text-zinc-500">Identified root cause: {incident.suspectedCause}</p>
                    </div>
                 </div>
              </div>

              {/* Impact Analysis */}
              <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-white flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-indigo-400" /> Impact Analysis
                 </h3>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30 border border-white/5">
                       <div className="flex items-center">
                          <Server className="h-4 w-4 text-zinc-400 mr-3" />
                          <span className="text-sm text-zinc-300">Affected Service</span>
                       </div>
                       <span className="text-sm font-mono text-zinc-400">{incident.primaryServiceId}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/30 border border-white/5">
                       <div className="flex items-center">
                          <ShieldAlert className="h-4 w-4 text-zinc-400 mr-3" />
                          <span className="text-sm text-zinc-300">SLO Impact</span>
                       </div>
                       <span className="text-sm text-zinc-400">{incident.sloImpactSummary}</span>
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                 <button className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all">
                    Investigate in Datadog
                 </button>
                 <button className="w-full py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-all flex items-center justify-center">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Resolved
                 </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
