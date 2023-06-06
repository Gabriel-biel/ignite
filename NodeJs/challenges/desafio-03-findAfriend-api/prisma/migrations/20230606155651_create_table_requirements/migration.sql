/*
  Warnings:

  - You are about to drop the column `requirements` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `petId` on the `pictures` table. All the data in the column will be lost.
  - You are about to drop the column `photograph` on the `pictures` table. All the data in the column will be lost.
  - Added the required column `name` to the `pictures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_id` to the `pictures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_petId_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "requirements";

-- AlterTable
ALTER TABLE "pictures" DROP COLUMN "petId",
DROP COLUMN "photograph",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Requirements" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Requirements_id_key" ON "Requirements"("id");

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirements" ADD CONSTRAINT "Requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
