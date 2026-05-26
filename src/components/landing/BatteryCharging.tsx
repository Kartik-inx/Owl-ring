import React from "react";
import { BatteryCharging as BatteryIcon, BellOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BatteryChargingProps {
  currentChapter?: number;
  isMobile?: boolean;
}

export default function BatteryCharging({ currentChapter, isMobile = false }: BatteryChargingProps) {
  const show = isMobile || currentChapter === 5;

  const content = (
    <motion.div 
      initial={isMobile ? { opacity: 0, y: 20 } : {}}
      whileInView={isMobile ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } : {}}
      viewport={{ once: true, margin: "-50px" }}
      className={`max-w-[480px] w-full flex flex-col gap-6 sm:gap-8 pointer-events-auto ${isMobile ? "text-center items-center" : "text-left items-start"}`}
    >
      <motion.div
        initial={isMobile ? { opacity: 0, y: 15 } : {}}
        whileInView={isMobile ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } : {}}
        viewport={{ once: true }}
        className={isMobile ? "flex flex-col items-center" : "flex flex-col items-start"}
      >
        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
          CALM TECHNOLOGY
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic mt-3 sm:mt-4">
          DIGITAL<br />MINIMALISM.
        </h2>
        <p className="text-premium-body text-shadow-cinematic mt-4 sm:mt-6 px-1">
          A distraction-free wearable designed to reduce mobile dependency. Subtle insights and silent notifications guide your day without demanding your attention.
        </p>
      </motion.div>

      <motion.div 
        initial={isMobile ? { opacity: 0, y: 20 } : {}}
        whileInView={isMobile ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } : {}}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full"
      >
        <div className={`bg-neutral-900/30 border border-white/10 rounded-2xl p-5 flex flex-col group hover:border-white/20 transition-all duration-300 cursor-default ${isMobile ? "items-center text-center" : "items-start md:items-end text-left md:text-right"}`}>
          <BellOff size={20} className="text-neutral-300 mb-3 group-hover:scale-110 transition-transform" />
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">Screen Free</span>
          <span className="text-xs text-neutral-400 mt-1">Healthier daily habits</span>
        </div>
        
        <div className={`bg-neutral-900/30 border border-white/10 rounded-2xl p-5 flex flex-col group hover:border-white/20 transition-all duration-300 cursor-default ${isMobile ? "items-center text-center" : "items-start md:items-end text-left md:text-right"}`}>
          <BatteryIcon size={20} className="text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">7 Days</span>
          <span className="text-xs text-neutral-400 mt-1">Continuous tracking</span>
        </div>
      </motion.div>

    </motion.div>
  );

  if (isMobile) {
    return (
      <section className="relative w-full py-16 px-4 sm:px-6 z-20 flex items-center justify-center pointer-events-auto">
        {content}
      </section>
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, x: -48, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0 w-full h-full flex items-center justify-center lg:justify-start px-4 sm:px-8 md:px-24 z-40 lg:safe-text-gradient"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
