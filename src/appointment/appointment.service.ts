import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './dtos/Appointment.dto';
import { Appointment } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { patientId, doctorId, scheduledAt } = createAppointmentDto;

    // Fetch doctor's details
    const doctor = await this.prisma.pCP.findUnique({
      where: { pcpId: doctorId },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
    }

    const finalDoctorName = `Dr. ${doctor.firstName}`;

    const appointment = await this.prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        scheduledAt,
        doctorName: finalDoctorName,
      },
    });

    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const { patientId, doctorId, scheduledAt, doctorName } =
      updateAppointmentDto;

    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    // Fetch doctor's details if doctorId is being updated
    let finalDoctorName = doctorName;
    if (doctorId) {
      const doctor = await this.prisma.pCP.findUnique({
        where: { pcpId: doctorId },
      });

      if (!doctor) {
        throw new NotFoundException(`Doctor with ID ${doctorId} not found`);
      }

      finalDoctorName = `Dr. ${doctor.firstName} ${doctor.lastName}`;
    }

    return this.prisma.appointment.update({
      where: { id },
      data: {
        patientId,
        doctorId,
        scheduledAt,
        doctorName: finalDoctorName || appointment.doctorName, // Preserve existing name if not updating
      },
    });
  }

  async findAppointments() {
    return this.prisma.appointment.findMany({
      select: {
        scheduledAt: true,
        status: true,
        doctorName: true,
        doctorId: true,
        patientId: true,
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
