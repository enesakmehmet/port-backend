/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Project` table. All the data in the column will be lost.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `order` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "updatedAt",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "order" SET NOT NULL,
ALTER COLUMN "order" SET DEFAULT 0;
