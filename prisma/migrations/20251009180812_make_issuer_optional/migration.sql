/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Certificate` table. All the data in the column will be lost.
  - Added the required column `platform` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `Certificate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `link` on table `Certificate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "createdAt",
DROP COLUMN "date",
DROP COLUMN "updatedAt",
ADD COLUMN     "platform" TEXT NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "link" SET NOT NULL;
