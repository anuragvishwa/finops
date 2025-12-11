"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, Filter, PieChart, ShieldCheck, Activity, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("generate");
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Reports Center
          </h2>
          <p className="text-zinc-400">
            Generate insights, audit logs, and compliance statements.
          </p>
        </div>
        <div className="flex items-center space-x-3">
             <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors text-sm font-medium text-white">
                <Calendar className="h-4 w-4 text-zinc-400" />
                <span>Scheduled Reports</span>
             </button>
        </div>
      </div>

      {/* Quick Generate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickReportCard 
            title="Cost Analysis"
            description="Detailed breakdown of cloud spend by service, team, and tag for the last 30 days."
            icon={PieChart}
            color="indigo"
            delay={0}
        />
        <QuickReportCard 
            title="Compliance Audit"
            description="Security posture, role access logs, and policy violation summary."
            icon={ShieldCheck}
            color="emerald"
            delay={0.1}
        />
        <QuickReportCard 
            title="Performance Review"
            description="Resource utilization, latency trends, and incident impact analysis."
            icon={Activity}
            color="rose"
            delay={0.2}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Custom Builder */}
          <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Filter className="h-5 w-5 text-fuchsia-500" />
                 Custom Report Builder
              </h3>
              
              <GlassCard className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Report Type</label>
                          <select className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                              <option>Cost & Usage</option>
                              <option>Incident History</option>
                              <option>Resource Inventory</option>
                              <option>Team Chargeback</option>
                          </select>
                      </div>
                      
                      <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Format</label>
                          <div className="flex gap-2">
                              {['PDF', 'CSV', 'JSON'].map((fmt) => (
                                  <button key={fmt} className="flex-1 py-2.5 rounded-lg border border-white/5 bg-zinc-900/30 hover:bg-zinc-800 text-sm font-medium text-zinc-300 hover:text-white transition-all focus:ring-1 ring-indigo-500">
                                      {fmt}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date Range</label>
                          <div className="relative">
                            <select className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                                <option>Last 30 Days</option>
                                <option>Last Quarter (Q3)</option>
                                <option>Year to Date</option>
                                <option>Custom Range</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-zinc-500 pointer-events-none" />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Team Filter</label>
                          <div className="relative">
                             <select className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                                <option>All Teams</option>
                                <option>AI Platform</option>
                                <option>Core Data</option>
                                <option>Commerce</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-zinc-500 pointer-events-none" />
                          </div>
                      </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-end">
                      <button className="flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all">
                          <FileText className="h-4 w-4" />
                          <span>Generate Report</span>
                      </button>
                  </div>
              </GlassCard>
          </div>

          {/* Recent History */}
          <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Download className="h-5 w-5 text-emerald-500" />
                 Recent Downloads
              </h3>

              <div className="space-y-3">
                  {RECENT_REPORTS.map((report, i) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                      >
                          <GlassCard variant="hover" className="p-4 group cursor-pointer">
                              <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                      <div className="p-1.5 rounded bg-zinc-800 text-zinc-400">
                                          {report.type === 'pdf' ? <FileText className="h-4 w-4" /> : <div className="text-[10px] font-bold font-mono">CSV</div>}
                                      </div>
                                      <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">{report.name}</span>
                                  </div>
                                  <Badge variant="outline" className="text-[10px] border-white/5 bg-white/5 text-zinc-500">
                                      {report.size}
                                  </Badge>
                              </div>
                              <div className="flex items-center justify-between mt-2 pl-9">
                                  <span className="text-xs text-zinc-500">{report.date}</span>
                                  <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                      Download <Download className="h-3 w-3" />
                                  </button>
                              </div>
                          </GlassCard>
                      </motion.div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
}

function QuickReportCard({ title, description, icon: Icon, color, delay }: any) {
    const colorStyles = {
        indigo: "text-indigo-400 group-hover:text-indigo-300 bg-indigo-500/10 border-indigo-500/20 group-hover:border-indigo-500/40",
        emerald: "text-emerald-400 group-hover:text-emerald-300 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40",
        rose: "text-rose-400 group-hover:text-rose-300 bg-rose-500/10 border-rose-500/20 group-hover:border-rose-500/40"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <GlassCard variant="hover" className="h-full p-6 flex flex-col group cursor-pointer relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-20 bg-gradient-to-br from-${color}-500/10 to-transparent blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:opacity-100 transition-opacity opacity-50`} />
                
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-colors ${colorStyles[color as keyof typeof colorStyles]}`}>
                    <Icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">{title}</h3>
                <p className="text-sm text-zinc-400 mb-6 flex-1">{description}</p>
                
                <div className="flex items-center text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    Generate Now <Check className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-400" />
                </div>
            </GlassCard>
        </motion.div>
    );
}

const RECENT_REPORTS = [
    { id: 1, name: "Nov 2025 Cost Summary", date: "Dec 1, 2025", type: "pdf", size: "2.4 MB" },
    { id: 2, name: "Q3 Compliance Audit", date: "Nov 28, 2025", type: "csv", size: "145 KB" },
    { id: 3, name: "Incident Post-mortem (ID-392)", date: "Nov 25, 2025", type: "pdf", size: "850 KB" },
    { id: 4, name: "Resource Inventory Dump", date: "Nov 20, 2025", type: "json", size: "4.2 MB" },
];
