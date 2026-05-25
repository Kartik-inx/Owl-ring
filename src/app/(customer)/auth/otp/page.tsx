"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const OTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-24 bg-transparent">
      <div className="w-full max-w-md text-center">
        <div className="text-center mb-12">
           <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} className="text-accent" />
           </div>
           <h1 className="text-4xl font-bold mb-4 tracking-tight uppercase">Verify <span className="text-gradient-gold">Identity.</span></h1>
           <p className="text-muted text-sm">We sent a code to your email.</p>
        </div>

        <div className="glass p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] border border-white/5 space-y-8 sm:space-y-10">
           <div className="flex justify-between gap-1 sm:gap-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-10 h-12 sm:w-12 sm:h-16 bg-white/5 border border-white/5 rounded-xl sm:rounded-2xl text-center text-lg sm:text-xl font-bold text-accent focus:outline-none focus:border-accent transition-colors"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  ref={(el) => { inputs.current[index] = el; }}
                />
              ))}
           </div>

           <Link href="/">
              <button className="w-full bg-gold-gradient text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-premium">
                 Verify & Finish
                 <ArrowRight size={18} />
              </button>
           </Link>

           <p className="text-center text-xs text-muted font-bold uppercase tracking-widest mt-6">
              Didn't receive code?{" "}
              <button className="text-accent hover:underline ml-1">Resend</button>
           </p>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
