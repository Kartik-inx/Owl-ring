"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Globe, Shield } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const router = useRouter();

  const handleSignIn = () => {
    localStorage.setItem("isLoggedIn", "true");
    router.push("/profile");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 sm:pt-32 sm:pb-24">
      <div className="max-w-md w-full">
        <div className="text-center mb-6 sm:mb-8">
           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight uppercase">Welcome <span className="text-gradient-gold">Back.</span></h1>
           <p className="text-white/40 text-xs sm:text-sm font-light">Access your health insights and orders.</p>
        </div>

        <div className="glass p-5 sm:p-8 rounded-2xl md:rounded-[48px] border border-white/5 space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
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

           <button 
             onClick={handleSignIn}
             className="w-full h-12 bg-gold-gradient text-black font-bold rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-premium text-xs uppercase tracking-wider"
           >
              Sign In
              <ArrowRight size={16} />
           </button>

           <div className="flex items-center gap-4 py-2 sm:py-3">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Or Continue With</span>
              <div className="h-px bg-white/5 flex-1" />
           </div>

           <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 h-11 sm:h-12 glass rounded-xl sm:rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                 <Globe size={16} className="text-accent" />
                 <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 h-11 sm:h-12 glass rounded-xl sm:rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                 <Shield size={16} className="text-accent" />
                 <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white">Apple</span>
              </button>
           </div>
        </div>

        <p className="text-center text-xs text-white/40 mt-6 sm:mt-8">
           Don&apos;t have an account?{" "}
           <Link href="/auth/signup" className="text-accent font-bold hover:underline ml-1">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
