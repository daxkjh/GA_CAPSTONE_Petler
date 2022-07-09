/*
  Warnings:

  - You are about to drop the column `weight` on the `PetSize` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PetSize" DROP COLUMN "weight",
ADD COLUMN     "l" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "m" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "s" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "xl" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "xs" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Pets" ADD COLUMN     "size" TEXT;
