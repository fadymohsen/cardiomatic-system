// src/appointments/appointments.controller.ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/Appointment.dto';
import { Appointment } from '@prisma/client';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  getAppointments() {
    return this.appointmentsService.findAppointments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }

  @Get('user/:userId/:userType')
  async getAppointmentsForSpecificUser(
    @Param('userId') userId: string,
    @Param('userType') userType: string,
  ): Promise<Appointment[]> {
    const isDoctor = userType.toLowerCase() === 'doctor';
    return this.appointmentsService.getAppointmentsForSpecificUser(
      userId,
      isDoctor,
    );
  }
}
