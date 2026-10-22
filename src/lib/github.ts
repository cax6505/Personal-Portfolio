export interface RepoStats {
  stars: number;
  forks: number;
  language: string;
  url: string;
}

const FALLBACK_STATS: Record<string, RepoStats> = {
  "modelroute": {
    stars: 1,
    forks: 0,
    language: "TypeScript",
    url: "https://github.com/cax6505/ModelRoute",
  },
  "ipl-auction-pro": {
    stars: 8,
    forks: 3,
    language: "TypeScript",
    url: "https://github.com/cax6505/IPL-Auction-simulator", // or a default URL
  },
  "sales-analytics": {
    stars: 5,
    forks: 1,
    language: "Python",
    url: "https://github.com/cax6505/Predictive-Sales-Analytics-Engine",
  },
  "tricore-fs": {
    stars: 0,
    forks: 0,
    language: "TypeScript",
    url: "https://github.com/cax6505/TriCore-FS",
  },
};

export async function getRepoStats(repoName: string): Promise<RepoStats> {
  const repoSlug = repoName.toLowerCase();
  const fallbackKey = repoSlug.includes("modelroute")
    ? "modelroute"
    : repoSlug.includes("ipl")
      ? "ipl-auction-pro"
      : repoSlug.includes("tricore")
        ? "tricore-fs"
        : "sales-analytics";

  // Repository language and links are stable portfolio content. Avoid making
  // production rendering depend on a live GitHub API response.
  return FALLBACK_STATS[fallbackKey];
}
