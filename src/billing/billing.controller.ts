import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { BillService } from './billing.service';
import { Prisma } from '@prisma/client';

@Controller('bills')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  findAll() {
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
