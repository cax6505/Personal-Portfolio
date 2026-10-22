"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.parentElement?.clientHeight || window.innerHeight;
    let isInView = false;
    let isPageVisible = !document.hidden;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let lastFrame = 0;
    const frameInterval = 1000 / 30;

    const particles: Particle[] = [];
    const particleCount = window.innerWidth < 640 ? 0 : 32;

    let mouseX = width / 2;
    let mouseY = height / 2;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.1 + 0.7,
        baseAlpha: Math.random() * 0.2 + 0.08,
      });
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      mouseX = width / 2;
      mouseY = height / 2;
      if (reducedMotion || particleCount === 0) drawFrame();
    };

    const handleResize = () => {
      resizeCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!finePointer) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const stop = () => cancelAnimationFrame(animationFrameId);
    const start = () => {
      stop();
      if (isInView && isPageVisible && !reducedMotion && particleCount > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stop();
        drawFrame();
      } else {
        start();
      }
    };
    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      start();
    };

    window.addEventListener("resize", handleResize);
    if (finePointer) window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionPreference.addEventListener("change", handleMotionPreference);

    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => {
          isInView = entry.isIntersecting;
          start();
        }, { threshold: 0 });
    observer?.observe(canvas);
    if (!observer) {
      isInView = true;
    }

    const isDarkMode = () => document.documentElement.classList.contains("dark");

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const dark = isDarkMode();

      const particleColor = dark ? "167, 139, 250" : "99, 102, 241"; // violet theme
      const lineColor = dark ? "139, 92, 246" : "99, 102, 241";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.baseAlpha})`;
        ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        if (finePointer) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const malpha = (1 - mdist / 140) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(${lineColor}, ${malpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
    };

    const render = (time: number) => {
      if (time - lastFrame < frameInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      drawFrame();
      if (isInView && isPageVisible && !reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    resizeCanvas();
    drawFrame();
    if (!observer) start();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (finePointer) window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionPreference.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 size-full pointer-events-none -z-10 opacity-55"
    />
  );
}
export default HeroCanvas;
