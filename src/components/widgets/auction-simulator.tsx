"use client";

import React, { useState } from "react";
import { Play, RotateCcw, DollarSign } from "lucide-react";
import { playClickSound, playPopSound } from "@/lib/sound-effects";

interface Player {
  name: string;
  role: string;
  basePrice: number;
  currentBid: number;
  highestBidder: string;
}

export function AuctionSimulator() {
  const [players, setPlayers] = useState<Player[]>([
    { name: "Virat Kohli", role: "Batsman", basePrice: 2.0, currentBid: 2.0, highestBidder: "RCB" },
    { name: "Jasprit Bumrah", role: "Bowler", basePrice: 2.0, currentBid: 2.0, highestBidder: "MI" },
    { name: "Rashid Khan", role: "All-Rounder", basePrice: 1.5, currentBid: 1.5, highestBidder: "GT" },
    { name: "Heinrich Klaasen", role: "Wicketkeeper", basePrice: 1.5, currentBid: 1.5, highestBidder: "SRH" },
  ]);

  const [purseLeft, setPurseLeft] = useState<number>(45.0); // in Crores
  const [selectedPlayerIdx, setSelectedPlayerIdx] = useState<number>(0);
  const [biddingLog, setBiddingLog] = useState<string[]>(["Auction initialized. 4 Marquee players available."]);

  const activePlayer = players[selectedPlayerIdx];

  const handlePlaceBid = () => {
    playPopSound();
    const increment = 0.25;
    const newBid = parseFloat((activePlayer.currentBid + increment).toFixed(2));
    const teams = ["CSK", "MI", "RCB", "KKR", "SRH", "GT"];
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];

    setPlayers((prev) =>
      prev.map((p, idx) =>
        idx === selectedPlayerIdx
          ? { ...p, currentBid: newBid, highestBidder: randomTeam }
          : p
      )
    );

    setPurseLeft((prev) => parseFloat(Math.max(0, prev - increment).toFixed(2)));
    setBiddingLog((prev) => [
      `⚡ ${randomTeam} raised bid for ${activePlayer.name} to ₹${newBid} Cr`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleReset = () => {
    playClickSound();
    setPurseLeft(45.0);
    setPlayers([
      { name: "Virat Kohli", role: "Batsman", basePrice: 2.0, currentBid: 2.0, highestBidder: "RCB" },
      { name: "Jasprit Bumrah", role: "Bowler", basePrice: 2.0, currentBid: 2.0, highestBidder: "MI" },
      { name: "Rashid Khan", role: "All-Rounder", basePrice: 1.5, currentBid: 1.5, highestBidder: "GT" },
      { name: "Heinrich Klaasen", role: "Wicketkeeper", basePrice: 1.5, currentBid: 1.5, highestBidder: "SRH" },
    ]);
    setBiddingLog(["Auction reset. Ready for dynamic bidding."]);
  };

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-6 backdrop-blur-xl shadow-lg space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 font-bold px-2 py-0.5 rounded bg-indigo-500/10">Interactive Sandbox</span>
          <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">IPL Auction Real-Time Engine Demo</h4>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
            <DollarSign className="size-3.5" />
            <span>Purse: ₹{purseLeft} Cr</span>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors"
            title="Reset Auction"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Player Card */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Marquee Lot #{selectedPlayerIdx + 1}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">
              {activePlayer.role}
            </span>
          </div>

          <div>
            <h5 className="font-display text-xl font-bold text-zinc-900 dark:text-white">{activePlayer.name}</h5>
            <p className="text-xs text-zinc-500">Base Price: ₹{activePlayer.basePrice} Cr</p>
          </div>

          <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-mono text-zinc-400">Highest Bid</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₹{activePlayer.currentBid} Cr</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-mono text-zinc-400">Current Bidder</p>
              <span className="px-2.5 py-1 rounded bg-indigo-500 text-white font-mono font-bold text-xs">
                {activePlayer.highestBidder}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePlaceBid}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Play className="size-3.5 fill-current" />
              <span>Raise Bid (+₹0.25 Cr)</span>
            </button>
          </div>
        </div>

        {/* Player Roster Selector & Live Bidding Log */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <p className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">Select Player on Paddle</p>
            <div className="grid grid-cols-2 gap-2">
              {players.map((p, idx) => (
                <button
                  key={p.name}
                  onClick={() => {
                    playClickSound();
                    setSelectedPlayerIdx(idx);
                  }}
                  className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                    idx === selectedPlayerIdx
                      ? "border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-bold"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <p>{p.name}</p>
                  <p className="text-[10px] font-mono text-zinc-400">₹{p.currentBid} Cr ({p.highestBidder})</p>
                </button>
              ))}
            </div>
          </div>

          {/* Live Log */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 p-3 font-mono text-[11px] text-zinc-300 space-y-1">
            <p className="text-zinc-500 text-[10px] uppercase font-bold border-b border-zinc-800 pb-1">Real-Time Auction Feed</p>
            {biddingLog.map((log, i) => (
              <p key={i} className="truncate text-emerald-400">{log}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AuctionSimulator;
