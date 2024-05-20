import { IsString, IsUUID } from 'class-validator';

export class DiagnosisDto {
  @IsUUID()
  diagnosisId: string;

  @IsString()
  recordId: string;

  @IsString()
  description: string;

  @IsString()
  severity: string;
}
