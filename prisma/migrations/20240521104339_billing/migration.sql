/*
  Warnings:

  - You are about to drop the column `creditcvc` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Bill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "creditcvc",
DROP COLUMN "dueDate";
