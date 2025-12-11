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
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Cost Incidents", href: "/incidents", icon: AlertTriangle },
  { name: "What-if Simulator", href: "/what-if", icon: Calculator },
  { name: "Services & Teams", href: "/services", icon: Server },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-[#030014]/90 backdrop-blur-xl transition-transform">
      <div className="flex h-full flex-col px-3 py-4">
        {/* Logo */}
        <div className="mb-8 flex items-center px-2 pl-4">
          <div className="relative mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-[0_0_15px_rgba(217,70,239,0.3)]">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Lumniverse</h1>
            <p className="text-xs font-medium text-fuchsia-400">Neon Ops</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group relative flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 shadow-[0_0_10px_rgba(217,70,239,0.1)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <Icon 
                  className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive ? "text-fuchsia-400" : "text-slate-400 group-hover:text-fuchsia-200"
                  )} 
                />
                <span className={cn(
                  "relative z-10",
                  isActive ? "text-fuchsia-50" : "text-slate-400 group-hover:text-fuchsia-100"
                )}>
                  {item.name}
                </span>
                
                {isActive && (
                   <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_2px_rgba(217,70,239,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Workspace Selector Mock */}
        <div className="mt-auto px-2">
           <button className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 transition-colors hover:bg-white/10 hover:border-fuchsia-500/30">
             <div className="flex items-center">
               <div className="mr-3 h-8 w-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-indigo-600 p-[1px]">
                  <div className="h-full w-full rounded-full bg-[#030014] flex items-center justify-center">
                    <span className="text-xs font-bold text-white">L</span>
                  </div>
               </div>
               <div className="text-left">
                 <p className="text-sm font-medium text-white">Deep Dive</p>
                 <p className="text-xs text-slate-400">Production</p>
               </div>
             </div>
             <ChevronDown className="h-4 w-4 text-slate-500" />
           </button>
           
           <div className="mt-4 text-center">
             <p className="text-[10px] uppercase tracking-wider text-slate-600">Powered by AI</p>
           </div>
        </div>
      </div>
    </aside>
  );
}
