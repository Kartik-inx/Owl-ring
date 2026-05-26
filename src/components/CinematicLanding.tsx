"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import HeroSection from "./landing/HeroSection";
import EngineeringReveal from "./landing/EngineeringReveal";
import HealthIntelligence from "./landing/HealthIntelligence";
import BatteryCharging from "./landing/BatteryCharging";
import AppConnectivity from "./landing/AppConnectivity";

import HowItWorks from "./landing/HowItWorks";
import FaqCta from "./landing/FaqCta";
import ReviewsOverlay from "./landing/ReviewsOverlay";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tech specification matrix
const specifications = [
  { metric: "Shell Material", value: "Grade 5 Titanium", detail: "CNC-milled structural monocoque with DLC coating" },
  { metric: "Waterproofing", value: "10 ATM / 100m", detail: "Hermetically sealed dual-layer silicone gaskets" },
  { metric: "Sensors", value: "Triple PPG Array", detail: "Red, green, and infrared biometric optical diagnostic LEDs" },
  { metric: "Logic Unit", value: "Owl Neural Core", detail: "ARM Cortex-M4 with integrated neural inference engines" },
  { metric: "Energy Core", value: "Solid-State Cell", detail: "3.8V curved solid-state lithium-polymer battery" },
  { metric: "Coil Charge", value: "3-Winding Loop", detail: "Induction copper charging coils conforming to inner curves" }
];

// Color variant definitions (Defaulting to Stealth DLC)
const colors = [
  {
    id: "black",
    name: "Stealth DLC",
    value: "#1F2937",
    materialColor: 0x141414,
    roughness: 0.42,
    metalness: 0.9,
    desc: "Diamond-Like Carbon (DLC) physical vapor deposition. Milled matte black Grade 5 titanium shell with raw CNC edges."
  },
  {
    id: "gold",
    name: "Aureum Gold",
    value: "#C6A972",
    materialColor: 0xC6A972,
    roughness: 0.14,
    metalness: 0.95,
    desc: "Electroplated 24k polished gold accentuation. Features brushed micro-surface contours that diffuse studio specular highlights."
  },
  {
    id: "silver",
    name: "Natural Titanium",
    value: "#E5E7EB",
    materialColor: 0xD1D5DB,
    roughness: 0.12,
    metalness: 0.95,
    desc: "CNC-machined Grade 5 titanium alloy with polished chamfered edges and brushed side panels for a clean industrial look."
  }
];

const internalComponents = [
  { name: "Top Titanium Casing", category: "TITANIUM SHELL", desc: "Grade 5 titanium hemisphere with machined antenna isolator slots and DLC coating." },
  { name: "Bottom Titanium Casing", category: "TITANIUM SHELL", desc: "Seamless CNC mating line with laser-etched alignment markers." },
  { name: "Silicone Gasket", category: "WATERPROOF SEAL", desc: "Hermetically sealed dual-layer gaskets rated for 10 ATM / 100m depth." },
  { name: "Flexible Motherboard", category: "SENSOR ARCHITECTURE", desc: "Curved 3D flex substrate powering the Owl Neural Core with ARM Cortex-M4." },
  { name: "Biometric Telemetry", category: "AI SENSOR ARRAY", desc: "Triple PPG optical emitters with sapphire glass lenses for heart-rate and sleep tracking." },
  { name: "Solid-State Battery", category: "ENERGY CORE", desc: "3.8V curved lithium-polymer arc. Up to 7 days of continuous monitoring." },
  { name: "Induction Coil", category: "WIRELESS CHARGING", desc: "Triple-loop copper winding for high-efficiency magnetic alignment charging." },
  { name: "Inner Comfort Liner", category: "COMFORT RESIN", desc: "Hypoallergenic resin with micro comfort ridges. Ergonomic all-day wear." }
];

