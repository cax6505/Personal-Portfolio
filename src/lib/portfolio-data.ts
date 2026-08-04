// =============================================================================
// Portfolio Data — Single Source of Truth (Synchronized with Official Resume)
// =============================================================================

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const HERO_DATA = {
  name: "Kolli Charan Adithya",
  firstName: "Kolli Charan",
  lastName: "Adithya",
  tagline:
    "Product Engineer & AI/ML Specialist. B.Tech Computer Science & AI student at Newton School of Technology (Rishihood University).",
  university: "Newton School of Technology, Rishihood University",
  availabilityLabel: "Open for engineering roles & collaborations",
  socials: {
    github: "https://github.com/cax6505",
    linkedin: "https://linkedin.com/in/charan-adithya-kolli",
    email: "mailto:adithyakolli55@gmail.com",
    phone: "tel:+917995949632",
  },
} as const;

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
export interface AboutCard {
  title: string;
  detail: string;
  description: string;
  iconName: "GraduationCap" | "BrainCircuit" | "Code2";
  colorClass: string;
  glowClass: string;
}

export const ABOUT_SUMMARY =
  "Computer Science & Artificial Intelligence student at Newton School of Technology with hands-on experience as a Product Engineer Intern at IIT Roorkee (SSF). Specialized in building high-throughput React/Next.js platforms, concurrency-safe distributed state engines, and intelligent LLM routing gateways. Selected among top 3,000 nationwide in the Amazon ML Summer School (top 2.3%).";

