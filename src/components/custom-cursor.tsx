"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

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
        target.getAttribute("role") === "button";

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

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference bg-white"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        width: hovered ? 28 : 8,
        height: hovered ? 28 : 8,
      }}
      animate={{
        scale: clicked ? 0.95 : 1,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    />
  );
}
export default CustomCursor;
