import { IsString, IsDateString, IsUUID } from 'class-validator';

export class PrescriptionDto {
  @IsUUID()
  prescriptionId: string;

  @IsString()
  title: string;

  @IsDateString()
  date: Date;

  @IsString()
  physicianId: string;

  @IsString()
  recordId: string;

  @IsString()
  medication: string;

  @IsString()
  dosage: string;

  @IsString()
  frequency: string;
}
