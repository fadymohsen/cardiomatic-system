/*
  Warnings:

  - You are about to drop the column `patientId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `physicianId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_patientId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_physicianId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "patientId",
DROP COLUMN "physicianId";
