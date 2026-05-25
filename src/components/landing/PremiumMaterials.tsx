import React from "react";
import { Check } from "lucide-react";

interface PremiumMaterialsProps {
  currentChapter: number;
}

export default function PremiumMaterials({ currentChapter }: PremiumMaterialsProps) {
  return (
    <div className={`absolute inset-0 w-full h-full flex items-center justify-center lg:justify-end px-4 sm:px-6 md:px-28 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-40 ${
      currentChapter === 6 ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-12 lg:translate-x-12"
    }`}>
      <div className="max-w-[420px] w-full text-center lg:text-right flex flex-col gap-5 sm:gap-6">
        
        <div>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] text-[#c6a972] uppercase transition-all duration-[1000ms] delay-75">
            UNCOMPROMISING BUILD
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight font-heading text-white text-shadow-cinematic mt-2">
            GRADE 5 TITANIUM.
          </h2>
          <p className="text-muted/80 text-xs sm:text-sm font-light leading-relaxed text-shadow-cinematic mt-3 sm:mt-4">
            Forged from aerospace-grade titanium and finished with a Diamond-Like Carbon (DLC) coating. Meticulously CNC-machined for a flawless, scratch-resistant surface that rests perfectly on your finger.
          </p>
        </div>

        <div className="space-y-4 mt-2">
          {[
            "Aerospace-grade strength-to-weight ratio",
            "Hypoallergenic inner resin comfort liner",
            "Diamond-Like Carbon (DLC) matte finish",
            "Micro-machined chamfered edges"
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 justify-end">
              <span className="text-sm text-neutral-300 font-light">{feature}</span>
              <div className="w-5 h-5 rounded-full bg-[#c6a972]/20 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-[#c6a972]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
