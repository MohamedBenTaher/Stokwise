import { Injectable, HttpException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { config } from 'dotenv';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { Cron } from '@nestjs/schedule';
import { MarketNews, MarketNewsByIndustry } from './dto/market-news.dto';
config({ path: path.resolve(__dirname, '../../.env') });

@Injectable()
export class MarketNewsService {
  private readonly logger = new Logger(MarketNewsService.name);
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private cachedNews: any = null;

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {
    const thirdPartyConfig = this.configService.get('thirdParty');
    if (!thirdPartyConfig || !thirdPartyConfig.market) {
      throw new Error('MarketNewsConfig is not defined in configuration.');
    }
    this.apiKey = thirdPartyConfig.market.apiKey;
    this.apiUrl = thirdPartyConfig.market.apiUri;

    this.logger.log(`API Key: ${this.apiKey}`);
    this.logger.log(`API URL: ${this.apiUrl}`);
  }

  async fetchMarketNews(): Promise<any> {
    const params = {
      countries: 'us',
      limit: 3,
      language: 'en',
      api_token: this.apiKey,
    };
    const url = `${this.apiUrl}?countries=${params.countries}&limit=${params.limit}&api_token=${params.api_token}`;

    this.logger.log(`Calling URL: ${url}`);

    try {
      const response = await firstValueFrom(
        this.httpService.get(this.apiUrl, { params }),
      );
      if (!response.data || response.data.length === 0) {
        throw new HttpException('No news available', 503);
      }
      return response.data; // Extract and return only the data
    } catch (error) {
      this.logger.error(`Error calling URL: ${url}`, error.message);
      this.logger.error(error.stack);
      throw new HttpException('Failed to fetch market news', 500);
    }
  }

  @Cron('0 0 * * * *')
  async updateDailyMarketNews() {
    this.logger.log('Updating daily market news...');
    try {
      const response = await this.fetchMarketNews();
      this.cachedNews = this.mapData(response.data);
      this.logger.log('Market news updated successfully.');
    } catch (error) {
      this.logger.error('Failed to update market news.', error.message);
    }
  }

  // Get the cached news
  async getDailyMarketNews(): Promise<any> {
    if (!this.cachedNews) {
      this.logger.log('No cached news available, fetching new data...');
      try {
        const response = await this.fetchMarketNews();
        this.cachedNews = this.mapData(response.data);
      } catch (error) {
        this.logger.error('Failed to fetch market news.', error.message);
        throw new HttpException('Failed to fetch market news', 500);
      }
    }
    return this.cachedNews;
  }

  mapData(data: any[]): MarketNews {
    const industryData: MarketNewsByIndustry = {};
    let totalAvgSentiment = 0;
    let industryCount = 0;

    data.forEach((item) => {
      item.entities.forEach((entity) => {
        const industry = entity.industry;
        const sentiment = entity.sentiment_score;

        if (!industryData[industry]) {
          industryData[industry] = {
            articles: [],
            averageSentiment: 0,
          };
        }

        const article = {
          id: item.uuid,
          title: item.title,
          summary: item.description,
          url: item.url,
          imageUrl: item.image_url,
          date: item.published_at,
        };

        industryData[industry].articles.push(article);
        industryData[industry].averageSentiment += sentiment;
      });
    });

    for (const industry in industryData) {
      const industryInfo = industryData[industry];
      if (industryInfo.averageSentiment > 0) {
        industryInfo.averageSentiment /= industryInfo.articles.length;
        totalAvgSentiment += industryInfo.averageSentiment;
        industryCount += 1;
      }
    }

    const overallAverageSentiment = totalAvgSentiment / industryCount;

    return {
      marketNewsByIndustry: industryData,
      overallAverageSentiment,
    };
  }
}
