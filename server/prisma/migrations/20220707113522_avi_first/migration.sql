/*
  Warnings:

  - You are about to drop the column `profileId` on the `Vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vendorId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vendorId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_profileId_fkey";

-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "dateTime" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Details" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "petType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PetSize" ALTER COLUMN "weight" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pets" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "breed" DROP NOT NULL,
ALTER COLUMN "birth" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "sterilized" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "message" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "vendorId" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "start" DROP NOT NULL,
ALTER COLUMN "end" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "paws" DROP NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "profileId";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_vendorId_key" ON "Profile"("vendorId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
