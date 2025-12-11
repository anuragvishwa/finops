"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { X, Sparkles, Brain, Search, Database, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DeepDiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STAGES = [
  { id: "scanning", label: "Scanning Infrastructure", icon: Search, color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: "analyzing", label: "Analyzing Cost Patterns", icon: Brain, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10" },
  { id: "optimizing", label: "Generating Insights", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: "complete", label: "Analysis Complete", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

export function DeepDiveModal({ isOpen, onClose }: DeepDiveModalProps) {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const [itemsFound, setItemsFound] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStage(0);
      setItemsFound(0);

      // Simulate progression
      const stage1 = setTimeout(() => setCurrentStage(1), 2000);
      const stage2 = setTimeout(() => setCurrentStage(2), 4500);
      const stage3 = setTimeout(() => setCurrentStage(3), 7000);

      // Simulate finding items
      const counter = setInterval(() => {
        setItemsFound(prev => {
            if (prev >= 42) return 42;
            return prev + Math.floor(Math.random() * 3);
        });
      }, 200);

      return () => {
        clearTimeout(stage1);
        clearTimeout(stage2);
        clearTimeout(stage3);
        clearInterval(counter);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const activeStage = STAGES[currentStage];
  const isComplete = currentStage === 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              layoutId="deep-dive-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl pointer-events-auto relative"
            >
                {/* Glow Effects */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 rounded-2xl opacity-20 blur-xl animate-pulse" />

                <GlassCard noPadding className="relative overflow-hidden bg-black/90 border-white/10 shadow-2xl min-h-[400px] flex flex-col">
                    
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center flex-1 p-12 text-center">
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-colors">
                            <X className="h-5 w-5" />
                        </button>

                        <AnimatePresence mode="wait">
                            {!isComplete ? (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex flex-col items-center"
                                >
                                    {/* Animated Ring */}
                                    <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                                         <motion.div 
                                            className="absolute inset-0 rounded-full border-2 border-indigo-500/30 border-t-indigo-500"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                         />
                                         <motion.div 
                                            className="absolute inset-2 rounded-full border-2 border-fuchsia-500/30 border-b-fuchsia-500"
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                         />
                                         <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm">
                                             <activeStage.icon className={`h-8 w-8 ${activeStage.color}`} />
                                         </div>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-2">{activeStage.label}...</h2>
                                    <p className="text-zinc-400 mb-8 max-w-md">
                                        Scanning your complete cloud footprint across regions. Identifying cost anomalies and optimization opportunities.
                                    </p>

                                    {/* Progress Indicators */}
                                    <div className="flex gap-2">
                                        {STAGES.slice(0, 3).map((s, idx) => (
                                            <motion.div
                                                key={s.id}
                                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                                    idx <= currentStage ? 'w-8 bg-white' : 'w-2 bg-white/20'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    
                                    <div className="mt-8 font-mono text-sm text-zinc-500">
                                        {itemsFound} potential insights found
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="complete"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                        <Sparkles className="h-10 w-10 text-emerald-400" />
                                    </div>
                                    
                                    <h2 className="text-3xl font-bold text-white mb-2">Deep Dive Complete</h2>
                                    <p className="text-zinc-400 mb-8">
                                        We found <span className="text-white font-bold">{itemsFound} actionable insights</span> that could save you <span className="text-emerald-400 font-bold">$12,450/mo</span>.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-left">
                                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Savings</div>
                                            <div className="text-xl font-bold text-emerald-400">$12,450</div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-left">
                                            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Anomalies</div>
                                            <div className="text-xl font-bold text-white">3 Critical</div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => router.push('/incidents')}
                                        className="group relative px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2"
                                    >
                                        View Cost Incidents
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer decoration */}
                    <div className="h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500" />
                </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
