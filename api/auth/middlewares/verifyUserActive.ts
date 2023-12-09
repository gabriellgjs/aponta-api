import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export async function verifyUserActive(id: string | number) {
  try {
    return await PrismaConnection.user.findMany({
      where: { id: Number(id), status: 'Ativo' },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao buscar email')
  }
}
