"use client";

import { Bell, Search, User } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 mb-8 flex items-center justify-between py-4 backdrop-blur-none">
      <div className="flex items-center space-x-4">
        <GlassCard 
          noPadding 
          className="flex items-center px-4 py-2"
        >
          <span className="mr-2 text-sm font-medium text-slate-400">Range:</span>
          <select className="bg-transparent text-sm font-semibold text-white focus:outline-none">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
          </select>
        </GlassCard>
        
         <GlassCard 
          noPadding 
          className="flex items-center px-4 py-2"
        >
          <span className="mr-2 text-sm font-medium text-slate-400">Environment:</span>
          <div className="flex space-x-1">
             <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/30">Prod</span>
             <span className="rounded bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-400 hover:text-white cursor-pointer transition-colors">Staging</span>
          </div>
        </GlassCard>
      </div>

      <div className="flex items-center space-x-4">
         <div className="relative group">
           <Search className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors cursor-pointer" />
         </div>
         
         <div className="relative">
           <Bell className="h-5 w-5 text-slate-400 hover:text-white transition-colors cursor-pointer" />
           <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
           </span>
         </div>
         
         <div className="h-6 w-px bg-white/10 mx-2" />
         
         <div className="flex items-center space-x-3 cursor-pointer">
           <div className="text-right hidden md:block">
             <p className="text-sm font-medium text-white">Anurag V.</p>
             <p className="text-xs text-slate-400">Admin</p>
           </div>
           <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[2px]">
             <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                <User className="h-5 w-5 text-slate-200" />
             </div>
           </div>
         </div>
      </div>
    </header>
  );
}
