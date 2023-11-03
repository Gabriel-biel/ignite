/*
  Warnings:

  - A unique constraint covering the columns `[address_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "address_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_address_id_key" ON "orders"("address_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
