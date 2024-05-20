import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MedicalRecordsModule } from './medical-record/medical-record.module';
import { AppointmentsModule } from './appointment/appointment.module';

@Module({
  imports: [UsersModule, MedicalRecordsModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
