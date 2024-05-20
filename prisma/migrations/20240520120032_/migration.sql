/*
  Warnings:

  - You are about to drop the column `contactinfo` on the `PCP` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `PCP` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `PCP` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age` to the `PCP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactInfo` to the `PCP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `PCP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `PCP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `PCP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PCP" DROP COLUMN "contactinfo",
DROP COLUMN "specialization",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "contactInfo" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "MedicalHistory" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "PCP_email_key" ON "PCP"("email");
