import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MarketNewsService } from './market-news.service';
import { MarketNewsController } from './market-news.controller';

@Module({
  imports: [HttpModule],
  providers: [MarketNewsService],
  controllers: [MarketNewsController],
})
export class MarketNewsModule {}
