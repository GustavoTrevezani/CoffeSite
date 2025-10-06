/*
  Warnings:

  - You are about to drop the column `coffeeId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_coffeeId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "coffeeId",
DROP COLUMN "quantity";
