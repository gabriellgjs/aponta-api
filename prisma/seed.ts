import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const admRole = 
  {
    name: 'admin',
    description: 'Administrador'
  }

const user = {
  status: "ativo",
  email: "gabrielgjs_2015@gmail.com",
  password: "$2a$10$x.Me28CGWGlj0T/nf5AV/urvqzzTdExoU4WhPowymktXKdzRrwSFy",
  role_id: 1
}

async function run() {
  await prisma.role.create({
    data: {
      name: admRole.name,
      description: admRole.description,
    },
  });

  await prisma.user.create({
    data: {
      status: user.status,
      email: user.email,
      password: user.password,
      role_id: user.role_id
    },
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
