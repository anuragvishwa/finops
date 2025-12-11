"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { GlassCard } from "../ui/glass-card";

const data = [
  { p: "10 Dec", amount: 2400 },
  { p: "11 Dec", amount: 1398 },
  { p: "12 Dec", amount: 9800 },
  { p: "13 Dec", amount: 3908 },
  { p: "14 Dec", amount: 4800 },
  { p: "15 Dec", amount: 3800 },
  { p: "16 Dec", amount: 4300 },
];

import { ClientWrapper } from "../ui/client-wrapper";


export function CostTimeSeriesChart() {
  return (
    <GlassCard className="flex flex-col">
       <div className="flex items-center justify-between mb-6 px-1">
         <div>
            <h3 className="text-lg font-semibold text-white">Cost Trend</h3>
            <p className="text-sm text-zinc-400">Daily spend analysis</p>
         </div>
       </div>
       
       <div className="w-full h-[320px]">
         <ClientWrapper className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="p" 
                    stroke="#52525b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #27272a', color: '#fff' }}
                    itemStyle={{ color: '#6366f1' }}
                    cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                  />
               </AreaChart>
            </ResponsiveContainer>
         </ClientWrapper>
       </div>
    </GlassCard>
  );
}
