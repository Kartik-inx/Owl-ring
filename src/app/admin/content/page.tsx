"use client";

import React from "react";
import { 
  Plus,
  Search,
  FileText,
  Eye,
  Edit2,
  Globe,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const CMSPage = () => {
  const pages = [
    { title: "Home Page", slug: "/", lastModified: "2 hours ago", status: "Published" },
    { title: "The Tech", slug: "/tech", lastModified: "1 day ago", status: "Published" },
    { title: "About Us", slug: "/about", lastModified: "3 days ago", status: "Published" },
    { title: "Privacy Policy", slug: "/privacy", lastModified: "1 week ago", status: "Draft" },
  ];

  return (
    <div className="p-10">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">CMS Management</h1>
          <p className="text-muted text-sm">Manage your marketing pages and blog content.</p>
        </div>

        <button className="bg-gold-gradient text-black font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-premium">
           <Plus size={20} />
           Create Page
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {pages.map((page) => (
           <div key={page.slug} className="glass p-8 rounded-[40px] border border-white/5 group hover:border-accent/30 transition-all">
              <div className="flex justify-between items-start mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                    <Globe size={24} />
                 </div>
                 <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                    page.status === "Published" ? "border-green-500/20 text-green-400 bg-green-500/5" : "border-white/10 text-muted bg-white/5"
                 )}>
                    {page.status}
                 </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{page.title}</h3>
              <p className="text-sm text-muted mb-8 tracking-wide">{page.slug}</p>
              
              <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-auto">
                 <div className="flex items-center gap-2 text-[10px] text-muted uppercase tracking-widest">
                    <Clock size={12} />
                    Edited {page.lastModified}
                 </div>
                 <div className="flex gap-2">
                    <button className="p-2 glass rounded-xl border border-white/5 text-muted hover:text-white transition-colors"><Eye size={16} /></button>
                    <button className="p-2 glass rounded-xl border border-white/5 text-muted hover:text-accent transition-colors"><Edit2 size={16} /></button>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default CMSPage;
