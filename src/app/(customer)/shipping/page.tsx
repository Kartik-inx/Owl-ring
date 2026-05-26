import React from "react";
import { Truck, Globe, Shield } from "lucide-react";

const ShippingPage = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 min-h-screen text-left">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 uppercase tracking-widest text-white">Shipping <span className="text-accent">& Delivery</span></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
         <div className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5">
            <Truck className="text-accent mb-4" size={28} />
            <h3 className="text-base sm:text-lg font-bold mb-2 text-white">Domestic (US)</h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">Free standard shipping on all orders. Delivery in 3-5 business days.</p>
         </div>
         <div className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5">
            <Globe className="text-accent mb-4" size={28} />
            <h3 className="text-base sm:text-lg font-bold mb-2 text-white">International</h3>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">Flat rate of $49 for global shipping. Delivery in 7-14 business days.</p>
         </div>
      </div>
      
      <div className="glass p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-[48px] border border-white/5 space-y-6 sm:space-y-8 text-white/50 text-xs sm:text-sm leading-relaxed font-light">
        <section>
          <h2 className="text-white font-bold mb-3 sm:mb-4 uppercase tracking-widest text-[10px] sm:text-xs">Order Tracking</h2>
          <p>Once your order ships, you will receive an email with a tracking number and a link to track your package in real-time.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-3 sm:mb-4 uppercase tracking-widest text-[10px] sm:text-xs">Customs & Duties</h2>
          <p>International orders may be subject to import taxes and customs duties, which are the responsibility of the recipient.</p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPage;
