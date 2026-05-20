import React from "react";
import { Bell, Activity, Moon } from "lucide-react";

interface HealthIntelligenceProps {
  currentChapter: number;
}

export default function HealthIntelligence({ currentChapter }: HealthIntelligenceProps) {
  return (
    <div className={`absolute inset-0 w-full h-full flex items-center justify-end px-8 md:px-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-40 safe-text-gradient-right ${
      currentChapter === 4 ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-12"
    }`}>
      <div className="max-w-[480px] w-full cinematic-blur-panel border border-white/10 p-10 rounded-[32px] flex flex-col gap-8 relative pointer-events-auto transition-all duration-[1200ms] delay-150">
        
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-3xl font-semibold tracking-tighter text-white">Sleep & Recovery</h3>
            <p className="text-neutral-400 mt-2 font-light text-sm">Wake up naturally with a silent vibration alarm.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[11px] font-bold text-blue-300 uppercase tracking-widest">Smart Alarm</span>
          </div>
        </div>

        <div className="h-px bg-white/10 w-full" />

        {/* Silent Alarm Setting */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Bell size={18} className="text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-white block">Silent Wake-Up</span>
                <span className="text-xs text-neutral-400 font-light block mt-0.5">Gentle vibration</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-semibold text-white tracking-tight block">07:00 <span className="text-sm text-neutral-500 font-normal">AM</span></span>
            </div>
          </div>
        </div>

        {/* Sleep & Recovery Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-[120px]">
            <div className="flex items-center gap-2">
              <Moon size={16} className="text-blue-400" />
              <span className="text-xs font-medium text-neutral-300">Sleep Score</span>
            </div>
            <div>
              <span className="text-3xl font-semibold text-white tracking-tight">92</span>
              <p className="text-xs text-blue-400 font-medium mt-1">Uninterrupted Rest</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-[120px]">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-emerald-400" />
              <span className="text-xs font-medium text-neutral-300">Recovery</span>
            </div>
            <div>
              <span className="text-3xl font-semibold text-white tracking-tight">94%</span>
              <p className="text-xs text-emerald-400 font-medium mt-1">Primed for the day</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
