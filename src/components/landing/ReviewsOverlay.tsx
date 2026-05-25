import React from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewsOverlayProps {
  currentChapter: number;
}

export default function ReviewsOverlay({ currentChapter }: ReviewsOverlayProps) {
  const reviews = [
    { name: "Alex Chen", handle: "@alexc_tech", text: "The sleep tracking is unparalleled. Finally a wearable that doesn't scream 'tech'.", rating: 5 },
    { name: "Sarah Jenkins", handle: "@sarahruns", text: "Silent alarm changed my mornings. My partner doesn't even wake up.", rating: 5 },
    { name: "Marcus Thorne", handle: "@mthorne", text: "Titanium build feels incredibly premium. It's so light I forget I'm wearing it.", rating: 5 }
  ];

  return (
    <AnimatePresence>
      {currentChapter === 9 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1.0, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-40 pointer-events-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
            className="text-center mb-10"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#c6a972] uppercase text-shadow-cinematic">
              GLOBAL ACCLAIM
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-white mt-3 text-shadow-cinematic">
              TRUSTED BY<br />THOUSANDS.
            </h2>
          </motion.div>
          
          <div className="flex flex-row overflow-x-auto md:overflow-visible gap-4 md:gap-6 max-w-6xl w-full px-6 snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {reviews.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" } }}
                className="flex-none w-[85vw] md:flex-1 md:w-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-2xl hover:bg-white/10 transition-colors snap-center"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-[#c6a972] text-[#c6a972]" />
                  ))}
                </div>
                <p className="text-white text-base md:text-lg font-medium leading-relaxed mb-6">&quot;{review.text}&quot;</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-600 border border-white/10 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{review.name}</h4>
                    <p className="text-xs text-neutral-400">{review.handle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
