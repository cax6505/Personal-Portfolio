"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  spotlightColor?: string;
  glowSize?: number;
  enableTilt?: boolean;
}

export function SpotlightCard({
  children,
  className,
  id,
  spotlightColor = "rgba(139, 92, 246, 0.15)", // Default violet glow
  glowSize = 320,
  enableTilt = true,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const reduceMotion = useReducedMotion();
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(${glowSize}px circle at ${spotlightX}px ${spotlightY}px, ${spotlightColor}, transparent 80%)`;
  const sheenBackground = useMotionTemplate`radial-gradient(560px circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.055), transparent 62%)`;

  // 3D Tilt Spring Values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 260, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2.5, -2.5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2.5, 2.5]), springConfig);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const updatePointer = () => setFinePointer(pointer.matches);
    updatePointer();
    pointer.addEventListener("change", updatePointer);
    return () => pointer.removeEventListener("change", updatePointer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotlightX.set(x);
    spotlightY.set(y);

    if (enableTilt && finePointer && !reduceMotion) {
      mouseX.set(x / rect.width);
      mouseY.set(y / rect.height);
    }
  };

  const handleMouseEnter = () => {
    setIsFocused(true);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    if (enableTilt && finePointer && !reduceMotion) {
      mouseX.set(0.5);
      mouseY.set(0.5);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      spotlightX.set(rect.width / 2);
      spotlightY.set(Math.min(rect.height / 3, 150));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false);
    }
  };

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        style={{
          rotateX: enableTilt && finePointer && !reduceMotion ? rotateX : 0,
          rotateY: enableTilt && finePointer && !reduceMotion ? rotateY : 0,
          transformStyle: enableTilt && finePointer && !reduceMotion ? "preserve-3d" : "flat",
        }}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-white/[0.07] bg-white/70 dark:bg-white/[0.025] backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-500 ease-out shadow-[0_2px_15px_rgb(0,0,0,0.04),0_1px_3px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:border-indigo-300/50 dark:hover:border-indigo-300/15 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.05)] hover:dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.45)] focus-within:border-indigo-300/50 dark:focus-within:border-indigo-300/20",
          className
        )}
        id={id}
      >
        {/* Dynamic hardware-accelerated radial spotlight glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: spotlightBackground,
            opacity: isFocused && finePointer ? 0.6 : 0,
          }}
        />

        {/* Specular Glare Sheen across top angle */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
          style={{
            background: sheenBackground,
            opacity: isFocused && finePointer ? 1 : 0,
          }}
        />

        {/* Specular Highlight Top Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent z-20 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Card Solid Backplate (behind glow) */}
        <div className="absolute inset-0 bg-white/45 dark:bg-[#10131d]/35 backdrop-blur-md -z-10" />

        {/* Card Content */}
        <div className="relative z-10 h-full">{children}</div>
      </motion.div>
    </div>
  );
}

export default SpotlightCard;
