/*
  Warnings:

  - You are about to drop the column `end` on the `UserProfile` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `end` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "end",
DROP COLUMN "start";
