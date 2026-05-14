import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative bg-background overflow-x-hidden">
      <Hero />
      <Features />
      
      {/* Product Showcase Section */}
      <section id="product" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bold mb-12 tracking-tight uppercase">
            CRAFTED FROM <br />
            <span className="text-gradient-gold">AEROSPACE TITANIUM.</span>
          </h2>
          
          <div className="relative aspect-video rounded-[48px] overflow-hidden bg-black border border-white/5 group shadow-2xl">
             {/* Deep Cinematic Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(198,169,114,0.1)_0%,transparent_70%)] pointer-events-none" />
             
             {/* Center Image with Seamless Blend */}
             <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="relative w-full h-full">
                   <Image 
                     src="/images/hero.png" 
                     alt="Titanium Core" 
                     fill
                     unoptimized
                     className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 group-hover:opacity-100"
                   />
                   {/* Gradient Masks for Seamless Edge Blending */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                   <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60" />
                </div>
             </div>

             <div className="absolute bottom-12 left-12 right-12 z-20 text-left">
                <div className="glass-dark inline-block px-4 py-1 rounded-full border border-white/10 mb-4">
                   <p className="text-accent font-bold uppercase tracking-widest text-[10px]">Unmatched Durability</p>
                </div>
                <h3 className="text-4xl font-bold mb-4 tracking-tight">Built to last a lifetime.</h3>
                <p className="text-muted max-w-xl text-sm leading-relaxed">
                  The Owl Ring features a reinforced titanium core with a diamond-like carbon (DLC) coating, 
                  making it virtually scratch-proof and water-resistant up to 100 meters.
                </p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
