"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ArrowDownRight, PieChart, Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { StatDetail } from "@/lib/mock-data";

interface StatModalProps {
  stat: StatDetail | null;
  onClose: () => void;
  layoutId?: string;
}

export function StatModal({ stat, onClose, layoutId }: StatModalProps) {
  return (
    <AnimatePresence>
      {stat && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            
            {/* The Magic Card */}
            <motion.div
              layoutId={layoutId}
              className="w-full max-w-lg pointer-events-auto"
            >
              <GlassCard 
                 className="overflow-hidden shadow-2xl bg-zinc-900/90 border-white/10" 
                 noPadding
                 initial={{ opacity: 1, y: 0 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0 }}
              >
                
                {/* Header Content */}
                <div className="p-6 border-b border-white/5 relative">
                  <div className="flex items-start justify-between">
                     <div>
                        <motion.p layoutId={`subtitle-${stat.id}`} className="text-sm font-medium text-zinc-400 mb-1">
                            {stat.title}
                        </motion.p>
                        <motion.h2 layoutId={`value-${stat.id}`} className="text-3xl font-bold text-white leading-tight mb-2">
                          {stat.value}
                        </motion.h2>
                        
                        {stat.trend && (
                            <div className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                              stat.trend === "up" 
                                ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            }`}>
                              {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                              {stat.trendValue}
                            </div>
                        )}
                     </div>
                     <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <X className="h-5 w-5 text-zinc-400" />
                     </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                  
                  {/* Breakdown Section */}
                  <div>
                      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center">
                          <PieChart className="h-3 w-3 mr-2" /> Breakdown
                      </h3>
                      <div className="space-y-3">
                          {stat.breakdown.map((item, i) => (
                              <div key={i} className="flex items-center justify-between group">
                                  <div className="flex items-center space-x-3">
                                      <div className={`h-2 w-2 rounded-full ${item.color} shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{item.label}</span>
                                  </div>
                                  <span className="text-sm font-medium text-white font-mono">{item.value}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Insights Section */}
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                      <h3 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2 flex items-center">
                          <Lightbulb className="h-3 w-3 mr-2" /> AI Insights
                      </h3>
                      <ul className="space-y-2">
                          {stat.insights.map((insight, i) => (
                              <li key={i} className="text-sm text-zinc-300 flex items-start">
                                  <span className="mr-2 text-indigo-500">•</span> {insight}
                              </li>
                          ))}
                      </ul>
                  </div>

                  <button className="w-full py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium text-white transition-all hover:scale-[1.01] active:scale-[0.99]">
                      {stat.actionLabel}
                  </button>

                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
