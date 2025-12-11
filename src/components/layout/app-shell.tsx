"use client";

import { usePathname } from "next/navigation";
import { AuroraBackground } from "../ui/aurora-background";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  // We can condition showing sidebar if we have public pages like login, but for now app is internal
  const showSidebar = true; 

  return (
    <div className="flex min-h-screen w-full bg-[#09090b] text-white selection:bg-indigo-500/30">
      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 bg-[#09090b]" />

      {showSidebar && <Sidebar />}

      <div className={cn("relative z-10 flex flex-1 flex-col w-full", showSidebar && "pl-64")}>
        <div className="container mx-auto max-w-7xl p-6 lg:p-8">
           <TopBar />
           <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
             {children}
           </main>
        </div>
      </div>
    </div>
  );
}
