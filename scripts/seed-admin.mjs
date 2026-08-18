import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file');
    process.exit(1);
  }

  const existingAdmin = await prisma.aDMIN.findUnique({
    where: { email },
  });


  if (existingAdmin) {
    console.log(`Admin user with email ${email} already exists.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.aDMIN.create({
    data: {
      id: 'admin-1',
      name: 'Super Admin',
      email: email,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      updatedAt: new Date(),
    },
  });

  console.log(`Created admin user: ${admin.email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
