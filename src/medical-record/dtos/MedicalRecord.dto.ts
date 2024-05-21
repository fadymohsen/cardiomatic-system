import { IsArray, IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsDateString()
  date: string;

  @IsArray()
  @IsString({ each: true })
  diseases: string[];

  @IsArray()
  @IsString({ each: true })
  allergies: string[];

  @IsString()
  smokingStatus: string;

  @IsString()
  alcoholIntake: string;

  @IsUUID()
  doctorId: string;

  @IsDateString()
  scheduledAt: string;

  @IsUUID()
  userId?: string;

  @IsUUID()
  patientId: string; // Ensure this field is required
}
