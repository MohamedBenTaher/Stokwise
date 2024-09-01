import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MarketNewsService } from './market-news.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('market-news')
@Controller('market-news')
export class MarketNewsController {
  constructor(private readonly marketNewsService: MarketNewsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get daily market news' })
  @ApiResponse({ status: 200, description: 'Successful response' })
  @ApiResponse({ status: 503, description: 'No news available' })
  async getMarketNews() {
    const news = this.marketNewsService.getDailyMarketNews();
    if (!news) {
      throw new HttpException(
        'No news available',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return news;
  }
}
