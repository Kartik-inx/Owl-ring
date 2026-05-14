"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, MapPin, Bell, Shield, LogOut, Home, Briefcase, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { USERS } from "@/lib/data";

const ProfilePage = () => {
  const router = useRouter();
  const user = USERS[0];
  const [activeTab, setActiveTab] = useState("personal");

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
    <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-12">Account Settings</h1>

      <div className="grid lg:grid-cols-4 gap-12">
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all",
                activeTab === tab.id ? "bg-accent/10 text-accent border border-accent/20" : "text-muted hover:bg-white/5 hover:text-white"
              )}
            >
              <tab.icon size={20} />
              <span className="font-bold text-sm uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
          <div className="h-px bg-white/5 my-4" />
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/5 transition-all"
          >
             <LogOut size={20} />
             <span className="font-bold text-sm uppercase tracking-widest">Sign Out</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
           <div className="glass p-10 rounded-[40px] border border-white/5">
              {activeTab === "personal" && (
                <div className="space-y-8">
                   <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                      <div className="w-24 h-24 rounded-full bg-gold-gradient p-1">
                         <div className="w-full h-full rounded-full bg-surface flex items-center justify-center text-3xl font-bold">{user.avatar}</div>
                      </div>
                      <div>
                         <h2 className="text-2xl font-bold">{user.name}</h2>
                         <p className="text-muted text-sm uppercase tracking-widest font-medium">Premium Member Since {user.joined}</p>
                      </div>
                      <button className="ml-auto text-xs font-bold text-accent uppercase tracking-widest underline underline-offset-4">Edit Photo</button>
                   </div>

                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Full Name</label>
                         <input 
                           type="text" 
                           defaultValue={user.name} 
                           className="w-full bg-input-bg border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-300" 
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Email Address</label>
                         <input 
                           type="email" 
                           defaultValue={user.email} 
                           className="w-full bg-input-bg border border-white/5 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-accent/30 focus:bg-white/[0.04] transition-all duration-300" 
                         />
                      </div>
                   </div>

                   <div className="pt-4">
                      <button className="px-10 py-4 bg-gold-gradient text-black font-bold rounded-2xl hover:scale-[1.02] transition-transform">Save Changes</button>
                   </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="space-y-8">
                   <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold">Saved Addresses</h2>
                      <button className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest">
                         <Plus size={16} />
                         Add New
                      </button>
                   </div>

                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="glass p-6 rounded-3xl border border-accent/20 relative">
                         <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-accent/10 rounded-xl text-accent"><Home size={20} /></div>
                            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Default</span>
                         </div>
                         <p className="font-bold mb-1">Home</p>
                         <p className="text-sm text-muted leading-relaxed">
                            123 Innovation Drive<br />
                            Suite 500, Tech Valley<br />
                            CA 94043, United States
                         </p>
                      </div>
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
