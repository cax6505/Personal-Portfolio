"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-zinc-50/20 dark:bg-zinc-950/10">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors hover-trigger font-medium group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* MDX Case Study Page Content Container */}
        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-zinc dark:prose-invert max-w-none bg-white dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/40 rounded-2xl p-6 md:p-10 shadow-sm"
        >
          {children}
        </motion.article>
      </div>
    </div>
  );
}
