import React from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Achievements } from "@/components/sections/achievements";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Achievements />
    </div>
  );
}