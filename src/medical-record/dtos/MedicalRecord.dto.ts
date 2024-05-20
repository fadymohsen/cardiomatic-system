import {
  IsString,
  IsBoolean,
  IsDateString,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { PrescriptionDto } from 'src/prescription/dtos/prescription.dto';
import { DiagnosisDto } from 'src/diagnosis/dtos/Diagnosis.dto';
import { TestDto } from 'src/test/dtos/Test.dto';
import { TreatmentDto } from 'src/treatment/dtos/Treatment.dto';

export class MedicalRecordDto {
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

  @IsOptional()
  diagnoses: DiagnosisDto[];

  @IsOptional()
  tests: TestDto[];

  @IsOptional()
  treatments: TreatmentDto[];
}
