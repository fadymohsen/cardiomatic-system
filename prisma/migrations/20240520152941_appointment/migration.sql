/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appointmentId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `pcpId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `doctorId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Appointment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `scheduledAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pcpId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
DROP COLUMN "appointmentId",
DROP COLUMN "createdAt",
DROP COLUMN "pcpId",
DROP COLUMN "updatedAt",
ADD COLUMN     "doctorId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT,
ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "MedicalHistory" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "PCP"("pcpId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
