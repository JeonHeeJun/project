/*
  Warnings:

  - You are about to drop the column `tag` on the `Tag` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[name]` on the table `Tag`. If there are existing duplicate values, the migration will fail.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tag.tag_unique";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "tag",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tag.name_unique" ON "Tag"("name");
