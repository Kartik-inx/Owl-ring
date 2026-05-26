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
    Account: [
      { name: "Login", href: "/auth/login" },
      { name: "Sign Up", href: "/auth/signup" },
      { name: "Profile", href: "/profile" },
      { name: "My Orders", href: "/orders" },
    ],
    Support: [
      { name: "FAQ", href: "/support" },
      { name: "Contact Us", href: "/support" },
      { name: "Return & Refund Policy", href: "/return-policy" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy-policy" },
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
              Precision wellness. Quietly integrated. Forged in Grade 5 Titanium for 24/7 intelligent insights.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group"
                aria-label="Facebook"
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group"
                aria-label="Twitter X"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-[17px] h-[17px] text-neutral-400 group-hover:text-white transition-colors duration-300"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/[0.01] border border-white/5 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-white/[0.06] hover:border-white/15 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] group"
                aria-label="LinkedIn"
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
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>

            {/* App Downloads */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a 
                href="#" 
                className="flex items-center justify-center gap-3 border border-white/5 hover:border-white/15 bg-white/[0.01] hover:bg-white/[0.05] px-4 py-2.5 rounded-xl transition-all duration-300 group shrink-0 w-full sm:w-[145px]"
              >
                <svg viewBox="0 0 384 512" fill="currentColor" className="w-[15px] h-[15px] text-white/70 group-hover:text-white transition-colors duration-300">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.4-19.1-77.5-19.1-38.3 0-77.3 21.6-97 55.7-40.2 69.8-10.2 173.2 28.5 228.6 19 27.2 41.7 57.6 71.3 56.5 28.5-1.1 39.6-18.5 74.3-18.5 34.7 0 45 18.5 74.9 17.8 30.6-.6 50.4-27.6 69.1-55.1 21.8-31.7 30.7-62.6 31.1-64.2-1-1-66.2-25.4-66.4-101zM290.4 83c16.3-20 27.7-47.8 24.7-75.6-23.9 1-52.9 15.9-70.1 35.8-14.7 17.1-27.7 45.3-24.7 72.6 26.8 2.1 54-12.7 70.1-32.8z"/>
                </svg>
                <div className="text-left">
                  <span className="text-[7.5px] uppercase tracking-[0.12em] text-white/40 block leading-none font-medium">Download on the</span>
                  <span className="text-[11px] font-medium text-white/80 block mt-0.5 group-hover:text-white transition-colors duration-300">App Store</span>
                </div>
              </a>

              <a 
                href="#" 
                className="flex items-center justify-center gap-3 border border-white/5 hover:border-white/15 bg-white/[0.01] hover:bg-white/[0.05] px-4 py-2.5 rounded-xl transition-all duration-300 group shrink-0 w-full sm:w-[145px]"
              >
                <svg viewBox="0 0 512 512" fill="currentColor" className="w-[14px] h-[14px] text-white/70 group-hover:text-white transition-colors duration-300">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58-33.2-60.7 60.7 60.7 60.7 58-33.2c15-8.6 24.8-23.6 24.8-40.6s-9.8-32-24.8-40.6zM325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"/>
                </svg>
                <div className="text-left">
                  <span className="text-[7.5px] uppercase tracking-[0.12em] text-white/40 block leading-none font-medium">Get it on</span>
                  <span className="text-[11px] font-medium text-white/80 block mt-0.5 group-hover:text-white transition-colors duration-300">Google Play</span>
                </div>
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
