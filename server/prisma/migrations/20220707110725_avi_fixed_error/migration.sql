-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_profileId_fkey";

-- AlterTable
ALTER TABLE "Vendor" ALTER COLUMN "profileId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
