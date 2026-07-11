"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  User,
  Terminal,
  Layers,
  Award,
  Clock,
  ExternalLink,
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const scrollToSection = (id: string) => {
    runCommand(() => {
      // Check if we are on the main page
      if (window.location.pathname !== "/") {
        router.push(`/#${id}`);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => scrollToSection("hero")}>
              <User className="mr-2 h-4 w-4" />
              <span>Hero / Intro</span>
              <CommandShortcut>#hero</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => scrollToSection("about")}>
              <User className="mr-2 h-4 w-4" />
              <span>About Me</span>
              <CommandShortcut>#about</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => scrollToSection("experience")}>
              <Clock className="mr-2 h-4 w-4" />
              <span>Work Experience</span>
              <CommandShortcut>#experience</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => scrollToSection("projects")}>
              <Terminal className="mr-2 h-4 w-4" />
              <span>Projects Portfolio</span>
              <CommandShortcut>#projects</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => scrollToSection("skills")}>
              <Layers className="mr-2 h-4 w-4" />
              <span>Skills Category</span>
              <CommandShortcut>#skills</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => scrollToSection("achievements")}>
              <Award className="mr-2 h-4 w-4" />
              <span>Achievements</span>
              <CommandShortcut>#achievements</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => scrollToSection("contact")}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Get In Touch</span>
              <CommandShortcut>#contact</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Project Case Studies">
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/projects/ipl-auction-pro"))
              }
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>IPL Auction Pro (Case Study)</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  router.push("/projects/predictive-sales-analytics")
                )
              }
            >
              <FileText className="mr-2 h-4 w-4" />
              <span>Predictive Sales Analytics (Case Study)</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="System Preferences">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Switch to Light Theme</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Switch to Dark Theme</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Connect / Socials">
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  window.open("https://github.com/cax6505", "_blank")
                )
              }
            >
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub Profile</span>
              <ExternalLink className="ml-auto h-3 w-3 text-zinc-400" />
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  window.open("https://linkedin.com/in/charank6505", "_blank")
                )
              }
            >
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn Profile</span>
              <ExternalLink className="ml-auto h-3 w-3 text-zinc-400" />
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  window.open("mailto:kolli.c23csai@nst.rishihood.edu.in")
                )
              }
            >
              <Mail className="mr-2 h-4 w-4" />
              <span>Send an Email</span>
              <ExternalLink className="ml-auto h-3 w-3 text-zinc-400" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
export default CommandPalette;
