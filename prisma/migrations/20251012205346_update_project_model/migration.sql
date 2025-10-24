/*
  Warnings:

  - You are about to drop the column `order` on the `Project` table. All the data in the column will be lost.
  - The `techs` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `mainLang` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "order",
ADD COLUMN     "mainLang" TEXT NOT NULL,
ADD COLUMN     "topics" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "techs",
ADD COLUMN     "techs" TEXT[],
ALTER COLUMN "imageUrl" SET NOT NULL;
