/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `coverUrl` on the `Book` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "imageUrl",
ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "coverUrl",
ADD COLUMN     "avatar" TEXT NOT NULL;
