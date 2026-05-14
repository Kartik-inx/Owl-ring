"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Lock, Truck, CreditCard, ShieldCheck } from "lucide-react";
import { PRODUCTS } from "@/lib/data";

const CheckoutPage = () => {
  const product = PRODUCTS[0];
  
  return (
    <div className="bg-background min-h-screen text-white pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Link href={`/product/${product.slug}`} className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors mb-12 text-sm">
           <ChevronLeft size={16} />
           Back to product
        </Link>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-3 space-y-12">
            {/* Step 1: Shipping */}
            <section>
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="text-2xl font-bold">Shipping Details</h2>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                     <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-2">First Name</label>
                     <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                     <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Last Name</label>
                     <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="col-span-2">
                     <label className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Address</label>
                     <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
               </div>
            </section>

            {/* Step 2: Delivery */}
            <section>
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="text-2xl font-bold">Delivery Method</h2>
               </div>
               
               <div className="space-y-4">
                  <label className="flex items-center justify-between glass p-6 rounded-3xl border border-accent/20 cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-4 border-accent" />
                        <div>
                           <p className="font-bold">Priority Shipping</p>
                           <p className="text-xs text-muted">2-3 Business Days</p>
                        </div>
                     </div>
                     <span className="font-bold">Free</span>
                  </label>
               </div>
            </section>

            {/* Step 3: Payment */}
            <section>
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center font-bold text-sm">3</div>
                  <h2 className="text-2xl font-bold">Payment</h2>
               </div>
               
               <div className="glass p-8 rounded-[40px] border border-white/5 space-y-6">
                  <div className="relative">
                     <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                     <input type="text" placeholder="Card Number" className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors" />
                     <input type="text" placeholder="CVV" className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors" />
                  </div>
               </div>
            </section>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-2">
             <div className="glass p-8 rounded-[40px] border border-white/5 sticky top-32">
                <h3 className="text-xl font-bold mb-8">Order Summary</h3>
                
                <div className="flex gap-4 mb-8">
                   <div className="w-20 h-20 rounded-2xl glass border border-white/5 flex items-center justify-center p-2 shrink-0">
                      <Image src={product.image} alt="Ring" width={60} height={60} className="object-contain" />
                   </div>
                   <div className="flex-1">
                      <h4 className="text-sm font-bold">{product.name}</h4>
                      <p className="text-[10px] text-muted uppercase tracking-widest">Stealth Black / Size 10</p>
                      <div className="flex justify-between items-center mt-2">
                         <span className="text-xs text-muted">Qty: 1</span>
                         <span className="font-bold">${product.price}.00</span>
                      </div>
                   </div>
                </div>

                <div className="h-px bg-white/5 w-full mb-8" />

                <div className="flex justify-between items-center mb-10">
                   <span className="text-lg font-bold">Total</span>
                   <span className="text-3xl font-bold text-accent">${product.price}.00</span>
                </div>

                <Link href="/order-success" className="block w-full">
                  <button className="w-full bg-gold-gradient text-black font-bold py-5 rounded-[24px] shadow-premium hover:scale-[1.02] transition-transform glow-hover">
                    Complete Purchase
                  </button>
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
