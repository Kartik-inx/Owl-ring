"use client";

import React from "react";
import { 
  Globe,
  Lock,
  Bell,
  CreditCard,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

const SettingsPage = () => {
  const settingsSections = [
    { icon: Globe, title: "General Settings", desc: "Manage store name, contact info, and branding." },
    { icon: CreditCard, title: "Payment Gateways", desc: "Configure Stripe, PayPal, and Apple Pay." },
    { icon: Lock, title: "API & Security", desc: "Manage API keys and administrative access." },
    { icon: Bell, title: "Notifications", desc: "Customize customer emails and internal alerts." },
  ];

  return (
    <div className="p-10">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Store Settings</h1>
        <p className="text-muted text-sm">Configure your global ecommerce infrastructure.</p>
      </header>

      <div className="max-w-4xl space-y-4">
         {settingsSections.map((section) => (
           <div key={section.title} className="glass p-8 rounded-[32px] border border-white/5 flex items-center justify-between hover:bg-white/[0.03] transition-all cursor-pointer group">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <section.icon size={24} />
                 </div>
                 <div>
                    <h3 className="text-lg font-bold mb-1">{section.title}</h3>
                    <p className="text-sm text-muted">{section.desc}</p>
                 </div>
              </div>
              <ChevronRight size={20} className="text-muted group-hover:text-white transition-colors" />
           </div>
         ))}
      </div>

      <div className="mt-12 pt-12 border-t border-white/5 max-w-4xl">
         <div className="glass p-10 rounded-[40px] border border-red-500/10 flex items-center justify-between bg-red-500/[0.02]">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <ShieldAlert size={24} />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-red-400 mb-1">Maintenance Mode</h3>
                  <p className="text-sm text-muted">Temporarily disable the store for scheduled updates.</p>
               </div>
            </div>
            <button className="w-12 h-6 bg-white/10 rounded-full relative p-1 flex items-center">
               <div className="w-4 h-4 bg-white/20 rounded-full" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;
