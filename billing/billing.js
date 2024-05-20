model Patient {
  patientId    String    @id @default(uuid())
  name         String
  email        String    @unique
  phone        String
   //################################ start
   bills        Bill[]
   //##################################  end
}
//################################ start
model Bill {
  billId      String    @id @default(uuid())
  amount      Float
  dueDate     DateTime
  status      String    @default("unpaid")
  patient     Patient   @relation(fields: [patientId], references: [patientId])
  patientId   String
  payments    Payment[]
}

model Payment {
  paymentId    String          @id @default(uuid())
  amount       Float
  date         DateTime        @default(now())
  method       PaymentMethod
  status       String          @default("unpaid")
  creditNumber String?
  creditPassword String?
  bill         Bill            @relation(fields: [billId], references: [billId])
  billId       String
}

enum PaymentMethod {
  CASH
  CREDIT_CARD
}
//##################################  end

//{billing service}
//################################################################
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Bill, Payment, PaymentMethod } from '@prisma/client';

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {}

  async createBill(patientId: string, amount: number, dueDate: Date): Promise<Bill> {
    return this.prisma.bill.create({
      data: {
        patientId,
        amount,
        dueDate,
      },
    });
  }

  async getBill(billId: string): Promise<Bill> {
    return this.prisma.bill.findUnique({
      where: { billId },
      include: { payments: true },
    });
  }

  async payBill(billId: string, amount: number, method: PaymentMethod, creditNumber?: string, creditPassword?: string): Promise<Payment> {
    const payment = await this.prisma.payment.create({
      data: {
        billId,
        amount,
        method,
        creditNumber: method === PaymentMethod.CREDIT_CARD ? creditNumber : null,
        creditPassword: method === PaymentMethod.CREDIT_CARD ? creditPassword : null,
        status: 'paid'
      },
    });

    // Update bill status if fully paid
    const bill = await this.getBill(billId);
    const totalPaid = bill.payments.reduce((sum, payment) => sum + payment.amount, 0) + amount;

    if (totalPaid >= bill.amount) {
      await this.prisma.bill.update({
        where: { billId },
        data: { status: 'paid' },
      });
    }

    return payment;
  }
}
//###################################################

//{billing controlling}



import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { PaymentMethod } from '@prisma/client';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('create')
  async createBill(
    @Body('patientId') patientId: string,
    @Body('amount') amount: number,
    @Body('dueDate') dueDate: Date,
  ) {
    return this.billingService.createBill(patientId, amount, dueDate);
  }

  @Get(':billId')
  async getBill(@Param('billId') billId: string) {
    return this.billingService.getBill(billId);
  }

  @Post('pay/:billId')
  async payBill(
    @Param('billId') billId: string,
    @Body('amount') amount: number,
    @Body('method') method: PaymentMethod,
    @Body('creditNumber') creditNumber?: string,
    @Body('creditPassword') creditPassword?: string,
  ) {
    return this.billingService.payBill(billId, amount, method, creditNumber, creditPassword);
  }
}

//###################################################


//{update prisma service}


import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

//###################################################


//{update app module}

import { Module } from '@nestjs/common';
import { BillingModule } from './billing/billing.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [BillingModule],
  providers: [PrismaService],
})
export class AppModule {}

//###################################################