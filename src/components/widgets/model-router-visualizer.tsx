"use client";

import React, { useState } from "react";
import { Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { playPopSound } from "@/lib/sound-effects";

interface PromptScenario {
  id: string;
  prompt: string;
  category: string;
  tokens: number;
  selectedModel: string;
  reasoning: string;
  latencyMs: number;
  cost: string;
}

export function ModelRouterVisualizer() {
  const scenarios: PromptScenario[] = [
    {
      id: "code",
      prompt: "Write a C++ lock-free concurrent queue using std::atomic and memory barriers.",
      category: "Complex Systems Code",
      tokens: 180,
      selectedModel: "Claude 3.5 Sonnet",
      reasoning: "Highest benchmark score in C++ low-level concurrency & memory safety.",
      latencyMs: 190,
      cost: "$0.00054",
    },
    {
      id: "math",
      prompt: "Prove the convergence rate of stochastic gradient descent under L-smoothness.",
      category: "Advanced Mathematics",
      tokens: 240,
      selectedModel: "GPT-4o",
      reasoning: "Superior mathematical proof verification & multi-step reasoning capabilities.",
      latencyMs: 220,
      cost: "$0.00072",
    },
    {
      id: "summary",
      prompt: "Summarize this 5-page API architecture document into 3 executive takeaways.",
      category: "Summarization & Extraction",
      tokens: 420,
      selectedModel: "Llama-3.3-70B-Instruct",
      reasoning: "Cost-optimized open weights model delivering sub-100ms response.",
      latencyMs: 85,
      cost: "$0.00012",
    },
  ];

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const active = scenarios[activeScenarioIdx];

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-6 backdrop-blur-xl shadow-lg space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-sky-500 font-bold px-2 py-0.5 rounded bg-sky-500/10">Interactive Architecture Visualizer</span>
          <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">ModelRoute Intelligent LLM Dispatch Pipeline</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-mono font-bold text-sky-500 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
            <Zap className="size-3.5" />
            <span>Avg Latency Saved: -42%</span>
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-mono text-zinc-500 font-semibold uppercase">Select Sample Input Prompt</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                playPopSound();
                setActiveScenarioIdx(idx);
              }}
              className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                idx === activeScenarioIdx
                  ? "border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-300 font-bold shadow-sm"
                  : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <p className="font-bold">{sc.category}</p>
              <p className="text-[10px] text-zinc-400 truncate mt-1">{`"${sc.prompt}"`}</p>
            </button>
          ))}
        </div>

        {/* Dynamic Dispatch Route Node Visualization */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 space-y-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            {/* Input Prompt Box */}
            <div className="flex-1 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Input Context ({active.tokens} tokens)</span>
              <p className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200">{`"${active.prompt}"`}</p>
            </div>

            <ArrowRight className="size-5 text-sky-500 hidden md:block shrink-0" />

            {/* Selected Target Model */}
            <div className="w-full md:w-auto p-3 rounded-xl bg-sky-500 text-white space-y-1 shrink-0">
              <span className="text-[9px] uppercase font-mono tracking-wider font-bold opacity-80">Optimal Dispatch Target</span>
              <p className="font-display text-sm font-bold flex items-center gap-1.5">
                <CheckCircle2 className="size-4" />
                <span>{active.selectedModel}</span>
              </p>
            </div>
          </div>

          {/* Reasoning & Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-400 text-[10px] uppercase block">Routing Decision Logic</span>
              <span className="text-zinc-700 dark:text-zinc-300 text-[11px] font-medium">{active.reasoning}</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
              <span className="text-zinc-400 text-[10px] uppercase">Estimated Latency</span>
              <span className="text-emerald-500 font-bold text-base">{active.latencyMs} ms</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
              <span className="text-zinc-400 text-[10px] uppercase">Calculated Cost</span>
              <span className="text-sky-500 font-bold text-base">{active.cost}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModelRouterVisualizer;
