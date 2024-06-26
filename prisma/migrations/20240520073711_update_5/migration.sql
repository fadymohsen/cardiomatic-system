/*
  Warnings:

  - A unique constraint covering the columns `[ssn]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ssn` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ssn" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_ssn_key" ON "User"("ssn");
