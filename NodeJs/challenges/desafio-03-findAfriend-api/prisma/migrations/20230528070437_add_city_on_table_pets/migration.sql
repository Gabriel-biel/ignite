/*
  Warnings:

  - You are about to drop the column `city` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `city` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "city";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "city" TEXT NOT NULL;
