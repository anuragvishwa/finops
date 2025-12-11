"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Calculator, 
  Server, 
  FileText, 
  Settings,
  Zap,
  ChevronDown,
  TrendingDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Cost Incidents", href: "/incidents", icon: AlertTriangle },
  { name: "What-if Simulator", href: "/what-if", icon: Calculator },
  { name: "Services & Teams", href: "/services", icon: Server },
  { name: "Savings", href: "/savings", icon: TrendingDown },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-black/95 backdrop-blur-3xl transition-transform">
      {/* Subtle Gradient Accent - Top Left */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-fuchsia-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle Gradient Accent - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex h-full flex-col px-4 py-6 relative z-10">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center space-x-3 px-2 group cursor-pointer">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10 shadow-lg shadow-black/50">
             <div className="absolute inset-0 rounded-xl bg-fuchsia-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Zap className="h-5 w-5 text-white relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">Lumniverse</h1>
            <p className="text-[10px] font-medium text-zinc-500 tracking-wide mt-1">FinOps tech.</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group relative flex items-center px-4 py-3 text-sm font-medium transition-colors outline-none"
                onMouseEnter={() => setHoveredPath(item.href)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {/* Hover Spotlight */}
                {hoveredPath === item.href && (
                  <motion.div
                    layoutId="hover-spotlight"
                    className="absolute inset-0 rounded-xl bg-zinc-800/50 border border-white/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                {/* Active Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-indigo-500/10 border border-fuchsia-500/20 shadow-[0_0_20px_rgba(217,70,239,0.1)]"
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div className="relative z-10 flex items-center w-full">
                   <Icon 
                     className={cn(
                       "mr-3 h-5 w-5 transition-all duration-300",
                       isActive 
                         ? "text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" 
                         : "text-zinc-500 group-hover:text-zinc-300"
                     )} 
                   />
                   <span className={cn(
                     "transition-colors duration-300",
                     isActive ? "text-white font-semibold" : "text-zinc-400 group-hover:text-zinc-200"
                   )}>
                     {item.name}
                   </span>
                   
                   {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_6px_rgba(217,70,239,0.8)]"
                      />
                   )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Workspace Selector */}
        <div className="mt-auto pt-6 border-t border-white/5">
           <button className="flex w-full items-center justify-between rounded-xl bg-zinc-900/0 hover:bg-zinc-900/40 p-2 transition-all group">
             <div className="flex items-center">
               <div className="mr-3 h-8 w-8 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-colors shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-xs font-bold text-white relative z-10">L</span>
               </div>
               <div className="text-left">
                 <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">Deep Dive</p>
                 <p className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                    Production
                 </p>
               </div>
             </div>
             <ChevronDown className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
           </button>
        </div>
      </div>
    </aside>
  );
}
