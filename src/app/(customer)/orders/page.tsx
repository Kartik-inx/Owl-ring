"use client";

import React from "react";
import Link from "next/link";
import { Package, ChevronRight, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORDERS } from "@/lib/data";

const MyOrdersPage = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted text-sm">Track and manage your Owl Ring purchases.</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
           <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full md:w-64 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
           </div>
           <button className="p-3 glass rounded-2xl border border-white/5">
              <Filter size={20} className="text-muted" />
           </button>
        </div>
      </div>

      <div className="space-y-6">
        {ORDERS.map((order) => (
          <Link 
            key={order.id} 
            href={`/orders/${order.id}`}
            className="block glass p-8 rounded-[40px] border border-white/5 hover:border-accent/30 transition-all group"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 rounded-3xl glass border border-white/5 flex items-center justify-center">
                   <Package size={24} className="text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold">{order.id}</h3>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                      order.status === "Processing" ? "border-yellow-500/20 text-yellow-400 bg-yellow-500/5" : "border-green-500/20 text-green-400 bg-green-500/5"
                    )}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted">Placed on {order.date} • {order.items.length} Item</p>
                </div>
              </div>

              <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-start">
                 <div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-xl font-bold">{order.amount}</p>
                 </div>
                 <div className="w-10 h-10 rounded-full glass border border-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all">
                    <ChevronRight size={20} />
                 </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
