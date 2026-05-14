"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

const OrderSuccessPage = () => {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center px-6 pt-32 pb-24">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-accent/20"
        >
          <CheckCircle2 size={48} className="text-accent" />
        </motion.div>

        <h1 className="text-5xl font-bold mb-4 tracking-tight uppercase">Order <span className="text-gradient-gold">Confirmed.</span></h1>
        <p className="text-muted text-lg mb-12 max-w-md mx-auto">
          Your Owl Ring is being prepared. We've sent the details to your email.
        </p>

        <div className="glass p-8 rounded-[40px] border border-white/5 mb-12 text-left">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Order Number</p>
              <p className="text-xl font-bold">#OWL-8291-X</p>
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest">
              <Download size={14} />
              Invoice
            </button>
          </div>

          <div className="flex items-center gap-4 py-4 border-t border-white/5">
            <div className="w-12 h-12 rounded-xl glass border border-white/5 flex items-center justify-center shrink-0">
              <Package size={20} className="text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Priority Shipping</p>
              <p className="text-xs text-muted">Estimated arrival: May 18 - May 20</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders/OWL-8291-X" className="flex-1 sm:flex-none">
            <button className="w-full px-10 py-4 bg-gold-gradient text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-premium">
              Track Order
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/" className="flex-1 sm:flex-none">
            <button className="w-full px-10 py-4 glass text-white font-medium rounded-2xl hover:bg-white/10 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
