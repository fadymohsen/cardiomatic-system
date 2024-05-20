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
import { MedicalRecordsService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dtos/MedicalRecord.dto';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private medicalRecordService: MedicalRecordsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createMedicalRecord(@Body() medicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordService.create(medicalRecordDto);
  }

  @Get()
  getMedicalRecords() {
    return this.medicalRecordService.findAll();
  }

  @Get(':recordId')
  async getByRecordId(@Param('recordId', ParseIntPipe) recordId: string) {
    const user = await this.medicalRecordService.findOne(recordId);
    if (!user) throw new HttpException('User Not Found by This SSN', 404);
    return user;
  }

  @Delete(':recordId')
  async deleteMedicalRecordById(
    @Param('recordId', ParseIntPipe) recordId: string,
  ) {
    const user = await this.medicalRecordService.findOne(recordId);
    if (!user) throw new HttpException('User Not Found by This SSN', 404);
    return this.medicalRecordService.remove(recordId);
  }
}
