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
    <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-24 min-h-screen">
      <Link href="/orders" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest font-bold">
         <ChevronLeft size={16} />
         Back to orders
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-4 mb-2">
             <h1 className="text-4xl font-bold">Order {order.id}</h1>
             <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                order.status === "Processing" ? "border-yellow-500/20 text-yellow-400 bg-yellow-500/5" : "border-green-500/20 text-green-400 bg-green-500/5"
             )}>
                {order.status}
             </span>
          </div>
          <p className="text-muted text-sm">Placed on {order.date} • {order.items.length} Item</p>
        </div>

        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3 glass rounded-2xl border border-white/5 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
              <Download size={16} />
              Invoice
           </button>
           <Link href={`/refund-request?orderId=${order.id}`}>
              <button className="flex items-center gap-2 px-6 py-3 glass rounded-2xl border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/5 transition-colors">
                 <AlertCircle size={16} />
                 Request Refund
              </button>
           </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 space-y-12">
            <section className="glass p-10 rounded-[48px] border border-white/5">
               <h2 className="text-xl font-bold mb-10 uppercase tracking-widest">Tracking Status</h2>
               <div className="space-y-8 relative">
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />
                  {order.timeline.map((step, index) => (
                    <div key={index} className="flex gap-6 relative">
                       <div className={cn(
                         "w-8 h-8 rounded-full border-4 border-background flex items-center justify-center z-10",
                         step.completed ? "bg-accent" : "bg-surface"
                       )}>
                          {step.completed && <CheckCircle2 size={16} className="text-black" />}
                       </div>
                       <div className={step.active ? "opacity-100" : "opacity-50"}>
                          <p className="font-bold">{step.label}</p>
                          <p className="text-xs text-muted uppercase tracking-widest mt-1">{step.date}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </section>

            <section className="glass p-10 rounded-[48px] border border-white/5">
               <h2 className="text-xl font-bold mb-8 uppercase tracking-widest">Items</h2>
               {order.items.map((item, idx) => (
                 <div key={idx} className="flex gap-6 items-center">
                    <div className="w-24 h-24 rounded-3xl glass border border-white/5 flex items-center justify-center p-4">
                       <Package size={32} className="text-accent" />
                    </div>
                    <div className="flex-1">
                       <h3 className="text-lg font-bold">{item.name}</h3>
                       <p className="text-xs text-muted uppercase tracking-widest mb-2">{item.variant} / Size {item.size}</p>
                       <p className="font-bold text-accent">${item.price}.00</p>
                    </div>
                 </div>
               ))}
            </section>
         </div>

         <div className="space-y-8">
            <div className="glass p-8 rounded-[40px] border border-white/5">
               <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-muted">Shipping Address</h3>
               <p className="font-bold mb-1">{order.customer.name}</p>
               <p className="text-sm text-muted leading-relaxed">{order.customer.address}</p>
            </div>
            <div className="glass p-8 rounded-[40px] border border-white/5">
               <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-muted">Order Total</h3>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                     <span className="text-muted">Subtotal</span>
                     <span className="font-bold">{order.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-muted">Shipping</span>
                     <span className="text-green-400 font-bold">Free</span>
                  </div>
                  <div className="h-px bg-white/5 my-2" />
                  <div className="flex justify-between items-center">
                     <span className="font-bold">Total</span>
                     <span className="text-2xl font-bold text-accent">{order.amount}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
