/*
  Warnings:

  - A unique constraint covering the columns `[best_address_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "best_address_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_best_address_id_key" ON "User"("best_address_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_best_address_id_fkey" FOREIGN KEY ("best_address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
