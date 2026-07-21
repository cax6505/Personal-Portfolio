"use client";

import React from "react";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none bg-zinc-50 dark:bg-[#030303] transition-colors duration-300">
      {/* 1. Subtle dot grid overlay (fades out at edges) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#18181b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-[0.4] dark:opacity-[0.8]" 
      />

      {/* 2. Rotating/Moving Fluid Aurora Blobs */}
      <div className="absolute inset-0 filter blur-[100px] md:blur-[140px] opacity-[0.35] dark:opacity-[0.7] mix-blend-normal dark:mix-blend-screen">
        {/* Blob 1: Soft Violet - orbiting top-left */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vh] rounded-full bg-violet-300/30 dark:bg-violet-700/15 animate-[orbit_20s_infinite_linear]" 
        />
        
        {/* Blob 2: Soft Indigo/Blue - orbiting top-right */}
        <div 
          className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-indigo-300/25 dark:bg-indigo-700/15 animate-[orbit_25s_infinite_linear_reverse]" 
        />

        {/* Blob 3: Soft Emerald/Teal - orbiting center-bottom */}
        <div 
          className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vh] rounded-full bg-emerald-200/25 dark:bg-teal-600/10 animate-[orbit_30s_infinite_linear]" 
        />
      </div>

      {/* CSS Keyframes for smooth organic blob movement */}
      <style jsx global>{`
        @keyframes orbit {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(5%, 10%) rotate(120deg) scale(1.05);
          }
          66% {
            transform: translate(-5%, -5%) rotate(240deg) scale(0.95);
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
export default AuroraBackground;
