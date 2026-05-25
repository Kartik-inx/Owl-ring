import React from "react";
import { Smartphone, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppConnectivityProps {
  currentChapter: number;
}

export default function AppConnectivity({ currentChapter }: AppConnectivityProps) {
  return (
    <AnimatePresence>
      {currentChapter === 6 && (
        <motion.div 
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, x: 48, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0 w-full h-full flex items-center justify-center lg:justify-end px-4 sm:px-8 md:px-24 z-40 lg:safe-text-gradient-right"
        >
          <motion.div className="max-w-[480px] w-full text-center lg:text-right flex flex-col gap-6 sm:gap-8 pointer-events-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
            >
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-blue-500 uppercase">
                SEAMLESS SYNCHRONIZATION
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic mt-3 sm:mt-4">
                MOBILE<br />CONNECTIVITY.
              </h2>
              <p className="text-premium-body text-shadow-cinematic mt-4 sm:mt-6">
                The Owl Companion App pairs instantly via low-energy Bluetooth. Synchronize your silent alarms, set daily wellness goals, and monitor real-time biometric telemetry with zero latency.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 relative overflow-hidden mt-4 shadow-2xl group hover:border-white/20 transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-shadow" />
              
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
                <div className="h-10 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 justify-between group-hover:bg-white/10 transition-colors">
                  <span className="text-xs text-neutral-300">Next Silent Alarm</span>
                  <span className="text-xs font-bold text-white">07:00 AM</span>
                </div>
                <div className="h-10 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 justify-between group-hover:bg-white/10 transition-colors">
                  <span className="text-xs text-neutral-300">Sync Status</span>
                  <span className="text-xs font-bold text-blue-400">Up to date</span>
                </div>
                <div className="h-10 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 justify-between group-hover:bg-white/10 transition-colors">
                  <span className="text-xs text-neutral-300">Ring Battery</span>
                  <span className="text-xs font-bold text-emerald-400">84%</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
