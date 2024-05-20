import { IsString, IsUUID } from 'class-validator';

export class TreatmentDto {
  @IsUUID()
  treatmentId: string;

  @IsString()
  recordId: string;

  @IsString()
  type: string;

  @IsString()
  description: string;
}
