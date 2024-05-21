/*
  Warnings:

  - You are about to drop the column `patientPatientId` on the `MedicalRecord` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MedicalRecord" DROP CONSTRAINT "MedicalRecord_patientPatientId_fkey";

-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "patientPatientId",
ADD COLUMN     "patientId" TEXT;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("patientId") ON DELETE SET NULL ON UPDATE CASCADE;
