import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { AppointmentsController } from './appointment.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PrismaService],
})
export class AppointmentsModule {}
