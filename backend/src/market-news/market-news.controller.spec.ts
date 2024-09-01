import { Test, TestingModule } from '@nestjs/testing';
import { MarketNewsController } from './market-news.controller';

describe('MarketNewsController', () => {
  let controller: MarketNewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketNewsController],
    }).compile();

    controller = module.get<MarketNewsController>(MarketNewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
