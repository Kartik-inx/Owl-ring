import React from "react";

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-6 pt-48 pb-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest">Terms of <span className="text-accent">Service</span></h1>
      <div className="glass p-12 rounded-[48px] border border-white/5 space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">1. Acceptance</h2>
          <p>By using Owl Ring products and services, you agree to these terms. Our hardware is intended for wellness tracking and is not a medical device.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">2. Use of Service</h2>
          <p>You agree to use the service only for lawful purposes. Tampering with the hardware or attempting to reverse-engineer the firmware is strictly prohibited.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">3. Intellectual Property</h2>
          <p>All designs, algorithms, and branding are the exclusive property of Owl Tech Inc.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
