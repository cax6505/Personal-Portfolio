import React from "react";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Hero />
      <About />
      <Skills />
    </div>
  );
}