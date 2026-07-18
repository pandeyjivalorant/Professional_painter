/*
  Warnings:

  - You are about to drop the column `createdById` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Painting` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Painting` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `PaintingImage` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `PaintingImage` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `updatedById` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- AlterTable
ALTER TABLE "Painting" DROP COLUMN "createdById",
DROP COLUMN "updatedById",
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "colors" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "PaintingImage" DROP COLUMN "createdById",
DROP COLUMN "updatedById",
ADD COLUMN     "blurDataUrl" TEXT;

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "createdById",
DROP COLUMN "updatedById";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "ADMIN" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ADMIN_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ADMIN_email_key" ON "ADMIN"("email");

-- CreateIndex
CREATE INDEX "ADMIN_email_deletedAt_idx" ON "ADMIN"("email", "deletedAt");
