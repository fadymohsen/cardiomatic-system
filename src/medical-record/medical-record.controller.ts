import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { MedicalRecordDto } from './dtos/MedicalRecord.dto';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private medicalRecordService: MedicalRecordService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createMedicalRecord(@Body() medicalRecordDto: MedicalRecordDto) {
    return this.medicalRecordService.createMedicalRecord(medicalRecordDto);
  }

  @Get()
  getMedicalRecords() {
    return this.medicalRecordService.getMedicalRecords();
  }

  @Get(':recordId')
  async getByRecordId(@Param('recordId', ParseIntPipe) recordId: string) {
    const user = await this.medicalRecordService.getMedicalRecordById(recordId);
    if (!user) throw new HttpException('User Not Found by This SSN', 404);
    return user;
  }

  @Delete(':recordId')
  async deleteMedicalRecordById(
    @Param('recordId', ParseIntPipe) recordId: string,
  ) {
    const user = await this.medicalRecordService.getMedicalRecordById(recordId);
    if (!user) throw new HttpException('User Not Found by This SSN', 404);
    return this.medicalRecordService.deleteMedicalRecordById(recordId);
  }
}
