export interface RepoStats {
  stars: number;
  forks: number;
  language: string;
  url: string;
}

const FALLBACK_STATS: Record<string, RepoStats> = {
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
    url: "https://github.com/cax6505", // default fallback URL
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
  
  // Resolve actual repo identifier names
  let actualRepoName = repoName;
  if (repoSlug.includes("ipl")) {
    actualRepoName = "IPL-Auction-simulator"; // Make sure we query the exact repo name
  } else if (repoSlug.includes("sales") || repoSlug.includes("predictive")) {
    actualRepoName = "Predictive-Sales-Analytics-Engine";
  } else if (repoSlug.includes("tricore")) {
    actualRepoName = "TriCore-FS";
  }

  try {
    const res = await fetch(`https://api.github.com/repos/cax6505/${actualRepoName}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour in Next.js RSC
      headers: {
        "User-Agent": "cax6505-portfolio",
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      console.warn(`GitHub API failed for repo ${actualRepoName}. Using fallback stats.`);
      const fallbackKey = repoSlug.includes("ipl")
        ? "ipl-auction-pro"
        : repoSlug.includes("tricore")
          ? "tricore-fs"
          : "sales-analytics";
      return FALLBACK_STATS[fallbackKey];
    }

    const data = await res.json();
    return {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      language: data.language || "TypeScript",
      url: data.html_url || `https://github.com/cax6505/${actualRepoName}`,
    };
  } catch (error) {
    console.error(`Error fetching stats for ${repoName}:`, error);
    const fallbackKey = repoSlug.includes("ipl")
      ? "ipl-auction-pro"
      : repoSlug.includes("tricore")
        ? "tricore-fs"
        : "sales-analytics";
    return FALLBACK_STATS[fallbackKey];
  }
}
