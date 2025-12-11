"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Users, Settings as SettingsIcon, CreditCard, Cloud, 
  MessageSquare, Bell, Shield, LogOut, Check, Plus 
} from "lucide-react";
import { useState } from "react";

const TABS = [
    { id: "general", label: "General", icon: User },
    { id: "team", label: "Team & Roles", icon: Users },
    { id: "integrations", label: "Integrations", icon: Cloud },
    { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Settings
          </h2>
          <p className="text-zinc-400">
            Manage your workspace, team, and preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-2">
              {TABS.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            isActive 
                            ? 'bg-zinc-800 text-white shadow-lg ring-1 ring-white/10' 
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                        }`}
                      >
                          <Icon className={`h-4 w-4 ${isActive ? 'text-fuchsia-400' : 'text-zinc-500'}`} />
                          <span>{tab.label}</span>
                          {isActive && (
                              <motion.div layoutId="activeSetting" className="ml-auto w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                          )}
                      </button>
                  )
              })}
              
              <div className="pt-6 mt-6 border-t border-white/5">
                 <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors">
                     <LogOut className="h-4 w-4" />
                     <span>Sign Out</span>
                 </button>
              </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
             <AnimatePresence mode="wait">
                 <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                 >
                     {activeTab === "general" && <GeneralSettings />}
                     {activeTab === "team" && <TeamSettings />}
                     {activeTab === "integrations" && <IntegrationSettings />}
                     {activeTab === "billing" && <BillingSettings />}
                 </motion.div>
             </AnimatePresence>
          </div>
      </div>
    </div>
  );
}

// ---------------- Sections ----------------

function GeneralSettings() {
    return (
        <div className="space-y-6">
            <GlassCard className="space-y-6">
                <div className="border-b border-white/5 pb-4">
                    <h3 className="text-lg font-bold text-white">Profile</h3>
                    <p className="text-sm text-zinc-400">Manage your public profile and preferences.</p>
                </div>
                
                <div className="flex items-center space-x-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
                        <div className="h-full w-full rounded-full bg-zinc-950 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">L</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                         <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                             Change Avatar
                         </button>
                         <p className="text-xs text-zinc-500">Max size 2MB (JPG/PNG)</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                        <input type="text" defaultValue="Demo User" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                        <input type="email" defaultValue="demo@lumniverse.com" className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                    </div>
                </div>
            </GlassCard>

             <GlassCard className="space-y-6">
                <div className="border-b border-white/5 pb-4">
                    <h3 className="text-lg font-bold text-white">Notifications</h3>
                    <p className="text-sm text-zinc-400">Choose what we email you about.</p>
                </div>
                
                <div className="space-y-4">
                    {[
                        { title: "Weekly Cost Report", desc: "Summary of spend every Monday." },
                        { title: "New Incident Alerts", desc: "Immediate notification for anomalies." },
                        { title: "Product Updates", desc: "News about new features." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-sm font-medium text-white">{item.title}</p>
                                <p className="text-xs text-zinc-500">{item.desc}</p>
                            </div>
                            <Switch defaultChecked={i < 2} />
                        </div>
                    ))}
                </div>
            </GlassCard>
        </div>
    )
}

function TeamSettings() {
    return (
        <GlassCard className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                    <h3 className="text-lg font-bold text-white">Team Members</h3>
                    <p className="text-sm text-zinc-400">Manage who has access to your workspace.</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Invite Member</span>
                </button>
            </div>

            <div className="space-y-4">
                {[
                    { name: "Demo User", email: "demo@lumniverse.com", role: "Owner", active: true },
                    { name: "Alice Engineer", email: "alice@company.com", role: "Admin", active: true },
                    { name: "Bob DevOps", email: "bob@company.com", role: "Viewer", active: false },
                ].map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="flex items-center space-x-3">
                             <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                                 {member.name.charAt(0)}
                             </div>
                             <div>
                                 <p className="text-sm font-medium text-white">{member.name}</p>
                                 <p className="text-xs text-zinc-500">{member.email}</p>
                             </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Badge variant={member.role === 'Owner' ? 'default' : member.role === 'Admin' ? 'outline' : 'secondary'} className="bg-opacity-20">
                                {member.role}
                            </Badge>
                            <span className="text-xs text-zinc-500">{member.active ? 'Active' : 'Invited'}</span>
                        </div>
                    </div>
                ))}
            </div>
        </GlassCard>
    )
}

function IntegrationSettings() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <GlassCard className="space-y-4 border-l-4 border-l-emerald-500">
                 <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                         <div className="h-10 w-10 rounded-lg bg-[#FF9900]/10 flex items-center justify-center">
                             <Cloud className="h-6 w-6 text-[#FF9900]" />
                         </div>
                         <div>
                             <h4 className="text-base font-bold text-white">AWS Cloud</h4>
                             <p className="text-xs text-emerald-400 flex items-center gap-1">
                                 <Check className="h-3 w-3" /> Connected
                             </p>
                         </div>
                     </div>
                     <button className="text-xs text-zinc-400 hover:text-white">Configure</button>
                 </div>
                 <p className="text-xs text-zinc-500">Synced 2m ago. Monitoring 145 resources.</p>
             </GlassCard>

             <GlassCard className="space-y-4 border-l-4 border-l-zinc-700 opacity-60">
                 <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                         <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                             <Cloud className="h-6 w-6 text-blue-500" />
                         </div>
                         <div>
                             <h4 className="text-base font-bold text-white">GCP</h4>
                             <p className="text-xs text-zinc-500">Not Connected</p>
                         </div>
                     </div>
                     <button className="px-3 py-1.5 rounded bg-white/10 text-xs font-medium text-white hover:bg-white/20">Connect</button>
                 </div>
                 <p className="text-xs text-zinc-500">Connect Google Cloud Platform to monitor GKE clusters.</p>
             </GlassCard>

             <GlassCard className="space-y-4 border-l-4 border-l-emerald-500">
                 <div className="flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                         <div className="h-10 w-10 rounded-lg bg-[#4A154B]/20 flex items-center justify-center">
                             <MessageSquare className="h-6 w-6 text-[#E01E5A]" />
                         </div>
                         <div>
                             <h4 className="text-base font-bold text-white">Slack</h4>
                             <p className="text-xs text-emerald-400 flex items-center gap-1">
                                 <Check className="h-3 w-3" /> #alerts-prod
                             </p>
                         </div>
                     </div>
                     <button className="text-xs text-zinc-400 hover:text-white">Configure</button>
                 </div>
                 <p className="text-xs text-zinc-500">Sending high severity incidents to Slack.</p>
             </GlassCard>
        </div>
    )
}

function BillingSettings() {
    return (
        <GlassCard className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-lg font-bold text-white">Current Plan</h3>
                   <p className="text-zinc-400 text-sm">You are on the <span className="text-fuchsia-400 font-bold">Pro Plan</span></p>
                </div>
                <Badge className="bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/50">Active</Badge>
            </div>

            <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                     <span className="text-zinc-300">Monthly Usage</span>
                     <span className="text-white font-mono">850k / 1M events</span>
                 </div>
                 <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 w-[85%]" />
                 </div>
                 <p className="text-xs text-zinc-500">Resets on Jan 1st</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-4">
                 <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                     Manage Subscription
                 </button>
                 <button className="px-4 py-2 rounded-lg text-zinc-400 text-sm font-medium hover:text-white transition-colors">
                     View Invoices
                 </button>
            </div>
        </GlassCard>
    )
}
