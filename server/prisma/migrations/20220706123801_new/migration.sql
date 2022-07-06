/*
  Warnings:

  - Added the required column `dateTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;
