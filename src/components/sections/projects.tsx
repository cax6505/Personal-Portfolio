import React from "react";
import { ProjectsClient } from "./projects-client";
import { getRepoStats } from "@/lib/github";

export async function Projects() {
  // Parallel fetch using Promise.all
  const [modelrouteStats, iplStats, salesStats, tricoreStats] = await Promise.all([
    getRepoStats("modelroute"),
    getRepoStats("ipl-auction-pro"),
    getRepoStats("sales-analytics"),
    getRepoStats("tricore-fs"),
  ]);

  const initialStats = {
    modelroute: modelrouteStats,
    ipl: iplStats,
    sales: salesStats,
    tricore: tricoreStats,
  };

  return <ProjectsClient initialStats={initialStats} />;
}
export default Projects;
