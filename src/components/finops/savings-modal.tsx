"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, Zap, Clock, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { SavingsPathDetail } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";

// Helper for typewriter effect
const TypewriterText = ({ text }: { text: string }) => {
    const [displayed, setDisplayed] = useState("");
    
    useEffect(() => {
        let i = 0;
        setDisplayed("");
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 30); // Speed of typing
        return () => clearInterval(interval);
    }, [text]);

    return <span className="text-indigo-300">{displayed}<span className="animate-pulse">|</span></span>;
};

interface SavingsModalProps {
  savings: SavingsPathDetail | null;
  onClose: () => void;
  layoutId?: string;
  initialActionId?: string;
}


export function SavingsModal({ savings, onClose, layoutId, initialActionId }: SavingsModalProps) {
  // Main State
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [completedActionIds, setCompletedActionIds] = useState<string[]>([]);
  
  // Execution View State
  const [executionState, setExecutionState] = useState<"plan" | "running" | "success">("plan");
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [executionLog]);

  // Reset state when modal opens
  useEffect(() => {
    if (savings) {
      setActiveActionId(initialActionId || null);
      setExecutionState(initialActionId ? "plan" : "plan");
      setCompletedActionIds([]);
      setExecutionLog([]);
    }
  }, [savings?.id, initialActionId]);

  const activeAction = savings?.actions.find(a => a.id === activeActionId);

  // Handlers
  const handleStartExecution = async () => {
    if (!activeAction) return;
    setExecutionState("running");
    setExecutionLog([]);

    const steps = activeAction.simulationSteps || ["Initializing...", "Processing...", "Verifying..."];
    
    // Simulate steps
    for (const step of steps) {
        setExecutionLog(prev => [...prev, step]);
        // Random delay for realism
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
    }
    
    await new Promise(resolve => setTimeout(resolve, 600));
    setExecutionState("success");
    setCompletedActionIds(prev => [...prev, activeAction.id]);
  };

  const handleCloseExecution = () => {
      setActiveActionId(null);
      setExecutionState("plan");
      setExecutionLog([]);
  };

  return (
    <AnimatePresence>
      {savings && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              layoutId={layoutId}
              className="w-full max-w-2xl pointer-events-auto"
            >
              <GlassCard 
                 className="overflow-hidden shadow-2xl bg-zinc-900/90 border-white/10 relative min-h-[600px] flex flex-col" 
                 noPadding
                 initial={{ opacity: 1, y: 0 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                    
                    {/* VIEW 1: MAIN LIST */}
                    {!activeActionId ? (
                        <motion.div 
                            key="list"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col min-h-[600px]"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-zinc-900 via-zinc-900/50 to-zinc-900">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`p-2 rounded-lg ${
                                            savings.riskLevel === 'low' ? 'bg-emerald-500/10 text-emerald-400' : 
                                            savings.riskLevel === 'medium' ? 'bg-amber-500/10 text-amber-400' : 
                                            'bg-rose-500/10 text-rose-400'
                                        }`}>
                                            <ShieldCheck className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white leading-tight">{savings.title} Path</h2>
                                            <p className="text-zinc-400 text-sm">Review specific optimizations.</p>
                                        </div>
                                    </div>
                                    <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                        <X className="h-5 w-5 text-zinc-400" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Summary Cards */}
                            <div className="px-6 py-4 grid grid-cols-2 gap-4 border-b border-white/5">
                                 <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Total Potential</p>
                                    <p className="text-2xl font-bold text-emerald-400">{savings.potentialSavings}<span className="text-sm text-zinc-500 font-normal">/mo</span></p>
                                 </div>
                                 <div className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-white/5">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Time to Implement</p>
                                    <p className="text-xl font-medium text-white flex items-center"><Clock className="h-4 w-4 mr-2 text-indigo-400"/> {savings.implementationTime}</p>
                                 </div>
                            </div>

                            {/* List */}
                            <div className="p-6 space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                                {savings.actions.map((action) => {
                                    const isCompleted = completedActionIds.includes(action.id);
                                    return (
                                        <motion.div 
                                            key={action.id}
                                            layoutId={`card-container-${action.id}`}
                                            className={`group p-4 rounded-xl border transition-all ${isCompleted ? 'bg-emerald-950/20 border-emerald-500/20' : 'bg-zinc-800/20 border-white/5 hover:bg-zinc-800/40 hover:border-indigo-500/20'}`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="bg-transparent border-zinc-700 text-zinc-300">{action.type}</Badge>
                                                    {action.risk === 'High' && <Badge variant="destructive" className="h-5 text-[10px]">High Risk</Badge>}
                                                </div>
                                                <span className={`font-mono text-sm ${isCompleted ? 'text-emerald-400' : 'text-zinc-400'}`}>-{action.impact}</span>
                                            </div>
                                            <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{action.description}</p>
                                            
                                            <div className="flex items-center justify-between">
                                                {isCompleted ? (
                                                    <span className="flex items-center text-sm text-emerald-500 font-medium bg-emerald-500/10 px-3 py-1 rounded-full"><CheckCircle2 className="h-4 w-4 mr-2"/> Optimized</span>
                                                ) : (
                                                    <button 
                                                        onClick={() => setActiveActionId(action.id)}
                                                        className="text-sm font-medium text-indigo-400 group-hover:text-indigo-300 flex items-center transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-lg border border-indigo-500/20"
                                                    >
                                                        Review & Execute <Zap className="h-3 w-3 ml-2 fill-current" />
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        
                    /* VIEW 2: EXECUTION PLAN */
                    /* VIEW 2: EXECUTION PLAN */
                    /* VIEW 2: EXECUTION PLAN */
                    activeAction && (
                    <motion.div 
                        key="execution"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-col h-[600px] bg-zinc-950 relative"
                    >
                         {/* High-tech Background */}
                         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]" />
                         <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/80 pointer-events-none" />
                         
                        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
                            {/* Execution Header - Compact */}
                            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/40 backdrop-blur-md shrink-0">
                                <div className="flex items-center gap-3">
                                    <button onClick={handleCloseExecution} className="p-1.5 -ml-1.5 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <div>
                                        <motion.h3 layoutId={`card-container-${activeAction.id}`} className="text-base font-bold text-white flex items-center gap-2">
                                            {activeAction.type}
                                            {executionState === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                                        </motion.h3>
                                        <p className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">ID: {activeAction.id.substring(0,8).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Impact</p>
                                    <p className="text-sm font-bold text-emerald-400 font-mono">{activeAction.impact}</p>
                                </div>
                            </div>

                            {/* Execution Body */}
                            <div className="flex-1 px-8 py-6 overflow-y-auto relative custom-scrollbar scroll-smooth" ref={scrollRef}>
                               {executionState === 'success' ? (
                                   // SUCCESS STATE - Punchy & Center
                                   <div className="h-full flex flex-col items-center justify-center text-center relative z-10">
                                       <motion.div 
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: "spring", damping: 12, stiffness: 200 }}
                                          className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_60px_rgba(16,185,129,0.4)]"
                                       >
                                           <CheckCircle2 className="h-10 w-10 text-white" />
                                       </motion.div>
                                       <motion.div
                                           initial={{ opacity: 0, y: 10 }}
                                           animate={{ opacity: 1, y: 0 }}
                                           transition={{ delay: 0.1 }}
                                       >
                                           <h2 className="text-xl font-bold text-white mb-1">Optimization Complete</h2>
                                           <p className="text-zinc-500 text-sm mb-6">Resources have been successfully reconfigured.</p>
                                       </motion.div>
                                       
                                       <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 min-w-[200px]"
                                       >
                                           <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Monthly Savings</p>
                                           <p className="text-3xl font-mono text-emerald-400 font-bold tracking-tight">{activeAction.impact}</p>
                                       </motion.div>
                                   </div>
                               ) : (
                                   // PLAN / RUNNING STATE - Sleek & High Tech
                                   <div className="w-full max-w-md mx-auto relative min-h-full pb-10">
                                       {/* Timeline Track */}
                                       <div className="absolute left-[20px] top-3 bottom-0 w-[1px] bg-zinc-800/50 rounded-full overflow-hidden">
                                           {executionState === 'running' && (
                                               <motion.div 
                                                    className="w-full bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                                                    initial={{ height: "0%" }}
                                                    animate={{ height: "100%" }}
                                                    transition={{ duration: 0.5, ease: "linear" }}
                                                    style={{ height: `${(executionLog.length / (activeAction.simulationSteps?.length || 1)) * 100}%` }}
                                               />
                                           )}
                                       </div>

                                       <div className="space-y-6">
                                            {/* Start Node */}
                                            <div className="flex items-start gap-4">
                                                <div className="relative w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 z-10 shadow-lg group">
                                                    <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors rounded-xl" />
                                                    <Zap className="h-4 w-4 text-indigo-400" />
                                                </div>
                                                <div className="pt-1">
                                                    <h4 className="text-sm font-semibold text-white">Initialization</h4>
                                                    <p className="text-xs text-zinc-500">Validating configuration...</p>
                                                </div>
                                            </div>

                                            {/* Steps */}
                                            {activeAction.simulationSteps?.map((step, idx) => {
                                                const isExecuted = executionLog.length > idx;
                                                const isCurrent = executionState === 'running' && executionLog.length === idx; // Current is the one ABOUT to happen or happening
                                                
                                                // Adjust logic: executionLog contains COMPLETED or IN-PROGRESS steps?
                                                // My loop adds them one by one. 
                                                // Let's say log has 0 items. executionLog.length is 0. idx 0 is current.
                                                // When loop runs, it adds item 0. Length becomes 1. Loop waits.
                                                // So if length is idx + 1, that step is "done" effectively in my previous logic, but here "isCurrent" means "processing".
                                                
                                                // Let's fix the loop logic in handleStartExecution instead to be cleaner?
                                                // Or rely on: if log has this item, show it.
                                                // To support typewriter, we need to show the item *as* it is added.
                                                
                                                const isVisible = executionLog.length > idx;
                                                const isLatest = executionLog.length === idx + 1;

                                                if (!isVisible) return (
                                                    <motion.div 
                                                        key={idx}
                                                        initial={{ opacity: 0.3 }}
                                                        className="flex items-start gap-4 relative opacity-30 blur-[1px]"
                                                    >
                                                        <div className="w-10 h-10 rounded-full border border-white/5 bg-zinc-900 flex items-center justify-center shrink-0 z-10">
                                                            <div className="w-2 h-2 bg-zinc-700 rounded-full" />
                                                        </div>
                                                        <div className="pt-1.5">
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Step {idx + 1}</h4>
                                                            <p className="text-sm text-zinc-500 font-mono">Pending...</p>
                                                        </div>
                                                    </motion.div>
                                                );

                                                return (
                                                    <motion.div 
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="flex items-start gap-4 relative"
                                                    >
                                                        {/* Status Dot */}
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${
                                                            isLatest ? 'scale-110 shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'scale-100'
                                                        }`}>
                                                            {isLatest ? (
                                                                <div className="relative w-10 h-10 flex items-center justify-center">
                                                                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping" />
                                                                    <div className="relative w-4 h-4 bg-indigo-500 rounded-full shadow-lg" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                                                                     <CheckCircle2 className="h-3 w-3 text-white" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Text */}
                                                        <div className="flex-1 pt-1.5">
                                                            <div className="flex items-center justify-between mb-0.5">
                                                                <h4 className={`text-xs font-bold uppercase tracking-wider ${isLatest ? 'text-indigo-400' : 'text-emerald-400'}`}>
                                                                    Step {idx + 1}
                                                                </h4>
                                                                {isLatest && (
                                                                    <span className="text-[10px] text-indigo-400/70 font-mono animate-pulse">Running...</span>
                                                                )}
                                                            </div>
                                                            
                                                            {/* Typewriter Description */}
                                                            <p className="text-sm font-mono leading-snug break-words">
                                                                {isLatest ? (
                                                                    <TypewriterText text={step} />
                                                                ) : (
                                                                    <span className="text-zinc-300">{step}</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                )
                                            })}
                                       </div>
                                   </div>
                               )}
                            </div>

                            {/* Footer Controls - Sleek Glass */}
                            <div className="p-4 border-t border-white/5 bg-zinc-900/60 backdrop-blur-xl shrink-0 z-20">
                                {executionState === 'plan' ? (
                                    <button 
                                        onClick={handleStartExecution}
                                        className="relative w-full py-3 rounded-lg bg-white text-black font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-white to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative flex items-center justify-center gap-2">
                                            Start Sequence <Zap className="h-3.5 w-3.5 fill-current" />
                                        </span>
                                    </button>
                                ) : executionState === 'success' ? (
                                    <button 
                                        onClick={handleCloseExecution}
                                        className="w-full py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-sm font-medium border border-white/5 transition-colors"
                                    >
                                        Done
                                    </button>
                                ) : (
                                    <div className="w-full h-10 rounded-lg border border-white/5 bg-zinc-800/50 flex items-center justify-center gap-2 text-xs text-zinc-400 font-mono">
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                                        <span>EXECUTING SEQUENCE...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                    )
                    )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

