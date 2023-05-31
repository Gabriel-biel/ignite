/*
  Warnings:

  - You are about to drop the column `city` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_org_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "city";

-- DropTable
DROP TABLE "Contact";

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "org_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
