/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[sayingId,userId]` on the table `Like`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like.sayingId_userId_unique" ON "Like"("sayingId", "userId");
