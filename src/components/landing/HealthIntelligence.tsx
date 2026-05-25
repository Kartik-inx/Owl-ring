import React from "react";
import { Bell, Activity, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HealthIntelligenceProps {
  currentChapter: number;
}

export default function HealthIntelligence({ currentChapter }: HealthIntelligenceProps) {
  return (
    <AnimatePresence>
      {currentChapter === 4 && (
        <motion.div 
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, x: 48, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0 w-full h-full flex items-center justify-center lg:justify-end px-4 sm:px-8 md:px-24 z-40 lg:safe-text-gradient-right"
        >
          <motion.div 
            className="max-w-[480px] w-full cinematic-blur-panel border border-white/10 p-6 sm:p-10 rounded-[24px] sm:rounded-[32px] flex flex-col gap-6 sm:gap-8 relative pointer-events-auto"
          >
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tighter text-white">Sleep & Recovery</h3>
                <p className="text-neutral-400 mt-1 sm:mt-2 font-light text-xs sm:text-sm">Wake up naturally with a silent vibration alarm.</p>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 self-start sm:self-auto shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-300 uppercase tracking-widest">Smart Alarm</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } }}
              className="h-px bg-white/10 w-full origin-left" 
            />

            {/* Silent Alarm Setting */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
              className="bg-white/5 rounded-2xl p-5 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none group-hover:from-blue-500/10 transition-colors" />
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
            </motion.div>

            {/* Sleep & Recovery Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
                className="bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-[120px] group hover:border-white/10 transition-colors cursor-default"
              >
                <div className="flex items-center gap-2">
                  <Moon size={16} className="text-blue-400" />
                  <span className="text-xs font-medium text-neutral-300">Sleep Score</span>
                </div>
                <div>
                  <span className="text-3xl font-semibold text-white tracking-tight">92</span>
                  <p className="text-xs text-blue-400 font-medium mt-1">Uninterrupted Rest</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
                className="bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-between h-[120px] group hover:border-white/10 transition-colors cursor-default"
              >
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-emerald-400" />
                  <span className="text-xs font-medium text-neutral-300">Recovery</span>
                </div>
                <div>
                  <span className="text-3xl font-semibold text-white tracking-tight">94%</span>
                  <p className="text-xs text-emerald-400 font-medium mt-1">Primed for the day</p>
                </div>
              </motion.div>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
