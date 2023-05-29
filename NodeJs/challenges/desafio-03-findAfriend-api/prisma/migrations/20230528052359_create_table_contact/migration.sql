/*
  Warnings:

  - You are about to drop the column `address` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `pets` table. All the data in the column will be lost.
  - Added the required column `contact_id` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "address",
DROP COLUMN "phone",
ADD COLUMN     "contact_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "city",
DROP COLUMN "phone";

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_key" ON "Contact"("id");

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
