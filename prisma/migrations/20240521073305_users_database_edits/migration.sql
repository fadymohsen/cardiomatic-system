/*
  Warnings:

  - You are about to drop the column `age` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfo` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `ssn` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `PCP` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfo` on the `PCP` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `PCP` table. All the data in the column will be lost.
  - You are about to drop the column `ssn` on the `PCP` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfo` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `ssn` on the `Patient` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Admin_ssn_key";

-- DropIndex
DROP INDEX "PCP_ssn_key";

-- DropIndex
DROP INDEX "Patient_ssn_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "age",
DROP COLUMN "contactInfo",
DROP COLUMN "name",
DROP COLUMN "ssn",
ADD COLUMN     "dateOfBirth" INTEGER,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- AlterTable
ALTER TABLE "PCP" DROP COLUMN "age",
DROP COLUMN "contactInfo",
DROP COLUMN "name",
DROP COLUMN "ssn",
ADD COLUMN     "dateOfBirth" INTEGER,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "age",
DROP COLUMN "contactInfo",
DROP COLUMN "name",
DROP COLUMN "ssn",
ADD COLUMN     "dateOfBirth" INTEGER,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
