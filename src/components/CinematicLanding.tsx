"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Check,
  ChevronDown
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import * as THREE from "three";

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
    desc: "CNC-machined Grade 5 titanium alloy. Polished chamfered edges with raw brushed side panels reflecting clean industrial lines."
  }
];

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

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
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
      clearcoat: 0.3,
      clearcoatRoughness: 0.1,
      envMapIntensity: 2.5,
      bumpMap: brushedTex,
      bumpScale: 0.0006,
      roughnessMap: brushedTex,
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
    for (let xOffset of [-0.1, -0.05, 0, 0.05, 0.1]) {
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
    for (let yOffset of [-0.07, 0, 0.07]) {
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
      size: 0.06,
      color: 0xcccccc,
      transparent: true,
      opacity: 0.12,
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
      if (!lineEl || !labelEl) return;

      if (!active) {
        lineEl.setAttribute("stroke-dashoffset", "1000");
        lineEl.style.opacity = "0";
        labelEl.style.opacity = "0";
        labelEl.style.transform = `scale(0.94)`;
        return;
      }

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

      colorR: colors[0].materialColor >> 16 & 255,
      colorG: colors[0].materialColor >> 8 & 255,
      colorB: colors[0].materialColor & 255,
      roughness: colors[0].roughness,
      metalness: colors[0].metalness,
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=850%",
        scrub: 1.8, // Physical inertia lag catcher
        pin: true,
      }
    });

    tl.duration(12.0);

    // CHAPTER TRIGGERS FOR CONDITIONAL REACT RENDERING (Prevents layout overwrite bugs)
    tl.call(() => {
      setCurrentChapter(1);
      threeStateRef.current.targetParticleColor.setHex(0x1F2937);
    }, [], 0);
    tl.call(() => {
      setCurrentChapter(2);
      threeStateRef.current.targetParticleColor.setHex(0x3B82F6);
    }, [], 2.0);
    tl.call(() => {
      setCurrentChapter(3);
      threeStateRef.current.targetParticleColor.setHex(0xEF4444);
    }, [], 4.0);
    tl.call(() => {
      setCurrentChapter(4);
      const state = threeStateRef.current;
      state.targetParticleColor.setHex(state.targetColor);
    }, [], 6.0);
    tl.call(() => {
      setCurrentChapter(5);
      threeStateRef.current.targetParticleColor.setHex(0xF59E0B);
    }, [], 8.0);
    tl.call(() => {
      setCurrentChapter(6);
      threeStateRef.current.targetParticleColor.setHex(0xC6A972);
    }, [], 10.0);

    // SECTION 1: Hero reveal (duration 0 -> 2.0)
    tl.to(animState, {
      ringRotationY: Math.PI * 0.8,
      ringRotationX: 0.22,
      ringScale: 0.52,
      ringPositionX: 0,
      shellSplit: 0,
      gasketExpand: 0,
      pcbExpand: 0,
      sensorGlow: 0,
      batteryRotate: 0,
      coilExpand: 0,
      duration: 2.0,
      ease: "power1.inOut"
    }, 0);

    // SECTION 2: Exploded Engineering View (2.0 -> 4.0)
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
      duration: 2.0,
      ease: "power2.inOut"
    }, 2.0);

    // Active highlights for Section 2 exploded view HUD labels
    tl.set(threeStateRef.current, { activeHighlight: "shell-top" }, 2.0);
    tl.set(threeStateRef.current, { activeHighlight: "shell-bottom" }, 2.4);
    tl.set(threeStateRef.current, { activeHighlight: "gasket" }, 2.8);
    tl.set(threeStateRef.current, { activeHighlight: "pcb" }, 3.2);
    tl.set(threeStateRef.current, { activeHighlight: "sensors" }, 3.6);

    // SECTION 3: Sensor Intelligence (4.0 -> 6.0)
    tl.to(animState, {
      shellSplit: 0,
      gasketExpand: 0,
      pcbExpand: 0,
      sensorGlow: 0,
      batteryRotate: 0,
      coilExpand: 0,
      ringPositionX: 1.7,
      ringScale: 0.45,
      ringRotationX: 0.22,
      ringRotationY: Math.PI * 3.8,
      duration: 2.0,
      ease: "power2.inOut"
    }, 4.0);

    tl.set(threeStateRef.current, { activeHighlight: "sensors", waterMode: 1 }, 4.0);

    // SECTION 4: Material Showcase (6.0 -> 8.0)
    tl.to(animState, {
      ringPositionX: 0,
      ringScale: 0.85,
      ringRotationX: 0.38,
      ringRotationY: Math.PI * 5.2,
      duration: 2.0,
      ease: "power2.inOut"
    }, 6.0);

    tl.set(threeStateRef.current, { activeHighlight: "", waterMode: 0 }, 6.0);

    // SECTION 5: Performance Story (8.0 -> 10.0)
    tl.to(animState, {
      ringScale: 0.52,
      batteryRotate: 1.0,
      coilExpand: 1.0,
      ringRotationX: 0.42,
      ringRotationY: Math.PI * 6.8,
      duration: 2.0,
      ease: "power2.inOut"
    }, 8.0);

    tl.set(threeStateRef.current, { activeHighlight: "battery" }, 8.0);
    tl.set(threeStateRef.current, { activeHighlight: "coil" }, 9.0);

    // SECTION 6: Final Product Hero (10.0 -> 12.0)
    tl.to(animState, {
      shellSplit: 0,
      gasketExpand: 0,
      pcbExpand: 0,
      sensorGlow: 0,
      batteryRotate: 0,
      coilExpand: 0,
      ringScale: 0.55,
      ringPositionX: 0,
      ringRotationX: 0.32,
      ringRotationY: Math.PI * 8.0,
      duration: 2.0,
      ease: "power2.inOut"
    }, 10.0);

    tl.set(threeStateRef.current, { activeHighlight: "" }, 10.0);

    // --- RENDER LOOP AND PHYSICS EMULATION ---
    const pos = new THREE.Vector3();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const state = threeStateRef.current;

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
      
      // Cleanup GSAP and ScrollTriggers to prevent leaks on hot reload
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());

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

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white selection:bg-accent selection:text-black h-screen overflow-hidden">
      
      {/* STICKY RENDER & NARRATIVE CANVAS */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* WEBGL CANVAS */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10 will-change-transform" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_15%,rgba(0,0,0,0.96)_85%)] pointer-events-none z-20" />
        
        {/* DYNAMIC AMBIENT NEURAL BACKGROUND GLOW */}
        <div 
          className="absolute inset-0 transition-all duration-[2000ms] ease-out pointer-events-none z-0" 
          style={{
            background: 
              currentChapter === 1 ? "radial-gradient(circle at center, rgba(31, 41, 55, 0.22) 0%, rgba(0, 0, 0, 1) 80%)" :
              currentChapter === 2 ? "radial-gradient(circle at center, rgba(30, 41, 59, 0.25) 0%, rgba(0, 0, 0, 1) 85%)" :
              currentChapter === 3 ? "radial-gradient(circle at center, rgba(239, 68, 68, 0.16) 0%, rgba(0, 0, 0, 1) 75%)" :
              currentChapter === 4 ? `radial-gradient(circle at center, rgba(${activeColor.id === "gold" ? "198, 169, 114, 0.18" : "55, 65, 81, 0.2"}, 0.16) 0%, rgba(0, 0, 0, 1) 80%)` :
              currentChapter === 5 ? "radial-gradient(circle at center, rgba(245, 158, 11, 0.16) 0%, rgba(0, 0, 0, 1) 80%)" :
              "radial-gradient(circle at center, rgba(198, 169, 114, 0.2) 0%, rgba(0, 0, 0, 1) 85%)"
          }}
        />

        {/* SVG INTERACTION ELBOW PATHS */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-40">
          <path id="line-shell-top" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-shell-bottom" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-gasket" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-pcb" fill="none" stroke="rgba(74, 222, 128, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-sensors" fill="none" stroke="rgba(239, 68, 68, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-battery" fill="none" stroke="rgba(251, 191, 36, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-coil" fill="none" stroke="rgba(249, 115, 22, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
          <path id="line-liner" fill="none" stroke="rgba(198, 169, 114, 0.45)" strokeWidth="1.2" strokeDasharray="1000" strokeDashoffset="1000" className="transition-all duration-300" />
        </svg>

        {/* EXPENSIVE INTERACTIVE HUD LABELS */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden">
          
          {/* Left Aligned Columns */}
          <div className="absolute top-[20%] left-6 md:left-20 flex flex-col gap-12 max-w-[300px]">
            
            {/* Titanium Shell (Top Half) */}
            <div 
              id="label-shell-top" 
              className="bg-black/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[9px] font-bold text-accent tracking-[0.2em] uppercase">OUTER MONOCOQUE</span>
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Top Titanium Casing</h4>
              <p className="text-[10px] text-muted leading-relaxed font-light mt-1.5">Grade 5 black titanium top hemisphere with machined antenna isolator slots and raw chamfered bevels.</p>
            </div>

            {/* Titanium Shell (Bottom Half) */}
            <div 
              id="label-shell-bottom" 
              className="bg-black/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[9px] font-bold text-accent tracking-[0.2em] uppercase">OUTER MONOCOQUE</span>
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Bottom Titanium Casing</h4>
              <p className="text-[10px] text-muted leading-relaxed font-light mt-1.5">Lower hemisphere featuring laser-etched alignment vectors and a seamless CNC mating line.</p>
            </div>

            {/* Waterproof Gasket */}
            <div 
              id="label-gasket" 
              className="bg-black/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                <span className="text-[9px] font-bold text-neutral-400 tracking-[0.2em] uppercase">INGRESS BARRIER</span>
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Silicone Gasket Ring</h4>
              <p className="text-[10px] text-muted leading-relaxed font-light mt-1.5">Dark graphite rubber seal offering a compressible structural profile to secure internal components against 10 ATM pressure.</p>
            </div>

            {/* Flex PCB */}
            <div 
              id="label-pcb" 
              className="bg-black/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] font-bold text-green-400 tracking-[0.2em] uppercase">FLEX CIRCUITRY</span>
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Flexible Motherboard</h4>
              <p className="text-[10px] text-muted leading-relaxed font-light mt-1.5">Curved 3D flex substrate containing microscopic gold traces and embedded resistors mapped precisely to internal curvatures.</p>
            </div>

          </div>

          {/* Right Aligned Columns */}
          <div className="absolute top-[20%] right-6 md:right-20 flex flex-col gap-12 max-w-[300px] text-right items-end">
            
            {/* Biometric Sensors */}
            <div 
              id="label-sensors" 
              className="bg-black/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto flex flex-col items-end shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-bold text-red-500 tracking-[0.2em] uppercase">DIAGNOSTIC CORE</span>
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Biometric Sensor Array</h4>
              <p className="text-[10px] text-muted leading-relaxed font-light mt-1.5 text-right">Ejected green and red diagnostic optical emitter modules, shielded behind tiny sapphire glass lenses.</p>
            </div>

            {/* Battery Arc */}
            <div 
              id="label-battery" 
              className="bg-black/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto flex flex-col items-end shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[9px] font-bold text-amber-400 tracking-[0.2em] uppercase">SOLID STATE ENERGY</span>
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Curved Battery Segment</h4>
              <p className="text-[10px] text-muted leading-relaxed font-light mt-1.5 text-right">High-density lithium polymer arc segment equipped with gold contact terminals and integrated thermal controllers.</p>
            </div>

            {/* Charging Coil */}
            <div 
              id="label-coil" 
              className="bg-black/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto flex flex-col items-end shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[9px] font-bold text-orange-500 tracking-[0.2em] uppercase">POWER TRANSFER</span>
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Induction Wireless Coil</h4>
              <p className="text-[10px] text-muted leading-relaxed font-light mt-1.5 text-right">Triple-loop flat copper winding system tuned for high-efficiency wireless magnetic alignment charging.</p>
            </div>

            {/* Inner comfort sleeve */}
            <div 
              id="label-liner" 
              className="bg-black/65 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-500 opacity-0 pointer-events-auto flex flex-col items-end shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[9px] font-bold text-accent tracking-[0.2em] uppercase">COMFORT RESIN</span>
              </div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-heading">Inner Comfort Liner</h4>
              <p className="text-[10px] text-muted leading-relaxed font-light mt-1.5 text-right">Dermatologically safe hypoallergenic liner with micro comfort ridges and laser-engraved certification markings.</p>
            </div>

          </div>

        </div>

        {/* PINNED NARRATIVE CHAPTER OVERLAYS */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30 flex items-center justify-center">
          
          {/* Chapter 1: Hero Intro */}
          <div ref={introTextRef} className={`absolute text-center flex flex-col items-center gap-5 pointer-events-none transition-all duration-700 ${
            currentChapter === 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
          }`}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg">
              <Sparkles size={11} className="text-accent animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-accent">PRE-PRODUCTION PREVIEW</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none mt-2 font-heading">
              OWL <span className="text-gradient-gold">RING.</span>
            </h1>
            <p className="text-muted/80 text-xs md:text-sm max-w-sm tracking-widest mt-3 font-body leading-relaxed font-light uppercase">
              Stealth DLC Titanium • Triple PPG Diagnostics • 7-Day Battery
            </p>
          </div>

          {/* Chapter 2: Exploded Engineering view */}
          <div ref={explodeTextRef} className={`absolute text-center flex flex-col items-center gap-3 pointer-events-none transition-all duration-700 ${
            currentChapter === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <span className="text-[9px] font-bold tracking-[0.3em] text-accent uppercase">ENGINEERING PROTOCOL</span>
            <h2 className="text-3xl md:text-6xl font-bold uppercase tracking-tight font-heading text-white">INTERNAL ARCHITECTURE.</h2>
            <p className="text-muted/75 text-xs md:text-sm max-w-md font-light leading-relaxed">
              Eight electro-mechanical components aligned with absolute geometric precision. Scroll to analyze active diagnostic layers.
            </p>
          </div>

          {/* Chapter 3: Telemetry Diagnostics view */}
          <div className={`overlay-telemetry absolute inset-0 w-full h-full flex items-center justify-start px-6 md:px-28 transition-all duration-700 ${
            currentChapter === 3 ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-12"
          }`}>
            <div className="app-panel-wrapper max-w-[360px] w-full bg-black/60 backdrop-blur-2xl p-7 rounded-[40px] border border-white/10 shadow-2xl flex flex-col gap-6 relative pointer-events-auto">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-accent/15 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gold-gradient flex items-center justify-center">
                    <span className="text-[9px] text-black font-bold">O</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Owl Diagnostics</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest">Live Sync</span>
                </div>
              </div>

              <div className="h-px bg-white/10 w-full" />

              {/* ECG Beat graph */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] text-muted/70 font-bold uppercase tracking-wider">Heart Rate Telemetry</span>
                  <span className="text-xs font-bold text-red-500 animate-pulse flex items-center gap-1">
                    <Heart size={10} className="fill-current" /> 72 BPM
                  </span>
                </div>
                <div className="w-full h-[60px] overflow-hidden relative">
                  <svg className="w-full h-full">
                    <path 
                      d={ecgPath}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Sleep & Battery Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col justify-between h-[100px]">
                  <span className="text-[8px] text-muted/70 font-bold uppercase tracking-wider">Sleep Recovery</span>
                  <div>
                    <span className="text-2xl font-bold text-blue-400 font-heading">92%</span>
                    <p className="text-[8px] text-muted/70 uppercase font-semibold mt-1">Optimal State</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col justify-between h-[100px]">
                  <span className="text-[8px] text-muted/70 font-bold uppercase tracking-wider">Parasympathetic</span>
                  <div>
                    <span className="text-2xl font-bold text-accent font-heading">Low Stress</span>
                    <p className="text-[8px] text-muted/70 uppercase font-semibold mt-1">Balanced HRV</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[9px] text-muted bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                <span className="font-semibold uppercase tracking-wider">Telemetry Link</span>
                <span className="text-white font-bold font-mono">128-bit Encrypted</span>
              </div>
            </div>
          </div>

          {/* Chapter 4: Colorway customizer */}
          <div className={`overlay-customizer absolute inset-0 w-full h-full flex flex-col justify-between items-center py-28 px-6 transition-all duration-700 ${
            currentChapter === 4 ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-8"
          }`}>
            <div className="text-center flex flex-col gap-2.5">
              <span className="text-[9px] font-bold tracking-[0.3em] text-accent uppercase">MATERIAL DESIGN SYSTEM</span>
              <h2 className="text-4xl md:text-6xl font-bold font-heading uppercase text-white cinematic-heading">MATERIAL EXPRESSION.</h2>
            </div>

            <div className="max-w-md text-center bg-black/40 backdrop-blur-md px-7 py-5 rounded-2xl border border-white/5">
              <p className="text-xs text-muted/90 leading-relaxed font-light">
                {activeColor.desc}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 pointer-events-auto">
                {colors.map((color) => {
                  const isActive = activeColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color)}
                      className="group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-105"
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
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase">{activeColor.name}</span>
            </div>
          </div>

          {/* Chapter 5: Performance specifications */}
          <div className={`absolute w-full max-w-4xl px-6 pointer-events-none transition-all duration-700 ${
            currentChapter === 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <div className="text-center flex flex-col gap-2 mb-8">
              <span className="text-[9px] font-bold tracking-[0.3em] text-accent uppercase">PERFORMANCE METRICS</span>
              <h2 className="text-3xl md:text-5xl font-heading uppercase text-white">SOLID-STATE ENERGY CORE</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 max-w-3xl mx-auto pointer-events-auto">
              <div className="border-b border-white/10 py-3.5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-accent uppercase font-bold tracking-wider">BATTERY CHEMISTRY</span>
                  <p className="text-[9px] text-muted font-light mt-0.5">Solid-State Lithium Polymer arc segment</p>
                </div>
                <span className="text-xs font-bold text-white">3.8V Cell</span>
              </div>
              <div className="border-b border-white/10 py-3.5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-accent uppercase font-bold tracking-wider">CHARGING SYSTEM</span>
                  <p className="text-[9px] text-muted font-light mt-0.5">3-Winding induction wireless loop</p>
                </div>
                <span className="text-xs font-bold text-white">15-Min Quick Charge</span>
              </div>
              <div className="border-b border-white/10 py-3.5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-accent uppercase font-bold tracking-wider">AUTONOMOUS RUNTIME</span>
                  <p className="text-[9px] text-muted font-light mt-0.5">Continuous diagnostics neural loops</p>
                </div>
                <span className="text-xs font-bold text-white">7 Days Life</span>
              </div>
              <div className="border-b border-white/10 py-3.5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-accent uppercase font-bold tracking-wider">LOGIC POWER DRAW</span>
                  <p className="text-[9px] text-muted font-light mt-0.5">Ultra-low microamperes idle loop</p>
                </div>
                <span className="text-xs font-bold text-white">1.2μA Sleep Mode</span>
              </div>
            </div>
          </div>

          {/* Chapter 6: Final CTA */}
          <div className={`overlay-cta absolute inset-0 w-full h-full flex flex-col justify-between items-center py-24 px-6 transition-all duration-700 ${
            currentChapter === 6 ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-12"
          }`}>
            <div className="w-full" />

            <div className="cta-panel pointer-events-auto text-center flex flex-col items-center gap-6 max-w-2xl">
              <h2 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none font-heading cinematic-heading">
                OWL <span className="text-gradient-gold">RING.</span>
              </h2>
              <p className="text-muted/80 text-xs md:text-sm max-w-md leading-relaxed font-body font-light">
                Own the bio-telemetry architecture of tomorrow. Reservations are currently open for limited slots in the Titanium series.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                <Link href="/product/owl-ring-s1">
                  <button className="magnetic-btn px-10 py-5 bg-gold-gradient text-black font-bold text-xs rounded-full flex items-center gap-3 transition-transform hover:scale-105 shadow-gold select-none">
                    <span className="magnetic-text block flex items-center gap-2">
                      Pre-order S1 Now
                      <ArrowRight size={14} className="stroke-[3]" />
                    </span>
                  </button>
                </Link>
                
                <Link href="/#features">
                  <button className="magnetic-btn px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-xs rounded-full transition-all select-none">
                    <span className="magnetic-text block">Specifications</span>
                  </button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-white/10 mt-8 w-full max-w-md justify-center">
                <div>
                  <div className="text-lg md:text-xl font-bold text-white font-heading">Grade 5</div>
                  <div className="text-[8px] text-muted/70 uppercase tracking-widest font-semibold">Titanium</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-lg md:text-xl font-bold text-white font-heading">15-Min</div>
                  <div className="text-[8px] text-muted/70 uppercase tracking-widest font-semibold">Quick Charge</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-lg md:text-xl font-bold text-white font-heading">10 ATM</div>
                  <div className="text-[8px] text-muted/70 uppercase tracking-widest font-semibold">Submersible</div>
                </div>
              </div>
            </div>

            <div className="w-full text-center">
              <span className="text-[9px] text-muted/40 uppercase tracking-[0.25em] font-bold">Limited slots. Shipping starts Fall 2026.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
