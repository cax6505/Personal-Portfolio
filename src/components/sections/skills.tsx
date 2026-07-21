"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Code2, Cpu, Wrench, Database, Layers, BrainCircuit } from "lucide-react";
import { SKILLS_DATA } from "@/lib/portfolio-data";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="size-5" />,
  Layers: <Layers className="size-5" />,
  BrainCircuit: <BrainCircuit className="size-5" />,
  Cpu: <Cpu className="size-5" />,
  Database: <Database className="size-5" />,
  Wrench: <Wrench className="size-5" />,
};

const SPOTLIGHT_COLORS: Record<string, string> = {
  Languages: "rgba(244, 63, 94, 0.15)", // rose
  "Frameworks & UI": "rgba(14, 165, 233, 0.15)", // sky
  "ML & Deep Learning": "rgba(139, 92, 246, 0.15)", // violet
  "ML Engineering": "rgba(245, 158, 11, 0.15)", // amber
  "Databases & ORMs": "rgba(99, 102, 241, 0.15)", // indigo
  "Developer Tools": "rgba(244, 63, 94, 0.15)", // rose
};

export function Skills() {
  const skillGroups = SKILLS_DATA.map((group) => {
    const defaultIconColor = "text-violet-500 bg-violet-500/10";
    const iconColors: Record<string, string> = {
      Languages: "text-rose-500 bg-rose-500/10",
      "Frameworks & UI": "text-sky-500 bg-sky-500/10",
      "ML & Deep Learning": "text-violet-500 bg-violet-500/10",
      "ML Engineering": "text-amber-500 bg-amber-500/10",
      "Databases & ORMs": "text-indigo-500 bg-indigo-500/10",
      "Developer Tools": "text-rose-500 bg-rose-500/10",
    };
    return {
      ...group,
      icon: ICON_MAP[group.iconName] || <Code2 className="size-5" />,
      iconColorClass: iconColors[group.category] || defaultIconColor,
      spotlightColor: SPOTLIGHT_COLORS[group.category] || "rgba(139, 92, 246, 0.15)",
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 md:py-28 bg-transparent">
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
            Technical Skillset
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-zinc-300 dark:bg-zinc-700 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Skill Groups Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.category} variants={itemVariants}>
             <SpotlightCard
                spotlightColor={group.spotlightColor}
                className="group h-full"
              >
                
                {/* Visual Top spec Line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-400/15 dark:via-violet-500/20 to-indigo-500/0 group-hover:via-violet-500/40 transition-all duration-500" />

                <CardContent className="p-6 md:p-8 space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl border border-zinc-200 dark:border-white/5 ${group.iconColorClass}`}>
                      {group.icon}
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skills Tag capsules */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 font-medium hover:border-zinc-300 dark:hover:border-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
export default Skills;
