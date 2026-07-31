# Personal Portfolio Website — Kolli Charan Adithya

A premium, high-performance, and typography-led personal portfolio website built for a Computer Science + AI student and Full-Stack / AI Engineer. The project features dual navigation modes—an interactive 2D scroll-based experience and an immersive 3D interactive world (`/explore`) powered by Three.js & React Three Fiber—along with custom cursor tracking, command palette search shortcuts (`⌘K`), live GitHub stats integration, and MDX-powered technical case studies.

---

## Technical Stack

* **Framework**: Next.js 15+ (App Router, React 19, Server Components)
* **Styling**: Tailwind CSS v4 (CSS-first configuration) & Radix-based UI primitives
* **3D & Canvas Graphics**: Three.js, `@react-three/fiber`, and `@react-three/drei`
* **Animations & Micro-interactions**: Motion (`framer-motion`) & Lucide Icons
* **Command Palette**: `cmdk` for Spotlight search & quick navigation
* **Markdown & Case Studies**: `@next/mdx`, `@mdx-js/react`, and `remark-gfm`
* **Theming**: `next-themes` (Dark Mode default)
* **Testing & Quality**: Vitest & Cypress E2E integration testing setups

---

## Core Features

1. **Dual Navigation Modes**:
   - **2D Scroll View (`/`)**: A sleek, typography-led portfolio showcasing Hero, About, Experience timeline, Projects, Skills matrix, and Contact.
   - **3D World Experience (`/explore`)**: An interactive 3D spatial room allowing users to navigate and inspect portfolio nodes in real-time canvas graphics.
2. **Command Palette (`⌘K` or `Ctrl+K`)**: Spotlight search allowing instant jumping to portfolio sections, technical case studies, and external links.
3. **Custom Interactive Cursor**: Trailing cursor with smooth spring motion and difference-blend visual feedback on interactive elements.
4. **Live GitHub Repository Sync**: Server-side caching (`revalidate: 3600`) of repository stats (stars, forks, primary language) with graceful fallbacks if rate-limited.
5. **Featured Projects & MDX Case Studies**:
   - **ModelRoute**: Enterprise LLM Routing Engine dynamically dispatching requests across Groq, Gemini, and local models with Upstash Redis circuit breakers & Vitest suites.
   - **DraftForge**: Real-time multiplayer IPL Mega Auction simulator with sub-second bidding sync and PostgreSQL RPC transactions (`execute_bid`).
   - **Predictive Sales Analytics Engine**: MLOps machine learning pipeline predicting customer purchase behavior with strict temporal splits (scikit-learn, Random Forest).
   - **SaveSpace (TriCore-FS)**: Interactive educational file system simulator featuring disk allocation strategies (Contiguous, Linked, Indexed, FAT, Unix-style) & smart organizer.
6. **Single Source of Truth Architecture**: All portfolio metadata (about, experiences, featured projects, skills) is centrally managed in `src/lib/portfolio-data.ts`.

---

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx                # Main App Router layout & Theme Provider
│   ├── page.tsx                  # 2D Scroll-based Home page
│   ├── explore/                  # 3D Canvas / React Three Fiber experience
│   └── projects/                 # MDX Case Studies
│       ├── modelroute/
│       ├── ipl-auction-pro/
│       ├── predictive-sales-analytics/
│       └── tricore-fs/
├── components/
│   ├── navigation-header.tsx    # Header with mode switcher & command palette trigger
│   ├── command-palette.tsx       # Spotlight Cmd+K modal component
│   ├── ui/                       # Reusable UI primitives (Buttons, Cards, Spotlight, Badges)
│   └── sections/                 # Portfolio sections (Hero, About, Projects, Experience, Skills, Contact)
└── lib/
    ├── portfolio-data.ts         # Single Source of Truth for projects, skills & timeline
    └── github.ts                 # GitHub API fetching & ISR caching helper
```

---

## Setup & Local Development

### 1. Install Dependencies
Ensure you are running **Node.js v20+**, clone the repository, and run:

```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Production Verification
Validate TypeScript types, linting, and compile the static bundle:

```bash
npm run build
```

---

## How to Add or Update Content

### 1. Update Portfolio Data
Edit `src/lib/portfolio-data.ts` to add or modify projects, skills, academic background, or work experience. Both the 2D scroll view (`/`) and 3D world (`/explore`) automatically reflect changes made to this single source of truth.

### 2. Add a New Technical Case Study

#### Step A: Create the MDX File
Create a new directory and `page.mdx` file under `src/app/projects/`:
```bash
src/app/projects/my-new-project/page.mdx
```

#### Step B: Add Card Metadata
In `src/lib/portfolio-data.ts`, append your project to `PROJECTS_DATA`:
```typescript
{
  title: "My New Project Title",
  slug: "my-new-project",
  repoKey: "my-new-project",
  description: "Brief overview of the project.",
  longDescription: "Detailed technical summary of features and architecture.",
  tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  githubUrl: "https://github.com/cax6505/my-new-project",
  languageColor: "text-sky-500 dark:text-sky-400 bg-sky-500/10 border-sky-500/20",
  glowClass: "from-sky-500/10",
}
```

#### Step C: Fetch Repository Stats (Optional)
In `src/components/sections/projects.tsx`, add your repository name to the `Promise.all` fetch call:
```typescript
const stats = await getRepoStats("my-new-project");
```

---

## Deployment

This repository is optimized for deployment on **Vercel** with zero custom configuration.

1. Connect your GitHub repository to Vercel.
2. Select **Next.js** as the framework preset.
3. Click **Deploy**.

*Optional*: Set a `GITHUB_TOKEN` environment variable on Vercel to increase the GitHub API rate limit from 60 to 5,000 requests per hour for live repository statistics.
