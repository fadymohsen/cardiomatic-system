/*
  Warnings:

  - You are about to drop the column `physicianId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `physicianId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `physicianId` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `contactinfo` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `physicianId` on the `Prescription` table. All the data in the column will be lost.
  - You are about to drop the column `physicianId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Physician` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ssn]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactInfo` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pcpId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pcpId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pcpId` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactInfo` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ssn` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pcpId` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_physicianId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_physicianId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_physicianId_fkey";

-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_physicianId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_physicianId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "contactInfo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "physicianId",
ADD COLUMN     "pcpId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "physicianId",
ADD COLUMN     "pcpId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "physicianId",
ADD COLUMN     "pcpId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "contactinfo",
ADD COLUMN     "contactInfo" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "ssn" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "physicianId",
ADD COLUMN     "pcpId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "physicianId",
ADD COLUMN     "contactInfo" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pcpId" TEXT;

-- DropTable
DROP TABLE "Physician";

-- CreateTable
CREATE TABLE "PCP" (
    "pcpId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "contactinfo" TEXT NOT NULL,
    "ssn" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PCP',

    CONSTRAINT "PCP_pkey" PRIMARY KEY ("pcpId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PCP_ssn_key" ON "PCP"("ssn");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_ssn_key" ON "Patient"("ssn");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pcpId_fkey" FOREIGN KEY ("pcpId") REFERENCES "PCP"("pcpId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_pcpId_fkey" FOREIGN KEY ("pcpId") REFERENCES "PCP"("pcpId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_pcpId_fkey" FOREIGN KEY ("pcpId") REFERENCES "PCP"("pcpId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_pcpId_fkey" FOREIGN KEY ("pcpId") REFERENCES "PCP"("pcpId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_pcpId_fkey" FOREIGN KEY ("pcpId") REFERENCES "PCP"("pcpId") ON DELETE RESTRICT ON UPDATE CASCADE;
