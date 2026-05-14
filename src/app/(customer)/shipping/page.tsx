import React from "react";
import { Truck, Globe, Shield } from "lucide-react";

const ShippingPage = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-6 pt-48 pb-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest">Shipping <span className="text-accent">& Delivery</span></h1>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
         <div className="glass p-8 rounded-3xl border border-white/5">
            <Truck className="text-accent mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Domestic (US)</h3>
            <p className="text-sm text-muted">Free standard shipping on all orders. Delivery in 3-5 business days.</p>
         </div>
         <div className="glass p-8 rounded-3xl border border-white/5">
            <Globe className="text-accent mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">International</h3>
            <p className="text-sm text-muted">Flat rate of $49 for global shipping. Delivery in 7-14 business days.</p>
         </div>
      </div>
      
      <div className="glass p-12 rounded-[48px] border border-white/5 space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Order Tracking</h2>
          <p>Once your order ships, you will receive an email with a tracking number and a link to track your package in real-time.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Customs & Duties</h2>
          <p>International orders may be subject to import taxes and customs duties, which are the responsibility of the recipient.</p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPage;
