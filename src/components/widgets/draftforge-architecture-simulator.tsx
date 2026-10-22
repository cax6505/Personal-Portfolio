"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Database,
  Radio,
  Users,
  ShieldCheck,
  RotateCcw,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Coins,
} from "lucide-react";
import { playClickSound, playPopSound } from "@/lib/sound-effects";

interface BidEvent {
  id: number;
  bidder: string;
  amountCr: number;
  status: "COMMITTED" | "LOCKED" | "REJECTED";
  reason: string;
  latencyMs: number;
  timestamp: string;
}

export function DraftForgeArchitectureSimulator() {
  const [playerPrice, setPlayerPrice] = useState(14.5);
  const [highestBidder, setHighestBidder] = useState("CSK");
  const [isRowLocked, setIsRowLocked] = useState(false);
  const [userPurse, setUserPurse] = useState(38.0); // in Cr
  const [eventLogs, setEventLogs] = useState<BidEvent[]>([
    {
      id: 1,
      bidder: "CSK",
      amountCr: 14.5,
      status: "COMMITTED",
      reason: "Row lock acquired ➔ RPC balance verified ➔ CDC broadcasted.",
      latencyMs: 128,
      timestamp: "12:04:12.102",
    },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [concurrencySummary, setConcurrencySummary] = useState<string | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addEvent = (event: BidEvent) => {
    setEventLogs((prev) => [event, ...prev.slice(0, 4)]);
  };

  const handlePlaceUserBid = () => {
    if (isSimulating) return;
    playPopSound();
    setIsRowLocked(true);
    setIsSimulating(true);

    const nextAmount = parseFloat((playerPrice + 0.5).toFixed(2));
    const now = new Date();
    const timeStr = `${now.toTimeString().split(" ")[0]}.${String(now.getMilliseconds()).padStart(3, "0")}`;

    setTimeout(() => {
      setPlayerPrice(nextAmount);
      setHighestBidder("RCB (You)");
      setUserPurse((prev) => parseFloat(Math.max(0, prev - 0.5).toFixed(2)));
      setIsRowLocked(false);
      setIsSimulating(false);

      addEvent({
        id: Date.now(),
        bidder: "RCB (You)",
        amountCr: nextAmount,
        status: "COMMITTED",
        reason: "PostgreSQL SELECT FOR UPDATE locked player row ➔ committed in 118ms.",
        latencyMs: 118,
        timestamp: timeStr,
      });
      setConcurrencySummary("✅ Transaction committed atomically. 0 race conditions.");
    }, 280);
  };

  // Simulate 3 concurrent bids firing at the exact same millisecond
  const handleSimulateRaceCondition = () => {
    if (isSimulating) return;
    playClickSound();
    setIsSimulating(true);
    setIsRowLocked(true);
    setConcurrencySummary("⚡ Simulating 3 simultaneous bids arriving at the same millisecond...");

    const base = playerPrice;
    const now = new Date();
    const timeStr = `${now.toTimeString().split(" ")[0]}.${String(now.getMilliseconds()).padStart(3, "0")}`;

    // Bidder 1 acquires lock first
    setTimeout(() => {
      const winnerBid = parseFloat((base + 0.5).toFixed(2));
      setPlayerPrice(winnerBid);
      setHighestBidder("MI");
      addEvent({
        id: Date.now() + 1,
        bidder: "MI (Thread 1)",
        amountCr: winnerBid,
        status: "COMMITTED",
        reason: "Lock acquired. Executed execute_bid() RPC atomically.",
        latencyMs: 95,
        timestamp: timeStr,
      });
    }, 150);

    // Bidder 2 attempts same price -> serial lock queues it -> rejected due to stale price
    setTimeout(() => {
      addEvent({
        id: Date.now() + 2,
        bidder: "CSK (Thread 2)",
        amountCr: parseFloat((base + 0.5).toFixed(2)),
        status: "REJECTED",
        reason: "Optimistic lock guard: Stale bid price detected. Rolled back cleanly.",
        latencyMs: 130,
        timestamp: timeStr,
      });
    }, 300);

    // Bidder 3 attempts same price -> rejected
    setTimeout(() => {
      addEvent({
        id: Date.now() + 3,
        bidder: "KKR (Thread 3)",
        amountCr: parseFloat((base + 0.5).toFixed(2)),
        status: "REJECTED",
        reason: "Row lock released after Thread 1 commit. Duplicate bid rejected.",
        latencyMs: 145,
        timestamp: timeStr,
      });

      setIsRowLocked(false);
      setIsSimulating(false);
      setConcurrencySummary("🔒 Concurrency Safe: 1 transaction committed, 2 queued stale attempts safely rejected with 0 purse corruption.");
    }, 450);
  };

  // Simulate purse overdraft violation
  const handleSimulatePurseViolation = () => {
    if (isSimulating) return;
    playClickSound();
    setIsSimulating(true);
    setIsRowLocked(true);

    const now = new Date();
    const timeStr = `${now.toTimeString().split(" ")[0]}.${String(now.getMilliseconds()).padStart(3, "0")}`;

    setTimeout(() => {
      setIsRowLocked(false);
      setIsSimulating(false);
      addEvent({
        id: Date.now(),
        bidder: "GT (Purse Overdraft)",
        amountCr: 45.0,
        status: "REJECTED",
        reason: "RPC constraint: EXCEEDS_PURSE_CAP (₹120 Cr ceiling violated).",
        latencyMs: 42,
        timestamp: timeStr,
      });
      setConcurrencySummary("🛡️ PostgreSQL RPC check blocked overdraft. State remained 100% intact.");
    }, 200);
  };

  const handleReset = () => {
    playClickSound();
    setPlayerPrice(14.5);
    setHighestBidder("CSK");
    setUserPurse(38.0);
    setIsRowLocked(false);
    setIsSimulating(false);
    setConcurrencySummary(null);
    setEventLogs([
      {
        id: Date.now(),
        bidder: "CSK",
        amountCr: 14.5,
        status: "COMMITTED",
        reason: "Draft initialized on Marquee Pool.",
        latencyMs: 120,
        timestamp: "00:00:00.000",
      },
    ]);
  };

  useEffect(() => {
    const timer = timeoutRef;
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-[#0c0c0e] p-6 md:p-8 backdrop-blur-2xl shadow-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/5 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              Distributed Concurrency Simulator
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sub-150ms CDC Sync
            </span>
          </div>
          <h3 className="font-display text-xl md:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mt-1.5">
            DraftForge High-Frequency Multi-Client Bidding Engine
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handlePlaceUserBid}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Play className="size-3.5 fill-current" />
            <span>Place Bid (+₹0.50 Cr)</span>
          </button>

          <button
            onClick={handleSimulateRaceCondition}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Users className="size-3.5" />
            <span>Simulate 3-Way Race Condition</span>
          </button>

          <button
            onClick={handleSimulatePurseViolation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer disabled:opacity-50"
          >
            <ShieldCheck className="size-3.5 text-rose-500" />
            <span>Purse Overdraft Test</span>
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

      {/* Real-time State & Live Player Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Marquee Player */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Marquee Lot #1</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 font-bold">Fast Bowler</span>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg text-zinc-900 dark:text-white">Jasprit Bumrah</h4>
            <p className="text-xs text-zinc-500">Base Price: ₹2.0 Cr</p>
          </div>
          <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono text-zinc-400">Current Highest</span>
              <p className="text-xl font-black text-emerald-500">₹{playerPrice} Cr</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-zinc-400">Leader</span>
              <p className="text-xs font-mono font-bold text-indigo-400">{highestBidder}</p>
            </div>
          </div>
        </div>

        {/* Database Lock & Concurrency Status */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold">PostgreSQL Engine</span>
            <Database className="size-4 text-sky-500" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">Row Lock Status:</span>
              <span
                className={`flex items-center gap-1 font-bold px-2 py-0.5 rounded ${
                  isRowLocked
                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse"
                    : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                }`}
              >
                <Lock className="size-3" />
                {isRowLocked ? "LOCKED (FOR UPDATE)" : "UNLOCKED (IDLE)"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">Isolation Level:</span>
              <span className="text-zinc-300 font-bold">Read Committed + Lock</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">Broadcast Channel:</span>
              <span className="text-sky-400 font-bold">room_mega_auction_01</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <Radio className="size-3 animate-pulse" />
            <span>Supabase WebSocket: Connected (134ms)</span>
          </div>
        </div>

        {/* User Franchise Purse */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold">Your Franchise Purse</span>
            <Coins className="size-4 text-amber-500" />
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-400">Available Cap (RCB)</span>
            <p className="text-2xl font-black text-amber-500">₹{userPurse} Cr</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">Out of ₹120.00 Cr initial purse</p>
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-400 font-mono">
            <span>Quota: 6/8 Overseas | 14/25 Players</span>
          </div>
        </div>
      </div>

      {/* Concurrency Diagnostic Banner */}
      {concurrencySummary && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 flex items-center gap-2"
        >
          <Clock className="size-4 shrink-0 text-indigo-400" />
          <span>{concurrencySummary}</span>
        </motion.div>
      )}

      {/* Real-Time Concurrency Execution Stream */}
      <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-3 font-mono text-xs text-zinc-300">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <span className="text-zinc-400 text-[10px] uppercase font-bold">
            PostgreSQL RPC & CDC Audit Ledger
          </span>
          <span className="text-[10px] text-zinc-500">Real-Time Serial Log</span>
        </div>

        <div className="space-y-2 min-h-[100px]">
          <AnimatePresence mode="popLayout">
            {eventLogs.map((ev) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]"
              >
                <div className="flex items-center gap-2.5">
                  {ev.status === "COMMITTED" ? (
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="size-4 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400">{ev.timestamp}</span>
                      <span className="font-bold text-zinc-100">{ev.bidder}</span>
                      <span className="text-amber-400 font-bold">₹{ev.amountCr} Cr</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          ev.status === "COMMITTED" ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                        }`}
                      >
                        {ev.status}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-[10px] mt-0.5">{ev.reason}</p>
                  </div>
                </div>
                <span className="text-zinc-500 font-mono text-[10px] shrink-0">{ev.latencyMs}ms roundtrip</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default DraftForgeArchitectureSimulator;