function MobileComponentsGrid() {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 z-20 bg-black/60 pointer-events-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.25em] text-accent uppercase">
            EXPLODED ARCHITECTURE
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
            THE 8 INNER SYSTEM LAYERS
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {internalComponents.map((comp, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05 } }}
              viewport={{ once: true, margin: "-50px" }}
              key={i}
              className="bg-neutral-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col gap-2 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-accent tracking-wider uppercase">{comp.category}</span>
                <span className="text-xs font-semibold text-neutral-600">0{i + 1}</span>
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-wide">{comp.name}</h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed mt-1">{comp.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileMaterialsCustomizer({ activeColor, handleColorChange }: { activeColor: typeof colors[0]; handleColorChange: (color: typeof colors[0]) => void }) {
  return (
    <section className="relative w-full py-16 px-6 sm:px-8 z-20 bg-black pointer-events-auto">
      <div className="max-w-2xl mx-auto flex flex-col gap-6 text-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="flex flex-col items-center animate-fade-in"
        >
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#c6a972] uppercase">
            ALL-DAY COMFORT
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-white leading-tight mt-3">
            GRADE 5 TITANIUM.
          </h2>
          <p className="text-premium-body text-sm mt-4 px-2">
            CNC-machined from aerospace-grade titanium with an ultra-lightweight comfort resin inner shell. Designed for 24/7 wear and complete 10 ATM water resistance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="w-full bg-neutral-900/30 border border-white/5 px-6 py-5 rounded-2xl shadow-xl max-w-md"
        >
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
            {activeColor.desc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 mt-2"
        >
          <div className="flex gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-xl">
            {colors.map((color) => {
              const isActive = activeColor.id === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color)}
                  className="group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  <span
                    className={`absolute -inset-1.5 rounded-full border-2 transition-all duration-500 scale-90 opacity-0 ${
                      isActive ? "border-accent scale-100 opacity-100" : "border-white/20 group-hover:scale-95 group-hover:opacity-40"
                    }`}
                  />
                  {isActive && <Check size={14} className="text-black stroke-[3]" />}
                </button>
              );
            })}
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-accent uppercase mt-1 pl-1">
            {activeColor.name}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default function CinematicLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepLightRef = useRef<THREE.SpotLight | null>(null);

  // Text container refs for scroll-driven animations
  const introTextRef = useRef<HTMLDivElement>(null);
  const spacerTextRef = useRef<HTMLDivElement>(null);
  const explodeTextRef = useRef<HTMLDivElement>(null);
  const specTextRef = useRef<HTMLDivElement>(null);

  // Interactive States
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [ecgPath, setEcgPath] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const lenisRef = useRef<Lenis | null>(null);
  const currentChapterRef = useRef(1);

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0);
  };

  const threeStateRef = useRef({
    activeHighlight: "", // "shell-top", "shell-bottom", "gasket", "pcb", "sensors", "coil", "battery", "liner"
    waterMode: 0,
    targetParticleColor: new THREE.Color(0x1F2937),

    // Decoupled reactive inputs to prevent WebGL teardown
    mouseX: 0,
    mouseY: 0,
    targetColor: colors[0].materialColor,
    roughness: colors[0].roughness,
    metalness: colors[0].metalness,
  });

  // Track Mouse movement for smooth parallax drift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      threeStateRef.current.mouseX = x;
      threeStateRef.current.mouseY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Procedural heart ECG path generator
  useEffect(() => {
    let frame = 0;
    const generateECG = () => {
      frame++;
      const width = 320;
      const height = 70;
      const points = [];
      const step = 3;

      for (let x = 0; x <= width; x += step) {
        let y = height / 2;
        const phase = (x - (frame * 1.8)) % 110;
        if (phase > 40 && phase < 45) {
          y -= Math.sin((phase - 40) * Math.PI / 5) * 8;
        } else if (phase >= 45 && phase < 48) {
          y += (phase - 45) * 5;
        } else if (phase >= 48 && phase < 52) {
          y -= (52 - phase) * 14;
        } else if (phase >= 52 && phase < 55) {
          y += (phase - 52) * 10;
        } else if (phase >= 60 && phase < 72) {
          y -= Math.sin((phase - 60) * Math.PI / 12) * 10;
        }
        points.push(`${x},${y}`);
      }
      setEcgPath(`M ${points.join(" L ")}`);
    };

    const interval = setInterval(generateECG, 30);
    return () => clearInterval(interval);
  }, []);

  // Initialize Lenis Smooth Scroll and synchronize with GSAP ScrollTrigger ticker loop
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current = null;
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  // Magnetic Button Interactions
  useEffect(() => {
    const magElements = document.querySelectorAll(".magnetic-btn");

    const mouseMoveListeners: { el: HTMLElement; handler: (e: MouseEvent) => void }[] = [];
    const mouseLeaveListeners: { el: HTMLElement; handler: () => void }[] = [];

    magElements.forEach((el) => {
      const htmlEl = el as HTMLElement;

      const onMouseMove = (e: MouseEvent) => {
        const rect = htmlEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const dist = Math.hypot(distanceX, distanceY);

        if (dist < 120) {
          gsap.to(htmlEl, {
            x: distanceX * 0.32,
            y: distanceY * 0.32,
            scale: 1.04,
            duration: 0.35,
            ease: "power2.out"
          });
          const text = htmlEl.querySelector(".magnetic-text");
          if (text) {
            gsap.to(text, {
              x: distanceX * 0.12,
              y: distanceY * 0.12,
              duration: 0.35,
              ease: "power2.out"
            });
          }
        } else {
          gsap.to(htmlEl, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1.1, 0.4)"
          });
          const text = htmlEl.querySelector(".magnetic-text");
          if (text) {
            gsap.to(text, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1.1, 0.4)"
            });
          }
        }
      };

      const onMouseLeave = () => {
        gsap.to(htmlEl, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "elastic.out(1.1, 0.3)"
        });
        const text = htmlEl.querySelector(".magnetic-text");
        if (text) {
          gsap.to(text, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1.1, 0.3)"
          });
        }
      };

      window.addEventListener("mousemove", onMouseMove);
      htmlEl.addEventListener("mouseleave", onMouseLeave);

      mouseMoveListeners.push({ el: htmlEl, handler: onMouseMove });
      mouseLeaveListeners.push({ el: htmlEl, handler: onMouseLeave });
    });

    return () => {
      mouseMoveListeners.forEach(({ handler }) => window.removeEventListener("mousemove", handler));
      mouseLeaveListeners.forEach(({ el, handler }) => el.removeEventListener("mouseleave", handler));
    };
  }, []);

  // Initialize Three.js WebGL Graphics and PBR Material Pipeline (Run once on mount)
  useEffect(() => {
    if (!canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.08);

    // Telephoto macro camera setup to eliminate perspective distortion and compression (15 deg FOV)
    const camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 100);
    camera.position.z = 10.0;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Optimized DPR for GPU friendliness
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.7;

    // PMREM Environment map compiling for premium reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();

    // Ambient backdrops
    const envBgGeom = new THREE.SphereGeometry(14, 32, 32);
    const envBgMat = new THREE.MeshBasicMaterial({ color: 0x010101, side: THREE.BackSide });
    const envBg = new THREE.Mesh(envBgGeom, envBgMat);
    envScene.add(envBg);

    // Dynamic high-intensity rectangular softbox reflection panels (Apple studio design)
    const panelGeom = new THREE.BoxGeometry(6, 12, 1);
    const panelMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const p1 = new THREE.Mesh(panelGeom, panelMat);
    p1.position.set(-9, 4, -7);
    p1.lookAt(0, 0, 0);
    envScene.add(p1);

    const p2 = new THREE.Mesh(panelGeom, panelMat);
    p2.position.set(9, 5, 7);
    p2.lookAt(0, 0, 0);
    envScene.add(p2);

    const p3 = new THREE.Mesh(panelGeom, panelMat);
    p3.position.set(0, 10, 0);
    p3.lookAt(0, 0, 0);
    envScene.add(p3);

    const envTarget = pmremGenerator.fromScene(envScene);
    scene.environment = envTarget.texture;

    // Root model anchor group
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // --- PROCEDURAL TEXTURES FOR INDUSTRIAL DESIGN DETAIL ---

    // 1. Brushed titanium micro-abrasions
    const tCanvas = document.createElement("canvas");
    tCanvas.width = 512;
    tCanvas.height = 512;
    const tCtx = tCanvas.getContext("2d");
    if (tCtx) {
      tCtx.fillStyle = "#888888";
      tCtx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 900; i++) {
        tCtx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.18})`;
        tCtx.lineWidth = 1 + Math.random() * 1.2;
        const y = Math.random() * 512;
        tCtx.beginPath();
        tCtx.moveTo(0, y);
        tCtx.lineTo(512, y);
        tCtx.stroke();
      }
    }
    const brushedTex = new THREE.CanvasTexture(tCanvas);
    brushedTex.wrapS = THREE.RepeatWrapping;
    brushedTex.wrapT = THREE.RepeatWrapping;
    brushedTex.repeat.set(4, 1);

    // 2. Micro-ribbed comfort sleeve grip
    const ribCanvas = document.createElement("canvas");
    ribCanvas.width = 256;
    ribCanvas.height = 256;
    const ribCtx = ribCanvas.getContext("2d");
    if (ribCtx) {
      ribCtx.fillStyle = "#ffffff";
      ribCtx.fillRect(0, 0, 256, 256);
      ribCtx.fillStyle = "#666666";
      for (let y = 0; y < 256; y += 8) {
        ribCtx.fillRect(0, y, 256, 3);
      }
    }
    const ribTex = new THREE.CanvasTexture(ribCanvas);
    ribTex.wrapS = THREE.RepeatWrapping;
    ribTex.wrapT = THREE.RepeatWrapping;
    ribTex.repeat.set(1, 24);

    // 3. Inner laser-engraved regulatory info
    const textCanvas = document.createElement("canvas");
    textCanvas.width = 1024;
    textCanvas.height = 128;
    const textCtx = textCanvas.getContext("2d");
    if (textCtx) {
      textCtx.fillStyle = "#0c0c0c";
      textCtx.fillRect(0, 0, 1024, 128);
      textCtx.font = "bold 15px Inter, sans-serif";
      textCtx.fillStyle = "rgba(198, 169, 114, 0.4)";
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      textCtx.fillText("OWL RING S1  •  TITANIUM GRADE 5  •  DESIGNED IN CALIFORNIA  •  FCC MODEL A2601  •  SN O-9821-X", 512, 64);
    }
    const markingsTex = new THREE.CanvasTexture(textCanvas);

    // 4. Flexible circuit copper trace wiring
    const pcbCanvas = document.createElement("canvas");
    pcbCanvas.width = 1024;
    pcbCanvas.height = 256;
    const pcbCtx = pcbCanvas.getContext("2d");
    if (pcbCtx) {
      pcbCtx.fillStyle = "#0b1c0f"; // Forest green PCB
      pcbCtx.fillRect(0, 0, 1024, 256);

      // Fine circuit grid overlay
      pcbCtx.strokeStyle = "rgba(25, 65, 30, 0.6)";
      pcbCtx.lineWidth = 1;
      for (let x = 0; x < 1024; x += 16) {
        pcbCtx.beginPath(); pcbCtx.moveTo(x, 0); pcbCtx.lineTo(x, 256); pcbCtx.stroke();
      }
      for (let y = 0; y < 256; y += 16) {
        pcbCtx.beginPath(); pcbCtx.moveTo(0, y); pcbCtx.lineTo(1024, y); pcbCtx.stroke();
      }

      // Draw procedural circuit copper traces
      pcbCtx.strokeStyle = "rgba(198, 169, 114, 0.7)";
      pcbCtx.lineWidth = 1.5;
      for (let j = 0; j < 18; j++) {
        let x = Math.random() * 1024;
        let y = Math.random() * 256;
        pcbCtx.beginPath();
        pcbCtx.moveTo(x, y);
        for (let step = 0; step < 4; step++) {
          const directions = [[45, 0], [0, 45], [45, 45], [-45, 45]];
          const dir = directions[Math.floor(Math.random() * directions.length)];
          x += dir[0];
          y += dir[1];
          pcbCtx.lineTo(x, y);
        }
        pcbCtx.stroke();

        // Tiny copper pads
        pcbCtx.fillStyle = "rgba(226, 207, 159, 0.9)";
        pcbCtx.beginPath();
        pcbCtx.arc(x, y, 2.5, 0, Math.PI * 2);
        pcbCtx.fill();
      }
    }
    const pcbTex = new THREE.CanvasTexture(pcbCanvas);

    // --- GEOMETRY CONSTRUCTION (TRUE INDUSTRIAL EXPLODED ARCHITECTURE) ---

    // 1. OUTER BLACK TITANIUM SHELL (Split vertically along Y=0 into Top and Bottom halves)

    // Top Shell Profile (from y=0 to y=0.19)
    const topShellPoints: THREE.Vector2[] = [];
    topShellPoints.push(new THREE.Vector2(1.44, 0.0));
    topShellPoints.push(new THREE.Vector2(1.50, 0.0));
    topShellPoints.push(new THREE.Vector2(1.50, 0.05));
    topShellPoints.push(new THREE.Vector2(1.472, 0.05));
    topShellPoints.push(new THREE.Vector2(1.472, 0.05));
    topShellPoints.push(new THREE.Vector2(1.50, 0.05));
    topShellPoints.push(new THREE.Vector2(1.50, 0.165));
    topShellPoints.push(new THREE.Vector2(1.485, 0.19));
    topShellPoints.push(new THREE.Vector2(1.44, 0.19));

    const topShellGeom = new THREE.LatheGeometry(topShellPoints, 128);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: colors[0].materialColor,
      metalness: colors[0].metalness,
      roughness: colors[0].roughness,
      clearcoat: 0.38,
      clearcoatRoughness: 0.16,
      envMapIntensity: 2.8,
      bumpMap: brushedTex,
      bumpScale: 0.0004,
      roughnessMap: brushedTex,
      iridescence: 0.08,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, 400],
      sheen: 0.25,
      sheenRoughness: 0.15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });

    const topShellMesh = new THREE.Mesh(topShellGeom, outerMat);
    const topShellGroup = new THREE.Group();
    topShellGroup.add(topShellMesh);
    ringGroup.add(topShellGroup);

    // Bottom Shell Profile (from y=-0.19 to y=0)
    const bottomShellPoints: THREE.Vector2[] = [];
    bottomShellPoints.push(new THREE.Vector2(1.44, -0.19));
    bottomShellPoints.push(new THREE.Vector2(1.485, -0.19));
    bottomShellPoints.push(new THREE.Vector2(1.50, -0.165));
    bottomShellPoints.push(new THREE.Vector2(1.50, -0.05));
    bottomShellPoints.push(new THREE.Vector2(1.472, -0.05));
    bottomShellPoints.push(new THREE.Vector2(1.472, -0.05));
    bottomShellPoints.push(new THREE.Vector2(1.50, -0.05));
    bottomShellPoints.push(new THREE.Vector2(1.50, 0.0));
    bottomShellPoints.push(new THREE.Vector2(1.44, 0.0));

    const bottomShellGeom = new THREE.LatheGeometry(bottomShellPoints, 128);
    const bottomShellMesh = new THREE.Mesh(bottomShellGeom, outerMat);
    const bottomShellGroup = new THREE.Group();
    bottomShellGroup.add(bottomShellMesh);
    ringGroup.add(bottomShellGroup);

    // Inlay decorative gold core strip (Split into Top and Bottom halves)
    const topAccentGeom = new THREE.CylinderGeometry(1.475, 1.475, 0.048, 128, 1, true);
    const accentMat = new THREE.MeshPhysicalMaterial({
      color: 0xC6A972,
      metalness: 0.95,
      roughness: 0.06,
      envMapIntensity: 2.5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });
    const topAccentMesh = new THREE.Mesh(topAccentGeom, accentMat);
    topAccentMesh.position.y = 0.024;
    topShellGroup.add(topAccentMesh);

    const bottomAccentMesh = topAccentMesh.clone();
    bottomAccentMesh.position.y = -0.024;
    bottomShellGroup.add(bottomAccentMesh);

    // Antenna Bands (Splits cleanly: Top band in top shell, bottom band in bottom shell)
    const antennaGeom = new THREE.CylinderGeometry(1.5015, 1.5015, 0.012, 128, 1, true);
    const antennaMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f1f1f,
      roughness: 0.65,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });

    // Top antenna band
    const ant2 = new THREE.Mesh(antennaGeom, antennaMat);
    ant2.position.y = 0.09;
    topShellGroup.add(ant2);

    // Bottom antenna band
    const ant1 = new THREE.Mesh(antennaGeom, antennaMat);
    ant1.position.y = -0.09;
    bottomShellGroup.add(ant1);

    // Precision CNC Badge Plate (moves with the top shell half)
    const logoGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.005, 32);
    const logoMat = new THREE.MeshStandardMaterial({
      color: 0xC6A972,
      metalness: 0.9,
      roughness: 0.1,
    });
    const logoMesh = new THREE.Mesh(logoGeom, logoMat);
    logoMesh.position.set(0, 0.045, 1.501);
    logoMesh.rotation.x = Math.PI / 2;
    topShellGroup.add(logoMesh);

    // 2. WATERPROOF PROTECTION LAYER (Dark Graphite Rubber Gasket)
    const gasketGeom = new THREE.CylinderGeometry(1.442, 1.442, 0.36, 128, 1, true);
    const gasketMat = new THREE.MeshPhysicalMaterial({
      color: 0x222222, // Dark graphite rubber
      roughness: 0.92,
      metalness: 0.02,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });
    const gasketMesh = new THREE.Mesh(gasketGeom, gasketMat);
    const gasketGroup = new THREE.Group();
    gasketGroup.add(gasketMesh);
    ringGroup.add(gasketGroup);

    // 3. FLEX PCB LAYER (Curved flexible motherboard with traces and capacitors)
    const pcbGeom = new THREE.CylinderGeometry(1.43, 1.43, 0.32, 64, 1, true);
    const pcbMat = new THREE.MeshPhysicalMaterial({
      map: pcbTex,
      bumpMap: pcbTex,
      bumpScale: 0.001,
      metalness: 0.45,
      roughness: 0.38,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });
    const pcbMesh = new THREE.Mesh(pcbGeom, pcbMat);
    ringGroup.add(pcbMesh);

    // Micro SMT Resistors/Capacitors on PCB surface
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      if (Math.abs(angle - Math.PI / 2) < 0.35) continue; // Keep clear for main CPU
      const compGeom = new THREE.BoxGeometry(0.04, 0.016, 0.05);
      const compMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x8e8e8e : 0x222222,
        metalness: 0.8,
        roughness: 0.15,
      });
      const compMesh = new THREE.Mesh(compGeom, compMat);
      compMesh.position.set(Math.cos(angle) * 1.4315, 0.06 * (i % 3 - 1), Math.sin(angle) * 1.4315);
      compMesh.rotation.y = -angle;
      pcbMesh.add(compMesh);
    }

    // 4. Owl Neural Core SoC (ARM processor board package)
    const chipGeom = new THREE.BoxGeometry(0.24, 0.08, 0.15);
    const chipMat = new THREE.MeshPhysicalMaterial({
      color: 0x242424,
      metalness: 0.85,
      roughness: 0.28,
      transparent: true,
      opacity: 1.0,
    });
    const chipMesh = new THREE.Mesh(chipGeom, chipMat);
    chipMesh.position.set(0, 0, 1.435);
    ringGroup.add(chipMesh);

    // Micro pins connecting chip to PCB
    const pinGeom = new THREE.CylinderGeometry(0.005, 0.005, 0.02, 8);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.9 });
    for (const xOffset of [-0.1, -0.05, 0, 0.05, 0.1]) {
      const pinLeft = new THREE.Mesh(pinGeom, pinMat);
      pinLeft.position.set(xOffset, -0.04, -0.07);
      pinLeft.rotation.z = Math.PI / 2;
      chipMesh.add(pinLeft);

      const pinRight = pinLeft.clone();
      pinRight.position.z = 0.07;
      chipMesh.add(pinRight);
    }

    // Glowing silicon core crystal (Neural logic light)
    const chipGlowGeom = new THREE.BoxGeometry(0.1, 0.015, 0.08);
    const chipGlowMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.85,
    });
    const chipGlowMesh = new THREE.Mesh(chipGlowGeom, chipGlowMat);
    chipGlowMesh.position.set(0, 0.045, 0);
    chipMesh.add(chipGlowMesh);

    // 5. SENSOR ARRAY (Heart-rate, temperature, sleep tracking modules that push out radially)
    const sensorGroup1 = new THREE.Group();
    const sensorGroup2 = new THREE.Group();
    ringGroup.add(sensorGroup1);
    ringGroup.add(sensorGroup2);

    const sensorFrameGeom = new THREE.BoxGeometry(0.13, 0.04, 0.13);
    const sensorFrameMat = new THREE.MeshStandardMaterial({ color: 0x181818, metalness: 0.9, roughness: 0.25 });

    // Sensor Package 1
    const sensorBody1 = new THREE.Mesh(sensorFrameGeom, sensorFrameMat);
    sensorGroup1.add(sensorBody1);

    // Sensor Package 2
    const sensorBody2 = new THREE.Mesh(sensorFrameGeom, sensorFrameMat);
    sensorGroup2.add(sensorBody2);

    // Emitters inside packages
    const hrSensorGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
    const hrSensorMat = new THREE.MeshBasicMaterial({ color: 0x00ff22, transparent: true, opacity: 0.8 });
    const hrEmitter = new THREE.Mesh(hrSensorGeom, hrSensorMat);
    hrEmitter.position.y = 0.022;
    sensorGroup1.add(hrEmitter);

    const sleepSensorGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
    const sleepSensorMat = new THREE.MeshBasicMaterial({ color: 0xff0044, transparent: true, opacity: 0.8 });
    const sleepEmitter = new THREE.Mesh(sleepSensorGeom, sleepSensorMat);
    sleepEmitter.position.y = 0.022;
    sensorGroup2.add(sleepEmitter);

    // Lens cover sapphire glass
    const lensGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.004, 16);
    const lensMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.01, transmission: 0.98, transparent: true });

    const lens1 = new THREE.Mesh(lensGeom, lensMat);
    lens1.position.y = 0.024;
    sensorGroup1.add(lens1);

    const lens2 = lens1.clone();
    sensorGroup2.add(lens2);

    // 6. BATTERY ARC (Curved lithium energy core that swings out slightly)
    const batteryGeom = new THREE.CylinderGeometry(1.398, 1.398, 0.26, 32, 1, true, 0, Math.PI * 0.7);
    const batteryMat = new THREE.MeshPhysicalMaterial({
      color: 0x2d3748, // Graphite coating
      metalness: 0.8,
      roughness: 0.35,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });
    const batteryMesh = new THREE.Mesh(batteryGeom, batteryMat);
    batteryMesh.rotation.y = Math.PI * 0.65;
    ringGroup.add(batteryMesh);

    // Gold anode/cathode contact terminals
    const terminalGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 16);
    const terminalMat = new THREE.MeshStandardMaterial({ color: 0xC6A972, metalness: 0.95, roughness: 0.1 });
    const term1 = new THREE.Mesh(terminalGeom, terminalMat);
    term1.position.set(Math.cos(0.04) * 1.402, 0.06, Math.sin(0.04) * 1.402);
    batteryMesh.add(term1);

    const term2 = term1.clone();
    term2.position.y = -0.06;
    batteryMesh.add(term2);

    // 7. CHARGING COIL (Induction flat copper winding ring)
    const coilMat = new THREE.MeshPhysicalMaterial({
      color: 0xd47326, // Copper amber
      metalness: 0.98,
      roughness: 0.18,
      envMapIntensity: 2.0,
      transparent: true,
      opacity: 1.0,
    });
    const coilGroup = new THREE.Group();
    for (const yOffset of [-0.07, 0, 0.07]) {
      const coilTorus = new THREE.TorusGeometry(1.408, 0.012, 8, 64);
      const coilMesh = new THREE.Mesh(coilTorus, coilMat);
      coilMesh.rotation.x = Math.PI / 2;
      coilMesh.position.y = yOffset;
      coilGroup.add(coilMesh);
    }
    ringGroup.add(coilGroup);

    // 8. INNER COMFORT LINER (Skin-contact sleeve with comfort ribs and laser details)
    const innerPoints: THREE.Vector2[] = [];
    innerPoints.push(new THREE.Vector2(1.44, -0.19));
    innerPoints.push(new THREE.Vector2(1.415, -0.13));
    innerPoints.push(new THREE.Vector2(1.39, 0.0));
    innerPoints.push(new THREE.Vector2(1.415, 0.13));
    innerPoints.push(new THREE.Vector2(1.44, 0.19));

    const innerGeom = new THREE.LatheGeometry(innerPoints, 128);
    const innerSleeveMat = new THREE.MeshPhysicalMaterial({
      color: 0x111111, // Smooth dark premium resin
      metalness: 0.2,
      roughness: 0.5,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.8,
      map: markingsTex,
      bumpMap: ribTex,
      bumpScale: 0.0008,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });
    const innerSleeveMesh = new THREE.Mesh(innerGeom, innerSleeveMat);
    const innerSleeveGroup = new THREE.Group();
    innerSleeveGroup.add(innerSleeveMesh);
    ringGroup.add(innerSleeveGroup);

    // Comfort sleeve sensor window cuts
    const windowGeom = new THREE.CylinderGeometry(0.082, 0.082, 0.02, 32);
    const windowMat = new THREE.MeshPhysicalMaterial({
      color: 0x020202,
      roughness: 0.01,
      metalness: 0.1,
      transmission: 0.98,
      transparent: true,
      opacity: 0.85,
    });

    const w1 = new THREE.Mesh(windowGeom, windowMat);
    w1.position.set(0, -1.39, 0);
    w1.rotation.x = Math.PI / 2;
    innerSleeveGroup.add(w1);

    const sleepAngle = Math.PI * 0.25;
    const w2 = new THREE.Mesh(windowGeom, windowMat);
    w2.position.set(Math.cos(sleepAngle) * 1.39, Math.sin(sleepAngle) * 1.39, 0);
    w2.rotation.z = -Math.PI / 4;
    innerSleeveGroup.add(w2);

    // Micro window bezel details
    const bezelGeom = new THREE.CylinderGeometry(0.088, 0.088, 0.022, 32);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.15 });

    const b1 = new THREE.Mesh(bezelGeom, bezelMat);
    b1.position.set(0, -1.389, 0);
    b1.rotation.x = Math.PI / 2;
    innerSleeveGroup.add(b1);

    const b2 = new THREE.Mesh(bezelGeom, bezelMat);
    b2.position.set(Math.cos(sleepAngle) * 1.389, Math.sin(sleepAngle) * 1.389, 0);
    b2.rotation.z = -Math.PI / 4;
    innerSleeveGroup.add(b2);

    // --- GROUND CONTACT SHADOW PLANE ---
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      grad.addColorStop(0.45, "rgba(0, 0, 0, 0.45)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeom = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.3;
    scene.add(shadowMesh);

    // --- TWO-LAYER ATMOSPHERIC PARTICLES ---
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 16, 16);
    }
    const teleTex = new THREE.CanvasTexture(pCanvas);

    // Layer 1: Distant slow-drifting dust motes
    const dustCount = 150;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSpeeds = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 14;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      dustSpeeds[i] = 0.001 + Math.random() * 0.003;
    }
    const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.09,
      color: 0xcccccc,
      transparent: true,
      opacity: 0.16,
      map: teleTex,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustSystem = new THREE.Points(dustGeom, dustMat);
    scene.add(dustSystem);

    // Layer 2: Fast-orbiting neural telemetry particles
    const teleCount = 500;
    const telePositions = new Float32Array(teleCount * 3);
    const teleAngles = new Float32Array(teleCount);
    const teleSpeeds = new Float32Array(teleCount);
    const teleRadii = new Float32Array(teleCount);
    for (let i = 0; i < teleCount; i++) {
      const radius = 1.9 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.0;

      telePositions[i * 3] = Math.cos(angle) * radius;
      telePositions[i * 3 + 1] = y;
      telePositions[i * 3 + 2] = Math.sin(angle) * radius;

      teleAngles[i] = angle;
      teleSpeeds[i] = 0.006 + Math.random() * 0.012;
      teleRadii[i] = radius;
    }
    const teleGeom = new THREE.BufferGeometry();
    teleGeom.setAttribute("position", new THREE.BufferAttribute(telePositions, 3));

    const teleMat = new THREE.PointsMaterial({
      size: 0.038,
      color: 0x1f2937,
      transparent: true,
      opacity: 0.42,
      map: teleTex,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const teleSystem = new THREE.Points(teleGeom, teleMat);
    scene.add(teleSystem);

    // --- HIGH-FIDELITY STUDIO LIGHT RIG (BRIGHT & CONTRASTY) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 6.0);
    keyLight.position.set(-6, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 4.0);
    fillLight.position.set(6, -4, 4);
    scene.add(fillLight);

    const topRim = new THREE.DirectionalLight(0xffffff, 3.5);
    topRim.position.set(0, 9, 2);
    scene.add(topRim);

    // Rim light from behind to trace boundaries
    const backRim = new THREE.DirectionalLight(0xffffff, 6.0);
    backRim.position.set(0, 0, -6);
    scene.add(backRim);

    // Soft cursor tracking spot
    const trackingLight = new THREE.PointLight(0xffffff, 12, 16);
    trackingLight.position.set(0, 0, 5);
    scene.add(trackingLight);

    // Ambient bounce card (floor reflection)
    const floorBounce = new THREE.DirectionalLight(0xC6A972, 1.5);
    floorBounce.position.set(0, -8, 2);
    scene.add(floorBounce);

    // Spotlight sweep light (triggered on finish clicks)
    const sweepLight = new THREE.SpotLight(0xffffff, 25, 28);
    sweepLight.position.set(-8, 5, 4);
    sweepLight.angle = Math.PI / 7;
    sweepLight.penumbra = 0.8;
    scene.add(sweepLight);
    sweepLightRef.current = sweepLight;

    // --- SCHEMATIC HUD ANCHORS POSITIONING ---
    const updateElbowLine = (lineId: string, labelId: string, mesh: THREE.Object3D, active: boolean, side: "left" | "right") => {
      const lineEl = document.getElementById(lineId);
      const labelEl = document.getElementById(labelId);
      const labelMobileEl = document.getElementById(labelId + "-mobile");

      if (!active) {
        if (lineEl) {
          lineEl.setAttribute("stroke-dashoffset", "1000");
          lineEl.style.opacity = "0";
        }
        if (labelEl) {
          labelEl.style.opacity = "0";
          labelEl.style.transform = `scale(0.94)`;
        }
        if (labelMobileEl) {
          labelMobileEl.style.opacity = "0";
          labelMobileEl.style.transform = "translateY(15px) scale(0.96)";
        }
        return;
      }

      // Update mobile label if it exists
      if (labelMobileEl) {
        labelMobileEl.style.opacity = "1";
        labelMobileEl.style.transform = "translateY(0) scale(1)";
      }

      if (!lineEl || !labelEl) return;

      mesh.getWorldPosition(pos);
      pos.project(camera);

      const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(pos.y * 0.5) + 0.5) * window.innerHeight;

      const rect = labelEl.getBoundingClientRect();
      const anchorX = side === "left" ? rect.right - 10 : rect.left + 10;
      const anchorY = rect.top + rect.height / 2;

      const midX = side === "left" ? anchorX + 40 : anchorX - 40;
      lineEl.setAttribute("d", `M ${anchorX} ${anchorY} L ${midX} ${anchorY} L ${x} ${y}`);
      lineEl.style.opacity = "1";
      lineEl.setAttribute("stroke-dashoffset", "0");

      labelEl.style.opacity = "1";
      labelEl.style.transform = "scale(1)";
    };

    // --- GSAP TIMELINE SYSTEM WITH LERP MOTION PHYSICS AND CHAPTER CONTROLS ---

    // Unified animation parameters targeted by GSAP
    const animState = {
      shellSplit: 0,
      gasketExpand: 0,
      pcbExpand: 0,
      sensorGlow: 0,
      batteryRotate: 0,
      coilExpand: 0,

      ringRotationX: 0.32,
      ringRotationY: 0.4,
      ringPositionX: 0,
      ringPositionY: 0,
      ringPositionZ: 1.5,
      ringScale: 0.48,

      cameraX: 0,
      cameraY: 0,
      cameraZ: 10.0,
      cameraFOV: 15.0,

      colorR: colors[0].materialColor >> 16 & 255,
      colorG: colors[0].materialColor >> 8 & 255,
      colorB: colors[0].materialColor & 255,
      roughness: colors[0].roughness,
      metalness: colors[0].metalness,
      canvasOpacity: 1.0,
    };

    const mm = gsap.matchMedia();

    // DESKTOP: >= 1024px
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1600%",
          scrub: 1.8,
          pin: true,
        },
        onUpdate: function() {
          const time = this.time();
          let chapter = 1;
          let particleColor = 0x1F2937;

          if (time >= 18.0) {
            chapter = 10;
            particleColor = 0x1F2937;
          } else if (time >= 16.0) {
            chapter = 9;
            particleColor = 0xC6A972;
          } else if (time >= 14.0) {
            chapter = 8;
            particleColor = 0x1F2937;
          } else if (time >= 12.0) {
            chapter = 7;
            particleColor = threeStateRef.current.targetColor;
          } else if (time >= 10.0) {
            chapter = 6;
            particleColor = 0x3B82F6;
          } else if (time >= 8.0) {
            chapter = 5;
            particleColor = 0xF59E0B;
          } else if (time >= 6.0) {
            chapter = 4;
            particleColor = 0xEF4444;
          } else if (time >= 4.0) {
            chapter = 3;
            particleColor = 0x3B82F6;
          } else if (time >= 2.0) {
            chapter = 2;
            particleColor = 0x3B82F6;
          } else {
            chapter = 1;
            particleColor = 0x1F2937;
          }

          threeStateRef.current.targetParticleColor.setHex(particleColor);

          if (chapter !== currentChapterRef.current) {
            currentChapterRef.current = chapter;
            setCurrentChapter(chapter);
          }
        }
      });

      tl.duration(20.0);

      // SECTION 1: Cinematic Hero (0 -> 2.0)
      tl.set(threeStateRef.current, { activeHighlight: "" }, 0.0);
      tl.to(animState, {
        ringRotationY: Math.PI * 0.8,
        ringRotationX: 0.22,
        ringScale: 0.50,
        ringPositionX: 0,
        ringPositionY: -0.82,
        cameraFOV: 14.5,
        shellSplit: 0,
        gasketExpand: 0,
        pcbExpand: 0,
        sensorGlow: 0,
        batteryRotate: 0,
        coilExpand: 0,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power1.inOut"
      }, 0);

      // SECTION 2: Engineering Reveal — Exploded View Labels (2.0 -> 4.0)
      tl.to(animState, {
        shellSplit: 1.0,
        gasketExpand: 1.0,
        pcbExpand: 1.0,
        sensorGlow: 1.0,
        batteryRotate: 0,
        coilExpand: 0,
        ringRotationX: 0.42,
        ringRotationY: Math.PI * 2.3,
        ringScale: 0.48,
        ringPositionX: 0,
        ringPositionY: 0,
        cameraFOV: 16.0,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power2.inOut"
      }, 2.0);

      tl.set(threeStateRef.current, { activeHighlight: "shell-top" }, 2.0);
      tl.set(threeStateRef.current, { activeHighlight: "shell-bottom" }, 2.2);
      tl.set(threeStateRef.current, { activeHighlight: "gasket" }, 2.4);
      tl.set(threeStateRef.current, { activeHighlight: "pcb" }, 2.6);
      tl.set(threeStateRef.current, { activeHighlight: "sensors" }, 2.8);
      tl.set(threeStateRef.current, { activeHighlight: "battery" }, 3.0);
      tl.set(threeStateRef.current, { activeHighlight: "coil" }, 3.2);
      tl.set(threeStateRef.current, { activeHighlight: "liner" }, 3.4);
      tl.set(threeStateRef.current, { activeHighlight: "" }, 3.8);

      // SECTION 3: Engineering Reveal Header (4.0 -> 6.0)
      tl.to(animState, {
        ringRotationY: Math.PI * 2.8,
        ringPositionX: 1.4,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power2.inOut"
      }, 4.0);

      // SECTION 4: Health Intelligence (6.0 -> 8.0)
      tl.to(animState, {
        shellSplit: 0,
        gasketExpand: 0,
        pcbExpand: 0,
        sensorGlow: 0,
        batteryRotate: 0,
        coilExpand: 0,
        ringPositionX: -1.6,
        ringPositionY: 0,
        ringScale: 0.44,
        ringRotationX: 1.2,
        ringRotationY: Math.PI * 3.5,
        cameraFOV: 15.0,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power2.inOut"
      }, 6.0);

      tl.set(threeStateRef.current, { activeHighlight: "", waterMode: 1 }, 6.0);

      // SECTION 5: Battery & Charging (8.0 -> 10.0)
      tl.to(animState, {
        ringScale: 0.52,
        ringPositionX: 1.2,
        ringPositionY: 0,
        batteryRotate: 1.0,
        coilExpand: 1.0,
        ringRotationX: 0.42,
        ringRotationY: Math.PI * 5.2,
        cameraFOV: 15.5,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power2.inOut"
      }, 8.0);

      tl.set(threeStateRef.current, { activeHighlight: "", waterMode: 0 }, 8.0);

      // SECTION 6: App Connectivity (10.0 -> 12.0)
      tl.to(animState, {
        batteryRotate: 0,
        coilExpand: 0,
        ringPositionX: -1.4,
        ringPositionY: 0,
        ringScale: 0.46,
        ringRotationX: -0.5,
        ringRotationY: Math.PI * 6.5,
        cameraFOV: 15.0,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power2.inOut"
      }, 10.0);

      tl.set(threeStateRef.current, { activeHighlight: "" }, 10.0);

      // SECTION 7: Premium Materials (12.0 -> 14.0)
      tl.to(animState, {
        ringPositionX: 1.0,
        ringPositionY: -0.25,
        ringScale: 0.78,
        ringRotationX: 1.4,
        ringRotationY: Math.PI * 8.0,
        cameraFOV: 11.5,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power2.inOut"
      }, 12.0);

      tl.set(threeStateRef.current, { activeHighlight: "" }, 12.0);

      // SECTION 8: How It Works (14.0 -> 16.0)
      tl.to(animState, {
        ringPositionX: 1.2,
        ringPositionY: 0,
        ringScale: 0.50,
        ringRotationX: 0.1,
        ringRotationY: Math.PI * 9.5,
        cameraFOV: 14.5,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power2.inOut"
      }, 14.0);

      // SECTION 9: Reviews (16.0 -> 18.0)
      tl.to(animState, {
        ringPositionX: -1.2,
        ringPositionY: 0,
        ringScale: 0.50,
        ringRotationX: 0.2,
        ringRotationY: Math.PI * 10.5,
        cameraFOV: 14.5,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power2.inOut"
      }, 16.0);

      // SECTION 10: FAQ + CTA (18.0 -> 20.0)
      tl.to(animState, {
        shellSplit: 0,
        gasketExpand: 0,
        pcbExpand: 0,
        sensorGlow: 0,
        batteryRotate: 0,
        coilExpand: 0,
        ringScale: 0.42,
        ringPositionX: 0,
        ringPositionY: 0.8,
        ringRotationX: 0.32,
        ringRotationY: Math.PI * 11.5,
        cameraFOV: 14.0,
        canvasOpacity: 1.0,
        duration: 2.0,
        ease: "power2.inOut"
      }, 18.0);

      tl.set(threeStateRef.current, { activeHighlight: "" }, 18.0);
    });

    // MOBILE: < 1024px
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.0,
        }
      });

      // Simple rotation as mobile page scrolls
      tl.to(animState, {
        ringRotationY: Math.PI * 2.0,
        ringRotationX: 0.3,
        ringScale: 0.48,
        ringPositionX: 0,
        ringPositionY: 0,
        cameraFOV: 15.0,
        shellSplit: 0.0,
        canvasOpacity: 1.0,
        duration: 2.0,
      });

      // Exploded view shown briefly during the scroll
      tl.to(animState, {
        shellSplit: 0.8,
        gasketExpand: 0.8,
        pcbExpand: 0.8,
        sensorGlow: 0.8,
        ringRotationY: Math.PI * 3.5,
        canvasOpacity: 0.6,
        duration: 2.5,
      });

      // Fade out completely as scroll moves further down
      tl.to(animState, {
        shellSplit: 0.0,
        gasketExpand: 0.0,
        pcbExpand: 0.0,
        sensorGlow: 0.0,
        ringScale: 0.1,
        canvasOpacity: 0.0,
        duration: 2.0,
      });
    });

    // --- RENDER LOOP AND PHYSICS EMULATION ---
    const pos = new THREE.Vector3();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const state = threeStateRef.current;

      // Handle dynamic opacity check and display toggling for performance optimization
      if (canvasRef.current) {
        canvasRef.current.style.opacity = animState.canvasOpacity.toString();
        if (animState.canvasOpacity <= 0.01) {
          canvasRef.current.style.display = "none";
          return; // Skip WebGL render loop calculations when not visible
        } else {
          canvasRef.current.style.display = "block";
        }
      }

      // 1. Interactive color interpolation (from refs)
      animState.colorR = THREE.MathUtils.lerp(animState.colorR, state.targetColor >> 16 & 255, 0.05);
      animState.colorG = THREE.MathUtils.lerp(animState.colorG, state.targetColor >> 8 & 255, 0.05);
      animState.colorB = THREE.MathUtils.lerp(animState.colorB, state.targetColor & 255, 0.05);
      animState.roughness = THREE.MathUtils.lerp(animState.roughness, state.roughness, 0.05);
      animState.metalness = THREE.MathUtils.lerp(animState.metalness, state.metalness, 0.05);

      const computedColor = new THREE.Color(animState.colorR / 255, animState.colorG / 255, animState.colorB / 255);
      outerMat.color.copy(computedColor);
      outerMat.roughness = animState.roughness;
      outerMat.metalness = animState.metalness;

      innerSleeveMat.color.lerp(computedColor, 0.04);
      teleMat.color.lerp(state.targetParticleColor, 0.05);

      // --- APPLY GSAP ANIMATION VALUE TRANSFORMS DIRECTLY ---

      // Outer shell halves slide vertically
      topShellGroup.position.y = animState.shellSplit * 0.45;
      bottomShellGroup.position.y = -animState.shellSplit * 0.45;

      // Waterproof gasket expands outward radially
      gasketGroup.scale.setScalar(1.0 + animState.gasketExpand * 0.16);

      // Flex PCB expands outward radially
      pcbMesh.scale.setScalar(1.0 + animState.pcbExpand * 0.22);
      chipMesh.position.z = 1.435 + animState.pcbExpand * 0.32;

      // Sensor packages slide out radially through ports
      const r1 = 1.39 + animState.sensorGlow * 0.38;
      sensorGroup1.position.set(0, -r1, 0);
      sensorGroup1.rotation.x = Math.PI / 2;

      const r2 = 1.39 + animState.sensorGlow * 0.38;
      sensorGroup2.position.set(Math.cos(sleepAngle) * r2, Math.sin(sleepAngle) * r2, 0);
      sensorGroup2.rotation.z = -Math.PI / 4;

      // Battery arc rotates outward
      batteryMesh.rotation.y = Math.PI * 0.65 + animState.batteryRotate * 0.26;
      batteryMesh.position.z = animState.batteryRotate * 0.12;

      // Charging coil expands radially
      coilGroup.scale.setScalar(1.0 + animState.coilExpand * 0.32);

      // Inner comfort liner stays anchored at center to provide a visual anchor
      innerSleeveGroup.position.set(0, 0, 0);

      // 4. Focus components transparencies
      const highlight = state.activeHighlight;
      const targetOpacities = {
        shellTop: highlight === "" || highlight === "shell-top" ? 1.0 : 0.3,
        shellBottom: highlight === "" || highlight === "shell-bottom" ? 1.0 : 0.3,
        gasket: highlight === "" || highlight === "gasket" ? 1.0 : 0.3,
        pcb: highlight === "" || highlight === "pcb" ? 1.0 : 0.3,
        sensors: highlight === "" || highlight === "sensors" ? 1.0 : 0.3,
        battery: highlight === "" || highlight === "battery" ? 1.0 : 0.3,
        coil: highlight === "" || highlight === "coil" ? 1.0 : 0.3,
        liner: highlight === "" || highlight === "liner" ? 1.0 : 0.3,
      };

      outerMat.opacity = THREE.MathUtils.lerp(outerMat.opacity, highlight === "shell-top" || highlight === "shell-bottom" || highlight === "" ? 1.0 : 0.3, 0.08);
      accentMat.opacity = THREE.MathUtils.lerp(accentMat.opacity, highlight === "shell-top" || highlight === "shell-bottom" || highlight === "" ? 1.0 : 0.3, 0.08);
      antennaMat.opacity = THREE.MathUtils.lerp(antennaMat.opacity, highlight === "shell-top" || highlight === "shell-bottom" || highlight === "" ? 1.0 : 0.3, 0.08);
      gasketMat.opacity = THREE.MathUtils.lerp(gasketMat.opacity, targetOpacities.gasket, 0.08);
      pcbMat.opacity = THREE.MathUtils.lerp(pcbMat.opacity, targetOpacities.pcb, 0.08);
      chipMat.opacity = THREE.MathUtils.lerp(chipMat.opacity, targetOpacities.pcb, 0.08);
      batteryMat.opacity = THREE.MathUtils.lerp(batteryMat.opacity, targetOpacities.battery, 0.08);
      coilMat.opacity = THREE.MathUtils.lerp(coilMat.opacity, targetOpacities.coil, 0.08);
      innerSleeveMat.opacity = THREE.MathUtils.lerp(innerSleeveMat.opacity, targetOpacities.liner, 0.08);
      windowMat.opacity = THREE.MathUtils.lerp(windowMat.opacity, highlight === "liner" || highlight === "" ? 0.85 : 0.15, 0.08);

      const pulseGlow = 0.5 + Math.sin(Date.now() * 0.005) * 0.45;
      chipGlowMat.opacity = highlight === "pcb" ? pulseGlow : 0.35;
      hrSensorMat.opacity = highlight === "sensors" ? pulseGlow : 0.2;
      sleepSensorMat.opacity = highlight === "sensors" ? pulseGlow : 0.2;

      // 5. Handheld camera movement drift (floating cinema rig feel)
      const timeVal = Date.now() * 0.0006;
      const driftX = Math.sin(timeVal * 0.4) * 0.02 + Math.cos(timeVal * 0.7) * 0.01;
      const driftY = Math.cos(timeVal * 0.3) * 0.02 + Math.sin(timeVal * 0.6) * 0.01;

      camera.position.x = animState.cameraX + driftX;
      camera.position.y = animState.cameraY + driftY;
      camera.position.z = animState.cameraZ;

      // Dynamic camera telephoto lens zoom compression (Macro DOF)
      camera.fov = THREE.MathUtils.lerp(camera.fov, animState.cameraFOV, 0.05);
      camera.updateProjectionMatrix();

      // Ground shadow sizing and diffusion mapping
      if (shadowMesh) {
        shadowMesh.scale.setScalar(1.0 + animState.shellSplit * 0.65);
        shadowMesh.material.opacity = THREE.MathUtils.lerp(0.65, 0.22, animState.shellSplit);
        shadowMesh.position.y = -2.3 + Math.sin(Date.now() * 0.001) * 0.03;
      }

      // Base ring rotation & positioning
      const ringFloat = Math.sin(Date.now() * 0.001) * 0.04;
      ringGroup.position.set(animState.ringPositionX, animState.ringPositionY + ringFloat, animState.ringPositionZ);
      ringGroup.scale.setScalar(animState.ringScale);

      // Decoupled mouse position readings to prevent layout reconstruction glitches
      ringGroup.rotation.x = THREE.MathUtils.lerp(ringGroup.rotation.x, animState.ringRotationX - state.mouseY * 0.08, 0.04);
      ringGroup.rotation.y = THREE.MathUtils.lerp(ringGroup.rotation.y, animState.ringRotationY + state.mouseX * 0.08, 0.04);

      // Project HUD elements
      updateElbowLine("line-shell-top", "label-shell-top", topShellMesh, highlight === "shell-top", "left");
      updateElbowLine("line-shell-bottom", "label-shell-bottom", bottomShellMesh, highlight === "shell-bottom", "left");
      updateElbowLine("line-gasket", "label-gasket", gasketMesh, highlight === "gasket", "left");
      updateElbowLine("line-pcb", "label-pcb", pcbMesh, highlight === "pcb", "left");
      updateElbowLine("line-sensors", "label-sensors", sensorBody1, highlight === "sensors", "right");
      updateElbowLine("line-battery", "label-battery", batteryMesh, highlight === "battery", "right");
      updateElbowLine("line-coil", "label-coil", coilGroup, highlight === "coil", "right");
      updateElbowLine("line-liner", "label-liner", innerSleeveMesh, highlight === "liner", "right");

      // Spotlight tracking
      trackingLight.position.x = state.mouseX * 5;
      trackingLight.position.y = state.mouseY * 5;

      // 6. Layered Particle Drift
      const dustPosArr = dustGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        dustPosArr[i * 3 + 1] -= dustSpeeds[i];
        if (dustPosArr[i * 3 + 1] < -4) {
          dustPosArr[i * 3 + 1] = 4;
          dustPosArr[i * 3] = (Math.random() - 0.5) * 14;
        }
      }
      dustGeom.attributes.position.needsUpdate = true;

      const telePosArr = teleGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < teleCount; i++) {
        let speedMultiplier = 1;
        if (state.waterMode === 1) {
          telePosArr[i * 3 + 1] += 0.024; // bubbles rising
          if (telePosArr[i * 3 + 1] > 3.5) telePosArr[i * 3 + 1] = -3.5;
          speedMultiplier = 0.2;
        }
        teleAngles[i] += teleSpeeds[i] * speedMultiplier;
        telePosArr[i * 3] = Math.cos(teleAngles[i]) * teleRadii[i];
        telePosArr[i * 3 + 2] = Math.sin(teleAngles[i]) * teleRadii[i];
      }
      teleGeom.attributes.position.needsUpdate = true;
      teleSystem.rotation.y += 0.0006;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      // Revert all GSAP matchMedia timelines and ScrollTriggers
      mm.revert();

      topShellGeom.dispose();
      bottomShellGeom.dispose();
      outerMat.dispose();
      topAccentGeom.dispose();
      accentMat.dispose();
      antennaGeom.dispose();
      antennaMat.dispose();
      logoGeom.dispose();
      logoMat.dispose();
      gasketGeom.dispose();
      gasketMat.dispose();
      pcbGeom.dispose();
      pcbMat.dispose();
      sensorFrameGeom.dispose();
      sensorFrameMat.dispose();
      hrSensorGeom.dispose();
      hrSensorMat.dispose();
      sleepSensorGeom.dispose();
      sleepSensorMat.dispose();
      lensGeom.dispose();
      lensMat.dispose();
      batteryGeom.dispose();
      batteryMat.dispose();
      terminalGeom.dispose();
      terminalMat.dispose();
      chipGeom.dispose();
      chipMat.dispose();
      chipGlowGeom.dispose();
      chipGlowMat.dispose();
      innerGeom.dispose();
      innerSleeveMat.dispose();
      windowGeom.dispose();
      windowMat.dispose();
      bezelGeom.dispose();
      bezelMat.dispose();
      shadowGeom.dispose();
      shadowMat.dispose();
      dustGeom.dispose();
      dustMat.dispose();
      teleGeom.dispose();
      teleMat.dispose();
      pmremGenerator.dispose();
      envBgGeom.dispose();
      envBgMat.dispose();
      panelGeom.dispose();
      panelMat.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  // Color customization handler
  const handleColorChange = (color: typeof colors[0]) => {
    setActiveColor(color);
    const state = threeStateRef.current;
    state.targetColor = color.materialColor;
    state.roughness = color.roughness;
    state.metalness = color.metalness;
    state.targetParticleColor.setStyle(color.value);

    // Dynamic light sweep reflection across anodized casing
    if (sweepLightRef.current) {
      gsap.fromTo(sweepLightRef.current.position,
        { x: -8 },
        { x: 8, duration: 1.5, ease: "power2.inOut" }
      );
    }
  };

  if (isMobile) {
    return (
      <div ref={containerRef} className="relative w-full bg-black text-white selection:bg-accent selection:text-black min-h-screen">
        {/* WEBGL CANVAS WRAPPER (Fixed behind content) */}
        <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-10">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block will-change-transform" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_15%,rgba(0,0,0,0.96)_85%)] pointer-events-none z-20" />
          <div
            className="absolute inset-0 transition-all duration-[2000ms] ease-out pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle at center, rgba(31, 41, 55, 0.22) 0%, rgba(0, 0, 0, 1) 80%)"
            }}
          />
        </div>

        {/* MOBILE SECTIONS FLOW */}
        <div className="relative w-full z-20 flex flex-col pointer-events-auto">
          <HeroSection currentChapter={currentChapter} isMobile={true} introTextRef={introTextRef} />
          
          <EngineeringReveal currentChapter={currentChapter} isMobile={true} explodeTextRef={explodeTextRef} />
          
          <MobileComponentsGrid />
          
          <HealthIntelligence currentChapter={currentChapter} isMobile={true} />
          
          <BatteryCharging currentChapter={currentChapter} isMobile={true} />
          
          <AppConnectivity currentChapter={currentChapter} isMobile={true} />
          
          <MobileMaterialsCustomizer activeColor={activeColor} handleColorChange={handleColorChange} />
          
          <HowItWorks currentChapter={currentChapter} isMobile={true} />
          
          <ReviewsOverlay currentChapter={currentChapter} isMobile={true} />
          
          <FaqCta currentChapter={currentChapter} isMobile={true} />
        </div>

        {/* Scroll to Top Button for mobile */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:text-accent shadow-premium pointer-events-auto cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="stroke-[2.5]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white selection:bg-accent selection:text-black h-screen overflow-hidden">

      {/* STICKY RENDER & NARRATIVE CANVAS */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* WEBGL CANVAS */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10 will-change-transform" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_15%,rgba(0,0,0,0.96)_85%)] pointer-events-none z-20" />

        {/* DYNAMIC AMBIENT BACKGROUND GLOW */}
        <div
          className="absolute inset-0 transition-all duration-[2000ms] ease-out pointer-events-none z-0"
          style={{
            background:
              currentChapter === 1 ? "radial-gradient(circle at center, rgba(31, 41, 55, 0.22) 0%, rgba(0, 0, 0, 1) 80%)" :
                currentChapter === 2 ? "radial-gradient(circle at center, rgba(30, 41, 59, 0.25) 0%, rgba(0, 0, 0, 1) 85%)" :
                  currentChapter === 3 ? "radial-gradient(circle at center, rgba(30, 41, 59, 0.25) 0%, rgba(0, 0, 0, 1) 85%)" :
                    currentChapter === 4 ? "radial-gradient(circle at center, rgba(59, 130, 246, 0.18) 0%, rgba(0, 0, 0, 1) 75%)" :
                      currentChapter === 5 ? "radial-gradient(circle at center, rgba(245, 158, 11, 0.16) 0%, rgba(0, 0, 0, 1) 80%)" :
                        currentChapter === 6 ? "radial-gradient(circle at center, rgba(59, 130, 246, 0.14) 0%, rgba(0, 0, 0, 1) 80%)" :
                          currentChapter === 7 ? `radial-gradient(circle at center, rgba(${activeColor.id === "gold" ? "198, 169, 114, 0.18" : "55, 65, 81, 0.2"}) 0%, rgba(0, 0, 0, 1) 80%)` :
                            currentChapter === 8 ? "radial-gradient(circle at center, rgba(31, 41, 55, 0.18) 0%, rgba(0, 0, 0, 1) 80%)" :
                              "radial-gradient(circle at center, rgba(198, 169, 114, 0.2) 0%, rgba(0, 0, 0, 1) 85%)"
          }}
        />

        {/* SVG INTERACTION ELBOW PATHS */}
        <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-40">
          <path id="line-shell-top" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-shell-bottom" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-gasket" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-pcb" fill="none" stroke="rgba(74, 222, 128, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-sensors" fill="none" stroke="rgba(239, 68, 68, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-battery" fill="none" stroke="rgba(251, 191, 36, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-coil" fill="none" stroke="rgba(249, 115, 22, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-liner" fill="none" stroke="rgba(198, 169, 114, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
        </svg>

        {/* ENGINEERING HUD LABELS (Three.js-referenced by ID) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden">

          {/* Left Aligned Columns */}
          <div className="hidden md:flex absolute top-[15%] sm:top-[20%] left-4 sm:left-6 md:left-20 flex-col gap-6 sm:gap-12 w-[calc(100%-2rem)] sm:w-auto max-w-[280px] sm:max-w-[320px]">

            <div
              id="label-shell-top"
              className="bg-black/65 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">TITANIUM SHELL</span>
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Top Casing</h4>
              <p className="text-xs text-muted leading-relaxed font-light mt-2">Grade 5 titanium hemisphere with machined antenna isolator slots and DLC coating.</p>
            </div>

            <div
              id="label-shell-bottom"
              className="bg-black/65 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">TITANIUM SHELL</span>
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Bottom Casing</h4>
              <p className="text-xs text-muted leading-relaxed font-light mt-2">Seamless CNC mating line with laser-etched alignment markers.</p>
            </div>

            <div
              id="label-gasket"
              className="bg-black/65 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                <span className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase">WATERPROOF SEAL</span>
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Silicone Gasket</h4>
              <p className="text-xs text-muted leading-relaxed font-light mt-2">Hermetically sealed dual-layer gaskets rated for 10 ATM / 100m depth.</p>
            </div>

            <div
              id="label-pcb"
              className="bg-black/65 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-bold text-green-400 tracking-[0.2em] uppercase">SENSOR ARCHITECTURE</span>
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Flexible Motherboard</h4>
              <p className="text-xs text-muted leading-relaxed font-light mt-2">Curved 3D flex substrate powering the Owl Neural Core with ARM Cortex-M4.</p>
            </div>

          </div>

          {/* Right Aligned Columns */}
          <div className="hidden md:flex absolute top-[15%] sm:top-[20%] right-4 sm:right-6 md:right-20 flex-col gap-6 sm:gap-12 w-[calc(100%-2rem)] sm:w-auto max-w-[280px] sm:max-w-[320px] text-right items-end">

            <div
              id="label-sensors"
              className="bg-black/65 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto flex flex-col items-end shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold text-red-500 tracking-[0.2em] uppercase">AI SENSOR ARRAY</span>
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Biometric Telemetry</h4>
              <p className="text-xs text-muted leading-relaxed font-light mt-2 text-right">Triple PPG optical emitters with sapphire glass lenses for heart-rate and sleep tracking.</p>
            </div>

            <div
              id="label-battery"
              className="bg-black/65 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto flex flex-col items-end shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-bold text-amber-400 tracking-[0.2em] uppercase">ENERGY CORE</span>
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Solid-State Battery</h4>
              <p className="text-xs text-muted leading-relaxed font-light mt-2 text-right">3.8V curved lithium-polymer arc. Up to 7 days of continuous monitoring.</p>
            </div>

            <div
              id="label-coil"
              className="bg-black/65 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto flex flex-col items-end shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase">WIRELESS CHARGING</span>
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Induction Coil</h4>
              <p className="text-xs text-muted leading-relaxed font-light mt-2 text-right">Triple-loop copper winding for high-efficiency magnetic alignment charging.</p>
            </div>

            <div
              id="label-liner"
              className="bg-black/65 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto flex flex-col items-end shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">COMFORT RESIN</span>
              </div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Inner Comfort Liner</h4>
              <p className="text-xs text-muted leading-relaxed font-light mt-2 text-right">Hypoallergenic resin with micro comfort ridges. Ergonomic all-day wear.</p>
            </div>

          </div>

          {/* MOBILE RESPONSIVE HUD CARDS (Visible only on mobile/tablet) */}
          <div className={`md:hidden absolute inset-0 z-30 flex flex-col items-center justify-center px-4 transition-opacity duration-500 pointer-events-none ${currentChapter === 2 ? "opacity-100" : "opacity-0"}`}>
            <div className="relative w-full max-w-sm h-[180px] pointer-events-none">
              {/* Cards stacked on top of each other */}
              
              {/* 1. Top Casing */}
              <div
                id="label-shell-top-mobile"
                className="absolute inset-0 bg-black/80 backdrop-blur-lg p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[9px] font-bold text-accent tracking-[0.2em] uppercase">TITANIUM SHELL</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Top Casing</h4>
                <p className="text-xs text-muted leading-relaxed font-light mt-1">Grade 5 titanium hemisphere with machined antenna isolator slots and DLC coating.</p>
              </div>

              {/* 2. Bottom Casing */}
              <div
                id="label-shell-bottom-mobile"
                className="absolute inset-0 bg-black/80 backdrop-blur-lg p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[9px] font-bold text-accent tracking-[0.2em] uppercase">TITANIUM SHELL</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Bottom Casing</h4>
                <p className="text-xs text-muted leading-relaxed font-light mt-1">Seamless CNC mating line with laser-etched alignment markers.</p>
              </div>

              {/* 3. Silicone Gasket */}
              <div
                id="label-gasket-mobile"
                className="absolute inset-0 bg-black/80 backdrop-blur-lg p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-neutral-400 tracking-[0.2em] uppercase">WATERPROOF SEAL</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Silicone Gasket</h4>
                <p className="text-xs text-muted leading-relaxed font-light mt-1">Hermetically sealed dual-layer gaskets rated for 10 ATM / 100m depth.</p>
              </div>

              {/* 4. Flexible Motherboard */}
              <div
                id="label-pcb-mobile"
                className="absolute inset-0 bg-black/80 backdrop-blur-lg p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-green-400 tracking-[0.2em] uppercase">SENSOR ARCHITECTURE</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Flexible Motherboard</h4>
                <p className="text-xs text-muted leading-relaxed font-light mt-1">Curved 3D flex substrate powering the Owl Neural Core with ARM Cortex-M4.</p>
              </div>

              {/* 5. Biometric Telemetry */}
              <div
                id="label-sensors-mobile"
                className="absolute inset-0 bg-black/80 backdrop-blur-lg p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-red-500 tracking-[0.2em] uppercase">AI SENSOR ARRAY</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Biometric Telemetry</h4>
                <p className="text-xs text-muted leading-relaxed font-light mt-1">Triple PPG optical emitters with sapphire glass lenses for heart-rate and sleep tracking.</p>
              </div>

              {/* 6. Solid-State Battery */}
              <div
                id="label-battery-mobile"
                className="absolute inset-0 bg-black/80 backdrop-blur-lg p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[9px] font-bold text-amber-400 tracking-[0.2em] uppercase">ENERGY CORE</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Solid-State Battery</h4>
                <p className="text-xs text-muted leading-relaxed font-light mt-1">3.8V curved lithium-polymer arc. Up to 7 days of continuous monitoring.</p>
              </div>

              {/* 7. Induction Coil */}
              <div
                id="label-coil-mobile"
                className="absolute inset-0 bg-black/80 backdrop-blur-lg p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-orange-500 tracking-[0.2em] uppercase">WIRELESS CHARGING</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Induction Coil</h4>
                <p className="text-xs text-muted leading-relaxed font-light mt-1">Triple-loop copper winding for high-efficiency magnetic alignment charging.</p>
              </div>

              {/* 8. Inner Comfort Liner */}
              <div
                id="label-liner-mobile"
                className="absolute inset-0 bg-black/80 backdrop-blur-lg p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl flex flex-col justify-center"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[9px] font-bold text-accent tracking-[0.2em] uppercase">COMFORT RESIN</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">Inner Comfort Liner</h4>
                <p className="text-xs text-muted leading-relaxed font-light mt-1">Hypoallergenic resin with micro comfort ridges. Ergonomic all-day wear.</p>
              </div>

            </div>
          </div>

        </div>

        {/* PINNED NARRATIVE CHAPTER OVERLAYS */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30 flex items-center justify-center">

          {/* Section 1: Cinematic Hero */}
          <HeroSection currentChapter={currentChapter} introTextRef={introTextRef} />

          {/* Section 2: Engineering Reveal Labels */}
          {/* Section 3: Engineering Reveal Text */}
          <EngineeringReveal currentChapter={currentChapter} explodeTextRef={explodeTextRef} />

          {/* Section 4: Health Intelligence */}
          <HealthIntelligence currentChapter={currentChapter} />

          {/* Section 5: Battery & Charging */}
          <BatteryCharging currentChapter={currentChapter} />

          {/* Section 6: App Connectivity */}
          <AppConnectivity currentChapter={currentChapter} />

          {/* Section 7: Premium Materials & Color Customizer */}
          <AnimatePresence>
            {currentChapter === 7 && (
              <motion.div 
                initial={{ opacity: 0, x: -48 }}
                animate={{ opacity: 1, x: 0, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, x: -48, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
                className="overlay-customizer absolute inset-0 w-full h-full flex items-center justify-start px-4 sm:px-8 md:px-24 z-40 safe-text-gradient pointer-events-auto"
              >
                <motion.div className="max-w-[480px] w-full text-left flex flex-col gap-6 sm:gap-8 pointer-events-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
                  >
                    <span className="text-[11px] font-bold tracking-[0.25em] text-[#c6a972] uppercase">
                      ALL-DAY COMFORT
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-white leading-tight text-shadow-cinematic mt-3 sm:mt-4">
                      GRADE 5<br />TITANIUM.
                    </h2>
                    <p className="text-premium-body text-shadow-cinematic mt-6">
                      CNC-machined from aerospace-grade titanium with an ultra-lightweight comfort resin inner shell. Designed for 24/7 wear and complete 10 ATM water resistance.
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
                    className="bg-black/40 backdrop-blur-md px-7 py-5 rounded-2xl border border-white/5 shadow-2xl"
                  >
                    <p className="text-sm text-white/90 leading-relaxed font-light text-shadow-cinematic">
                      {activeColor.desc}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }}
                    className="flex flex-col items-start gap-4"
                  >
                    <div className="flex gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 pointer-events-auto shadow-xl">
                      {colors.map((color) => {
                        const isActive = activeColor.id === color.id;
                        return (
                          <button
                            key={color.id}
                            onClick={() => handleColorChange(color)}
                            className="group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          >
                            <span
                              className={`absolute -inset-1.5 rounded-full border-2 transition-all duration-500 scale-90 opacity-0 ${isActive ? "border-accent scale-100 opacity-100" : "border-white/20 group-hover:scale-95 group-hover:opacity-40"
                                }`}
                            />
                            {isActive && <Check size={16} className="text-black stroke-[3]" />}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-[11px] font-bold tracking-widest text-accent uppercase pl-2 text-shadow-cinematic">{activeColor.name}</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 8: How It Works */}
          <HowItWorks currentChapter={currentChapter} />

          {/* Section 9: Reviews */}
          <ReviewsOverlay currentChapter={currentChapter} />

          {/* Section 10: FAQ & CTA */}
          <FaqCta currentChapter={currentChapter} />

        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:text-accent shadow-premium pointer-events-auto cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="stroke-[2.5]" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
