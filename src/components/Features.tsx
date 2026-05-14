"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Battery, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";

const features = [
  {
    title: "Health Intelligence",
    description: "Clinical-grade sensors tracking heart rate, SPO2, and stress levels 24/7.",
    icon: Activity,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "7-Day Endurance",
    description: "Advanced energy management that keeps you powered for a full week on a single charge.",
    icon: Battery,
    color: "bg-green-500/10 text-green-400",
  },
  {
    title: "Titanium Strength",
    description: "Built with aerospace-grade titanium and a scratch-resistant DLC coating.",
    icon: ShieldCheck,
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Invisible Tech",
    description: "Proprietary Owl chip packing massive power into a feather-light form factor.",
    icon: Cpu,
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    title: "Seamless Sync",
    description: "Instant data visualization on your iOS or Android device with zero lag.",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-400",
  },
  {
    title: "Global Reach",
    description: "Built-in NFC for worldwide contactless payments and secure access.",
    icon: Globe,
    color: "bg-cyan-500/10 text-cyan-400",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            ENGINEERED FOR <br />
            <span className="text-muted">PERFECTION.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Every millimeter of the Owl Ring is packed with advanced sensors and refined materials 
            to provide insights that matter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-[32px] p-8 hover:bg-white/[0.08] transition-all group border border-white/5"
            >
              <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
