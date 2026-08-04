"use client";

import { useEffect } from "react";

export function ConsoleEasterEgg() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ASCII Art Console Banner
    const asciiArt = `
  _  _____  _     _     ___   ____  _     _     _   _    _    
 | |/ / _ \\| |   | |   |_ _| / ___|| |   | |   | | | |  / \\   
 | ' / | | | |   | |    | | | |    | |_|_| |_|_| |_| | / _ \\  
 | . \\ |_| | |___| |___ | | | |___ |  _  |  _  |  _  |/ ___ \\ 
 |_|\\_\\___/|_____|_____|___| \\____||_| |_|_| |_|_| |_/_/   \\_\\
                                                              
 👋 Welcome to Kolli Charan Adithya's Portfolio DevTools!
 Type \`kolli\` in the console to explore developer methods.
`;

    console.log(`%c${asciiArt}`, "color: #8b5cf6; font-weight: bold; font-family: monospace;");

    // Bind window.kolli API
    (window as unknown as Record<string, unknown>).kolli = {
      name: "Kolli Charan Adithya",
      role: "Frontend / Fullstack Engineer & AI Enthusiast",
      email: "adithyakolli55@gmail.com",
      github: "https://github.com/cax6505",
      getSkills: () => [
        "TypeScript", "React", "Next.js", "Tailwind CSS",
        "Node.js", "Express.js", "PostgreSQL", "Supabase", "Prisma",
        "Python", "TensorFlow", "Scikit-Learn", "Cypress", "Docker", "AWS"
      ],
      getProjects: () => [
        { name: "ModelRoute", desc: "Multi-LLM router & circuit breaker" },
        { name: "DraftForge", desc: "Real-time IPL auction simulator" },
        { name: "Predictive Sales Analytics", desc: "ML repeat purchase forecast" },
        { name: "SaveSpace", desc: "Async file system topology simulator" }
      ],
      openTerminal: () => {
        window.dispatchEvent(new CustomEvent("open-terminal"));
        return "Terminal opened!";
      }
    };
  }, []);

  return null;
}
export default ConsoleEasterEgg;
