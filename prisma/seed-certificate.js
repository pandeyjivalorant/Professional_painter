const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("📂 Scanning public/certificate folder...");

  const folderPath = path.join(process.cwd(), "public", "certificate");

  if (!fs.existsSync(folderPath)) {
    throw new Error(`Folder not found: ${folderPath}`);
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

  let count = 0;
  let skipped = 0;

  for (const file of files) {
    const name = path.parse(file).name;
    const imageUrl = `/certificate/${file}`;

    // Check if the certificate already exists
    // We use findFirst instead of upsert because imageUrl is not marked as @unique in the schema
    const existing = await prisma.certificate.findFirst({
      where: { imageUrl },
    });

    if (!existing) {
      await prisma.certificate.create({
        data: {
          title: name,
          issuedBy: "Certificate",
          issueDate: new Date(),
          imageUrl: imageUrl,
          displayOrder: count + 1,
        },
      });

      console.log(`✅ Added: ${file}`);
      count++;
    } else {
      console.log(`⏭️ Skipped (already exists): ${file}`);
      skipped++;
    }
  }

  console.log(`🎉 ${count} certificates imported! (${skipped} skipped)`);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });