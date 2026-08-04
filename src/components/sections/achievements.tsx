"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Award, CheckCircle2, ShieldCheck, QrCode } from "lucide-react";
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
        className="container mx-auto max-w-6xl px-4 space-y-12"
      >
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center">
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
            Key Achievements & Hackathons
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-zinc-300 dark:bg-zinc-700 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Achievements Grid Layout */}
        <div className="grid grid-cols-1 gap-8">
          {/* Achievement 1: Amazon ML Summer School */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard
              spotlightColor="rgba(245, 158, 11, 0.12)"
              className="group"
            >
              <CardContent className="p-6 sm:p-8 md:p-10 space-y-8">
                {/* Header block */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-white/5">
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
                      Top 2.3% Merit (~3,000 / 130,000+)
                    </span>
                  </div>
                </div>

                {/* 3 statistics columns layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Target className="size-4 shrink-0" />
                      <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">Selection Pool</span>
                    </div>
                    <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">130,000+ Applicants</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Secured selection among top 3,000 candidates nationwide (~2.3% acceptance rate).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-indigo-500">
                      <Award className="size-4 shrink-0" />
                      <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">Evaluation</span>
                    </div>
                    <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">Core Math & Algorithms</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Demonstrated mastery in core computer science, probability, and machine learning theory.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-violet-500">
                      <Trophy className="size-4 shrink-0" />
                      <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">Training</span>
                    </div>
                    <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">Amazon Scientists Cohort</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Trained on Deep Learning, EfficientNet, Transfer Learning, LLMs, and Production MLOps.
                    </p>
                  </div>
                </div>

                {/* Bullet checklist */}
                <div className="pt-6 border-t border-zinc-200 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Deep learning pipelines & Transfer Learning (EfficientNet)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Dimensionality Reduction & Feature engineering algorithms</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Large Language Models (LLMs) & Generative AI workflows</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Supervised & Unsupervised statistical modeling paradigms</span>
                  </div>
                </div>
              </CardContent>
            </SpotlightCard>
          </motion.div>

          {/* Achievement 2: StealthFire Hackathon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.12)"
              className="group"
            >
              <CardContent className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Header block */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      <Award className="size-5 md:size-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
                        StealthFire Hackathon — 3rd Place Finalist
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">25 Engineering Teams Competition</p>
                    </div>
                  </div>

                  <div>
                    <span className="inline-block text-xs font-mono tracking-wider uppercase font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(16,185,129,0.1)]">
                      3rd Place Winner (25 Teams)
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <QrCode className="size-4 shrink-0" />
                      <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">Solution Architecture</span>
                    </div>
                    <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200">QR-Based Digital Student ID System</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Architected an emergency digital identity recovery platform solving physical card loss across campus networks with instant verification.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sky-500">
                      <ShieldCheck className="size-4 shrink-0" />
                      <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">Impact & Execution</span>
                    </div>
                    <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200">Sub-Second Scanning & Instant Recovery</h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Built with encrypted QR code rotation, zero-latency verification APIs, and mobile-first authentication interfaces under strict hackathon time constraints.
                    </p>
                  </div>
                </div>
              </CardContent>
            </SpotlightCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
export default Achievements;
