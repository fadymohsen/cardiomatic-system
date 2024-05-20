import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';

@Module({
  imports: [UsersModule, MedicalRecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
