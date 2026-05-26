"use client";

import React from "react";
import { Package, Truck, CheckCircle2, ChevronLeft, Download, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ORDERS } from "@/lib/data";
import { useParams } from "next/navigation";

const OrderDetailsPage = () => {
  const params = useParams();
  const orderId = params.id as string;
  const order = ORDERS.find(o => o.id === orderId) || ORDERS[0];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen text-left">
      <Link href="/orders" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-6 sm:mb-8 text-xs sm:text-sm uppercase tracking-widest font-bold">
         <ChevronLeft size={14} className="text-accent" />
         Back to orders
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 sm:mb-12">
        <div>
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Order {order.id}</h1>
             <span className={cn(
                "px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border",
                order.status === "Processing" ? "border-yellow-500/20 text-yellow-400 bg-yellow-500/5" : "border-green-500/20 text-green-400 bg-green-500/5"
             )}>
                {order.status}
             </span>
          </div>
          <p className="text-white/40 text-xs sm:text-sm font-light">Placed on {order.date} • {order.items.length} Item{order.items.length > 1 ? 's' : ''}</p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
           <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 glass rounded-xl sm:rounded-2xl border border-white/5 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
              <Download size={14} className="text-accent" />
              Invoice
           </button>
           <Link href={`/refund-request?orderId=${order.id}`} className="flex-1 sm:flex-none">
              <button className="w-full flex items-center justify-center gap-2 h-11 sm:h-12 px-5 sm:px-6 glass rounded-xl sm:rounded-2xl border border-red-500/20 text-red-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-red-500/5 transition-colors">
                 <AlertCircle size={14} />
                 Request Refund
              </button>
           </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-12">
         <div className="lg:col-span-2 space-y-6 lg:space-y-12">
            <section className="glass p-5 sm:p-8 md:p-10 rounded-2xl md:rounded-[48px] border border-white/5">
               <h2 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 uppercase tracking-widest">Tracking Status</h2>
               <div className="space-y-6 sm:space-y-8 relative">
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />
                  {order.timeline.map((step, index) => (
                    <div key={index} className="flex gap-4 sm:gap-6 relative">
                       <div className={cn(
                         "w-8 h-8 rounded-full border-4 border-[#060606] flex items-center justify-center z-10 shrink-0",
                         step.completed ? "bg-accent" : "bg-[#111111]"
                       )}>
                          {step.completed && <CheckCircle2 size={16} className="text-black" />}
                       </div>
                       <div className={step.active ? "opacity-100" : "opacity-50"}>
                          <p className="font-bold text-sm sm:text-base text-white">{step.label}</p>
                          <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mt-1 font-medium">{step.date}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="glass p-5 sm:p-8 md:p-10 rounded-2xl md:rounded-[48px] border border-white/5">
               <h2 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 uppercase tracking-widest">Items</h2>
               <div className="space-y-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 sm:gap-6 items-center">
                       <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl glass border border-white/5 flex items-center justify-center shrink-0">
                          <Package size={22} className="text-accent" />
                       </div>
                       <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-semibold text-white truncate">{item.name}</h3>
                          <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mb-1 font-medium">{item.variant} / Size {item.size}</p>
                          <p className="font-bold text-accent text-sm sm:text-base">${item.price}.00</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         <div className="space-y-6 sm:space-y-8">
            <div className="glass p-5 sm:p-8 rounded-2xl md:rounded-[40px] border border-white/5">
               <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-6 text-white/40">Shipping Address</h3>
               <p className="font-bold text-white mb-1">{order.customer.name}</p>
               <p className="text-sm text-white/50 leading-relaxed font-light">{order.customer.address}</p>
            </div>
            <div className="glass p-5 sm:p-8 rounded-2xl md:rounded-[40px] border border-white/5">
               <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-6 text-white/40">Order Total</h3>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                     <span className="text-white/55">Subtotal</span>
                     <span className="font-bold text-white">{order.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-white/55">Shipping</span>
                     <span className="text-green-400 font-bold">Free</span>
                  </div>
                  <div className="h-px bg-white/5 my-2" />
                  <div className="flex justify-between items-center">
                     <span className="font-bold text-white">Total</span>
                     <span className="text-xl sm:text-2xl font-bold text-accent">{order.amount}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
