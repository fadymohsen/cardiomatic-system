import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dtos/Appointment.dto';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { patientId, doctorId, scheduledAt } = createAppointmentDto;
    const appointment = await this.prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        scheduledAt,
      },
    });

    return appointment;
  }

  async findAppointments() {
    return this.prisma.appointment.findMany();
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async remove(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return this.prisma.appointment.delete({
      where: { id },
    });
  }

  async getAppointmentsForSpecificDoctor(id: string) {
    // Replace id by doctor id
    return this.prisma.appointment.findUnique({ where: { id } });
  }

  async getAppointmentsForSpecificPatient(id: string) {
    // Replace id by doctor id
    return this.prisma.appointment.findUnique({ where: { id } });
  }
  
  async getAppointmentsForSpecificDoctor(doctorId: string) {
    return this.prisma.appointment.findMany({
      where: {
        doctorId,
      },
    });
  }

  async getAppointmentsForSpecificPatient(patientId: string) {
    return this.prisma.appointment.findMany({
      where: {
        patientId,
      },
    });
  }
}
