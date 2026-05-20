import React from "react";
import { PackageOpen, Download, Bluetooth, Target, Activity } from "lucide-react";

interface HowItWorksProps {
  currentChapter: number;
}

export default function HowItWorks({ currentChapter }: HowItWorksProps) {
  const steps = [
    { icon: <PackageOpen size={16} />, title: "Unbox & Wear", desc: "Slip on the feather-light titanium ring. No screens, no buttons." },
    { icon: <Download size={16} />, title: "Download the App", desc: "Install the Owl Companion App on iOS or Android — free, no subscription." },
    { icon: <Bluetooth size={16} />, title: "Pair Instantly", desc: "Bluetooth LE 5.3 connects in under 3 seconds. Silent and seamless." },
    { icon: <Target size={16} />, title: "Set Your Silent Alarm", desc: "Schedule your wake-up once. The ring gently vibrates at the lightest phase of your sleep cycle." },
    { icon: <Activity size={16} />, title: "Wake Up Better", desc: "See your Sleep Score, Recovery Index, and daily wellness brief every morning." }
  ];

  return (
    <div className={`absolute inset-0 w-full h-full flex items-center justify-start px-8 md:px-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-40 safe-text-gradient ${
      currentChapter === 8 ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-12"
    }`}>
      <div className="max-w-[480px] w-full text-left flex flex-col gap-8">
        
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase transition-all duration-[1000ms] delay-75">
            YOUR WELLNESS JOURNEY
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic mt-4 transition-all duration-[1200ms] delay-150">
            UP AND RUNNING IN
            <br />MINUTES.
          </h2>
          <p className="text-premium-body text-shadow-cinematic mt-6 transition-all duration-[1200ms] delay-300">
            No cluttered menus. No learning curve. Slip it on, pair once, and let the Owl Ring silently take care of the rest.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          <div className="absolute left-5 top-4 bottom-4 w-px bg-white/10 z-0" />
          
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4 relative z-10 group">
              <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors shadow-lg">
                <div className="text-neutral-400 group-hover:text-white transition-colors">
                  {step.icon}
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">{step.title}</h4>
                <p className="text-neutral-400 text-xs font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
