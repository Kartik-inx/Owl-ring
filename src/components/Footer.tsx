"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Footer = () => {
  const pathname = usePathname();
  
  // Hide footer on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  const navGroups = {
    Product: [
      { name: "The Ring", href: "/product/owl-ring-s1" },
      { name: "Sizing", href: "/sizing" },
      { name: "Science", href: "/about" },
      { name: "Owl App", href: "/" },
    ],
    Support: [
      { name: "FAQ", href: "/support" },
      { name: "Contact", href: "/support" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/return-policy" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Privacy", href: "/privacy-policy" },
      { name: "Terms", href: "/terms" },
    ],
  };

  const isLandingPage = pathname === "/";

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <footer className="relative bg-[#060606] border-t border-white/5 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-14 px-6 sm:px-8 md:px-16 z-20 pointer-events-auto shadow-2xl overflow-hidden">
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.012] pointer-events-none mix-blend-overlay z-0" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

      {/* Top soft transition mask */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />

      {/* Thin top border highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10" />
      
      {/* Subtle top ambient radial lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[150px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />

      {/* Background ambient gold gradient glow at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[250px] bg-[radial-gradient(circle_at_bottom,rgba(198,169,114,0.015)_0%,rgba(0,0,0,0)_80%)] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* PREMIUM CTA SECTION (Only on Landing Page) */}
        {isLandingPage && (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto pb-16 md:pb-20 border-b border-white/5 mb-16 md:mb-20 relative z-10"
          >
            <motion.span 
              variants={fadeInUpVariants}
              className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#C6A972] uppercase"
            >
              OWL RING
            </motion.span>
            
            <motion.h2 
              variants={fadeInUpVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white uppercase mt-4 mb-6 leading-tight max-w-2xl"
            >
              THE FUTURE OF<br />SMART WEARABLES.
            </motion.h2>
            
            <motion.p 
              variants={fadeInUpVariants}
              className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-10"
            >
              Reserve your Owl Ring today. Forged in Grade 5 Titanium and engineered for silent, intelligent wellness tracking.
            </motion.p>
            
            <motion.div 
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center px-4"
            >
              <Link 
                href="/product/owl-ring-s1" 
                className="relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black font-semibold tracking-wider text-xs sm:text-sm uppercase transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_30px_rgba(198,169,114,0.35)] w-full sm:w-auto"
              >
                Reserve Yours Today
              </Link>
              <Link 
                href="/auth/login" 
                className="relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/[0.03] text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] font-semibold tracking-wider text-xs sm:text-sm uppercase transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
              >
                Sign In / Register
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* NAVIGATION & BRAND SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-8 lg:gap-12 mb-16 md:mb-20">
          
          {/* LEFT COLUMN: BRAND */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start gap-7 sm:gap-8">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center group select-none focus:outline-none">
              <div className="relative h-8 sm:h-9 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src="/images/logo.png" 
                  alt="Owl Brand Logo" 
                  className="h-full object-contain"
                />
              </div>
            </Link>

            {/* Brand Statement */}
            <p className="text-white/40 text-[13px] sm:text-sm font-light leading-relaxed max-w-sm text-left tracking-wide">
              Advancing human potential through elegant, invisible technology. Join the evolution of wellness.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="/" 
                className="w-10 h-10 rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group"
                aria-label="Website"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-[18px] h-[18px] text-neutral-400 group-hover:text-white transition-colors duration-300"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
              <a 
                href="mailto:support@owltech.com" 
                className="w-10 h-10 rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group"
                aria-label="Email"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-[18px] h-[18px] text-neutral-400 group-hover:text-white transition-colors duration-300"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a 
                href="/support" 
                className="w-10 h-10 rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group"
                aria-label="Support Chat"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-[18px] h-[18px] text-neutral-400 group-hover:text-white transition-colors duration-300"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: NAV GROUPS */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 w-full text-left">
            {Object.entries(navGroups).map(([title, items]) => (
              <div key={title} className="flex flex-col gap-5 sm:gap-6">
                <h4 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.28em]">
                  {title}
                </h4>
                <ul className="flex flex-col gap-3.5 sm:gap-4">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-[13px] sm:text-[14px] text-white/40 hover:text-white transition-colors duration-300 relative group inline-block py-0.5 font-light"
                      >
                        <span>{item.name}</span>
                        {/* Underline Animation */}
                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C6A972] transition-all duration-300 ease-out group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 sm:mt-16 md:mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-[10px] sm:text-[11px] text-white/30 uppercase tracking-[0.18em] font-light font-mono">
            © 2026 Owl Tech Inc. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-[11px] text-white/30 uppercase tracking-[0.18em] font-light font-mono mt-1 sm:mt-0">
            Designed in California. Forged in titanium.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
