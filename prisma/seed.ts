import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const admRole = {
  status: "active",
  name: "ADMIN",
}
async function run() {
  await prisma.role.create(
    {
      data: admRole
    }
  )
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })