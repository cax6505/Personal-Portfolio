import React from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { TerminalModal } from "@/components/terminal/terminal-modal";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { ConsoleEasterEgg } from "@/components/console-easter-egg";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Global Keyboard Navigation Listener & DevTools Console Banner */}
      <KeyboardShortcuts />
      <ConsoleEasterEgg />

      {/* Hero section */}
      <Hero />

      {/* About section */}
      <About />

      {/* Experience section */}
      <Experience />

      {/* Projects section */}
      <Projects />

      {/* Skills section */}
      <Skills />

      {/* Achievements section */}
      <Achievements />

      {/* Contact section */}
      <Contact />

      {/* Interactive Zsh Terminal Shell Modal */}
      <TerminalModal />
    </div>
  );
}
