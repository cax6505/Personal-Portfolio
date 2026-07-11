"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setFeedback("Please fill out all fields.");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim().replace(/['"]/g, "");

    if (!accessKey) {
      console.warn("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is missing or empty.");
      // Fallback/Simulated Mode
      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setFeedback("Demo Mode: Message simulated! Configure NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local to send real emails.");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message via Web3Forms.");
      }

      setStatus("success");
      setFeedback(data.message || "Thank you! Your message was sent successfully.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      const errorMessage = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setFeedback(errorMessage);
    }
  };

  return (
    <section id="contact" className="py-28 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto max-w-4xl px-4"
      >
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 dark:bg-gradient-to-b dark:from-white dark:via-zinc-100 dark:to-zinc-600 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-zinc-400 dark:bg-zinc-700 mx-auto mt-4 rounded-full"
          />
          <p className="text-zinc-500 dark:text-zinc-400 mt-6 text-base md:text-lg leading-relaxed font-normal">
            Have a project in mind, a collaboration inquiry, or just want to say hi? Drop me a message!
          </p>
        </div>

        {/* Contact Form Wrapper */}
        <Card className="relative overflow-hidden max-w-2xl mx-auto rounded-2xl border border-zinc-200/10 dark:border-white/5 bg-zinc-100/50 dark:bg-[#121214]/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300">
          
          {/* Specular Highlight accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-indigo-500/0" />

          <CardContent className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono tracking-wider uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono tracking-wider uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono tracking-wider uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                  MESSAGE
                  </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300/50 dark:border-white/5 bg-white/50 dark:bg-white/[0.02] text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10 transition-all duration-300 resize-none"
                />
              </div>

              {/* Feedback messages */}
              <div className="space-y-4 pt-2">
                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full group bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-zinc-50 dark:text-zinc-950 font-semibold py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01]"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      <span>Sending...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Send Message</span>
                    </span>
                  )}
                </Button>

                {/* Status Banners */}
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm border border-emerald-500/20"
                    >
                      <CheckCircle2 className="size-4 shrink-0" />
                      <span>{feedback}</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive dark:text-destructive rounded-xl text-sm border border-destructive/20"
                    >
                      <AlertCircle className="size-4 shrink-0" />
                      <span>{feedback}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
export default Contact;
