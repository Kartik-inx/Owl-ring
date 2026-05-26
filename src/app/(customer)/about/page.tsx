import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 min-h-screen text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 md:mb-12 tracking-tight uppercase">Our <span className="text-gradient-gold">Vision.</span></h1>
      <div className="space-y-6 sm:space-y-8 md:space-y-12 text-white/50 text-sm sm:text-base md:text-lg leading-relaxed font-light">
        <p className="text-white text-lg sm:text-xl md:text-2xl font-medium leading-snug">
          Owl Ring was founded on a simple premise: technology should be invisible yet empowering.
        </p>
        <p>
          We believe that the most advanced technology is the one you don&apos;t have to think about. 
          By combining aerospace engineering with clinical-grade biometrics, we&apos;ve created a wearable 
          that doesn&apos;t just track data—it understands you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-8 sm:py-12 border-y border-white/5">
           <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs sm:text-sm">Founded</h3>
              <p className="text-white/60 font-light">2023, Silicon Valley</p>
           </div>
           <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-xs sm:text-sm">Mission</h3>
              <p className="text-white/60 font-light">Empowering human potential</p>
           </div>
        </div>
        <p>
          Our team of scientists and designers works tirelessly to ensure that every Owl Ring 
          meets the highest standards of accuracy and elegance. Join us as we redefine 
          the future of wellness.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
