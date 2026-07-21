"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only activate cursor if pointer is fine (mouse/desktop)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    // Set cursor active class on body
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Setup hover listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".hover-trigger") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.getAttribute("role") === "button" ||
        target.closest("[role='option']") ||
        target.closest("[data-slot='command-item']");

      if (isInteractive) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  // Theme-aware cursor colors
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const ringBorderColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.6)";
  const ringHoverBg = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)";
  const dotColor = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.7)";

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 44 : 20,
          height: hovered ? 44 : 20,
          backgroundColor: hovered ? ringHoverBg : "transparent",
          border: `1px solid ${ringBorderColor}`,
          mixBlendMode: isDark ? "difference" : "normal",
        }}
        animate={{
          scale: clicked ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
          backgroundColor: dotColor,
          mixBlendMode: isDark ? "difference" : "normal",
        }}
        animate={{
          scale: hovered ? 0 : clicked ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
}
export default CustomCursor;
