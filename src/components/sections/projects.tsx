import React from "react";
import { ProjectsClient } from "./projects-client";
import { getRepoStats } from "@/lib/github";

export async function Projects() {
  // Parallel fetch using Promise.all
  const [iplStats, salesStats] = await Promise.all([
    getRepoStats("ipl-auction-pro"),
    getRepoStats("sales-analytics"),
  ]);

  const initialStats = {
    ipl: iplStats,
    sales: salesStats,
  };

  return <ProjectsClient initialStats={initialStats} />;
}
export default Projects;
