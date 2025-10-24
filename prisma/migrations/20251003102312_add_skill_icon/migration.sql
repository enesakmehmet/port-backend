/*
  Warnings:

  - Made the column `category` on table `Skill` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "icon" TEXT,
ALTER COLUMN "level" DROP DEFAULT,
ALTER COLUMN "category" SET NOT NULL;
