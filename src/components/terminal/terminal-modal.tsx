"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from "lucide-react";
import { useTheme } from "next-themes";
import { playKeypressSound, playPopSound } from "@/lib/sound-effects";

interface CommandHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: "welcome",
      command: "welcome",
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-emerald-400 font-bold">Kolli Zsh Shell v2.6.0 (arm64-apple-darwin)</p>
          <p className="text-xs text-zinc-400">Type <span className="text-amber-300 font-bold">help</span> to see available commands or <span className="text-amber-300 font-bold">exit</span> to close.</p>
        </div>
      ),
    },
  ]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [pastCmds, setPastCmds] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const { theme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      playPopSound();
    };

    window.addEventListener("open-terminal", handleOpen);
    return () => window.removeEventListener("open-terminal", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    if (!rawCmd) return;

    playKeypressSound();
    const cmd = rawCmd.toLowerCase();
    setPastCmds((prev) => [...prev, rawCmd]);
    setCmdIndex(-1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300 py-1">
            <div><span className="text-amber-300 font-bold">about</span> - Summary overview</div>
            <div><span className="text-amber-300 font-bold">projects</span> - View project repository list</div>
            <div><span className="text-amber-300 font-bold">experience</span> - Work history & roles</div>
            <div><span className="text-amber-300 font-bold">skills</span> - Tech stack breakdown</div>
            <div><span className="text-amber-300 font-bold">contact</span> - Email & Socials</div>
            <div><span className="text-amber-300 font-bold">theme</span> - Toggle Dark / Light mode</div>
            <div><span className="text-amber-300 font-bold">date</span> - Print current timestamp</div>
            <div><span className="text-amber-300 font-bold">clear</span> - Clear screen buffer</div>
            <div><span className="text-amber-300 font-bold">exit</span> - Close terminal view</div>
          </div>
        );
        break;

      case "about":
        output = (
          <p className="text-xs text-zinc-300 leading-relaxed">
            Frontend & Full-stack Engineer with expertise in React, Next.js, TypeScript, Tailwind, Python, and Machine Learning. CS + AI student at SRM University.
          </p>
        );
        break;

      case "projects":
        output = (
          <ul className="space-y-1.5 text-xs font-mono text-zinc-300">
            <li>🚀 <span className="text-sky-400 font-bold">modelroute</span> - Multi-LLM intelligent dynamic router</li>
            <li>🏏 <span className="text-indigo-400 font-bold">ipl-auction-pro</span> - Real-time auction simulator platform</li>
            <li>📈 <span className="text-emerald-400 font-bold">predictive-sales-analytics</span> - ML forecasting engine</li>
            <li>⚡ <span className="text-amber-400 font-bold">tricore-fs</span> - High throughput async file system driver</li>
          </ul>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-2 text-xs text-zinc-300">
            <div>
              <span className="font-bold text-white">Associate Software Engineer</span> @ Standard Chartered Bank
              <p className="text-zinc-400">June 2025 – Present | Fullstack & Cloud Infrastructure</p>
            </div>
            <div>
              <span className="font-bold text-white">Full Stack Engineering Intern</span> @ Trade Brains
              <p className="text-zinc-400">Oct 2024 – Nov 2024 | Next.js & Financial Dashboards</p>
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-xs text-zinc-300 space-y-1">
            <p><span className="text-violet-400 font-bold">Languages:</span> TypeScript, JavaScript, Python, C++, SQL, HTML/CSS</p>
            <p><span className="text-violet-400 font-bold">Frontend:</span> React 19, Next.js 16, Tailwind v4, Framer Motion, Redux</p>
            <p><span className="text-violet-400 font-bold">Backend/AI:</span> Node.js, Express, PyTorch, Scikit-learn, FastAPI, PostgreSQL</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-xs font-mono text-zinc-300 space-y-1">
            <p>📧 Email: <a href="mailto:adithyakolli55@gmail.com" className="text-sky-400 underline">adithyakolli55@gmail.com</a></p>
            <p>🐙 GitHub: <a href="https://github.com/KolliCharanAdithya" target="_blank" className="text-sky-400 underline">github.com/KolliCharanAdithya</a></p>
            <p>💼 LinkedIn: <a href="https://linkedin.com/in/charan-adithya-kolli" target="_blank" className="text-sky-400 underline">linkedin.com/in/charan-adithya-kolli</a></p>
          </div>
        );
        break;

      case "theme":
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        output = <p className="text-xs text-emerald-400">Theme switched to {nextTheme} mode.</p>;
        break;

      case "date":
        output = <p className="text-xs text-zinc-400">{new Date().toString()}</p>;
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        setIsOpen(false);
        setInputVal("");
        return;

      default:
        output = (
          <p className="text-xs text-rose-400 font-mono">
            zsh: command not found: {rawCmd}. Type <span className="text-amber-300">help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCmd,
        output,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCmds.length === 0) return;
      const nextIdx = cmdIndex + 1;
      if (nextIdx < pastCmds.length) {
        setCmdIndex(nextIdx);
        setInputVal(pastCmds[pastCmds.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex > 0) {
        const nextIdx = cmdIndex - 1;
        setCmdIndex(nextIdx);
        setInputVal(pastCmds[pastCmds.length - 1 - nextIdx]);
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed z-50 transition-all duration-300 ${
              isExpanded
                ? "inset-4 sm:inset-8"
                : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-2xl h-[520px]"
            } rounded-2xl border border-zinc-700/80 bg-zinc-950/95 shadow-2xl overflow-hidden flex flex-col font-mono text-sm`}
          >
            {/* Titlebar */}
            <div className="h-10 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="size-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity" title="Close" />
                <button onClick={() => setIsExpanded(!isExpanded)} className="size-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity" title="Minimize/Maximize" />
                <div className="size-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                  <TerminalIcon className="size-3.5 text-emerald-400" />
                  kolli@macbook-pro: ~ (zsh)
                </span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <button onClick={() => setIsExpanded(!isExpanded)} className="hover:text-white transition-colors">
                  {isExpanded ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item) => (
                <div key={item.id} className="space-y-1.5">
                  {item.command !== "welcome" && (
                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                      <span className="text-emerald-400 font-bold">kolli@portfolio</span>
                      <span className="text-zinc-500">:</span>
                      <span className="text-sky-400">~</span>
                      <span className="text-zinc-300">$ {item.command}</span>
                    </div>
                  )}
                  <div>{item.output}</div>
                </div>
              ))}

              {/* Active Prompt Line */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1 text-xs">
                <span className="text-emerald-400 font-bold">kolli@portfolio</span>
                <span className="text-zinc-500">:</span>
                <span className="text-sky-400">~</span>
                <span className="text-zinc-300">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-zinc-100 outline-none border-none font-mono caret-emerald-400 text-xs"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default TerminalModal;
