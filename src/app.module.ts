import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { TestModule } from './test/test.module';
import { TreatmentModule } from './treatment/treatment.module';

@Module({
  imports: [UsersModule, MedicalRecordModule, PrescriptionModule, DiagnosisModule, TestModule, TreatmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
