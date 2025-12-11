"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { CostIncidentCard } from "@/components/finops/cost-incident-card";
import { costIncidents, CostIncident } from "@/lib/mock-data";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IncidentModal } from "@/components/finops/incident-modal";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function IncidentsContent() {
  const [activeFilter, setActiveFilter] = useState("All Incidents");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<CostIncident | null>(null);
  
  const searchParams = useSearchParams();

  useEffect(() => {
     const openId = searchParams.get('open');
     if (openId) {
        const incident = costIncidents.find(i => i.id === openId);
        if (incident) {
           setSelectedIncident(incident);
        }
     }
  }, [searchParams]);

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
      
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Cost Incidents
          </h2>
          <p className="text-zinc-400">
            Detect and resolve cloud spend anomalies before they break your budget.
          </p>
        </div>

        {/* Controls Row: Search + Filters */}
        <div className="flex items-center justify-between gap-4 bg-zinc-900/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm">
           {/* Search */}
           <div className="flex items-center px-3 py-2 space-x-2 bg-transparent shrink-0">
              <Search className="h-4 w-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search incidents..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-zinc-600 w-full md:w-64"
              />
           </div>

           {/* Divider */}
           <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

           {/* Filter Tabs */}
           <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
             {['All Incidents', 'High Severity', 'Production', 'K8s', 'AI/GPU'].map((filter) => (
               <button 
                 key={filter}
                 onClick={() => setActiveFilter(filter)}
                 className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                   activeFilter === filter 
                   ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.15)]' 
                   : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                 }`}
               >
                 {filter}
               </button>
             ))}
           </div>

           {/* Advanced Filters Button (Mock) */}
           <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors ml-auto border border-transparent hover:border-white/5">
              <Filter className="h-4 w-4" />
           </button>
        </div>
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

export default function IncidentsPage() {
   return (
      <Suspense fallback={<div className="text-zinc-500">Loading incidents...</div>}>
         <IncidentsContent />
      </Suspense>
   );
}
