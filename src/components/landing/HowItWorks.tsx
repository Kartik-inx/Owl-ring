import React from "react";
import { PackageOpen, Download, Bluetooth, Target, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HowItWorksProps {
  currentChapter?: number;
  isMobile?: boolean;
}

export default function HowItWorks({ currentChapter, isMobile = false }: HowItWorksProps) {
  const show = isMobile || currentChapter === 8;

  const steps = [
    { icon: <PackageOpen size={16} />, title: "Unbox & Wear", desc: "Slip on the feather-light titanium ring. No screens, no buttons." },
    { icon: <Download size={16} />, title: "Download the App", desc: "Install the Owl Companion App on iOS or Android — free, no subscription." },
    { icon: <Bluetooth size={16} />, title: "Pair Instantly", desc: "Bluetooth LE 5.3 connects in under 3 seconds. Silent and seamless." },
    { icon: <Target size={16} />, title: "Set Your Silent Alarm", desc: "Schedule your wake-up once. The ring gently vibrates at the lightest phase of your sleep cycle." },
    { icon: <Activity size={16} />, title: "Wake Up Better", desc: "See your Sleep Score, Recovery Index, and daily wellness brief every morning." }
  ];

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
        <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
          YOUR WELLNESS JOURNEY
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic mt-3 sm:mt-4">
          UP AND RUNNING IN
          <br />MINUTES.
        </h2>
        <p className="text-premium-body text-shadow-cinematic mt-4 sm:mt-6 px-1">
          No cluttered menus. No learning curve. Slip it on, pair once, and let the Owl Ring silently take care of the rest.
        </p>
      </motion.div>

      <motion.div 
        initial={isMobile ? { opacity: 0, y: 20 } : {}}
        whileInView={isMobile ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } : {}}
        viewport={{ once: true }}
        className="mt-4 flex flex-col gap-4 relative w-full text-left"
      >
        <div className="absolute left-5 top-4 bottom-4 w-px bg-white/10 z-0" />
        
        {steps.map((step, index) => (
          <motion.div 
            initial={isMobile ? { opacity: 0, x: -10 } : {}}
            whileInView={isMobile ? { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.08 } } : {}}
            viewport={{ once: true }}
            key={index} 
            className="flex items-start gap-4 relative z-10 group"
          >
            <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors shadow-lg shrink-0 mt-0.5">
              <div className="text-neutral-400 group-hover:text-white transition-colors">
                {step.icon}
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium text-sm sm:text-base">{step.title}</h4>
              <p className="text-neutral-400 text-xs sm:text-sm font-light mt-0.5 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
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
          className="absolute inset-0 w-full h-full flex items-center justify-start px-4 sm:px-8 md:px-24 z-40 safe-text-gradient"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
