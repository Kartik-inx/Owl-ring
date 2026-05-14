"use client";

import React from "react";
import { 
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AdminProductsPage = () => {
  const products = [
    { id: "S1-BLK", name: "Owl Ring S1", variant: "Stealth Black", stock: 45, price: "$399", status: "In Stock" },
    { id: "S1-SLV", name: "Owl Ring S1", variant: "Lunar Silver", stock: 12, price: "$399", status: "Low Stock" },
    { id: "S1-GLD", name: "Owl Ring S1", variant: "24K Gold", stock: 0, price: "$499", status: "Out of Stock" },
  ];

  return (
    <div className="p-10">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Inventory</h1>
          <p className="text-muted text-sm">Manage your premium product catalog and variants.</p>
        </div>

        <button className="bg-gold-gradient text-black font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-premium">
           <Plus size={20} />
           Add Product
        </button>
      </header>

      <div className="glass rounded-[40px] border border-white/5 overflow-hidden">
         <div className="p-8 border-b border-white/5">
            <div className="relative w-96">
               <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
               <input 
                 type="text" 
                 placeholder="Search products..." 
                 className="w-full bg-white/5 border border-white/5 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
               />
            </div>
         </div>

         <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {products.map((product) => (
                 <div key={product.id} className="glass p-6 rounded-[32px] border border-white/5 group hover:border-accent/20 transition-all">
                    <div className="flex justify-between items-start mb-6">
                       <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-accent">
                          <Package size={32} />
                       </div>
                       <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                          product.status === "In Stock" && "border-green-500/20 text-green-400 bg-green-500/5",
                          product.status === "Low Stock" && "border-yellow-500/20 text-yellow-400 bg-yellow-500/5",
                          product.status === "Out of Stock" && "border-red-500/20 text-red-400 bg-red-500/5",
                       )}>
                          {product.status}
                       </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                    <p className="text-xs text-muted uppercase tracking-widest font-bold mb-4">{product.variant}</p>
                    
                    <div className="flex justify-between items-end pt-6 border-t border-white/5 mt-auto">
                       <div>
                          <p className="text-[10px] text-muted uppercase tracking-widest mb-1">Price</p>
                          <p className="text-xl font-bold">{product.price}</p>
                       </div>
                       <div className="flex gap-2">
                          <button className="p-2 glass rounded-xl border border-white/5 text-muted hover:text-white transition-colors"><Edit2 size={16} /></button>
                          <button className="p-2 glass rounded-xl border border-white/5 text-red-400 hover:bg-red-400/10 transition-colors"><Trash2 size={16} /></button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
