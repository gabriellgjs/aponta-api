import PrismaConnection from '@prisma/prismaConnection'
import { InternalServerError } from '@apiErrors/errors'

export const verifyPassword = async (id: number) => {
  try {
    return await PrismaConnection.user
      .findUnique({
        where: {
          id,
        },
        select: {
          password: true,
        },
      })
      .then((value) => {
        return value?.password
      })
  } catch (error) {
    throw new InternalServerError('Erro ao realizar login')
  }
}
