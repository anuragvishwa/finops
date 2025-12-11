"use client";

import { Bell, Search, User } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SearchPalette } from "./search-palette";

export function TopBar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setShowSearch(true);
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    {
       id: 1,
       title: "High Severity Incident",
       desc: "Latency spike detected in payment-service.",
       time: "2m ago",
       type: "alert",
       read: false
    },
    {
       id: 2,
       title: "New Savings Opportunity",
       desc: "Rightsizing available for 12 instances.",
       time: "1h ago",
       type: "success",
       read: false
    },
    {
       id: 3,
       title: "Weekly Report Ready",
       desc: "Your cost analysis for last week is generated.",
       time: "5h ago",
       type: "info",
       read: false
    },
    {
       id: 4, 
       title: "System Maintenance",
       desc: "Scheduled maintenance in 2 days.",
       time: "1d ago",
       type: "info",
       read: true
    }
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between py-2 backdrop-blur-xl bg-black/40 border-b border-white/5 -mx-6 px-6 lg:-mx-8 lg:px-8 mb-4">
      <div className="flex items-center space-x-4">
        {/* Controls moved to page header */}
      </div>

       <div className="flex items-center gap-6">
         {/* Utility Icons Group */}
         <div className="flex items-center gap-4">
             <button 
               onClick={() => setShowSearch(true)}
               className="group p-1 rounded-full hover:bg-white/5 transition-all text-slate-400 hover:text-white"
             >
               <Search className="h-5 w-5" />
             </button>
             
             <div className="relative" ref={notificationRef}>
               <button 
                 onClick={() => setShowNotifications(!showNotifications)}
                 className="relative focus:outline-none p-1 rounded-full hover:bg-white/5 transition-all"
               >
                   <Bell className={`h-5 w-5 transition-colors ${showNotifications ? 'text-white' : 'text-slate-400 hover:text-white'}`} />
                   {unreadCount > 0 && (
                       <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                         <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                         <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                       </span>
                   )}
               </button>

               <AnimatePresence>
                 {showNotifications && (
                     <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-80 z-50 pointer-events-none"
                     >
                        <div className="pointer-events-auto"> {/* Re-enable events for children */}
                            <GlassCard className="p-0 overflow-hidden border-white/10 shadow-2xl shadow-black/50 !bg-zinc-900 backdrop-blur-3xl">
                                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                                     <h4 className="text-sm font-bold text-white">Notifications</h4>
                                     <button 
                                        onClick={() => setUnreadCount(0)}
                                        className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                                     >
                                         Mark all read
                                     </button>
                                 </div>
                                 <div className="max-h-80 overflow-y-auto scrollbar-hide">
                                     {notifications.map((notif) => (
                                         <div key={notif.id} className={`p-4 border-b border-white/5 hover:bg-white/10 transition-colors cursor-pointer ${!notif.read ? 'bg-white/5' : 'bg-transparent'}`}>
                                             <div className="flex justify-between items-start mb-1">
                                                 <h5 className={`text-sm font-medium ${notif.type === 'alert' ? 'text-rose-400' : notif.type === 'success' ? 'text-emerald-400' : 'text-white'}`}>
                                                     {notif.title}
                                                 </h5>
                                                 <span className="text-[10px] text-zinc-500">{notif.time}</span>
                                             </div>
                                             <p className="text-xs text-zinc-300 leading-relaxed">{notif.desc}</p>
                                         </div>
                                     ))}
                                 </div>
                                 <div className="p-2 text-center border-t border-white/5 bg-white/5">
                                     <button className="text-xs text-zinc-500 hover:text-white transition-colors">View all activity</button>
                                 </div>
                             </GlassCard>
                         </div>
                     </motion.div>
                 )}
               </AnimatePresence>
             </div>
         </div>
         
         <div className="h-6 w-px bg-white/10 mx-2" />
         
         <Link href="/settings">
             <div className="flex items-center space-x-3 cursor-pointer group">
               <div className="text-right hidden md:block">
                 <p className="text-sm font-medium text-white group-hover:text-fuchsia-400 transition-colors">Anurag V.</p>
                 <p className="text-xs text-slate-400">Admin</p>
               </div>
               <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[2px] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all">
                 <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                    <User className="h-5 w-5 text-slate-200" />
                 </div>
               </div>
             </div>
         </Link>
      </div>
      
      <SearchPalette isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </header>
  );
}
