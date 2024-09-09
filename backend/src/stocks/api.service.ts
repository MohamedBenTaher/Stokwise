import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  async getDailySectorPerformances(
    symbol: string,
    period: string,
  ): Promise<any> {
    // Implement API call to Alpha Vantage
    // Return the data
  }
  async getDailyMarketPerformances(
    symbol: string,
    period: string,
  ): Promise<any> {
    // Implement API call to Alpha Vantage
    // Return the data
  }
}
