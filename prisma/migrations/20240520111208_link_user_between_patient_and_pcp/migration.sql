-- AlterTable
ALTER TABLE "User" ADD COLUMN     "patientId" TEXT,
ADD COLUMN     "physicianId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("patientId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_physicianId_fkey" FOREIGN KEY ("physicianId") REFERENCES "Physician"("physicianId") ON DELETE SET NULL ON UPDATE CASCADE;
