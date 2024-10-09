import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { Role } from 'lib/auth/decorators/role.decorator';
import { ROLE_NAMES } from 'lib/constants';
import { DealService } from './deal.service';
import { Deal, UpdateDto } from './dto/deal.dto';

@Controller('/deals')
@Role(ROLE_NAMES.MERCHANT, ROLE_NAMES.USER)
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get('/')
  getDeals() {
    return this.dealService.getAll();
  }

  @Get('/:id')
  getDeal(@Param('id') id: string) {
    return this.dealService.getById(id);
  }

  @Post('/create')
  createDeal(@Body() deal: Deal) {
    return this.dealService.create(deal);
  }

  @Put('/update')
  updateDeal(@Query() { id }, @Body() deal: UpdateDto) {
    return this.dealService.update(id, deal);
  }
}
