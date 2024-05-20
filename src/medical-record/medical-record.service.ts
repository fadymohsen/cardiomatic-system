import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MedicalRecordDto } from './dtos/MedicalRecord.dto';
import { MedicalRecord, Prisma } from '@prisma/client';

@Injectable()
export class MedicalRecordService {
  constructor(private prisma: PrismaService) {}

  async createMedicalRecord(data: MedicalRecordDto): Promise<MedicalRecord> {
    try {
      const medicalRecordData: Prisma.MedicalRecordCreateInput = {
        patient: { connect: { patientId: data.patientId } },
        pcp: { connect: { pcpId: data.pcpId } },
        date: data.date,
        symptoms: data.symptoms,
        allergies: data.allergies,
        currentSmokingStatus: data.currentSmokingStatus,
        alcoholIntake: data.alcoholIntake,
        diagnosis: data.diagnosis,
        treatmentPlan: data.treatmentPlan,
        prescriptions: {
          connect:
            data.prescriptions?.map((id) => ({ prescriptionId: id })) || [],
        },
        diagnoses: {
          connect: data.diagnoses?.map((id) => ({ diagnosisId: id })) || [],
        },
        tests: {
          connect: data.tests?.map((id) => ({ testId: id })) || [],
        },
        treatments: {
          connect: data.treatments?.map((id) => ({ treatmentId: id })) || [],
        },
      };

      return await this.prisma.medicalRecord.create({
        data: medicalRecordData,
      });
    } catch (error) {
      console.error('Error creating medical record:', error);
      throw new HttpException('Error creating medical record.', 500);
    }
  }

  async getMedicalRecords(): Promise<MedicalRecord[]> {
    return this.prisma.medicalRecord.findMany();
  }

  async getMedicalRecordById(recordId: string): Promise<MedicalRecord | null> {
    return this.prisma.medicalRecord.findUnique({
      where: { recordId },
    });
  }

  async deleteMedicalRecordById(recordId: string): Promise<void> {
    const findMedicalRecord = await this.getMedicalRecordById(recordId);
    if (!findMedicalRecord)
      throw new HttpException(
        'Medical record not found.',
        HttpStatus.NOT_FOUND,
      );
    await this.prisma.medicalRecord.delete({ where: { recordId } });
  }
}
