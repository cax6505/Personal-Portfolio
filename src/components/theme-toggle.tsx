"use client";

import * as React from "react";
import { SunDim, MoonStar } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="size-9 rounded-full border border-zinc-200 dark:border-zinc-800"
        aria-label="Toggle Theme"
      >
        <div className="size-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9 rounded-full border border-zinc-200 dark:border-zinc-800 hover-trigger hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative overflow-hidden"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ y: -12, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 12, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <SunDim className="size-4.5 text-amber-500" />
          ) : (
            <MoonStar className="size-4.5 text-zinc-900" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}
export default ThemeToggle;
