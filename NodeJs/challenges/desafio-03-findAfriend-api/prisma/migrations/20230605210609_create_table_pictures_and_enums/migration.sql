/*
  Warnings:

  - You are about to drop the column `race` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `pets` table. All the data in the column will be lost.
  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `independence_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `porte` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Age" AS ENUM ('FILHOTE', 'ADOLESCENTE', 'ADULTO');

-- CreateEnum
CREATE TYPE "Porte" AS ENUM ('PEQUENINO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "Energy" AS ENUM ('BAIXA', 'MEDIA', 'ALTO');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('PEQUENO', 'GRANDE', 'AMPLO');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_org_id_fkey";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "race",
DROP COLUMN "type",
ADD COLUMN     "age" "Age" NOT NULL,
ADD COLUMN     "energy_level" "Energy" NOT NULL,
ADD COLUMN     "environment" "Environment" NOT NULL,
ADD COLUMN     "independence_level" "Independence" NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "porte" "Porte" NOT NULL,
ADD COLUMN     "requirements" TEXT[];

-- CreateTable
CREATE TABLE "pictures" (
    "id" TEXT NOT NULL,
    "photograph" TEXT NOT NULL,
    "petId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pictures_id_key" ON "pictures"("id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
