import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export async function verifyDentist(dentistId: number) {
  try {
    return await PrismaConnection.user.findMany({
      where: { id: dentistId, roleId: 2 },
    })
  } catch (error) {
    throw new InternalServerError('Erro ao buscar dentista')
  }
}
