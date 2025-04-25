/*
  Warnings:

  - You are about to drop the column `isPositive` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,serverId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serverId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "isPositive",
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "serverId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_serverId_key" ON "Review"("userId", "serverId");
