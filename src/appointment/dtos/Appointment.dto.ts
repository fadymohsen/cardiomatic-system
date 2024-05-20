// appointment.dto.ts

import { IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  readonly patientId: string;
  readonly doctorId: string;
  readonly scheduledAt: Date;
}

export class UpdateAppointmentDto {
  @IsString()
  readonly patientId?: string;

  @IsString()
  readonly doctorId?: string;

  @IsDateString()
  readonly scheduledAt?: Date;
}
