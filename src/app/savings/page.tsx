"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { savingsDetails, SavingsPathDetail } from "@/lib/mock-data";
import { TrendingDown, ShieldCheck, AlertTriangle, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { SavingsModal } from "@/components/finops/savings-modal";

export default function SavingsPage() {
  const [selectedPath, setSelectedPath] = useState<SavingsPathDetail | null>(null);
  const [initialAction, setInitialAction] = useState<string | undefined>(undefined);

  const handleOpenSimulate = (path: SavingsPathDetail, actionId: string) => {
      setInitialAction(actionId);
      setSelectedPath(path);
  };

  const handleClose = () => {
      setSelectedPath(null);
      setInitialAction(undefined);
  };

  const paths = Object.values(savingsDetails);
  
  const totalSavings = paths.reduce((acc, path) => acc + parseInt(path.potentialSavings.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Savings Scenarios</h2>
        <p className="text-zinc-400">Explore and apply cost-saving opportunities based on risk appetite.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <TrendingDown className="h-24 w-24 text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-2">Total Opportunity</p>
            <p className="text-4xl font-bold text-white mb-1">${totalSavings.toLocaleString()}<span className="text-lg text-zinc-500 font-normal">/mo</span></p>
            <div className="flex items-center gap-2 mt-4 text-emerald-400 bg-emerald-500/10 w-fit px-3 py-1 rounded-full text-xs font-medium">
                <ShieldCheck className="h-3 w-3" />
                $18,200 Safe to apply immediately
            </div>
        </GlassCard>

        <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            {paths.map((path) => (
                <GlassCard key={path.id} className={`p-5 flex flex-col justify-between border-t-4 ${
                    path.riskLevel === 'low' ? 'border-t-emerald-500' :
                    path.riskLevel === 'medium' ? 'border-t-amber-500' : 'border-t-rose-500'
                }`}>
                    <div>
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-white">{path.title}</h3>
                             <Badge variant="outline" className={`${
                                 path.riskLevel === 'low' ? 'border-emerald-500/20 text-emerald-400' :
                                 path.riskLevel === 'medium' ? 'border-amber-500/20 text-amber-400' : 'border-rose-500/20 text-rose-400'
                             }`}>
                                 {path.riskLevel.toUpperCase()} RISK
                             </Badge>
                        </div>
                        <p className="text-sm text-zinc-400 mb-4 h-10 line-clamp-2">{path.description}</p>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white mb-2">{path.potentialSavings}</div>
                        <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                            <div className={`h-full rounded-full ${
                                path.riskLevel === 'low' ? 'bg-emerald-500' :
                                path.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-rose-500'
                            }`} style={{ width: '100%' }} />
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
      </div>

      {/* Detailed Paths */}
      <div className="space-y-8">
        {paths.map((path) => (
            <section key={path.id} className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                         path.riskLevel === 'low' ? 'bg-emerald-500/10 text-emerald-400' :
                         path.riskLevel === 'medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                        {path.riskLevel === 'low' ? <ShieldCheck className="h-6 w-6" /> :
                         path.riskLevel === 'medium' ? <AlertTriangle className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">{path.title} Savings Path</h3>
                        <p className="text-sm text-zinc-400">{path.potentialSavings} • Implementation: {path.implementationTime}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {path.actions.map((action, idx) => (
                        <div key={action.id} className="group relative bg-zinc-900/40 border border-white/5 hover:border-white/10 rounded-xl p-5 transition-all hover:bg-zinc-800/40">
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Badge variant="outline" className="bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10">
                                            {action.type}
                                        </Badge>
                                        <h4 className="font-semibold text-white">{action.description}</h4>
                                    </div>
                                    <p className="text-sm text-zinc-400 pl-1">{action.simulationSteps?.[0]}...</p>
                                </div>
                                
                                <div className="flex items-center gap-6 shrink-0">
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-white">{action.impact}</div>
                                        <div className="text-xs text-zinc-500">Savings</div>
                                    </div>
                                    <div className="w-px h-8 bg-white/10 hidden md:block" />
                                    <button 
                                        onClick={() => handleOpenSimulate(path, action.id)}
                                        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-indigo-600 text-sm font-medium text-white transition-colors flex items-center gap-2 group/btn"
                                    >
                                        Simulate
                                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </section>
        ))}
      </div>

      <SavingsModal 
        savings={selectedPath} 
        onClose={handleClose} 
        initialActionId={initialAction}
      />
    </div>
  );
}
