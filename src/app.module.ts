import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MedicalRecordsModule } from './medical-record/medical-record.module';
import { AppointmentsModule } from './appointment/appointment.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { BillingModule } from './billing/billing.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    UsersModule,
    MedicalRecordsModule,
    AppointmentsModule,
    PrescriptionModule,
    BillingModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
