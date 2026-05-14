"use client";

import React from "react";
import { 
  Search,
  Filter,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AdminOrdersPage = () => {
  const orders = [
    { id: "#8291", customer: "James Wilson", product: "Owl Ring S1", status: "Processing", date: "May 14, 2026", amount: "$399.00" },
    { id: "#8280", customer: "Alice Brown", product: "Owl Ring S1", status: "Shipped", date: "May 12, 2026", amount: "$399.00" },
    { id: "#8275", customer: "Bob Smith", product: "Owl Ring S1", status: "Delivered", date: "May 10, 2026", amount: "$399.00" },
  ];

  return (
    <div className="p-10">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Order Fulfillment</h1>
        <p className="text-muted text-sm">Manage and track all customer orders globally.</p>
      </header>

      <div className="glass rounded-[40px] border border-white/5 overflow-hidden">
         <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="relative w-96">
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
               <input 
                 type="text" 
                 placeholder="Search by ID, customer..." 
                 className="w-full bg-white/5 border border-white/5 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
               />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 glass rounded-2xl border border-white/5 text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-colors">
               <Filter size={16} />
               Filter
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="text-[10px] font-bold text-muted uppercase tracking-widest border-b border-white/5">
                     <th className="p-8">Order ID</th>
                     <th className="p-8">Customer</th>
                     <th className="p-8">Product</th>
                     <th className="p-8">Status</th>
                     <th className="p-8">Date</th>
                     <th className="p-8">Amount</th>
                     <th className="p-8 text-right">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {orders.map((order, idx) => (
                    <tr key={idx} className="group border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors">
                       <td className="p-8 font-bold text-sm text-accent">{order.id}</td>
                       <td className="p-8 font-bold text-sm">{order.customer}</td>
                       <td className="p-8 text-sm text-muted">{order.product}</td>
                       <td className="p-8">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                            order.status === "Processing" && "border-yellow-500/20 text-yellow-400 bg-yellow-500/5",
                            order.status === "Shipped" && "border-blue-500/20 text-blue-400 bg-blue-500/5",
                            order.status === "Delivered" && "border-green-500/20 text-green-400 bg-green-500/5",
                          )}>
                            {order.status}
                          </span>
                       </td>
                       <td className="p-8 text-sm text-muted">{order.date}</td>
                       <td className="p-8 font-bold text-sm">{order.amount}</td>
                       <td className="p-8 text-right">
                          <div className="flex justify-end gap-2">
                             <button className="p-2 glass rounded-xl border border-white/5 text-muted hover:text-accent transition-colors"><Eye size={16} /></button>
                             <button className="p-2 glass rounded-xl border border-white/5 text-muted hover:text-white transition-colors"><MoreVertical size={16} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-8 border-t border-white/5 flex justify-between items-center text-xs font-bold text-muted uppercase tracking-widest">
            <p>Showing 3 of 154 orders</p>
            <div className="flex gap-2">
               <button className="p-2 glass rounded-xl border border-white/5 hover:text-white disabled:opacity-30" disabled><ChevronLeft size={16} /></button>
               <button className="p-2 glass rounded-xl border border-white/5 hover:text-white"><ChevronRight size={16} /></button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
