import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  findAll() {
    return this.stocksService.getStockData();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.getStockData(+id);
  }
}
