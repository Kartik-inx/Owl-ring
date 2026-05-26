"use client";

import React from "react";
import Link from "next/link";
import { Package, ChevronRight, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORDERS } from "@/lib/data";

const MyOrdersPage = () => {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 min-h-screen text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 sm:mb-12">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-white">My Orders</h1>
          <p className="text-white/40 text-xs sm:text-sm font-light">Track and manage your Owl Ring purchases.</p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
           <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input 
                type="text" 
                placeholder="Search orders..." 
                className="w-full sm:w-64 bg-white/[0.02] border border-white/5 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300 placeholder-white/20"
              />
           </div>
           <button className="p-3 bg-white/[0.02] hover:bg-white/[0.06] rounded-xl border border-white/5 hover:border-white/15 transition-all text-white/50 hover:text-white shrink-0">
              <Filter size={18} />
           </button>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {ORDERS.map((order) => (
          <Link 
            key={order.id} 
            href={`/orders/${order.id}`}
            className="block glass p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] md:rounded-[40px] border border-white/5 hover:border-accent/30 transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
              <div className="flex gap-4 sm:gap-6 items-center w-full md:w-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl glass border border-white/5 flex items-center justify-center shrink-0">
                   <Package size={22} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h3 className="text-base sm:text-lg font-semibold text-white truncate">{order.id}</h3>
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border",
                      order.status === "Processing" ? "border-yellow-500/20 text-yellow-400 bg-yellow-500/5" : "border-green-500/20 text-green-400 bg-green-500/5"
                    )}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/40 font-light">Placed on {order.date} • {order.items.length} Item</p>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-none pt-4 md:pt-0">
                 <div>
                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-lg sm:text-xl font-bold text-white">{order.amount}</p>
                 </div>
                 <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass border border-white/5 flex items-center justify-center text-white/45 group-hover:bg-accent group-hover:text-black transition-all duration-300 shadow-sm shrink-0">
                    <ChevronRight size={18} />
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
