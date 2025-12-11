"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Command, X, ArrowRight, 
  LayoutGrid, Play, BrainCircuit, FileText 
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

interface SearchPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchResult = {
    id: string;
    type: "NAV" | "ACTION" | "INSIGHT";
    title: string;
    description: string;
    href?: string;
    icon: any;
    color: string;
};

export function SearchPalette({ isOpen, onClose }: SearchPaletteProps) {
  const [query, setQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape") onClose();
         if ((e.metaKey || e.ctrlKey) && e.key === "k") {
             e.preventDefault();
             onClose(); // Toggle handled by parent usually, but here we just ensure close safety
         }
     };
     window.addEventListener("keydown", handleKeyDown);
     return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Simulated Semantic Search Logic
  useEffect(() => {
      if (!query) {
          setResults([]);
          return;
      }

      setIsThinking(true);
      const timer = setTimeout(() => {
          setIsThinking(false);
          
          const q = query.toLowerCase();
          const mockResults: SearchResult[] = [];

          // 1. Navigation Matches
          if (q.includes("service") || q.includes("pay") || q.includes("user")) {
              mockResults.push({
                  id: "nav-1",
                  type: "NAV",
                  title: "Payment Service",
                  description: "Go to service details",
                  href: "/services",
                  icon: LayoutGrid,
                  color: "text-indigo-400"
              });
          }
           if (q.includes("inc") || q.includes("alert")) {
              mockResults.push({
                  id: "nav-2",
                  type: "NAV",
                  title: "Incidents Dashboard",
                  description: "View active alerts",
                  href: "/incidents",
                  icon: FileText,
                  color: "text-rose-400"
              });
          }

          // 2. Action Matches
          if (q.includes("rep") || q.includes("month") || q.includes("gen")) {
              mockResults.push({
                  id: "act-1",
                  type: "ACTION",
                  title: "Generate Monthly Report",
                  description: "Run cost analysis workflow",
                  icon: Play,
                  color: "text-emerald-400"
              });
          }

          // 3. AI Graphic / Insight Matches (Default fallback if semantic match)
          if (q.includes("cost") || q.includes("opt") || q.includes("why")) {
              mockResults.push({
                   id: "ai-1",
                   type: "INSIGHT",
                   title: "AI Analysis: Cost Anomaly",
                   description: "Analyze recent spikes in production.",
                   icon: BrainCircuit,
                   color: "text-fuchsia-400"
              });
          }
          
          setResults(mockResults);

      }, 600); // Simulated delay for "Thinking"

      return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
      onClose();
      if (result.href) {
          router.push(result.href);
      }
      // Action/Insight handlers would be here
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="absolute inset-0 bg-black/60 backdrop-blur-md"
           />

           {/* Modal */}
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: -20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: -20 }}
             transition={{ duration: 0.2 }}
             className="relative w-full max-w-2xl"
           >
              <GlassCard className="p-0 overflow-hidden border-white/10 shadow-2xl shadow-fuchsia-900/10 bg-black/80 backdrop-blur-xl ring-1 ring-white/10">
                  {/* Search Header */}
                  <div className="flex items-center px-4 py-4 border-b border-white/5 space-x-3">
                      <Search className="h-5 w-5 text-zinc-500" />
                      <input 
                         ref={inputRef}
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         placeholder="Ask anything or search for resources..."
                         className="flex-1 bg-transparent border-none text-lg text-white placeholder:text-zinc-600 focus:outline-none"
                      />
                      <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors text-zinc-500">
                          <Badge variant="outline" className="text-xs bg-zinc-900 border-zinc-700 text-zinc-400">ESC</Badge>
                      </button>
                  </div>

                  {/* Body */}
                  <div className="min-h-[100px] max-h-[60vh] overflow-y-auto p-2">
                       {/* Default State: Recent Searches */}
                       {!query && (
                           <div className="space-y-4 pt-2">
                               <div className="px-2">
                                   <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Recent</h5>
                                   <div className="space-y-1">
                                       {[
                                           { 
                                               id: "recent-1",
                                               title: "Production Database Latency", 
                                               description: "AI Analysis of recent spikes",
                                               type: "INSIGHT", 
                                               icon: BrainCircuit, 
                                               color: "text-fuchsia-400" 
                                           },
                                           { 
                                               id: "recent-2",
                                               title: "Generate Monthly Report", 
                                               description: "Run cost analysis workflow",
                                               type: "ACTION", 
                                               icon: FileText, 
                                               color: "text-emerald-400" 
                                           },
                                           { 
                                               id: "recent-3",
                                               title: "Payment Service", 
                                               description: "Go to service details",
                                               type: "NAV", 
                                               href: "/services",
                                               icon: LayoutGrid, 
                                               color: "text-indigo-400" 
                                           }
                                       ].map((result: any) => {
                                           const Icon = result.icon;
                                           return (
                                               <button
                                                 key={result.id}
                                                 onClick={() => handleSelect(result)}
                                                 className="w-full text-left flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/result"
                                               >
                                                   <div className={`mt-0.5 h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center ring-1 ring-white/5 group-hover/result:ring-${result.color.split('-')[1]}-500/50 transition-all`}>
                                                       <Icon className={`h-4 w-4 ${result.color}`} />
                                                   </div>
                                                   <div className="flex-1">
                                                       <div className="flex items-center justify-between">
                                                           <h4 className="text-sm font-medium text-white group-hover/result:text-fuchsia-300 transition-colors">
                                                               {result.title}
                                                           </h4>
                                                           <span className="text-[10px] text-zinc-600 font-mono border border-white/5 px-1.5 rounded">{result.type}</span>
                                                       </div>
                                                       <p className="text-xs text-zinc-500 line-clamp-1">{result.description}</p>
                                                   </div>
                                                   <ArrowRight className="h-4 w-4 text-zinc-600 opacity-0 group-hover/result:opacity-100 -translate-x-2 group-hover/result:translate-x-0 transition-all" />
                                               </button>
                                           )
                                       })}
                                   </div>
                               </div>
                               
                               <div className="px-2 pt-2 border-t border-white/5">
                                   <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Suggested Actions</h5>
                                   <div className="flex gap-2 flex-wrap">
                                       {["Analyze EC2 Costs", "Check Incidents", "Deploy to Staging"].map((action, i) => (
                                           <button 
                                             key={i} 
                                             onClick={() => setQuery(action)}
                                             className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all"
                                           >
                                               {action}
                                           </button>
                                       ))}
                                   </div>
                               </div>
                           </div>
                       )}

                       {/* Loading / Thinking State */}
                       {isThinking && (
                           <div className="py-8 flex flex-col items-center justify-center space-y-3">
                               <motion.div 
                                 animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                 className="h-8 w-8 rounded-full border-2 border-fuchsia-500/30 border-t-fuchsia-500"
                               />
                               <motion.p 
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 className="text-xs text-fuchsia-400 font-mono tracking-wider"
                               >
                                   ANALYZING CONTEXT...
                               </motion.p>
                           </div>
                       )}

                       {/* Results */}
                       {!isThinking && query && results.length > 0 && (
                           <div className="space-y-1">
                               <p className="px-3 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">Top Results</p>
                               {results.map((result) => {
                                   const Icon = result.icon;
                                   return (
                                       <button
                                         key={result.id}
                                         onClick={() => handleSelect(result)}
                                         className="w-full text-left flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group/result"
                                       >
                                           <div className={`mt-0.5 h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center ring-1 ring-white/5 group-hover/result:ring-${result.color.split('-')[1]}-500/50 transition-all`}>
                                               <Icon className={`h-4 w-4 ${result.color}`} />
                                           </div>
                                           <div className="flex-1">
                                               <div className="flex items-center justify-between">
                                                   <h4 className="text-sm font-medium text-white group-hover/result:text-fuchsia-300 transition-colors">
                                                       {result.title}
                                                   </h4>
                                                   {result.type === 'INSIGHT' && (
                                                       <Badge variant="outline" className="bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30 text-[10px] px-1.5 py-0 border">
                                                           AI Agent
                                                       </Badge>
                                                   )}
                                                   {result.type === 'ACTION' && (
                                                       <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0 border">
                                                           Workflow
                                                       </Badge>
                                                   )}
                                               </div>
                                               <p className="text-xs text-zinc-500 line-clamp-1">{result.description}</p>
                                           </div>
                                           <ArrowRight className="h-4 w-4 text-zinc-600 opacity-0 group-hover/result:opacity-100 -translate-x-2 group-hover/result:translate-x-0 transition-all" />
                                       </button>
                                   )
                               })}
                           </div>
                       )}
                       
                       {!isThinking && query && results.length === 0 && (
                           <div className="py-8 text-center text-zinc-500">
                               <p className="text-sm">No semantic matches found for "{query}"</p>
                           </div>
                       )}

                  </div>
                  
                  {/* Footer */}
                  <div className="bg-white/5 px-4 py-2 border-t border-white/5 flex justify-between items-center text-[10px] text-zinc-500">
                      <div className="flex gap-4">
                          <span><strong className="text-zinc-400">Enter</strong> to select</span>
                          <span><strong className="text-zinc-400">↑↓</strong> to navigate</span>
                      </div>
                      <div className="flex items-center gap-1.5 opacity-50">
                          <BrainCircuit className="h-3 w-3" />
                          Semantic Search Active
                      </div>
                  </div>
              </GlassCard>
           </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
