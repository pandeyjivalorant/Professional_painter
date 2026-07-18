-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "PaintingStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'SOLD', 'NOT_FOR_SALE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Painting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "story" TEXT,
    "price" DECIMAL(10,2),
    "originalPrice" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "year" INTEGER,
    "status" "PaintingStatus" NOT NULL DEFAULT 'AVAILABLE',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "style" TEXT,
    "medium" TEXT,
    "materials" TEXT,
    "tags" TEXT[],
    "colors" TEXT[],
    "width" DECIMAL(10,2),
    "height" DECIMAL(10,2),
    "unit" TEXT DEFAULT 'inches',
    "isFramed" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "categoryId" TEXT,
    "createdById" TEXT,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Painting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaintingImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "format" TEXT,
    "sizeBytes" INTEGER,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "paintingId" TEXT NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaintingImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "issuedBy" TEXT,
    "issueDate" TIMESTAMP(3),
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rating" INTEGER DEFAULT 5,
    "role" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT,
    "updatedById" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_deletedAt_idx" ON "User"("email", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_slug_deletedAt_idx" ON "Category"("slug", "deletedAt");

-- CreateIndex
CREATE INDEX "Category_displayOrder_idx" ON "Category"("displayOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Painting_slug_key" ON "Painting"("slug");

-- CreateIndex
CREATE INDEX "Painting_slug_deletedAt_idx" ON "Painting"("slug", "deletedAt");

-- CreateIndex
CREATE INDEX "Painting_categoryId_deletedAt_idx" ON "Painting"("categoryId", "deletedAt");

-- CreateIndex
CREATE INDEX "Painting_status_deletedAt_idx" ON "Painting"("status", "deletedAt");

-- CreateIndex
CREATE INDEX "Painting_isPublished_isFeatured_deletedAt_idx" ON "Painting"("isPublished", "isFeatured", "deletedAt");

-- CreateIndex
CREATE INDEX "Painting_displayOrder_idx" ON "Painting"("displayOrder");

-- CreateIndex
CREATE INDEX "PaintingImage_paintingId_deletedAt_idx" ON "PaintingImage"("paintingId", "deletedAt");

-- CreateIndex
CREATE INDEX "PaintingImage_displayOrder_idx" ON "PaintingImage"("displayOrder");

-- CreateIndex
CREATE INDEX "Certificate_deletedAt_idx" ON "Certificate"("deletedAt");

-- CreateIndex
CREATE INDEX "Certificate_displayOrder_idx" ON "Certificate"("displayOrder");

-- CreateIndex
CREATE INDEX "Testimonial_isPublished_deletedAt_idx" ON "Testimonial"("isPublished", "deletedAt");

-- CreateIndex
CREATE INDEX "Testimonial_displayOrder_idx" ON "Testimonial"("displayOrder");

-- CreateIndex
CREATE INDEX "ContactMessage_isRead_deletedAt_idx" ON "ContactMessage"("isRead", "deletedAt");

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");

-- AddForeignKey
ALTER TABLE "Painting" ADD CONSTRAINT "Painting_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaintingImage" ADD CONSTRAINT "PaintingImage_paintingId_fkey" FOREIGN KEY ("paintingId") REFERENCES "Painting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
