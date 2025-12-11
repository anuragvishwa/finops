"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Server, ShieldCheck, AlertTriangle, GitBranch, Terminal, Globe, Cpu, Database } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Service, teams } from "@/lib/mock-data";
import { useState, useEffect } from "react";

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onNavigate?: (id: string) => void;
  layoutId?: string;
}

// Mock extra data for the modal
const MOCK_DEPENDENCIES = [
    { id: "svc-auth", name: "auth-service", type: "service", status: "healthy", costImpact: "$240/mo", latency: "12ms" },
    { id: "svc-gateway", name: "api-gateway", type: "gateway", status: "healthy", costImpact: "$850/mo", latency: "5ms" },
    { id: "svc-audit", name: "audit-logger", type: "queue", status: "warning", costImpact: "$1.2k/mo", latency: "45ms" },
    { id: "svc-db", name: "user-db", type: "db", status: "healthy", costImpact: "$3.4k/mo", latency: "2ms" },
];

const INITIAL_POSITIONS = {
    "center": { x: 350, y: 200 },
    "svc-auth": { x: 200, y: 50 },
    "svc-gateway": { x: 500, y: 50 },
    "svc-audit": { x: 200, y: 350 },
    "svc-db": { x: 500, y: 350 },
};

function DependencyGraph({ service, onNavigate }: { service: Service, onNavigate?: (id: string) => void }) {
    const [positions, setPositions] = useState(INITIAL_POSITIONS);
    
    const updatePosition = (id: string, x: number, y: number) => {
        setPositions(prev => ({
            ...prev,
            [id]: { x, y }
        }));
    };

    return (
        <div className="relative w-full h-[500px] border border-white/5 rounded-3xl bg-black/20 overflow-visible touch-none">
             {/* Background Grid */}
             <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950/0 to-zinc-950/0" />

             {/* Dynamic Edges (SVG) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" fillOpacity="0.5" />
                    </marker>
                </defs>
                
                {/* Lines from Upstream to Center */}
                {MOCK_DEPENDENCIES.slice(0,2).map(dep => (
                    <CurvedEdge 
                        key={`edge-${dep.id}`} 
                        start={positions[dep.id as keyof typeof positions]} 
                        end={positions.center} 
                    />
                ))}

                {/* Lines from Center to Downstream */}
                {MOCK_DEPENDENCIES.slice(2).map(dep => (
                    <CurvedEdge 
                        key={`edge-${dep.id}`} 
                        start={positions.center} 
                        end={positions[dep.id as keyof typeof positions]} 
                    />
                ))}
             </svg>

             {/* Nodes */}
             {MOCK_DEPENDENCIES.slice(0,2).map(dep => (
                <DraggableNode 
                    key={dep.id} 
                    id={dep.id}
                    data={dep} 
                    initialPos={INITIAL_POSITIONS[dep.id as keyof typeof INITIAL_POSITIONS]} 
                    onDrag={updatePosition}
                    onNavigate={onNavigate}
                />
             ))}

             {/* Center Node */}
             <DraggableNode
                id="center"
                data={{ name: service.name, type: 'target', costImpact: `$${service.monthlyCost.toLocaleString()}`, status: 'healthy' }}
                initialPos={INITIAL_POSITIONS.center}
                onDrag={updatePosition}
                isTarget
                serviceType={service.language}
             />

             {MOCK_DEPENDENCIES.slice(2).map(dep => (
                <DraggableNode 
                    key={dep.id} 
                    id={dep.id}
                    data={dep} 
                    initialPos={INITIAL_POSITIONS[dep.id as keyof typeof INITIAL_POSITIONS]} 
                    onDrag={updatePosition}
                    onNavigate={onNavigate}
                />
             ))}
        </div>
    );
}

function CurvedEdge({ start, end }: { start: {x:number, y:number}, end: {x:number, y:number} }) {
    // Calculate control points for a nice bezier curve
    const midY = (start.y + end.y) / 2;
    const path = `M ${start.x + 40} ${start.y + 40} C ${start.x + 40} ${midY}, ${end.x + 40} ${midY}, ${end.x + 40} ${end.y + 40}`;

    return (
        <g>
            <motion.path 
                d={path}
                stroke="url(#line-gradient)"
                strokeWidth="2"
                fill="none"
                className="text-indigo-500/30"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1 }}
            />
            <path d={path} stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" fill="none" className="opacity-30" markerEnd="url(#arrowhead)" />
        </g>
    );
}