export const ABOUT_CARDS: AboutCard[] = [
  {
    iconName: "GraduationCap",
    title: "Academic Foundation",
    detail: "B.Tech in CS & AI (2023 – Present)",
    description:
      "Newton School of Technology, Rishihood University. Core study in software engineering, data structures & algorithms, operating systems, and artificial intelligence.",
    colorClass:
      "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20",
    glowClass: "from-emerald-500/10",
  },
  {
    iconName: "Code2",
    title: "Product Engineering",
    detail: "IIT Roorkee Intern (260M+ Users)",
    description:
      "Shipped code-split React/Next.js portals serving government schemes, scholarships, and job listings. Boosted application completion rates by 40% via ML recommendation engines and authored 50+ Cypress E2E tests.",
    colorClass:
      "text-sky-500 dark:text-sky-400 bg-sky-500/10 dark:bg-sky-500/10 border-sky-500/20",
    glowClass: "from-sky-500/10",
  },
  {
    iconName: "BrainCircuit",
    title: "AI/ML Specialization",
    detail: "Amazon ML Summer School (Top 2.3%)",
    description:
      "Selected among top 3,000 applicants out of 130,000+ candidates (~2.3% acceptance rate) for advanced lectures in machine learning algorithms, deep learning models, transfer learning, and production MLOps.",
    colorClass:
      "text-violet-500 dark:text-violet-400 bg-violet-500/10 dark:bg-violet-500/10 border-violet-500/20",
    glowClass: "from-violet-500/10",
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------
export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export const EXPERIENCES_DATA: ExperienceEntry[] = [
  {
    role: "Product Engineer Intern",
    company: "IIT Roorkee (SSF) — Remote",
    period: "Nov 2024 – Apr 2025",
    points: [
      "Reduced initial bundle size and improved load times on low-bandwidth networks by implementing code-splitting and lazy-loading in a React portal serving government schemes, scholarships, and job listings.",
      "Lifted application completion rate by 40% by designing and shipping a recommendation engine that personalizes scheme/job matching using user profile data and behavioral signals.",
      "Cut production regressions by building a Python scraping pipeline to ingest & normalize scheme data from government portals, and authoring 50+ Cypress E2E tests covering critical user flows.",
      "Designed a mobile-first UI/UX system in Figma (0-to-1 screens) and translated it into a reusable React component library adopted platform-wide for 260M+ users.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export interface ProjectItem {
  title: string;
  slug: string;
  repoKey: string;
  description: string;
  longDescription: string;
  tech: string[];
  githubUrl: string;
  languageColor: string;
  glowClass: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: "DraftForge — IPL Mega Auction Simulator",
    slug: "ipl-auction-pro",
    repoKey: "ipl",
    description:
      "Real-time multiplayer cricket manager draft room with concurrency-safe bidding engine, Postgres CDC, and WebSocket synchronization.",
    longDescription:
      "Built a concurrency-safe bidding engine (PostgreSQL stored procedure + SELECT ... FOR UPDATE) that serializes bids across 10 concurrent players while enforcing purse and quota rules — zero race conditions. Designed an idempotent auction state-machine with optimistic concurrency guards that prevents double-advancement on timer expiry using a staggered host/peer trigger protocol. Architected real-time sync across 5 Postgres tables via CDC over filtered WebSocket channels (Presence + Broadcast) for consistent state across 10 concurrent clients.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "WebSockets",
      "Postgres CDC",
    ],
    githubUrl: "https://github.com/cax6505/IPL-Auction-simulator",
    languageColor:
      "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/10 border-indigo-500/20",
    glowClass: "from-indigo-500/10",
  },
  {
    title: "ModelRoute — LLM Routing Engine & API Gateway",
    slug: "modelroute",
    repoKey: "modelroute",
    description:
      "High-throughput API gateway and LLM routing engine classifying prompt intent in sub-millisecond regex across 8 task categories.",
    longDescription:
      "Built a high-throughput API gateway + LLM routing engine that classifies prompt intent in sub-millisecond regex across 8 task categories and dispatches to the optimal provider (Groq / Gemini / Ollama) by latency, cost, and SLA. Implemented a state-machine Circuit Breaker with exponential backoff for zero-downtime failover, plus SHA-256 key authentication and Redis sliding-window rate limiting. Delivered real-time token streaming via Server-Sent Events (SSE) and enforced strict runtime schema checks at every boundary with a Zod-validated REST API layer.",
    tech: [
      "TypeScript",
      "Next.js 15",
      "PostgreSQL",
      "Upstash Redis",
      "Groq",
      "Gemini",
      "Ollama",
    ],
    githubUrl: "https://github.com/cax6505/ModelRoute",
    languageColor:
      "text-sky-500 dark:text-sky-400 bg-sky-500/10 dark:bg-sky-500/10 border-sky-500/20",
    glowClass: "from-sky-500/10",
  },
  {
    title: "Predictive Sales Analytics Engine",
    slug: "predictive-sales-analytics",
    repoKey: "sales",
    description:
      "Leakage-safe customer repeat purchase forecasting pipeline predicting 180-day returns with 1.57x precision lift.",
    longDescription:
      "Built using Python, scikit-learn, Random Forest, TF-IDF, Pandas, YAML Configs, and MLOps principles. Features strict temporal train/val/test splits, freight ratio engineering, review embeddings, and class imbalance handling (97:3).",
    tech: [
      "Python",
      "scikit-learn",
      "Random Forest",
      "TF-IDF",
      "MLOps",
      "Pandas",
      "YAML",
    ],
    githubUrl:
      "https://github.com/cax6505/Predictive-Sales-Analytics-Engine",
    languageColor:
      "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20",
    glowClass: "from-emerald-500/10",
  },
  {
    title: "SaveSpace — File System Simulator",
    slug: "tricore-fs",
    repoKey: "tricore",
    description:
      "Interactive OS education platform simulating disk block allocation, inode inspection, and smart file organization.",
    longDescription:
      "Built using Next.js, TypeScript, Tailwind CSS, and deployed on Vercel. Features a visual file system simulator with Contiguous, Linked, Indexed, FAT, and Unix-style allocation strategies, fragmentation visualization, inode metadata inspection, a Finder-style smart file organizer, and a standalone npm CLI package.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Vercel",
      "npm CLI",
    ],
    githubUrl: "https://github.com/cax6505/TriCore-FS",
    languageColor:
      "text-amber-500 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/20",
    glowClass: "from-amber-500/10",
  },
];

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------
export interface SkillGroup {
  category: string;
  iconName: "Code2" | "Layers" | "BrainCircuit" | "Cpu" | "Database" | "Wrench";
  items: string[];
  colorClass: string;
  glowClass: string;
}

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: "Languages",
    iconName: "Code2",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
    colorClass:
      "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20",
    glowClass: "from-emerald-500/5",
  },
  {
    category: "Frameworks",
    iconName: "Layers",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
    ],
    colorClass:
      "text-sky-500 dark:text-sky-400 bg-sky-500/10 dark:bg-sky-500/10 border-sky-500/20",
    glowClass: "from-sky-500/5",
  },
  {
    category: "Databases & APIs",
    iconName: "Database",
    items: [
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "Upstash Redis",
      "REST APIs",
      "WebSockets",
      "JWT/OAuth",
    ],
    colorClass:
      "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/10 border-indigo-500/20",
    glowClass: "from-indigo-500/5",
  },
  {
    category: "Tools & DevOps",
    iconName: "Wrench",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Docker",
      "AWS (EC2, S3)",
      "Cypress",
      "Figma",
    ],
    colorClass:
      "text-rose-500 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-500/10 border-rose-500/20",
    glowClass: "from-rose-500/5",
  },
  {
    category: "Machine Learning",
    iconName: "BrainCircuit",
    items: [
      "Pandas",
      "TensorFlow",
      "Scikit-Learn",
      "CNN",
      "Transfer Learning",
      "Groq & Gemini APIs",
      "Ollama",
    ],
    colorClass:
      "text-violet-500 dark:text-violet-400 bg-violet-500/10 dark:bg-violet-500/10 border-violet-500/20",
    glowClass: "from-violet-500/5",
  },
];

