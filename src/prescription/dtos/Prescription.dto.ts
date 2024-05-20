import { IsArray, IsDateString, IsString, IsUUID } from 'class-validator';

export class CreatePrescriptionDto {
  @IsDateString()
  date: string;

  @IsArray()
  @IsString({ each: true })
  diseases: string[];

  @IsArray()
  @IsString({ each: true })
  medications: string[];

  @IsString()
  @IsUUID()
  doctorId: string;

  @IsDateString()
  scheduledAt: string;

  @IsUUID()
  userId?: string;

  @IsUUID()
  patientPatientId?: string;
}
