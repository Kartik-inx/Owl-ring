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
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-12 pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen text-left">
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight uppercase">Support <span className="text-gradient-gold">Center</span></h1>
        <p className="text-white/40 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-light leading-relaxed">Everything you need to know about your Owl Ring. Can&apos;t find what you&apos;re looking for? Reach out to our concierge team.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* FAQ Section */}
        <div>
          <h2 className="text-base sm:text-lg font-bold mb-6 uppercase tracking-widest text-accent">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={cn(
                  "glass rounded-2xl md:rounded-[32px] border transition-all overflow-hidden",
                  openFaq === index ? "border-accent/30" : "border-white/5"
                )}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 md:p-8 text-left"
                >
                  <span className="font-bold text-sm sm:text-base text-white">{faq.q}</span>
                  {openFaq === index ? <Minus size={16} className="text-accent shrink-0" /> : <Plus size={16} className="text-white/40 shrink-0" />}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8 text-white/50 text-xs sm:text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-base sm:text-lg font-bold mb-6 uppercase tracking-widest text-accent">Contact Concierge</h2>
          <div className="glass p-5 sm:p-8 md:p-10 rounded-2xl md:rounded-[40px] border border-white/5 space-y-5 sm:space-y-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Name</label>
                   <input type="text" className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Email</label>
                   <input type="email" className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Message</label>
                <textarea rows={4} className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300 resize-none" />
             </div>
             <button className="w-full h-12 bg-gold-gradient text-black font-bold rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-premium text-xs uppercase tracking-wider">
                Send Message
                <Send size={16} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
