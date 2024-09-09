import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiService } from './api.service';
import { CacheService } from 'src/redis/cache.service';

@Injectable()
export class StocksService {
  constructor(
    private httpService: HttpService,
    private readonly apiService: ApiService,
    private readonly cacheService: CacheService,
  ) {}

  async getDailySectorData(symbol: string, period: string): Promise<any> {
    const key = `sector:${symbol}:${period}`;
    const cachedData = await this.cacheService.get(key);
    if (cachedData) {
      return cachedData;
    }

    const data = await this.apiService.getDailySectorPerformances(
      symbol,
      period,
    );
    await this.cacheService.set(key, data, 60);
    return data;
  }

  async getDailyMarketData(symbol: string, period: string): Promise<any> {
    const key = `market:${symbol}:${period}`;
    const cachedData = await this.cacheService.get(key);
    if (cachedData) {
      return cachedData;
    }

    const data = await this.apiService.getDailyMarketPerformances(
      symbol,
      period,
    );
    await this.cacheService.set(key, data, 60);
    return data;
  }
}
