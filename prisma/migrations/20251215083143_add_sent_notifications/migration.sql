-- AlterTable
ALTER TABLE "Contest" ADD COLUMN     "sentNotifications" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
