import React from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewsOverlayProps {
  currentChapter?: number;
  isMobile?: boolean;
}

export default function ReviewsOverlay({ currentChapter, isMobile = false }: ReviewsOverlayProps) {
  const show = isMobile || currentChapter === 9;

  const reviews = [
    { name: "Alex Chen", handle: "@alexc_tech", text: "The sleep tracking is unparalleled. Finally a wearable that doesn't scream 'tech'.", rating: 5 },
    { name: "Sarah Jenkins", handle: "@sarahruns", text: "Silent alarm changed my mornings. My partner doesn't even wake up.", rating: 5 },
    { name: "Marcus Thorne", handle: "@mthorne", text: "Titanium build feels incredibly premium. It's so light I forget I'm wearing it.", rating: 5 }
  ];

  const content = (
    <div className="flex flex-col items-center max-w-6xl w-full mx-auto">
      <motion.div 
        initial={isMobile ? { opacity: 0, y: -15 } : {}}
        whileInView={isMobile ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } : {}}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-10"
      >
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#c6a972] uppercase text-shadow-cinematic">
          GLOBAL ACCLAIM
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-white mt-3 text-shadow-cinematic">
          TRUSTED BY<br />THOUSANDS.
        </h2>
      </motion.div>
      
      <div className={`w-full ${isMobile ? "flex flex-col gap-4 max-w-md px-2" : "flex flex-row overflow-x-auto md:overflow-visible gap-4 md:gap-6 px-6 snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"}`}>
        {reviews.map((review, i) => (
          <motion.div 
            key={i}
            initial={isMobile ? { opacity: 0, y: 15 } : {}}
            whileInView={isMobile ? { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" } } : {}}
            viewport={{ once: true, margin: "-50px" }}
            className={`bg-neutral-900/30 border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-2xl hover:bg-neutral-900/50 hover:border-white/20 transition-all duration-300 flex flex-col justify-between ${isMobile ? "w-full text-left" : "flex-none w-[85vw] md:flex-1 md:w-auto snap-center"}`}
          >
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-[#c6a972] text-[#c6a972]" />
                ))}
              </div>
              <p className="text-white text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-6">&quot;{review.text}&quot;</p>
            </div>
            <div className="flex items-center gap-3 mt-auto pt-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-600 border border-white/10 shrink-0" />
              <div className="text-left">
                <h4 className="text-sm font-bold text-white leading-tight">{review.name}</h4>
                <p className="text-xs text-neutral-400 mt-0.5">{review.handle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <section className="relative w-full py-16 px-4 sm:px-6 z-20 flex flex-col items-center justify-center pointer-events-auto">
        {content}
      </section>
    );
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1.0, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-40 pointer-events-auto"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
