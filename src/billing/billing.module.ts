import { Module } from '@nestjs/common';
import { BillController } from './billing.controller';
import { BillService } from './billing.service';
import { PrismaService } from 'src/Prisma/prisma.service';

@Module({
  controllers: [BillController],
  providers: [BillService, PrismaService],
})
export class BillingModule {}
