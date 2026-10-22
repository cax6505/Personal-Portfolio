"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Copy,
  Check,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Code2,
  BrainCircuit,
} from "lucide-react";
import { HERO_DATA, EXPERIENCES_DATA, PROJECTS_DATA, SKILLS_DATA, ACHIEVEMENTS_DATA } from "@/lib/portfolio-data";
import { playClickSound, playPopSound } from "@/lib/sound-effects";

export type RoleType = "fullstack" | "frontend" | "backend" | "ai_ml";

interface RoleConfig {
  id: RoleType;
  title: string;
  badge: string;
  matchScore: number;
  focusSummary: string;
  icon: React.ReactNode;
  primarySkills: string[];
  spotlightProjects: string[];
}

export function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleType>("fullstack");
  const [copied, setCopied] = useState(false);

  const roleConfigs: Record<RoleType, RoleConfig> = {
    fullstack: {
      id: "fullstack",
      title: "Full-Stack Engineer",
      badge: "Core Engineering",
      matchScore: 99,
      focusSummary:
        "Full-stack product engineer experienced in architecting scalable Next.js applications, atomic PostgreSQL transactions, high-throughput Redis rate limiters, and production ML pipelines.",
      icon: <Layers className="size-4" />,
      primarySkills: ["TypeScript", "Next.js", "React", "PostgreSQL", "Node.js", "Python", "Supabase", "Redis"],
      spotlightProjects: ["DraftForge (IPL Auction)", "ModelRoute (LLM Gateway)", "SaveSpace (TriCore FS)"],
    },
    frontend: {
      id: "frontend",
      title: "Frontend & UI Engineer",
      badge: "UI / UX & Performance",
      matchScore: 98,
      focusSummary:
        "Frontend specialist with proven internship experience at IIT Roorkee shipping code-split React/Next.js platforms for 260M+ users, custom Figma-to-React design systems, 3D WebGL interactions, and 50+ Cypress E2E tests.",
      icon: <Code2 className="size-4" />,
      primarySkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "Cypress", "Figma"],
      spotlightProjects: ["IIT Roorkee Portals", "DraftForge War Room UI", "TriCore-FS Simulator"],
    },
    backend: {
      id: "backend",
      title: "Backend & Systems",
      badge: "Distributed Systems & DBs",
      matchScore: 97,
      focusSummary:
        "Backend & concurrency specialist experienced in designing race-condition-free PostgreSQL RPC locking functions (SELECT FOR UPDATE), Upstash Redis sliding-window token buckets, and Supabase Postgres CDC WebSocket broadcasts.",
      icon: <Briefcase className="size-4" />,
      primarySkills: ["PostgreSQL", "Node.js", "Python", "Upstash Redis", "Supabase CDC", "WebSockets", "Prisma", "Docker"],
      spotlightProjects: ["DraftForge Concurrency Engine", "ModelRoute LLM Gateway", "Predictive Analytics"],
    },
    ai_ml: {
      id: "ai_ml",
      title: "AI & Machine Learning",
      badge: "MLOps & LLM Systems",
      matchScore: 96,
      focusSummary:
        "AI/ML engineer selected among top 2.3% nationwide in Amazon ML Summer School. Specialized in high-throughput LLM routing gateways (<0.4ms intent dispatch), scikit-learn predictive modeling pipelines, and deep learning architectures.",
      icon: <BrainCircuit className="size-4" />,
      primarySkills: ["Python", "Groq & Gemini APIs", "Scikit-Learn", "TF-IDF", "TensorFlow", "Pandas", "Ollama", "MLOps"],
      spotlightProjects: ["ModelRoute Gateway", "Predictive Sales Analytics Engine", "Amazon ML Cohort"],
    },
  };

  const currentRole = roleConfigs[activeRole];

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleToggle = () => setIsOpen((prev) => !prev);

    window.addEventListener("open-resume-modal", handleOpen);
    window.addEventListener("toggle-resume-modal", handleToggle);

    return () => {
      window.removeEventListener("open-resume-modal", handleOpen);
      window.removeEventListener("toggle-resume-modal", handleToggle);
    };
  }, []);

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleCopyMarkdown = () => {
    playPopSound();
    const markdownResume = `# Charan Adithya — Resume (${currentRole.title})
Email: ${HERO_DATA.socials.email.replace("mailto:", "")} | Phone: ${HERO_DATA.socials.phone.replace("tel:", "")}
GitHub: ${HERO_DATA.socials.github} | LinkedIn: ${HERO_DATA.socials.linkedin}

## Professional Summary
${currentRole.focusSummary}

## Education
**B.Tech in Computer Science & Artificial Intelligence (2023 – Present)**
Newton School of Technology, Rishihood University

## Experience
**Product Engineer Intern — IIT Roorkee (SSF) [Remote] (Nov 2024 – Apr 2025)**
- Designed and shipped code-split React/Next.js portals serving 260M+ users with 40% completion rate boost via ML recommendations.
- Authored 50+ Cypress E2E tests and created unified Figma-to-React UI design system.

## Key Projects
${PROJECTS_DATA.map((p) => `### ${p.title}\n- ${p.description}\n- Tech: ${p.tech.join(", ")}`).join("\n\n")}

## Key Skills
${SKILLS_DATA.map((s) => `**${s.category}**: ${s.items.join(", ")}`).join("\n")}

## Honors & Achievements
- **Amazon ML Summer School**: Top 2.3% Merit selection (~3,000 / 130,000+ applicants).
- **StealthFire Hackathon Finalist**: 3rd Place out of 25 engineering teams.
`;

    navigator.clipboard.writeText(markdownResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0f0f12] border border-zinc-200 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-900 dark:text-zinc-100"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-white/5 flex items-center justify-between gap-4 bg-zinc-50/80 dark:bg-white/[0.02]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 flex items-center gap-1">
                    <Sparkles className="size-3" />
                    Dynamic Role Tailoring
                  </span>
                  <span className="hidden sm:inline text-xs text-zinc-400">
                    ATS-Optimized Live Preview
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold mt-1">
                  Charan Adithya — Professional Dossier
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 transition-all cursor-pointer shadow-sm"
                  title="Print / Save as PDF"
                >
                  <Printer className="size-3.5" />
                  <span className="hidden sm:inline">Save PDF</span>
                </button>

                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
                  title="Copy as Markdown"
                >
                  {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  <span className="hidden sm:inline">{copied ? "Copied!" : "Copy MD"}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Role Filter Tabs Bar */}
            <div className="px-4 sm:px-6 py-3 border-b border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-black/20 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase shrink-0">
                Filter Profile:
              </span>
              {(Object.keys(roleConfigs) as RoleType[]).map((roleKey) => {
                const config = roleConfigs[roleKey];
                const isSelected = activeRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    onClick={() => {
                      playPopSound();
                      setActiveRole(roleKey);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-violet-600 text-white font-bold shadow-md shadow-violet-500/20"
                        : "border border-zinc-200 dark:border-white/5 bg-white dark:bg-white/[0.03] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {config.icon}
                    <span>{config.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Role Match Telemetry Banner */}
            <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-violet-500/5 via-indigo-500/5 to-transparent border-b border-zinc-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-bold font-mono text-violet-600 dark:text-violet-400">
                  <span className="size-2 rounded-full bg-violet-500 animate-ping" />
                  <span>{currentRole.matchScore}% Role Affinity Match</span>
                </div>
                <span className="text-zinc-400 hidden md:inline">•</span>
                <span className="text-zinc-500 text-[11px]">{currentRole.badge}</span>
              </div>
              <div className="text-zinc-500 font-mono text-[11px]">
                Top Fit: {currentRole.spotlightProjects.join(" | ")}
              </div>
            </div>

            {/* Scrollable Printable Resume Sheet */}
            <div className="flex-1 p-4 sm:p-8 overflow-y-auto space-y-6 font-sans text-xs sm:text-sm bg-white dark:bg-[#0c0c0e]">
              {/* Header */}
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5 space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                      {HERO_DATA.name}
                    </h1>
                    <p className="text-xs sm:text-sm font-semibold text-violet-600 dark:text-violet-400 font-mono mt-0.5">
                      {currentRole.title} • CS & AI Student @ Newton School of Technology
                    </p>
                  </div>
                  <div className="text-xs font-mono text-zinc-500 space-y-1 sm:text-right">
                    <p>{HERO_DATA.socials.email.replace("mailto:", "")}</p>
                    <p>{HERO_DATA.socials.phone.replace("tel:", "")}</p>
                    <div className="flex items-center gap-3 sm:justify-end text-violet-500">
                      <a href={HERO_DATA.socials.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                      <span>•</span>
                      <a href={HERO_DATA.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-2">
                  {currentRole.focusSummary}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  <GraduationCap className="size-3.5 text-emerald-500" />
                  <span>Education</span>
                </h4>
                <div className="flex justify-between items-start pt-1">
                  <div>
                    <h5 className="font-bold text-zinc-900 dark:text-zinc-100">B.Tech in Computer Science & Artificial Intelligence</h5>
                    <p className="text-xs text-zinc-500">Newton School of Technology, Rishihood University</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">2023 – Present</span>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  <Briefcase className="size-3.5 text-sky-500" />
                  <span>Experience</span>
                </h4>
                {EXPERIENCES_DATA.map((exp, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-bold text-zinc-900 dark:text-zinc-100">{exp.role}</h5>
                        <p className="text-xs text-zinc-500 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
                    </div>
                    <ul className="list-disc pl-4 space-y-1.5 text-zinc-600 dark:text-zinc-300 text-xs">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="leading-relaxed">{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Key Projects */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  <Code2 className="size-3.5 text-indigo-500" />
                  <span>Selected Featured Projects</span>
                </h4>
                <div className="space-y-3">
                  {PROJECTS_DATA.map((proj) => (
                    <div key={proj.slug} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h5 className="font-bold text-zinc-900 dark:text-zinc-100">{proj.title}</h5>
                        <span className="text-[10px] font-mono text-violet-500">{proj.tech.slice(0, 4).join(", ")}</span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  <Layers className="size-3.5 text-violet-500" />
                  <span>Technical Skills</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {SKILLS_DATA.map((group) => (
                    <div key={group.category} className="space-y-0.5">
                      <span className="font-bold text-zinc-700 dark:text-zinc-300">{group.category}: </span>
                      <span className="text-zinc-500">{group.items.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honors & Hackathons */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider flex items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  <Award className="size-3.5 text-amber-500" />
                  <span>Honors & Hackathon Awards</span>
                </h4>
                <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                  {ACHIEVEMENTS_DATA.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 shrink-0">• {ach.title} ({ach.metric}):</span>
                      <span>{ach.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ResumeModal;
