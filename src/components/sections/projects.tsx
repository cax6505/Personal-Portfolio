import React from "react";
import { ProjectsClient } from "./projects-client";
import { getRepoStats } from "@/lib/github";

export async function Projects() {
  // Parallel fetch using Promise.all
  const [iplStats, salesStats, tricoreStats] = await Promise.all([
    getRepoStats("ipl-auction-pro"),
    getRepoStats("sales-analytics"),
    getRepoStats("tricore-fs"),
  ]);

  const initialStats = {
    ipl: iplStats,
    sales: salesStats,
    tricore: tricoreStats,
  };

  return <ProjectsClient initialStats={initialStats} />;
}
export default Projects;
