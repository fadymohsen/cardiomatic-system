import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { MedicalRecord } from '@prisma/client';
import { CreateMedicalRecordDto } from './dtos/MedicalRecord.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMedicalRecordDto): Promise<MedicalRecord> {
    const {
      date,
      diseases,
      allergies,
      smokingStatus,
      alcoholIntake,
      doctorId,
      scheduledAt,
      userId,
      patientId,
    } = data;

    // Verify that the patient exists
    const patientExists = await this.prisma.patient.findUnique({
      where: { patientId: patientId },
    });

    if (!patientExists) {
      throw new Error(`Patient with id ${patientId} does not exist`);
    }

    return this.prisma.medicalRecord.create({
      data: {
        date: new Date(date),
        diseases,
        allergies,
        smokingStatus,
        alcoholIntake,
        doctor: { connect: { pcpId: doctorId } },
        scheduledAt: new Date(scheduledAt),
        user: userId ? { connect: { userId } } : undefined,
        Patient: { connect: { patientId: patientId } }, // Correct the relationship connection here
      },
    });
  }

  async findAll(): Promise<MedicalRecord[]> {
    return this.prisma.medicalRecord.findMany();
  }

  async findOne(id: string): Promise<MedicalRecord | null> {
    return this.prisma.medicalRecord.findUnique({
      where: { id },
    });
  }

  async remove(id: string): Promise<MedicalRecord> {
    return this.prisma.medicalRecord.delete({
      where: { id },
    });
  }
}
