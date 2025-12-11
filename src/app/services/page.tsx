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
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Service Catalog
          </h2>
          <p className="text-zinc-400">
            Monitor cost, health, and ownership of your microservices.
          </p>
        </div>

        {/* Controls Row: Search + Filters */}
        <div className="flex items-center gap-4 bg-zinc-900/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm">
           {/* Search */}
           <div className="flex items-center px-3 py-2 space-x-2 bg-transparent shrink-0">
              <Search className="h-4 w-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-sm text-white focus:outline-none placeholder:text-zinc-600 w-full md:w-48"
              />
           </div>

           {/* Divider */}
           <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

           {/* Tier Filters */}
           <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
              {['All Tiers', 'Tier 1', 'Tier 2', 'Tier 3'].map(tier => (
                 <button
                    key={tier}
                    onClick={() => setActiveTier(tier)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 ${
                       activeTier === tier 
                       ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.15)]' 
                       : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
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
           
           // Tier-specific styling
           const tierStyles = {
             'tier-1': 'from-indigo-500/10 via-purple-500/5 to-zinc-900/80 border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.05)] hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] hover:border-indigo-500/40',
             'tier-2': 'from-blue-500/10 via-cyan-500/5 to-zinc-900/80 border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:border-blue-500/40',
             'tier-3': 'from-emerald-500/10 via-teal-500/5 to-zinc-900/80 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)] hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:border-emerald-500/40',
           };

           const currentStyle = tierStyles[service.tier as keyof typeof tierStyles] || tierStyles['tier-3'];
           const accentColor = service.tier === 'tier-1' ? 'text-indigo-400' : service.tier === 'tier-2' ? 'text-blue-400' : 'text-emerald-400';
           const bgAccent = service.tier === 'tier-1' ? 'bg-indigo-500' : service.tier === 'tier-2' ? 'bg-blue-500' : 'bg-emerald-500';

           return (
              <motion.div
                key={service.id}
                layoutId={`card-${service.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedService(service)}
                className="group relative"
              >
                 {/* Ambient Background Glow */}
                 <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-b ${service.tier === 'tier-1' ? 'from-indigo-500/20 to-purple-600/20' : service.tier === 'tier-2' ? 'from-blue-500/20 to-cyan-600/20' : 'from-emerald-500/20 to-teal-600/20'} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />

                 <GlassCard noPadding className={`h-full flex flex-col cursor-pointer relative overflow-hidden transition-all duration-500 bg-gradient-to-br ${currentStyle}`}>
                    
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                       backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                       backgroundSize: '24px 24px'
                    }} />

                    <div className="p-6 flex flex-col h-full relative z-10">
                       <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center space-x-4">
                             <div className={`p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-300 shadow-inner`}>
                                <Box className={`h-6 w-6 ${accentColor} transition-colors`} />
                             </div>
                             <div>
                                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-white transition-colors tracking-tight">{service.name}</h3>
                                <p className="text-xs text-zinc-500 font-mono mt-0.5 group-hover:text-zinc-400 transition-colors">{service.id}</p>
                             </div>
                          </div>
                          <Badge variant="outline" className={`backdrop-blur-md border-white/10 ${service.tier === 'tier-1' ? 'bg-indigo-500/10 text-indigo-300' : service.tier === 'tier-2' ? 'bg-blue-500/10 text-blue-300' : 'bg-emerald-500/10 text-emerald-300'}`}>
                             {service.tier.replace('-', ' ').toUpperCase()}
                          </Badge>
                       </div>

                       <div className="space-y-4 flex-1">
                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-3">
                             <div className="p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-1 h-full ${bgAccent} opacity-20`} />
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-semibold">Monthly Cost</p>
                                <p className="text-lg font-bold text-white font-mono tracking-tight">${service.monthlyCost.toLocaleString()}</p>
                             </div>
                             <div className="p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors relative overflow-hidden">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1 font-semibold">Incidents (30d)</p>
                                <div className="flex items-center justify-between">
                                   <span className={`text-lg font-bold ${service.incidentsLast30d > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                      {service.incidentsLast30d}
                                   </span>
                                   {service.incidentsLast30d > 0 ? (
                                      <div className="h-6 w-6 rounded-full bg-rose-500/10 flex items-center justify-center animate-pulse">
                                         <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                                      </div>
                                   ) : (
                                       <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                         <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                                      </div>
                                   )}
                                </div>
                             </div>
                          </div>

                          {/* Team Info */}
                          {team && (
                             <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                <div className="flex items-center space-x-2.5">
                                   <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-lg ring-1 ring-white/10 ${team.avatarColor}`}>
                                      {team.name.substring(0, 2).toUpperCase()}
                                   </div>
                                   <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{team.name}</span>
                                </div>
                                <span className="text-[10px] text-zinc-500 flex items-center bg-white/5 px-2.5 py-1 rounded-full border border-white/5 group-hover:border-white/10 transition-colors">
                                   {service.language} <div className={`ml-1.5 h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor] ${
                                      service.language === 'python' ? 'bg-blue-400 text-blue-400' :
                                      service.language === 'go' ? 'bg-cyan-400 text-cyan-400' :
                                      service.language === 'rust' ? 'bg-orange-400 text-orange-400' : 'bg-yellow-400 text-yellow-400'
                                   }`} />
                                </span>
                             </div>
                          )}
                       </div>
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
        onNavigate={(id) => {
            const target = services.find(s => s.id === id);
            if (target) setSelectedService(target);
        }} 
        layoutId={selectedService ? `card-${selectedService.id}` : undefined}
      />
    </div>
  );
}
