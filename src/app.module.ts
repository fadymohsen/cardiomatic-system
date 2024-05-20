import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MedicalRecordsModule } from './medical-record/medical-record.module';
import { AppointmentsModule } from './appointment/appointment.module';
import { PrescriptionModule } from './prescription/prescription.module';

@Module({
  imports: [
    UsersModule,
    MedicalRecordsModule,
    AppointmentsModule,
    PrescriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
