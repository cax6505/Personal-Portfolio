"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const isDark = resolvedTheme !== "light";

    // 2. Dynamic Changing Color Point Lights
    const light1 = new THREE.PointLight(0x8b5cf6, 45, 60); // Violet
    const light2 = new THREE.PointLight(0x06b6d4, 45, 60); // Cyan
    const light3 = new THREE.PointLight(0xec4899, 40, 60); // Pink/Magenta
    const light4 = new THREE.PointLight(0x10b981, 35, 60); // Emerald

    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    scene.add(light4);

    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x18182b : 0x94a3b8,
      isDark ? 1.8 : 2.8
    );
    scene.add(ambientLight);

    // 3. Floating 3D Geometries group
    const geometriesGroup = new THREE.Group();

    // Translucent glasslike materials reacting to dynamic lights
    const mainMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x12131e : 0xe2e8f0,
      metalness: 0.3,
      roughness: 0.15,
      transmission: 0.5,
      thickness: 1.5,
      transparent: true,
      opacity: 0.8,
      wireframe: false,
    });

    const wireMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x818cf8 : 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    // A. Main Central Torus Knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(2.4, 0.65, 120, 16);
    const torusKnot = new THREE.Mesh(torusKnotGeo, mainMat);
    const torusKnotWire = new THREE.Mesh(torusKnotGeo, wireMat);
    torusKnot.add(torusKnotWire);
    torusKnot.position.set(-6, 2, -2);
    geometriesGroup.add(torusKnot);

    // B. Floating Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icoMesh = new THREE.Mesh(icoGeo, mainMat);
    const icoWire = new THREE.Mesh(icoGeo, wireMat);
    icoMesh.add(icoWire);
    icoMesh.position.set(7, -3, -4);
    geometriesGroup.add(icoMesh);

    // C. Floating Octahedron
    const octaGeo = new THREE.OctahedronGeometry(1.8, 0);
    const octaMesh = new THREE.Mesh(octaGeo, mainMat);
    const octaWire = new THREE.Mesh(octaGeo, wireMat);
    octaMesh.add(octaWire);
    octaMesh.position.set(5.5, 4, -5);
    geometriesGroup.add(octaMesh);

    // D. Outer Wireframe Ring / Torus
    const torusGeo = new THREE.TorusGeometry(3.2, 0.2, 16, 100);
    const torusMesh = new THREE.Mesh(torusGeo, wireMat);
    torusMesh.position.set(-5, -4.5, -3);
    geometriesGroup.add(torusMesh);

    // E. Small Floating Light Orbs/Spheres
    const sphereGeo = new THREE.SphereGeometry(0.4, 32, 32);
    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < 14; i++) {
      const spMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0xffffff : 0x6366f1,
        roughness: 0.1,
        metalness: 0.9,
      });
      const sp = new THREE.Mesh(sphereGeo, spMat);
      sp.position.set(
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12 - 2
      );
      spheres.push(sp);
      geometriesGroup.add(sp);
    }

    scene.add(geometriesGroup);

    // 4. Floating 3D Starfield & Colored Dust Particles
    const particleCount = 800;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 42;
      posArray[i + 1] = (Math.random() - 0.5) * 32;
      posArray[i + 2] = (Math.random() - 0.5) * 22;

      // Gradient color palette for dust particles
      const hue = (i / (particleCount * 3) + Math.random() * 0.2) % 1;
      const color = new THREE.Color().setHSL(hue, 0.85, isDark ? 0.65 : 0.45);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.085,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.5,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleSystem);

    // 5. Interactive Mouse Parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 6. Resize Listener
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 7. Animation Loop with Continuously Changing Color Lights
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth camera movement following mouse
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 1.8;
      camera.position.y = -targetY * 1.8;
      camera.lookAt(0, 0, 0);

      // Rotate 3D Geometries
      torusKnot.rotation.x = time * 0.18;
      torusKnot.rotation.y = time * 0.22;

      icoMesh.rotation.x = time * 0.14;
      icoMesh.rotation.z = time * 0.12;

      octaMesh.rotation.y = time * 0.28;
      octaMesh.rotation.x = time * 0.15;

      torusMesh.rotation.x = time * 0.08;
      torusMesh.rotation.y = time * 0.14;

      // Animate floating spheres with wave motion
      spheres.forEach((sp, idx) => {
        sp.position.y += Math.sin(time * 1.4 + idx) * 0.004;
        sp.position.x += Math.cos(time * 1.1 + idx) * 0.003;
      });

      // Slowly spin the particle cosmos
      particleSystem.rotation.y = time * 0.025;
      particleSystem.rotation.x = time * 0.01;

      // Dynamic Changing Color Lights (Smooth HSL Hue shifting)
      // Light 1: Violet -> Pink -> Amber (Top Orbit)
      light1.position.x = Math.sin(time * 0.6) * 13;
      light1.position.y = Math.cos(time * 0.4) * 9;
      light1.position.z = Math.sin(time * 0.3) * 7;
      light1.color.setHSL((time * 0.06) % 1, 0.9, 0.55);

      // Light 2: Cyan -> Electric Blue -> Emerald (Bottom Orbit)
      light2.position.x = Math.cos(time * 0.5) * 13;
      light2.position.y = Math.sin(time * 0.7) * 9;
      light2.position.z = Math.cos(time * 0.4) * 7;
      light2.color.setHSL((time * 0.06 + 0.33) % 1, 0.95, 0.55);

      // Light 3: Magenta -> Neon Purple -> Cyan (Center Depth Orbit)
      light3.position.x = Math.sin(time * 0.4) * 11;
      light3.position.y = Math.sin(time * 0.8) * 11;
      light3.position.z = Math.sin(time * 0.5) * 5;
      light3.color.setHSL((time * 0.06 + 0.66) % 1, 0.9, 0.55);

      // Light 4: Bright Emerald -> Lime -> Gold Pulse
      light4.position.x = Math.cos(time * 0.3) * 9;
      light4.position.y = Math.sin(time * 0.2) * 7;
      light4.position.z = Math.cos(time * 0.6) * 9;
      light4.color.setHSL((time * 0.04 + 0.45) % 1, 0.85, 0.5);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Cleanup resources
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();

      torusKnotGeo.dispose();
      icoGeo.dispose();
      octaGeo.dispose();
      torusGeo.dispose();
      sphereGeo.dispose();
      particlesGeo.dispose();
      mainMat.dispose();
      wireMat.dispose();
      particleMat.dispose();
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden transition-opacity duration-700">
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-80 dark:opacity-90"
      />
    </div>
  );
}

export default ThreeBackground;
