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

const user = {
  status: "ativo",
  email: "contato.gabrieljosesilva@gmail.com",
  password: "$2a$10$x.Me28CGWGlj0T/nf5AV/urvqzzTdExoU4WhPowymktXKdzRrwSFy"
}

async function run() {
  await prisma.role.createMany({
    data: admRole,
  });

  await prisma.user.createMany({
    data: user,
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
