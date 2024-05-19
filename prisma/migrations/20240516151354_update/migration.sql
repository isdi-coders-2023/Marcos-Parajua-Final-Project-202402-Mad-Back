-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "maker" TEXT;

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "avatar" DROP NOT NULL;
