"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { services, teams } from "@/lib/mock-data";
import { Search, Filter, Box, Server, Users, ArrowUpRight, ShieldCheck, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTier, setActiveTier] = useState("All Tiers");

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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                 <GlassCard variant="hover" className="h-full flex flex-col group cursor-pointer relative overflow-hidden">
                    {/* Top Accent */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${
                       service.tier === 'tier-1' ? 'bg-gradient-to-r from-indigo-500 to-purple-500' :
                       service.tier === 'tier-2' ? 'bg-zinc-600' : 'bg-zinc-800'
                    }`} />

                    <div className="flex items-start justify-between mb-4">
                       <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-zinc-800/80 border border-white/5 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-colors`}>
                             <Box className="h-5 w-5 text-zinc-400 group-hover:text-indigo-400" />
                          </div>
                          <div>
                             <h3 className="text-lg font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors">{service.name}</h3>
                             <p className="text-xs text-zinc-500 font-mono">{service.id}</p>
                          </div>
                       </div>
                       <Badge variant="outline" className="opacity-70">
                          {service.tier.replace('-', ' ').toUpperCase()}
                       </Badge>
                    </div>

                    <div className="space-y-4 flex-1">
                       {/* Metrics */}
                       <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 rounded bg-zinc-900/30 border border-white/5">
                             <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Monthly Cost</p>
                             <p className="text-sm font-semibold text-white">${service.monthlyCost.toLocaleString()}</p>
                          </div>
                          <div className="p-2 rounded bg-zinc-900/30 border border-white/5">
                             <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Incidents (30d)</p>
                             <div className="flex items-center">
                                <span className={`text-sm font-semibold ${service.incidentsLast30d > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                   {service.incidentsLast30d}
                                </span>
                                {service.incidentsLast30d > 0 ? (
                                   <AlertTriangle className="h-3 w-3 ml-1.5 text-rose-500" />
                                ) : (
                                   <ShieldCheck className="h-3 w-3 ml-1.5 text-emerald-500" />
                                )}
                             </div>
                          </div>
                       </div>

                       {/* Team Info */}
                       {team && (
                          <div className="flex items-center justify-between pt-2 border-t border-white/5">
                             <div className="flex items-center space-x-2">
                                <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${team.avatarColor}`}>
                                   {team.name.substring(0, 2).toUpperCase()}
                                </div>
                                <span className="text-xs text-zinc-300">{team.name}</span>
                             </div>
                             <span className="text-[10px] text-zinc-500 flex items-center">
                                {service.language} <div className={`ml-1.5 h-1.5 w-1.5 rounded-full ${
                                   service.language === 'python' ? 'bg-blue-400' :
                                   service.language === 'go' ? 'bg-cyan-400' :
                                   service.language === 'rust' ? 'bg-orange-400' : 'bg-yellow-400'
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
           className="border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:bg-zinc-900/30 transition-colors cursor-pointer group"
        >
           <div className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Server className="h-5 w-5 text-zinc-600 group-hover:text-zinc-400" />
           </div>
           <p className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300">Register New Service</p>
        </motion.div>
      </div>
    </div>
  );
}
