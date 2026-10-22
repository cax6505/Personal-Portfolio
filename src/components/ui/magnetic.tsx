"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Distance multiplier (default 0.35)
  className?: string;
}

export function Magnetic({ children, strength = 0.35, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 24, mass: 0.25 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 24, mass: 0.25 });

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const updatePointer = () => setFinePointer(pointer.matches);
    updatePointer();
    pointer.addEventListener("change", updatePointer);
    return () => pointer.removeEventListener("change", updatePointer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !finePointer || reduceMotion) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(Math.max(-5, Math.min(5, middleX * strength)));
    y.set(Math.max(-5, Math.min(5, middleY * strength)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: finePointer && !reduceMotion ? x : 0, y: finePointer && !reduceMotion ? y : 0 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
