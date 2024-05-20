// src/appointments/appointments.controller.ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/Appointment.dto';

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

  @Get('doctor/:doctorId')
  async getAppointmentsForSpecificDoctor(@Param('doctorId') doctorId: string) {
    return this.appointmentsService.getAppointmentsForSpecificDoctor(doctorId);
  }

  @Get('patient/:patientId')
  async getAppointmentsForSpecificPatient(
    @Param('patientId') patientId: string,
  ) {
    return this.appointmentsService.getAppointmentsForSpecificPatient(
      patientId,
    );
  }
}
