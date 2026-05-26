import React from "react";
import { RefreshCcw, Truck, PackageCheck } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 min-h-screen text-left">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 uppercase tracking-widest text-white">Return <span className="text-accent">& Refund</span></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
         <div className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 text-center">
            <RefreshCcw className="mx-auto mb-3 text-accent" size={28} />
            <h3 className="font-bold mb-1.5 text-sm sm:text-base text-white">30-Day Window</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">Change your mind? No problem. Returns accepted within 30 days.</p>
         </div>
         <div className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 text-center">
            <Truck className="mx-auto mb-3 text-accent" size={28} />
            <h3 className="font-bold mb-1.5 text-sm sm:text-base text-white">Free Shipping</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">We provide pre-paid return labels for all domestic returns.</p>
         </div>
         <div className="glass p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 text-center">
            <PackageCheck className="mx-auto mb-3 text-accent" size={28} />
            <h3 className="font-bold mb-1.5 text-sm sm:text-base text-white">Full Refund</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light">Get your money back in full, no restocking fees applied.</p>
         </div>
      </div>
      
      <div className="glass p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-[48px] border border-white/5 space-y-6 sm:space-y-8 text-white/50 text-xs sm:text-sm leading-relaxed font-light">
        <section>
          <h2 className="text-white font-bold mb-3 sm:mb-4 uppercase tracking-widest text-[10px] sm:text-xs">Eligibility</h2>
          <p>To be eligible for a return, your Owl Ring must be in the same condition that you received it, with all original packaging and accessories.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-3 sm:mb-4 uppercase tracking-widest text-[10px] sm:text-xs">Exchanges</h2>
          <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at concierge@owlring.com.</p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
