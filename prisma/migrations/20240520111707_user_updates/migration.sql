/*
  Warnings:

  - A unique constraint covering the columns `[ssn]` on the table `Physician` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ssn` to the `Physician` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Physician" ADD COLUMN     "ssn" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adminId" TEXT;

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "ssn" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_ssn_key" ON "Admin"("ssn");

-- CreateIndex
CREATE UNIQUE INDEX "Physician_ssn_key" ON "Physician"("ssn");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("adminId") ON DELETE SET NULL ON UPDATE CASCADE;
