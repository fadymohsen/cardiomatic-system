import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrescriptionService {
  constructor(private prisma: PrismaService) {}

  async createPrescription(data: Prisma.PrescriptionCreateInput) {
    return this.prisma.prescription.create({ data });
  }

  async findAll() {
    return this.prisma.prescription.findMany();
  }

  async getPrescriptionById(id: string) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
    });
    if (!prescription) {
      throw new NotFoundException('Prescription not found');
    }
    return prescription;
  }

  async updatePrescription(id: string, data: Prisma.PrescriptionUpdateInput) {
    await this.getPrescriptionById(id); // Check if prescription exists
    return this.prisma.prescription.update({
      where: { id },
      data,
    });
  }

  async deletePrescription(id: string) {
    await this.getPrescriptionById(id); // Check if prescription exists
    return this.prisma.prescription.delete({
      where: { id },
    });
  }
}
