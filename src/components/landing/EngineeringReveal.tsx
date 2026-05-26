import React, { RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EngineeringRevealProps {
  currentChapter?: number;
  explodeTextRef?: RefObject<HTMLDivElement | null>;
  isMobile?: boolean;
}

export default function EngineeringReveal({ currentChapter, explodeTextRef, isMobile = false }: EngineeringRevealProps) {
  const content = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1.0, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-col gap-4 sm:gap-6 ${isMobile ? "max-w-2xl items-center text-center" : "max-w-[500px] items-start text-left"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
        viewport={{ once: true }}
      >
        <span className="text-[11px] font-bold tracking-[0.25em] text-accent uppercase">
          ENGINEERING PROTOCOL
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic mt-3 sm:mt-4">
          INTERNAL<br className={isMobile ? "hidden" : "block"} /> ARCHITECTURE.
        </h2>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
        viewport={{ once: true }}
        className={`text-premium-body text-shadow-cinematic ${isMobile ? "px-2" : ""}`}
      >
        A seamless aerospace-grade titanium shell forged for absolute 10 ATM water resistance. Inside, a next-generation AI sensor array and wireless induction coil operate with silent, unyielding precision.
      </motion.p>
    </motion.div>
  );

  if (isMobile) {
    return (
      <section className="relative w-full py-16 px-6 sm:px-8 flex flex-col items-center justify-center z-20 pointer-events-auto">
        {content}
      </section>
    );
  }

  return (
    <AnimatePresence>
      {currentChapter === 3 && (
        <motion.div 
          ref={explodeTextRef} 
          initial={{ opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, x: -48, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0 w-full h-full flex items-center justify-start px-4 sm:px-8 md:px-24 pointer-events-none z-40 safe-text-gradient"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
