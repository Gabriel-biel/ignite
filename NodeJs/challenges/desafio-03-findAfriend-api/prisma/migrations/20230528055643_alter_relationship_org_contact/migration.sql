/*
  Warnings:

  - You are about to drop the column `contact_id` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `org_id` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_contact_id_fkey";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "org_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "contact_id";

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
