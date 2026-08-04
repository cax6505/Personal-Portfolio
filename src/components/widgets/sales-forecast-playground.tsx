"use client";

import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { playPopSound } from "@/lib/sound-effects";

export function SalesForecastPlayground() {
  const [adSpend, setAdSpend] = useState<number>(15000);
  const [seasonality, setSeasonality] = useState<number>(1.5);
  const [discount, setDiscount] = useState<number>(10);

  const calculateRevenue = (monthFactor: number) => {
    const base = adSpend * 3.8 * seasonality * (1 - discount / 100);
    return Math.round(base * monthFactor);
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const factors = [0.85, 0.95, 1.1, 1.25, 1.4, 1.6];
  const revenues = factors.map((f) => calculateRevenue(f));
  const maxRev = Math.max(...revenues, 1);
  const totalRevenue = revenues.reduce((a, b) => a + b, 0);
  const roi = Math.round(((totalRevenue - adSpend * 6) / (adSpend * 6)) * 100);

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 p-6 backdrop-blur-xl shadow-lg space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-bold px-2 py-0.5 rounded bg-emerald-500/10">Interactive ML Model Sandbox</span>
          <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-1">Predictive Sales Analytics Parameter Playground</h4>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
            <TrendingUp className="size-3.5" />
            <span>6-Mo Rev: ${totalRevenue.toLocaleString()} ({roi > 0 ? `+${roi}% ROI` : `${roi}% ROI`})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Control Panel */}
        <div className="space-y-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 shadow-sm">
          {/* Ad Spend */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-700 dark:text-zinc-300">Monthly Ad Budget</span>
              <span className="font-mono text-emerald-500">${adSpend.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="50000"
              step="1000"
              value={adSpend}
              onChange={(e) => {
                setAdSpend(Number(e.target.value));
                playPopSound();
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Seasonality */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-700 dark:text-zinc-300">Seasonality Multiplier</span>
              <span className="font-mono text-emerald-500">{seasonality}x</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="3.0"
              step="0.1"
              value={seasonality}
              onChange={(e) => {
                setSeasonality(Number(e.target.value));
                playPopSound();
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Discount Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-700 dark:text-zinc-300">Promotional Discount</span>
              <span className="font-mono text-emerald-500">{discount}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={discount}
              onChange={(e) => {
                setDiscount(Number(e.target.value));
                playPopSound();
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Dynamic Chart */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 flex flex-col justify-between space-y-4 shadow-sm">
          <p className="text-xs font-mono text-zinc-500 uppercase font-semibold">6-Month Predicted Sales Curve</p>
          
          <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
            {months.map((m, idx) => {
              const val = revenues[idx];
              const heightPct = Math.round((val / maxRev) * 100);
              return (
                <div key={m} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ${(val / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full rounded-t-lg bg-emerald-500/20 dark:bg-emerald-500/10 group-hover:bg-emerald-500 transition-all flex items-end justify-center overflow-hidden" style={{ height: `${heightPct}%` }}>
                    <div className="w-full bg-emerald-500 rounded-t-lg transition-all duration-300" style={{ height: "100%" }} />
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-zinc-500">{m}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SalesForecastPlayground;
