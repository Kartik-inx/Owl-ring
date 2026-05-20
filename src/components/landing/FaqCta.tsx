import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FaqCtaProps {
  currentChapter: number;
}

export default function FaqCta({ currentChapter }: FaqCtaProps) {
  const [openId, setOpenId] = useState<number | null>(0);

  const faqs = [
    { q: "How does the silent vibration alarm work?", a: "The Owl Ring features a micro-haptic motor that delivers gentle, silent vibrations to wake you up naturally during your lightest sleep phase, without disturbing your partner." },
    { q: "Is the Owl Ring completely waterproof?", a: "Yes, it is hermetically sealed and rated for 10 ATM (100 meters), making it perfect for swimming, showering, and diving." },
    { q: "How long does the battery really last?", a: "The solid-state battery provides up to 7 days of continuous biometric tracking and fully recharges in 90 minutes via the magnetic charging dock." },
    { q: "Do I need a subscription for the app?", a: "No. The Owl Companion App provides all core telemetry, sleep insights, and alarm settings completely free of any monthly subscription fees." },
    { q: "Is the titanium shell comfortable for sleep?", a: "Absolutely. The aerospace-grade titanium outer shell is paired with a hypoallergenic, ultra-lightweight resin inner liner designed specifically for 24/7 wear and uninterrupted sleep." }
  ];

  return (
    <div className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-40 ${
      currentChapter === 9 ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-12"
    }`}>
      <div className="max-w-5xl w-full px-6 flex flex-col md:flex-row gap-16 md:gap-24 items-center justify-between">
        
        {/* FAQ Section */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold text-white uppercase tracking-widest mb-8 text-shadow-cinematic opacity-80">Frequently Asked Questions</h3>
          <div className="flex flex-col border-t border-white/10">
            {faqs.map((faq, index) => {
              const isOpen = openId === index;
              return (
                <div 
                  key={index} 
                  className="border-b border-white/10 py-5 cursor-pointer group"
                  onClick={() => setOpenId(isOpen ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className={`text-base font-medium transition-colors ${isOpen ? "text-[#c6a972]" : "text-white group-hover:text-neutral-300"}`}>
                      {faq.q}
                    </h4>
                    <ChevronDown size={18} className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "rotate-180 text-[#c6a972]" : "text-neutral-600 group-hover:text-white"}`} />
                  </div>
                  <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
                    <div className="overflow-hidden">
                      <p className="text-neutral-400 text-sm font-light leading-relaxed pr-8">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#c6a972] uppercase mb-4 text-shadow-cinematic">FIRST BATCH · LIMITED PRODUCTION</span>
          <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-wide text-white text-shadow-cinematic mb-6 leading-tight">
            WAKE UP<br />TO SOMETHING<br />BETTER.
          </h2>
          <p className="text-premium-body mb-10 text-shadow-cinematic">
            Reserve your Owl Ring today. Titanium-forged, sleep-engineered, and ready to redefine your mornings.
          </p>
          
          <Link href="/product/owl-ring-s1" className="magnetic-btn group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full overflow-hidden w-full md:w-auto shadow-2xl transition-transform hover:scale-105">
            <div className="absolute inset-0 bg-[#c6a972] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="magnetic-text relative z-10 font-bold tracking-widest text-xs uppercase flex items-center gap-2">
              Reserve Yours <ArrowRight size={14} />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
