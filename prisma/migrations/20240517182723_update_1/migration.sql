/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicianId` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Patient', 'PCP', 'Admin');

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "displayName",
DROP COLUMN "id",
DROP COLUMN "username",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "physicianId" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Patient',
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Patient" (
    "patientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "MedicalHistory" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Patient',

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patientId")
);

-- CreateTable
CREATE TABLE "Physician" (
    "physicianId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PCP',

    CONSTRAINT "Physician_pkey" PRIMARY KEY ("physicianId")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "appointmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "physicianId" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "recordId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "physicianId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "symptoms" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "currentSmokingStatus" TEXT NOT NULL,
    "alcoholIntake" BOOLEAN NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "treatmentPlan" TEXT NOT NULL,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("recordId")
);

-- CreateTable
CREATE TABLE "Prescription" (
    "prescriptionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "physicianId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "medication" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("prescriptionId")
);

-- CreateTable
CREATE TABLE "Diagnosis" (
    "diagnosisId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("diagnosisId")
);

-- CreateTable
CREATE TABLE "Test" (
    "testId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "typeOfTest" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("testId")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "treatmentId" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("treatmentId")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "invoiceId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "physicianId" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoiceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("patientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_physicianId_fkey" FOREIGN KEY ("physicianId") REFERENCES "Physician"("physicianId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("patientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_physicianId_fkey" FOREIGN KEY ("physicianId") REFERENCES "Physician"("physicianId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("patientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_physicianId_fkey" FOREIGN KEY ("physicianId") REFERENCES "Physician"("physicianId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_physicianId_fkey" FOREIGN KEY ("physicianId") REFERENCES "Physician"("physicianId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "MedicalRecord"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnosis" ADD CONSTRAINT "Diagnosis_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "MedicalRecord"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "MedicalRecord"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "MedicalRecord"("recordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("patientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_physicianId_fkey" FOREIGN KEY ("physicianId") REFERENCES "Physician"("physicianId") ON DELETE RESTRICT ON UPDATE CASCADE;
