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
    return this.prisma.appointment.findMany({
      select: {
        scheduledAt: true,
        status: true,
        doctorName: true,
        doctorId: true,
      },
    });
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

  async getAppointmentsForSpecificUser(
    userId: string,
    isDoctor: boolean,
  ): Promise<Appointment[]> {
    const whereCondition = isDoctor
      ? { doctorId: userId }
      : { patientId: userId };
    return this.prisma.appointment.findMany({
      where: whereCondition,
    });
  }
}
