import React from "react";
import { Smartphone, Wifi } from "lucide-react";

interface AppConnectivityProps {
  currentChapter: number;
}

export default function AppConnectivity({ currentChapter }: AppConnectivityProps) {
  return (
    <div className={`absolute inset-0 w-full h-full flex items-center justify-end px-8 md:px-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-40 safe-text-gradient-right ${
      currentChapter === 6 ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-12"
    }`}>
      <div className="max-w-[480px] w-full text-right flex flex-col gap-8">
        
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-blue-500 uppercase transition-all duration-[1000ms] delay-75">
            SEAMLESS SYNCHRONIZATION
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic mt-4 transition-all duration-[1200ms] delay-150">
            MOBILE<br />CONNECTIVITY.
          </h2>
          <p className="text-premium-body text-shadow-cinematic mt-6 transition-all duration-[1200ms] delay-300">
            The Owl Companion App pairs instantly via low-energy Bluetooth. Synchronize your silent alarms, set daily wellness goals, and monitor real-time biometric telemetry with zero latency.
          </p>
        </div>

        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 relative overflow-hidden mt-4 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Smartphone className="text-blue-400" size={24} />
            </div>
            <div className="text-left">
              <h4 className="text-white font-medium text-lg">Owl Companion App</h4>
              <p className="text-neutral-400 text-xs">BLE Active Sync</p>
            </div>
            <Wifi className="text-blue-500 ml-auto animate-pulse" size={20} />
          </div>

          <div className="space-y-3">
            <div className="h-10 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 justify-between">
              <span className="text-xs text-neutral-300">Next Silent Alarm</span>
              <span className="text-xs font-bold text-white">07:00 AM</span>
            </div>
            <div className="h-10 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 justify-between">
              <span className="text-xs text-neutral-300">Sync Status</span>
              <span className="text-xs font-bold text-blue-400">Up to date</span>
            </div>
            <div className="h-10 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 justify-between">
              <span className="text-xs text-neutral-300">Ring Battery</span>
              <span className="text-xs font-bold text-emerald-400">84%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
