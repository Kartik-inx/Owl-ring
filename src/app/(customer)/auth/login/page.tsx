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
        <div className="text-center mb-8 sm:mb-12">
           <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 tracking-tight uppercase">Welcome <span className="text-gradient-gold">Back.</span></h1>
           <p className="text-muted text-xs sm:text-sm">Access your health insights and orders.</p>
        </div>

        <div className="glass p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] border border-white/5 space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                 <input 
                   type="email" 
                   placeholder="Email Address" 
                   className="w-full bg-input-bg border border-white/5 rounded-2xl pl-12 pr-4 py-3 sm:py-4 text-sm focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-300" 
                 />
              </div>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                 <input 
                   type="password" 
                   placeholder="Password" 
                   className="w-full bg-input-bg border border-white/5 rounded-2xl pl-12 pr-4 py-3 sm:py-4 text-sm focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-300" 
                 />
              </div>
           </div>

           <button 
             onClick={handleSignIn}
             className="w-full bg-gold-gradient text-black font-bold py-3 sm:py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-premium"
           >
              Sign In
              <ArrowRight size={18} />
           </button>

           <div className="flex items-center gap-4 py-2 sm:py-4">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Or Continue With</span>
              <div className="h-px bg-white/5 flex-1" />
           </div>

           <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-2 py-3 sm:py-4 glass rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                 <Globe size={18} />
                 <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 sm:py-4 glass rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
                 <Shield size={18} />
                 <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">Apple</span>
              </button>
           </div>
        </div>

        <p className="text-center text-xs text-muted mt-6 sm:mt-8">
           Don't have an account?{" "}
           <Link href="/auth/signup" className="text-accent font-bold hover:underline ml-1">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
