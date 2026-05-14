"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  AlertCircle,
  TrendingUp,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin/dashboard" },
    { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
    { icon: ShoppingBag, label: "Products", href: "/admin/products" },
    { icon: AlertCircle, label: "Refunds", href: "/admin/refunds" },
    { icon: Users, label: "Customers", href: "/admin/users" },
    { icon: TrendingUp, label: "Revenue", href: "/admin/revenue" },
    { icon: FileText, label: "CMS Content", href: "/admin/content" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="w-64 glass-dark border-r border-white/5 h-screen flex flex-col p-6 sticky top-0 shrink-0 overflow-y-auto">
      <div className="flex items-center gap-2 mb-12">
        <Link href="/" className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-gold-gradient" />
           <span className="text-xl font-heading font-bold tracking-tighter text-white">OWL ADMIN</span>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all",
              pathname === item.href ? "bg-accent/10 text-accent border border-accent/20" : "text-muted hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="p-4 glass rounded-3xl border border-white/5">
          <p className="text-[10px] text-muted mb-2 font-bold uppercase tracking-widest">Support</p>
          <button className="text-sm font-medium text-white hover:text-accent transition-colors">Documentation</button>
        </div>
        <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/5 transition-all">
           <LogOut size={20} />
           <span className="font-bold text-sm uppercase tracking-widest">Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
