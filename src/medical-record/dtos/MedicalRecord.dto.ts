import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMedicalRecordDto {
  @IsDateString()
  date: string;

  @IsArray()
  @IsString({ each: true })
  diseases: string[];

  @IsArray()
  @IsString({ each: true })
  allergies: string[];

  @IsBoolean()
  smokingStatus: string;

  @IsBoolean()
  alcoholIntake: string;

  @IsUUID()
  doctorId: string;

  @IsDateString()
  scheduledAt: string;

  @IsUUID()
  userId?: string;

  @IsUUID()
  patientPatientId?: string;
}
