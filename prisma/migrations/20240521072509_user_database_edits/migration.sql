/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ssn` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_ssn_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "contactInfo",
DROP COLUMN "name",
DROP COLUMN "ssn",
ADD COLUMN     "dateOfBirth" INTEGER,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
