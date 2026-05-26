"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, MapPin, Bell, Shield, LogOut, Home, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { USERS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

const ProfilePage = () => {
  const router = useRouter();
  const user = USERS[0];
  const [activeTab, setActiveTab] = useState("personal");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/auth/login");
    // Force a re-render for components listening to localStorage
    window.dispatchEvent(new Event("storage"));
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 min-h-screen text-left">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 md:mb-12 text-white">
        Account Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-12 items-start">
        
        {/* MOBILE NAVIGATION: COLLAPSIBLE DROPDOWN (Shown < 768px) */}
        <div className="md:hidden relative mb-6 z-30">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-white hover:bg-white/[0.05] transition-all duration-300 pointer-events-auto shadow-lg"
          >
            <div className="flex items-center gap-4">
              {React.createElement(tabs.find(t => t.id === activeTab)?.icon || User, { size: 20, className: "text-accent" })}
              <span className="font-bold text-sm uppercase tracking-widest text-white">
                {tabs.find(t => t.id === activeTab)?.label}
              </span>
            </div>
            <ChevronDown size={20} className={cn("text-neutral-400 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#111111]/90 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden z-30 shadow-2xl"
              >
                <div className="py-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 px-6 py-3.5 transition-all text-left",
                        activeTab === tab.id ? "bg-accent/10 text-accent font-semibold" : "text-white/60 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <tab.icon size={18} />
                      <span className="font-medium text-xs uppercase tracking-wider">{tab.label}</span>
                    </button>
                  ))}
                  <div className="h-px bg-white/5 my-2" />
                  <button 
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-4 px-6 py-3.5 text-red-400 hover:bg-red-500/5 transition-all text-left"
                  >
                     <LogOut size={18} />
                     <span className="font-medium text-xs uppercase tracking-wider">Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TABLET & DESKTOP NAVIGATION: SIDEBAR (Shown >= 768px) */}
        <div className="hidden md:block space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all border border-transparent text-left",
                activeTab === tab.id ? "bg-accent/10 text-accent border-accent/20" : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              <tab.icon size={18} />
              <span className="font-bold text-xs uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
          <div className="h-px bg-white/5 my-4" />
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-red-400 hover:bg-red-500/5 border border-transparent transition-all text-left"
          >
             <LogOut size={18} />
             <span className="font-bold text-xs uppercase tracking-wider">Sign Out</span>
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="md:col-span-3">
           <div className="glass p-6 sm:p-8 md:p-10 rounded-[28px] sm:rounded-[36px] md:rounded-[40px] border border-white/5 shadow-2xl relative">
              
              {/* PERSONAL INFO TAB */}
              {activeTab === "personal" && (
                <div className="space-y-8">
                   {/* Profile Header Card */}
                   <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 pb-8 border-b border-white/5 relative">
                      {/* Avatar */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-gradient p-1 shrink-0 shadow-premium">
                         <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
                           {user.avatar}
                         </div>
                      </div>
                      
                      {/* Info Text */}
                      <div className="flex flex-col gap-1.5 justify-center mt-2 sm:mt-0">
                         <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">{user.name}</h2>
                         <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-widest font-medium">Premium Member Since {user.joined}</p>
                      </div>
                      
                      {/* Edit Button */}
                      <button className="sm:ml-auto text-xs font-bold text-accent uppercase tracking-widest underline underline-offset-4 hover:text-white transition-colors duration-300">
                        Edit Photo
                      </button>
                   </div>

                   {/* Form Inputs Grid */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 text-left">
                         <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Full Name</label>
                         <input 
                           type="text" 
                           defaultValue={user.name} 
                           className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300" 
                         />
                      </div>
                      <div className="space-y-2 text-left">
                         <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Email Address</label>
                         <input 
                           type="email" 
                           defaultValue={user.email} 
                           className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300" 
                         />
                      </div>
                   </div>

                   {/* Save CTA */}
                   <div className="pt-4 flex justify-start">
                      <button className="w-full sm:w-auto px-8 py-3.5 bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 hover:shadow-[0_0_25px_rgba(198,169,114,0.25)] cursor-pointer select-none">
                        Save Changes
                      </button>
                   </div>
                </div>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === "addresses" && (
                <div className="space-y-8">
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-8 items-start">
                      <h2 className="text-xl sm:text-2xl font-semibold text-white">Saved Addresses</h2>
                      <button className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest hover:text-white transition-colors duration-300">
                         <Plus size={16} />
                         Add New
                      </button>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                      <div className="glass p-6 rounded-2xl border border-accent/20 relative shadow-lg">
                         <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-accent/10 rounded-xl text-accent"><Home size={20} /></div>
                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Default</span>
                         </div>
                         <p className="font-bold text-white mb-1">Home</p>
                         <p className="text-sm text-white/50 leading-relaxed font-light">
                            123 Innovation Drive<br />
                            Suite 500, Tech Valley<br />
                            CA 94043, United States
                          </p>
                      </div>
                   </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <div className="space-y-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white text-left">Security Settings</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">Current Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300" 
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">New Password</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(198,169,114,0.05)] transition-all duration-300" 
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-start">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 hover:shadow-[0_0_25px_rgba(198,169,114,0.25)] cursor-pointer select-none">
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === "notifications" && (
                <div className="space-y-8">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white text-left">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { title: "Biometric Insights", desc: "Weekly trends and telemetry reports of your sleep and wellness." },
                      { title: "Battery Alerts", desc: "Receive alerts when your Owl Ring is low on charge." },
                      { title: "Order Updates", desc: "Shipping confirmations, delivery notifications, and receipt invoices." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl gap-6">
                        <div className="space-y-1 text-left">
                          <h4 className="text-sm font-medium text-white">{item.title}</h4>
                          <p className="text-xs text-white/40 leading-relaxed font-light">{item.desc}</p>
                        </div>
                        {/* Premium custom toggle button */}
                        <button className="relative w-10 h-6 bg-accent/20 rounded-full transition-colors duration-300 flex items-center p-0.5 border border-accent/20 shrink-0">
                          <span className="w-4.5 h-4.5 bg-accent rounded-full shadow-md translate-x-4.5 transition-transform duration-300" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
