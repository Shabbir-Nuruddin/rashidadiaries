import raw from "../data/reels.json";

export type Brand = {
  name: string;
  category: string;
  reels: number;
  views: number;
  likes: number;
};

export type Reel = {
  shortCode: string;
  url: string;
  thumb: string | null;
  views: number;
  likes: number;
  comments: number;
  brand: string | null;
  hook: string;
  caption: string;
};

export type SiteData = {
  meta: {
    generatedAt: string;
    handle: string;
    creator: string;
    reelCount: number;
    firstPost: string;
    lastPost: string;
  };
  stats: {
    followers: number;
    posts: number;
    reach: number;
    totalViews: number;
    topViews: number;
    totalLikes: number;
    millionReels: number;
    avgEngagementPct: number;
    brandCount: number;
    reelCount: number;
  };
  brands: Brand[];
  caseStudy: Brand | null;
  featured: Reel[];
};

export const data = raw as SiteData;
