"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Award, CheckCircle2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Achievements() {
  return (
    <section id="achievements" className="py-20 md:py-28 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto max-w-6xl px-4"
      >
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-4"
          >
            <Trophy className="size-5" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-100 dark:to-zinc-600 bg-clip-text text-transparent"
          >
            Key Achievements
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-zinc-300 dark:bg-zinc-700 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Single Massive Showcase Card combining all 3 points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.12)"
            className=""
          >

            <CardContent className="p-6 sm:p-8 md:p-12 space-y-8 md:space-y-10">
              {/* Header block with trophy/title and floating top badge */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 pb-6 border-b border-zinc-200 dark:border-white/5">
                <div className="flex items-center gap-4">
                  <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <Trophy className="size-5 md:size-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
                      Amazon ML Summer School Selection
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Nationwide Merit Selection</p>
                  </div>
                </div>

                <div>
                  <span className="inline-block text-xs font-mono tracking-wider uppercase font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(245,158,11,0.1)]">
                    Top 2.3% Merit
                  </span>
                </div>
              </div>

              {/* Main combined statistics columns layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Point 1: Candidate Pool */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <Target className="size-4 shrink-0" />
                    <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">Selection Pool</span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
                    130,000+ Applicants
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    Competed nationwide and secured selection among the top 3,000 high-potential candidates (Top 2.3%).
                  </p>
                </div>

                {/* Point 2: Core Engineering concepts */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-indigo-500">
                    <Award className="size-4 shrink-0" />
                    <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">Evaluation</span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
                    Core Mathematics & ML
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    Proven capabilities in core engineering and mathematical algorithms to qualify for the cohort.
                  </p>
                </div>

                {/* Point 3: Curriculum trained under scientists */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-violet-500">
                    <Trophy className="size-4 shrink-0" />
                    <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">Training</span>
                  </div>
                  <h4 className="text-lg md:text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
                    Amazon Scientists Cohort
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                    Trained on Supervised/Deep Learning, Dimensionality Reduction, Large Language Models, and Generative AI.
                  </p>
                </div>
              </div>

              {/* Bullet checklist of training competencies */}
              <div className="pt-6 border-t border-zinc-200 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-start gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Deep learning pipelines & Transfer Learning (EfficientNet)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Dimensionality Reduction & Feature engineering algorithms</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Large Language Models (LLMs) & Generative AI workflows</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Supervised/Unsupervised statistical modeling paradigms</span>
                </div>
              </div>
            </CardContent>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
export default Achievements;
