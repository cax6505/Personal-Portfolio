import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Linkedin, Mail } from "lucide-react";
import "./globals.css";
import Link from "next/link";
import { AuroraBackground } from "@/components/ui/aurora-background";

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const displayFont = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kolli Charan Adithya | Frontend Engineer & AI/ML Developer",
  description:
    "Portfolio of Kolli Charan Adithya, a B.Tech Computer Science & AI student and developer specialized in frontend engineering, React/Next.js platforms, and machine learning pipelines.",
  keywords: [
    "Kolli Charan Adithya",
    "Frontend Engineer",
    "AI/ML Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Computer Science Student",
  ],
  authors: [{ name: "Kolli Charan Adithya" }],
  creator: "Kolli Charan Adithya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cax6505.vercel.app",
    title: "Kolli Charan Adithya | Frontend Engineer & AI/ML Developer",
    description:
      "B.Tech CS & AI developer with frontend internship experience at IIT Roorkee and ML expertise from Amazon ML Summer School.",
    siteName: "Kolli Charan Adithya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kolli Charan Adithya | Frontend Engineer & AI/ML Developer",
    description:
      "B.Tech CS & AI developer with frontend internship experience at IIT Roorkee and ML expertise from Amazon ML Summer School.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${displayFont.variable} font-sans`}
    >
      <body className="relative min-h-screen bg-background text-foreground antialiased flex flex-col selection:bg-zinc-200 dark:selection:bg-zinc-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Command Palette search trigger */}
          <CommandPalette />

          {/* Navigation Header */}
          <header className="fixed top-4 left-1/2 -translate-x-1/2 z-30 w-fit rounded-full border border-zinc-200/10 dark:border-white/15 bg-zinc-100/70 dark:bg-white/[0.08] backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.15)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-300">
            <div className="px-6 h-14 flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <Link href="/#about" className="hover:text-zinc-900 dark:hover:text-zinc-100 hover-trigger transition-colors">
                  About
                </Link>
                <Link href="/#experience" className="hover:text-zinc-900 dark:hover:text-zinc-100 hover-trigger transition-colors">
                  Experience
                </Link>
                <Link href="/#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 hover-trigger transition-colors">
                  Projects
                </Link>
                <Link href="/#skills" className="hover:text-zinc-900 dark:hover:text-zinc-100 hover-trigger transition-colors">
                  Skills
                </Link>
                <Link href="/#contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 hover-trigger transition-colors">
                  Contact
                </Link>
              </nav>

              <div className="hidden md:block h-5 w-px bg-zinc-200 dark:bg-zinc-800" />

              <div className="flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main page space */}
          <main className="relative flex-1 w-full bg-background overflow-hidden transition-colors duration-300">
            {/* Spotlight Glow from Top */}
            <div className="bg-spotlight-glow" />

            {/* Tactile Grain Overlay */}
            <div className="bg-grain" />

            {/* Background Beams and Grid System (Aceternity UI) */}
            <AuroraBackground />

            {children}
          </main>

          {/* Footer */}
          <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 py-8 bg-zinc-50 dark:bg-zinc-950/60 transition-colors">
            <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <div>
                <p>© {new Date().getFullYear()} Kolli Charan Adithya. All rights reserved.</p>
                <p className="text-xs text-zinc-400 mt-1">Designed & engineered with Next.js 15 + Tailwind CSS v4</p>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="mailto:kolli.c23csai@nst.rishihood.edu.in"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 hover-trigger flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="size-3.5" />
                  <span>Email</span>
                </a>
                <a
                  href="https://github.com/cax6505"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 hover-trigger flex items-center gap-1.5 transition-colors"
                >
                  <Github className="size-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/charank6505"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100 hover-trigger flex items-center gap-1.5 transition-colors"
                >
                  <Linkedin className="size-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
