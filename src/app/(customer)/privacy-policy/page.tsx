import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto w-full px-6 pt-48 pb-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 uppercase tracking-widest">Privacy <span className="text-accent">Policy</span></h1>
      <div className="glass p-12 rounded-[48px] border border-white/5 space-y-8 text-muted leading-relaxed">
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">1. Data Collection</h2>
          <p>We collect health data only to provide you with insights. Your biometric information is encrypted locally on your device and never sold to third parties.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">2. Health Data</h2>
          <p>Heart rate, SPO2, and sleep patterns are stored securely. You have full control over your data and can delete it at any time from the Owl App.</p>
        </section>
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">3. Security</h2>
          <p>We use industry-standard AES-256 encryption for all data transfers between your ring, your phone, and our secure cloud infrastructure.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
