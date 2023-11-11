-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_deliverymanId_fkey";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_deliverymanId_fkey" FOREIGN KEY ("deliverymanId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
