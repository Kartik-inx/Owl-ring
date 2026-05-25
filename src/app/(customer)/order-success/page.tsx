"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 sm:pt-32 sm:pb-24">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 sm:w-24 sm:h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-accent/20"
        >
          <CheckCircle2 size={40} className="text-accent sm:w-12 sm:h-12" />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 tracking-tight uppercase">Order <span className="text-gradient-gold">Confirmed.</span></h1>
        <p className="text-muted text-sm sm:text-lg mb-8 sm:mb-12 max-w-md mx-auto">
          Your Owl Ring is being prepared. We've sent the details to your email.
        </p>

        <div className="glass p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border border-white/5 mb-8 sm:mb-12 text-left">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Order Number</p>
              <p className="text-lg sm:text-xl font-bold">#OWL-8291-X</p>
            </div>
            <button className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-accent uppercase tracking-widest">
              <Download size={14} />
              Invoice
            </button>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 py-4 border-t border-white/5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass border border-white/5 flex items-center justify-center shrink-0">
              <Package size={20} className="text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-bold">Priority Shipping</p>
              <p className="text-[10px] sm:text-xs text-muted">Estimated arrival: May 18 - May 20</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link href="/orders/OWL-8291-X" className="flex-1 sm:flex-none">
            <button className="w-full px-6 sm:px-10 py-4 bg-gold-gradient text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-premium">
              Track Order
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/" className="flex-1 sm:flex-none">
            <button className="w-full px-6 sm:px-10 py-4 glass text-white font-medium rounded-2xl hover:bg-white/10 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
