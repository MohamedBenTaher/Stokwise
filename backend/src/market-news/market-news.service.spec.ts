import { Test, TestingModule } from '@nestjs/testing';
import { MarketNewsService } from './market-news.service';

describe('MarketNewsService', () => {
  let service: MarketNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketNewsService],
    }).compile();

    service = module.get<MarketNewsService>(MarketNewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
