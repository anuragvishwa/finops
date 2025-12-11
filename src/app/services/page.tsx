"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { services, teams } from "@/lib/mock-data";
import { Search, Filter, Box, Server, Users, ArrowUpRight, ShieldCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ServiceDetailModal } from "@/components/finops/service-detail-modal";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTier, setActiveTier] = useState("All Tiers");
  const [selectedService, setSelectedService] = useState<any>(null);

  const filteredServices = services.filter(service => {
    // Filter by Search
    const query = searchQuery.toLowerCase();
    const matchName = service.name.toLowerCase().includes(query);
    const matchId = service.id.toLowerCase().includes(query);
    const team = teams.find(t => t.id === service.teamId);
    const matchTeam = team?.name.toLowerCase().includes(query);

    if (searchQuery && !matchName && !matchId && !matchTeam) return false;

    // Filter by Tier
    if (activeTier !== "All Tiers") {
       const tierKey = activeTier.toLowerCase().replace(' ', '-');
       if (service.tier !== tierKey) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Service Catalog
          </h2>
          <p className="text-zinc-400">
            Monitor cost, health, and ownership of your microservices.
          </p>
        </div>
        <div className="flex items-center space-x-3">
           <GlassCard noPadding className="flex items-center px-3 py-2 space-x-2 shrink-0 bg-zinc-900/50 border-white/5">
              <Search className="h-4 w-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-zinc-600 w-32 md:w-48"
              />
           </GlassCard>
           
           <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-white/5">
              {['All Tiers', 'Tier 1', 'Tier 2', 'Tier 3'].map(tier => (
                 <button
                    key={tier}
                    onClick={() => setActiveTier(tier)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                       activeTier === tier 
                       ? 'bg-zinc-700 text-white shadow-sm' 
                       : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                 >
                    {tier}
                 </button>
              ))}
           </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, i) => {
           const team = teams.find(t => t.id === service.teamId);
           
           return (
              <motion.div
                key={service.id}
                layoutId={`card-${service.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedService(service)}
              >
                 <GlassCard variant="hover" className="h-full flex flex-col group cursor-pointer relative overflow-hidden ring-1 ring-white/5 hover:ring-indigo-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] bg-gradient-to-br from-zinc-900/80 to-zinc-950/80">
                    {/* Top Accent */}


                    <div className="flex items-start justify-between mb-6">
                       <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl bg-zinc-900 border border-white/5 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500 shadow-lg`}>
                             <Box className="h-6 w-6 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                          </div>
                          <div>
                             <h3 className="text-xl font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors tracking-tight">{service.name}</h3>
                             <p className="text-xs text-zinc-500 font-mono mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">{service.id}</p>
                          </div>
                       </div>
                       <Badge variant="outline" className="opacity-50 group-hover:opacity-100 border-white/5 bg-white/5">
                          {service.tier.replace('-', ' ').toUpperCase()}
                       </Badge>
                    </div>

                    <div className="space-y-5 flex-1">
                       {/* Metrics */}
                       <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-black/20 border border-white/5 group-hover:border-white/10 transition-colors">
                             <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-semibold">Monthly Cost</p>
                             <p className="text-base font-bold text-white font-mono">${service.monthlyCost.toLocaleString()}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-black/20 border border-white/5 group-hover:border-white/10 transition-colors">
                             <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-semibold">Incidents (30d)</p>
                             <div className="flex items-center justify-between">
                                <span className={`text-base font-bold ${service.incidentsLast30d > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                   {service.incidentsLast30d}
                                </span>
                                {service.incidentsLast30d > 0 ? (
                                   <AlertTriangle className="h-4 w-4 text-rose-500 opacity-80" />
                                ) : (
                                   <ShieldCheck className="h-4 w-4 text-emerald-500 opacity-80" />
                                )}
                             </div>
                          </div>
                       </div>

                       {/* Team Info */}
                       {team && (
                          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                             <div className="flex items-center space-x-2.5">
                                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-md ${team.avatarColor}`}>
                                   {team.name.substring(0, 2).toUpperCase()}
                                </div>
                                <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{team.name}</span>
                             </div>
                             <span className="text-[10px] text-zinc-500 flex items-center bg-white/5 px-2 py-1 rounded-full border border-white/5">
                                {service.language} <div className={`ml-1.5 h-1.5 w-1.5 rounded-full shadow-[0_0_5px_currentColor] ${
                                   service.language === 'python' ? 'bg-blue-400 text-blue-400' :
                                   service.language === 'go' ? 'bg-cyan-400 text-cyan-400' :
                                   service.language === 'rust' ? 'bg-orange-400 text-orange-400' : 'bg-yellow-400 text-yellow-400'
                                }`} />
                             </span>
                          </div>
                       )}
                    </div>
                 </GlassCard>
              </motion.div>
           );
        })}

        {/* Add New Placeholder */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center hover:bg-zinc-900/30 transition-colors cursor-pointer group min-h-[300px]"
        >
           <div className="h-14 w-14 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg border border-zinc-800 group-hover:border-zinc-700">
              <Server className="h-6 w-6 text-zinc-600 group-hover:text-zinc-400" />
           </div>
           <p className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300">Register New Service</p>
        </motion.div>
      </div>

      <ServiceDetailModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
        layoutId={selectedService ? `card-${selectedService.id}` : undefined}
      />
    </div>
  );
}
