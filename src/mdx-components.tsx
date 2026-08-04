import type { MDXComponents } from "mdx/types";
import React from "react";
import { AuctionSimulator } from "@/components/widgets/auction-simulator";
import { SalesForecastPlayground } from "@/components/widgets/sales-forecast-playground";
import { ModelRouterVisualizer } from "@/components/widgets/model-router-visualizer";
import { FsTopologyVisualizer } from "@/components/widgets/fs-topology-visualizer";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    AuctionSimulator,
    SalesForecastPlayground,
    ModelRouterVisualizer,
    FsTopologyVisualizer,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-8 mb-4 font-display">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mt-6 mb-3 font-display">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mt-4 mb-2 font-display">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-base">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic text-zinc-500 dark:text-zinc-500 my-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto my-6 font-mono text-sm border border-zinc-800">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4 hover:decoration-zinc-900 dark:hover:decoration-zinc-100 transition-colors font-medium hover-trigger"
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="my-6 w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-100/80 dark:bg-zinc-900/80 text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 bg-white/50 dark:bg-zinc-950/40">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="px-4 py-3 text-sm">{children}</td>,
    ...components,
  };
}
