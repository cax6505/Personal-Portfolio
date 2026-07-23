// =============================================================================
// Portfolio Data — Single Source of Truth
// =============================================================================
// All portfolio content lives here. Both the scroll-based sections (/)
// and the 3D world (/explore) import from this file.
// To add new content (projects, skills, etc.), update this file and both
// experiences will reflect it automatically.
// =============================================================================

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const HERO_DATA = {
  name: "Charan Adithya",
  firstName: "Charan",
  lastName: "Adithya",
  tagline:
    'Frontend/Full-stack Engineer & AI/ML enthusiast. B.Tech Computer Science + AI student at Newton School of Technology (Rishihood University).',
  university: "Newton School of Technology",
  availabilityLabel: "Open for internships & collaborations",
  socials: {
    github: "https://github.com/cax6505",
    linkedin: "https://linkedin.com/in/charank6505",
    email: "mailto:kolli.c23csai@nst.rishihood.edu.in",
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
  "Full Stack Developer & AI/ML Enthusiast with 6 months of experience at IIT Roorkee shipping production features for a platform serving 50K+ users, and selected for the Amazon ML Summer School (top 2.3%). Skilled in React, React Native, Node.js, Express.js, TypeScript, Python, scikit-learn, TensorFlow, Feature Engineering, and MySQL - building scalable web/mobile apps with clean APIs, real-time features, and data-driven machine learning pipelines.";

export const ABOUT_CARDS: AboutCard[] = [
  {
    iconName: "GraduationCap",
    title: "Academic Foundation",
    detail: "B.Tech in CS & AI",
    description:
      "Newton School of Technology, Rishihood University (2023 - 2027). Current CGPA: 7.24/10. Studying core software engineering principles, algorithms, and practical artificial intelligence frameworks.",
    colorClass:
      "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20",
    glowClass: "from-emerald-500/10",
  },
  {
    iconName: "BrainCircuit",
    title: "AI/ML Specialization",
    detail: "Amazon ML Summer School Selection",
    description:
      "Selected as one of the top 3,000 students out of 130,000+ applicants (~2.3% acceptance rate) for advanced lectures in machine learning algorithms, deep learning models, and production-scale MLOps.",
    colorClass:
      "text-violet-500 dark:text-violet-400 bg-violet-500/10 dark:bg-violet-500/10 border-violet-500/20",
    glowClass: "from-violet-500/10",
  },
  {
    iconName: "Code2",
    title: "Full-Stack Engineering",
    detail: "TypeScript & Next.js Focus",
    description:
      "Engineered responsive user interfaces and robust state systems. Passionate about frontend performance tuning, server-side caching (ISR/RSC), real-time WebSockets synchronization, and Cypress E2E test coverage.",
    colorClass:
      "text-sky-500 dark:text-sky-400 bg-sky-500/10 dark:bg-sky-500/10 border-sky-500/20",
    glowClass: "from-sky-500/10",
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
    role: "Frontend Intern",
    company: "IIT Roorkee (Remote)",
    period: "Jan 2025 – Apr 2025",
    points: [
      "Led the engineering of a React-based application portal connecting over 50,000+ users with government schemes, scholarships, and job opportunities.",
      "Optimized code splitting, route prefetching, and asset lazy-loading, ensuring fast load times on low-bandwidth networks in rural areas.",
      "Designed and implemented a data-driven recommendation engine for application suggestions, boosting overall form completion rates by 40%.",
      "Wrote more than 50+ robust Cypress End-to-End (E2E) integration tests, securing critical pathways (auth, forms, profiles) and decreasing build failures.",
    ],
  },
  {
    role: "Product and Design Intern",
    company: "IIT Roorkee (Remote)",
    period: "Nov 2024 – Jan 2025",
    points: [
      "Collaborated closely with 3 software engineers to implement pixel-perfect Figma designs across 10+ core layout components.",
      "Built a mobile-first responsive user interface adapted for high usability across all handheld devices, catering to a base of 50K+ active users.",
      "Designed and validated clean, accessible sign-up and login workflows with streamlined multi-step verification inputs.",
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
    title: "IPL Auction Pro (Multiplayer Demo)",
    slug: "ipl-auction-pro",
    repoKey: "ipl",
    description:
      "Real-time multiplayer IPL auction platform supporting up to 10 concurrent users, sub-200ms bid sync, and rule-based bidding engines.",
    longDescription:
      "Built using Next.js 15, TypeScript, Tailwind CSS, Supabase, WebSockets, and Postgres CDC. Features host controls, real-time lobby discovery, purse limit calculations, overseas quota checking, and role-based squad dashboards.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "WebSockets",
      "Postgres CDC",
    ],
    githubUrl: "https://github.com/cax6505/IPL-Auction-simulator",
    languageColor:
      "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/10 border-indigo-500/20",
    glowClass: "from-indigo-500/10",
  },
  {
    title: "Predictive Sales Analytics Engine",
    slug: "predictive-sales-analytics",
    repoKey: "sales",
    description:
      "Leakage-safe MLOps machine learning pipeline predicting repeat customer purchases within 180 days, achieving 1.57x lift over random baseline.",
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
      "Interactive educational web app for understanding file systems through visual disk block mapping, allocation strategy comparison, and a smart file organizer — all built to teach core OS concepts hands-on.",
    longDescription:
      "Built using Next.js, TypeScript, Tailwind CSS, and deployed on Vercel. Features a visual file system simulator with Contiguous, Linked, Indexed, FAT, and Unix-style allocation strategies, fragmentation visualization, inode metadata inspection, a Finder-style smart file organizer, and a standalone npm CLI package.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "CSS",
      "Vercel",
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
    items: ["TypeScript", "JavaScript", "Python"],
    colorClass:
      "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20",
    glowClass: "from-emerald-500/5",
  },
  {
    category: "Frameworks & UI",
    iconName: "Layers",
    items: [
      "React",
      "React Native",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
    colorClass:
      "text-sky-500 dark:text-sky-400 bg-sky-500/10 dark:bg-sky-500/10 border-sky-500/20",
    glowClass: "from-sky-500/5",
  },
  {
    category: "ML & Deep Learning",
    iconName: "BrainCircuit",
    items: [
      "scikit-learn",
      "TensorFlow",
      "Keras",
      "EfficientNetB0",
      "Transfer Learning",
      "Random Forest",
    ],
    colorClass:
      "text-violet-500 dark:text-violet-400 bg-violet-500/10 dark:bg-violet-500/10 border-violet-500/20",
    glowClass: "from-violet-500/5",
  },
  {
    category: "ML Engineering",
    iconName: "Cpu",
    items: ["Feature Engineering", "Class Imbalance Handling", "TF-IDF"],
    colorClass:
      "text-amber-500 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/20",
    glowClass: "from-amber-500/5",
  },
  {
    category: "Databases & ORMs",
    iconName: "Database",
    items: ["MySQL", "PostgreSQL", "Prisma", "Supabase"],
    colorClass:
      "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/10 border-indigo-500/20",
    glowClass: "from-indigo-500/5",
  },
  {
    category: "Developer Tools",
    iconName: "Wrench",
    items: [
      "Git",
      "GitHub",
      "Figma",
      "Cypress",
      "WebSockets",
      "REST APIs",
      "Vercel",
    ],
    colorClass:
      "text-rose-500 dark:text-rose-400 bg-rose-500/10 dark:bg-rose-500/10 border-rose-500/20",
    glowClass: "from-rose-500/5",
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
      "Competed and was selected among the top 3,000 high-potential candidates out of a massive nationwide pool of over 130,000+ applicants.",
    colorClass:
      "text-amber-500 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/20",
    glowClass: "from-amber-500/5",
  },
  {
    iconName: "Target",
    metric: "130,000+",
    title: "Applicant Pool Size",
    description:
      "Proved capabilities in core engineering and mathematics concepts to secure selection in one of the most selective ML schools in India.",
    colorClass:
      "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/20",
    glowClass: "from-emerald-500/5",
  },
  {
    iconName: "Award",
    metric: "ML Intensive",
    title: "Advanced Curriculum",
    description:
      "Trained directly under Amazon scientists on Supervised Learning, Deep Learning, Dimensionality Reduction, LLMs, and Generative AI.",
    colorClass:
      "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-500/10 border-indigo-500/20",
    glowClass: "from-indigo-500/5",
  },
];

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
export const CONTACT_DATA = {
  email: "kolli.c23csai@nst.rishihood.edu.in",
  formEndpoint: "/api/contact",
  subtitle:
    "Have a question, an internship opportunity, or a project to build? Drop a message below.",
  socials: {
    github: "https://github.com/cax6505",
    linkedin: "https://linkedin.com/in/charank6505",
    email: "mailto:kolli.c23csai@nst.rishihood.edu.in",
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
    id: "project-ipl",
    label: "IPL Auction Pro",
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
