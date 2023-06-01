import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const admRole = [
  {
    status: 'ativo',
    name: 'admin',
  },
  {
    status: 'ativo',
    name: 'dentista',
  },
];

async function run() {
  await prisma.role.createMany({
    data: admRole,
  });
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
