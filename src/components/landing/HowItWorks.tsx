import React from "react";
import { PackageOpen, Download, Bluetooth, Target, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HowItWorksProps {
  currentChapter: number;
}

export default function HowItWorks({ currentChapter }: HowItWorksProps) {
  const steps = [
    { icon: <PackageOpen size={16} />, title: "Unbox & Wear", desc: "Slip on the feather-light titanium ring. No screens, no buttons." },
    { icon: <Download size={16} />, title: "Download the App", desc: "Install the Owl Companion App on iOS or Android — free, no subscription." },
    { icon: <Bluetooth size={16} />, title: "Pair Instantly", desc: "Bluetooth LE 5.3 connects in under 3 seconds. Silent and seamless." },
    { icon: <Target size={16} />, title: "Set Your Silent Alarm", desc: "Schedule your wake-up once. The ring gently vibrates at the lightest phase of your sleep cycle." },
    { icon: <Activity size={16} />, title: "Wake Up Better", desc: "See your Sleep Score, Recovery Index, and daily wellness brief every morning." }
  ];

  return (
    <AnimatePresence>
      {currentChapter === 8 && (
        <motion.div 
          initial={{ opacity: 0, x: -48 }}
          animate={{ opacity: 1, x: 0, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, x: -48, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0 w-full h-full flex items-center justify-start px-4 sm:px-8 md:px-24 z-40 safe-text-gradient"
        >
          <motion.div className="max-w-[480px] w-full text-left flex flex-col gap-6 sm:gap-8 pointer-events-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
            >
              <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
                YOUR WELLNESS JOURNEY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic mt-3 sm:mt-4">
                UP AND RUNNING IN
                <br />MINUTES.
              </h2>
              <p className="text-premium-body text-shadow-cinematic mt-6">
                No cluttered menus. No learning curve. Slip it on, pair once, and let the Owl Ring silently take care of the rest.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
              className="mt-4 flex flex-col gap-4 relative"
            >
              <div className="absolute left-5 top-4 bottom-4 w-px bg-white/10 z-0" />
              
              {steps.map((step, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 + index * 0.1 } }}
                  key={index} 
                  className="flex items-center gap-4 relative z-10 group"
                >
                  <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors shadow-lg">
                    <div className="text-neutral-400 group-hover:text-white transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{step.title}</h4>
                    <p className="text-neutral-400 text-xs font-light">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
