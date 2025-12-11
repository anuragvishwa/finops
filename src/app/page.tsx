"use client";

import { StatTile } from "@/components/ui/stat-tile";
import { CostTimeSeriesChart } from "@/components/charts/cost-chart";
import { CostIncidentCard } from "@/components/finops/cost-incident-card";
import { GlassCard } from "@/components/ui/glass-card";
import { SavingsPathSummary } from "@/components/finops/savings-paths-summary";
import { costIncidents, savingsPaths, statDetails } from "@/lib/mock-data";
import { DollarSign, Activity, AlertOctagon, TrendingDown } from "lucide-react";
import { useState } from "react";
import { StatModal } from "@/components/finops/stat-modal";

export default function Home() {
  const [selectedStatId, setSelectedStatId] = useState<string | null>(null);
  const selectedStat = selectedStatId ? statDetails[selectedStatId] : null;

  return (
    <div className="space-y-6 pb-6 pt-0">
      <StatModal 
        stat={selectedStat} 
        onClose={() => setSelectedStatId(null)}
        layoutId={selectedStatId ? `stat-${selectedStatId}` : undefined}
      />

      {/* Header */}
      {/* Header Actions - Pulled up */}
      {/* Header Actions - Pulled up */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
         <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Overview</h2>
            <p className="text-sm text-zinc-400">Your cloud spend health and reliability risks.</p>
         </div>
         <div className="flex items-center gap-3">
            {/* Range & Env Controls */}
            <div className="flex items-center bg-zinc-900/50 rounded-lg p-1 border border-white/10 mr-2">
               <button className="px-3 py-1.5 text-xs font-medium text-white bg-zinc-700/80 rounded shadow-sm hover:bg-zinc-700 transition-colors">Last 30 Days</button>
               <button className="px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors">Last 6 Months</button>
               <div className="w-px h-4 bg-white/10 mx-1"></div>
               <span className="text-[10px] text-zinc-500 px-2 uppercase tracking-wider font-semibold">Env:</span>
               <button className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded mr-1 hover:bg-emerald-500/20 transition-colors">Prod</button>
               <button className="px-2 py-1 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors">Staging</button>
            </div>

            <button className="whitespace-nowrap shrink-0 px-4 py-2 rounded-lg bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-300 hover:bg-zinc-700/50 hover:text-white transition-colors">
              Export Report
            </button>
            <button className="whitespace-nowrap shrink-0 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white shadow-md shadow-indigo-500/20 transition-all">
              Start Deep Dive
            </button>
         </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile 
           id="total-cloud-spend"
           title="Total Cloud Spend" 
           value="$124,380" 
           subtext="+12% vs previous 30 days" 
           trend="up" 
           trendValue="12%"
           icon={DollarSign}
           onClick={() => setSelectedStatId("total-cloud-spend")}
           layoutId="stat-total-cloud-spend"
        />
        <StatTile 
           id="k8s-ai-spend"
           title="K8s + AI Spend" 
           value="$76,420" 
           subtext="61% of total spend" 
           trend="up"
           trendValue="4%"
           icon={Activity}
           onClick={() => setSelectedStatId("k8s-ai-spend")}
           layoutId="stat-k8s-ai-spend"
        />
        <StatTile 
           id="active-incidents"
           title="Active Incidents" 
           value="3" 
           subtext="1 high impact detected" 
           trend="up"
           trendValue="+2"
           icon={AlertOctagon}
           onClick={() => setSelectedStatId("active-incidents")}
           layoutId="stat-active-incidents"
        />
        <StatTile 
           id="potential-savings"
           title="Potential Savings" 
           value="$18,200" 
           subtext="Safe to implement now" 
           trend="down"
           trendValue="Reliability Safe"
           icon={TrendingDown}
           onClick={() => setSelectedStatId("potential-savings")}
           layoutId="stat-potential-savings"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Spans 2 cols */}
        <div className="lg:col-span-2">
           <CostTimeSeriesChart />
        </div>

        {/* Breakdown or Savings - Spans 1 col */}
        <div className="lg:col-span-1">
           <SavingsPathSummary paths={savingsPaths} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Incidents List */}
         <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Recent Cost Incidents</h3>
              <a href="/incidents" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View all</a>
            </div>
            {costIncidents.slice(0, 3).map(incident => (
               <CostIncidentCard 
                  key={incident.id} 
                  incident={incident} 
                  href={`/incidents?open=${incident.id}`}
                  compact
               />
            ))}
         </div>

         {/* What-if Simulator Widget (Clean Version) */}
         <div className="bg-zinc-900/40 rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
               <Activity className="h-8 w-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">What-if Simulator</h3>
            <p className="text-zinc-400 text-sm max-w-xs mb-6">
              Simulate changes to your infrastructure to verify cost savings before applying them.
            </p>
            <button className="px-6 py-2 rounded-full bg-zinc-800 border border-white/10 text-white hover:bg-zinc-700 transition-all">
               Launch Simulator
            </button>
         </div>
      </div>
    </div>
  );
}
