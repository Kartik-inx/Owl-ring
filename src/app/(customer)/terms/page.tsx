import React from "react";

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 min-h-screen text-left">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 uppercase tracking-widest text-white">Terms of <span className="text-accent">Service</span></h1>
      <div className="glass p-5 sm:p-8 md:p-12 rounded-2xl md:rounded-[48px] border border-white/5 space-y-6 sm:space-y-8 text-white/50 text-xs sm:text-sm leading-relaxed font-light">
        <section>
          <h2 className="text-white font-bold mb-3 sm:mb-4 uppercase tracking-widest text-[10px] sm:text-xs">1. Acceptance</h2>
          <p>By using Owl Ring products and services, you agree to these terms. Our hardware is intended for wellness tracking and is not a medical device.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-3 sm:mb-4 uppercase tracking-widest text-[10px] sm:text-xs">2. Use of Service</h2>
          <p>You agree to use the service only for lawful purposes. Tampering with the hardware or attempting to reverse-engineer the firmware is strictly prohibited.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-3 sm:mb-4 uppercase tracking-widest text-[10px] sm:text-xs">3. Intellectual Property</h2>
          <p>All designs, algorithms, and branding are the exclusive property of Owl Tech Inc.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
