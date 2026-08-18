const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file');
    process.exit(1);
  }

  // Check if admin already exists
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
  });
