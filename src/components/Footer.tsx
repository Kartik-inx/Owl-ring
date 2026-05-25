"use client";

import React from "react";
import Link from "next/link";
import { Globe, Mail, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  
  // Hide footer on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  const links = {
    Product: [
      { name: "The Ring", href: "/#product" },
      { name: "Sizing", href: "/#sizing" },
      { name: "Science", href: "/tech" },
      { name: "Owl App", href: "/app" },
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

  return (
    <footer className="bg-background border-t border-white/5 pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-6 group select-none focus:outline-none">
              <div className="relative h-10 md:h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <img 
                  src="/images/logo.png" 
                  alt="Owl Brand Logo" 
                  className="h-full object-contain"
                />
              </div>
            </Link>
            <p className="text-muted text-sm max-w-xs mb-8 leading-relaxed">
              Advancing human potential through elegant, invisible technology. 
              Join the evolution of wellness.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 glass rounded-full hover:text-accent transition-colors"><Globe size={18} /></a>
              <a href="#" className="p-3 glass rounded-full hover:text-accent transition-colors"><Mail size={18} /></a>
              <a href="#" className="p-3 glass rounded-full hover:text-accent transition-colors"><MessageSquare size={18} /></a>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-6">{title}</h4>
              <ul className="space-y-4">
                {items.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-muted uppercase tracking-widest font-medium">
            © 2026 Owl Tech Inc. Designed for the future.
          </p>
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
