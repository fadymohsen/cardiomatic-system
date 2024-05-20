// src/medical-record/dto/medical-record.dto.ts
import {
  IsString,
  IsBoolean,
  IsDateString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class MedicalRecordDto {
  @IsString()
  patientId: string;

  @IsString()
  pcpId: string;

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

  @IsArray()
  @IsOptional()
  prescriptions?: string[];

  @IsArray()
  @IsOptional()
  diagnoses?: string[];

  @IsArray()
  @IsOptional()
  tests?: string[];

  @IsArray()
  @IsOptional()
  treatments?: string[];
}
