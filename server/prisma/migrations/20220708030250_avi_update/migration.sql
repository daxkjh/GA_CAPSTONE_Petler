/*
  Warnings:

  - You are about to drop the column `description` on the `Details` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Details" DROP COLUMN "description",
ADD COLUMN     "svcdsc" TEXT;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "description",
ADD COLUMN     "intro" TEXT;
