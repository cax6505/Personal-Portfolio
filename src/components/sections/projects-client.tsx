"use client";

import React from "react";
import { motion } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Github, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { RepoStats } from "@/lib/github";
import { PROJECTS_DATA } from "@/lib/portfolio-data";

const SPOTLIGHT_COLORS: Record<string, string> = {
  "ipl-auction-pro": "rgba(99, 102, 241, 0.15)", // indigo
  "predictive-sales-analytics": "rgba(16, 185, 129, 0.15)", // emerald
  "tricore-fs": "rgba(245, 158, 11, 0.15)", // amber
};

interface ProjectsClientProps {
  initialStats: Record<string, RepoStats>;
}

export function ProjectsClient({ initialStats }: ProjectsClientProps) {
  const projects = PROJECTS_DATA;

  return (
    <section id="projects" className="py-28 bg-transparent">
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
            className="font-display text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-100 dark:to-zinc-600 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-zinc-400 dark:bg-zinc-700 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const stats = initialStats[project.slug] || {
              stars: 0,
              forks: 0,
              language: project.tech[0] || "TypeScript",
              url: project.githubUrl,
            };

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
              <SpotlightCard
                spotlightColor={SPOTLIGHT_COLORS[project.slug]}
                className="group h-full"
              >

                  <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      {/* Top Header with language tag */}
                      <div className="flex items-center">
                        <span className="text-[10px] font-mono tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/5">
                          {stats.language}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button
                        asChild
                        size="sm"
                        className="rounded-xl text-xs bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-zinc-50 dark:text-zinc-950 font-medium px-4 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-all duration-300"
                      >
                        <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5">
                          <BookOpen className="size-3.5" />
                          <span>Case Study</span>
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-xl text-xs border border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/[0.04] text-zinc-600 dark:text-zinc-300 font-medium px-4 py-2.5 transition-all duration-300"
                      >
                        <a
                          href={stats.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5"
                        >
                          <Github className="size-3.5" />
                          <span>Repository</span>
                          <ExternalLink className="size-2.5" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
              </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
export default ProjectsClient;
