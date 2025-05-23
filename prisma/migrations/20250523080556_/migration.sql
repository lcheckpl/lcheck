-- CreateTable
CREATE TABLE "ServerSettings" (
    "id" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "webhookUrl" TEXT NOT NULL,

    CONSTRAINT "ServerSettings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServerSettings" ADD CONSTRAINT "ServerSettings_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "ServerCache"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
