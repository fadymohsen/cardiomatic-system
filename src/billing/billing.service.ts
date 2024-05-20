import { Injectable, NotFoundException } from '@nestjs/common';
import { BillDto } from './dtos/Billing.dto';
import { PrismaService } from 'src/Prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BillService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BillCreateInput) {
    return this.prisma.bill.create({ data });
  }

  async findAll(): Promise<BillDto[]> {
    return this.prisma.bill.findMany();
  }

  async getBillById(billId: string) {
    const bill = await this.prisma.bill.findUnique({
      where: { billId },
    });
    if (!bill) {
      throw new NotFoundException('bill not found');
    }
    return bill;
  }

  async delete(billId: string) {
    await this.getBillById(billId);
    return this.prisma.bill.delete({
      where: { billId },
    });
  }
}
