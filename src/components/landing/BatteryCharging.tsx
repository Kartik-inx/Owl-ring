import React from "react";
import { BatteryCharging as BatteryIcon, BellOff } from "lucide-react";

interface BatteryChargingProps {
  currentChapter: number;
}

export default function BatteryCharging({ currentChapter }: BatteryChargingProps) {
  return (
    <div className={`absolute inset-0 w-full h-full flex items-center justify-start px-8 md:px-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-40 safe-text-gradient ${
      currentChapter === 5 ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-12"
    }`}>
      <div className="max-w-[480px] w-full text-left flex flex-col gap-8">
        
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase transition-all duration-[1000ms] delay-75">
            CALM TECHNOLOGY
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic mt-4 transition-all duration-[1200ms] delay-150">
            DIGITAL<br />MINIMALISM.
          </h2>
          <p className="text-premium-body text-shadow-cinematic mt-6 transition-all duration-[1200ms] delay-300">
            A distraction-free wearable designed to reduce mobile dependency. Subtle insights and silent notifications guide your day without demanding your attention.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col items-end">
            <BellOff size={20} className="text-neutral-300 mb-3" />
            <span className="text-2xl font-bold text-white tracking-tight">Screen Free</span>
            <span className="text-xs text-neutral-400 mt-1">Healthier habits</span>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col items-end">
            <BatteryIcon size={20} className="text-amber-500 mb-3" />
            <span className="text-2xl font-bold text-white tracking-tight">7 Days</span>
            <span className="text-xs text-neutral-400 mt-1">Continuous tracking</span>
          </div>
        </div>

      </div>
    </div>
  );
}
