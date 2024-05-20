/*
  Warnings:

  - The primary key for the `MedicalRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `currentSmokingStatus` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosis` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `pcpId` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `recordId` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `symptoms` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `treatmentPlan` on the `MedicalRecord` table. All the data in the column will be lost.
  - The `allergies` column on the `MedicalRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Diagnosis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prescription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Treatment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `doctorId` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MedicalRecord` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `scheduledAt` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smokingStatus` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Diagnosis" DROP CONSTRAINT "Diagnosis_recordId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_pcpId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_patientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_pcpId_fkey";

-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_pcpId_fkey";

-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_recordId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_recordId_fkey";

-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_recordId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "adminAdminId" TEXT;

-- AlterTable
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_pkey",
DROP COLUMN "currentSmokingStatus",
DROP COLUMN "diagnosis",
DROP COLUMN "patientId",
DROP COLUMN "pcpId",
DROP COLUMN "recordId",
DROP COLUMN "symptoms",
DROP COLUMN "treatmentPlan",
ADD COLUMN     "diseases" TEXT[],
ADD COLUMN     "doctorId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "patientPatientId" TEXT,
ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "smokingStatus" BOOLEAN NOT NULL,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "date" DROP DEFAULT,
DROP COLUMN "allergies",
ADD COLUMN     "allergies" TEXT[],
ADD CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Diagnosis";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "Prescription";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "Treatment";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_adminAdminId_fkey" FOREIGN KEY ("adminAdminId") REFERENCES "Admin"("adminId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "PCP"("pcpId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_patientPatientId_fkey" FOREIGN KEY ("patientPatientId") REFERENCES "Patient"("patientId") ON DELETE SET NULL ON UPDATE CASCADE;
