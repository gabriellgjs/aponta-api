import { PrismaClient } from '@prisma/client';

export const prismaConnection = new PrismaClient({
  log: ['query']
})