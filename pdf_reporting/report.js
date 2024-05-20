//#####################################3

//retrieve medical record 


import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MedicalRecordService {
  constructor(private readonly prisma: PrismaService) {}

  async getMedicalRecordsForPatient(patientId: string): Promise<MedicalRecord[]> {
    return this.prisma.medicalRecord.findMany({
      where: {
        patientId,
      },
    });
  }
}

//###########################################

//generate pdf 

import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { MedicalRecord } from './types'; // Define your MedicalRecord type/interface
import PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  generatePdf(medicalRecords: MedicalRecord[]): void {
    const doc = new PDFDocument();
    const stream = doc.pipe(createWriteStream('medical_records.pdf'));

    medicalRecords.forEach((record) => {
      doc.text(`Date: ${record.date}`);
      doc.text(`Doctor: ${record.doctor}`);
      doc.text(`Diagnosis: ${record.diagnosis}`);
      doc.text(`Treatment: ${record.treatment}`);
      doc.moveDown();
    });

    doc.end();
  }
}

//###########################################

//medical record controller



import { Controller, Get, Param, Res } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('medical-records')
export class MedicalRecordController {
  constructor(
    private readonly medicalRecordService: MedicalRecordService,
    private readonly pdfService: PdfService,
  ) {}

  @Get(':patientId/pdf')
  async generatePdfForPatient(@Param('patientId') patientId: string, @Res() res: Response): Promise<void> {
    const medicalRecords = await this.medicalRecordService.getMedicalRecordsForPatient(patientId);
    this.pdfService.generatePdf(medicalRecords);

    // Send the generated PDF file as a binary response
    res.download('medical_records.pdf');
  }
}


//#################################################3