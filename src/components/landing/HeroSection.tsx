import React, { RefObject } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSectionProps {
  currentChapter?: number;
  introTextRef?: RefObject<HTMLDivElement | null>;
  isMobile?: boolean;
}

export default function HeroSection({ currentChapter, introTextRef, isMobile = false }: HeroSectionProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-2 text-center max-w-4xl mx-auto px-4">
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
        className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-semibold tracking-tighter uppercase leading-none mt-4 text-shadow-cinematic"
      >
        OWL <span className="text-[#c6a972]">RING.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
        className="text-premium-body max-w-xs sm:max-w-md md:max-w-2xl px-4 text-center mt-4 sm:mt-6 text-shadow-cinematic"
      >
        A premium smart ring engineered to improve sleep, reduce digital noise, and deliver intelligent wellness insights through elegant everyday wear.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] } }}
        className="mt-6 sm:mt-8 pointer-events-auto z-50"
      >
        <Link href="/product/owl-ring-s1" className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(198,169,114,0.3)] transition-all duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-[#c6a972] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          <span className="relative z-10 font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2 group-hover:text-white transition-colors duration-500">
            Reserve Yours <ArrowRight size={14} />
          </span>
        </Link>
      </motion.div>
    </div>
  );

  if (isMobile) {
    return (
      <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center px-4 py-20 z-20 pointer-events-auto">
        {content}
      </section>
    );
  }

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
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
