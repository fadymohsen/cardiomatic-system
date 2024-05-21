// appointment.dto.ts

import { IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  readonly patientId: string;
  readonly doctorId: string;
  scheduledAt: Date;
}

export class UpdateAppointmentDto {
  @IsString()
  patientId?: string;

  @IsString()
  doctorId?: string;

  @IsDateString()
  scheduledAt?: Date;

  @IsString()
  doctorName: string;
}
