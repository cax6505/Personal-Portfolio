"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NavigationHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/projects")) {
      return;
    }

    const handleScroll = () => {
      const sections = ["about", "experience", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      if (window.scrollY < 100) {
        setActiveSection("hero");
        return;
      }

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const currentActiveSection = pathname.startsWith("/projects") ? "projects" : activeSection;

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const navItems = [
    { label: "About", href: "/#about", id: "about" },
    { label: "Experience", href: "/#experience", id: "experience" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "Skills", href: "/#skills", id: "skills" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-30 w-fit rounded-full border border-zinc-300/60 dark:border-white/15 bg-white/75 dark:bg-white/[0.08] backdrop-blur-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.2)] transition-all duration-300">
        <div className="px-4 md:px-6 h-14 flex items-center gap-4 md:gap-6">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center size-9 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100/80 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/80 dark:hover:bg-white/[0.08] transition-all duration-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = currentActiveSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`hover-trigger transition-all duration-300 relative py-1 px-1.5 rounded-md ${
                    isActive
                      ? "text-zinc-950 dark:text-zinc-50 font-bold"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 font-medium"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1.5 right-1.5 h-0.5 rounded-full bg-violet-500 dark:bg-violet-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Command Palette Trigger Button (Keyboard Hint) */}
          <button
            onClick={handleOpenSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/5 bg-zinc-100/80 dark:bg-white/[0.02] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 text-[10px] font-mono hover-trigger transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
            aria-label="Search or type a command"
          >
            <Search className="size-3 text-zinc-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800/80 text-[8px] font-sans">⌘K</kbd>
          </button>

          <div className="hidden md:block h-5 w-px bg-zinc-300 dark:bg-zinc-800" />

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-20 bg-black/20 dark:bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.nav
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 left-4 right-4 z-25 md:hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
            >
              <div className="py-3 px-2">
                {navItems.map((item, index) => {
                  const isActive = currentActiveSection === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800 font-semibold"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }`}
                      >
                        {isActive && (
                          <span className="w-1 h-4 rounded-full bg-violet-500 dark:bg-violet-400" />
                        )}
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavigationHeader;
