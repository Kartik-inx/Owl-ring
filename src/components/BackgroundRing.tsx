"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.08);

    const camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 100);
    camera.position.z = 11.0;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.7;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envScene = new THREE.Scene();
    
    const envBgGeom = new THREE.SphereGeometry(14, 32, 32);
    const envBgMat = new THREE.MeshBasicMaterial({ color: 0x010101, side: THREE.BackSide });
    const envBg = new THREE.Mesh(envBgGeom, envBgMat);
    envScene.add(envBg);

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

    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Procedural Textures
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
      textCtx.fillText("OWL RING S1  •  TITANIUM GRADE 5  •  DESIGNED IN CALIFORNIA", 512, 64);
    }
    const markingsTex = new THREE.CanvasTexture(textCanvas);

    const pcbCanvas = document.createElement("canvas");
    pcbCanvas.width = 1024;
    pcbCanvas.height = 256;
    const pcbCtx = pcbCanvas.getContext("2d");
    if (pcbCtx) {
      pcbCtx.fillStyle = "#0b1c0f";
      pcbCtx.fillRect(0, 0, 1024, 256);
      pcbCtx.strokeStyle = "rgba(25, 65, 30, 0.6)";
      pcbCtx.lineWidth = 1;
      for (let x = 0; x < 1024; x += 16) { pcbCtx.beginPath(); pcbCtx.moveTo(x, 0); pcbCtx.lineTo(x, 256); pcbCtx.stroke(); }
      for (let y = 0; y < 256; y += 16) { pcbCtx.beginPath(); pcbCtx.moveTo(0, y); pcbCtx.lineTo(1024, y); pcbCtx.stroke(); }
      pcbCtx.strokeStyle = "rgba(198, 169, 114, 0.7)";
      pcbCtx.lineWidth = 1.5;
      for (let j = 0; j < 18; j++) {
        let x = Math.random() * 1024;
        let y = Math.random() * 256;
        pcbCtx.beginPath(); pcbCtx.moveTo(x, y);
        for (let step = 0; step < 4; step++) {
          const dirs = [[45, 0], [0, 45], [45, 45], [-45, 45]];
          const dir = dirs[Math.floor(Math.random() * dirs.length)];
          x += dir[0]; y += dir[1]; pcbCtx.lineTo(x, y);
        }
        pcbCtx.stroke();
        pcbCtx.fillStyle = "rgba(226, 207, 159, 0.9)";
        pcbCtx.beginPath(); pcbCtx.arc(x, y, 2.5, 0, Math.PI * 2); pcbCtx.fill();
      }
    }
    const pcbTex = new THREE.CanvasTexture(pcbCanvas);

    // --- GEOMETRY CONSTRUCTION ---

    // 1. SHELLS
    const topShellPoints: THREE.Vector2[] = [];
    topShellPoints.push(new THREE.Vector2(1.44, 0.0), new THREE.Vector2(1.50, 0.0), new THREE.Vector2(1.50, 0.05), new THREE.Vector2(1.472, 0.05));
    topShellPoints.push(new THREE.Vector2(1.472, 0.05), new THREE.Vector2(1.50, 0.05), new THREE.Vector2(1.50, 0.165), new THREE.Vector2(1.485, 0.19), new THREE.Vector2(1.44, 0.19));
    const topShellGeom = new THREE.LatheGeometry(topShellPoints, 128);
    const outerMat = new THREE.MeshPhysicalMaterial({ color: 0x141414, metalness: 0.9, roughness: 0.42, clearcoat: 0.38, clearcoatRoughness: 0.16, envMapIntensity: 2.8, bumpMap: brushedTex, bumpScale: 0.0004, side: THREE.DoubleSide, transparent: true });
    
    const topShellGroup = new THREE.Group();
    const topShellMesh = new THREE.Mesh(topShellGeom, outerMat);
    topShellGroup.add(topShellMesh);
    ringGroup.add(topShellGroup);

    const bottomShellPoints: THREE.Vector2[] = [];
    bottomShellPoints.push(new THREE.Vector2(1.44, -0.19), new THREE.Vector2(1.485, -0.19), new THREE.Vector2(1.50, -0.165), new THREE.Vector2(1.50, -0.05));
    bottomShellPoints.push(new THREE.Vector2(1.472, -0.05), new THREE.Vector2(1.472, -0.05), new THREE.Vector2(1.50, -0.05), new THREE.Vector2(1.50, 0.0), new THREE.Vector2(1.44, 0.0));
    const bottomShellGeom = new THREE.LatheGeometry(bottomShellPoints, 128);
    
    const bottomShellGroup = new THREE.Group();
    const bottomShellMesh = new THREE.Mesh(bottomShellGeom, outerMat);
    bottomShellGroup.add(bottomShellMesh);
    ringGroup.add(bottomShellGroup);

    // Accent
    const topAccentGeom = new THREE.CylinderGeometry(1.475, 1.475, 0.048, 128, 1, true);
    const accentMat = new THREE.MeshPhysicalMaterial({ color: 0xC6A972, metalness: 0.95, roughness: 0.06, envMapIntensity: 2.5, side: THREE.DoubleSide, transparent: true });
    const topAccentMesh = new THREE.Mesh(topAccentGeom, accentMat);
    topAccentMesh.position.y = 0.024;
    topShellGroup.add(topAccentMesh);

    const bottomAccentMesh = topAccentMesh.clone();
    bottomAccentMesh.position.y = -0.024;
    bottomShellGroup.add(bottomAccentMesh);

    // Antenna Bands
    const antennaGeom = new THREE.CylinderGeometry(1.5015, 1.5015, 0.012, 128, 1, true);
    const antennaMat = new THREE.MeshPhysicalMaterial({ color: 0x1f1f1f, roughness: 0.65, metalness: 0.1, side: THREE.DoubleSide, transparent: true });
    const ant2 = new THREE.Mesh(antennaGeom, antennaMat); ant2.position.y = 0.09; topShellGroup.add(ant2);
    const ant1 = new THREE.Mesh(antennaGeom, antennaMat); ant1.position.y = -0.09; bottomShellGroup.add(ant1);

    // 2. GASKET
    const gasketGroup = new THREE.Group();
    const gasketGeom = new THREE.CylinderGeometry(1.442, 1.442, 0.36, 128, 1, true);
    const gasketMat = new THREE.MeshPhysicalMaterial({ color: 0x222222, roughness: 0.92, metalness: 0.02, side: THREE.DoubleSide, transparent: true });
    const gasketMesh = new THREE.Mesh(gasketGeom, gasketMat);
    gasketGroup.add(gasketMesh);
    ringGroup.add(gasketGroup);

    // 3. FLEX PCB
    const pcbGeom = new THREE.CylinderGeometry(1.43, 1.43, 0.32, 64, 1, true);
    const pcbMat = new THREE.MeshPhysicalMaterial({ map: pcbTex, bumpMap: pcbTex, bumpScale: 0.001, metalness: 0.45, roughness: 0.38, side: THREE.DoubleSide, transparent: true });
    const pcbMesh = new THREE.Mesh(pcbGeom, pcbMat);
    ringGroup.add(pcbMesh);

    // Micro SMT
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      if (Math.abs(angle - Math.PI / 2) < 0.35) continue;
      const compGeom = new THREE.BoxGeometry(0.04, 0.016, 0.05);
      const compMat = new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x8e8e8e : 0x222222, metalness: 0.8, roughness: 0.15 });
      const compMesh = new THREE.Mesh(compGeom, compMat);
      compMesh.position.set(Math.cos(angle) * 1.4315, 0.06 * (i % 3 - 1), Math.sin(angle) * 1.4315);
      compMesh.rotation.y = -angle;
      pcbMesh.add(compMesh);
    }

    // Chip
    const chipGeom = new THREE.BoxGeometry(0.24, 0.08, 0.15);
    const chipMat = new THREE.MeshPhysicalMaterial({ color: 0x242424, metalness: 0.85, roughness: 0.28, transparent: true });
    const chipMesh = new THREE.Mesh(chipGeom, chipMat);
    chipMesh.position.set(0, 0, 1.435);
    ringGroup.add(chipMesh);

    const chipGlowGeom = new THREE.BoxGeometry(0.1, 0.015, 0.08);
    const chipGlowMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.85 });
    const chipGlowMesh = new THREE.Mesh(chipGlowGeom, chipGlowMat);
    chipGlowMesh.position.set(0, 0.045, 0);
    chipMesh.add(chipGlowMesh);

    // 4. SENSORS
    const sensorGroup1 = new THREE.Group();
    const sensorGroup2 = new THREE.Group();
    ringGroup.add(sensorGroup1); ringGroup.add(sensorGroup2);

    const sensorFrameGeom = new THREE.BoxGeometry(0.13, 0.04, 0.13);
    const sensorFrameMat = new THREE.MeshStandardMaterial({ color: 0x181818, metalness: 0.9, roughness: 0.25 });
    const sensorBody1 = new THREE.Mesh(sensorFrameGeom, sensorFrameMat); sensorGroup1.add(sensorBody1);
    const sensorBody2 = new THREE.Mesh(sensorFrameGeom, sensorFrameMat); sensorGroup2.add(sensorBody2);

    const hrSensorGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
    const hrSensorMat = new THREE.MeshBasicMaterial({ color: 0x00ff22, transparent: true, opacity: 0.8 });
    const hrEmitter = new THREE.Mesh(hrSensorGeom, hrSensorMat); hrEmitter.position.y = 0.022; sensorGroup1.add(hrEmitter);

    const sleepSensorGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
    const sleepSensorMat = new THREE.MeshBasicMaterial({ color: 0xff0044, transparent: true, opacity: 0.8 });
    const sleepEmitter = new THREE.Mesh(sleepSensorGeom, sleepSensorMat); sleepEmitter.position.y = 0.022; sensorGroup2.add(sleepEmitter);

    const sleepAngle = Math.PI * 0.25;

    // 5. BATTERY
    const batteryGeom = new THREE.CylinderGeometry(1.398, 1.398, 0.26, 32, 1, true, 0, Math.PI * 0.7);
    const batteryMat = new THREE.MeshPhysicalMaterial({ color: 0x2d3748, metalness: 0.8, roughness: 0.35, side: THREE.DoubleSide, transparent: true });
    const batteryMesh = new THREE.Mesh(batteryGeom, batteryMat);
    batteryMesh.rotation.y = Math.PI * 0.65;
    ringGroup.add(batteryMesh);

    // 6. COILS
    const coilGroup = new THREE.Group();
    const coilMat = new THREE.MeshPhysicalMaterial({ color: 0xd47326, metalness: 0.98, roughness: 0.18, envMapIntensity: 2.0, transparent: true });
    for (let yOffset of [-0.07, 0, 0.07]) {
      const coilTorus = new THREE.TorusGeometry(1.408, 0.012, 8, 64);
      const coilMesh = new THREE.Mesh(coilTorus, coilMat);
      coilMesh.rotation.x = Math.PI / 2; coilMesh.position.y = yOffset;
      coilGroup.add(coilMesh);
    }
    ringGroup.add(coilGroup);

    // 7. LINER
    const innerSleeveGroup = new THREE.Group();
    const innerPoints: THREE.Vector2[] = [];
    innerPoints.push(new THREE.Vector2(1.44, -0.19), new THREE.Vector2(1.415, -0.13), new THREE.Vector2(1.39, 0.0), new THREE.Vector2(1.415, 0.13), new THREE.Vector2(1.44, 0.19));
    const innerGeom = new THREE.LatheGeometry(innerPoints, 128);
    const innerSleeveMat = new THREE.MeshPhysicalMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.5, clearcoat: 0.5, clearcoatRoughness: 0.2, envMapIntensity: 1.8, map: markingsTex, bumpMap: ribTex, bumpScale: 0.0008, side: THREE.DoubleSide, transparent: true });
    const innerSleeveMesh = new THREE.Mesh(innerGeom, innerSleeveMat);
    innerSleeveGroup.add(innerSleeveMesh);
    ringGroup.add(innerSleeveGroup);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55); scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 6.0); keyLight.position.set(-6, 8, 5); scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 4.0); fillLight.position.set(6, -4, 4); scene.add(fillLight);
    const topRim = new THREE.DirectionalLight(0xffffff, 3.5); topRim.position.set(0, 9, 2); scene.add(topRim);
    const backRim = new THREE.DirectionalLight(0xffffff, 6.0); backRim.position.set(0, 0, -6); scene.add(backRim);

    // PARTICLES
    const dustCount = 150;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 14;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 16; pCanvas.height = 16;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      pCtx.fillStyle = grad; pCtx.fillRect(0, 0, 16, 16);
    }
    const teleTex = new THREE.CanvasTexture(pCanvas);
    const dustMat = new THREE.PointsMaterial({ size: 0.09, color: 0xcccccc, transparent: true, opacity: 0.16, map: teleTex, blending: THREE.AdditiveBlending, depthWrite: false });
    const dustSystem = new THREE.Points(dustGeom, dustMat);
    scene.add(dustSystem);

    // Base positioning
    ringGroup.position.set(0.6, -0.4, 0);
    ringGroup.scale.setScalar(0.7);

    // Mouse Parallax
    let mouseX = 0; let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      // Create a smooth "breathing" explode animation
      // It goes between 0 and 1 slowly
      const explodeFactor = (Math.sin(time * 0.3) + 1) * 0.5 * 0.8; // peaks at 0.8 explode

      // Apply exploded transforms
      topShellGroup.position.y = explodeFactor * 0.45;
      bottomShellGroup.position.y = -explodeFactor * 0.45;
      gasketGroup.scale.setScalar(1.0 + explodeFactor * 0.16);
      pcbMesh.scale.setScalar(1.0 + explodeFactor * 0.22);
      chipMesh.position.z = 1.435 + explodeFactor * 0.32;

      const r1 = 1.39 + explodeFactor * 0.38;
      sensorGroup1.position.set(0, -r1, 0);
      sensorGroup1.rotation.x = Math.PI / 2;

      const r2 = 1.39 + explodeFactor * 0.38;
      sensorGroup2.position.set(Math.cos(sleepAngle) * r2, Math.sin(sleepAngle) * r2, 0);
      sensorGroup2.rotation.z = -Math.PI / 4;

      batteryMesh.rotation.y = Math.PI * 0.65 + explodeFactor * 0.26;
      batteryMesh.position.z = explodeFactor * 0.12;

      coilGroup.scale.setScalar(1.0 + explodeFactor * 0.32);

      // Opacities for transparent glass feel
      outerMat.opacity = 1.0 - explodeFactor * 0.5;
      
      // Pulse sensors
      const pulse = 0.5 + Math.sin(time * 2) * 0.45;
      chipGlowMat.opacity = pulse;
      hrSensorMat.opacity = pulse;
      sleepSensorMat.opacity = pulse;

      // Base ring rotation & positioning
      ringGroup.rotation.y += 0.002;
      ringGroup.rotation.x = 0.4 - mouseY * 0.08;
      ringGroup.position.y = -0.4 + Math.sin(time * 0.5) * 0.05;

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;

      const positions = dustGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        positions[i * 3 + 1] -= 0.002;
        if (positions[i * 3 + 1] < -4) positions[i * 3 + 1] = 4;
      }
      dustGeom.attributes.position.needsUpdate = true;

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
      window.removeEventListener("mousemove", handleMouseMove);
      
      topShellGeom.dispose();
      bottomShellGeom.dispose();
      outerMat.dispose();
      gasketGeom.dispose();
      gasketMat.dispose();
      pcbGeom.dispose();
      pcbMat.dispose();
      chipGeom.dispose();
      chipMat.dispose();
      chipGlowGeom.dispose();
      chipGlowMat.dispose();
      sensorFrameGeom.dispose();
      sensorFrameMat.dispose();
      hrSensorGeom.dispose();
      hrSensorMat.dispose();
      sleepSensorGeom.dispose();
      sleepSensorMat.dispose();
      batteryGeom.dispose();
      batteryMat.dispose();
      innerGeom.dispose();
      innerSleeveMat.dispose();
      topAccentGeom.dispose();
      accentMat.dispose();
      antennaGeom.dispose();
      antennaMat.dispose();
      dustGeom.dispose();
      dustMat.dispose();
      pmremGenerator.dispose();
      envBgGeom.dispose();
      envBgMat.dispose();
      panelGeom.dispose();
      panelMat.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,41,55,0.15)_0%,rgba(0,0,0,1)_85%)] pointer-events-none z-0" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10 opacity-70" />
    </div>
  );
}
