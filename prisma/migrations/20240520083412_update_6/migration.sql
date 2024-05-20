/*
  Warnings:

  - You are about to drop the column `alcholIntake` on the `MedicalRecord` table. All the data in the column will be lost.
  - Added the required column `alcoholIntake` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "alcholIntake",
ADD COLUMN     "alcoholIntake" BOOLEAN NOT NULL;
