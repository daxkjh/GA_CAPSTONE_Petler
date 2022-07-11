-- AlterTable
ALTER TABLE "Bookings" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "dayService" BOOLEAN DEFAULT false;
