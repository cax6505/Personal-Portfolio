"use client";

import React, { useState } from "react";
import { HardDrive, Cpu, Zap, Activity } from "lucide-react";
import { playClickSound, playPopSound } from "@/lib/sound-effects";

export function FsTopologyVisualizer() {
  const [ioMode, setIoMode] = useState<"cache" | "disk">("cache");
  const [opsCount, setOpsCount] = useState(12800);

  const handleSimulateIO = () => {
    playPopSound();
    setOpsCount((prev) => prev + Math.floor(Math.random() * 500) + 100);
  };

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-6 backdrop-blur-xl shadow-lg space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold px-2 py-0.5 rounded bg-amber-500/10">Interactive Kernel IO Simulator</span>
          <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">Tricore Async File System Cache & Disk Topology</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 font-mono text-xs font-bold border border-amber-500/20">
            <Activity className="size-3.5" />
            <span>{opsCount.toLocaleString()} Ops/sec</span>
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => {
                playClickSound();
                setIoMode("cache");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                ioMode === "cache"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              L1/L2 Memory Cache Hit (0.2ms)
            </button>
            <button
              onClick={() => {
                playClickSound();
                setIoMode("disk");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                ioMode === "disk"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              NVMe Disk Flush (14.2ms)
            </button>
          </div>

          <button
            onClick={handleSimulateIO}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-zinc-50 dark:text-zinc-900 text-xs font-mono font-bold hover:scale-105 transition-all"
          >
            + Trigger Async IO Payload
          </button>
        </div>

        {/* Visual Pipeline Box */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center font-mono">
            {/* Core CPU Ring */}
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <Cpu className="size-6 text-amber-500 mx-auto" />
              <p className="font-bold text-xs text-zinc-800 dark:text-zinc-200">Async Ring Buffer</p>
              <p className="text-[10px] text-zinc-400">Non-blocking submissions</p>
            </div>

            {/* Target Path */}
            <div className={`p-4 rounded-xl border space-y-2 transition-all ${
              ioMode === "cache"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
            }`}>
              <Zap className="size-6 mx-auto animate-pulse" />
              <p className="font-bold text-xs">{ioMode === "cache" ? "In-Memory LRU Cache" : "Zero-Copy Page Cache"}</p>
              <p className="text-[10px] opacity-80">{ioMode === "cache" ? "Zero Lock Contention" : "Direct DMA Kernel Path"}</p>
            </div>

            {/* Storage Node */}
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <HardDrive className="size-6 text-amber-500 mx-auto" />
              <p className="font-bold text-xs text-zinc-800 dark:text-zinc-200">Storage Storage Engine</p>
              <p className="text-[10px] text-zinc-400">Flush latency: {ioMode === "cache" ? "0.2ms" : "14.2ms"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FsTopologyVisualizer;
