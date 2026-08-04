"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { CodeCopier } from "@/components/ui/code-copier";
import { TerminalModal } from "@/components/terminal/terminal-modal";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPct((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen py-16 md:py-24 bg-zinc-50/20 dark:bg-zinc-950/10">
      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-emerald-400 z-50 transition-all duration-150"
        style={{ width: `${scrollPct}%` }}
      />

      <CodeCopier />
      <KeyboardShortcuts />
      <TerminalModal />

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
            className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors hover-trigger font-medium group"
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
