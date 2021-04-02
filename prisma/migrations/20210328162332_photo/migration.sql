/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[tag]` on the table `Tag`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag.tag_unique" ON "Tag"("tag");
