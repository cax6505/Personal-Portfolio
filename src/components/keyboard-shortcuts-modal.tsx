"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const shortcuts = [
    { key: "j / k", label: "Vim Scroll Down / Up" },
    { key: "1 - 6", label: "Jump to Hero, About, Experience, Projects, Skills, Contact" },
    { key: "⌘ K", label: "Open Command Palette" },
    { key: "T", label: "Open Zsh Terminal Shell" },
    { key: "?", label: "Toggle Shortcuts Cheatsheet" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-6 backdrop-blur-2xl shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-display font-bold text-base">
                <Command className="size-4 text-violet-500" />
                <span>Keyboard Navigation</span>
              </div>
              <button
                onClick={onClose}
                className="size-7 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map((sc) => (
                <div key={sc.key} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400 font-medium">{sc.label}</span>
                  <kbd className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono font-bold text-zinc-800 dark:text-zinc-200 text-[10px]">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-zinc-400 font-mono">Press <kbd className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[9px]">Esc</kbd> or <kbd className="px-1 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[9px]">?</kbd> to dismiss</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default KeyboardShortcutsModal;
