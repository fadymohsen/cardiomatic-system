-- CreateTable
CREATE TABLE "Prescription" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "diseases" TEXT[],
    "medications" TEXT[],
    "doctorId" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "patientPatientId" TEXT,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "PCP"("pcpId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_patientPatientId_fkey" FOREIGN KEY ("patientPatientId") REFERENCES "Patient"("patientId") ON DELETE SET NULL ON UPDATE CASCADE;
