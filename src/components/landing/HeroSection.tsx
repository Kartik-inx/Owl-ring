import React, { RefObject } from "react";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSectionProps {
  currentChapter: number;
  introTextRef: RefObject<HTMLDivElement | null>;
}

export default function HeroSection({ currentChapter, introTextRef }: HeroSectionProps) {
  return (
    <AnimatePresence>
      {currentChapter === 1 && (
        <motion.div 
          ref={introTextRef} 
          initial={{ opacity: 0, y: -48 }}
          animate={{ opacity: 1, y: 0, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: -48, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none cinematic-backdrop-mask"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
          >
            <Sparkles size={14} className="text-accent animate-pulse" />
            <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.25em] uppercase text-accent">Precision Wellness. Quietly Integrated.</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            className="text-5xl sm:text-7xl md:text-[9rem] font-semibold tracking-tighter uppercase leading-none mt-4 text-shadow-cinematic"
          >
            OWL <span className="text-[#c6a972]">RING.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            className="text-premium-body max-w-sm sm:max-w-2xl px-4 text-center mt-4 sm:mt-6 text-shadow-cinematic"
          >
            A premium smart ring engineered to improve sleep, reduce digital noise, and deliver intelligent wellness insights through elegant everyday wear.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
