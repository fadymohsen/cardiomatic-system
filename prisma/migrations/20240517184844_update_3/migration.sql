/*
  Warnings:

  - You are about to drop the column `alcoholIntake` on the `MedicalRecord` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfo` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfo` on the `Physician` table. All the data in the column will be lost.
  - Added the required column `alcholIntake` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactinfo` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactinfo` to the `Physician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "alcoholIntake",
ADD COLUMN     "alcholIntake" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "contactInfo",
ADD COLUMN     "contactinfo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Physician" DROP COLUMN "contactInfo",
ADD COLUMN     "contactinfo" TEXT NOT NULL;
