-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('OPEN', 'SENT', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID');

-- AlterTable
ALTER TABLE "Coffee" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Drinks" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'OPEN';