// ---------------------------------------------------------------------------
// Achievements
// ---------------------------------------------------------------------------
export interface AchievementHighlight {
  metric: string;
  title: string;
  description: string;
  iconName: "Trophy" | "Target" | "Award";
  colorClass: string;
  glowClass: string;
}

export const ACHIEVEMENTS_DATA: AchievementHighlight[] = [
  {
    iconName: "Trophy",
    metric: "Top 2.3%",
    title: "Amazon ML Summer School Selection",
    description:
      "Selected among the top 3,000 out of 130,000+ applicants (~2.3% acceptance rate) for advanced machine learning, deep learning, and production MLOps training.",
    colorClass:
      "text-amber-500 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/20",
    glowClass: "from-amber-500/5",
  },
  {
    iconName: "Award",
    metric: "3rd / 25 Teams",
    title: "StealthFire Hackathon Finalist",
    description:
      "Secured 3rd place out of 25 engineering teams by building a QR-based digital student ID system that solves lost-card recovery.",
    colorClass:
      "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20",
    glowClass: "from-emerald-500/5",
  },
];

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
export const CONTACT_DATA = {
  email: "adithyakolli55@gmail.com",
  phone: "+91 79959 49632",
  formEndpoint: "/api/contact",
  subtitle:
    "Have an engineering role, an internship opportunity, or a project to build? Drop a message below.",
  socials: {
    github: "https://github.com/cax6505",
    linkedin: "https://linkedin.com/in/charan-adithya-kolli",
    email: "mailto:adithyakolli55@gmail.com",
  },
} as const;

// ---------------------------------------------------------------------------
// 3D World — Zone Positions
// ---------------------------------------------------------------------------
export interface ZonePosition {
  id: string;
  label: string;
  position: [number, number, number]; // [x, y, z] in Three.js coordinates
  triggerRadius: number;
}

export const ZONE_POSITIONS: ZonePosition[] = [
  { id: "hero", label: "Start", position: [0, 0, 0], triggerRadius: 6 },
  { id: "about", label: "About", position: [-32, 0, -20], triggerRadius: 10 },
  {
    id: "experience",
    label: "Experience",
    position: [-32, 0, 20],
    triggerRadius: 10,
  },
  { id: "skills", label: "Skills", position: [0, 0, -42], triggerRadius: 12 },
  {
    id: "project-modelroute",
    label: "ModelRoute Engine",
    position: [24, 0, 8],
    triggerRadius: 9,
  },
  {
    id: "project-ipl",
    label: "DraftForge Simulator",
    position: [32, 0, 15],
    triggerRadius: 9,
  },
  {
    id: "project-sales",
    label: "Sales Analytics",
    position: [42, 0, 28],
    triggerRadius: 9,
  },
  {
    id: "achievements",
    label: "Achievements",
    position: [32, 0, -20],
    triggerRadius: 10,
  },
  {
    id: "contact",
    label: "Contact",
    position: [0, 0, 42],
    triggerRadius: 10,
  },
];
