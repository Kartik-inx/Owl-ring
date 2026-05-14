import React from "react";
import { RefreshCcw, Truck, PackageCheck } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-6 pt-48 pb-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest">Return <span className="text-accent">& Refund</span></h1>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
         <div className="glass p-8 rounded-3xl border border-white/5 text-center">
            <RefreshCcw className="mx-auto mb-4 text-accent" size={32} />
            <h3 className="font-bold mb-2">30-Day Window</h3>
            <p className="text-xs text-muted">Change your mind? No problem. Returns accepted within 30 days.</p>
         </div>
         <div className="glass p-8 rounded-3xl border border-white/5 text-center">
            <Truck className="mx-auto mb-4 text-accent" size={32} />
            <h3 className="font-bold mb-2">Free Shipping</h3>
            <p className="text-xs text-muted">We provide pre-paid return labels for all domestic returns.</p>
         </div>
         <div className="glass p-8 rounded-3xl border border-white/5 text-center">
            <PackageCheck className="mx-auto mb-4 text-accent" size={32} />
            <h3 className="font-bold mb-2">Full Refund</h3>
            <p className="text-xs text-muted">Get your money back in full, no restocking fees applied.</p>
         </div>
      </div>
      
      <div className="glass p-12 rounded-[48px] border border-white/5 space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Eligibility</h2>
          <p>To be eligible for a return, your Owl Ring must be in the same condition that you received it, with all original packaging and accessories.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Exchanges</h2>
          <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at concierge@owlring.com.</p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
