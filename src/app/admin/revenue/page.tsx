"use client";

import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight,
  Download,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const RevenueAnalyticsPage = () => {
  return (
    <div className="p-10">
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Revenue Analytics</h1>
          <p className="text-muted text-sm">In-depth financial performance and sales data.</p>
        </div>

        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 glass rounded-2xl border border-white/5 text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-colors">
              <Calendar size={16} />
              Last 30 Days
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
              <Download size={16} />
              Export CSV
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
         {[
           { label: "Total Revenue", value: "$420.5K", trend: "+12.5%" },
           { label: "Average Order", value: "$399.00", trend: "+2.1%" },
           { label: "Conversion Rate", value: "3.24%", trend: "+0.8%" },
           { label: "Net Profit", value: "$154.2K", trend: "+15.2%" },
         ].map((stat, idx) => (
           <div key={idx} className="glass p-8 rounded-[40px] border border-white/5">
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex justify-between items-end">
                 <h3 className="text-2xl font-bold">{stat.value}</h3>
                 <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                    <ArrowUpRight size={14} />
                    {stat.trend}
                 </span>
              </div>
           </div>
         ))}
      </div>

      <div className="glass p-12 rounded-[48px] border border-white/5 mb-12">
         <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-bold">Revenue Trend</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-xs text-muted font-bold uppercase tracking-widest">Gross Revenue</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <span className="text-xs text-muted font-bold uppercase tracking-widest">Net Profit</span>
               </div>
            </div>
         </div>

         {/* Visual Chart Placeholder */}
         <div className="h-80 flex items-end justify-between gap-4">
            {[40, 60, 45, 90, 65, 80, 100, 75, 85, 95, 110, 130].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group cursor-pointer">
                 <div className="w-full relative bg-white/5 rounded-t-xl overflow-hidden min-h-[20px]" style={{ height: `${h}%` }}>
                    <div className="absolute inset-x-0 bottom-0 bg-gold-gradient opacity-50 group-hover:opacity-100 transition-opacity" style={{ height: '70%' }} />
                    <div className="absolute inset-x-0 bottom-0 bg-white/10" style={{ height: '40%' }} />
                 </div>
                 <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default RevenueAnalyticsPage;
