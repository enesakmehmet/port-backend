/*
  Warnings:

  - You are about to drop the column `isRead` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `ContactMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContactMessage" DROP COLUMN "isRead",
DROP COLUMN "subject";
