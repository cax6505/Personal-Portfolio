"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { EXPERIENCES_DATA } from "@/lib/portfolio-data";

export function Experience() {
  const experiences = EXPERIENCES_DATA;

  return (
    <section id="experience" className="py-20 md:py-28 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto max-w-4xl px-4"
      >
        {/* Section Heading */}
        <div className="max-w-2xl mx-auto text-center mb-14 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-100 dark:to-zinc-600 bg-clip-text text-transparent"
          >
            Professional Experience
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-zinc-300 dark:bg-zinc-700 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Timeline Visual Container */}
        <div className="relative border-l border-zinc-300 dark:border-white/10 ml-4 md:ml-32 pl-8 md:pl-10 space-y-12 py-4">
          {/* Subtle Vertical Glow Indicator Line */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-violet-500 via-indigo-500 to-transparent -ml-[1px]" />

          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline Bead Circle Node with Glow */}
              <div className="absolute -left-[45px] md:-left-[53px] top-1.5 flex items-center justify-center size-8 rounded-full border border-zinc-200 dark:border-white/5 bg-white dark:bg-[#121214] shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.8)] z-10">
                <div className="size-2.5 rounded-full bg-violet-500 dark:bg-violet-400 group-hover:scale-125 transition-transform" />
              </div>

              {/* Company / Date floating label in timeline left-gutter on desktop */}
              <div className="hidden md:block absolute -left-44 top-2 text-right w-32">
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/5">
                  {exp.period}
                </span>
              </div>

              {/* Main Card Capsule */}
              <SpotlightCard
                spotlightColor="rgba(99, 102, 241, 0.12)"
                className="p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    {/* Role Title */}
                    <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                      {exp.role}
                    </h3>
                    {/* Company */}
                    <div className="flex items-center gap-2 mt-1.5 text-zinc-600 dark:text-zinc-400">
                      <Briefcase className="size-4 shrink-0 text-violet-500" />
                      <span className="text-sm font-semibold">{exp.company}</span>
                    </div>
                  </div>

                  {/* Mobile Period badge (only on small viewports) */}
                  <div className="md:hidden">
                    <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/5">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3.5">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-500/80 mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
export default Experience;
