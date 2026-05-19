"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    
    checkAuth();
    window.addEventListener("storage", checkAuth);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const navLinks = [
    { name: "The Ring", href: "/#product" },
    { name: "Features", href: "/#features" },
    { name: "Sizing", href: "/#sizing" },
    { name: "Support", href: "/support" },
  ];

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null; // Admin has its own sidebar

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12",
        scrolled ? "py-4" : "py-8"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 px-6 py-3 rounded-full border border-white/5",
          scrolled ? "glass-dark shadow-premium" : "bg-transparent border-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group select-none">
          <div className="relative h-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
            <img 
              src="/images/logo.png" 
              alt="Owl Brand Logo" 
              className="h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full text-shadow-cinematic select-none",
                pathname === link.href ? "text-accent" : "text-muted hover:text-white"
              )}
            >
              {hoveredIndex === idx && (
                <motion.span
                  layoutId="navHoverBackdrop"
                  className="absolute inset-0 bg-white/5 rounded-full z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Link href="/profile" className="text-muted hover:text-white transition-colors">
                <User size={20} />
              </Link>
            ) : (
              <Link href="/auth/login" className="text-xs font-bold uppercase tracking-widest text-muted hover:text-white transition-colors">
                Sign In
              </Link>
            )}
            <Link href="/checkout" className="text-muted hover:text-white transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-4 glass-dark rounded-3xl p-8 flex flex-col gap-6 shadow-2xl border border-white/10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-muted hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 w-full" />
            <div className="flex justify-between items-center">
              {isLoggedIn ? (
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white">
                  My Profile
                </Link>
              ) : (
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white">
                  Sign In
                </Link>
              )}
              <Link href="/checkout" onClick={() => setMobileMenuOpen(false)} className="relative text-white">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-black text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
              </Link>
            </div>
            <Link 
              href="/admin/dashboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-muted/50 uppercase tracking-widest font-bold text-center mt-4"
            >
              Admin Access
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
