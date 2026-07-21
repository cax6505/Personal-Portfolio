"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HERO_DATA } from "@/lib/portfolio-data";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center pt-24 pb-16 bg-transparent overflow-hidden">
      {/* Background radial glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full bg-violet-500/[0.04] dark:bg-violet-500/[0.04] blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto max-w-4xl px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Accent Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-300/60 dark:border-white/10 bg-emerald-50/80 dark:bg-white/[0.03] backdrop-blur-md text-xs font-medium text-emerald-700 dark:text-zinc-300 shadow-[0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide uppercase font-mono text-[10px] text-emerald-700 dark:text-zinc-300">
              {HERO_DATA.availabilityLabel}
            </span>
          </motion.div>

          {/* Large display Heading with Apple-like metallic text gradient */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-8xl font-black tracking-tight leading-tight select-none bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-100 dark:to-zinc-600 bg-clip-text text-transparent"
          >
            {HERO_DATA.firstName} <span className="opacity-60 font-extralight text-zinc-400 dark:text-zinc-500">{HERO_DATA.lastName}</span>
          </motion.h1>

          {/* Subheading / Tagline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal px-2"
          >
            Frontend/Full-stack Engineer & AI/ML enthusiast. B.Tech Computer Science + AI student at{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{HERO_DATA.university}</span>.
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 sm:gap-3 py-2 flex-wrap"
          >
            <a
              href={HERO_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-white/[0.02] text-xs font-mono text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300"
            >
              <Github className="size-3.5" />
              <span>GITHUB</span>
            </a>
            <a
              href={HERO_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-white/[0.02] text-xs font-mono text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300"
            >
              <Linkedin className="size-3.5" />
              <span>LINKEDIN</span>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-white/[0.02] text-xs font-mono text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300"
            >
              <Mail className="size-3.5" />
              <span>EMAIL</span>
            </a>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center pt-4"
          >
            <Button
              asChild
              className="relative group bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-zinc-50 dark:text-zinc-950 font-medium px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105"
            >
              <a href="#projects" className="flex items-center gap-2.5">
                <span>View My Work</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
export default Hero;