function DraggableNode({ id, data, initialPos, onDrag, isTarget, serviceType, onNavigate }: any) {
    return (
        <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onTap={() => {
                if (!isTarget && onNavigate) {
                    onNavigate(id);
                }
            }}
            onDrag={(event, info) => {
                 // We don't strictly need to track exact pixels for the lines to look "okay" if we just used ref-based lines, 
                 // but for true SVG connection we need state. 
                 // However, framer motion drag changes the transform, not the layout.
                 // To make lines follow, we'd need to sync layout or use a Ref constraint.
                 // SIMPLIFICATION: We will update the PARENT state with the new center point.
                 // But `info.point` is global. `info.offset` is relative.
                 // Ideally we use `x` and `y` motion values.
                 // For this "Kickass" UI, let's just assume the user drags it and we update state occasionally or on every frame if fast enough.
                 // Actually, best way in simple React is:
            }}
            onDragEnd={(e, info) => {
                // Update final position to snap lines (if we weren't updating in realtime)
                // But user wants realtime.
            }}
            // Force state update on drag for lines
            onUpdate={(latest) => {
                 if (latest.x !== undefined && latest.y !== undefined) {
                     // This returns the offset from initial.
                     onDrag(id, initialPos.x + (latest.x as number), initialPos.y + (latest.y as number));
                 }
            }}
            style={{ x: 0, y: 0 }} // Start at 0 offset, positioned via absolute
            className={`absolute flex flex-col items-center cursor-move active:cursor-grabbing touch-none z-${isTarget ? '50' : '20'}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, left: initialPos.x, top: initialPos.y }}
        >
             <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-xl backdrop-blur-md ${
                isTarget
                ? 'bg-zinc-900/90 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]'
                : data.status === 'warning'
                    ? 'bg-amber-950/40 border-amber-500/50' 
                    : 'bg-zinc-900/80 border-zinc-700 hover:border-indigo-500/50'
            }`}>
                {isTarget ? (
                     serviceType === 'python' ? <Cpu className="h-8 w-8 text-indigo-400" /> :
                     serviceType === 'go' ? <Terminal className="h-8 w-8 text-cyan-400" /> :
                     <Server className="h-8 w-8 text-indigo-400" />
                ) : (
                    <>
                        {data.type === 'service' && <Globe className="h-8 w-8 text-zinc-400" />}
                        {data.type === 'gateway' && <GitBranch className="h-8 w-8 text-pink-400" />}
                        {data.type === 'queue' && <Activity className={`h-8 w-8 ${data.status === 'warning' ? 'text-amber-500' : 'text-blue-400'}`} />}
                        {data.type === 'db' && <Database className="h-8 w-8 text-emerald-400" />}
                    </>
                )}
                
                {/* Cost Badge */}
                 <div className={`absolute -bottom-3 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap border z-20 ${
                    isTarget 
                        ? 'bg-indigo-600 text-white border-white/20' 
                        : data.status === 'warning'
                            ? 'bg-amber-500 text-black border-amber-400'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                 }`}>
                    {data.costImpact}
                </div>
            </div>
            
             <div className="mt-4 text-center pointer-events-none">
                <p className={`text-xs font-bold leading-tight ${isTarget ? 'text-white text-sm' : 'text-zinc-300'}`}>{data.name}</p>
                {!isTarget && <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{data.latency}</p>}
            </div>
        </motion.div>
    )
}

const MOCK_LOGS = [
    { ts: "10:42:01", level: "info", msg: "Request processed in 45ms" },
    { ts: "10:42:05", level: "info", msg: "Cache hit for key user:1293" },
    { ts: "10:42:12", level: "warn", msg: "Retry attempt 1 for downstream-1" },
    { ts: "10:42:15", level: "info", msg: "Health check passed" },
    { ts: "10:42:28", level: "error", msg: "Connection timeout to audit-logger" },
];

