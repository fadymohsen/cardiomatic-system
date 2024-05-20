import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { Prisma } from '@prisma/client';

@Controller('prescriptions')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  async create(@Body() data: Prisma.PrescriptionCreateInput) {
    return this.prescriptionService.createPrescription(data);
  }

  @Get()
  async findAll() {
    return this.prescriptionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prescriptionService.getPrescriptionById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.PrescriptionUpdateInput,
  ) {
    return this.prescriptionService.updatePrescription(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prescriptionService.deletePrescription(id);
  }
}
