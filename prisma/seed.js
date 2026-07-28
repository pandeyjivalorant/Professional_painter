require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed process...');

  // 1. Read and parse the ES Module data file safely without modifying it
  const filePath = path.join(__dirname, '../data/paintings.js');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Convert 'export const' to 'module.exports.' to parse it locally
  const scriptContent = fileContent.replace(/export const /g, 'module.exports.');
  const m = { exports: {} };
  const wrapper = new Function('module', 'exports', scriptContent);
  wrapper(m, m.exports);
  
  const PAINTINGS = m.exports.PAINTINGS;

  if (!PAINTINGS || !Array.isArray(PAINTINGS)) {
    throw new Error('Could not parse PAINTINGS from data/paintings.js');
  }

  console.log(`Found ${PAINTINGS.length} paintings to migrate.`);

  // 2. Iterate and upsert data
  for (const p of PAINTINGS) {
    // A. Upsert Category
    const categoryName = p.category || 'Uncategorized';
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {}, // Don't overwrite existing categories on re-runs
      create: {
        name: categoryName,
        slug: categorySlug,
      },
    });

    // B. Parse Status Enums safely
    let status = 'AVAILABLE';
    if (p.status) {
      const upperStatus = p.status.toUpperCase().replace(/\s+/g, '_');
      if (['AVAILABLE', 'RESERVED', 'SOLD', 'NOT_FOR_SALE'].includes(upperStatus)) {
        status = upperStatus;
      } else if (!p.available) {
        status = 'SOLD';
      }
    } else if (p.available === false) {
      status = 'SOLD';
    }

    // C. Upsert Painting
    const painting = await prisma.painting.upsert({
      where: { slug: p.slug },
      update: {}, // Skip updating to avoid overwriting future admin edits
      create: {
        title: p.title,
        slug: p.slug,
        description: p.description || null,
        story: p.story || null,
        price: p.price || null,
        originalPrice: p.originalPrice || null,
        currency: p.currency || 'INR',
        year: p.year || null,
        status: status,
        isPublished: true, 
        isFeatured: p.featured || false,
        style: p.style || null,
        medium: p.medium || null,
        materials: p.materials || null,
        tags: p.tags || [],
        colors: p.colors || [],
        width: p.dimensions?.width || null,
        height: p.dimensions?.height || null,
        unit: p.dimensions?.unit || 'inches',
        isFramed: p.dimensions?.framed || false,
        categoryId: category.id,
        seoTitle: p.title,
        seoDescription: p.description ? p.description.substring(0, 150) : null,
      },
    });

    // D. Upsert Images if they don't exist
    const existingImagesCount = await prisma.paintingImage.count({
      where: { paintingId: painting.id },
    });

    if (existingImagesCount === 0) {
      const imagesToCreate = [];
      
      // Main image
      if (p.mainImage || p.image) {
        imagesToCreate.push({
          url: p.mainImage || p.image,
          alt: p.title,
          isMain: true,
          displayOrder: 0,
          paintingId: painting.id,
        });
      }

      // Gallery images
      if (p.galleryImages && Array.isArray(p.galleryImages)) {
        p.galleryImages.forEach((img, index) => {
          imagesToCreate.push({
            url: img,
            alt: `${p.title} - view ${index + 1}`,
            isMain: false,
            displayOrder: index + 1,
            paintingId: painting.id,
          });
        });
      }

      if (imagesToCreate.length > 0) {
        await prisma.paintingImage.createMany({
          data: imagesToCreate,
        });
      }
    }

    console.log(`✅ Migrated: ${painting.title}`);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
