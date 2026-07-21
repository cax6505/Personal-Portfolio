"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  glowSize?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(139, 92, 246, 0.15)", // Default violet glow
  glowSize = 300,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/5 transition-all duration-500 hover:-translate-y-1.5 hover:border-zinc-300 dark:hover:border-white/20 shadow-[0_2px_15px_rgb(0,0,0,0.04),0_1px_3px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.05)] hover:dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.65)]",
        className
      )}
      {...props}
    >
      {/* Dynamic hardware-accelerated radial spotlight glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 z-0"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          left: `${coords.x - glowSize / 2}px`,
          top: `${coords.y - glowSize / 2}px`,
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 80%)`,
          opacity: isFocused ? 1 : 0,
        }}
      />
      
      {/* Specular Highlight Top Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-400/15 dark:via-violet-500/20 to-indigo-500/0 z-20" />

      {/* Card Solid Backplate (behind glow) */}
      <div className="absolute inset-0 bg-white/90 dark:bg-[#121214]/60 backdrop-blur-md -z-10" />

      {/* Card Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default SpotlightCard;
