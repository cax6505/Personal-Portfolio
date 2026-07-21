"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { GraduationCap, Code2, BrainCircuit } from "lucide-react";
import { ABOUT_CARDS, ABOUT_SUMMARY } from "@/lib/portfolio-data";

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="size-5" />,
  BrainCircuit: <BrainCircuit className="size-5" />,
  Code2: <Code2 className="size-5" />,
};

const SPOTLIGHT_COLORS: Record<string, string> = {
  GraduationCap: "rgba(16, 185, 129, 0.15)", // emerald
  BrainCircuit: "rgba(139, 92, 246, 0.15)", // violet
  Code2: "rgba(14, 165, 233, 0.15)", // sky
};

export function About() {
  const cards = ABOUT_CARDS.map((card) => ({
    ...card,
    icon: ICON_MAP[card.iconName],
  }));

  return (
    <section id="about" className="py-20 md:py-28 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto max-w-6xl px-4"
      >
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-100 dark:to-zinc-600 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-zinc-300 dark:bg-zinc-700 mx-auto mt-4 rounded-full"
          />
          <p className="text-zinc-500 dark:text-zinc-400 mt-6 text-sm sm:text-base md:text-lg leading-relaxed font-normal px-2">
            {ABOUT_SUMMARY}
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SpotlightCard
                spotlightColor={SPOTLIGHT_COLORS[card.iconName]}
                className="group h-full"
              >
                <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    {/* Floating Icon badge with light halo */}
                    <div className="inline-flex p-3 rounded-xl bg-zinc-100 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 group-hover:scale-110 group-hover:border-violet-500/20 group-hover:text-violet-500 transition-all duration-300">
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
                      {card.title}
                    </h3>

                    {/* Category Label */}
                    <span className="inline-block text-[10px] font-mono tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/5">
                      {card.detail}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </CardContent>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
export default About;
