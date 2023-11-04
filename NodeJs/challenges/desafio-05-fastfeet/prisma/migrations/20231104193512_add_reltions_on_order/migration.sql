-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'DELIVERYMAN';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "deliverymanId" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_deliverymanId_fkey" FOREIGN KEY ("deliverymanId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
