-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PREVIOUS', 'UPCOMING');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "status" "AppointmentStatus" NOT NULL DEFAULT 'UPCOMING';
