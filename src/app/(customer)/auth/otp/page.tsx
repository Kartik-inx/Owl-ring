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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 sm:pt-32 sm:pb-24 bg-transparent text-left">
      <div className="w-full max-w-md text-center">
        <div className="text-center mb-8 sm:mb-12">
           <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-accent/20">
              <ShieldCheck size={24} className="text-accent" />
           </div>
           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight uppercase">Verify <span className="text-gradient-gold">Identity.</span></h1>
           <p className="text-white/40 text-xs sm:text-sm font-light">We sent a code to your email.</p>
        </div>

        <div className="glass p-5 sm:p-8 rounded-2xl md:rounded-[48px] border border-white/5 space-y-6 sm:space-y-8">
           <div className="flex justify-between gap-1.5 sm:gap-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-8 h-11 sm:w-12 sm:h-16 bg-white/[0.02] border border-white/5 rounded-xl sm:rounded-2xl text-center text-lg sm:text-xl font-bold text-accent focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  ref={(el) => { inputs.current[index] = el; }}
                />
              ))}
           </div>

           <Link href="/" className="block w-full">
              <button className="w-full h-12 bg-gold-gradient text-black font-bold rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-premium text-xs uppercase tracking-wider">
                 Verify & Finish
                 <ArrowRight size={16} />
              </button>
           </Link>

           <p className="text-center text-xs text-white/40 font-bold uppercase tracking-widest mt-4">
              Didn&apos;t receive code?{" "}
              <button className="text-accent hover:underline ml-1">Resend</button>
           </p>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
