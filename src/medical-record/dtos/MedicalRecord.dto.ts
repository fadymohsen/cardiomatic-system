import {
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { PrescriptionDto } from 'src/prescription/dtos/prescription.dto';

export class MedicalRecordDto {
  constructor(private prescriptionDto: PrescriptionDto) {}

  @IsUUID()
  recordId: string;

  @IsString()
  patientId: string;

  @IsString()
  physicianId: string;

  @IsDateString()
  date: Date;

  @IsString()
  symptoms: string;

  @IsString()
  allergies: string;

  @IsString()
  currentSmokingStatus: string;

  @IsBoolean()
  alcoholIntake: boolean;

  @IsString()
  diagnosis: string;

  @IsString()
  treatmentPlan: string;

  @IsOptional()
  prescriptions: PrescriptionDto[];

  // Assuming Diagnosis, Test, and Treatment are similar DTOs, adjust the import paths and types accordingly
  @IsOptional()
  diagnoses: any[];

  @IsOptional()
  tests: any[];

  @IsOptional()
  treatments: any[];
}
