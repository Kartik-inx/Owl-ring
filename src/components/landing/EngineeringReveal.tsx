import React, { RefObject } from "react";

interface EngineeringRevealProps {
  currentChapter: number;
  explodeTextRef: RefObject<HTMLDivElement | null>;
}

export default function EngineeringReveal({ currentChapter, explodeTextRef }: EngineeringRevealProps) {
  return (
    <div 
      ref={explodeTextRef} 
      className={`absolute inset-0 w-full h-full flex items-center justify-start px-8 md:px-24 pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-40 safe-text-gradient ${
        currentChapter === 3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
      }`}
    >
      <div className="max-w-[500px] flex flex-col gap-6">
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-accent uppercase transition-all duration-[1000ms] delay-75">
            ENGINEERING PROTOCOL
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic transition-all duration-[1200ms] delay-150 mt-4">
            INTERNAL<br />ARCHITECTURE.
          </h2>
        </div>
        <p className="text-premium-body text-shadow-cinematic transition-all duration-[1200ms] delay-300">
          A seamless aerospace-grade titanium shell forged for absolute 10 ATM water resistance. Inside, a next-generation AI sensor array and wireless induction coil operate with silent, unyielding precision.
        </p>
      </div>
    </div>
  );
}
