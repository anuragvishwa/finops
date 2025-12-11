"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Play, RotateCcw, Save, TrendingDown, AlertTriangle, 
  Cpu, HardDrive, Zap, Server, BrainCircuit, CheckCircle2, XCircle 
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { ClientWrapper } from "@/components/ui/client-wrapper";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatIfPage() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Scenario State
  const [rightsizingAggressiveness, setRightsizingAggressiveness] = useState(15);
  const [useSpotInstances, setUseSpotInstances] = useState(false);
  const [shutdownOffHours, setShutdownOffHours] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>(['team-core']);

  // Computed Results (Mock logic)
  const baseSpend = 57000;
  const rightsizingSavings = (baseSpend * 0.1) * (rightsizingAggressiveness / 20); // Scale with slider
  const spotSavings = useSpotInstances ? baseSpend * 0.25 : 0;
  const shutdownSavings = shutdownOffHours ? baseSpend * 0.15 : 0;
  
  const totalSavings = rightsizingSavings + spotSavings + shutdownSavings;
  const simulatedSpend = baseSpend - totalSavings;
  const savingsPercentage = (totalSavings / baseSpend) * 100;

  // Risk Calculation
  let riskLevel = "Low";
  let riskScore = 1; // 1-10
  if (rightsizingAggressiveness > 30) { riskLevel = "Medium"; riskScore += 3; }
  if (useSpotInstances) { riskLevel = "Medium"; riskScore += 3; }
  if (rightsizingAggressiveness > 40 && useSpotInstances) { riskLevel = "High"; riskScore += 2; }

  const runSimulation = () => {
    setIsSimulating(true);
    setShowResults(false);
    setTimeout(() => {
      setIsSimulating(false);
      setShowResults(true);
    }, 1200);
  };

  const chartData = [
    { name: 'Current', amount: baseSpend },
    { name: 'Simulated', amount: simulatedSpend },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
         <div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">What-If Simulator</h2>
            <p className="text-zinc-400">Design infrastructure changes and preview their impact before committing.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Left Column: Scenario Builder */}
         <div className="lg:col-span-4 space-y-6">
            <GlassCard className="space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-32 bg-fuchsia-500/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               
               <div className="relative">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                     <SlidersHorizontalIcon className="h-5 w-5 text-fuchsia-500" />
                     Scenario Config
                  </h3>

                  {/* Toggles */}
                  <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4">
                          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Production Settings</label>
                          
                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${useSpotInstances ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 text-zinc-500'}`}>
                                      <Zap className="h-4 w-4" />
                                  </div>
                                  <div>
                                      <p className="text-sm font-medium text-white">Spot Instances</p>
                                      <p className="text-xs text-zinc-500">Run fault-tolerant workloads on Spot</p>
                                  </div>
                              </div>
                              <Switch checked={useSpotInstances} onCheckedChange={setUseSpotInstances} />
                          </div>

                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${shutdownOffHours ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-500'}`}>
                                      <RotateCcw className="h-4 w-4" />
                                  </div>
                                  <div>
                                      <p className="text-sm font-medium text-white">Weekend Shutdown</p>
                                      <p className="text-xs text-zinc-500">Stop non-prod envs off-hours</p>
                                  </div>
                              </div>
                              <Switch checked={shutdownOffHours} onCheckedChange={setShutdownOffHours} />
                          </div>
                      </div>

                      {/* Slider */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4">
                           <div className="flex items-center justify-between mb-2">
                               <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                   <Cpu className="h-3 w-3" /> Rightsizing Aggressiveness
                               </label>
                               <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                   rightsizingAggressiveness > 30 ? 'bg-rose-500/20 text-rose-400' : 
                                   rightsizingAggressiveness > 15 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                               }`}>
                                   {rightsizingAggressiveness}%
                               </span>
                           </div>
                           <Slider 
                                value={[rightsizingAggressiveness]} 
                                onValueChange={(val) => setRightsizingAggressiveness(val[0])} 
                                max={50} 
                                step={5}
                                className="py-2"
                           />
                           <p className="text-xs text-zinc-500 italic">
                               Higher values aggressively trim CPU/RAM buffers but increase OOM risk.
                           </p>
                      </div>
                  </div>
               </div>

               <div className="pt-2 flex items-center space-x-3">
                  <button 
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="flex-1 flex items-center justify-center py-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-bold hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
                  >
                     {isSimulating ? (
                         <span className="flex items-center gap-2">
                            <AnalyzeSpinner /> Simulating...
                         </span>
                     ) : (
                         <>
                            <Play className="h-4 w-4 mr-2 fill-current group-hover:scale-110 transition-transform" />
                            Run Simulation
                         </>
                     )}
                  </button>
               </div>
            </GlassCard>
         </div>

         {/* Right Column: Results */}
         <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
                {!showResults && !isSimulating ? (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="h-full min-h-[400px] flex flex-col items-center justify-center text-center opacity-50"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                            <BrainCircuit className="h-10 w-10 text-zinc-600" />
                        </div>
                        <h3 className="text-xl font-medium text-zinc-400">Ready to simulate</h3>
                        <p className="text-sm text-zinc-600 max-w-sm mt-2">Adjust the parameters on the left to see how much you could save.</p>
                    </motion.div>
                ) : isSimulating ? (
                    <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="h-full min-h-[400px] flex flex-col items-center justify-center"
                    >
                        <AnalyzeCanvas />
                        <p className="mt-8 text-fuchsia-400 font-mono text-sm animate-pulse">Running Monte Carlo Simulations...</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="results"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* Top KPIs */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <GlassCard className="bg-gradient-to-br from-emerald-900/20 to-transparent border-emerald-500/30 overflow-hidden relative">
                                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Projected Savings</p>
                                <div className="flex items-baseline space-x-2">
                                    <Counter from={0} to={totalSavings} prefix="$" className="text-3xl font-bold text-white" />
                                    <span className="text-sm text-emerald-400/80 font-medium">/mo</span>
                                </div>
                                <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                    {savingsPercentage.toFixed(1)}%
                                </div>
                            </GlassCard>
                            
                            <GlassCard className={`bg-gradient-to-br from-${riskLevel === 'High' ? 'rose' : riskLevel === 'Medium' ? 'amber' : 'blue'}-900/20 to-transparent border-${riskLevel === 'High' ? 'rose' : riskLevel === 'Medium' ? 'amber' : 'blue'}-500/30`}>
                                <p className={`text-xs font-bold text-${riskLevel === 'High' ? 'rose' : riskLevel === 'Medium' ? 'amber' : 'blue'}-400 uppercase tracking-wider mb-1`}>Risk Assessment</p>
                                <h3 className="text-3xl font-bold text-white">{riskLevel}</h3>
                                <p className="text-xs text-zinc-400 mt-2">
                                    {riskLevel === 'High' ? 'Significant impact on reliability possible.' : 
                                     riskLevel === 'Medium' ? 'Minor latency increase expected.' : 'Negligible impact on workloads.'}
                                </p>
                            </GlassCard>

                            <GlassCard className="bg-gradient-to-br from-fuchsia-900/20 to-transparent border-fuchsia-500/30 flex flex-col justify-center items-center">
                                <div className="text-center">
                                    <p className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider mb-2">AI Confidence</p>
                                    <div className="relative h-16 w-32">
                                       {/* Simple Gauge Chart Mock */}
                                       <div className="absolute inset-0 flex items-end justify-center">
                                            <div className="w-24 h-12 bg-white/10 rounded-t-full overflow-hidden relative">
                                                <motion.div 
                                                    initial={{ rotate: -90 }}
                                                    animate={{ rotate: -90 + (1.8 * (100 - (riskScore * 8))) }}
                                                    transition={{ duration: 1, delay: 0.5, type: "spring" }}
                                                    className="w-full h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 origin-bottom transform"
                                                />
                                            </div>
                                       </div>
                                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xl font-bold text-white">
                                            {100 - (riskScore * 8)}%
                                       </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>

                        {/* AI Analysis & Chart */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             {/* Agent Message */}
                             <GlassCard className="relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 p-24 bg-indigo-500/10 blur-3xl rounded-full" />
                                 <div className="flex gap-4">
                                     <div className="flex-shrink-0">
                                         <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                             <BrainCircuit className="h-5 w-5 text-white" />
                                         </div>
                                     </div>
                                     <div className="space-y-2">
                                         <h4 className="text-sm font-bold text-white">AI Broker Analysis</h4>
                                         <div className="text-sm text-zinc-300 leading-relaxed">
                                            {useSpotInstances && riskLevel === "High" ? (
                                                <p>Combining <span className="text-amber-400 font-bold">Spot Instances</span> with aggressive rightsizing creates a <span className="text-rose-400 font-bold">dangerously low fault tolerance</span> for production. I recommend reducing rightsizing to under 20% if you keep Spot enabled.</p>
                                            ) : useSpotInstances ? (
                                                <p>Enabling <span className="text-indigo-400 font-bold">Spot Instances</span> offers great savings. Ensure your services handle interruptions gracefully. The risk is manageable for stateless workloads.</p>
                                            ) : (
                                                <p>This is a conservative plan. You safely save overhead without risking availability. Consider enabling <span className="text-indigo-400 font-bold">Weekend Shutdown</span> for dev environments to boost savings further.</p>
                                            )}
                                         </div>
                                         <div className="pt-2 flex gap-2">
                                             <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20">
                                                 <CheckCircle2 className="h-3 w-3 mr-1" /> Validated
                                             </Badge>
                                         </div>
                                     </div>
                                 </div>
                             </GlassCard>

                             {/* Chart */}
                             <GlassCard className="h-64">
                                 <ResponsiveContainer width="100%" height="100%">
                                     <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                         <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                         <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                                         <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                                         <Tooltip 
                                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                            contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                                            itemStyle={{ color: '#fff' }}
                                         />
                                         <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                                             {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#3f3f46' : '#c026d3'} />
                                             ))}
                                         </Bar>
                                     </BarChart>
                                 </ResponsiveContainer>
                             </GlassCard>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}

// ---------------- Helper Components ----------------

function Counter({ from, to, prefix = "", className }: { from: number, to: number, prefix?: string, className?: string }) {
    // A simplified counter that jumps to the end for now, could be animated with Framer Motion `useSpring` logic
    return <span className={className}>{prefix}{Math.round(to).toLocaleString()}</span>;
}

function AnalyzeSpinner() {
    return (
        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}

function AnalyzeCanvas() {
    return (
        <div className="relative w-64 h-32 flex items-center justify-center">
            {/* Fake visualizer bars */}
            <div className="flex items-end gap-1 h-20">
                {[...Array(12)].map((_, i) => (
                    <motion.div 
                        key={i}
                        className="w-3 bg-fuchsia-500 rounded-t-sm"
                        animate={{ height: [20, 60, 30, 80, 40] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1, ease: "easeInOut" }}
                    />
                ))}
            </div>
        </div>
    )
}

function SlidersHorizontalIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="21" y2="21" />
      <polygon points="4 18 20 18 20 7 4 7 4 18" />
      <line x1="12" x2="12" y1="21" y2="7" />
      <line x1="12" x2="12" y1="3" y2="7" />
    </svg>
  );
}
