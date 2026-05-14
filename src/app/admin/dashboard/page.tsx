"use client";

import React from "react";
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Revenue", value: "$128,430", trend: "+12.5%", positive: true, icon: TrendingUp },
    { label: "Active Orders", value: "154", trend: "+8.2%", positive: true, icon: ShoppingBag },
    { label: "New Customers", value: "1,240", trend: "-2.4%", positive: false, icon: Users },
  ];

  return (
    <div className="p-10">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Executive Overview</h1>
          <p className="text-muted text-sm">Real-time performance metrics for Owl Ring.</p>
        </div>
        <div className="flex gap-4">
           <div className="glass px-4 py-2 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-widest text-muted">Last 24 Hours</div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-8 rounded-[40px] border border-white/5 group hover:border-accent/30 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                stat.positive ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
              )}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="glass p-8 rounded-[40px] border border-white/5">
          <div className="flex justify-between items-center mb-8">
             <h3 className="text-lg font-bold">Recent Activity</h3>
             <Link href="/admin/orders" className="text-xs text-accent font-bold uppercase tracking-widest hover:underline">View All</Link>
          </div>
          <div className="space-y-6">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="flex gap-4 items-center p-4 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                     <Clock size={18} />
                  </div>
                  <div className="flex-1">
                     <p className="text-sm font-bold">New Order #82{i}9</p>
                     <p className="text-xs text-muted">2 minutes ago • $399.00</p>
                  </div>
                  <button className="p-2 text-muted hover:text-white"><ExternalLink size={16} /></button>
               </div>
             ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass p-8 rounded-[40px] border border-white/5">
          <h3 className="text-lg font-bold mb-8">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
             <Link href="/admin/products" className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-accent/20 transition-all text-left group">
                <div className="w-10 h-10 rounded-xl bg-accent text-black flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><ShoppingBag size={20} /></div>
                <p className="font-bold text-sm">Add Product</p>
                <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Manage Inventory</p>
             </Link>
             <Link href="/admin/content" className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-accent/20 transition-all text-left group">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><FileText size={20} /></div>
                <p className="font-bold text-sm">Update Blog</p>
                <p className="text-[10px] text-muted uppercase tracking-widest mt-1">CMS Content</p>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Re-using FileText icon import
import { FileText } from "lucide-react";

export default AdminDashboard;
