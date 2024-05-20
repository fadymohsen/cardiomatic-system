import { Module } from '@nestjs/common';
import { MedicalRecordController } from './medical-record.controller';
import { MedicalRecordsService } from './medical-record.service';
import { PrismaService } from 'src/Prisma/prisma.service';

@Module({
  controllers: [MedicalRecordController],
  providers: [MedicalRecordsService, PrismaService],
})
export class MedicalRecordsModule {}
