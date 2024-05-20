import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNumber()
  @Min(0)
  age: number;

  @IsNumber()
  @IsNotEmpty()
  ssn: number;

  @IsString()
  @IsNotEmpty()
  contactInfo: string;
}
