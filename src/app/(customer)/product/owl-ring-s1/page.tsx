"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star, Shield, Truck, RefreshCcw, Minus, Plus, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/data";

const ProductDetails = () => {
  const product = PRODUCTS[0];
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState("10");
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    "/images/ring-1.jpg",
    "/images/ring-2.jpg",
    "/images/ring-3.jpg",
    "/images/ring-4.jpg",
    "/images/ring-5.jpg"
  ];
  const [selectedImage, setSelectedImage] = useState(productImages[0]);

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <nav className="flex items-center gap-2 text-xs font-medium text-muted uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-white">{product.name} Series 1</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Product Images */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              className="relative aspect-square rounded-[48px] overflow-hidden glass border border-white/5 flex items-center justify-center group"
            >
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-6 right-6 glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10">
                Series 1
              </div>
            </motion.div>
            
            <div className="grid grid-cols-5 gap-4">
               {productImages.map((img, idx) => (
                 <div 
                   key={idx} 
                   onClick={() => setSelectedImage(img)}
                   className={cn(
                     "relative aspect-square rounded-3xl glass border cursor-pointer hover:border-accent transition-colors flex items-center justify-center overflow-hidden",
                     selectedImage === img ? "border-accent ring-1 ring-accent" : "border-white/5"
                   )}
                 >
                    <Image src={img} alt={`Thumb ${idx + 1}`} fill unoptimized className={cn(
                      "object-cover transition-opacity",
                      selectedImage === img ? "opacity-100" : "opacity-50 hover:opacity-100"
                    )} />
                 </div>
               ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                 <div className="flex text-accent">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                 </div>
                 <span className="text-xs text-muted font-medium uppercase tracking-widest">{product.reviews} Reviews</span>
              </div>
              <h1 className="text-5xl font-bold mb-4 tracking-tight">OWL RING <span className="text-gradient-gold">S1</span></h1>
              <p className="text-2xl font-bold text-accent">${product.colors.find(c => c.name === selectedColor)?.price}</p>
            </div>

            <p className="text-muted leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Finish: <span className="text-muted">{selectedColor}</span></h3>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center",
                      selectedColor === color.name ? "border-accent scale-110" : "border-transparent"
                    )}
                  >
                    <div 
                      className="w-8 h-8 rounded-full shadow-inner" 
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest">Select Size</h3>
                <button className="text-xs text-accent underline underline-offset-4 uppercase tracking-widest font-bold">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-3 rounded-2xl glass border font-bold transition-all",
                      selectedSize === size ? "border-accent text-accent bg-accent/10" : "border-white/5 text-muted hover:border-white/20"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center glass rounded-2xl border border-white/5 px-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-muted hover:text-white"><Minus size={16} /></button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-muted hover:text-white"><Plus size={16} /></button>
              </div>
              <Link href="/checkout" className="flex-1">
                <button className="w-full bg-gold-gradient text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-premium glow-hover">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
