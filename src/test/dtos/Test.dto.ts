import { IsString, IsDateString, IsUUID } from 'class-validator';

export class TestDto {
  @IsUUID()
  testId: string;

  @IsString()
  recordId: string;

  @IsString()
  typeOfTest: string;

  @IsString()
  result: string;

  @IsDateString()
  date: Date;
}
