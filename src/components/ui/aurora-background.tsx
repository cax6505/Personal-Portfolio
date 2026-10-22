"use client";

import React, { useEffect, useRef, useState } from "react";

export function AuroraBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [motionActive, setMotionActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const desktopViewport = window.matchMedia("(min-width: 640px)");
    let isVisible = !document.hidden;
    let isInView = true;

    const updateMotion = () => {
      setMotionActive(motionPreference.matches && desktopViewport.matches && isVisible && isInView);
    };
    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => {
          isInView = entry.isIntersecting;
          updateMotion();
        });
    observer?.observe(root);

    const handleVisibility = () => {
      isVisible = !document.hidden;
      updateMotion();
    };
    motionPreference.addEventListener("change", updateMotion);
    desktopViewport.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", handleVisibility);
    updateMotion();

    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener("change", updateMotion);
      desktopViewport.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 -z-30 overflow-hidden pointer-events-none bg-zinc-50 dark:bg-[#030303] transition-colors duration-300">
      {/* 1. Subtle dot grid overlay (fades out at edges) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#18181b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-[0.4] dark:opacity-[0.8]"
      />

      {/* 2. Rotating/Moving Fluid Aurora Blobs */}
      <div className="aurora-lights absolute inset-0 mix-blend-normal dark:mix-blend-screen">
        {/* Blob 1: Soft Violet - orbiting top-left */}
        <div
          className={`absolute top-[-10%] left-[-10%] w-[55vw] h-[55vh] rounded-full bg-violet-300/30 dark:bg-violet-700/15 ${motionActive ? "ambient-drift ambient-drift-a" : ""}`}
        />

        {/* Blob 2: Soft Indigo/Blue - orbiting top-right */}
        <div
          className={`absolute top-[10%] right-[-10%] w-[50vw] h-[50vh] rounded-full bg-indigo-300/25 dark:bg-indigo-700/15 ${motionActive ? "ambient-drift ambient-drift-b" : ""}`}
        />

        {/* Blob 3: Soft Emerald/Teal - orbiting center-bottom */}
        <div
          className={`absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vh] rounded-full bg-blue-200/25 dark:bg-blue-600/10 ${motionActive ? "ambient-drift ambient-drift-c" : ""}`}
        />
      </div>

    </div>
  );
}
export default AuroraBackground;
