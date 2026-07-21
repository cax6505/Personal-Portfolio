"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Database, Radio, Laptop } from "lucide-react";

interface Step {
  title: string;
  desc: string;
  sender: "bidderA" | "db" | "supabase" | "bidderB";
  receiver: "bidderA" | "db" | "supabase" | "bidderB" | null;
  action: string;
}

export function RealtimeBidSequence() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps: Step[] = [
    {
      title: "1. Place Bid (RPC)",
      desc: "Bidder A submits a bid. It triggers a secure PostgreSQL transaction function (RPC) to prevent client-side bypass.",
      sender: "bidderA",
      receiver: "db",
      action: "place_bid()",
    },
    {
      title: "2. Lock & Validate",
      desc: "Postgres locks the player row (FOR UPDATE), checks purse limit (₹100 Cr), verifies base increments, and roster limits.",
      sender: "db",
      receiver: null,
      action: "Validate & Commit Roster",
    },
    {
      title: "3. CDC Notification",
      desc: "On commit, Postgres Change Data Capture (CDC) detects the row change and relays a notification payload to Supabase Realtime.",
      sender: "db",
      receiver: "supabase",
      action: "CDC payload",
    },
    {
      title: "4. WebSocket Broadcast",
      desc: "Supabase immediately broadcasts the update payload to Bidder B (and all other connected clients) via secure WebSockets.",
      sender: "supabase",
      receiver: "bidderB",
      action: "Lobby sync",
    },
    {
      title: "5. Real-Time UI Sync",
      desc: "Bidder B's local state updates to show the new highest bidder. The entire sequence completes in under 140ms.",
      sender: "bidderB",
      receiver: null,
      action: "Sync < 140ms",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const nodes = {
    bidderA: { label: "Bidder A", icon: <User className="size-5" /> },
    db: { label: "PostgreSQL DB", icon: <Database className="size-5" /> },
    supabase: { label: "Supabase CDC", icon: <Radio className="size-5" /> },
    bidderB: { label: "Bidder B", icon: <Laptop className="size-5" /> },
  };

  const getParticlePath = (sender: string) => {
    if (sender === "bidderA") return { start: "12.5%", end: "37.5%" };
    if (sender === "db") return { start: "37.5%", end: "62.5%" };
    if (sender === "supabase") return { start: "62.5%", end: "87.5%" };
    return { start: "0%", end: "0%" };
  };

  return (
    <div className="my-8 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-150/30 dark:bg-zinc-950/40 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-xs font-mono tracking-wider uppercase font-semibold text-zinc-500 dark:text-zinc-400">
            Interactive Architecture
          </h4>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-1">
            Real-Time Synchronization Flow
          </h3>
        </div>
      </div>

      {/* Visual Sequence Grid (Circles Row) */}
      <div className="relative py-6 flex justify-between items-center px-[4%] md:px-[6%]">
        
        {/* Connection line track behind circles */}
        <div className="absolute left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2 h-0.5 bg-zinc-200 dark:bg-zinc-800 z-0" />

        {/* Active Particle flow animations */}
        <AnimatePresence>
          {steps[activeStep].receiver && (
            <motion.div
              key={activeStep}
              className="absolute h-1 w-16 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full z-0 pointer-events-none shadow-[0_0_8px_rgba(139,92,246,0.8)]"
              style={{
                top: "50%",
                translateY: "-50%",
                left: getParticlePath(steps[activeStep].sender).start,
              }}
              animate={{
                left: getParticlePath(steps[activeStep].sender).end,
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1.1, 1.1, 0.8],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* Nodes (Circles only) */}
        {Object.entries(nodes).map(([key, val]) => {
          const isSender = steps[activeStep].sender === key;
          const isReceiver = steps[activeStep].receiver === key;
          const isActiveNode = isSender || isReceiver;

          return (
            <div key={key} className="flex flex-col items-center relative z-10 w-[25%]">
              <motion.div
                animate={{
                  scale: isActiveNode ? 1.15 : 1,
                  borderColor: isSender
                    ? "rgba(139, 92, 246, 0.5)"
                    : isReceiver
                    ? "rgba(99, 102, 241, 0.5)"
                    : "rgba(120,120,120,0.1)",
                }}
                className={`size-12 md:size-14 rounded-2xl border flex items-center justify-center bg-white dark:bg-zinc-950 shadow-md transition-colors relative z-10 ${
                  isActiveNode
                    ? "text-violet-500 dark:text-violet-400"
                    : "text-zinc-400 dark:text-zinc-650"
                }`}
              >
                {val.icon}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Label Text Row */}
      <div className="flex justify-between items-start px-[4%] md:px-[6%] pb-6 border-b border-zinc-200/50 dark:border-zinc-800/40 text-center">
        {Object.entries(nodes).map(([key, val]) => {
          const isSender = steps[activeStep].sender === key;
          const isReceiver = steps[activeStep].receiver === key;
          const isActiveNode = isSender || isReceiver;

          return (
            <div key={key} className="w-[25%] px-1">
              <span className={`text-[10px] md:text-xs font-semibold block transition-colors ${
                isActiveNode ? "text-zinc-800 dark:text-zinc-200 font-bold" : "text-zinc-450 dark:text-zinc-650"
              }`}>
                {val.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Card */}
      <div className="mt-6 min-h-[90px]">
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
                {steps[activeStep].title}
              </span>
              {steps[activeStep].action && (
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                  {steps[activeStep].action}
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-305 leading-relaxed font-normal">
              {steps[activeStep].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timeline steps dot bar */}
      <div className="flex gap-2 justify-center mt-6">
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
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

export default RealtimeBidSequence;
