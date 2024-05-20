/*
  Warnings:

  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `method` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_billId_fkey";

-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "creditNumber" TEXT,
ADD COLUMN     "creditcvc" INTEGER,
ADD COLUMN     "method" "PaymentMethod" NOT NULL;

-- DropTable
DROP TABLE "Payment";
