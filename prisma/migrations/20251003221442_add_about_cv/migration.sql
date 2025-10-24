/*
  Warnings:

  - You are about to drop the column `avatar` on the `About` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "About" DROP COLUMN "avatar",
ADD COLUMN     "avatarUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "cvUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "bio" SET DEFAULT '';
