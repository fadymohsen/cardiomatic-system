import { Module } from '@nestjs/common';
import { PrescriptionController } from './prescription.controller';
import { PrescriptionService } from './prescription.service';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path if needed

@Module({
  controllers: [PrescriptionController],
  providers: [PrescriptionService, PrismaService],
})
export class PrescriptionModule {}
