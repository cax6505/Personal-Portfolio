import React from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Hero section */}
      <Hero />

      {/* About section */}
      <About />

      {/* Experience section */}
      <Experience />

      {/* Projects section (Server Component fetching live GitHub stats) */}
      <Projects />

      {/* Skills section */}
      <Skills />

      {/* Achievements section */}
      <Achievements />

      {/* Contact section */}
      <Contact />
    </div>
  );
}
