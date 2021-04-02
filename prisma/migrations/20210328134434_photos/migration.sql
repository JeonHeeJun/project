/*
  Warnings:

  - Added the required column `tag` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "tag" TEXT NOT NULL;
