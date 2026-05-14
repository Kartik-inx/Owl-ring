"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 blur-[120px] rounded-full animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 w-fit">
            <Sparkles size={14} className="text-accent" />
            <span className="text-xs font-medium tracking-widest uppercase text-accent/80">
              Evolution of Intelligence
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tighter">
            THE RING <br />
            <span className="text-gradient-gold">REIMAGINED.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-lg leading-relaxed">
            Owl Ring blends clinical-grade health tracking with a minimalist aesthetic. 
            Experience the future of wellness on your finger.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href="/product/owl-ring-s1">
              <button className="px-8 py-4 bg-gold-gradient text-black font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform glow-hover">
                Pre-order Now
                <ArrowRight size={18} />
              </button>
            </Link>
            <button className="px-8 py-4 glass text-white font-medium rounded-full hover:bg-white/10 transition-colors">
              Explore Tech
            </button>
          </div>

          <div className="flex items-center gap-8 pt-8 border-t border-white/5">
            <div>
              <div className="text-2xl font-bold">24k</div>
              <div className="text-xs text-muted uppercase tracking-widest">Gold Trim</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="text-2xl font-bold">7 Days</div>
              <div className="text-xs text-muted uppercase tracking-widest">Battery Life</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="text-2xl font-bold">100m</div>
              <div className="text-xs text-muted uppercase tracking-widest">Waterproof</div>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square flex items-center justify-center"
        >
          {/* Decorative Circles */}
          <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-20 border border-accent/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          <div className="relative w-full h-full">
            <Image
              src="/images/hero.png"
              alt="Owl Ring Hero"
              fill
              unoptimized
              className="object-contain drop-shadow-[0_0_50px_rgba(198,169,114,0.3)]"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 md:hidden w-full px-6">
        <Link href="/product/owl-ring-s1">
          <button className="w-full py-4 bg-gold-gradient text-black font-bold rounded-2xl shadow-premium glow-hover">
            Shop Owl Ring
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
