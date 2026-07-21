"use client";

import { useEffect } from "react";

export function CodeCopier() {
  useEffect(() => {
    const preTags = document.querySelectorAll("pre");

    preTags.forEach((pre) => {
      // Prevent double injection
      if (pre.querySelector(".copy-code-btn")) return;

      pre.style.position = "relative";

      const button = document.createElement("button");
      button.className = "copy-code-btn absolute top-3 right-3 p-1.5 rounded-lg border border-zinc-200/20 bg-zinc-950/80 text-zinc-400 hover:text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 outline-none cursor-pointer";
      button.innerHTML = "Copy";
      button.setAttribute("aria-label", "Copy code snippet");

      // Wrap pre in group hover class
      pre.classList.add("group");

      button.addEventListener("click", async () => {
        const codeElement = pre.querySelector("code");
        const code = codeElement?.innerText || "";
        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML = "Copied!";
          button.classList.add("text-emerald-400", "border-emerald-500/30");
          setTimeout(() => {
            button.innerHTML = "Copy";
            button.classList.remove("text-emerald-400", "border-emerald-500/30");
          }, 2000);
        } catch {
          button.innerHTML = "Error";
        }
      });

      pre.appendChild(button);
    });
  }, []);

  return null;
}

export default CodeCopier;
