"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { X, Layers, Box, Cpu } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CostDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const namespaceData = [
  { name: "default", value: 45000 },
  { name: "kube-system", value: 12000 },
  { name: "ai-workloads", value: 38000 },
  { name: "monitoring", value: 8500 },
  { name: "staging", value: 5200 },
];

const podData = [
  { name: "llm-inf-7x", value: 12500 },
  { name: "llm-inf-8x", value: 11200 },
  { name: "vector-db-0", value: 8400 },
  { name: "api-gateway-1", value: 3200 },
  { name: "frontend-55", value: 1800 },
];

const resourceData = [
  { name: "GPU (A100)", value: 42000 },
  { name: "CPU (m5)", value: 24000 },
  { name: "RAM", value: 11000 },
  { name: "Storage (EBS)", value: 8500 },
  { name: "Network", value: 4500 },
];

export function CostDetailsModal({ isOpen, onClose }: CostDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<"namespace" | "pod" | "resource">("namespace");

  if (!isOpen) return null;

  const renderChart = (data: any[], color: string) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
        <XAxis type="number" stroke="#52525b" fontSize={10} tickFormatter={(val) => `$${val/1000}k`} />
        <YAxis type="category" dataKey="name" stroke="#a1a1aa" fontSize={11} width={80} tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #27272a', color: '#fff' }}
          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={color} fillOpacity={0.8} />
            ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <AnimatePresence>
      {isOpen && (
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl pointer-events-auto"
            >
              <GlassCard className="overflow-hidden flex flex-col max-h-[85vh]" noPadding>
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">Cost Breakdown</h2>
                        <p className="text-sm text-zinc-400">Detailed spend analysis across infrastructure layers</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors">
                        <X className="h-5 w-5 text-zinc-400" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/5">
                    <button 
                        onClick={() => setActiveTab("namespace")}
                        className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'namespace' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                    >
                        <Layers className="h-4 w-4" /> Namespace
                    </button>
                    <button 
                        onClick={() => setActiveTab("pod")}
                        className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'pod' ? 'border-fuchsia-500 text-white bg-white/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                    >
                        <Box className="h-4 w-4" /> Workload (Pod)
                    </button>
                    <button 
                        onClick={() => setActiveTab("resource")}
                        className={`flex-1 py-4 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'resource' ? 'border-emerald-500 text-white bg-white/5' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                    >
                        <Cpu className="h-4 w-4" /> Resource Type
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 bg-zinc-900/40">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="text-sm font-semibold text-zinc-300 mb-6 uppercase tracking-wider">
                                Top 5 Items by Cost (Last 30 Days)
                            </h3>
                            {activeTab === 'namespace' && renderChart(namespaceData, '#6366f1')}
                            {activeTab === 'pod' && renderChart(podData, '#d946ef')}
                            {activeTab === 'resource' && renderChart(resourceData, '#10b981')}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="p-4 bg-zinc-900/60 border-t border-white/5 text-center">
                    <p className="text-xs text-zinc-500">Data updated 15 minutes ago. Costs are estimated based on public pricing.</p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
