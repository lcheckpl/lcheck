/*
  Warnings:

  - You are about to drop the column `serverId` on the `ServerSettings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServerSettings" DROP CONSTRAINT "ServerSettings_serverId_fkey";

-- AlterTable
ALTER TABLE "ServerSettings" DROP COLUMN "serverId";

-- AddForeignKey
ALTER TABLE "ServerSettings" ADD CONSTRAINT "ServerSettings_id_fkey" FOREIGN KEY ("id") REFERENCES "ServerCache"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
