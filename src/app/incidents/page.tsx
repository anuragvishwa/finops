"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { CostIncidentCard } from "@/components/finops/cost-incident-card";
import { costIncidents, CostIncident } from "@/lib/mock-data";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IncidentModal } from "@/components/finops/incident-modal";

export default function IncidentsPage() {
  const [activeFilter, setActiveFilter] = useState("All Incidents");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<CostIncident | null>(null);

  const filteredIncidents = costIncidents.filter(incident => {
    // 1. Filter by Tab
    if (activeFilter === "High Severity" && incident.severity !== "high") return false;
    if (activeFilter === "Production" && incident.environment !== "prod") return false;
    if (activeFilter === "K8s" && incident.workloadType !== "k8s") return false;
    if (activeFilter === "AI/GPU" && incident.workloadType !== "ai-gpu") return false;

    // 2. Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = incident.title.toLowerCase().includes(query);
      const matchId = incident.id.toLowerCase().includes(query);
      const matchService = incident.primaryServiceId.toLowerCase().includes(query);
      return matchTitle || matchId || matchService;
    }
    
    return true;
  });

  return (
    <div className="space-y-8 pb-10">
      <IncidentModal 
         incident={selectedIncident} 
         onClose={() => setSelectedIncident(null)} 
         layoutId={selectedIncident ? `incident-${selectedIncident.id}` : undefined}
      />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Cost Incidents
          </h2>
          <p className="text-zinc-400">
            Detect and resolve cloud spend anomalies before they break your budget.
          </p>
        </div>
        <div className="flex items-center space-x-3">
           <GlassCard noPadding className="flex items-center px-3 py-2 space-x-2 shrink-0 bg-zinc-900/50 border-white/5">
              <Search className="h-4 w-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search incidents..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-zinc-600 w-32 md:w-48"
              />
           </GlassCard>
           {/* Placeholder buttons for future advanced config */}
           <div className="hidden md:flex space-x-3">
              <button className="p-2.5 rounded-lg bg-zinc-800 border border-white/5 hover:bg-zinc-700 transition-colors shrink-0 text-zinc-400 hover:text-white cursor-not-allowed opacity-50" title="Advanced Filters (Coming Soon)">
                  <Filter className="h-5 w-5" />
              </button>
              <button className="p-2.5 rounded-lg bg-zinc-800 border border-white/5 hover:bg-zinc-700 transition-colors shrink-0 text-zinc-400 hover:text-white cursor-not-allowed opacity-50" title="View Settings (Coming Soon)">
                  <SlidersHorizontal className="h-5 w-5" />
              </button>
           </div>
        </div>
      </div>

      {/* Filter Tabs Mock */}
      <div className="relative z-30 flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-hide">
         {['All Incidents', 'High Severity', 'Production', 'K8s', 'AI/GPU'].map((filter) => (
           <button 
             key={filter}
             onClick={() => setActiveFilter(filter)}
             className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
               activeFilter === filter 
               ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
               : 'bg-zinc-800/50 text-zinc-400 border border-white/5 hover:bg-zinc-800'
             }`}
           >
             {filter}
           </button>
         ))}
      </div>

      <div className="space-y-4">
         {filteredIncidents.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
               No incidents found matching this filter.
            </div>
         ) : (
            filteredIncidents.map((incident, i) => (
               <motion.div
                 key={incident.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
               >
                 <CostIncidentCard 
                    incident={incident} 
                    onClick={() => setSelectedIncident(incident)} 
                    layoutId={`incident-${incident.id}`}
                 />
               </motion.div>
            ))
         )}
      </div>
    </div>
  );
}
