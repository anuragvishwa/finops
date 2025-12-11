"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Save, TrendingDown, AlertTriangle, Cpu, HardDrive } from "lucide-react";
import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { ClientWrapper } from "@/components/ui/client-wrapper";

export default function WhatIfPage() {
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 1500); // Fake load
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">What-If Simulator</h2>
            <p className="text-slate-400">Design infrastructure changes and preview their impact before committing.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Left Column: Scenario Builder */}
         <div className="lg:col-span-5 space-y-6">
            <GlassCard variant="panel" className="space-y-6">
               <div className="border-b border-white/10 pb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                     <SlidersHorizontalIcon className="mr-2 h-5 w-5 text-fuchsia-400" />
                     Configuration
                  </h3>
               </div>

               <div className="space-y-6">
                  {/* Scope */}
                  <div>
                     <label className="block text-sm font-medium text-slate-400 mb-3">Scope</label>
                     <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer hover:border-fuchsia-500 hover:text-white transition-colors">Production</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:border-fuchsia-500 hover:text-white transition-colors">User Facing</Badge>
                        <Badge variant="default" className="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">llm-inference</Badge>
                     </div>
                  </div>

                  {/* Resource Changes */}
                  <div className="space-y-4">
                     <p className="text-sm font-medium text-white flex items-center">
                        <Cpu className="mr-2 h-4 w-4 text-cyan-400" /> Compute Resources
                     </p>
                     <Slider label="Reduce CPU Requests" min={0} max={50} unit="%" defaultValue={15} />
                     <Slider label="Reduce Memory Limits" min={0} max={50} unit="%" defaultValue={10} />
                  </div>

                  <div className="space-y-4">
                     <p className="text-sm font-medium text-white flex items-center">
                        <HardDrive className="mr-2 h-4 w-4 text-amber-400" /> Storage & Scaling
                     </p>
                     <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-sm text-slate-200">Use Spot Instances</span>
                        <div className="h-5 w-9 rounded-full bg-fuchsia-600 relative cursor-pointer">
                           <div className="absolute top-1 right-1 h-3 w-3 rounded-full bg-white shadow-sm" />
                        </div>
                     </div>
                     <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-sm text-slate-200">Scale down off-hours</span>
                        <div className="h-5 w-9 rounded-full bg-slate-700 relative cursor-pointer">
                           <div className="absolute top-1 left-1 h-3 w-3 rounded-full bg-slate-400 shadow-sm" />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="pt-4 flex items-center space-x-3">
                  <button 
                    onClick={runSimulation}
                    className="flex-1 flex items-center justify-center py-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all"
                  >
                     <Play className="h-4 w-4 mr-2 fill-current" />
                     Run Simulation
                  </button>
                  <button className="p-3 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                     <RotateCcw className="h-5 w-5" />
                  </button>
               </div>
            </GlassCard>
         </div>

         {/* Right Column: Results */}
         <div className="lg:col-span-7 space-y-6">
            {/* Top KPIs */}
            <div className="grid grid-cols-2 gap-4">
               <GlassCard className="bg-gradient-to-br from-emerald-900/10 to-transparent border-emerald-500/20">
                  <p className="text-sm text-emerald-400 font-medium mb-1">Estimated Savings</p>
                  <div className="flex items-baseline space-x-2">
                     <h3 className="text-3xl font-bold text-white">$12,450</h3>
                     <span className="text-sm text-slate-400">/mo</span>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-emerald-500">
                     <TrendingDown className="h-3 w-3 mr-1" />
                     18% reduction
                  </div>
               </GlassCard>
               
               <GlassCard className="bg-gradient-to-br from-amber-900/10 to-transparent border-amber-500/20">
                   <p className="text-sm text-amber-400 font-medium mb-1">Reliability Risk</p>
                   <div className="flex items-baseline space-x-2">
                     <h3 className="text-3xl font-bold text-white">Medium</h3>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-amber-500">
                     <AlertTriangle className="h-3 w-3 mr-1" />
                     Spot interruption risk
                  </div>
               </GlassCard>
            </div>

            {/* Detailed Analysis with Radar Chart */}
            <GlassCard>
               <h4 className="text-lg font-semibold text-white mb-6">Impact Analysis</h4>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Radar Chart */}
                  <div className="h-[300px] w-full">
                     <ClientWrapper className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                              { subject: 'Cost', A: 100, B: 82, fullMark: 100 },
                              { subject: 'Performance', A: 90, B: 85, fullMark: 100 },
                              { subject: 'Reliability', A: 95, B: 70, fullMark: 100 },
                              { subject: 'Scalability', A: 85, B: 60, fullMark: 100 },
                              { subject: 'Security', A: 100, B: 100, fullMark: 100 },
                           ]}>
                              <PolarGrid stroke="rgba(255,255,255,0.1)" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              {/* Current State */}
                              <Radar
                                 name="Current"
                                 dataKey="A"
                                 stroke="#a1a1aa"
                                 strokeWidth={2}
                                 fill="#a1a1aa"
                                 fillOpacity={0.1}
                              />
                              {/* Simulated State */}
                              <Radar
                                 name="Simulated"
                                 dataKey="B"
                                 stroke="#6366f1"
                                 strokeWidth={2}
                                 fill="#6366f1"
                                 fillOpacity={0.4}
                              />
                              <Legend 
                                 wrapperStyle={{ paddingTop: '20px' }}
                                 content={({ payload }) => (
                                   <div className="flex justify-center space-x-6">
                                     {payload?.map((entry, index) => (
                                       <div key={`item-${index}`} className="flex items-center text-sm text-zinc-300">

                                         <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                                         {entry.value}
                                       </div>
                                     ))}
                                   </div>
                                 )}
                              />
                           </RadarChart>
                        </ResponsiveContainer>
                     </ClientWrapper>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-6 flex flex-col justify-center">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 relative overflow-hidden">
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
                         <p className="text-xs text-slate-400 mb-1">Current Monthly Spend</p>
                         <p className="text-2xl font-bold text-white">$57,000</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 relative overflow-hidden">
                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-fuchsia-500" />
                         <p className="text-xs text-slate-400 mb-1">Simulated Monthly Spend</p>
                         <p className="text-2xl font-bold text-fuchsia-400">$44,550</p>
                         <p className="text-xs text-emerald-400 mt-1 flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            $12,450 savings
                         </p>
                      </div>
                  </div>
               </div>

               <div className="mt-8 flex justify-end space-x-3">
                  <button className="px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 text-sm font-medium">
                     Create Report
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 text-sm font-medium flex items-center">
                     <Save className="h-4 w-4 mr-2" />
                     Save to Savings Path
                  </button>
               </div>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}

function SlidersHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="21" y2="21" />
      <polygon points="4 18 20 18 20 7 4 7 4 18" />
      <line x1="12" x2="12" y1="21" y2="7" />
      <line x1="12" x2="12" y1="3" y2="7" />
    </svg>
  ); // Quick fake icon replacement or usage of Lucide equivalent
}
