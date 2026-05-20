import React, { RefObject } from "react";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  currentChapter: number;
  introTextRef: RefObject<HTMLDivElement | null>;
}

export default function HeroSection({ currentChapter, introTextRef }: HeroSectionProps) {
  return (
    <div 
      ref={introTextRef} 
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] cinematic-backdrop-mask ${
        currentChapter === 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
      }`}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-[1000ms] shadow-2xl">
        <Sparkles size={14} className="text-accent animate-pulse" />
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-accent">Precision Wellness. Quietly Integrated.</span>
      </div>
      
      <h1 className="text-7xl md:text-[9rem] font-semibold tracking-tighter uppercase leading-none mt-4 text-shadow-cinematic transition-all duration-[1200ms] delay-150 ease-[cubic-bezier(0.22,1,0.36,1)]">
        OWL <span className="text-[#c6a972]">RING.</span>
      </h1>
      
      <p className="text-premium-body max-w-2xl text-center mt-6 text-shadow-cinematic transition-all duration-[1200ms] delay-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
        A premium smart ring engineered to improve sleep, reduce digital noise, and deliver intelligent wellness insights through elegant everyday wear.
      </p>
    </div>
  );
}
