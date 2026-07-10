"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Code2, BrainCircuit } from "lucide-react";
import { ABOUT_CARDS, ABOUT_SUMMARY } from "@/lib/portfolio-data";

const ICON_MAP: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="size-5" />,
  BrainCircuit: <BrainCircuit className="size-5" />,
  Code2: <Code2 className="size-5" />,
};

export function About() {
  const cards = ABOUT_CARDS.map((card) => ({
    ...card,
    icon: ICON_MAP[card.iconName],
  }));

  return (
    <section id="about" className="py-28 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto max-w-6xl px-4"
      >
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 dark:bg-gradient-to-b dark:from-white dark:via-zinc-100 dark:to-zinc-600 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-zinc-400 dark:bg-zinc-700 mx-auto mt-4 rounded-full"
          />
          <p className="text-zinc-500 dark:text-zinc-400 mt-6 text-base md:text-lg leading-relaxed font-normal">
            {ABOUT_SUMMARY}
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group h-full rounded-2xl border border-zinc-200/10 dark:border-white/5 bg-zinc-100/50 dark:bg-[#121214]/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-zinc-200/50 hover:dark:bg-[#161619]/60 hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300">
                {/* Visual Top Highlight Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-indigo-500/0 group-hover:from-violet-500/10 group-hover:via-violet-500/50 group-hover:to-indigo-500/10 transition-all duration-500" />

                <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    {/* Floating Icon badge with light halo */}
                    <div className="inline-flex p-3 rounded-xl bg-zinc-200/50 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 border border-zinc-300/30 dark:border-white/5 group-hover:scale-110 group-hover:border-violet-500/20 group-hover:text-violet-500 transition-all duration-300">
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
                      {card.title}
                    </h3>

                    {/* Category Label */}
                    <span className="inline-block text-[10px] font-mono tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full bg-zinc-200/60 dark:bg-white/[0.04] text-zinc-500 dark:text-zinc-400 border border-zinc-300/30 dark:border-white/5">
                      {card.detail}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
export default About;
