/*
  Warnings:

  - You are about to drop the column `credentialId` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `issueDate` on the `Certificate` table. All the data in the column will be lost.
  - Added the required column `date` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Made the column `issuer` on table `Certificate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "credentialId",
DROP COLUMN "fileUrl",
DROP COLUMN "issueDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "link" TEXT,
ALTER COLUMN "issuer" SET NOT NULL;
