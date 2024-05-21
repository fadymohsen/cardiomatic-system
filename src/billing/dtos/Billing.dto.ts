import {
  IsString,
  IsUUID,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class BillDto {
  @IsNumber()
  amount: number;

  @IsDateString()
  dueDate: Date;

  @IsString()
  method: string;

  @IsOptional()
  @IsString()
  creditNumber?: string;

  @IsOptional()
  @IsNumber()
  creditcvc?: number;

  @IsString()
  status: string;

  @IsUUID()
  patientId: string;
}
