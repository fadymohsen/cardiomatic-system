/*
  Warnings:

  - You are about to drop the column `CreatedBy` on the `Prescription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "CreatedBy",
ADD COLUMN     "createdBy" TEXT;
