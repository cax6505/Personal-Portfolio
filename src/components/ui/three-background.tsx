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

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const isDark = resolvedTheme !== "light";

    // 2. Dynamic Changing Cyber Lights (AI / Tech Palette)
    const light1 = new THREE.PointLight(0x00f0ff, 140, 90); // Cyber Cyan
    const light2 = new THREE.PointLight(0xa855f7, 140, 90); // AI Purple / Neon Violet
    const light3 = new THREE.PointLight(0x10b981, 120, 90); // Matrix Emerald
    const light4 = new THREE.PointLight(0x3b82f6, 120, 90); // Quantum Sapphire

    scene.add(light1);
    scene.add(light2);
    scene.add(light3);
    scene.add(light4);

    // Glowing Light Orbs attached to each orbiting light source
    const orbGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const orbMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const orbMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const orbMat3 = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const orbMat4 = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });

    const orbMesh1 = new THREE.Mesh(orbGeo, orbMat1);
    const orbMesh2 = new THREE.Mesh(orbGeo, orbMat2);
    const orbMesh3 = new THREE.Mesh(orbGeo, orbMat3);
    const orbMesh4 = new THREE.Mesh(orbGeo, orbMat4);

    scene.add(orbMesh1);
    scene.add(orbMesh2);
    scene.add(orbMesh3);
    scene.add(orbMesh4);

    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x090d16 : 0xdbeafe,
      isDark ? 2.0 : 3.0
    );
    scene.add(ambientLight);

    // 3. TECH SCENE OBJECTS
    const techGroup = new THREE.Group();

    // A. 3D Neural Network / Data Constellation Nodes
    const nodeCount = 45;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      emissive: isDark ? 0x0284c7 : 0x38bdf8,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });

    const nodesGroup = new THREE.Group();
    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 32,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 14 - 2
      );
      nodePositions.push(pos);

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodesGroup.add(nodeMesh);
    }
    techGroup.add(nodesGroup);

    // B. Neural Network Connection Lines (Data Links)
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 7.5) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );

          const c1 = new THREE.Color(isDark ? 0x00f0ff : 0x0284c7);
          const c2 = new THREE.Color(isDark ? 0xa855f7 : 0x4f46e5);

          lineColors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    linesGeo.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 3)
    );

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });

    const networkLines = new THREE.LineSegments(linesGeo, linesMat);
    techGroup.add(networkLines);

    // C. Central 3D Quantum Processor Core (Nested Wireframe Cubes + Glowing Sphere)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, -4);

    const outerCubeGeo = new THREE.BoxGeometry(4, 4, 4);
    const outerCubeMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x38bdf8 : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const outerCube = new THREE.Mesh(outerCubeGeo, outerCubeMat);
    coreGroup.add(outerCube);

    const innerCubeGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const innerCubeMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xa855f7 : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerCube = new THREE.Mesh(innerCubeGeo, innerCubeMat);
    coreGroup.add(innerCube);

    const coreSphereGeo = new THREE.IcosahedronGeometry(1.0, 2);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x00f0ff : 0x0284c7,
      emissive: isDark ? 0x00f0ff : 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    coreGroup.add(coreSphere);

    techGroup.add(coreGroup);

    // D. 3D Silicon Tech Lattice / Hexagon Grids (Left & Right background panels)
    const hexGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.2, 6);
    const hexMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0xe2e8f0,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const hexLeft = new THREE.Mesh(hexGeo, hexMat);
    hexLeft.position.set(-8, 3, -5);
    hexLeft.rotation.x = Math.PI / 3;
    techGroup.add(hexLeft);

    const hexRight = new THREE.Mesh(hexGeo, hexMat);
    hexRight.position.set(8, -4, -5);
    hexRight.rotation.x = Math.PI / 4;
    techGroup.add(hexRight);

    scene.add(techGroup);

    // 4. Digital Matrix Data Streams / Particle Field
    const particleCount = 1200;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 48;
      posArray[i + 1] = (Math.random() - 0.5) * 36;
      posArray[i + 2] = (Math.random() - 0.5) * 24;

      // Cyan / Violet / Green Tech Palette
      const randVal = Math.random();
      let color = new THREE.Color(0x00f0ff);
      if (randVal > 0.66) color = new THREE.Color(0xa855f7);
      else if (randVal > 0.33) color = new THREE.Color(0x10b981);

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
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.75 : 0.5,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleSystem);

    // 5. Interactive Mouse Parallax
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

    // 7. Render & Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 2.0;
      camera.position.y = -targetY * 2.0;
      camera.lookAt(0, 0, 0);

      // Animate Quantum Processor Core
      outerCube.rotation.x = time * 0.2;
      outerCube.rotation.y = time * 0.25;

      innerCube.rotation.x = -time * 0.3;
      innerCube.rotation.z = time * 0.35;

      coreSphere.rotation.y = time * 0.4;
      coreSphereMat.emissiveIntensity = 0.6 + Math.sin(time * 3) * 0.3;

      // Rotate Tech Grids
      hexLeft.rotation.z = time * 0.15;
      hexRight.rotation.z = -time * 0.18;

      // Rotate Neural Network
      techGroup.rotation.y = Math.sin(time * 0.1) * 0.15;

      // Animate Digital Particles
      particleSystem.rotation.y = time * 0.02;

      // DYNAMIC CHANGING CYBER LIGHTS!
      // Light 1: Cyber Cyan -> Neon Violet -> Sapphire Orbit
      light1.position.x = Math.sin(time * 0.7) * 15;
      light1.position.y = Math.cos(time * 0.5) * 11;
      light1.position.z = Math.sin(time * 0.4) * 8;
      const col1 = new THREE.Color().setHSL((time * 0.08) % 1, 0.95, 0.55);
      light1.color.copy(col1);
      orbMat1.color.copy(col1);
      orbMesh1.position.copy(light1.position);

      // Light 2: AI Purple -> Pink -> Electric Emerald Orbit
      light2.position.x = Math.cos(time * 0.6) * 15;
      light2.position.y = Math.sin(time * 0.8) * 11;
      light2.position.z = Math.cos(time * 0.5) * 8;
      const col2 = new THREE.Color().setHSL((time * 0.08 + 0.33) % 1, 0.95, 0.55);
      light2.color.copy(col2);
      orbMat2.color.copy(col2);
      orbMesh2.position.copy(light2.position);

      // Light 3: Matrix Green -> Cyan -> Purple Orbit
      light3.position.x = Math.sin(time * 0.5) * 13;
      light3.position.y = Math.sin(time * 0.9) * 13;
      light3.position.z = Math.sin(time * 0.6) * 6;
      const col3 = new THREE.Color().setHSL((time * 0.08 + 0.66) % 1, 0.95, 0.55);
      light3.color.copy(col3);
      orbMat3.color.copy(col3);
      orbMesh3.position.copy(light3.position);

      // Light 4: Quantum Sapphire -> Amber -> Violet Pulse
      light4.position.x = Math.cos(time * 0.4) * 11;
      light4.position.y = Math.sin(time * 0.3) * 9;
      light4.position.z = Math.cos(time * 0.7) * 11;
      const col4 = new THREE.Color().setHSL((time * 0.06 + 0.5) % 1, 0.9, 0.55);
      light4.color.copy(col4);
      orbMat4.color.copy(col4);
      orbMesh4.position.copy(light4.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();

      nodeGeo.dispose();
      linesGeo.dispose();
      outerCubeGeo.dispose();
      innerCubeGeo.dispose();
      coreSphereGeo.dispose();
      hexGeo.dispose();
      orbGeo.dispose();
      particlesGeo.dispose();

      nodeMat.dispose();
      linesMat.dispose();
      outerCubeMat.dispose();
      innerCubeMat.dispose();
      coreSphereMat.dispose();
      hexMat.dispose();
      particleMat.dispose();

      orbMat1.dispose();
      orbMat2.dispose();
      orbMat3.dispose();
      orbMat4.dispose();
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-700">
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-90 dark:opacity-100"
      />
    </div>
  );
}

export default ThreeBackground;