export function ServiceDetailModal({ service, onClose, onNavigate, layoutId }: ServiceDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "dependencies" | "logs">("overview");
  const [isScanning, setIsScanning] = useState(true);

  // Reset scan on open
  useEffect(() => {
    if (service) {
        setIsScanning(true);
        const timer = setTimeout(() => setIsScanning(false), 1500);
        return () => clearTimeout(timer);
    }
  }, [service]);

  if (!service) return null;

  const team = teams.find(t => t.id === service.teamId);

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              layoutId={layoutId}
              className="w-full max-w-3xl pointer-events-auto"
            >
              <GlassCard 
                 className="shadow-2xl bg-zinc-950/90 border-white/10 relative min-h-[600px] flex flex-col" 
                 noPadding
              >
                  {/* Header */}
                  <div className="p-6 border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl relative overflow-hidden">
                        {/* Scanning beam execution */}
                        <AnimatePresence>
                        {isScanning && (
                            <motion.div 
                                initial={{ x: "-100%" }}
                                animate={{ x: "200%" }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent z-0 pointer-events-none"
                            />
                        )}
                        </AnimatePresence>

                        <div className="relative z-10 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg ${
                                    service.tier === 'tier-1' ? 'bg-indigo-500/10' : 'bg-zinc-800'
                                }`}>
                                   {service.language === 'python' ? <Cpu className="h-8 w-8 text-indigo-400" /> :
                                    service.language === 'go' ? <Terminal className="h-8 w-8 text-cyan-400" /> :
                                    <Server className="h-8 w-8 text-emerald-400" />}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                        {service.name}
                                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                                            {service.tier.toUpperCase()}
                                        </Badge>
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-zinc-400 mt-1">
                                        <span className="font-mono">{service.id}</span>
                                        <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                                        <span className="flex items-center gap-1.5">
                                            <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
                                            {isScanning ? 'Scanning...' : 'Operational'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-6 mt-8 relative z-10">
                            {['overview', 'dependencies', 'logs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`pb-3 text-sm font-medium transition-all relative ${
                                        activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    {activeTab === tab && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                  </div>

                  {/* Body */}
                  <div className="flex-1 bg-zinc-950/50 p-6 relative overflow-y-auto">
                        {/* Background Grid */}
                        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />

                        <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                                <motion.div
                                    key="overview"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="relative z-10 space-y-6"
                                >
                                    {/* Key Metrics */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Monthly Cost</p>
                                            <p className="text-2xl font-bold text-white">${service.monthlyCost.toLocaleString()}</p>
                                            <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                                                <TrendingDownIcon className="h-3 w-3" />
                                                2.4% vs last month
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Service Health</p>
                                            <p className="text-2xl font-bold text-emerald-400">99.98%</p>
                                            <div className="mt-2 text-xs text-zinc-500">
                                                Uptime (30d)
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Incidents</p>
                                            <p className={`text-2xl font-bold ${service.incidentsLast30d > 0 ? 'text-rose-400' : 'text-zinc-300'}`}>
                                                {service.incidentsLast30d}
                                            </p>
                                            <div className="mt-2 text-xs text-zinc-500">
                                                Last 30 days
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Team & Context */}
                                    <div className="p-5 rounded-xl bg-zinc-900/30 border border-white/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Owning Team</p>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${team?.avatarColor}`}>
                                                    {team?.name.substring(0,2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{team?.name}</p>
                                                    <p className="text-xs text-indigo-400">#{team?.slackChannel.replace('#','')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Environment</p>
                                            <Badge variant="outline" className="border-indigo-500/20 bg-indigo-500/10 text-indigo-300">
                                                {service.environment.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            
                            {activeTab === 'dependencies' && (
                                <motion.div
                                    key="dependencies"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="relative z-10 h-full min-h-[400px] flex items-center justify-center"
                                >
                                    <DependencyGraph service={service} onNavigate={onNavigate} />
                                </motion.div>
                            )}

                            {activeTab === 'logs' && (
                                <motion.div
                                    key="logs"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="relative z-10 space-y-2 font-mono text-sm"
                                >
                                    {MOCK_LOGS.map((log, i) => (
                                        <div key={i} className="flex items-start gap-4 p-3 rounded bg-black/40 border border-white/5 hover:bg-black/60 transition-colors">
                                            <span className="text-zinc-500 shrink-0">{log.ts}</span>
                                            <span className={`shrink-0 w-16 uppercase text-[10px] font-bold tracking-wider ${
                                                log.level === 'info' ? 'text-blue-400' :
                                                log.level === 'warn' ? 'text-amber-400' : 'text-rose-400'
                                            }`}>
                                                [{log.level}]
                                            </span>
                                            <span className="text-zinc-300">{log.msg}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                  </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function TrendingDownIcon(props: any) {
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
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
    )
}
