/*
  Warnings:

  - A unique constraint covering the columns `[googleIdString]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telegramChatId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telegramConnectToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "googleIdString" TEXT,
ADD COLUMN     "telegramChatId" TEXT,
ADD COLUMN     "telegramConnectToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleIdString_key" ON "User"("googleIdString");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramChatId_key" ON "User"("telegramChatId");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramConnectToken_key" ON "User"("telegramConnectToken");
