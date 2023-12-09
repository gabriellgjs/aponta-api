import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export async function verifyEmailExist(email: string) {
  try {
    return await PrismaConnection.user.findUnique({
      where: { email },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao buscar email')
  }
}
