import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-6 pt-48 pb-24 min-h-screen">
      <h1 className="text-6xl font-bold mb-12 tracking-tighter uppercase">Our <span className="text-gradient-gold">Vision.</span></h1>
      <div className="space-y-12 text-muted text-lg leading-relaxed">
        <p className="text-white text-2xl font-medium">
          Owl Ring was founded on a simple premise: technology should be invisible yet empowering.
        </p>
        <p>
          We believe that the most advanced technology is the one you don't have to think about. 
          By combining aerospace engineering with clinical-grade biometrics, we've created a wearable 
          that doesn't just track data—it understands you.
        </p>
        <div className="grid grid-cols-2 gap-8 py-12 border-y border-white/5">
           <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Founded</h3>
              <p>2023, Silicon Valley</p>
           </div>
           <div>
              <h3 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Mission</h3>
              <p>Empowering human potential</p>
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
