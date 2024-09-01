type MarketNewsArticle = {
  id: string;
  title: string;
  summary: string;
  url: string;
  imageUrl: string;
  date: string;
};

type IndustryNews = {
  articles: MarketNewsArticle[];
  averageSentiment: number;
};

export type MarketNewsByIndustry = Record<string, IndustryNews>;

export type MarketNews = {
  marketNewsByIndustry: MarketNewsByIndustry;
  overallAverageSentiment: number;
};
