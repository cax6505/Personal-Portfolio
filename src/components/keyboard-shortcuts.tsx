"use client";

import React, { useEffect, useState } from "react";
import { KeyboardShortcutsModal } from "@/components/keyboard-shortcuts-modal";

export function KeyboardShortcuts() {
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when user is typing inside input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case "j":
          window.scrollBy({ top: 180, behavior: "smooth" });
          break;
        case "k":
          window.scrollBy({ top: -180, behavior: "smooth" });
          break;
        case "1":
          document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "2":
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "3":
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "4":
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "5":
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "6":
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          break;
        case "?":
          setShowCheatsheet((prev) => !prev);
          break;
        case "t":
        case "T":
          window.dispatchEvent(new CustomEvent("open-terminal"));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <KeyboardShortcutsModal isOpen={showCheatsheet} onClose={() => setShowCheatsheet(false)} />;
}
export default KeyboardShortcuts;
