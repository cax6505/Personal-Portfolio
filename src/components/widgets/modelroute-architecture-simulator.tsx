"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Shield,
  Server,
  Activity,
  ArrowRight,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Flame,
  Radio,
} from "lucide-react";
import { playClickSound, playPopSound } from "@/lib/sound-effects";

interface RoutePacket {
  id: number;
  type: "code" | "math" | "fast" | "heavy";
  status: "routing" | "rate_limited" | "fallback" | "success";
  targetProvider: string;
  latencyMs: number;
  timestamp: string;
}

export function ModelRouteArchitectureSimulator() {
  const [activeMode, setActiveMode] = useState<"normal" | "burst" | "outage">("normal");
  const [circuitBreakerState, setCircuitBreakerState] = useState<"closed" | "open" | "half-open">("closed");
  const [primaryHealthy, setPrimaryHealthy] = useState(true);
  const [rpmCount, setRpmCount] = useState(142);
  const [packetsProcessed, setPacketsProcessed] = useState(4820);
  const [activePackets, setActivePackets] = useState<RoutePacket[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "🚀 ModelRoute Core Engine initialized on Edge V8 runtime.",
    "🛡️ Upstash Redis Sliding-Window rate limiter connected.",
    "⚡ Regex intent classifier compiled (8 categories, avg latency 0.38ms).",
    "🟢 Circuit Breaker healthy: State = CLOSED.",
  ]);
  const [selectedPromptType, setSelectedPromptType] = useState<"code" | "math" | "fast">("code");
  const [isSimulating, setIsSimulating] = useState(false);

  const burstIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const promptConfigs = {
    code: {
      label: "Code & Concurrency",
      prompt: "Write a lock-free ring buffer in C++ with memory barriers",
      primary: "Claude 3.5 Sonnet",
      fallback: "Groq Llama-3.3 70B",
      intentTime: "0.34ms",
      costPer1k: "$0.003",
    },
    math: {
      label: "Mathematical Proof",
      prompt: "Prove Lipschitz continuity of cross-entropy gradient",
      primary: "Gemini 2.5 Pro",
      fallback: "GPT-4o Mini",
      intentTime: "0.29ms",
      costPer1k: "$0.002",
    },
    fast: {
      label: "Low-Latency Search",
      prompt: "Extract entity tuples from 500 API log records",
      primary: "Groq Llama-3.3 70B",
      fallback: "Gemini 2.5 Flash",
      intentTime: "0.22ms",
      costPer1k: "$0.0005",
    },
  };

  const addLog = (log: string) => {
    setConsoleLogs((prev) => [log, ...prev.slice(0, 5)]);
  };

  const triggerSinglePacket = (type = selectedPromptType, forceOutage = !primaryHealthy) => {
    playPopSound();
    const config = promptConfigs[type];
    const target = forceOutage ? config.fallback : config.primary;
    const latency = forceOutage ? 65 : type === "fast" ? 38 : 110;

    const newPacket: RoutePacket = {
      id: Date.now() + Math.random(),
      type,
      status: forceOutage ? "fallback" : "success",
      targetProvider: target,
      latencyMs: latency,
      timestamp: new Date().toLocaleTimeString(),
    };

    setActivePackets((prev) => [newPacket, ...prev.slice(0, 3)]);
    setPacketsProcessed((prev) => prev + 1);

    if (forceOutage) {
      addLog(`⚠️ [CircuitBreaker] Primary provider 503 error. Auto-failed over to ${target} in ${latency}ms.`);
    } else {
      addLog(`⚡ [Dispatcher] Regex Intent classified in ${config.intentTime} ➔ Dispatched to ${target} (${latency}ms).`);
    }
  };

  const handleBurstTraffic = () => {
    playClickSound();
    setActiveMode("burst");
    setIsSimulating(true);
    setRpmCount(880);

    if (burstIntervalRef.current) clearInterval(burstIntervalRef.current);

    let count = 0;
    burstIntervalRef.current = setInterval(() => {
      count++;
      const types: ("code" | "math" | "fast")[] = ["code", "math", "fast"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      triggerSinglePacket(randomType, false);

      if (count > 6) {
        if (burstIntervalRef.current) clearInterval(burstIntervalRef.current);
        setIsSimulating(false);
        setRpmCount(210);
        addLog("🛡️ [RateLimiter] Burst stabilized. Sliding-window quota refreshed safely.");
      }
    }, 400);
  };

  const handleToggleOutage = () => {
    playClickSound();
    const nextOutage = primaryHealthy;
    setPrimaryHealthy(!nextOutage);

    if (nextOutage) {
      setActiveMode("outage");
      setCircuitBreakerState("open");
      addLog("🚨 [Simulated Outage] Injected 100% latency failure into Primary Provider tier.");
      triggerSinglePacket(selectedPromptType, true);
    } else {
      setActiveMode("normal");
      setCircuitBreakerState("closed");
      addLog("🟢 [Recovery] Health checks passed (3/3). Circuit breaker reset to CLOSED.");
    }
  };

  const handleReset = () => {
    playClickSound();
    if (burstIntervalRef.current) clearInterval(burstIntervalRef.current);
    setActiveMode("normal");
    setPrimaryHealthy(true);
    setCircuitBreakerState("closed");
    setRpmCount(142);
    setIsSimulating(false);
    setActivePackets([]);
    setConsoleLogs([
      "🚀 ModelRoute Core Engine reset.",
      "🟢 Circuit Breaker healthy: State = CLOSED.",
    ]);
  };

  useEffect(() => {
    return () => {
      if (burstIntervalRef.current) clearInterval(burstIntervalRef.current);
    };
  }, []);

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-[#0c0c0e] p-6 md:p-8 backdrop-blur-2xl shadow-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-500 font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
              Live Architecture Simulator
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              99.99% Reported Availability
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mt-1.5">
            ModelRoute Gateway & Resilient Dispatch Pipeline
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setActiveMode("normal");
              triggerSinglePacket();
            }}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-white shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Play className="size-3.5 fill-current" />
            <span>Send Request</span>
          </button>

          <button
            onClick={handleBurstTraffic}
            disabled={isSimulating}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              activeMode === "burst"
                ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                : "border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            <Flame className="size-3.5 text-amber-500" />
            <span>Simulate Burst (800 RPM)</span>
          </button>

          <button
            onClick={handleToggleOutage}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              !primaryHealthy
                ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse"
                : "border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300"
            }`}
          >
            <AlertTriangle className="size-3.5 text-rose-500" />
            <span>{primaryHealthy ? "Inject Provider Outage" : "Recover Provider"}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 transition-colors"
            title="Reset Simulator"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      </div>

      {/* Selectable Prompt Category */}
      <div className="space-y-2">
        <p className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
          1. Select Client Request Type
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["code", "math", "fast"] as const).map((key) => {
            const item = promptConfigs[key];
            const isSelected = selectedPromptType === key;
            return (
              <button
                key={key}
                onClick={() => {
                  playPopSound();
                  setSelectedPromptType(key);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-300 shadow-sm font-semibold"
                    : "border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{item.label}</span>
                  <span className="text-[10px] font-mono text-zinc-400">{item.intentTime}</span>
                </div>
                <p className="text-[11px] text-zinc-500 truncate mt-1">{item.prompt}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Dynamic Architecture Flow Map */}
      <div className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-white/70 dark:bg-black/40 p-5 md:p-6 space-y-6">
        <p className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider">
          2. Live Execution Flow & State Machine
        </p>

        {/* 4 Node Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Node 1: Client & Ingestion */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-white/[0.03] space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono uppercase font-bold">Node 01</span>
              <Activity className="size-4 text-sky-500" />
            </div>
            <h4 className="font-display font-bold text-sm text-zinc-800 dark:text-zinc-200">Edge Gateway</h4>
            <p className="text-[11px] text-zinc-500">Next.js 15 Edge Router</p>
            <div className="pt-2 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-400">Throughput:</span>
              <span className="text-sky-500 font-bold">{rpmCount} RPM</span>
            </div>
          </div>

          {/* Node 2: Sliding Window Rate Limiter */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-white/[0.03] space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono uppercase font-bold">Node 02</span>
              <Shield className="size-4 text-emerald-500" />
            </div>
            <h4 className="font-display font-bold text-sm text-zinc-800 dark:text-zinc-200">Upstash Redis</h4>
            <p className="text-[11px] text-zinc-500">Sliding Window Token Bucket</p>
            <div className="pt-2 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-400">Quota Limit:</span>
              <span className="text-emerald-500 font-bold">1,000 RPM Max</span>
            </div>
          </div>

          {/* Node 3: Intent Classifier */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-white/[0.03] space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono uppercase font-bold">Node 03</span>
              <Zap className="size-4 text-violet-500" />
            </div>
            <h4 className="font-display font-bold text-sm text-zinc-800 dark:text-zinc-200">Regex Intent Router</h4>
            <p className="text-[11px] text-zinc-500">&lt;0.4ms Trie classification</p>
            <div className="pt-2 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-400">Cost Saved:</span>
              <span className="text-violet-400 font-bold">-42% Avg</span>
            </div>
          </div>

          {/* Node 4: Circuit Breaker & Provider Dispatch */}
          <div
            className={`p-4 rounded-xl border space-y-2 relative overflow-hidden transition-all ${
              circuitBreakerState === "open"
                ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
                : "border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[10px] font-mono uppercase font-bold">Node 04</span>
              <Server className={`size-4 ${circuitBreakerState === "open" ? "text-rose-500" : "text-emerald-500"}`} />
            </div>
            <h4 className="font-display font-bold text-sm text-zinc-800 dark:text-zinc-200">Circuit Breaker</h4>
            <p className="text-[11px] text-zinc-500">
              {circuitBreakerState === "open" ? "State: OPEN (Fallback Active)" : "State: CLOSED (Primary Active)"}
            </p>
            <div className="pt-2 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-400">Target:</span>
              <span className="text-sky-500 font-bold truncate">
                {primaryHealthy ? promptConfigs[selectedPromptType].primary : promptConfigs[selectedPromptType].fallback}
              </span>
            </div>
          </div>
        </div>

        {/* Live Packet Flight Visualizer */}
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-400 text-[10px] uppercase font-bold flex items-center gap-1.5">
              <Radio className="size-3 text-sky-400 animate-pulse" />
              Live Packet Routing Feed ({packetsProcessed} requests served)
            </span>
            <span className="text-[10px] text-zinc-500">Sub-100ms TTFT</span>
          </div>

          <div className="space-y-1.5 min-h-[70px]">
            <AnimatePresence mode="popLayout">
              {activePackets.length === 0 ? (
                <p className="text-zinc-600 text-xs py-2">Click &quot;Send Request&quot; or &quot;Simulate Burst&quot; to inspect packet telemetry.</p>
              ) : (
                activePackets.map((pkt) => (
                  <motion.div
                    key={pkt.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between py-1 px-2 rounded bg-white/[0.04] text-[11px]"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`size-3.5 ${pkt.status === "fallback" ? "text-amber-400" : "text-emerald-400"}`} />
                      <span className="text-zinc-400">{pkt.timestamp}</span>
                      <span className="text-zinc-200 font-semibold uppercase">[{pkt.type}]</span>
                      <ArrowRight className="size-3 text-zinc-500" />
                      <span className="text-sky-400 font-bold">{pkt.targetProvider}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">{pkt.latencyMs}ms</span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Real-Time Terminal Console Feed */}
        <div className="rounded-xl bg-zinc-950 p-3.5 font-mono text-[11px] text-zinc-300 space-y-1 border border-zinc-800">
          <p className="text-zinc-500 text-[10px] uppercase font-bold pb-1 border-b border-zinc-800">
            Engine Diagnostic Log Stream
          </p>
          {consoleLogs.map((log, i) => (
            <p key={i} className="truncate text-zinc-300">
              <span className="text-zinc-600 select-none">&gt; </span>
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModelRouteArchitectureSimulator;
