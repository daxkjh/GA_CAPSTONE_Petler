/*
  Warnings:

  - You are about to drop the `_AreaToDetails` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[detailsId]` on the table `Area` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[profileId]` on the table `Details` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[detailsId]` on the table `PetSize` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `detailsId` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AreaToDetails" DROP CONSTRAINT "_AreaToDetails_A_fkey";

-- DropForeignKey
ALTER TABLE "_AreaToDetails" DROP CONSTRAINT "_AreaToDetails_B_fkey";

-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "detailsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AreaToDetails";

-- CreateIndex
CREATE UNIQUE INDEX "Area_detailsId_key" ON "Area"("detailsId");

-- CreateIndex
CREATE UNIQUE INDEX "Details_profileId_key" ON "Details"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "PetSize_detailsId_key" ON "PetSize"("detailsId");

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_detailsId_fkey" FOREIGN KEY ("detailsId") REFERENCES "Details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
