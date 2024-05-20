import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { BillService } from './billing.service';
import { BillDto } from './dtos/Billing.dto';
import { Prisma } from '@prisma/client';

@Controller('bills')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BillDto> {
    return this.billService.getBillById(id);
  }

  @Get()
  findAll(): Promise<BillDto[]> {
    return this.billService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.billService.delete(id);
  }

  @Post()
  async create(@Body() data: Prisma.BillCreateInput) {
    return this.billService.create(data);
  }
}
