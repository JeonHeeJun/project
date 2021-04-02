/*
  Warnings:

  - Added the required column `text` to the `Saying` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Saying" ADD COLUMN     "text" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SayingToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SayingToTag_AB_unique" ON "_SayingToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_SayingToTag_B_index" ON "_SayingToTag"("B");

-- AddForeignKey
ALTER TABLE "_SayingToTag" ADD FOREIGN KEY ("A") REFERENCES "Saying"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SayingToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
