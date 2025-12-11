"use client";

import { StatTile } from "@/components/ui/stat-tile";
import Link from "next/link";
import { CostTimeSeriesChart } from "@/components/charts/cost-chart";
import { CostIncidentCard } from "@/components/finops/cost-incident-card";
import { GlassCard } from "@/components/ui/glass-card";
import { SavingsPathSummary } from "@/components/finops/savings-paths-summary";
import { costIncidents, savingsPaths, statDetails, savingsDetails } from "@/lib/mock-data";
import { DollarSign, Activity, AlertOctagon, TrendingDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { StatModal } from "@/components/finops/stat-modal";
import { SavingsModal } from "@/components/finops/savings-modal";
import { DeepDiveModal } from "@/components/finops/deep-dive-modal";
import { CostDetailsModal } from "@/components/finops/cost-details-modal";
import { ServiceDetailModal } from "@/components/finops/service-detail-modal";
import { services } from "@/lib/mock-data";

export default function Home() {
  const [selectedStatId, setSelectedStatId] = useState<string | null>(null);
  const selectedStat = selectedStatId ? statDetails[selectedStatId] : null;

  const [selectedSavingsId, setSelectedSavingsId] = useState<string | null>(null);
  const selectedSavings = selectedSavingsId ? savingsDetails[selectedSavingsId] : null;

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const selectedService = selectedServiceId ? services.find(s => s.id === selectedServiceId) || null : null;

  const [showDeepDive, setShowDeepDive] = useState(false);
  const [showCostDetails, setShowCostDetails] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      <StatModal 
        stat={selectedStat} 
        isOpen={!!selectedStatId}
        onClose={() => setSelectedStatId(null)}
        layoutId={selectedStatId ? `stat-${selectedStatId}` : undefined}
      />

      <SavingsModal 
        savings={selectedSavings} 
        onClose={() => setSelectedSavingsId(null)}
        layoutId={selectedSavingsId ? `savings-card-${selectedSavingsId}` : undefined}
      />
      
      <DeepDiveModal 
        isOpen={showDeepDive}
        onClose={() => setShowDeepDive(false)}
      />

      <CostDetailsModal 
        isOpen={showCostDetails}
        onClose={() => setShowCostDetails(false)}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedServiceId(null)}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Overview</h2>
            <p className="text-zinc-400">Welcome back, here's what's happening in your infrastructure today.</p>
         </div>

         <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               <span className="text-xs text-zinc-300">System Healthy</span>
            </div>

            <div className="flex items-center border border-white/10 rounded-lg bg-black/20 p-1">
               <button className="px-3 py-1 text-xs font-medium text-white bg-zinc-800 rounded-md shadow-sm">Prod</button>
               <button className="px-2 py-1 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors">Staging</button>
            </div>

            <Link href="/reports" className="whitespace-nowrap shrink-0 px-4 py-2 rounded-lg bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-colors">
              Export Report
            </Link>
            <button 
              onClick={() => setShowDeepDive(true)}
              className="whitespace-nowrap shrink-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="h-3 w-3 text-indigo-200" />
              Start Deep Dive
            </button>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(statDetails).map((stat) => {
          const icons = {
             "total-cloud-spend": DollarSign,
             "k8s-ai-spend": Activity,
             "active-incidents": AlertOctagon,
             "potential-savings": TrendingDown
          };
          const Icon = icons[stat.id as keyof typeof icons] || Activity;
          
          return (
            <StatTile 
               key={stat.id} 
               {...stat} 
               icon={Icon}
               onClick={() => setSelectedStatId(stat.id)} 
            />
          );
        })}
      </div>

      {/* Charts & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
            <CostTimeSeriesChart onClick={() => setShowCostDetails(true)} />
         </div>
         <div className="lg:col-span-1">
            <SavingsPathSummary 
               paths={savingsPaths} 
               onPathSelect={(id) => setSelectedSavingsId(id)}
            />
         </div>
      </div>

      {/* Recent Incidents and Savings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="space-y-4">
            <GlassCard className="h-full flex flex-col" noPadding>
               <div className="p-6 border-b border-white/5 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                       <AlertOctagon className="h-5 w-5 text-rose-400" />
                       Recent Cost Incidents
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 ml-7">Overview of recent anomalies</p>
                  </div>
                  <Link href="/incidents" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors mt-1">View All</Link>
               </div>
               <div className="flex-1">
                  {costIncidents.slice(0, 3).map((incident) => (
                     <CostIncidentCard 
                        key={incident.id} 
                        incident={incident} 
                        minimal 
                        href={`/incidents?open=${incident.id}`}
                     />
                  ))}
               </div>
            </GlassCard>
         </div>

         <div className="space-y-6">

            
            <GlassCard className="p-6 text-center border-dashed border-zinc-700 bg-transparent">
                <div className="flex justify-center mb-3">
                   <div className="h-12 w-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-indigo-400" />
                   </div>
                </div>
                <h4 className="text-white font-medium mb-2">What-if Simulator</h4>
                <p className="text-zinc-400 text-sm mb-4">
                  Simulate changes to your infrastructure to verify cost savings before applying them.
                </p>
                <Link href="/what-if" className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-800 border border-white/10 text-xs font-medium text-white hover:bg-zinc-700 transition-colors">
                   Launch Simulator
                </Link>
             </GlassCard>
         </div>
      </div>
    </div>
  );
}
