# Personal Portfolio Website — Kolli Charan Adithya

A premium, high-performance, and typography-led personal portfolio website built for a Computer Science + AI student/developer. The design features a dark-mode default theme, custom cursor tracking, command palette search shortcuts, and real-time GitHub integration.

---

## Technical Stack
*   **Framework**: Next.js 15+ (App Router, Server Components)
*   **Styling**: Tailwind CSS v4 (CSS-first configurations)
*   **Components**: Radix-based custom primitives via shadcn/ui
*   **Animations**: Motion (Framer Motion)
*   **Markdown Support**: `@next/mdx` for case studies

---

## Core Features
1.  **Command Palette (`⌘K` or `Ctrl+K`)**: Fast Spotlight search allowing users to instantly scroll to sections or navigate to case studies.
2.  **Custom Cursor**: A delicate trailing ring that scales and applies a difference-blend inversion when hovering over interactive elements.
3.  **Live GitHub Integration**: Server-side caching (`revalidate: 3600`) of repository stats (stars, forks, language) with automatic fail-safes.
4.  **Case Studies (MDX)**: Rich, readable project reports written in Markdown.

---

## Setup & Local Development

### 1. Install Dependencies
Clone the repository, ensure you are running Node.js v20+, and run:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Test Production Bundle
Validate types, linting, and compile the static pages:
```bash
npm run build
```

---

## How to Add a New Project Case Study

To add a new project case study page, follow these 3 steps:

### Step A: Create the MDX File
Create a new folder and a `page.mdx` file under `src/app/projects/`:
```bash
src/app/projects/my-new-project/page.mdx
```
Write your content using standard Markdown. You can import custom React components or use mermaid diagrams directly in your MDX file.

### Step B: Add Card Data to the UI
Open `src/components/sections/projects-client.tsx` and append your project to the `projects` array:
```typescript
{
  title: "My New Project Title",
  slug: "my-new-project", // Matches the folder name
  repoKey: "my-new-project",
  description: "Brief overview of the project.",
  longDescription: "Detailed technical summary of features and tech choices.",
  tech: ["React", "TypeScript", "Vercel"],
  githubUrl: "https://github.com/cax6505/my-new-project",
}
```

### Step C: Fetch Repository Stats (Optional)
Open `src/components/sections/projects.tsx` and add your repository name to the Parallel Fetch call:
```typescript
const [iplStats, salesStats, newStats] = await Promise.all([
  getRepoStats("ipl-auction-pro"),
  getRepoStats("sales-analytics"),
  getRepoStats("my-new-project"), // Add yours here
]);
```
Pass the returned stats in the `initialStats` object. (If you don't fetch stats, the client component will fall back to using default data automatically).

---

## Deployment to Vercel

This project is fully optimized for **Vercel** with zero configuration required.

1.  Connect your GitHub repository to Vercel.
2.  Select **Next.js** as the framework preset.
3.  Click **Deploy**.

*Optional*: If you face GitHub API rate limits (60 requests/hour unauthenticated), you can set a `GITHUB_TOKEN` environment variable on Vercel to increase the rate limit. The codebase is engineered to catch fetch errors and degrade gracefully, so builds will never fail if the API is offline.
