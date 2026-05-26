"use client";

import React from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 sm:pt-32 sm:pb-24">
      <div className="max-w-md w-full">
        <div className="text-center mb-6 sm:mb-8">
           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight uppercase">Join <span className="text-gradient-gold">Owl.</span></h1>
           <p className="text-white/40 text-xs sm:text-sm font-light">Start your journey to better health today.</p>
        </div>

        <div className="glass p-5 sm:p-8 rounded-2xl md:rounded-[48px] border border-white/5 space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                 <input 
                   type="text" 
                   placeholder="Full Name" 
                   className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300 placeholder-white/20" 
                 />
              </div>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                 <input 
                   type="email" 
                   placeholder="Email Address" 
                   className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300 placeholder-white/20" 
                 />
              </div>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                 <input 
                   type="password" 
                   placeholder="Password" 
                   className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300 placeholder-white/20" 
                 />
              </div>
           </div>

           <Link href="/auth/otp" className="block w-full mt-4 sm:mt-6">
              <button className="w-full h-12 bg-gold-gradient text-black font-bold rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-premium text-xs uppercase tracking-wider">
                 Create Account
                 <ArrowRight size={16} />
              </button>
           </Link>
        </div>

        <p className="text-center text-xs text-white/40 mt-6 sm:mt-8">
           Already have an account?{" "}
           <Link href="/auth/login" className="text-accent font-bold hover:underline ml-1">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
