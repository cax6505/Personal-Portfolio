"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Calendar, Cpu, BarChart3, LineChart, ChevronRight } from "lucide-react";

interface PipelineStep {
  title: string;
  phase: string;
  desc: string;
  details: string[];
  icon: React.ReactNode;
}

export function SalesPipelineFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps: PipelineStep[] = [
    {
      title: "1. Data Collection",
      phase: "RAW SALES DATA",
      desc: "Ingests raw transactional data including order items, freight costs, shipment logs, and customer reviews.",
      details: ["Freight Costs & Order Values", "Review Text Comments", "Customer Order History"],
      icon: <Database className="size-5" />,
    },
    {
      title: "2. Temporal Splitting",
      phase: "STRICT TEMPORAL SPLIT",
      desc: "Partitions training data by date thresholds (Pre-2024 vs Post-2024) instead of random splits to prevent data leakage.",
      details: ["No Future Data Leakage", "Simulates True Production", "Validates Model Degradation"],
      icon: <Calendar className="size-5" />,
    },
    {
      title: "3. Feature Engineering",
      phase: "TF-IDF & RATIO CALCULATION",
      desc: "Computes delivery delay indices, calculates freight ratios, and performs TF-IDF vectorization on review comments.",
      details: ["Freight Ratio: Shipping / Total", "Shipment Delay Days Tracker", "NLP Sentiment Vectors"],
      icon: <Cpu className="size-5" />,
    },
    {
      title: "4. Pipeline Training",
      phase: "COST-SENSITIVE TRAINING",
      desc: "Feeds structured features into a scikit-learn pipeline. Resolves 97:3 class imbalance using Random Forest class weights.",
      details: ["balanced Class Weights", "Random Forest Classifier", "Pipeline Standardization"],
      icon: <BarChart3 className="size-5" />,
    },
    {
      title: "5. Threshold & Tuning",
      phase: "EVALUATION & PR-AUC OPTIMIZATION",
      desc: "Optimizes classification boundaries using Precision-Recall curves. Achieves a 1.57x lift over targeting baselines.",
      details: ["PR-AUC Imbalance Focus", "F1 Score Decision Boundary", "Top-10% Customer Capture"],
      icon: <LineChart className="size-5" />,
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <div className="my-8 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-150/30 dark:bg-zinc-950/40 backdrop-blur-md">
      <div className="mb-6">
        <h4 className="text-xs font-mono tracking-wider uppercase font-semibold text-zinc-500 dark:text-zinc-400">
          MLOps Architecture
        </h4>
        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-1">
          Predictive Pipeline Flow
        </h3>
      </div>

      {/* Horizontal Steps Navigator */}
      <div className="relative flex justify-between items-center py-6 px-[4%] md:px-[6%]">
        {/* Track Line behind items */}
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-0.5 bg-zinc-200 dark:bg-zinc-800 z-0" />

        {/* Dynamic moving particle flow */}
        <AnimatePresence>
          {isPlaying && activeStep < steps.length - 1 && (
            <motion.div
              key={activeStep}
              className="absolute h-1 w-12 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full z-0 pointer-events-none shadow-[0_0_8px_rgba(139,92,246,0.8)]"
              style={{
                top: "50%",
                translateY: "-50%",
                left: `${10 + (activeStep * 20)}%`,
              }}
              animate={{
                left: `${10 + ((activeStep + 1) * 20)}%`,
                opacity: [0, 1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div key={idx} className="relative z-10 w-[20%] flex flex-col items-center">
              <motion.button
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  borderColor: isActive
                    ? "rgba(139, 92, 246, 0.5)"
                    : "rgba(120,120,120,0.1)",
                }}
                className={`size-12 md:size-14 rounded-2xl border flex items-center justify-center bg-white dark:bg-zinc-950 shadow-md transition-colors relative z-10 cursor-pointer ${
                  isActive
                    ? "text-violet-500 dark:text-violet-400"
                    : "text-zinc-400 dark:text-zinc-650"
                }`}
                aria-label={`Go to pipeline step ${idx + 1}`}
              >
                {step.icon}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Node Text labels */}
      <div className="flex justify-between items-start px-[4%] md:px-[6%] pb-6 border-b border-zinc-200/50 dark:border-zinc-800/40 text-center">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div key={idx} className="w-[20%] px-1">
              <span className={`text-[9px] md:text-xs font-semibold block transition-colors leading-tight ${
                isActive ? "text-zinc-800 dark:text-zinc-200 font-bold" : "text-zinc-450 dark:text-zinc-650"
              }`}>
                {step.title.split(". ")[1]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Detail Block */}
      <div className="mt-6 min-h-[140px] grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Dynamic Detail Card */}
        <div className="md:col-span-2 space-y-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-500 bg-violet-500/10 px-2.5 py-0.5 rounded-full border border-violet-500/10">
                  {steps[activeStep].phase}
                </span>
              </div>
              <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {steps[activeStep].title}
              </h4>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                {steps[activeStep].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic Features List */}
        <div className="p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-950/20">
          <h5 className="text-[10px] font-mono tracking-wider uppercase font-semibold text-zinc-400 dark:text-zinc-500 mb-2">
            Key Operations
          </h5>
          <AnimatePresence mode="wait">
            <motion.ul
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1.5"
            >
              {steps[activeStep].details.map((detail, idx) => (
                <li key={idx} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 font-normal">
                  <ChevronRight className="size-3 text-violet-500 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-2 justify-center mt-6">
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveStep(idx);
              setIsPlaying(false);
            }}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeStep === idx ? "w-6 bg-violet-500" : "w-2 bg-zinc-300 dark:bg-zinc-800"
            }`}
            aria-label={`Go to step ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default SalesPipelineFlow;
