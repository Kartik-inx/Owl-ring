"use client";

import React, { useState } from "react";
import { Plus, Minus, Mail, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I find my ring size?",
      a: "We recommend ordering our free Sizing Kit first. It contains plastic ring sizers in all available sizes (6-13). Wear the sizer for 24 hours to ensure a perfect fit through daily temperature changes."
    },
    {
      q: "Is the Owl Ring waterproof?",
      a: "Yes, the Owl Ring is water-resistant up to 100 meters (330 feet). You can safely wear it while swimming, showering, or diving."
    },
    {
      q: "What is the battery life?",
      a: "The Owl Ring lasts up to 7 days on a single charge. A full charge takes approximately 60-90 minutes using the included premium charging dock."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-24 min-h-screen">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-4 tracking-tight uppercase">Support <span className="text-gradient-gold">Center</span></h1>
        <p className="text-muted max-w-xl mx-auto leading-relaxed">Everything you need to know about your Owl Ring. Can't find what you're looking for? Reach out to our concierge team.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-20">
        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-accent">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={cn(
                  "glass rounded-[32px] border transition-all overflow-hidden",
                  openFaq === index ? "border-accent/30" : "border-white/5"
                )}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                  <span className="font-bold">{faq.q}</span>
                  {openFaq === index ? <Minus size={18} className="text-accent" /> : <Plus size={18} className="text-muted" />}
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-8 text-muted text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest text-accent">Contact Concierge</h2>
          <div className="glass p-10 rounded-[40px] border border-white/5 space-y-8 mb-8">
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Name</label>
                   <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Email</label>
                   <input type="email" className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
             </div>
             <button className="w-full bg-gold-gradient text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-premium">
                Send Message
                <Send size={18} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
