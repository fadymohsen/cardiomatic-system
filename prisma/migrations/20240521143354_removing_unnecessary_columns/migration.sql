/*
  Warnings:

  - You are about to drop the column `adminId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `pcpId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adminId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_patientId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_pcpId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adminId",
DROP COLUMN "patientId",
DROP COLUMN "pcpId";
